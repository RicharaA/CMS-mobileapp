import { Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-3xl font-bold text-white">
        Welcome 👋
      </Text>

      <Text className="mt-2 text-center text-base text-gray-400">
        You are successfully authenticated.
      </Text>
    </View>
  );
}