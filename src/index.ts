import { serverOf, serverStart } from "./server";

const app = serverOf();
serverStart(app);