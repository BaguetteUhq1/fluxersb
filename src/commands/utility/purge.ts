import type { Command } from "../../types/Command";

const PurgeCommand: Command = {
	name: "purge",
	description: "Supprime tes propres messages récents (Max 50).",
	usage: "!purge <nombre>",
	run: async (client, message, args) => {
		const amount = parseInt(args[0] || "5", 10) || 5;
		const limit = Math.min(amount, 50);

		const messages = (await client.getMessages(
			message.channel_id,
			limit,
		)) as any[];
		let count = 0;

		if (messages && messages.length > 0) {
			for (const msg of messages) {
				if (msg.author.id === client.user?.id) {
					await client
						.deleteMessage(message.channel_id, msg.id)
						.catch(() => {});
					count++;
					await new Promise((r) => setTimeout(r, 400));
				}
			}
		}

		const finalMsg = (await client.sendMessage(
			message.channel_id,
			`🧹 J'ai purgé **${count}** de mes messages ici.`,
		)) as any;

		if (finalMsg?.id) {
			setTimeout(() => {
				client.deleteMessage(message.channel_id, finalMsg.id).catch(() => {});
			}, 3000);
		}
	},
};

export default PurgeCommand;
