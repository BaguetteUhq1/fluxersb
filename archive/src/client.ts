import { EventEmitter } from "node:events";
import { RESTManager } from "./rest";
import { GatewayManager } from "./gateway";

export class FluxerClient extends EventEmitter {
    public rest: RESTManager;
    public gateway: GatewayManager;
    public user: any = null;

    constructor(private token: string) {
        super();
        this.rest = new RESTManager(this.token);
        this.gateway = new GatewayManager(this.token);

        // Relais des événements du Gateway vers le Client
        this.gateway.on("dispatch", (type: string, data: any) => {
            if (type === "READY") {
                this.user = data.user;
                this.emit("ready", this.user);
            } else if (type === "MESSAGE_CREATE") {
                // Fluxer envoie les événements MESSAGE_CREATE via websocket!
                this.emit("messageCreate", data);
            }
        });
    }

    public async login() {
        console.log("[Client] Démarrage du Selfbot...");

        // On connecte d'abord le WebSocket. 
        // L'événement READY sera émis par le gateway une fois connecté.
        this.gateway.connect();
    }

    // Gardé pour la compatibilité avec ton script bot.ts
    // Mais cette fonction ne fait plus rien de bloquant puisque le websocket gère en temps réel.
    public startPolling(channelIds: string[], interval: number = 5000) {
        console.log(`[Info] Le Polling est obsolète. Le bot fonctionne en Temps Réel grâce aux WebSockets ! 🚀`);
    }

    public stopPolling() {
        // Obsolete
    }
}
