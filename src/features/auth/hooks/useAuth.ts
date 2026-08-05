import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";

import {authConfig} from "../config/auth.config";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export function useAuth() {
    const auth = useAuthContext();
    const discovery = AuthSession.useAutoDiscovery(
        authConfig.issuer
    );

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: authConfig.clientId,
            redirectUri: authConfig.makeRedirectUri,
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

        console.log("OAuth Response:",response);
    },[response]);
    
    return { ...auth, login };
}