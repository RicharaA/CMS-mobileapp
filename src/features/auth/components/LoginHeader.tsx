import { Image } from "expo-image";
import { Text, View } from "react-native";

export function LoginHeader() {
  return (
    <View style={{ alignItems: "center", width: "100%", marginBottom: 28 }}>
      <Image
        source={require("../../../../assets/images/auth/logo.png")}
        style={{
          width: 220,
          height: 60,
          marginBottom: 20,
        }}
        contentFit="contain"
      />

      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          color: "#1a1a2e",
          marginBottom: 6,
        }}
      >
        E Library
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: "#525252ff",
          fontWeight: "400",
        }}
      >
        Log in to your account
      </Text>
    </View>
  );
}