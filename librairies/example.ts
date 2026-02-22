import { Client } from "./index";

// Remplacez par votre vrai token
const TOKEN = "flx_Cu6JhbPRfqA5PuSadKmBPH3fWLkmc4qbdDnE";

const client = new Client(TOKEN);

// Évènement déclenché quand le client est connecté
client.on("ready", (user) => {
    console.log(`Connecté en tant que ${user.username} (${user.id})`);
});

// Évènement déclenché à la réception d'un message
client.on("messageCreate", async (message) => {
    // Ne pas répondre à ses propres messages (boucle infinie sinon)
    // if (message.author.id === client.user?.id) return;

    console.log(`[${message.channel_id}] ${message.author.username}: ${message.content}`);

    // Exemple de commande simple: !ping
    if (message.content === "!ping") {
        await client.sendMessage(message.channel_id, "Pong ! 🏓");
    }
});

// Connexion au Gateway
client.login();
