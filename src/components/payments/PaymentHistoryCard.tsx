import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface PaymentHistoryCardProps {
  title: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  invoiceId: string;
}

const STATUS_THEME: Record<PaymentHistoryCardProps['status'], { background: string; text: string; label: string }> = {
  paid: {
    background: '#DCFCE7',
    text: '#047857',
    label: 'paid',
  },
  pending: {
    background: '#FEF9C3',
    text: '#A16207',
    label: 'pending',
  },
  failed: {
    background: '#FEE2E2',
    text: '#B91C1C',
    label: 'failed',
  },
};

const PaymentHistoryCard = memo(({ title, amount, status, date, invoiceId }: PaymentHistoryCardProps) => {
  const statusTheme = STATUS_THEME[status];

  return (
    <View className="rounded-2xl bg-white" style={styles.card}>
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-row items-start gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E6EDFF]">
            <Ionicons name="document-text-outline" size={22} color="#2563EB" />
          </View>
          <View className="gap-1">
            <Text className="text-base font-medium text-[#0F172B]">{title}</Text>
            <Text className="text-sm font-normal text-[#64748B]">{date}</Text>
          </View>
        </View>

        <View className="items-end gap-2">
          <Text className="text-base font-semibold text-[#0F172B]">{amount}</Text>
          <View
            className="rounded-lg px-3 py-1"
            style={{ backgroundColor: statusTheme.background }}
          >
            <Text className="text-xs font-medium" style={{ color: statusTheme.text }}>
              {statusTheme.label}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <TouchableOpacity
          activeOpacity={0.85}
          className="h-9 flex-row items-center gap-2 rounded-lg border border-[#CBD5F5] bg-white px-4"
        >
          <Ionicons name="download-outline" size={18} color="#0F172B" />
          <Text className="text-sm font-medium text-[#0F172B]">Download Invoice</Text>
        </TouchableOpacity>

        <Text className="text-sm font-medium text-[#94A3B8]">{invoiceId}</Text>
      </View>
    </View>
  );
});

PaymentHistoryCard.displayName = 'PaymentHistoryCard';

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.7,
    borderColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 12,
  },
});

export default PaymentHistoryCard;

