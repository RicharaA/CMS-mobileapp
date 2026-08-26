import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AcademicInfo } from "@/features/profile/components/AcademicInfo";
import { FeeProfile } from "@/features/profile/components/FeeProfile";
import { PersonalInfo } from "@/features/profile/components/PersonalInfo";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { StudentProfile } from "@/features/profile/types/profile.types";

const demoProfile: StudentProfile = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "9800000000",
  dateOfBirth: "2002-05-15",
  gender: "Male",

  program: "BSc. CSIT",
  semester: 4,
  enrollmentYear: 2024,

  fee: {
    total: 120000,
    paid: 90000,
    remaining: 30000,
  },
};

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-6">
          <Text className="text-2xl font-bold text-[#1E293B]">
            Profile
          </Text>

          <Text className="mt-1 text-sm text-gray-500">
            Your student information
          </Text>
        </View>

        <View className="mt-6">
          <ProfileHeader profile={demoProfile} />

          <PersonalInfo profile={demoProfile} />

          <AcademicInfo profile={demoProfile} />

          <FeeProfile profile={demoProfile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}