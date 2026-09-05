import { Menu, ShieldCheck, Users, Megaphone, CreditCard } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Sidebar from "@/features/navigation/components/Sidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { user, primaryRole, isAdmin, isStudent } = useAuth();
  const router = useRouter();

  const userName = user?.name || user?.preferred_username || user?.email || (isAdmin ? "Admin User" : "Student");

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <View className="flex-1">

        {/* Header */}
        <View className="h-[54px] flex-row items-center justify-between border-b border-gray-200 bg-white px-4">
          <View className="flex-row items-center">
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

          <View className="flex-row items-center rounded-full bg-[#7B3446]/10 px-3 py-1">
            <ShieldCheck size={14} color="#7B3446" className="mr-1.5" />
            <Text className="text-xs font-bold text-[#7B3446] uppercase">
              {primaryRole}
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Banner */}
          <View className="mt-6">
            <Text className="text-sm text-gray-500">
              Welcome back
            </Text>

            <Text className="mt-1 text-2xl font-bold text-[#1E293B]">
              {userName}
            </Text>
          </View>

          {/* STUDENT Specific Section */}
          <RoleGuard allowedRoles={["STUDENT", "USER"]}>
            <View className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Fee Balance
                </Text>
                <CreditCard size={18} color="#64748B" />
              </View>

              <Text className="mt-2 text-3xl font-bold text-[#1E293B]">
                Rs. 30,000
              </Text>

              <Text className="mt-1 text-sm text-gray-500">
                Remaining tuition & campus balance
              </Text>
            </View>
          </RoleGuard>

          {/* ADMIN / STAFF Specific Section */}
          <RoleGuard allowedRoles={["ADMIN", "STAFF"]}>
            <View className="mt-6 rounded-2xl border border-gray-200 bg-[#7B3446] p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-white/80">
                  Admin Control Panel
                </Text>
                <ShieldCheck size={20} color="#FFFFFF" />
              </View>

              <Text className="mt-2 text-xl font-bold text-white">
                Management System
              </Text>

              <Text className="mt-1 text-xs text-white/70">
                Full administrative access to student records and announcements
              </Text>

              <View className="mt-4 flex-row gap-3">
                <Pressable
                  onPress={() => router.push("/students")}
                  className="flex-1 flex-row items-center justify-center rounded-xl bg-white/20 py-2.5 px-3 active:bg-white/30"
                >
                  <Users size={16} color="#FFFFFF" className="mr-2" />
                  <Text className="text-xs font-semibold text-white">Students</Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push("/announcements")}
                  className="flex-1 flex-row items-center justify-center rounded-xl bg-white/20 py-2.5 px-3 active:bg-white/30"
                >
                  <Megaphone size={16} color="#FFFFFF" className="mr-2" />
                  <Text className="text-xs font-semibold text-white">Announce</Text>
                </Pressable>
              </View>
            </View>
          </RoleGuard>

          {/* Latest Announcement (All Roles) */}
          <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-bold text-[#1E293B]">
                Latest Announcement
              </Text>
              <Megaphone size={18} color="#7B3446" />
            </View>

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