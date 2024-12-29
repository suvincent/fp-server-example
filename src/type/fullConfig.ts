import { AppConfig } from "./appConfig";
import { LDAPConfig } from "./ldapConfig";
import { SSOConfig } from "./ssoConfig";

export type fullConfig = AppConfig & SSOConfig & LDAPConfig