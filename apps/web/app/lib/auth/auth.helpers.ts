import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY, secretKey } from "./auth.constants";

export async function getAuthState() {
  const token = (await cookies()).get(AUTH_TOKEN_KEY)?.value;

  return token;
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { [x: string]: unknown }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to ");
  }
}
