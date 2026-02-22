[**Fluxer-Selfbot.js APIReference**](../README.md)

***

[Fluxer-Selfbot.js APIReference](../README.md) / Message

# Interface: Message

Defined in: [types.ts:20](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L20)

Représente un message envoyé sur un canal.

## Properties

### attachments

> **attachments**: `any`[]

Defined in: [types.ts:42](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L42)

Fichiers joints

***

### author

> **author**: [`User`](User.md)

Defined in: [types.ts:26](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L26)

Auteur du message

***

### channel\_id

> **channel\_id**: `string`

Defined in: [types.ts:24](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L24)

Identifiant du canal où le message a été envoyé

***

### content

> **content**: `string`

Defined in: [types.ts:28](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L28)

Contenu textuel du message

***

### edited\_timestamp

> **edited\_timestamp**: `string` \| `null`

Defined in: [types.ts:32](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L32)

Heure de modification

***

### embeds

> **embeds**: `any`[]

Defined in: [types.ts:44](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L44)

Embeds

***

### id

> **id**: `string`

Defined in: [types.ts:22](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L22)

Identifiant unique du message

***

### mention\_everyone

> **mention\_everyone**: `boolean`

Defined in: [types.ts:36](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L36)

Mentions everyone

***

### mention\_roles

> **mention\_roles**: `string`[]

Defined in: [types.ts:40](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L40)

Mentions rôles

***

### mentions

> **mentions**: [`User`](User.md)[]

Defined in: [types.ts:38](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L38)

Mentions utilisateurs

***

### reactions?

> `optional` **reactions**: `any`[]

Defined in: [types.ts:46](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L46)

Réactions

***

### timestamp

> **timestamp**: `string`

Defined in: [types.ts:30](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L30)

Heure d'envoi

***

### tts

> **tts**: `boolean`

Defined in: [types.ts:34](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L34)

TTS

***

### type

> **type**: `number`

Defined in: [types.ts:48](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L48)

Type de message
