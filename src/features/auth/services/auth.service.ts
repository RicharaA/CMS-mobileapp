import * as AuthSession from "expo-auth-session";

import { authConfig } from "../config/auth.config";
import { saveToken, getToken, removeToken } from "@/features/auth/storage/auth.storage";
import { AuthTokens, UserProfile } from "@/features/auth/types/auth.types";

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
            redirectUri: authConfig.redirectUri,
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
        expiresAt: Date.now() + (tokenResponse.expiresIn ?? 0) * 1000,
        tokenType: tokenResponse.tokenType ?? "Bearer",
    };

    await saveToken(JSON.stringify(tokens));
    
    return tokens;
}

export async function getUserProfile(
  accessToken: string,
  discovery: AuthSession.DiscoveryDocument
): Promise<UserProfile> {

  if (!discovery.userInfoEndpoint) {
    throw new Error("UserInfo endpoint not found in discovery document.");
  }

  const response = await fetch(discovery.userInfoEndpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile.");
  }

  return (await response.json()) as UserProfile;
}