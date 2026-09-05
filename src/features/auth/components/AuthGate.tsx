import { ReactNode, useEffect, useState } from "react";

import { useAuthContext } from "../context/AuthContext";
import {
  getDiscovery,
  getUserProfile,
} from "../services/auth.service";
import {
  getTokens,
  removeToken,
} from "../storage/auth.storage";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const auth = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const tokens = await getTokens();

        if (!tokens) {
          return;
        }

        if (tokens.expiresAt <= Date.now()) {
          await removeToken();
          return;
        }

        const discovery = await getDiscovery();

        const user = await getUserProfile(
          tokens.accessToken,
          discovery
        );

        auth.setAuth(user, tokens);

        console.log("Session restored.");
      } catch (error) {
        await removeToken();

        console.error(
          "Failed to restore session:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}