/**
 * Représente un utilisateur Fluxer.
 */
export interface User {
    /** Identifiant unique de l'utilisateur */
    id: string;
    /** Nom d'affichage */
    username: string;
    /** URL de l'avatar (optionnel) */
    avatar?: string;
}

/**
 * Représente un message envoyé sur un canal.
 */
export interface Message {
    /** Identifiant unique du message */
    id: string;
    /** Identifiant du canal où le message a été envoyé */
    channel_id: string;
    /** Auteur du message */
    author: User;
    /** Contenu textuel du message */
    content: string;
}

/**
 * Codes d'opération du Gateway Fluxer.
 */
export enum Opcode {
    /** Évènement envoyé par le serveur */
    DISPATCH = 0,
    /** Battement de cœur (Keep-alive) */
    HEARTBEAT = 1,
    /** Identification initiale */
    IDENTIFY = 2,
    /** Premier message envoyé par le serveur pour donner l'intervalle de heartbeat */
    HELLO = 10,
    /** Accusé de réception du heartbeat */
    HEARTBEAT_ACK = 11,
}
