import * as AuthSession from "expo-auth-session";

import { authConfig } from "../config/auth.config";

export const discovery = AuthSession.useAutoDiscovery(
    authConfig.issuer
);

