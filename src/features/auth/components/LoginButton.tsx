import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

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
      style={{
        width: "100%",
        height: 48,
        borderRadius: 6,
        backgroundColor: "#2563eb",
        alignItems: "center",
        justifyContent: "center",
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "600" }}>
            Redirecting...
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Log In
        </Text>
      )}
    </Pressable>
  );
}