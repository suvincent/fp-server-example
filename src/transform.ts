import { fullConfig } from "./type/fullConfig";
import { AppConfig } from "./type/appConfig";
import { validationError } from "./type/validationError";
import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

export const AppConfigOf = (env: fullConfig | null): Either<NonEmptyArray<validationError>,AppConfig> => {
    if(!env) return left([{key: 'AppConfig', step:'transform Type', error:'fullConfig not exist'}] as NonEmptyArray<validationError>)
    const {port, host} = env
    return right({
        host,
        port
    })
}