import type { Command } from "../../types/Command";

const SayCommand: Command = {
	name: "say",
	description: "Envoie un message et supprime la commande source incognito.",
	usage: "!say <texte>",
	run: async (client, message, args) => {
		const text = args.join(" ");
		if (!text) return;

		await client.deleteMessage(message.channel_id, message.id).catch(() => {});
		await client.sendMessage(message.channel_id, text);
	},
};

export default SayCommand;
