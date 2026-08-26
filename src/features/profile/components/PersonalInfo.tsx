import { Calendar, Mail, Phone, UserRound } from "lucide-react-native";
import { Text, View } from "react-native";

import { StudentProfile } from "../types/profile.types";

interface PersonalInfoProps {
    profile: StudentProfile;
}

export function PersonalInfo({ profile }: PersonalInfoProps) {
    return (
        <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <Text className="text-base font-bold text-[#1E293B]">
                Personal Information
            </Text>

            <View className="mt-4 gap-4">
                <InfoRow
                    icon={<Mail size={18} color="#64748B" />}
                    label="Email"
                    value={profile.email}
                />

                <InfoRow
                    icon={<Phone size={18} color="#64748B" />}
                    label="Phone"
                    value={profile.phoneNumber}
                />

                <InfoRow
                    icon={<Calendar size={18} color="#64748B" />}
                    label="Date of Birth"
                    value={profile.dateOfBirth}
                />

                <InfoRow
                    icon={<UserRound size={18} color="#64748B" />}
                    label="Gender"
                    value={profile.gender}
                />
            </View>
        </View>
    );
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <View className="flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                {icon}
            </View>

            <View className="ml-3 flex-1">
                <Text className="text-xs text-gray-500">
                    {label}
                </Text>

                <Text className="mt-0.5 text-sm font-medium text-[#1E293B]">
                    {value}
                </Text>
            </View>
        </View>
    );
}