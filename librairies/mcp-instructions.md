# Model Context Protocol (MCP) Bridge

Ce fichier sert de point d'entrée pour les assistants IA (comme Claude, GPT-4, etc.) souhaitant intégrer et utiliser la librairie `fluxer-selfbot.js`.

## API Context (Lecture seule)
Vous pouvez trouver une représentation structurée (JSON) de l'intégralité de l'API ici : [mcp-context.json](./dist/mcp-context.json)

## Serveur MCP (Interactions)
Le serveur MCP permet aux IA d'exécuter des actions réelles sur Fluxer via votre compte.

### Installation
1. Assurez-vous d'avoir installé les dépendances : `bun install`
2. Configurez votre token : `export FLUXER_TOKEN="votre_token"` (Linux/Mac) ou `$env:FLUXER_TOKEN="votre_token"` (PowerShell)

### Utilisation avec Claude Desktop
Ajoutez cette configuration à votre fichier `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "fluxer": {
      "command": "bun",
      "args": ["run", "librairies/src/mcp-server.ts"],
      "env": {
        "FLUXER_TOKEN": "VOTRE_TOKEN_ICI"
      }
    }
  }
}
```

## Principes de base pour l'IA
- **Authentification** : Utilise un token préfixé ou non.
- **REST** : Géré par la classe `RESTManager` (accessible via `client.rest`).
- **Gateway** : Géré par la classe `Client` via des évènements `ready`, `messageCreate`, etc.
- **Payloads** : Presque toutes les méthodes acceptent soit une chaîne de caractères (`string`), soit un objet d'options complet (`MessageUpdateOptions`).

## Exemples Rapides
```typescript
import { Client } from "fluxer-selfbot.js";
const client = new Client("TOKEN");

// Envoyer un message simple
await client.sendMessage("channel_id", "Hello world");

// Envoyer avec embed riche
await client.sendMessage("channel_id", {
    content: "Annonce",
    embeds: [{ title: "Titre", description: "Contenu" }]
});
```

## Intégration Contextuelle
Pour une meilleure performance, chargez le fichier `dist/mcp-context.json` dans votre contexte pour connaître toutes les méthodes disponibles et leurs signatures exactes.
