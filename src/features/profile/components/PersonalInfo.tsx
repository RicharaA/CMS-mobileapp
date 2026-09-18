
import {
    Calendar,
    Mail,
    Phone,
    UserRound,
    MapPin,
    UsersRound,
} from "lucide-react-native";
import { Text, View } from "react-native";

import { StudentProfile } from "../types/profile.types";

interface PersonalInfoProps {
    profile: StudentProfile;
}

function formatDate(date: string | number | number[]) {
    if (!date) return "";

    if (Array.isArray(date)) {
        const [year, month, day] = date;

        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return String(date);
    }

    return parsedDate.toISOString().split("T")[0];
}

export function PersonalInfo({ profile }: PersonalInfoProps) {
    return (
        <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <Text className="text-base font-bold text-[#1E293B]">
                Personal Information
            </Text>

            <View className="mt-4 gap-4">
                <InfoRow
                    icon={<UserRound size={18} color="#64748B" />}
                    label="Full Name"
                    value={profile.fullName}
                />

                <InfoRow
                    icon={<UserRound size={18} color="#64748B" />}
                    label="Username"
                    value={profile.username}
                />

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
                    value={formatDate(profile.dateOfBirth)}

                />

                <InfoRow
                    icon={<UserRound size={18} color="#64748B" />}
                    label="Gender"
                    value={profile.gender}
                />

                <InfoRow
                    icon={<MapPin size={18} color="#64748B" />}
                    label="Present Address"
                    value={profile.presentAddress}
                />

                <InfoRow
                    icon={<UsersRound size={18} color="#64748B" />}
                    label="Guardian Name"
                    value={profile.guardianName}
                />

                <InfoRow
                    icon={<Phone size={18} color="#64748B" />}
                    label="Guardian Phone"
                    value={profile.guardianPhoneNumber}
                />

                <InfoRow
                    icon={<UserRound size={18} color="#64748B" />}
                    label="Guardian Relation"
                    value={profile.guardianRelation}
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
                    {value || "Not provided"}
                </Text>
            </View>
        </View>
    );
}

