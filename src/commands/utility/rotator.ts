import type { Command } from "../../types/Command";

let statusRotatorInterval: any = null;

const RotatorCommand: Command = {
	name: "rotator",
	description: "Alterne tes statuts automatiquement.",
	usage: "!rotator statut1|statut2|statut3 ou !rotator stop",
	run: async (client, message, args) => {
		await client.deleteMessage(message.channel_id, message.id).catch(() => {});

		if (args[0] === "stop") {
			if (statusRotatorInterval) {
				clearInterval(statusRotatorInterval);
				statusRotatorInterval = null;
				await client.updateSettings({ custom_status: null });
				const finalMsg = (await client.sendMessage(
					message.channel_id,
					"🛑 Status Rotator **arrêté**.",
				)) as any;
				if (finalMsg?.id) {
					setTimeout(() => {
						client
							.deleteMessage(message.channel_id, finalMsg.id)
							.catch(() => {});
					}, 3000);
				}
			}
		} else if (args.length > 0) {
			const text = args.join(" ");
			const statuses = text
				.split("|")
				.map((s: string) => s.trim())
				.filter((s: string) => s.length > 0);

			if (statuses.length < 2) {
				const finalMsg = (await client.sendMessage(
					message.channel_id,
					"⚠️ **Erreur** : Il faut au moins 2 statuts séparés par un `|`.",
				)) as any;
				if (finalMsg?.id) {
					setTimeout(() => {
						client
							.deleteMessage(message.channel_id, finalMsg.id)
							.catch(() => {});
					}, 3000);
				}
				return;
			}

			if (statusRotatorInterval) {
				clearInterval(statusRotatorInterval);
			}

			let index = 0;
			const updateStatus = async () => {
				const currentStatus = statuses[index];
				await client.updateSettings({
					custom_status: {
						text: currentStatus,
						expires_at: new Date(Date.now() + 86400000).toISOString(),
						emoji_id: null,
						emoji_name: null,
						emoji_animated: null,
					},
				});
				index = (index + 1) % statuses.length;
			};

			await updateStatus();
			statusRotatorInterval = setInterval(updateStatus, 15000);

			const finalMsg = (await client.sendMessage(
				message.channel_id,
				`🌀 Status Rotator **démarré** avec ${statuses.length} statuts ! (Rotation toutes les 15s)`,
			)) as any;

			if (finalMsg?.id) {
				setTimeout(() => {
					client.deleteMessage(message.channel_id, finalMsg.id).catch(() => {});
				}, 3000);
			}
		}
	},
};

export default RotatorCommand;
