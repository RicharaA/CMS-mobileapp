import { BookOpen, CalendarDays, GraduationCap } from "lucide-react-native";
import { Text, View } from "react-native";

import { StudentProfile } from "../types/profile.types";

interface AcademicInfoProps {
    profile: StudentProfile;
}

export function AcademicInfo({ profile }: AcademicInfoProps) {
    return (
        <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <Text className="text-base font-bold text-[#1E293B]">
                Academic Information
            </Text>

            <View className="mt-4 gap-4">
                <InfoRow
                    icon={<GraduationCap size={18} color="#64748B" />}
                    label="Program"
                    value={profile.program}
                />

                <InfoRow
                    icon={<BookOpen size={18} color="#64748B" />}
                    label="Semester"
                    value={`Semester ${profile.semester}`}
                />

                <InfoRow
                    icon={<CalendarDays size={18} color="#64748B" />}
                    label="Enrollment Year"
                    value={String(profile.enrollmentYear)}
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