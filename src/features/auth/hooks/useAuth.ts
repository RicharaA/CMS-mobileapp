import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";

import {authConfig} from "../config/auth.config";
import { exchangeCode,getUserProfile } from "../services/auth.service";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export function useAuth() {
    const auth = useAuthContext();
    const discovery = AuthSession.useAutoDiscovery(
        authConfig.issuer
    );

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: authConfig.clientId,
            redirectUri: authConfig.redirectUri,
            scopes: authConfig.scopes,
            usePKCE: true,
        },
        discovery
    );
    async function login() {
        if(!request) {
            throw new Error("Authorization request is not ready yet.");
        }
        await  promptAsync();
    }

    useEffect(() =>{
        if(!response) return;

        if(response.type !== "success"){
            return;
        }

        const code = response.params.code;
        if(!code) {
            throw new Error("Authorization code not found");
        }

        if(!request?.codeVerifier){
            throw new Error("PKCE code verifier not found");
        }

        if(!discovery) {
            throw new Error("Discovery document not found");
        }

        const codeVerifier = request.codeVerifier;

        const discoveryDocument = discovery;

       async function completeLogin() {
        try {
            const tokens = await exchangeCode(
            code,
            codeVerifier,
            discoveryDocument
            );

            const user = await getUserProfile(
            tokens.accessToken,
            discoveryDocument
            );

            auth.setAuth(user, tokens);

            console.log("User:", user);
            console.log("Tokens:", tokens);

        } catch (error) {
        console.error("Login failed:", error);
        }
        }
        completeLogin();

    },[response, request, discovery, auth]);
    
    return { ...auth, login };
}