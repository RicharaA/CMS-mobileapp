import { Text, View } from "react-native";
import Constants from "expo-constants";

export function LoginFooter() {
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <View className="items-center mt-10">
      <Text className="text-xs text-gray-400">
        Version {version}
      </Text>

      <Text className="text-xs text-gray-400 mt-1">
        © 2026 Student Management
      </Text>
    </View>
  );
}