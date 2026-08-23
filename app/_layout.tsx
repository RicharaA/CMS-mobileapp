import "./../src/global.css";

import { AuthGate } from "@/features/auth/components/AuthGate";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack screenOptions={{
          headerShown: false,
        }} />
      </AuthGate>
    </AuthProvider>
  );
}