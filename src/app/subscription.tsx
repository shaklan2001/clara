import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type PlanTier = 'free' | 'monthly' | 'annual';

interface PlanFeature {
  id: string;
  copy: string;
}

interface PlanConfig {
  id: PlanTier;
  title: string;
  price: string;
  period: string;
  badge?: string;
  badgeTone?: 'blue' | 'green';
  description?: string;
  features: PlanFeature[];
  footnote?: string;
  secondaryFootnote?: string;
  ctaLabel: string;
  ctaVariant: 'primary' | 'outline' | 'disabled';
  isCurrent?: boolean;
  iconName: string;
  iconColor: string;
  iconBackground: string;
  borderColor?: string;
}

const PLAN_CARDS: PlanConfig[] = [
  {
    id: 'free',
    title: 'Free',
    price: '$0',
    period: '/forever',
    features: [
      { id: 'free-1', copy: 'Chat with Clara AI' },
      { id: 'free-2', copy: 'Upload medical documents' },
      { id: 'free-3', copy: 'Add family members' },
      { id: 'free-4', copy: 'AI health insights' },
      { id: 'free-5', copy: 'Basic triage assessment' },
    ],
    footnote: 'Pay per doctor visit: $50',
    secondaryFootnote: 'Limited chat history',
    ctaLabel: 'Switch to Free',
    ctaVariant: 'outline',
    iconName: 'flash-outline',
    iconColor: '#1D4ED8',
    iconBackground: '#E6EDFF',
  },
  {
    id: 'monthly',
    title: 'Monthly Plan',
    price: '$29',
    period: '/per month',
    badge: 'Most Popular',
    badgeTone: 'blue',
    features: [
      { id: 'monthly-1', copy: 'Everything in Free' },
      { id: 'monthly-2', copy: '2 doctor visits included' },
      { id: 'monthly-3', copy: 'Additional visits: $30' },
      { id: 'monthly-4', copy: 'Unlimited chat history' },
      { id: 'monthly-5', copy: 'Priority support' },
      { id: 'monthly-6', copy: 'Medicine reminders' },
      { id: 'monthly-7', copy: 'Lab test coordination' },
    ],
    ctaLabel: 'Current Plan',
    ctaVariant: 'disabled',
    isCurrent: true,
    iconName: 'flash-outline',
    iconColor: '#2563EB',
    iconBackground: '#E6EDFF',
    borderColor: '#2563EB',
  },
  {
    id: 'annual',
    title: 'Annual Plan',
    price: '$249',
    period: '/per year',
    badge: 'Save $99',
    badgeTone: 'green',
    features: [
      { id: 'annual-1', copy: 'Everything in Monthly' },
      { id: 'annual-2', copy: '6 doctor visits included' },
      { id: 'annual-3', copy: 'Additional visits: $25' },
      { id: 'annual-4', copy: 'Family plan (up to 5 members)' },
      { id: 'annual-5', copy: 'Annual health report' },
      { id: 'annual-6', copy: '24/7 priority support' },
      { id: 'annual-7', copy: 'Free lab test coordination' },
      { id: 'annual-8', copy: 'Prescription delivery' },
    ],
    ctaLabel: 'Upgrade to Annual Plan',
    ctaVariant: 'primary',
    iconName: 'crown-outline',
    iconColor: '#7C3AED',
    iconBackground: '#F1E8FF',
  },
];

const PlanCard: React.FC<{ config: PlanConfig }> = React.memo(({ config }) => {
  const IconComponent = config.id === 'annual' ? MaterialCommunityIcons : Ionicons;

  return (
    <View
      className="rounded-3xl bg-white"
      style={[
        styles.planCard,
        config.borderColor ? { borderColor: config.borderColor } : undefined,
        config.borderColor ? styles.planCardHighlighted : undefined,
      ]}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3">
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center"
            style={{ backgroundColor: config.iconBackground }}
          >
            <IconComponent name={config.iconName as any} size={24} color={config.iconColor} />
          </View>
          <View className="gap-1">
            <Text className="text-[#0F172B]" style={styles.planTitle}>
              {config.title}
            </Text>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-[#0F172B]" style={styles.planPrice}>
                {config.price}
              </Text>
              <Text className="text-[#62748E]" style={styles.planPeriod}>
                {config.period}
              </Text>
            </View>
          </View>
        </View>

        {config.badge ? (
          <View
            className="px-3 py-1 rounded-full"
            style={config.badgeTone === 'green' ? styles.badgeGreen : styles.badgeBlue}
          >
            <Text
              className={config.badgeTone === 'green' ? 'text-[#047857]' : 'text-[#155dfc]'}
              style={styles.badgeLabel}
            >
              {config.badge}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="mt-5 gap-3">
        {config.features.map((feature) => (
          <View key={feature.id} className="flex-row items-start gap-3">
            <Ionicons name="checkmark" size={18} color="#2563EB" style={{ marginTop: 2 }} />
            <Text className="text-[#0F172B]" style={styles.featureText}>
              {feature.copy}
            </Text>
          </View>
        ))}
      </View>

      {config.footnote ? (
        <Text className="text-[#64748B] mt-5" style={styles.footnote}>
          {config.footnote}
        </Text>
      ) : null}
      {config.secondaryFootnote ? (
        <Text className="text-[#94A3B8] mt-1" style={styles.secondaryFootnote}>
          {config.secondaryFootnote}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.85}
        className="mt-6 h-11 rounded-xl items-center justify-center"
        style={
          config.ctaVariant === 'primary'
            ? styles.ctaPrimary
            : config.ctaVariant === 'outline'
              ? styles.ctaOutline
              : styles.ctaDisabled
        }
      >
        <Text
          style={
            config.ctaVariant === 'outline'
              ? styles.ctaOutlineLabel
              : config.ctaVariant === 'primary'
                ? styles.ctaPrimaryLabel
                : styles.ctaDisabledLabel
          }
        >
          {config.ctaLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

PlanCard.displayName = 'PlanCard';

const SubscriptionScreen: React.FC = () => {
  const router = useRouter();
  const planCards = useMemo(() => PLAN_CARDS.map((plan) => <PlanCard key={plan.id} config={plan} />), []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['top']}>
        <StatusBar barStyle="dark-content" />

        <View className="gap-4 px-6 pt-5 pb-3 bg-white border-b border-[#E2E8F0] flex-row items-center  flex-start">
          <TouchableOpacity
            className="w-9 h-9 rounded-lg items-center justify-center bg-[#F1F5F9]"
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={18} color="#0F172B" />
          </TouchableOpacity>

          <View className="mt-5">
            <Text className="text-[#0F172B]" style={styles.headerTitle}>
              Subscription Plans
            </Text>
            <Text className="text-[#64748B]" style={styles.headerSubtitle}>
              Choose the plan that works best for you
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="px-6 pt-6 pb-12 gap-6">
            {planCards}

            <Text className="text-center text-[#94A3B8]" style={styles.footerNote}>
              All plans include secure data storage and HIPAA compliance
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
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
  planCard: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 8,
  },
  planCardHighlighted: {
    borderWidth: 1.5,
    backgroundColor: '#F5F9FF',
  },
  planTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  planPeriod: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  secondaryFootnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  ctaPrimary: {
    backgroundColor: '#155dfc',
  },
  ctaPrimaryLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaOutline: {
    borderWidth: 1,
    borderColor: '#CBD5F5',
    backgroundColor: '#FFFFFF',
  },
  ctaOutlineLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#0F172B',
  },
  ctaDisabled: {
    backgroundColor: '#F1F5F9',
  },
  ctaDisabledLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#94A3B8',
  },
  badgeBlue: {
    backgroundColor: '#E0ECFF',
  },
  badgeGreen: {
    backgroundColor: '#DCFCE7',
  },
  badgeLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
});

