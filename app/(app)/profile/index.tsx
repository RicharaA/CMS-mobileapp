import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { Menu } from "lucide-react-native";

import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { PersonalInfo } from "@/features/profile/components/PersonalInfo";
// import { AcademicInfo } from "@/features/profile/components/AcademicInfo";
// import { FeeProfile } from "@/features/profile/components/FeeProfile";
import { UserAccountProfile } from "@/features/profile/components/UserAccountProfile";
import Sidebar from "@/features/navigation/components/Sidebar";

import { getStudentProfile } from "@/features/profile/services/profile.service";
import { StudentProfile } from "@/features/profile/types/profile.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function ProfileScreen() {
  const { user, primaryRole, roles, isStudent } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  async function loadProfile() {
    try {
      if (isStudent) {
        const data = await getStudentProfile();
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.log("Could not load student-specific profile record, showing user account view instead.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await loadProfile();
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [isStudent]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F8F9FA]">
        <ActivityIndicator size="large" color="#7B3446" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <View className="flex-1">
        {/* Header Bar */}
        <View className="h-[54px] flex-row items-center border-b border-gray-200 bg-white px-4">
          <Pressable
            onPress={() => setSidebarVisible(true)}
            className="mr-3 h-9 w-9 items-center justify-center rounded-lg"
          >
            <Menu size={21} color="#334155" />
          </Pressable>
          <Text className="text-[15px] font-semibold text-[#1E293B]">
            User Profile
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <View className="mt-6">
            <Text className="text-2xl font-bold text-[#1E293B]">
              Profile
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
              {profile ? "Your student information" : "Your account details"}
            </Text>
          </View>

          {profile ? (
            <View className="mt-6">
              <ProfileHeader profile={profile} />
              <PersonalInfo profile={profile} />
              {/* <AcademicInfo profile={profile} /> */}
              {/* <FeeProfile profile={profile} /> */}
            </View>
          ) : (
            <UserAccountProfile
              user={user}
              primaryRole={primaryRole}
              roles={roles}
            />
          )}
        </ScrollView>

        <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}