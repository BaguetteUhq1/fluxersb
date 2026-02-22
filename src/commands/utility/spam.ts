import type { Command } from "../../types/Command";

const SpamCommand: Command = {
	name: "spam",
	description: "Spam un message (Max 10 fois).",
	usage: "!spam <nombre> <texte>",
	run: async (client, message, args) => {
		const amount = parseInt(args[0] || "5", 10) || 5;
		const text = args.slice(1).join(" ");
		if (!text) return;

		await client.deleteMessage(message.channel_id, message.id).catch(() => {});

		const max = Math.min(amount, 10);
		for (let i = 0; i < max; i++) {
			await client.sendMessage(message.channel_id, text);
			await new Promise((r) => setTimeout(r, 600));
		}
	},
};

export default SpamCommand;
