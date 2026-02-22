import axios from "axios";
import https from "node:https";

export class RESTManager {
    private baseUrl = "https://api.fluxer.app/v1";
    private client;

    constructor(private token: string) {
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            // Agent qui ignore les erreurs SSL/TLS communes sur Windows
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            validateStatus: () => true // On gère les erreurs nous-mêmes
        });
    }

    private async request(method: string, endpoint: string, data?: any) {
        try {
            // On envoie la requête au bridge Python local (port 5556 avec curl_cffi activé)
            const response = await axios.post("http://localhost:5556/proxy", {
                url: `${this.baseUrl}${endpoint}`,
                method: method,
                headers: {
                    "Authorization": this.token,
                },
                data: data
            });

            if (response.status >= 400 && response.status !== 404) {
                console.error(`[REST Error] ${method} ${endpoint} : ${response.status}`, response.data);
            }

            return response.data;
        } catch (error: any) {
            console.error(`[Bridge Error] Impossible de joindre le proxy Python local (Port 5555).`, error.message);
            return null;
        }
    }

    // Users
    async getMe() {
        return this.request("GET", "/users/@me");
    }

    async getUser(userId: string) {
        return this.request("GET", `/users/${userId}`);
    }

    // Channels & DMs
    async createDM(recipientId: string) {
        return this.request("POST", "/users/@me/channels", { recipient_id: recipientId });
    }

    async getChannel(channelId: string) {
        return this.request("GET", `/channels/${channelId}`);
    }

    // Messages
    async sendMessage(channelId: string, content: string) {
        return this.request("POST", `/channels/${channelId}/messages`, { content });
    }

    async getMessages(channelId: string, limit: number = 50) {
        return this.request("GET", `/channels/${channelId}/messages?limit=${limit}`);
    }

    async editMessage(channelId: string, messageId: string, content: string) {
        return this.request("PATCH", `/channels/${channelId}/messages/${messageId}`, { content });
    }

    async deleteMessage(channelId: string, messageId: string) {
        return this.request("DELETE", `/channels/${channelId}/messages/${messageId}`);
    }

    // Guilds
    async getGuild(guildId: string) {
        return this.request("GET", `/guilds/${guildId}`);
    }

    async getGuildChannels(guildId: string) {
        return this.request("GET", `/guilds/${guildId}/channels`);
    }
}
