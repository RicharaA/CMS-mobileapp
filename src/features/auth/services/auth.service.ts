import * as AuthSession from "expo-auth-session";

import { authConfig } from "../config/auth.config";
import { saveToken, getToken, removeToken } from "@/features/auth/storage/auth.storage";
import { AuthTokens } from "@/features/auth/types/auth.types";

export async function getDiscovery() {
    return AuthSession.fetchDiscoveryAsync(authConfig.issuer);
}

export async function exchangeCode(
    code: string,
    codeVerifier: string,
    discovery: AuthSession.DiscoveryDocument
): Promise<AuthTokens> {
    const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
            clientId: authConfig.clientId,
            code,
            redirectUri: authConfig.makeRedirectUri,
            extraParams: {
                code_verifier: codeVerifier,
            },
        },
        discovery
    );

    const tokens: AuthTokens = {
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
        idToken: tokenResponse.idToken,
        expiresAt: tokenResponse.expiresIn ? Date.now() + tokenResponse.expiresIn * 1000 : 0,
        tokenType: tokenResponse.tokenType,
    };

    await saveToken(JSON.stringify(tokens));
    
    return tokens;
}