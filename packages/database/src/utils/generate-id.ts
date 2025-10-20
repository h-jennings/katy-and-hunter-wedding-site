import { customAlphabet } from "nanoid";

export const NANOID_LENGTH = 21;
const nanoid = customAlphabet("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

export function generateId() {
  return nanoid(NANOID_LENGTH);
}
