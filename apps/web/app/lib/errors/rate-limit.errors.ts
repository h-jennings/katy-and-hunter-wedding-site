import { createTaggedError } from "~/app/lib/errors/tagged-error.types";

export const rateLimitError = createTaggedError<"RATE_LIMIT_EXCEEDED">("RATE_LIMIT_EXCEEDED");
export type RateLimitError = ReturnType<typeof rateLimitError>;
