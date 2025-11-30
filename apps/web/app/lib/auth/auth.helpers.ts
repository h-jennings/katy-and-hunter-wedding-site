import "server-only";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { AUTH_TOKEN, authSecret } from "~/app/lib/auth/auth.constants";

export async function getAuthState() {
  const token = (await cookies()).get(AUTH_TOKEN)?.value;
  const payload = await decrypt(token);

  return { partyId: payload?.partyId ?? null };
}

const encodedKey = new TextEncoder().encode(authSecret);

interface AuthPayload extends JWTPayload {
  partyId: string | null;
}

export async function encrypt(payload: AuthPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
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

export async function clearAuthJwt() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN);
}
