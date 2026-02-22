import { EventEmitter } from "node:events";
import WebSocket from "ws";
import { RESTManager } from "./RESTManager";
import { type Message, Opcode, type User } from "./types";

/**
 * Le Client principal pour interagir avec Fluxer.
 * Gère la connexion Gateway (WebSocket) et fournit des méthodes pour l'API REST.
 */
export class Client extends EventEmitter {
    /** Jeton d'authentification */
    private readonly token: string;
    /** Gestionnaire REST interne */
    public readonly rest: RESTManager;
    /** Données de l'utilisateur connecté (disponible après l'évènement 'ready') */
    public user: User | null = null;

    private ws: WebSocket | null = null;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private lastSequence: number | null = null;
    private readonly gatewayUrl = "wss://gateway.fluxer.app/?v=1&encoding=json&compress=none";

    /**
     * Crée une instance du client Fluxer.
     * @param token Votre jeton d'authentification Fluxer.
     */
    constructor(token: string) {
        super();
        this.token = token;
        this.rest = new RESTManager(token);
    }

    /**
     * Initialise la connexion au Gateway Fluxer.
     * Émet l'évènement 'ready' une fois connecté.
     */
    public login(): void {
        this.connect();
    }

    private connect(): void {
        this.ws = new WebSocket(this.gatewayUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0",
                Origin: "https://web.fluxer.app",
            },
        });

        this.ws.on("open", () => {
            this.emit("debug", "Connexion WebSocket établie.");
        });

        this.ws.on("message", (data: WebSocket.RawData) => {
            const payload = JSON.parse(data.toString());
            const { op, d, t, s } = payload;

            if (s !== undefined) this.lastSequence = s;

            switch (op) {
                case Opcode.HELLO:
                    this.startHeartbeat(d.heartbeat_interval);
                    this.identify();
                    break;
                case Opcode.HEARTBEAT:
                    this.send(Opcode.HEARTBEAT, this.lastSequence);
                    break;
                case Opcode.DISPATCH:
                    this.handleDispatch(t, d);
                    break;
            }
        });

        this.ws.on("close", (code) => {
            this.emit("debug", `Connexion fermée (Code: ${code}). Reconnexion dans 5s...`);
            this.stopHeartbeat();
            setTimeout(() => this.connect(), 5000);
        });

        this.ws.on("error", (error) => {
            this.emit("error", error);
        });
    }

    private handleDispatch(type: string, data: any): void {
        if (type === "READY") {
            this.user = data.user;
            this.emit("ready", data.user);
        } else if (type === "MESSAGE_CREATE") {
            this.emit("messageCreate", data as Message);
        }
        this.emit("rawDispatch", type, data);
    }

    private identify(): void {
        this.send(Opcode.IDENTIFY, {
            token: this.token,
            properties: {
                os: "Windows",
                browser: "Firefox",
                device: "Desktop",
            },
        });
    }

    private startHeartbeat(interval: number): void {
        this.stopHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            this.send(Opcode.HEARTBEAT, this.lastSequence);
        }, interval);
    }

    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    private send(op: number, d: any): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ op, d }));
        }
    }

    // --- Méthodes API Haut Niveau ---

    /**
     * Envoie un message dans un canal.
     * @param channelId Identifiant du canal.
     * @param content Contenu du message.
     */
    public async sendMessage(channelId: string, content: string) {
        return this.rest.request("POST", `/channels/${channelId}/messages`, { content });
    }

    /**
     * Récupère les derniers messages d'un canal.
     * @param channelId Identifiant du canal.
     * @param limit Nombre de messages à récupérer (Défaut: 50).
     */
    public async getMessages(channelId: string, limit = 50) {
        return this.rest.request("GET", `/channels/${channelId}/messages?limit=${limit}`);
    }

    /**
     * Modifie un message existant.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param content Nouveau contenu.
     */
    public async editMessage(channelId: string, messageId: string, content: string) {
        return this.rest.request("PATCH", `/channels/${channelId}/messages/${messageId}`, { content });
    }

    /**
     * Supprime un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     */
    public async deleteMessage(channelId: string, messageId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}`);
    }

    /**
     * Récupère les informations d'un utilisateur.
     * @param userId Identifiant de l'utilisateur.
     */
    public async getUser(userId: string) {
        return this.rest.request("GET", `/users/${userId}`);
    }

    /**
     * Met à jour les paramètres de l'utilisateur connecté (ex: statut personnalisé).
     * @param settings Objet contenant les paramètres à modifier.
     */
    public async updateSettings(settings: unknown) {
        return this.rest.request("PATCH", "/users/@me/settings", settings);
    }
}
