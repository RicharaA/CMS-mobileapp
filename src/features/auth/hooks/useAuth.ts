import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

import { useAuthContext } from "@/features/auth/context/AuthContext";
import { authConfig } from "../config/auth.config";
import { exchangeCode, getUserProfile } from "../services/auth.service";

export function useAuth() {
    const auth = useAuthContext();

    const discovery = AuthSession.useAutoDiscovery(
        authConfig.issuer
    );

    const [request, response, promptAsync] =
        AuthSession.useAuthRequest(
            {
                clientId: authConfig.clientId,
                redirectUri: authConfig.redirectUri,
                scopes: authConfig.scopes,
                usePKCE: true,
                prompt: AuthSession.Prompt.Login,
            },
            discovery
        );

    // Prevent the same OAuth authorization code
    // from being exchanged more than once.
    const isProcessingRef = useRef(false);

    async function login() {
        if (!request) {
            console.log(
                "Authorization request is not ready yet."
            );
            return;
        }

        await promptAsync();
    }

    useEffect(() => {
        console.log("AUTH RESPONSE:", response);

        if (!response) {
            console.log("No auth response yet");
            return;
        }

        console.log(
            "AUTH RESPONSE TYPE:",
            response.type
        );

        if (response.type !== "success") {
            console.log(
                "OAuth did not succeed:",
                response
            );
            return;
        }

        // Prevent duplicate processing of the same
        // authorization response.
        if (isProcessingRef.current) {
            console.log(
                "OAuth response already being processed. Skipping."
            );
            return;
        }

        isProcessingRef.current = true;

        const code = response.params.code;

        if (!code) {
            console.error(
                "Authorization code not found"
            );

            isProcessingRef.current = false;
            return;
        }

        if (!request?.codeVerifier) {
            console.error(
                "PKCE code verifier not found"
            );

            isProcessingRef.current = false;
            return;
        }

        if (!discovery) {
            console.error(
                "Discovery document not found"
            );

            isProcessingRef.current = false;
            return;
        }

        const codeVerifier = request.codeVerifier;
        const discoveryDocument = discovery;

        async function completeLogin() {
            try {
                console.log(
                    "========== STARTING LOGIN =========="
                );

                console.log(
                    "Exchanging authorization code..."
                );

                const tokens = await exchangeCode(
                    code,
                    codeVerifier,
                    discoveryDocument
                );

                console.log(
                    "Authorization code exchanged successfully."
                );

                console.log(
                    "Access token received:",
                    !!tokens.accessToken
                );

                console.log(
                    "Fetching user profile..."
                );

                const user = await getUserProfile(
                    tokens.accessToken,
                    discoveryDocument
                );

                console.log(
                    "User profile received:",
                    user
                );

                auth.setAuth(user, tokens);

                console.log(
                    "========== LOGIN SUCCESS =========="
                );

                console.log("User:", user);
                console.log(
                    "Tokens received:",
                    !!tokens
                );

                console.log(
                    "Navigating to /dashboard"
                );

                console.log(
                    "==================================="
                );

                router.replace("/dashboard");
            } catch (error) {
                console.error(
                    "Login failed:",
                    error
                );

                // Allow another login attempt if
                // something went wrong.
                isProcessingRef.current = false;
            }
        }

        completeLogin();
    }, [response, request, discovery]);

    async function logout() {
        if (!discovery?.endSessionEndpoint) {
            console.log("No end session endpoint found");
            auth.clearAuth();
            return;
        }

        try {
            const params = new URLSearchParams();

            if (auth.tokens?.idToken) {
                params.set("id_token_hint", auth.tokens.idToken);
            }

            const endSessionUrl = `${discovery.endSessionEndpoint}?${params.toString()}`;

            console.log("Opening end session URL:", endSessionUrl);

            await WebBrowser.openAuthSessionAsync(endSessionUrl, null);
        } catch (error) {
            console.error("Failed to clear browser session:", error);
        } finally {
            auth.clearAuth();
        }
    }

    return {
        ...auth,
        login,
        logout,
    };
}