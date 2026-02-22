import { EventEmitter } from "node:events";
import WebSocket from "ws";

export enum Opcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
}

export class GatewayManager extends EventEmitter {
    private ws: WebSocket | null = null;
    private heartbeatInterval: Timer | null = null;
    private lastSequence: number | null = null;
    private url = "wss://gateway.fluxer.app/?v=1&encoding=json&compress=none";

    constructor(private token: string) {
        super();
    }

    connect() {
        console.log("[Gateway] Connecting to WebSocket with spoofed headers...");

        // Faux headers Firefox injectés pour tromper l'Anti-Bot (Cloudflare/Caddy)
        this.ws = new WebSocket(this.url, {
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Connection": "Upgrade",
                "Host": "gateway.fluxer.app",
                "Origin": "https://web.fluxer.app",
                "Pragma": "no-cache",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "websocket",
                "Sec-Fetch-Site": "same-site",
                "Sec-GPC": "1",
                "Sec-WebSocket-Extensions": "permessage-deflate",
                "Sec-WebSocket-Version": "13",
                "Upgrade": "websocket",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0"
            }
        });

        this.ws.on('open', () => {
            console.log("[Gateway] WebSocket Connection Established.");
        });

        this.ws.on('message', (data: any) => {
            const payload = JSON.parse(data.toString());
            console.log(`[RAW WEBSOCKET PAYLOAD] =>`, JSON.stringify(payload).substring(0, 300));

            const { op, d, t, s } = payload;

            if (s !== undefined) this.lastSequence = s;

            switch (op) {
                case Opcode.HELLO:
                    this.handleHello(d.heartbeat_interval);
                    break;
                case Opcode.DISPATCH:
                    console.log(`[DEBUG WS] Type d'événement reçu : ${t}`);
                    this.emit("dispatch", t, d);
                    break;
                case Opcode.HEARTBEAT_ACK:
                    // Le serveur a bien reçu notre Heartbeat
                    break;
                default:
                    console.log(`[Gateway] Unknown Opcode: ${op}`);
            }
        });

        this.ws.on('close', (code, reason) => {
            console.log(`[Gateway] Connection closed (Code: ${code}, Reason: ${reason}). Reconnecting in 5s...`);
            this.stopHeartbeat();
            setTimeout(() => this.connect(), 5000);
        });

        this.ws.on('error', (error) => {
            console.error("[Gateway] WebSocket Error:", error.message);
        });
    }

    private handleHello(interval: number) {
        console.log(`[Gateway] Received Hello. Heartbeat interval: ${interval}ms`);
        this.startHeartbeat(interval);
        this.identify();
    }

    private startHeartbeat(interval: number) {
        this.stopHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            this.send(Opcode.HEARTBEAT, this.lastSequence);
        }, interval) as unknown as Timer;
    }

    private stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    private identify() {
        console.log("[Gateway] Sending Identify payload...");
        this.send(Opcode.IDENTIFY, {
            token: this.token,
            properties: {
                os: "Windows",
                browser: "Firefox",
                device: ""
            }
        });
    }

    private send(op: Opcode, d: any) {
        if (this.ws && (this.ws as any).readyState === 1) { // 1 = OPEN
            this.ws.send(JSON.stringify({ op, d }));
        }
    }
}
