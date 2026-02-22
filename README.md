# Fluxer Selfbot

Un selfbot extensible, furtif et très réactif pour [Fluxer.app](https://web.fluxer.app/), codé en TypeScript avec Bun.

## Fonctionnalités

*   **WebSocket Natif** : Utilise une sous-connexion WebSocket pour intercepter les messages en temps réel (zéro latence par rapport à un Polling HTTP classique).
*   **Furtivité** : Faux Headers (Firefox Windows) sur les requêtes REST et Gateway pour leurrer la protection Anti-Bot/Cloudflare.
*   **Auto-Restart** : Tolérance de panne. En cas de `ECONNRESET`, l'outil refait la requête en silence. Reconnexion WebSocket automatique si le serveur coupe la ligne.
*   **Sécurité** : Le Selfbot ignore 100% des messages si l'émetteur n'est pas le compte hôte lui-même. Impossible pour les autres de déclencher vos commandes.
*   **Modulaire** : Le code charge dynamiquement n'importe quelle commande TypeScript placée dans `src/commands`.

---

## Installation

1. Assurez-vous d'avoir [Bun](https://bun.sh/) installé sur votre PC (Windows, MacOS ou Linux).
2. Clonez ou téléchargez ce dossier.
3. Installez les paquets (optionnel, l'essentiel est déjà inclus par Bun) :
   ```bash
   bun install
   ```
4. Créez un fichier `.env` à la racine :
   ```env
   TOKEN="votre_token_fluxer_ici"
   ```

## Lancement

Démarrez le script principal avec Bun :

```bash
bun run src/index.ts
```

*Dès le démarrage, l'application vous notifiera de sa bonne connexion au Gateway et du nom d'utilisateur intercepté.*

---

## Commandes Incluses

Par défaut, toutes ces commandes sont écoutées par le Selfbot (et utilisent le préfixe `!`) :

*   **`!ping`** : Affiche la latence du bot en direct.
*   **`!say <texte>`** : Le bot efface incognito la commande originale, et envoie le texte (pour faire croire que vous avez juste écrit normalement).
*   **`!spam <nombre> <texte>`** : Répète un message (bridé à 10 maximum pour ne pas crash ou être ban).
*   **`!purge <nombre>`** : Scanne le salon, et supprime discrètement vos `X` derniers messages (limité à 50).
*   **`!status <texte>`** : Met à jour immédiatement votre "Custom Status" sur Fluxer (disparaît après 24h). `!status` seul réinitialise le statut actuel.
*   **`!rotator <statut 1> | <statut 2>`** : Vous permet de faire défiler automatiquement 2, 3 ou 50 statuts personnalisés qui s'interchangeront toutes les 15 secondes. Taper `!rotator stop` pour annuler !
*   **`!userinfo [ID_Membre]`** : Donne la carte d'identité (nom, ID, URL avatar) d'une cible précise. 
*   **`!avatar [ID_Membre]`** : Siphonner et afficher l'URL exacte de la photo de profil pleine résolution d'un membre.
*   **`!help`** : Liste interactive générée automatiquement d'après la présence des fichiers TypeScript.

## Créer sa propre commande

Ajouter de nouveaux outils à ce framework est très facile !
Créez un nouveau fichier `.ts` (par exemple `tools.ts`) dans `src/commands/utility/` :

```typescript
import type { Command } from "../../types/Command";

const MyCommand: Command = {
	name: "bonjour",
	description: "Une petite commande test.",
	usage: "!bonjour",
	run: async (client, message, args) => {
		await client.sendMessage(message.channel_id, "Bonjour le monde !");
	},
};

export default MyCommand;
```

Dès le redémarrage, la commande sera lue, injectée en mémoire vive, intégrée au menu `!help` et prête à répondre.
