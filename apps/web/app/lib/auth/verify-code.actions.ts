"use server";
import "server-only";
import { err, ok, safeTry } from "neverthrow";
import { TaggedError } from "../errors/base";
import { createAuthJwt } from "./auth.helpers";

type CodeVerificationResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      message: string;
    }
  | null;
export async function verifyCode(
  _initialState: CodeVerificationResponse,
  formData: FormData,
): Promise<CodeVerificationResponse> {
  const result = safeTry(async function* () {
    yield* parseCode(formData);

    await createAuthJwt({ authorized: true, partyId: null });

    return ok(null);
  });

  return result.match(
    () => ({
      status: "success" as const,
    }),
    (error) => ({
      status: "error" as const,
      message: error.message,
    }),
  );
}

function parseCode(formData: FormData) {
  const code = formData.get("code")?.toString();

  if (!code) {
    return err(new CodeRequired());
  }

  return ok(null);
}

class CodeRequired extends TaggedError<"CODE_REQUIRED"> {
  readonly _tag = "CODE_REQUIRED" as const;

  constructor(message = "Code is required") {
    super(message);
  }
}
