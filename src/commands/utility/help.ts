import type { Command } from "../../types/Command";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Command:Help");

const HelpCommand: Command = {
	name: "help",
	description:
		"Affiche la liste des commandes ou des informations sur une commande spécifique.",
	usage: "!help [commande]",
	run: async (client, message, args) => {
		const prefix = "!";

		if (args.length === 0) {
			let helpMsg = "**Liste des commandes disponibles :**\n";
			client.commands.forEach((cmd) => {
				helpMsg += `\`${prefix}${cmd.name}\` - ${cmd.description}\n`;
			});
			helpMsg += `\nUtilisez \`${prefix}help <commande>\` pour plus d'infos.`;
			await client.sendMessage(message?.channel_id, helpMsg);
		} else {
			const commandName = args[0].toLowerCase();
			const command = client.commands.get(commandName);

			if (!command) {
				await client.sendMessage(
					message?.channel_id,
					`❌ Commande \`${commandName}\` introuvable.`,
				);
				return;
			}

			const helpMsg =
				`**Information sur la commande : ${command.name}**\n` +
				`📝 **Description :** ${command.description}\n` +
				`🚀 **Usage :** \`${command.usage}\``;

			await client.sendMessage(message?.channel_id, helpMsg);
		}
		logger.info(
			`Aide demandée par ${message?.author?.username || "Inconnu"} dans ${message?.channel_id}`,
		);
	},
};

export default HelpCommand;
