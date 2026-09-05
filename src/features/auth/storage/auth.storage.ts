import * as SecureStore from "expo-secure-store";

import { AuthTokens } from "../types/auth.types";

const TOKEN_KEY = "auth_tokens";

export async function saveTokens(tokens: AuthTokens) {
    await SecureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(tokens)
    );
}

export async function getTokens(): Promise<AuthTokens | null> {
    const stored = await SecureStore.getItemAsync(TOKEN_KEY);

    if (!stored) {
        return null;
    }

    try {
        return JSON.parse(stored) as AuthTokens;
    } catch {
        await removeToken();
        return null;
    }
}

export async function getAccessToken(): Promise<string | null> {
    const tokens = await getTokens();

    return tokens?.accessToken ?? null;
}

export async function removeToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}