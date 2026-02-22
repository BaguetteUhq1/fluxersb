import { FluxerClient } from "./index";

// Replace with your actual Fluxer token
const TOKEN = "YOUR_FLUXER_TOKEN_HERE";

const client = new FluxerClient(TOKEN);

client.on("ready", (user) => {
    console.log(`Logged in as ${user.username} (${user.id})`);
});

client.on("messageCreate", async (message) => {
    // Prevent self-responding (optional but recommended for a "Ping/Pong" example)
    // if (message.author.id === client.user.id) return;

    if (message.content.toLowerCase() === "ping") {
        console.log(`Received Ping from ${message.author.username} in channel ${message.channel_id}`);

        try {
            await client.rest.sendMessage(message.channel_id, "Pong!");
            console.log("Responded with Pong!");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }
});

client.on("raw", (type, data) => {
    // console.log(`Received event: ${type}`);
});

console.log("Connecting to Fluxer...");
client.login();
