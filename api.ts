import { Elysia } from "elysia";
import { spawnSync } from "node:child_process";

// Token depuis l'environnement ou codé en dur (idéalement via .env)
const TOKEN = process.env.FLUXER_TOKEN;

if (!TOKEN) {
    console.error("❌ ERREUR : Le FLUXER_TOKEN est manquant ! Veuillez créer un fichier .env contenant FLUXER_TOKEN=\"votre_token\"");
    process.exit(1);
}

const BASE_URL = "https://api.fluxer.app/v1";

/**
 * Fonction ultra-minimaliste utilisant Python pour parler à Fluxer.
 * Le script Python passe parfaitement la protection Cloudflare car
 * il utilise la signature de python-requests sans modification.
 */
function fluxerRequest(method: string, endpoint: string, body?: any) {
    const url = `${BASE_URL}${endpoint}`;

    // Un mini-script python à la volée qui reproduit EXACTEMENT ii.py qui marche!
    // AVANTAGE : Ajout d'une boucle de RÉESSAI automatique pour encaisser les coupures aléatoires de Fluxer
    const pyScript = `
import requests
import json
import time

headers = {"Authorization": "${TOKEN}"}
method = "${method}"
url = "${url}"
bodyStr = '${body ? JSON.stringify(body).replace(/'/g, "\\'") : ""}'

max_retries = 10
for attempt in range(max_retries):
    try:
        if method == "GET":
            r = requests.get(url, headers=headers, timeout=10)
        elif method == "POST":
            r = requests.post(url, headers=headers, json=json.loads(bodyStr) if bodyStr else None, timeout=10)
        elif method == "PATCH":
            r = requests.patch(url, headers=headers, json=json.loads(bodyStr) if bodyStr else None, timeout=10)
        elif method == "DELETE":
            r = requests.delete(url, headers=headers, timeout=10)
            
        try:
            print(json.dumps(r.json()))
        except:
            print(r.text)
        break # Succès, on stoppe la boucle !
        
    except Exception as e:
        if attempt == max_retries - 1:
            print(json.dumps({"error": "Failed after 10 retries: " + str(e)}))
        else:
            time.sleep(1) # On s'est fait bloquer, on attend 1 seconde et on retente
`;

    const result = spawnSync("python", ["-c", pyScript], { encoding: "utf-8" });

    if (result.error || result.status !== 0) {
        throw new Error(result.error?.message || result.stderr?.toString() || "Erreur Python");
    }

    try {
        return JSON.parse(result.stdout.trim());
    } catch {
        return { message: result.stdout.trim() };
    }
}

// Création de l'API Elysia
const app = new Elysia()
    .get("/", () => "Fluxer Selfbot API is running! 🚀")

    // Route pour avoir son profil
    .get("/me", () => {
        return fluxerRequest("GET", "/users/@me");
    })

    // Route pour avoir les infos d'un utilisateur
    .get("/user/:id", ({ params: { id } }) => {
        return fluxerRequest("GET", `/users/${id}`);
    })

    // Route pour envoyer un message
    .post("/message/:channelId", ({ params: { channelId }, body }) => {
        const payload = body as { content: string };
        return fluxerRequest("POST", `/channels/${channelId}/messages`, payload);
    })

    // Démarrage sur le port 3000
    .listen(3000);

console.log(`🤖 Elysia Selfbot API tourne sur ${app.server?.hostname}:${app.server?.port}`);
