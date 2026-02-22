/**
 * Gestionnaire des requêtes REST vers l'API Fluxer.
 * Inclut une logique de redirection anti-détection et de retry automatique.
 */
export class RESTManager {
    private readonly token: string;
    private readonly baseUrl = "https://api.fluxer.app/v1";

    constructor(token: string) {
        this.token = token;
    }

    /**
     * Envoie une requête générique à l'API.
     * @param method Méthode HTTP (GET, POST, etc.)
     * @param endpoint Chemin de l'API (ex: /channels/123/messages)
     * @param data Données à envoyer (optionnel)
     */
    public async request<T = any>(method: string, endpoint: string, data?: unknown): Promise<T> {
        const apiUrl = `${this.baseUrl}${endpoint}`;

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
                    // On retry sur les erreurs serveur ou rate-limits (429)
                    if (response.status >= 500 || response.status === 429) {
                        throw new Error(`[${response.status}] HTTP Error`);
                    }
                    // Autre erreur fatale (401, 403, 404...)
                    return { error: true, status: response.status, message: text } as any as T;
                }

                try {
                    return JSON.parse(text) as T;
                } catch {
                    return text as any as T;
                }
            } catch (_error: unknown) {
                // Pause de 1s avant retry
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return { error: true, message: "Échec après 10 tentatives" } as any as T;
    }
}
