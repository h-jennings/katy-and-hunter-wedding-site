"use server";
import "server-only";
import { err, fromPromise, ok, safeTry } from "neverthrow";
import { createAuthJwt } from "~/app/lib/auth/auth.helpers";
import {
  type CodeIncorrectError,
  type CodeRequiredError,
  codeIncorrectError,
  codeRequiredError,
  type UnauthorizedError,
  unauthorizedError,
} from "~/app/lib/errors/auth.errors";
import type { RateLimitError } from "~/app/lib/errors/rate-limit.errors";
import { checkRateLimit, verifyCodeRateLimit } from "~/app/lib/rate-limit/rate-limit.helpers";

type CodeVerificationError = UnauthorizedError | CodeRequiredError | CodeIncorrectError | RateLimitError;

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
    yield* checkRateLimit(verifyCodeRateLimit);
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

  if (code.toLowerCase() !== process.env.INVITE_CODE?.toLowerCase()) {
    return err(codeIncorrectError("Code provided is incorrect"));
  }

  return ok(undefined);
}
