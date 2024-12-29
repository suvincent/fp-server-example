import Fastify, { FastifyInstance } from "fastify";
import { pipe } from "fp-ts/lib/function";
import { map, mapLeft } from "fp-ts/lib/Either";
import { getValidateEnv } from "./config";
import { AppConfigOf } from "./transform";
import { fullConfig } from "./type/fullConfig";
import { errorShow } from "./errorShow";
const config: fullConfig | null = getValidateEnv();
export const serverOf = () => {
    const app = Fastify();

    app.get("/", async () => {
        return { message: "Hello, fp-ts + Fastify!" };
    });

    return app;
};

export const serverStart = (app: FastifyInstance) => pipe(
    config,
    AppConfigOf,
    mapLeft((errors) => {
        errorShow(errors);
        return errors;
    }),
    map(
        async (config) => {
            const { port, host } = config
            await app.listen({ port, host });
            console.log(`Server started and listening to ${host}:${port}`);
        }
    )
)