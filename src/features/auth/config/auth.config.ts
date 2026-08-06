import * as AuthSession from "expo-auth-session";
import {ENV} from "@/api/env"

export const authConfig = {
    issuer: ENV.authServerUrl,

    clientId: ENV.oidcClientId,

    scopes: [
        "openid",
        "profile",
        "email",
        "offline_access",
    ],

    redirectUri: AuthSession.makeRedirectUri({
        scheme: "student-management",
        path: "oauthredirect",
    }),
};