import { EventEmitter } from "node:events";
import WebSocket from "ws";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Command } from "./types/Command";
import { createLogger } from "./utils/logger";

const logger = createLogger("Gateway");

export interface User {
	id: string;
	username: string;
	avatar?: string;
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
				logger.success(`Command loaded: ${command.name}`);
			}
		}
	}

	public login() {
		logger.info("Connecting to WebSocket...");

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
			logger.success("WebSocket Connection Established.");
		});

		this.ws.on("message", (data: WebSocket.RawData) => {
			const payload = JSON.parse(data.toString());
			const { op, d, t, s } = payload;

			if (s !== undefined) this.lastSequence = s;

			switch (op) {
				case Opcode.HELLO:
					this.handleHello(d.heartbeat_interval);
					break;
				case Opcode.DISPATCH:
					if (t === "READY") {
						this.user = d.user;
						this.emit("ready", d.user);
					} else if (t === "MESSAGE_CREATE") {
						this.emit("messageCreate", d);
					}
					this.emit("dispatch", t, d);
					break;
				case Opcode.HEARTBEAT_ACK:
					break;
				default:
					logger.debug(`Unknown Opcode: ${op}`);
			}
		});

		this.ws.on("close", (code) => {
			logger.warn(`Connection closed (Code: ${code}). Reconnecting in 5s...`);
			this.stopHeartbeat();
			setTimeout(() => this.login(), 5000);
		});

		this.ws.on("error", (error) => {
			logger.error("WebSocket Error:", error);
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

	public async sendMessage(channelId: string, content: string) {
		try {
			const response = await fetch(
				`https://api.fluxer.app/v1/channels/${channelId}/messages`,
				{
					method: "POST",
					headers: {
						Authorization: this.token,
						"Content-Type": "application/json",
						"User-Agent":
							"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					},
					body: JSON.stringify({ content }),
				},
			);

			if (!response.ok) {
				logger.error(`Failed to send message (HTTP ${response.status})`);
			}

			return await response.json().catch(() => null);
		} catch (error: unknown) {
			logger.error(`Request failed:`, error);
		}
	}
}
