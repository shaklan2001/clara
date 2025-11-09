import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface PaymentMethodCardProps {
  cardLabel: string;
  expires: string;
  onUpdate?: () => void;
}

const PaymentMethodCard = memo(({ cardLabel, expires, onUpdate }: PaymentMethodCardProps) => {
  return (
    <View className="rounded-2xl bg-white" style={styles.card}>
      <Text className="text-base font-semibold text-[#0F172B]">Payment Method</Text>

      <View className="mt-5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E6EDFF]">
            <Ionicons name="card-outline" size={22} color="#2563EB" />
          </View>
          <View>
            <Text className="text-base font-medium text-[#0F172B]">{cardLabel}</Text>
            <Text className="text-sm font-normal text-[#64748B]">Expires {expires}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="h-9 items-center justify-center rounded-lg border border-[#CBD5F5] bg-white px-4"
          onPress={onUpdate}
        >
          <Text className="text-sm font-medium text-[#0F172B]">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

PaymentMethodCard.displayName = 'PaymentMethodCard';

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.7,
    borderColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#0F172B',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
    gap: 12,
  },
});

export default PaymentMethodCard;

