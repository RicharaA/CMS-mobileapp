import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { removeToken } from "@/features/auth/storage/auth.storage";

export default function DashboardScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await removeToken();
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-[14px] pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-5 mt-3 flex-row justify-between items-center">
          <View>
            <Text className="text-xs font-medium text-gray-500">
              Welcome back
            </Text>

            <Text className="mt-1 text-2xl font-bold text-[#1E293B]">
              Dashboard
            </Text>
          </View>

          <Pressable 
            onPress={handleLogout}
            className="px-4 py-2 bg-red-100 rounded-lg"
          >
            <Text className="text-red-600 font-semibold text-sm">Logout</Text>
          </Pressable>
        </View>

        {/* User Card */}
        <View className="mb-5 overflow-hidden rounded-[14px] bg-[#7B3446] p-5">
          <Text className="text-xs font-medium text-white/70">
            Logged in as
          </Text>

          <Text className="mt-2 text-xl font-bold text-white">
            User
          </Text>

          <Text className="mt-1 text-xs text-white/70">
            Administrator
          </Text>
        </View>

        {/* Stats */}
        <View className="gap-3">
          {/* Students */}
          <View className="h-[68px] flex-row items-center justify-between rounded-xl border border-gray-200 bg-white px-3">
            <View>
              <Text className="text-[8px] font-medium tracking-wide text-gray-500">
                TOTAL STUDENTS
              </Text>

              <Text className="mt-1 text-lg font-bold text-[#1E293B]">
                248
              </Text>
            </View>

            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#F0EAFF]">
              <Text className="text-lg text-[#8B5CF6]">♙</Text>
            </View>
          </View>

          {/* Courses */}
          <View className="h-[68px] flex-row items-center justify-between rounded-xl border border-gray-200 bg-white px-3">
            <View>
              <Text className="text-[8px] font-medium tracking-wide text-gray-500">
                COURSES
              </Text>

              <Text className="mt-1 text-lg font-bold text-[#1E293B]">
                18
              </Text>
            </View>

            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E2F7F0]">
              <Text className="text-lg text-[#10B981]">▱</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text className="mb-3 mt-6 text-base font-bold text-[#1E293B]">
          Quick Actions
        </Text>

        <View className="gap-3">
          <Pressable className="rounded-xl border border-gray-200 bg-white p-4">
            <Text className="text-[15px] font-semibold text-[#1E293B]">
              Students
            </Text>

            <Text className="mt-1 text-xs text-gray-500">
              Manage student records
            </Text>
          </Pressable>

          <Pressable className="rounded-xl border border-gray-200 bg-white p-4">
            <Text className="text-[15px] font-semibold text-[#1E293B]">
              Enrollments
            </Text>

            <Text className="mt-1 text-xs text-gray-500">
              Manage student enrollments
            </Text>
          </Pressable>

          <Pressable className="rounded-xl border border-gray-200 bg-white p-4">
            <Text className="text-[15px] font-semibold text-[#1E293B]">
              Users
            </Text>

            <Text className="mt-1 text-xs text-gray-500">
              Manage system users and roles
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}