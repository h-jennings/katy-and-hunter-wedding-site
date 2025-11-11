"use server";
import "server-only";
import { err, fromPromise, ok, safeTry } from "neverthrow";
import {
  type CodeRequiredError,
  codeRequiredError,
  type UnauthorizedError,
  unauthorizedError,
} from "../errors/auth.errors";
import { createAuthJwt } from "./auth.helpers";

type CodeVerificationError = UnauthorizedError | CodeRequiredError;

type CodeVerificationResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      reason: CodeVerificationError["_tag"];
    }
  | null;
export async function verifyCode(
  _initialState: CodeVerificationResponse,
  formData: FormData,
): Promise<CodeVerificationResponse> {
  const result = safeTry(async function* () {
    yield* parseCode(formData);

    yield* fromPromise(createAuthJwt({ authorized: true, partyId: null }), () => {
      return unauthorizedError("Failed to create auth token");
    });

    return ok(undefined);
  });

  return result.match(
    () => ({
      status: "success" as const,
    }),
    (error) => ({
      status: "error" as const,
      reason: error._tag,
    }),
  );
}

function parseCode(formData: FormData) {
  const code = formData.get("code")?.toString();

  if (!code) {
    return err(codeRequiredError("Code is required"));
  }

  return ok(undefined);
}
