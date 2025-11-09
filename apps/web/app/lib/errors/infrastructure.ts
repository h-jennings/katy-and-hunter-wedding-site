import { TaggedError } from "./base";

/**
 * Error thrown when a database operation fails.
 */
export class DatabaseError extends TaggedError<"DATABASE_ERROR"> {
  readonly _tag = "DATABASE_ERROR" as const;

  constructor(message = "Failed to query database", cause?: unknown) {
    super(message, cause);
  }
}

/**
 * Error thrown when form or input validation fails.
 */
export class ValidationError extends TaggedError<"VALIDATION_ERROR"> {
  readonly _tag = "VALIDATION_ERROR" as const;

  constructor(
    readonly field: string,
    message: string,
  ) {
    super(message);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      field: this.field,
    };
  }
}

/**
 * Error thrown when a requested resource is not found.
 */
export class NotFoundError extends TaggedError<"NOT_FOUND"> {
  readonly _tag = "NOT_FOUND" as const;

  constructor(
    readonly resource: string,
    message?: string,
  ) {
    super(message ?? `${resource} not found`);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      resource: this.resource,
    };
  }
}

/**
 * Error thrown when a user is not authorized to perform an action.
 */
export class UnauthorizedError extends TaggedError<"UNAUTHORIZED"> {
  readonly _tag = "UNAUTHORIZED" as const;

  constructor(message = "Unauthorized") {
    super(message);
  }
}

/**
 * Union of all infrastructure errors.
 * These are generic errors that can occur across any domain.
 */
export type InfrastructureError =
  | DatabaseError
  | ValidationError
  | NotFoundError
  | UnauthorizedError;
