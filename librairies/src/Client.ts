import { EventEmitter } from "node:events";
import WebSocket from "ws";
import { RESTManager } from "./RESTManager";
import { Opcode, type User, type Message, type MessageUpdateOptions } from "./types";

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

    // --- Gateway & Instance ---

    /**
     * Récupère l'URL de connexion au Gateway pour un bot.
     */
    public async getGatewayBot() {
        return this.rest.request("GET", "/gateway/bot");
    }

    /**
     * Récupère les informations de l'instance Fluxer.
     */
    public async getInstance() {
        return this.rest.request("GET", "/instance");
    }

    // --- Canaux (Channels) ---

    /**
     * Récupère un canal par son identifiant.
     * @param channelId Identifiant du canal.
     */
    public async getChannel(channelId: string) {
        return this.rest.request("GET", `/channels/${channelId}`);
    }

    /**
     * Met à jour les paramètres d'un canal.
     * @param channelId Identifiant du canal.
     * @param data Données à modifier.
     */
    public async updateChannel(channelId: string, data: any) {
        return this.rest.request("PATCH", `/channels/${channelId}`, data);
    }

    /**
     * Supprime un canal ou ferme un DM.
     * @param channelId Identifiant du canal.
     * @param silent Si vrai, ne pas envoyer de notification de suppression.
     */
    public async deleteChannel(channelId: string, silent = false) {
        return this.rest.request("DELETE", `/channels/${channelId}${silent ? "?silent=true" : ""}`);
    }

    /**
     * Ajoute un utilisateur à un groupe DM.
     * @param channelId Identifiant du canal.
     * @param userId Identifiant de l'utilisateur à ajouter.
     */
    public async addGroupDMRecipient(channelId: string, userId: string) {
        return this.rest.request("PUT", `/channels/${channelId}/recipients/${userId}`);
    }

    /**
     * Retire un utilisateur d'un groupe DM.
     * @param channelId Identifiant du canal.
     * @param userId Identifiant de l'utilisateur à retirer.
     * @param silent Si vrai, ne pas envoyer de notification.
     */
    public async removeGroupDMRecipient(channelId: string, userId: string, silent = false) {
        return this.rest.request("DELETE", `/channels/${channelId}/recipients/${userId}${silent ? "?silent=true" : ""}`);
    }

    /**
     * Définit ou modifie une permission pour un rôle ou un membre dans un canal.
     * @param channelId Identifiant du canal.
     * @param overwriteId Identifiant du rôle ou du membre.
     * @param data Données de permission (allow/deny/type).
     */
    public async setPermissionOverwrite(channelId: string, overwriteId: string, data: { allow?: string; deny?: string; type: 0 | 1 }) {
        return this.rest.request("PUT", `/channels/${channelId}/permissions/${overwriteId}`, data);
    }

    /**
     * Supprime une permission spécifique pour un rôle ou un membre dans un canal.
     * @param channelId Identifiant du canal.
     * @param overwriteId Identifiant du rôle ou du membre.
     */
    public async deletePermissionOverwrite(channelId: string, overwriteId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/permissions/${overwriteId}`);
    }

    // --- Messages ---

    /**
     * Envoie un message dans un canal.
     * @param channelId Identifiant du canal.
     * @param content Contenu du message ou options d'envoi.
     */
    public async sendMessage(channelId: string, content: string | MessageUpdateOptions): Promise<Message> {
        const payload = typeof content === "string" ? { content } : content;
        return this.rest.request("POST", `/channels/${channelId}/messages`, payload);
    }

    /**
     * Récupère les derniers messages d'un canal.
     * @param channelId Identifiant du canal.
     * @param options Options de pagination (limit, before, after, around).
     */
    public async getMessages(channelId: string, options: { limit?: number; before?: string; after?: string; around?: string } = {}) {
        let query = "?";
        if (options.limit) query += `limit=${options.limit}&`;
        if (options.before) query += `before=${options.before}&`;
        if (options.after) query += `after=${options.after}&`;
        if (options.around) query += `around=${options.around}&`;
        // Remove trailing '&' or '?' if no options were added
        if (query.length > 1) {
            query = query.slice(0, -1);
        } else {
            query = ""; // No options, no query string
        }
        return this.rest.request("GET", `/channels/${channelId}/messages${query}`);
    }

    /**
     * Récupère un message spécifique.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     */
    public async getMessage(channelId: string, messageId: string) {
        return this.rest.request("GET", `/channels/${channelId}/messages/${messageId}`);
    }

    /**
     * Modifie un message existant.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param content Nouveau contenu ou options de modification.
     */
    public async editMessage(channelId: string, messageId: string, content: string | MessageUpdateOptions): Promise<Message> {
        const payload = typeof content === "string" ? { content } : content;
        return this.rest.request("PATCH", `/channels/${channelId}/messages/${messageId}`, payload);
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
     * Supprime un fichier joint d'un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param attachmentId Identifiant du fichier joint.
     */
    public async deleteAttachment(channelId: string, messageId: string, attachmentId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}/attachments/${attachmentId}`);
    }

    public async bulkDeleteMessages(channelId: string, messageIds: string[]) {
        return this.rest.request("POST", `/channels/${channelId}/messages/bulk-delete`, { message_ids: messageIds });
    }

    /**
     * Déclenche l'indicateur "en train d'écrire" dans un canal.
     * @param channelId Identifiant du canal.
     */
    public async triggerTyping(channelId: string) {
        return this.rest.request("POST", `/channels/${channelId}/typing`);
    }

    // --- Épingles et Réactions (Pins & Reactions) ---

    /**
     * Liste les messages épinglés d'un canal.
     * @param channelId Identifiant du canal.
     */
    public async getPinnedMessages(channelId: string) {
        return this.rest.request("GET", `/channels/${channelId}/messages/pins`);
    }

    /**
     * Épingle un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     */
    public async pinMessage(channelId: string, messageId: string) {
        return this.rest.request("PUT", `/channels/${channelId}/pins/${messageId}`);
    }

    /**
     * Désépingle un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     */
    public async unpinMessage(channelId: string, messageId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/pins/${messageId}`);
    }

    /**
     * Récupère la liste des utilisateurs ayant réagi avec un emoji spécifique.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param emoji L'emoji (encodé en URL si nécessaire).
     * @param options Options de pagination (limit, after).
     */
    public async getReactions(channelId: string, messageId: string, emoji: string, options: { limit?: number; after?: string } = {}) {
        let query = "?";
        if (options.limit) query += `limit=${options.limit}&`;
        if (options.after) query += `after=${options.after}&`;
        const queryString = query.length > 1 ? query.slice(0, -1) : "";
        return this.rest.request("GET", `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}${queryString}`);
    }

    /**
     * Ajoute une réaction à un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param emoji L'emoji à ajouter.
     */
    public async addReaction(channelId: string, messageId: string, emoji: string) {
        return this.rest.request("PUT", `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`);
    }

    /**
     * Retire sa propre réaction d'un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param emoji L'emoji à retirer.
     */
    public async removeOwnReaction(channelId: string, messageId: string, emoji: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`);
    }

    /**
     * Retire la réaction d'un autre utilisateur.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param emoji L'emoji.
     * @param userId Identifiant de l'utilisateur.
     */
    public async removeUserReaction(channelId: string, messageId: string, emoji: string, userId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/${userId}`);
    }

    /**
     * Retire toutes les réactions d'un emoji spécifique sur un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     * @param emoji L'emoji.
     */
    public async removeAllReactionsForEmoji(channelId: string, messageId: string, emoji: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`);
    }

    /**
     * Retire toutes les réactions d'un message.
     * @param channelId Identifiant du canal.
     * @param messageId Identifiant du message.
     */
    public async removeAllReactions(channelId: string, messageId: string) {
        return this.rest.request("DELETE", `/channels/${channelId}/messages/${messageId}/reactions`);
    }

    // --- Serveurs (Guilds) ---

    /**
     * Crée un nouveau serveur.
     * @param data Données du serveur (name, icon...).
     */
    public async createGuild(data: { name: string; icon?: string }) {
        return this.rest.request("POST", "/guilds", data);
    }

    /**
     * Récupère les informations d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getGuild(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}`);
    }

    /**
     * Met à jour les paramètres d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données à modifier.
     */
    public async updateGuild(guildId: string, data: any) {
        return this.rest.request("PATCH", `/guilds/${guildId}`, data);
    }

    /**
     * Supprime un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async deleteGuild(guildId: string) {
        return this.rest.request("POST", `/guilds/${guildId}/delete`);
    }

    /**
     * Récupère l'URL personnalisée (vanity) d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getGuildVanityUrl(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/vanity-url`);
    }

    /**
     * Liste les canaux d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getGuildChannels(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/channels`);
    }

    /**
     * Crée un canal dans un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données du canal (name, type...).
     */
    public async createGuildChannel(guildId: string, data: any) {
        return this.rest.request("POST", `/guilds/${guildId}/channels`, data);
    }

    /**
     * Réordonne les canaux d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Tableau de réordonnancement.
     */
    public async reorderGuildChannels(guildId: string, data: { id: string; position?: number; parent_id?: string | null }[]) {
        return this.rest.request("PATCH", `/guilds/${guildId}/channels`, data);
    }

    /**
     * Liste les membres d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param options Options de pagination (limit, after).
     */
    public async getGuildMembers(guildId: string, options: { limit?: number; after?: string } = {}) {
        let query = "?";
        if (options.limit) query += `limit=${options.limit}&`;
        if (options.after) query += `after=${options.after}&`;
        const queryString = query.length > 1 ? query.slice(0, -1) : "";
        return this.rest.request("GET", `/guilds/${guildId}/members${queryString}`);
    }

    /**
     * Récupère les informations de membre de l'utilisateur connecté dans un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getMeMember(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/members/@me`);
    }

    /**
     * Récupère un membre spécifique d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     */
    public async getGuildMember(guildId: string, userId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/members/${userId}`);
    }

    /**
     * Met à jour son propre profil de membre dans un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données à modifier (nick, avatar...).
     */
    public async updateMeMember(guildId: string, data: any) {
        return this.rest.request("PATCH", `/guilds/${guildId}/members/@me`, data);
    }

    /**
     * Met à jour le membre d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     * @param data Données à modifier.
     */
    public async updateGuildMember(guildId: string, userId: string, data: any) {
        return this.rest.request("PATCH", `/guilds/${guildId}/members/${userId}`, data);
    }

    /**
     * Expulse un membre d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     */
    public async kickMember(guildId: string, userId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/members/${userId}`);
    }

    /**
     * Transfère la propriété d'un serveur à un autre utilisateur.
     * @param guildId Identifiant du serveur.
     * @param newOwnerId Identifiant du nouvel utilisateur propriétaire.
     */
    public async transferOwnership(guildId: string, newOwnerId: string) {
        return this.rest.request("POST", `/guilds/${guildId}/transfer-ownership`, { new_owner_id: newOwnerId });
    }

    // --- Bannissements (Bans) ---

    /**
     * Liste les bannissements d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getBans(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/bans`);
    }

    /**
     * Bannit un utilisateur d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     * @param reason Raison du bannissement (optionnel).
     * @param deleteMessageDays Nombre de jours de messages à supprimer (0-7).
     */
    public async banUser(guildId: string, userId: string, reason?: string, deleteMessageDays = 0) {
        return this.rest.request("PUT", `/guilds/${guildId}/bans/${userId}`, { reason, delete_message_days: deleteMessageDays });
    }

    /**
     * Débannit un utilisateur d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     */
    public async unbanUser(guildId: string, userId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/bans/${userId}`);
    }

    // --- Rôles (Roles) ---

    /**
     * Liste les rôles d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getRoles(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/roles`);
    }

    /**
     * Crée un rôle dans un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données du rôle (name, color, permissions...).
     */
    public async createRole(guildId: string, data: any) {
        return this.rest.request("POST", `/guilds/${guildId}/roles`, data);
    }

    /**
     * Réordonne les rôles d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Tableau de réordonnancement (id, position).
     */
    public async reorderRoles(guildId: string, data: { id: string; position: number }[]) {
        return this.rest.request("PATCH", `/guilds/${guildId}/roles`, data);
    }

    /**
     * Met à jour un rôle spécifique.
     * @param guildId Identifiant du serveur.
     * @param roleId Identifiant du rôle.
     * @param data Données à modifier.
     */
    public async updateRole(guildId: string, roleId: string, data: any) {
        return this.rest.request("PATCH", `/guilds/${guildId}/roles/${roleId}`, data);
    }

    /**
     * Supprime un rôle d'un serveur.
     * @param guildId Identifiant du serveur.
     * @param roleId Identifiant du rôle.
     */
    public async deleteRole(guildId: string, roleId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/roles/${roleId}`);
    }

    /**
     * Ajoute un rôle à un membre.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     * @param roleId Identifiant du rôle.
     */
    public async addRoleToMember(guildId: string, userId: string, roleId: string) {
        return this.rest.request("PUT", `/guilds/${guildId}/members/${userId}/roles/${roleId}`);
    }

    /**
     * Retire un rôle à un membre.
     * @param guildId Identifiant du serveur.
     * @param userId Identifiant de l'utilisateur.
     * @param roleId Identifiant du rôle.
     */
    public async removeRoleFromMember(guildId: string, userId: string, roleId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/members/${userId}/roles/${roleId}`);
    }

    // --- Emojis & Stickers ---

    /**
     * Liste les emojis d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getEmojis(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/emojis`);
    }

    /**
     * Crée un emoji dans un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données de l'emoji (name, image...).
     */
    public async createEmoji(guildId: string, data: { name: string; image: string }) {
        return this.rest.request("POST", `/guilds/${guildId}/emojis`, data);
    }

    /**
     * Crée plusieurs emojis d'un coup.
     * @param guildId Identifiant du serveur.
     * @param emojis Liste des emojis (name, image).
     */
    public async bulkCreateEmojis(guildId: string, emojis: { name: string; image: string }[]) {
        return this.rest.request("POST", `/guilds/${guildId}/emojis/bulk`, { emojis });
    }

    /**
     * Met à jour un emoji.
     * @param guildId Identifiant du serveur.
     * @param emojiId Identifiant de l'emoji.
     * @param data Données à modifier (name).
     */
    public async updateEmoji(guildId: string, emojiId: string, data: { name: string }) {
        return this.rest.request("PATCH", `/guilds/${guildId}/emojis/${emojiId}`, data);
    }

    /**
     * Supprime un emoji.
     * @param guildId Identifiant du serveur.
     * @param emojiId Identifiant de l'emoji.
     */
    public async deleteEmoji(guildId: string, emojiId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/emojis/${emojiId}`);
    }

    /**
     * Liste les stickers d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getStickers(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/stickers`);
    }

    /**
     * Crée un sticker dans un serveur.
     * @param guildId Identifiant du serveur.
     * @param data Données du sticker (name, description, tags, image...).
     */
    public async createSticker(guildId: string, data: any) {
        return this.rest.request("POST", `/guilds/${guildId}/stickers`, data);
    }

    /**
     * Crée plusieurs stickers d'un coup.
     * @param guildId Identifiant du serveur.
     * @param stickers Liste des stickers.
     */
    public async bulkCreateStickers(guildId: string, stickers: any[]) {
        return this.rest.request("POST", `/guilds/${guildId}/stickers/bulk`, { stickers });
    }

    /**
     * Met à jour un sticker.
     * @param guildId Identifiant du serveur.
     * @param stickerId Identifiant du sticker.
     * @param data Données à modifier.
     */
    public async updateSticker(guildId: string, stickerId: string, data: any) {
        return this.rest.request("PATCH", `/guilds/${guildId}/stickers/${stickerId}`, data);
    }

    /**
     * Supprime un sticker.
     * @param guildId Identifiant du serveur.
     * @param stickerId Identifiant du sticker.
     */
    public async deleteSticker(guildId: string, stickerId: string) {
        return this.rest.request("DELETE", `/guilds/${guildId}/stickers/${stickerId}`);
    }

    // --- Invitations (Invites) ---

    /**
     * Récupère les informations d'une invitation.
     * @param code Le code d'invitation.
     */
    public async getInvite(code: string) {
        return this.rest.request("GET", `/invites/${code}`);
    }

    /**
     * Supprime (révoque) une invitation.
     * @param code Le code d'invitation.
     */
    public async deleteInvite(code: string) {
        return this.rest.request("DELETE", `/invites/${code}`);
    }

    /**
     * Crée une invitation pour un canal.
     * @param channelId Identifiant du canal.
     * @param data Paramètres de l'invitation (max_age, max_uses...).
     */
    public async createInvite(channelId: string, data: any = {}) {
        return this.rest.request("POST", `/channels/${channelId}/invites`, data);
    }

    // --- Webhooks ---

    /**
     * Liste les webhooks d'un serveur.
     * @param guildId Identifiant du serveur.
     */
    public async getGuildWebhooks(guildId: string) {
        return this.rest.request("GET", `/guilds/${guildId}/webhooks`);
    }

    /**
     * Liste les webhooks d'un canal.
     * @param channelId Identifiant du canal.
     */
    public async getChannelWebhooks(channelId: string) {
        return this.rest.request("GET", `/channels/${channelId}/webhooks`);
    }

    /**
     * Crée un nouveau webhook dans un canal.
     * @param channelId Identifiant du canal.
     * @param name Nom du webhook.
     * @param avatar Image de profil (base64, optionnel).
     */
    public async createWebhook(channelId: string, name: string, avatar?: string) {
        return this.rest.request("POST", `/channels/${channelId}/webhooks`, { name, avatar });
    }

    /**
     * Récupère un webhook via son identifiant (nécessite un token bot).
     * @param webhookId Identifiant du webhook.
     */
    public async getWebhook(webhookId: string) {
        return this.rest.request("GET", `/webhooks/${webhookId}`);
    }

    /**
     * Récupère un webhook via son identifiant et son jeton.
     * @param webhookId Identifiant du webhook.
     * @param token Jeton du webhook.
     */
    public async getWebhookWithToken(webhookId: string, token: string) {
        return this.rest.request("GET", `/webhooks/${webhookId}/${token}`);
    }

    /**
     * Met à jour un webhook (nécessite un token bot).
     * @param webhookId Identifiant du webhook.
     * @param data Données à modifier.
     */
    public async updateWebhook(webhookId: string, data: any) {
        return this.rest.request("PATCH", `/webhooks/${webhookId}`, data);
    }

    /**
     * Met à jour un webhook via son jeton.
     * @param webhookId Identifiant du webhook.
     * @param token Jeton du webhook.
     * @param data Données à modifier.
     */
    public async updateWebhookWithToken(webhookId: string, token: string, data: any) {
        return this.rest.request("PATCH", `/webhooks/${webhookId}/${token}`, data);
    }

    /**
     * Supprime un webhook (nécessite un token bot).
     * @param webhookId Identifiant du webhook.
     */
    public async deleteWebhook(webhookId: string) {
        return this.rest.request("DELETE", `/webhooks/${webhookId}`);
    }

    /**
     * Supprime un webhook via son jeton.
     * @param webhookId Identifiant du webhook.
     * @param token Jeton du webhook.
     */
    public async deleteWebhookWithToken(webhookId: string, token: string) {
        return this.rest.request("DELETE", `/webhooks/${webhookId}/${token}`);
    }

    /**
     * Exécute un webhook via son jeton.
     * @param webhookId Identifiant du webhook.
     * @param token Jeton du webhook.
     * @param data Données du message (content, embeds...).
     * @param wait Si vrai, attendre la réponse de l'API pour obtenir l'objet message.
     */
    public async executeWebhook(webhookId: string, token: string, data: any, wait = false) {
        return this.rest.request("POST", `/webhooks/${webhookId}/${token}${wait ? "?wait=true" : ""}`, data);
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
