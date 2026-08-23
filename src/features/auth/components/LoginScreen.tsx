import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginButton } from "./LoginButton";
import { LoginFooter } from "./LoginFooter";
import { LoginHeader } from "./LoginHeader";

import { removeToken } from "@/features/auth/storage/auth.storage";

export function LoginScreen() {
  async function handleDeleteToken() {
    await removeToken();
    console.log("Stored token deleted");
  }

  return (
    <SafeAreaView className="flex-1 bg-black dark:bg-black">
      <View className="flex-1 px-8 justify-between">

        <View className="flex-1 justify-center">
          <LoginHeader />

          <LoginButton />

          <Pressable className="mt-6">
            <Text className="text-center text-blue-600 font-medium">
              Forgot Password?
            </Text>
          </Pressable>

          {/* Temporary debugging button */}
          <Pressable
            onPress={handleDeleteToken}
            className="mt-6 rounded-lg bg-red-600 py-3"
          >
            <Text className="text-center font-medium text-white">
              Delete Stored Token
            </Text>
          </Pressable>
        </View>

        <LoginFooter />

      </View>
    </SafeAreaView>
  );
}