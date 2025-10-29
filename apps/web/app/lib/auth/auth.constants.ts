import "server-only";

export const AUTH_TOKEN = "auth_token" as const;
export const secretKey = process.env.SESSION_SECRET;
