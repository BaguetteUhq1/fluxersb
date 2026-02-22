# Model Context Protocol (MCP) Bridge

Ce fichier sert de point d'entrée pour les assistants IA (comme Claude, GPT-4, etc.) souhaitant intégrer et utiliser la librairie `fluxer-selfbot.js`.

## API Context
Vous pouvez trouver une représentation structurée (JSON) de l'intégralité de l'API ici : [mcp-context.json](./dist/mcp-context.json)

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
