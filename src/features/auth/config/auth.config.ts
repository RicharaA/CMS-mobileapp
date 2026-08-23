
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

    redirectUri: ENV.mobileRedirectUri,
};