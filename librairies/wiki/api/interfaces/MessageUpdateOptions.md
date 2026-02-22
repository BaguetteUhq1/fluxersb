[**Fluxer-Selfbot.js APIReference**](../README.md)

***

[Fluxer-Selfbot.js APIReference](../README.md) / MessageUpdateOptions

# Interface: MessageUpdateOptions

Defined in: [types.ts:54](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L54)

Options pour la modification d'un message.

## Properties

### allowed\_mentions?

> `optional` **allowed\_mentions**: `object`

Defined in: [types.ts:60](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L60)

Mentions autorisées

#### parse?

> `optional` **parse**: `string`[]

#### replied\_user?

> `optional` **replied\_user**: `boolean`

#### roles?

> `optional` **roles**: `string`[]

#### users?

> `optional` **users**: `string`[]

***

### attachments?

> `optional` **attachments**: `any`[]

Defined in: [types.ts:69](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L69)

Références de fichiers joints

***

### content?

> `optional` **content**: `string` \| `null`

Defined in: [types.ts:56](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L56)

Nouveau contenu textuel

***

### embeds?

> `optional` **embeds**: `any`[]

Defined in: [types.ts:58](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L58)

Liste d'embeds (max 10)

***

### favorite\_meme\_id?

> `optional` **favorite\_meme\_id**: `string`

Defined in: [types.ts:71](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L71)

Identifiant d'un mème favori

***

### flags?

> `optional` **flags**: `number`

Defined in: [types.ts:67](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L67)

Flags du message

***

### sticker\_ids?

> `optional` **sticker\_ids**: `string`[]

Defined in: [types.ts:73](https://github.com/BaguetteUhq1/fluxersb/blob/0a0c3102b14f71dea2e9297d00f055490e375f58/librairies/src/types.ts#L73)

Liste d'identifiants de stickers (max 3)
