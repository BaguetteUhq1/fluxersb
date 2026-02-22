import type { Command } from "../../types/Command";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Command:Ping");

const PingCommand: Command = {
	name: "ping",
	description: "Répond avec Pong!",
	usage: "!ping",
	run: async (client, message) => {
		logger.info(`Ping reçu dans le salon ${message.channel_id}`);
		await client.sendMessage(message.channel_id, "Pong! 🏓");
	},
};

export default PingCommand;
