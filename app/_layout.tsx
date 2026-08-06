import { Stack } from "expo-router";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AuthGate } from "@/features/auth/components/AuthGate";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
      <Stack screenOptions={{
      headerShown: true,
      }}/>
      </AuthGate>
    </AuthProvider>
  );
}4