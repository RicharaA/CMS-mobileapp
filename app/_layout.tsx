import "./../src/global.css";

import { useEffect } from "react";
import { AuthGate } from "@/features/auth/components/AuthGate";
import { AuthProvider, useAuthContext } from "@/features/auth/context/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

function RootNavigation() {
  const { isAuthenticated } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not already in auth group
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to dashboard if authenticated and trying to access auth group (like via back button)
      router.replace("/dashboard");
    }
  }, [isAuthenticated, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <RootNavigation />
      </AuthGate>
    </AuthProvider>
  );
}