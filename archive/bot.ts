import { FluxerClient } from "./index";

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.error("❌ ERREUR : Le FLUXER_TOKEN est manquant ! Veuillez créer un fichier .env contenant FLUXER_TOKEN=\"votre_token\"");
    process.exit(1);
}

const PREFIX = "!";
/** 
 * IMPORTANT: Add the IDs of the channels you want the bot to listen to.
 * You can find IDs in the Fluxer UI (Developer Mode) or via API.
 */
const CHANNELS_TO_POLL = ["11475141967381917812"]; // Placeholder ID

const client = new FluxerClient(TOKEN);

client.on("ready", (user) => {
    console.log(`[Selfbot] Started as ${user.username}#${user.id}`);
    console.log(`[Selfbot] Ready to serve! Prefix is: ${PREFIX}`);

    // Start polling toutes les 10 secondes (pour éviter l'anti-spam de Fluxer)
    client.startPolling(CHANNELS_TO_POLL, 10000);
});

client.on("messageCreate", async (rawMessage) => {
    // Dans l'événement WebSocket "MESSAGE_CREATE", Fluxer cache le message réel dans une sous-propriété "message" de l'objet de base dans d.
    const message = rawMessage.message || rawMessage;

    // Ignore messages without prefix ou sans contenu
    if (!message || !message.content || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    console.log(`[Command] ${command} received in ${message.channel_id}`);

    try {
        if (command === "ping") {
            const start = Date.now();
            const msg = await client.rest.sendMessage(message.channel_id, "Pinging...") as any;
            const end = Date.now();
            await client.rest.editMessage(message.channel_id, msg.id, `Pong! 🏓 (${end - start}ms)`);
        }

        if (command === "help") {
            const helpText = `**Fluxer Selfbot (Polling Mode) Help**
\`!ping\` - Check latency
\`!help\` - Show this menu
\`!userinfo <id>\` - Get user info
\`!guildinfo\` - Get current guild info
\`!channels\` - List guild channels`;
            await client.rest.sendMessage(message.channel_id, helpText);
        }

        if (command === "userinfo") {
            const userId = args[0] || message.author.id;
            const user = await client.rest.getUser(userId) as any;
            const info = `**User Info: ${user.username}**
ID: \`${user.id}\`
Avatar: ${user.avatar || "None"}`;
            await client.rest.sendMessage(message.channel_id, info);
        }

        // ... other commands remain the same ...
    } catch (error: any) {
        console.error(`[Command Error] ${command}:`, error.message);
    }
});

client.login();
