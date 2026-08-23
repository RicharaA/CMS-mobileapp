import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";

import { useAuth } from "../hooks/useAuth";

export function LoginButton() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      await login();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      onPress={handleLogin}
      disabled={loading}
      className={`
        h-14
        rounded-xl
        items-center
        justify-center
        bg-blue-600
        active:bg-blue-700
        disabled:opacity-50
      `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-base font-semibold">
          Login
        </Text>
      )}
    </Pressable>
  );
}