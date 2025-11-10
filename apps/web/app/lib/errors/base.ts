/*
  Consider using this pattern instead:

  type TaggedError<Tag extends string, Extra = {}> = {
    readonly _tag: Tag
    readonly message: string
  } & Extra

  export type DatabaseError = TaggedError<'DATABASE_ERROR', { query?: string }>

*/

/**
 * Base class for all application errors using tagged union pattern.
 *
 * @template Tag - The discriminant tag for this error type (e.g., "DATABASE_ERROR")
 *
 * @example
 * ```typescript
 * class DatabaseError extends TaggedError<"DATABASE_ERROR"> {
 *   readonly _tag = "DATABASE_ERROR" as const;
 *
 *   constructor(message = "Failed to query database") {
 *     super(message);
 *   }
 * }
 * ```
 */
export abstract class TaggedError<Tag extends string> extends Error {
  abstract readonly _tag: Tag;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      _tag: this._tag,
      message: this.message,
    };
  }
}

/**
 * Type guard to check if an error is a TaggedError instance.
 *
 * @example
 * ```typescript
 * if (isTaggedError(error)) {
 *   console.log(error._tag);
 * }
 * ```
 */
export function isTaggedError(error: unknown): error is TaggedError<string> {
  return error instanceof TaggedError;
}

/**
 * Type guard to check if an error is a specific TaggedError type.
 *
 * @example
 * ```typescript
 * if (isTaggedErrorOfType(error, "DATABASE_ERROR")) {
 *   // error is DatabaseError
 * }
 * ```
 */
export function isTaggedErrorOfType<T extends string>(error: unknown, tag: T): error is TaggedError<T> {
  return isTaggedError(error) && error._tag === tag;
}
