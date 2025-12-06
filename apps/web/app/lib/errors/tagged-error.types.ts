/**
 * Core utilities for creating function-based tagged errors.
 * Inspired by the browser-extension error system.
 */

/**
 * A tagged error type with a discriminant tag and optional extra data.
 */
export type TaggedError<Tag extends string, Extra = Record<string, unknown>> = {
  readonly _tag: Tag;
  readonly message: string;
} & Extra;

/**
 * Creates a tagged error factory function.
 *
 * @example
 * // Simple error
 * const databaseError = createTaggedError("DATABASE_ERROR");
 * return err(databaseError("Failed to query database"));
 *
 * @example
 * // Error with extra data
 * const validationError = createTaggedError<"VALIDATION_ERROR", { field: string }>("VALIDATION_ERROR");
 * return err(validationError("Invalid email", { field: "email" }));
 */
export function createTaggedError<const Tag extends string, Extra = Record<string, unknown>>(
  tag: Tag,
): (message: string, extra?: Extra) => TaggedError<Tag, Extra> {
  return (message: string, extra?: Extra): TaggedError<Tag, Extra> => ({
    _tag: tag,
    message,
    ...(extra as Extra),
  });
}

/**
 * Creates a type guard function for a union of tagged errors.
 *
 * @example
 * const isAuthError = createErrorTypeGuard<AuthError>(AUTH_ERROR_TAGS);
 *
 * if (isAuthError(error)) {
 *   // error is narrowed to AuthError
 * }
 */
export function createErrorTypeGuard<T extends TaggedError<string>>(
  tags: ReadonlyArray<T["_tag"]>,
): (error: unknown) => error is T {
  return (error: unknown): error is T => {
    return (
      error !== null &&
      typeof error === "object" &&
      "_tag" in error &&
      typeof error._tag === "string" &&
      tags.includes(error._tag as T["_tag"])
    );
  };
}
