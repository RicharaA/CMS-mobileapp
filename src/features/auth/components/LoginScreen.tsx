import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginButton } from "./LoginButton";
import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";

export function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6f0fa" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        {/* Card */}
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            paddingTop: 55,
            paddingBottom: 40,
            paddingHorizontal: 32,
            width: "100%",
            maxWidth: 340,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.05,
            shadowRadius: 20,
            elevation: 10,
            alignItems: "center",
          }}
        >
          <LoginHeader />
          <LoginButton />
        </View>
        <LoginFooter />
      </View>
    </SafeAreaView>
  );
}