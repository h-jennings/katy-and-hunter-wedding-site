import "server-only";

export const AUTH_TOKEN_KEY = "auth_token" as const;
export const secretKey = process.env.SESSION_SECRET;
