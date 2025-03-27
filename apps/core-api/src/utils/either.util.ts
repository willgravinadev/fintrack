/**
 * either.ts
 *
 * This file provides an improved implementation of an Either type,
 * encapsulating both Success and Failure cases. It leverages an abstract
 * base class to share common behaviors and offers utility methods for
 * mapping and chaining operations on the value.
 */

/**
 * Abstract base class for Either types.
 */
export abstract class Either<F, S> {
  public abstract isFailure(): this is Failure<F, S>
  public abstract isSuccess(): this is Success<F, S>

  /**
   * Transforms the success value if available.
   * @param fn - A function to transform the success value.
   * @returns A new Either instance with the transformed success value.
   */
  public abstract map<U>(fn: (s: S) => U): Either<F, U>

  /**
   * Transforms the failure value if available.
   * @param fn - A function to transform the failure value.
   * @returns A new Either instance with the transformed failure value.
   */
  public abstract mapFailure<U>(fn: (f: F) => U): Either<U, S>

  /**
   * Chains another operation that returns an Either if successful.
   * @param fn - A function returning a new Either based on the success value.
   * @returns The result of the chaining function or the original failure.
   */
  public abstract chain<U>(fn: (s: S) => Either<F, U>): Either<F, U>
}

/**
 * Represents a failure state in the Either type.
 */
export class Failure<F, S> extends Either<F, S> {
  public readonly value: F

  constructor(value: F) {
    super()
    this.value = value
  }

  public isFailure(): this is Failure<F, S> {
    return true
  }

  public isSuccess(): this is Success<F, S> {
    return false
  }

  public map<U>(): Either<F, U> {
    // Failure does not transform a success value.
    return new Failure<F, U>(this.value)
  }

  public mapFailure<U>(fn: (f: F) => U): Either<U, S> {
    return new Failure<U, S>(fn(this.value))
  }

  public chain<U>(): Either<F, U> {
    // Propagate failure without chaining.
    return new Failure<F, U>(this.value)
  }
}

/**
 * Represents a success state in the Either type.
 */
export class Success<F, S> extends Either<F, S> {
  public readonly value: S

  constructor(value: S) {
    super()
    this.value = value
  }

  public isFailure(): this is Failure<F, S> {
    return false
  }

  public isSuccess(): this is Success<F, S> {
    return true
  }

  public map<U>(fn: (s: S) => U): Either<F, U> {
    return new Success<F, U>(fn(this.value))
  }

  public mapFailure<U>(): Either<U, S> {
    // For a success, the failure mapping is a no-op.
    return new Success<U, S>(this.value)
  }

  public chain<U>(fn: (s: S) => Either<F, U>): Either<F, U> {
    return fn(this.value)
  }
}

/**
 * Factory functions to create instances of Failure and Success.
 */

export const failure = <F, S>(value: F): Either<F, S> => new Failure<F, S>(value)
export const success = <F, S>(value: S): Either<F, S> => new Success<F, S>(value)
