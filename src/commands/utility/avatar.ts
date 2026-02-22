import type { Command } from "../../types/Command";

const AvatarCommand: Command = {
	name: "avatar",
	description: "Récupérer l'URL de l'avatar d'un utilisateur.",
	usage: "!avatar [id]",
	run: async (client, message, args) => {
		const userId = args[0] || message.author.id;
		const user = (await client.getUser(userId)) as any;

		if (!user) {
			await client.sendMessage(
				message.channel_id,
				"❌ Utilisateur introuvable.",
			);
			return;
		}

		if (user?.avatar) {
			await client.sendMessage(
				message.channel_id,
				`🖼️ **Avatar de ${user.username}** :\n${user.avatar}`,
			);
		} else {
			await client.sendMessage(
				message.channel_id,
				`❌ Aucun avatar trouvé pour cet utilisateur.`,
			);
		}
	},
};

export default AvatarCommand;
