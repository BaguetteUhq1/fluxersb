import type { Command } from "../../types/Command";
import { createLogger } from "../../utils/logger";

const _logger = createLogger("Command:Ping");

const PingCommand: Command = {
	name: "ping",
	description: "Répond avec Pong!",
	usage: "!ping",
	run: async (client, message) => {
		const start = Date.now();
		const msg = (await client.sendMessage(
			message.channel_id,
			"Pinging...",
		)) as any;
		const end = Date.now();

		if (msg?.id) {
			await client.editMessage(
				message.channel_id,
				msg.id,
				`Pong! 🏓 (${end - start}ms)`,
			);
		}
	},
};

export default PingCommand;
