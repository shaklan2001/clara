import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import PaymentHistoryCard, { PaymentHistoryCardProps } from '../components/payments/PaymentHistoryCard';
import PaymentMethodCard from '../components/payments/PaymentMethodCard';

interface PaymentRecord extends PaymentHistoryCardProps {
  id: string;
}

const PAYMENT_HISTORY: PaymentRecord[] = [
  {
    id: 'payment-1',
    title: 'Monthly Subscription',
    amount: '$29.00',
    status: 'paid',
    date: 'Oct 15, 2024',
    invoiceId: 'INV-2024-001',
  },
  {
    id: 'payment-2',
    title: 'Doctor Visit - Dr. Priya Sharma',
    amount: '$30.00',
    status: 'paid',
    date: 'Oct 20, 2024',
    invoiceId: 'INV-2024-002',
  },
  {
    id: 'payment-3',
    title: 'Monthly Subscription',
    amount: '$29.00',
    status: 'paid',
    date: 'Sep 15, 2024',
    invoiceId: 'INV-2024-003',
  },
  {
    id: 'payment-4',
    title: 'Doctor Visit - Dr. Arjun Patel',
    amount: '$50.00',
    status: 'paid',
    date: 'Aug 10, 2024',
    invoiceId: 'INV-2024-004',
  },
  {
    id: 'payment-5',
    title: 'Monthly Subscription',
    amount: '$29.00',
    status: 'paid',
    date: 'Aug 15, 2024',
    invoiceId: 'INV-2024-005',
  },
];

const TOTAL_PAID = '$167.00';

const PaymentHistoryScreen: React.FC = () => {
  const router = useRouter();

  const paymentCards = useMemo(
    () => PAYMENT_HISTORY.map((payment) => <PaymentHistoryCard key={payment.id} {...payment} />),
    [],
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
        <StatusBar barStyle="dark-content" />

        <View className="flex-row items-center gap-4 border-b border-[#E2E8F0] bg-white px-6 pb-3 pt-5">
          <TouchableOpacity
            className="h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F9]"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={18} color="#0F172B" />
          </TouchableOpacity>

          <View className="mt-5">
            <Text className="text-[#0F172B]" style={styles.headerTitle}>
              Payment History
            </Text>
            <Text className="text-[#64748B]" style={styles.headerSubtitle}>
              View past payments and invoices
            </Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View className="gap-6 px-6 pb-12 pt-6">
            <LinearGradient
              colors={['#2B7FFF', '#4F39F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryCard}
            >
              <View className="gap-1">
                <Text className="text-sm font-medium text-blue-100">Total Paid (All Time)</Text>
                <Text className="text-3xl font-semibold text-white">{TOTAL_PAID}</Text>
              </View>

              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
              </View>
            </LinearGradient>

            <View className="gap-4">{paymentCards}</View>

            <PaymentMethodCard cardLabel="Visa ending in 4242" expires="12/2025" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PaymentHistoryScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 48,
  },
  headerTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  summaryCard: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(53, 81, 255, 0.35)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
});

