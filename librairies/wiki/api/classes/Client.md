[**Fluxer-Selfbot.js APIReference**](../README.md)

***

[Fluxer-Selfbot.js APIReference](../README.md) / Client

# Class: Client

Defined in: [Client.ts:10](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L10)

Le Client principal pour interagir avec Fluxer.
Gère la connexion Gateway (WebSocket) et fournit des méthodes pour l'API REST.

## Extends

- `EventEmitter`

## Constructors

### Constructor

> **new Client**(`token`): `Client`

Defined in: [Client.ts:27](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L27)

Crée une instance du client Fluxer.

#### Parameters

##### token

`string`

Votre jeton d'authentification Fluxer.

#### Returns

`Client`

#### Overrides

`EventEmitter.constructor`

## Properties

### rest

> `readonly` **rest**: [`RESTManager`](RESTManager.md)

Defined in: [Client.ts:14](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L14)

Gestionnaire REST interne

***

### user

> **user**: [`User`](../interfaces/User.md) \| `null` = `null`

Defined in: [Client.ts:16](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L16)

Données de l'utilisateur connecté (disponible après l'évènement 'ready')

## Methods

### addGroupDMRecipient()

> **addGroupDMRecipient**(`channelId`, `userId`): `Promise`\<`any`\>

Defined in: [Client.ts:174](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L174)

Ajoute un utilisateur à un groupe DM.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### userId

`string`

Identifiant de l'utilisateur à ajouter.

#### Returns

`Promise`\<`any`\>

***

### addReaction()

> **addReaction**(`channelId`, `messageId`, `emoji`): `Promise`\<`any`\>

Defined in: [Client.ts:339](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L339)

Ajoute une réaction à un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### emoji

`string`

L'emoji à ajouter.

#### Returns

`Promise`\<`any`\>

***

### addRoleToMember()

> **addRoleToMember**(`guildId`, `userId`, `roleId`): `Promise`\<`any`\>

Defined in: [Client.ts:602](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L602)

Ajoute un rôle à un membre.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

##### roleId

`string`

Identifiant du rôle.

#### Returns

`Promise`\<`any`\>

***

### banUser()

> **banUser**(`guildId`, `userId`, `reason?`, `deleteMessageDays?`): `Promise`\<`any`\>

Defined in: [Client.ts:536](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L536)

Bannit un utilisateur d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

##### reason?

`string`

Raison du bannissement (optionnel).

##### deleteMessageDays?

`number` = `0`

Nombre de jours de messages à supprimer (0-7).

#### Returns

`Promise`\<`any`\>

***

### bulkCreateEmojis()

> **bulkCreateEmojis**(`guildId`, `emojis`): `Promise`\<`any`\>

Defined in: [Client.ts:640](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L640)

Crée plusieurs emojis d'un coup.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### emojis

`object`[]

Liste des emojis (name, image).

#### Returns

`Promise`\<`any`\>

***

### bulkCreateStickers()

> **bulkCreateStickers**(`guildId`, `stickers`): `Promise`\<`any`\>

Defined in: [Client.ts:685](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L685)

Crée plusieurs stickers d'un coup.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### stickers

`any`[]

Liste des stickers.

#### Returns

`Promise`\<`any`\>

***

### bulkDeleteMessages()

> **bulkDeleteMessages**(`channelId`, `messageIds`): `Promise`\<`any`\>

Defined in: [Client.ts:278](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L278)

#### Parameters

##### channelId

`string`

##### messageIds

`string`[]

#### Returns

`Promise`\<`any`\>

***

### createEmoji()

> **createEmoji**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:631](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L631)

Crée un emoji dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

Données de l'emoji (name, image...).

###### image

`string`

###### name

`string`

#### Returns

`Promise`\<`any`\>

***

### createGuild()

> **createGuild**(`data`): `Promise`\<`any`\>

Defined in: [Client.ts:389](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L389)

Crée un nouveau serveur.

#### Parameters

##### data

Données du serveur (name, icon...).

###### icon?

`string`

###### name

`string`

#### Returns

`Promise`\<`any`\>

***

### createGuildChannel()

> **createGuildChannel**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:439](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L439)

Crée un canal dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`any`

Données du canal (name, type...).

#### Returns

`Promise`\<`any`\>

***

### createInvite()

> **createInvite**(`channelId`, `data?`): `Promise`\<`any`\>

Defined in: [Client.ts:731](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L731)

Crée une invitation pour un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### data?

`any` = `{}`

Paramètres de l'invitation (max_age, max_uses...).

#### Returns

`Promise`\<`any`\>

***

### createRole()

> **createRole**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:564](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L564)

Crée un rôle dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`any`

Données du rôle (name, color, permissions...).

#### Returns

`Promise`\<`any`\>

***

### createSticker()

> **createSticker**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:676](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L676)

Crée un sticker dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`any`

Données du sticker (name, description, tags, image...).

#### Returns

`Promise`\<`any`\>

***

### createWebhook()

> **createWebhook**(`channelId`, `name`, `avatar?`): `Promise`\<`any`\>

Defined in: [Client.ts:759](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L759)

Crée un nouveau webhook dans un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### name

`string`

Nom du webhook.

##### avatar?

`string`

Image de profil (base64, optionnel).

#### Returns

`Promise`\<`any`\>

***

### deleteAttachment()

> **deleteAttachment**(`channelId`, `messageId`, `attachmentId`): `Promise`\<`any`\>

Defined in: [Client.ts:274](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L274)

Supprime un fichier joint d'un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### attachmentId

`string`

Identifiant du fichier joint.

#### Returns

`Promise`\<`any`\>

***

### deleteChannel()

> **deleteChannel**(`channelId`, `silent?`): `Promise`\<`any`\>

Defined in: [Client.ts:165](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L165)

Supprime un canal ou ferme un DM.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### silent?

`boolean` = `false`

Si vrai, ne pas envoyer de notification de suppression.

#### Returns

`Promise`\<`any`\>

***

### deleteEmoji()

> **deleteEmoji**(`guildId`, `emojiId`): `Promise`\<`any`\>

Defined in: [Client.ts:659](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L659)

Supprime un emoji.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### emojiId

`string`

Identifiant de l'emoji.

#### Returns

`Promise`\<`any`\>

***

### deleteGuild()

> **deleteGuild**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:414](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L414)

Supprime un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### deleteInvite()

> **deleteInvite**(`code`): `Promise`\<`any`\>

Defined in: [Client.ts:722](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L722)

Supprime (révoque) une invitation.

#### Parameters

##### code

`string`

Le code d'invitation.

#### Returns

`Promise`\<`any`\>

***

### deleteMessage()

> **deleteMessage**(`channelId`, `messageId`): `Promise`\<`any`\>

Defined in: [Client.ts:264](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L264)

Supprime un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

#### Returns

`Promise`\<`any`\>

***

### deletePermissionOverwrite()

> **deletePermissionOverwrite**(`channelId`, `overwriteId`): `Promise`\<`any`\>

Defined in: [Client.ts:203](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L203)

Supprime une permission spécifique pour un rôle ou un membre dans un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### overwriteId

`string`

Identifiant du rôle ou du membre.

#### Returns

`Promise`\<`any`\>

***

### deleteRole()

> **deleteRole**(`guildId`, `roleId`): `Promise`\<`any`\>

Defined in: [Client.ts:592](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L592)

Supprime un rôle d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### roleId

`string`

Identifiant du rôle.

#### Returns

`Promise`\<`any`\>

***

### deleteSticker()

> **deleteSticker**(`guildId`, `stickerId`): `Promise`\<`any`\>

Defined in: [Client.ts:704](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L704)

Supprime un sticker.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### stickerId

`string`

Identifiant du sticker.

#### Returns

`Promise`\<`any`\>

***

### deleteWebhook()

> **deleteWebhook**(`webhookId`): `Promise`\<`any`\>

Defined in: [Client.ts:803](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L803)

Supprime un webhook (nécessite un token bot).

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

#### Returns

`Promise`\<`any`\>

***

### deleteWebhookWithToken()

> **deleteWebhookWithToken**(`webhookId`, `token`): `Promise`\<`any`\>

Defined in: [Client.ts:812](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L812)

Supprime un webhook via son jeton.

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

##### token

`string`

Jeton du webhook.

#### Returns

`Promise`\<`any`\>

***

### editMessage()

> **editMessage**(`channelId`, `messageId`, `content`): `Promise`\<[`Message`](../interfaces/Message.md)\>

Defined in: [Client.ts:254](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L254)

Modifie un message existant.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### content

Nouveau contenu ou options de modification.

`string` | [`MessageUpdateOptions`](../interfaces/MessageUpdateOptions.md)

#### Returns

`Promise`\<[`Message`](../interfaces/Message.md)\>

***

### executeWebhook()

> **executeWebhook**(`webhookId`, `token`, `data`, `wait?`): `Promise`\<`any`\>

Defined in: [Client.ts:823](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L823)

Exécute un webhook via son jeton.

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

##### token

`string`

Jeton du webhook.

##### data

`any`

Données du message (content, embeds...).

##### wait?

`boolean` = `false`

Si vrai, attendre la réponse de l'API pour obtenir l'objet message.

#### Returns

`Promise`\<`any`\>

***

### getBans()

> **getBans**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:525](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L525)

Liste les bannissements d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getChannel()

> **getChannel**(`channelId`): `Promise`\<`any`\>

Defined in: [Client.ts:147](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L147)

Récupère un canal par son identifiant.

#### Parameters

##### channelId

`string`

Identifiant du canal.

#### Returns

`Promise`\<`any`\>

***

### getChannelWebhooks()

> **getChannelWebhooks**(`channelId`): `Promise`\<`any`\>

Defined in: [Client.ts:749](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L749)

Liste les webhooks d'un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

#### Returns

`Promise`\<`any`\>

***

### getEmojis()

> **getEmojis**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:622](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L622)

Liste les emojis d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getGatewayBot()

> **getGatewayBot**(): `Promise`\<`any`\>

Defined in: [Client.ts:130](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L130)

Récupère l'URL de connexion au Gateway pour un bot.

#### Returns

`Promise`\<`any`\>

***

### getGuild()

> **getGuild**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:397](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L397)

Récupère les informations d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getGuildChannels()

> **getGuildChannels**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:430](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L430)

Liste les canaux d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getGuildMember()

> **getGuildMember**(`guildId`, `userId`): `Promise`\<`any`\>

Defined in: [Client.ts:478](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L478)

Récupère un membre spécifique d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

#### Returns

`Promise`\<`any`\>

***

### getGuildMembers()

> **getGuildMembers**(`guildId`, `options?`): `Promise`\<`any`\>

Defined in: [Client.ts:457](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L457)

Liste les membres d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### options?

Options de pagination (limit, after).

###### after?

`string`

###### limit?

`number`

#### Returns

`Promise`\<`any`\>

***

### getGuildVanityUrl()

> **getGuildVanityUrl**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:422](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L422)

Récupère l'URL personnalisée (vanity) d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getGuildWebhooks()

> **getGuildWebhooks**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:741](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L741)

Liste les webhooks d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getInstance()

> **getInstance**(): `Promise`\<`any`\>

Defined in: [Client.ts:137](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L137)

Récupère les informations de l'instance Fluxer.

#### Returns

`Promise`\<`any`\>

***

### getInvite()

> **getInvite**(`code`): `Promise`\<`any`\>

Defined in: [Client.ts:714](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L714)

Récupère les informations d'une invitation.

#### Parameters

##### code

`string`

Le code d'invitation.

#### Returns

`Promise`\<`any`\>

***

### getMeMember()

> **getMeMember**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:469](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L469)

Récupère les informations de membre de l'utilisateur connecté dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getMessage()

> **getMessage**(`channelId`, `messageId`): `Promise`\<`any`\>

Defined in: [Client.ts:244](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L244)

Récupère un message spécifique.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

#### Returns

`Promise`\<`any`\>

***

### getMessages()

> **getMessages**(`channelId`, `options?`): `Promise`\<`any`\>

Defined in: [Client.ts:224](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L224)

Récupère les derniers messages d'un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### options?

Options de pagination (limit, before, after, around).

###### after?

`string`

###### around?

`string`

###### before?

`string`

###### limit?

`number`

#### Returns

`Promise`\<`any`\>

***

### getPinnedMessages()

> **getPinnedMessages**(`channelId`): `Promise`\<`any`\>

Defined in: [Client.ts:296](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L296)

Liste les messages épinglés d'un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

#### Returns

`Promise`\<`any`\>

***

### getReactions()

> **getReactions**(`channelId`, `messageId`, `emoji`, `options?`): `Promise`\<`any`\>

Defined in: [Client.ts:325](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L325)

Récupère la liste des utilisateurs ayant réagi avec un emoji spécifique.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### emoji

`string`

L'emoji (encodé en URL si nécessaire).

##### options?

Options de pagination (limit, after).

###### after?

`string`

###### limit?

`number`

#### Returns

`Promise`\<`any`\>

***

### getRoles()

> **getRoles**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:555](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L555)

Liste les rôles d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getStickers()

> **getStickers**(`guildId`): `Promise`\<`any`\>

Defined in: [Client.ts:667](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L667)

Liste les stickers d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

#### Returns

`Promise`\<`any`\>

***

### getUser()

> **getUser**(`userId`): `Promise`\<`any`\>

Defined in: [Client.ts:831](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L831)

Récupère les informations d'un utilisateur.

#### Parameters

##### userId

`string`

Identifiant de l'utilisateur.

#### Returns

`Promise`\<`any`\>

***

### getWebhook()

> **getWebhook**(`webhookId`): `Promise`\<`any`\>

Defined in: [Client.ts:767](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L767)

Récupère un webhook via son identifiant (nécessite un token bot).

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

#### Returns

`Promise`\<`any`\>

***

### getWebhookWithToken()

> **getWebhookWithToken**(`webhookId`, `token`): `Promise`\<`any`\>

Defined in: [Client.ts:776](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L776)

Récupère un webhook via son identifiant et son jeton.

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

##### token

`string`

Jeton du webhook.

#### Returns

`Promise`\<`any`\>

***

### kickMember()

> **kickMember**(`guildId`, `userId`): `Promise`\<`any`\>

Defined in: [Client.ts:506](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L506)

Expulse un membre d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

#### Returns

`Promise`\<`any`\>

***

### login()

> **login**(): `void`

Defined in: [Client.ts:37](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L37)

Initialise la connexion au Gateway Fluxer.
Émet l'évènement 'ready' une fois connecté.

#### Returns

`void`

***

### pinMessage()

> **pinMessage**(`channelId`, `messageId`): `Promise`\<`any`\>

Defined in: [Client.ts:305](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L305)

Épingle un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

#### Returns

`Promise`\<`any`\>

***

### removeAllReactions()

> **removeAllReactions**(`channelId`, `messageId`): `Promise`\<`any`\>

Defined in: [Client.ts:379](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L379)

Retire toutes les réactions d'un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

#### Returns

`Promise`\<`any`\>

***

### removeAllReactionsForEmoji()

> **removeAllReactionsForEmoji**(`channelId`, `messageId`, `emoji`): `Promise`\<`any`\>

Defined in: [Client.ts:370](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L370)

Retire toutes les réactions d'un emoji spécifique sur un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### emoji

`string`

L'emoji.

#### Returns

`Promise`\<`any`\>

***

### removeGroupDMRecipient()

> **removeGroupDMRecipient**(`channelId`, `userId`, `silent?`): `Promise`\<`any`\>

Defined in: [Client.ts:184](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L184)

Retire un utilisateur d'un groupe DM.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### userId

`string`

Identifiant de l'utilisateur à retirer.

##### silent?

`boolean` = `false`

Si vrai, ne pas envoyer de notification.

#### Returns

`Promise`\<`any`\>

***

### removeOwnReaction()

> **removeOwnReaction**(`channelId`, `messageId`, `emoji`): `Promise`\<`any`\>

Defined in: [Client.ts:349](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L349)

Retire sa propre réaction d'un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### emoji

`string`

L'emoji à retirer.

#### Returns

`Promise`\<`any`\>

***

### removeRoleFromMember()

> **removeRoleFromMember**(`guildId`, `userId`, `roleId`): `Promise`\<`any`\>

Defined in: [Client.ts:612](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L612)

Retire un rôle à un membre.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

##### roleId

`string`

Identifiant du rôle.

#### Returns

`Promise`\<`any`\>

***

### removeUserReaction()

> **removeUserReaction**(`channelId`, `messageId`, `emoji`, `userId`): `Promise`\<`any`\>

Defined in: [Client.ts:360](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L360)

Retire la réaction d'un autre utilisateur.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

##### emoji

`string`

L'emoji.

##### userId

`string`

Identifiant de l'utilisateur.

#### Returns

`Promise`\<`any`\>

***

### reorderGuildChannels()

> **reorderGuildChannels**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:448](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L448)

Réordonne les canaux d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`object`[]

Tableau de réordonnancement.

#### Returns

`Promise`\<`any`\>

***

### reorderRoles()

> **reorderRoles**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:573](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L573)

Réordonne les rôles d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`object`[]

Tableau de réordonnancement (id, position).

#### Returns

`Promise`\<`any`\>

***

### sendMessage()

> **sendMessage**(`channelId`, `content`): `Promise`\<[`Message`](../interfaces/Message.md)\>

Defined in: [Client.ts:214](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L214)

Envoie un message dans un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### content

Contenu du message ou options d'envoi.

`string` | [`MessageUpdateOptions`](../interfaces/MessageUpdateOptions.md)

#### Returns

`Promise`\<[`Message`](../interfaces/Message.md)\>

***

### setPermissionOverwrite()

> **setPermissionOverwrite**(`channelId`, `overwriteId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:194](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L194)

Définit ou modifie une permission pour un rôle ou un membre dans un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### overwriteId

`string`

Identifiant du rôle ou du membre.

##### data

Données de permission (allow/deny/type).

###### allow?

`string`

###### deny?

`string`

###### type

`0` \| `1`

#### Returns

`Promise`\<`any`\>

***

### transferOwnership()

> **transferOwnership**(`guildId`, `newOwnerId`): `Promise`\<`any`\>

Defined in: [Client.ts:515](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L515)

Transfère la propriété d'un serveur à un autre utilisateur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### newOwnerId

`string`

Identifiant du nouvel utilisateur propriétaire.

#### Returns

`Promise`\<`any`\>

***

### triggerTyping()

> **triggerTyping**(`channelId`): `Promise`\<`any`\>

Defined in: [Client.ts:286](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L286)

Déclenche l'indicateur "en train d'écrire" dans un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

#### Returns

`Promise`\<`any`\>

***

### unbanUser()

> **unbanUser**(`guildId`, `userId`): `Promise`\<`any`\>

Defined in: [Client.ts:545](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L545)

Débannit un utilisateur d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

#### Returns

`Promise`\<`any`\>

***

### unpinMessage()

> **unpinMessage**(`channelId`, `messageId`): `Promise`\<`any`\>

Defined in: [Client.ts:314](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L314)

Désépingle un message.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### messageId

`string`

Identifiant du message.

#### Returns

`Promise`\<`any`\>

***

### updateChannel()

> **updateChannel**(`channelId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:156](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L156)

Met à jour les paramètres d'un canal.

#### Parameters

##### channelId

`string`

Identifiant du canal.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateEmoji()

> **updateEmoji**(`guildId`, `emojiId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:650](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L650)

Met à jour un emoji.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### emojiId

`string`

Identifiant de l'emoji.

##### data

Données à modifier (name).

###### name

`string`

#### Returns

`Promise`\<`any`\>

***

### updateGuild()

> **updateGuild**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:406](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L406)

Met à jour les paramètres d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateGuildMember()

> **updateGuildMember**(`guildId`, `userId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:497](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L497)

Met à jour le membre d'un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### userId

`string`

Identifiant de l'utilisateur.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateMeMember()

> **updateMeMember**(`guildId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:487](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L487)

Met à jour son propre profil de membre dans un serveur.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### data

`any`

Données à modifier (nick, avatar...).

#### Returns

`Promise`\<`any`\>

***

### updateRole()

> **updateRole**(`guildId`, `roleId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:583](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L583)

Met à jour un rôle spécifique.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### roleId

`string`

Identifiant du rôle.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateSettings()

> **updateSettings**(`settings`): `Promise`\<`any`\>

Defined in: [Client.ts:839](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L839)

Met à jour les paramètres de l'utilisateur connecté (ex: statut personnalisé).

#### Parameters

##### settings

`unknown`

Objet contenant les paramètres à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateSticker()

> **updateSticker**(`guildId`, `stickerId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:695](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L695)

Met à jour un sticker.

#### Parameters

##### guildId

`string`

Identifiant du serveur.

##### stickerId

`string`

Identifiant du sticker.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateWebhook()

> **updateWebhook**(`webhookId`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:785](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L785)

Met à jour un webhook (nécessite un token bot).

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>

***

### updateWebhookWithToken()

> **updateWebhookWithToken**(`webhookId`, `token`, `data`): `Promise`\<`any`\>

Defined in: [Client.ts:795](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/Client.ts#L795)

Met à jour un webhook via son jeton.

#### Parameters

##### webhookId

`string`

Identifiant du webhook.

##### token

`string`

Jeton du webhook.

##### data

`any`

Données à modifier.

#### Returns

`Promise`\<`any`\>
