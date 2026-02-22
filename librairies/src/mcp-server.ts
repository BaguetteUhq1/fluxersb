import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { Client } from "./Client.js";

// Utilise le token depuis les variables d'environnement
const token = process.env.FLUXER_TOKEN;

if (!token) {
    console.error("Erreur: La variable d'environnement FLUXER_TOKEN est requise.");
    process.exit(1);
}

const client = new Client(token);

/**
 * Création du serveur MCP pour Fluxer
 */
const server = new Server(
    {
        name: "fluxer-selfbot-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * Liste des outils disponibles pour l'IA
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "send_message",
                description: "Envoyer un message dans un canal Fluxer",
                inputSchema: {
                    type: "object",
                    properties: {
                        channelId: { type: "string", description: "ID du canal" },
                        content: { type: "string", description: "Contenu du message" },
                    },
                    required: ["channelId", "content"],
                },
            },
            {
                name: "add_reaction",
                description: "Ajouter une réaction à un message",
                inputSchema: {
                    type: "object",
                    properties: {
                        channelId: { type: "string", description: "ID du canal" },
                        messageId: { type: "string", description: "ID du message" },
                        emoji: { type: "string", description: "L'emoji (ex: ✅)" },
                    },
                    required: ["channelId", "messageId", "emoji"],
                },
            },
            {
                name: "get_user",
                description: "Récupérer les informations d'un utilisateur",
                inputSchema: {
                    type: "object",
                    properties: {
                        userId: { type: "string", description: "ID de l'utilisateur" },
                    },
                    required: ["userId"],
                },
            },
            {
                name: "get_channel",
                description: "Récupérer les informations d'un canal",
                inputSchema: {
                    type: "object",
                    properties: {
                        channelId: { type: "string", description: "ID du canal" },
                    },
                    required: ["channelId"],
                },
            }
        ],
    };
});

/**
 * Gestion de l'exécution des outils
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "send_message": {
                const { channelId, content } = z
                    .object({
                        channelId: z.string(),
                        content: z.string(),
                    })
                    .parse(args);
                const result = await client.sendMessage(channelId, content);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }

            case "add_reaction": {
                const { channelId, messageId, emoji } = z
                    .object({
                        channelId: z.string(),
                        messageId: z.string(),
                        emoji: z.string(),
                    })
                    .parse(args);
                const result = await client.addReaction(channelId, messageId, emoji);
                return { content: [{ type: "text", text: `Réaction ${emoji} ajoutée avec succès.` }] };
            }

            case "get_user": {
                const { userId } = z.object({ userId: z.string() }).parse(args);
                const result = await client.getUser(userId);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }

            case "get_channel": {
                const { channelId } = z.object({ channelId: z.string() }).parse(args);
                const result = await client.getChannel(channelId);
                return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
            }

            default:
                throw new Error(`Outil inconnu : ${name}`);
        }
    } catch (error: any) {
        return {
            isError: true,
            content: [{ type: "text", text: `Erreur : ${error.message}` }],
        };
    }
});

/**
 * Démarrage du serveur via Stdio
 */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Serveur MCP Fluxer démarré sur STDIO");
}

main().catch((error) => {
    console.error("Erreur fatale du serveur MCP :", error);
    process.exit(1);
});
