import type { Command } from "../../types/Command";

const UserinfoCommand: Command = {
	name: "userinfo",
	description: "Obtenir des infos sur un utilisateur.",
	usage: "!userinfo [id]",
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

		const info = `**User Info:**
Nom: \`${user.username}\` (Global: \`${user.global_name || "N/A"}\`)
ID: \`${user.id}\`
Avatar: ${user.avatar || "None"}
Bot ?: \`${user.bot ? "Oui" : "Non"}\``;

		await client.sendMessage(message.channel_id, info);
	},
};

export default UserinfoCommand;
