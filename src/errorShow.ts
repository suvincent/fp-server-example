import { validationError } from "./type/validationError";

export const errorShow= (errors: validationError[])=>{
    console.error("Environment validation failed:");
    errors.forEach((error)=>{
        console.error(`error occur on ${error.key}: `, error.error)
    })
}