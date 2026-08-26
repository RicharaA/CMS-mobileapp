import { Menu } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Sidebar from "@/features/navigation/components/Sidebar";

export default function DashboardScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <View className="flex-1">

        {/* Header */}
        <View className="h-[54px] flex-row items-center border-b border-gray-200 bg-white px-4">
          <Pressable
            onPress={() => setSidebarVisible(true)}
            className="mr-3 h-9 w-9 items-center justify-center rounded-lg"
          >
            <Menu size={21} color="#334155" />
          </Pressable>

          <Text className="text-[15px] font-semibold text-[#1E293B]">
            Dashboard
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome */}
          <View className="mt-6">
            <Text className="text-sm text-gray-500">
              Welcome back
            </Text>

            <Text className="mt-1 text-2xl font-bold text-[#1E293B]">
              Student
            </Text>
          </View>

          {/* Fee Summary */}
          <View className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <Text className="text-sm font-medium text-gray-500">
              Fee Balance
            </Text>

            <Text className="mt-2 text-3xl font-bold text-[#1E293B]">
              Rs. 30,000
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
              Remaining balance
            </Text>
          </View>

          {/* Latest Announcement */}
          <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <Text className="text-base font-bold text-[#1E293B]">
              Latest Announcement
            </Text>

            <Text className="mt-3 text-sm font-semibold text-gray-800">
              Examination Schedule
            </Text>

            <Text className="mt-1 text-sm leading-5 text-gray-500">
              The examination schedule has been published.
            </Text>
          </View>
        </ScrollView>

        {/* Sidebar */}
        <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />

      </View>
    </SafeAreaView>
  );
}