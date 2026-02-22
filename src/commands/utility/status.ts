import type { Command } from "../../types/Command";

const StatusCommand: Command = {
	name: "status",
	description: "Modifie ton statut personnalisé (ou l'efface si vide).",
	usage: "!status [texte]",
	run: async (client, message, args) => {
		const text = args.join(" ");

		const custom_status = text
			? {
					text: text,
					expires_at: new Date(Date.now() + 86400000).toISOString(),
					emoji_id: null,
					emoji_name: null,
					emoji_animated: null,
				}
			: null;

		await client.updateSettings({ custom_status });

		await client.deleteMessage(message.channel_id, message.id).catch(() => {});

		const msgContent = text
			? `📝 Mon Custom Status est maintenant : **${text}**`
			: `📝 Mon Custom Status a été **réinitialisé**.`;

		const finalMsg = (await client.sendMessage(
			message.channel_id,
			msgContent,
		)) as any;

		if (finalMsg?.id) {
			setTimeout(() => {
				client.deleteMessage(message.channel_id, finalMsg.id).catch(() => {});
			}, 3000);
		}
	},
};

export default StatusCommand;
