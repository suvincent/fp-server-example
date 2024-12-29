import { Either, left, right, chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { validationError } from "../type/validationError";
import { isInRange, isNonEmptyString, isNumber, isStringType } from "./utils";
type ValidationRule<A> = (value: A) => Either<NonEmptyArray<validationError>, A>;

// Helper to create a validation rule
export const createRule =
  <A>(
    key: string,
    step: string,
    predicate: (value: A) => boolean,
    errorMessage: string
  ): ValidationRule<A> =>
  (value) =>
    predicate(value)
      ? right(value)
      : left([{ key, step, error: errorMessage }] as NonEmptyArray<validationError>);

// Define validation rules for each key
export const portRules= (value: string|undefined) => pipe(
    value,
    createRule("port", "isExist", isStringType, "port must exist"),
    chain((v)=>right(v!)),
    chain(createRule("port", "isNonEmpty", isNonEmptyString, "port must be a non-empty string")),
    chain(createRule("port", "canParseInt", isNumber, "port must be a valid integer")),
    chain((v)=>right(parseInt(v))),
    chain(createRule<number>("port","isInRange", isInRange(0,65535), "port must be in the range 1-65535"))
)

export const hostRules= (value: string|undefined) => pipe(
    value,
    createRule("host", "isExist", isStringType, "host must exist"),
    chain((v)=>right(v!)),
    chain(createRule("host", "isNonEmpty", isNonEmptyString, "host must be a non-empty string")),
);

export const checkExistRule= (key: string)=> (value: string|undefined) => pipe(
    value,
    createRule(key, "isExist", isStringType, `${key} must exist`),
    chain((v)=>right(v!)),
    chain(createRule(key, "isNonEmpty", isNonEmptyString, `${key} must be a non-empty string`)),
);