# Exemple de Base

Voici comment démarrer votre premier selfbot en 30 secondes.

```typescript
import { Client } from "fluxer-selfbot.js";

const client = new Client("VOTRE_TOKEN");

client.on("ready", (user) => {
  console.log(`Connecté en tant que ${user.username}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!ping") {
    await client.sendMessage(message.channel_id, "Pong! 🏓");
  }
});

client.login();
```

Pour des exemples plus avancés (éditions, embeds, webhooks), consultez la [référence API](/api/).
