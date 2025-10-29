import "server-only";

export const AUTH_TOKEN = "auth_token" as const;
export const authSecret = process.env.AUTH_SECRET;
