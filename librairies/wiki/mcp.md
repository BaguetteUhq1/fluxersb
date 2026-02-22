# Model Context Protocol (MCP)

Donnez des super-pouvoirs à votre assistant IA en intégrant directement **Fluxer-Selfbot.js**.

Le Model Context Protocol permet à une IA (comme Claude ou Cursor) de comprendre et de piloter votre selfbot en temps réel.

## Pourquoi utiliser MCP ?

- **Pilotage par la voix/texte** : Demandez à votre IA d'envoyer un message ou de bannir un utilisateur.
- **Zéro erreur de code** : L'IA connaît exactement les signatures de vos fonctions grâce au contexte JSON.
- **Automatisation intelligente** : L'IA peut chaîner des actions complexes sur Fluxer pour vous.

## 1. Contexte API (Lecture seule)

Le fichier `mcp-context.json` est un export complet de la structure de la librairie. Il permet à l'IA de connaître toutes les méthodes disponibles.

**Lien du fichier :** `/dist/mcp-context.json` (Généré via `bun run docs:mcp`)

## 2. Serveur MCP Interactif

Le serveur MCP (`src/mcp-server.ts`) permet à l'IA d'exécuter des actions réelles sur votre compte Fluxer.

### Configuration Claude Desktop

Pour permettre à Claude de contrôler votre compte, ajoutez ceci à votre fichier `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "fluxer": {
      "command": "bun",
      "args": ["run", "PATH_TO_YOUR_PROJECT/librairies/src/mcp-server.ts"],
      "env": {
        "FLUXER_TOKEN": "VOTRE_TOKEN_FLUXER"
      }
    }
  }
}
```

> [!TIP]
> Remplacez `PATH_TO_YOUR_PROJECT` par le chemin absolu vers le dossier de votre projet.

### Outils disponibles

Une fois configurée, l'IA aura accès aux outils suivants :
- `send_message` : Envoyer un message textuel.
- `add_reaction` : Ajouter une réaction (emoji).
- `get_user` : Récupérer les infos d'un membre.
- `get_channel` : Voir les détails d'un salon.

## 3. Scripts de maintenance

Si vous modifiez la librairie, mettez à jour le contexte pour l'IA :

```bash
bun run docs:mcp
```
