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
    /** Discriminateur (si applicable) */
    discriminator?: string;
    /** Public flags */
    public_flags?: number;
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
    /** Heure d'envoi */
    timestamp: string;
    /** Heure de modification */
    edited_timestamp: string | null;
    /** TTS */
    tts: boolean;
    /** Mentions everyone */
    mention_everyone: boolean;
    /** Mentions utilisateurs */
    mentions: User[];
    /** Mentions rôles */
    mention_roles: string[];
    /** Fichiers joints */
    attachments: any[];
    /** Embeds */
    embeds: any[];
    /** Réactions */
    reactions?: any[];
    /** Type de message */
    type: number;
}

/**
 * Options pour la modification d'un message.
 */
export interface MessageUpdateOptions {
    /** Nouveau contenu textuel */
    content?: string | null;
    /** Liste d'embeds (max 10) */
    embeds?: any[];
    /** Mentions autorisées */
    allowed_mentions?: {
        parse?: string[];
        users?: string[];
        roles?: string[];
        replied_user?: boolean;
    };
    /** Flags du message */
    flags?: number;
    /** Références de fichiers joints */
    attachments?: any[];
    /** Identifiant d'un mème favori */
    favorite_meme_id?: string;
    /** Liste d'identifiants de stickers (max 3) */
    sticker_ids?: string[];
}

/**
 * Représente un canal Fluxer.
 */
export interface Channel {
    id: string;
    type: number;
    name?: string;
    guild_id?: string;
    position?: number;
    permission_overwrites?: any[];
    parent_id?: string;
    nsfw?: boolean;
    topic?: string;
    last_message_id?: string;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: User[];
    icon?: string;
    owner_id?: string;
    application_id?: string;
}

/**
 * Représente un serveur (Guild).
 */
export interface Guild {
    id: string;
    name: string;
    icon?: string;
    owner_id: string;
    region?: string;
    afk_channel_id?: string;
    afk_timeout?: number;
    verification_level?: number;
    default_message_notifications?: number;
    explicit_content_filter?: number;
    roles: any[];
    emojis: any[];
    features: string[];
    mfa_level: number;
    application_id?: string;
    system_channel_id?: string;
    system_channel_flags?: number;
    rules_channel_id?: string;
    vanity_url_code?: string;
    description?: string;
    banner?: string;
    premium_tier?: number;
    premium_subscription_count?: number;
    preferred_locale?: string;
    public_updates_channel_id?: string;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
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
