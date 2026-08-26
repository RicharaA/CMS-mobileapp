import {
    CheckCircle,
    CircleDollarSign,
    CreditCard,
} from "lucide-react-native";
import { Text, View } from "react-native";

import { StudentProfile } from "../types/profile.types";

interface FeeProfileProps {
    profile: StudentProfile;
}

export function FeeProfile({ profile }: FeeProfileProps) {
    const { total, paid, remaining } = profile.fee;

    return (
        <View className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <View className="flex-row items-center">
                <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8EE]">
                    <CreditCard size={18} color="#7B3446" />
                </View>

                <Text className="ml-3 text-base font-bold text-[#1E293B]">
                    Fee Profile
                </Text>
            </View>

            <View className="mt-5 flex-row justify-between">
                <Text className="text-sm text-gray-500">
                    Total Fee
                </Text>

                <Text className="text-sm font-semibold text-[#1E293B]">
                    Rs. {total.toLocaleString()}
                </Text>
            </View>

            <View className="mt-3 flex-row justify-between">
                <View className="flex-row items-center">
                    <CheckCircle size={15} color="#10B981" />

                    <Text className="ml-2 text-sm text-gray-500">
                        Paid
                    </Text>
                </View>

                <Text className="text-sm font-semibold text-green-600">
                    Rs. {paid.toLocaleString()}
                </Text>
            </View>

            <View className="mt-3 flex-row justify-between">
                <View className="flex-row items-center">
                    <CircleDollarSign size={15} color="#F59E0B" />

                    <Text className="ml-2 text-sm text-gray-500">
                        Remaining
                    </Text>
                </View>

                <Text className="text-sm font-semibold text-[#7B3446]">
                    Rs. {remaining.toLocaleString()}
                </Text>
            </View>
        </View>
    );
}