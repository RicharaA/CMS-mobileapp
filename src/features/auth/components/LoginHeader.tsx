import { Image, Text, View } from "react-native";

export function LoginHeader() {
  return (
    <View className="items-center mb-12">
      {/* <Image
        source={require("@/assets/images/logo.png")}
        className="w-24 h-24 mb-6"
        resizeMode="contain"
      /> */}

      <Text className="text-3xl font-bold text-gray-900 dark:text-white">
        Student Management
      </Text>

      <Text className="text-base text-gray-500 dark:text-gray-400 mt-2">
        Welcome back
      </Text>

      <Text className="text-sm text-gray-400 dark:text-gray-500 mt-1">
        Sign in to continue
      </Text>
    </View>
  );
}