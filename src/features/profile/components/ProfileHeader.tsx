import { User } from "lucide-react-native";
import { Text, View } from "react-native";

import { StudentProfile } from "../types/profile.types";

interface ProfileHeaderProps {
    profile: StudentProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <View className="items-center rounded-2xl border border-gray-200 bg-white p-5">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#F3E8EE]">
                <User size={36} color="#7B3446" />
            </View>

            <Text className="mt-3 text-xl font-bold text-[#1E293B]">
                {profile.fullName}
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
                {profile.email}
            </Text>

            <Text className="mt-2 rounded-full bg-[#F3E8EE] px-3 py-1 text-xs font-medium text-[#7B3446]">
                Student
            </Text>
        </View>
    );
}