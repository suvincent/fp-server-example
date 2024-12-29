import { Either, getApplicativeValidation, map, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as dotenv from "dotenv";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { sequenceS } from "fp-ts/lib/Apply";
import { validationError } from "../type/validationError";
import { fullConfig } from "../type/fullConfig";
import { getSemigroup } from 'fp-ts/NonEmptyArray'
import { checkExistRule, portRules } from "./rules";
import { errorShow } from "../errorShow";
import { right } from "fp-ts/lib/EitherT";
// Load environment variables
dotenv.config();

// Function to validate the full configuration
export const validatefullConfig = (
    env: NodeJS.ProcessEnv
): Either<NonEmptyArray<validationError>, fullConfig> => {
    // Create an ApplicativeValidation instance
    const ApplicativeValidation = getApplicativeValidation(
        getSemigroup<validationError>()
    );

    // Use sequenceS to combine validation results
    return sequenceS(ApplicativeValidation)({
        port: pipe(env.port, portRules),
        host: pipe(env.host, checkExistRule('host')),
        clientId: pipe(env.clientId, checkExistRule('clientId')),
        clientSecret: pipe(env.clientSecret, checkExistRule('clientSecret')),
        callbackUrl: pipe(env.callbackUrl, checkExistRule('callbackUrl')),
        LDAPone: pipe(env.LDAPone, checkExistRule('LDAPone')),
        LDAPtwo: pipe(env.LDAPtwo, checkExistRule('LDAPtwo')),
    });
}


export var validatedEnv: fullConfig;

export const getValidateEnv = () =>{
    if(!validatedEnv){
        pipe(
            process.env,
            validatefullConfig,
            mapLeft(
                (errors) => {
                    errorShow(errors);
                    return errors;
                }
            ),
            map((config)=>{
                validatedEnv =Object.freeze(config)
            })
        )
    }
    return validatedEnv
}