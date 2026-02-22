[**Fluxer-Selfbot.js APIReference**](../README.md)

***

[Fluxer-Selfbot.js APIReference](../README.md) / Opcode

# Enumeration: Opcode

Defined in: [types.ts:136](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L136)

Codes d'opération du Gateway Fluxer.

## Enumeration Members

### DISPATCH

> **DISPATCH**: `0`

Defined in: [types.ts:138](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L138)

Évènement envoyé par le serveur

***

### HEARTBEAT

> **HEARTBEAT**: `1`

Defined in: [types.ts:140](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L140)

Battement de cœur (Keep-alive)

***

### HEARTBEAT\_ACK

> **HEARTBEAT\_ACK**: `11`

Defined in: [types.ts:146](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L146)

Accusé de réception du heartbeat

***

### HELLO

> **HELLO**: `10`

Defined in: [types.ts:144](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L144)

Premier message envoyé par le serveur pour donner l'intervalle de heartbeat

***

### IDENTIFY

> **IDENTIFY**: `2`

Defined in: [types.ts:142](https://github.com/BaguetteUhq1/fluxersb/blob/14ec567e41497392be822a5572d7e15423e8e56d/librairies/src/types.ts#L142)

Identification initiale
