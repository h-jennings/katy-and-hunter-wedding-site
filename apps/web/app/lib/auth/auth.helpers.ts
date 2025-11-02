import "server-only";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { AUTH_TOKEN, authSecret } from "./auth.constants";

export async function getAuthState() {
  const token = (await cookies()).get(AUTH_TOKEN)?.value;
  const payload = await decrypt(token);

  return { authorized: payload?.authorized ?? false, partyId: payload?.partyId ?? null };
}

const encodedKey = new TextEncoder().encode(authSecret);

interface AuthPayload extends JWTPayload {
  authorized: boolean;
  partyId: string | null;
}

export async function encrypt(payload: AuthPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export async function decrypt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<AuthPayload>(jwt, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_error) {
    console.log("Failed to ");
  }
}

export async function createAuthJwt(payload: AuthPayload) {
  const jwt = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_TOKEN, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1, // 1 day
  });
}
