import { EventEmitter } from "node:events";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import WebSocket from "ws";
import type { Command } from "./types/Command";
import { createLogger } from "./utils/logger";

const gatewayLogger = createLogger("Gateway");
const loaderLogger = createLogger("Loader");

export interface User {
	id: string;
	username: string;
	avatar?: string;
}

export interface Message {
	id: string;
	channel_id: string;
	author: User;
	content: string;
}

export enum Opcode {
	DISPATCH = 0,
	HEARTBEAT = 1,
	IDENTIFY = 2,
	HELLO = 10,
	HEARTBEAT_ACK = 11,
}

export default class FluxerClient extends EventEmitter {
	public token: string;
	public commands = new Map<string, Command>();
	public user: User | null = null;
	private ws: WebSocket | null = null;
	private heartbeatInterval: NodeJS.Timeout | null = null;
	private lastSequence: number | null = null;
	private readonly url =
		"wss://gateway.fluxer.app/?v=1&encoding=json&compress=none";

	constructor(token: string) {
		super();
		this.token = token;
	}

	public async loadCommands() {
		const commandsPath = join(__dirname, "commands");
		const categories = readdirSync(commandsPath);

		for (const category of categories) {
			const categoryPath = join(commandsPath, category);
			const commandFiles = readdirSync(categoryPath).filter((file) =>
				file.endsWith(".ts"),
			);

			for (const file of commandFiles) {
				const command: Command = (await import(join(categoryPath, file)))
					.default;
				this.commands.set(command.name, command);
				loaderLogger.success(`Command loaded: ${command.name}`);
			}
		}
	}

	public login() {
		gatewayLogger.info("Connecting to WebSocket...");

		this.ws = new WebSocket(this.url, {
			headers: {
				Accept: "*/*",
				"Accept-Encoding": "gzip, deflate, br, zstd",
				"Accept-Language": "en-US,en;q=0.9",
				"Cache-Control": "no-cache",
				Connection: "Upgrade",
				Host: "gateway.fluxer.app",
				Origin: "https://web.fluxer.app",
				Pragma: "no-cache",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "websocket",
				"Sec-Fetch-Site": "same-site",
				"Sec-GPC": "1",
				"Sec-WebSocket-Extensions": "permessage-deflate",
				"Sec-WebSocket-Version": "13",
				Upgrade: "websocket",
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0",
			},
		});

		this.ws.on("open", () => {
			gatewayLogger.success("WebSocket Connection Established.");
		});

		this.ws.on("message", (data: WebSocket.RawData) => {
			const payload = JSON.parse(data.toString());
			const { op, d, t, s } = payload;

			if (s !== undefined) this.lastSequence = s;

			switch (op) {
				case Opcode.HELLO:
					this.handleHello(d.heartbeat_interval);
					break;
				case Opcode.HEARTBEAT:
					this.send(Opcode.HEARTBEAT, this.lastSequence);
					break;
				case Opcode.DISPATCH:
					if (t === "READY") {
						this.user = d.user;
						this.emit("ready", d.user);
					} else if (t === "MESSAGE_CREATE") {
						this.emit("messageCreate", d as Message);
					}
					this.emit("dispatch", t, d);
					break;
				case Opcode.HEARTBEAT_ACK:
					break;
				default:
					gatewayLogger.debug(`Unknown Opcode: ${op}`);
			}
		});

		this.ws.on("close", (code) => {
			gatewayLogger.warn(
				`Connection closed (Code: ${code}). Reconnecting in 5s...`,
			);
			this.stopHeartbeat();
			setTimeout(() => this.login(), 5000);
		});

		this.ws.on("error", (error) => {
			gatewayLogger.error("WebSocket Error:", error);
		});
	}

	private handleHello(interval: number) {
		this.startHeartbeat(interval);
		this.identify();
	}

	private startHeartbeat(interval: number) {
		this.stopHeartbeat();
		this.heartbeatInterval = setInterval(() => {
			this.send(Opcode.HEARTBEAT, this.lastSequence);
		}, interval);
	}

	private stopHeartbeat() {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
			this.heartbeatInterval = null;
		}
	}

	private identify() {
		this.send(Opcode.IDENTIFY, {
			token: this.token,
			properties: {
				os: "Windows",
				browser: "Firefox",
				device: "",
			},
		});
	}

	private send(op: Opcode, d: unknown) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify({ op, d }));
		}
	}

	private async request(method: string, endpoint: string, data?: unknown) {
		const apiUrl = `https://api.fluxer.app/v1${endpoint}`;

		for (let attempt = 0; attempt < 10; attempt++) {
			try {
				const response = await fetch(apiUrl, {
					method,
					headers: {
						Authorization: this.token,
						Accept: "*/*",
						"Accept-Encoding": "gzip, deflate, br, zstd",
						"Accept-Language": "en-US,en;q=0.9",
						"Cache-Control": "no-cache",
						"Content-Type": "application/json",
						Origin: "https://web.fluxer.app",
						Pragma: "no-cache",
						"Sec-Fetch-Dest": "empty",
						"Sec-Fetch-Mode": "cors",
						"Sec-Fetch-Site": "same-site",
						"User-Agent":
							"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0",
					},
					body: data ? JSON.stringify(data) : undefined,
				});

				const text = await response.text();

				if (!response.ok) {
					if (response.status >= 500 || response.status === 429) {
						throw new Error(`[${response.status}] HTTP Error`);
					}
					gatewayLogger.error(
						`[REST ERREUR] ${method} ${endpoint} : ${response.status}`,
						text,
					);
				}

				try {
					return JSON.parse(text);
				} catch {
					return text;
				}
			} catch (_error: unknown) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		gatewayLogger.error(
			`[REST FATAL] Échec après 10 tentatives pour ${method} ${endpoint}`,
		);
		return null;
	}

	public async sendMessage(channelId: string, content: string) {
		return this.request("POST", `/channels/${channelId}/messages`, { content });
	}

	public async getMessages(channelId: string, limit: number = 50) {
		return this.request(
			"GET",
			`/channels/${channelId}/messages?limit=${limit}`,
		);
	}

	public async editMessage(
		channelId: string,
		messageId: string,
		content: string,
	) {
		return this.request(
			"PATCH",
			`/channels/${channelId}/messages/${messageId}`,
			{ content },
		);
	}

	public async deleteMessage(channelId: string, messageId: string) {
		return this.request(
			"DELETE",
			`/channels/${channelId}/messages/${messageId}`,
		);
	}

	public async getUser(userId: string) {
		return this.request("GET", `/users/${userId}`);
	}

	public async updateSettings(settings: unknown) {
		return this.request("PATCH", "/users/@me/settings", settings);
	}
}
