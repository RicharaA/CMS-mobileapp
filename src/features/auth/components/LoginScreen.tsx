import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";

import { LoginHeader } from "./LoginHeader";
import { LoginButton } from "./LoginButton";
import { LoginFooter } from "./LoginFooter";

export function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 px-8 justify-between">

        <View className="flex-1 justify-center">
          <LoginHeader />

          <LoginButton />

          <Pressable className="mt-6">
            <Text className="text-center text-blue-600 font-medium">
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <LoginFooter />

      </View>
    </SafeAreaView>
  );
}