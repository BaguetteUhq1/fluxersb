[**Fluxer-Selfbot.js APIReference**](../README.md)

***

[Fluxer-Selfbot.js APIReference](../README.md) / RESTManager

# Class: RESTManager

Defined in: [RESTManager.ts:5](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/RESTManager.ts#L5)

Gestionnaire des requêtes REST vers l'API Fluxer.
Inclut une logique de redirection anti-détection et de retry automatique.

## Constructors

### Constructor

> **new RESTManager**(`token`): `RESTManager`

Defined in: [RESTManager.ts:9](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/RESTManager.ts#L9)

#### Parameters

##### token

`string`

#### Returns

`RESTManager`

## Methods

### request()

> **request**\<`T`\>(`method`, `endpoint`, `data?`): `Promise`\<`T`\>

Defined in: [RESTManager.ts:19](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/RESTManager.ts#L19)

Envoie une requête générique à l'API.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### method

`string`

Méthode HTTP (GET, POST, etc.)

##### endpoint

`string`

Chemin de l'API (ex: /channels/123/messages)

##### data?

`unknown`

Données à envoyer (optionnel)

#### Returns

`Promise`\<`T`\>
