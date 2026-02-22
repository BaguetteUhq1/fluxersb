import { Client } from "./index";

// Remplacez par votre vrai token
const TOKEN = "TON-TOKEN";

const client = new Client(TOKEN);

// Évènement déclenché quand le client est connecté
client.on("ready", (user) => {
    console.log(`Connecté en tant que ${user.username} (${user.id})`);
});

// Évènement déclenché à la réception d'un message
client.on("messageCreate", async (message) => {
    // Dans cet exemple, on répond à ses propres messages (Selfbot)
    // Mais on filtre pour ne traiter que les commandes commençant par "!"
    if (!message.content || !message.content.startsWith("!")) return;

    console.log(`[${message.channel_id}] ${message.author.username}: ${message.content}`);

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    // 1. Commande !ping : montre l'envoi et l'édition avec des objets
    if (command === "ping") {
        const start = Date.now();
        // Utilisation d'un objet pour envoyer le message
        const msg = await client.sendMessage(message.channel_id, {
            content: "Pinging... ⏳",
            flags: 0
        });
        const end = Date.now();

        // On attend un peu, puis on édite avec un nouvel objet
        setTimeout(async () => {
            await client.editMessage(message.channel_id, msg.id, {
                content: `Pong ! 🏓 (${end - start}ms)`
            });
        }, 1000);
    }

    // 2. Commande !embed : montre l'utilisation d'un embed (basique)
    if (command === "embed") {
        await client.sendMessage(message.channel_id, {
            content: "Voici un exemple d'embed :",
            embeds: [
                {
                    title: "Fluxer-Selfbot.js",
                    description: "La librairie est ultra rapide !",
                    color: 0x00ff00
                }
            ]
        });
    }

    // 3. Commande !delete : montre la suppression
    if (command === "delete") {
        const msg = await client.sendMessage(message.channel_id, "Ce message s'autodétruira dans 3 secondes...");
        setTimeout(async () => {
            await client.deleteMessage(message.channel_id, msg.id);
        }, 3000);
    }

    // 4. Commande !react : montre les réactions
    if (command === "react") {
        await client.addReaction(message.channel_id, message.id, "🔥");
        await client.addReaction(message.channel_id, message.id, "✅");
    }

    // 5. Commande !info : montre la récupération d'infos (supporte les mentions)
    if (command === "info") {
        // On cherche une mention dans le message (<@id>)
        const mentionMatch = message.content.match(/<@(\d+)>/);
        const targetId = mentionMatch ? mentionMatch[1] : message.author.id;

        const user = await client.getUser(targetId);
        await client.sendMessage(message.channel_id, {
            content: `Infos sur **${user.username}** :`,
            embeds: [{
                fields: [
                    { name: "ID", value: user.id, inline: true },
                    { name: "Avatar", value: user.avatar || "Par défaut", inline: true }
                ]
            }]
        });
    }
});

// Connexion au Gateway
client.login();
