import FluxerClient, { type User, type Message } from "./FluxerClient";
import { createLogger } from "./utils/logger";

type RawMessage = Message | { message: Message };

const logger = createLogger("Main");
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
	logger.error("Aucun token fourni. Veuillez définir process.env.TOKEN.");
	process.exit(1);
}

const client = new FluxerClient(TOKEN);
const PREFIX = "!";

client.on("ready", (user: User) => {
	logger.success(`Connecté en tant que ${user.username}#${user.id}`);
});

client.on("messageCreate", async (rawMessage: RawMessage) => {
	const message = "message" in rawMessage ? rawMessage.message : rawMessage;

	if (!client.user || message.author?.id !== client.user.id) return;
	if (!message?.content || !message.content.startsWith(PREFIX)) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const commandName = args.shift()?.toLowerCase();

	if (!commandName) return;

	const command = client.commands.get(commandName);
	if (command) {
		try {
			await command.run(client, message, args);
		} catch (error: unknown) {
			logger.error(`Erreur lors de l'exécution de ${commandName}:`, error);
		}
	}
});

(async () => {
	await client.loadCommands();
	client.login();
})();
