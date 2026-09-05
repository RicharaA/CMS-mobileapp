import { ShieldCheck, Mail, User, Key, CheckCircle2 } from "lucide-react-native";
import { Text, View } from "react-native";
import { UserProfile, UserRole } from "@/features/auth/types/auth.types";

interface UserAccountProfileProps {
    user: UserProfile | null;
    primaryRole: UserRole;
    roles: string[];
}

export function UserAccountProfile({
    user,
    primaryRole,
    roles,
}: UserAccountProfileProps) {
    const displayName = user?.name || user?.preferred_username || "System User";

    return (
        <View className="mt-6 gap-4">
            {/* Header Card */}
            <View className="rounded-2xl border border-gray-200 bg-white p-5 items-center">
                <View className="h-20 w-20 rounded-full bg-[#7B3446]/10 items-center justify-center mb-3">
                    <User size={40} color="#7B3446" />
                </View>
                <Text className="text-xl font-bold text-[#1E293B]">
                    {displayName}
                </Text>
                <View className="mt-2 flex-row items-center rounded-full bg-[#7B3446]/10 px-3 py-1">
                    <ShieldCheck size={14} color="#7B3446" className="mr-1.5" />
                    <Text className="text-xs font-bold text-[#7B3446] uppercase">
                        {primaryRole} Account
                    </Text>
                </View>
            </View>

            {/* Account Details */}
            <View className="rounded-2xl border border-gray-200 bg-white p-5">
                <Text className="text-base font-bold text-[#1E293B]">
                    Account Details
                </Text>

                <View className="mt-4 gap-4">
                    <DetailRow
                        icon={<Mail size={18} color="#64748B" />}
                        label="Email Address"
                        value={user?.email || "Not provided"}
                    />

                    <DetailRow
                        icon={<User size={18} color="#64748B" />}
                        label="Username"
                        value={user?.preferred_username || user?.sub || "N/A"}
                    />

                    <DetailRow
                        icon={<Key size={18} color="#64748B" />}
                        label="Assigned Roles"
                        value={roles.length > 0 ? roles.join(", ") : primaryRole}
                    />

                    <DetailRow
                        icon={<CheckCircle2 size={18} color="#16A34A" />}
                        label="Account Status"
                        value="Active & Verified"
                    />
                </View>
            </View>
        </View>
    );
}

function DetailRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <View className="flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                {icon}
            </View>

            <View className="ml-3 flex-1">
                <Text className="text-xs text-gray-500">{label}</Text>
                <Text className="mt-0.5 text-sm font-medium text-[#1E293B]">
                    {value}
                </Text>
            </View>
        </View>
    );
}
