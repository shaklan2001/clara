import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import AddFamilyMemberSheet, {
  NewFamilyMemberPayload,
} from '../../components/profile/AddFamilyMemberSheet';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  bloodType: string;
  avatar?: string;
}

const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'John Doe',
    relationship: 'Self',
    age: 35,
    bloodType: 'O+',
  },
  {
    id: '2',
    name: 'Jane Doe',
    relationship: 'Spouse',
    age: 33,
    bloodType: 'A+',
  },
  {
    id: '3',
    name: 'Emma Doe',
    relationship: 'Daughter',
    age: 8,
    bloodType: 'O+',
  },
  {
    id: '4',
    name: 'Lucas Doe',
    relationship: 'Son',
    age: 5,
    bloodType: 'A+',
  },
];

export const ProfileScreen: React.FC = React.memo(() => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [familyMembers, setFamilyMembers] = React.useState<FamilyMember[]>(mockFamilyMembers);
  const [addMemberSheetVisible, setAddMemberSheetVisible] = React.useState<boolean>(false);

  const userInitials = useMemo(() => {
    const firstName = user?.name?.split(' ')[0] || '';
    const lastName = user?.name?.split(' ')[1] || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return (
      user?.name?.charAt(0) ||
      user?.email?.charAt(0) ||
      'U'
    ).toUpperCase();
  }, [user]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleOpenAddMember = useCallback(() => {
    setAddMemberSheetVisible(true);
  }, []);

  const handleCloseAddMember = useCallback(() => {
    setAddMemberSheetVisible(false);
  }, []);

  const handleSubmitAddMember = useCallback((payload: NewFamilyMemberPayload) => {
    setFamilyMembers((previousMembers) => [
      ...previousMembers,
      {
        id: `${Date.now()}`,
        name: payload.name,
        relationship: payload.relation,
        age: payload.age,
        bloodType: 'Unknown',
      },
    ]);
    setAddMemberSheetVisible(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-5 pb-5">
        <Text className="text-2xl font-medium text-[#0f172a]">Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View className="px-6 pt-5 pb-5">
          <View className="flex-row items-center gap-4">
            {/* Avatar */}
            <View className="w-16 h-16 rounded-full bg-[#1a1d3a] items-center justify-center">
              <Text className="text-xl font-normal text-white">
                {userInitials}
              </Text>
            </View>

            {/* Name and Email */}
            <View className="flex-1 gap-0.5">
              <Text className="text-base font-normal text-[#0f172a]">
                {user?.name || 'User'}
              </Text>
              <Text className="text-sm font-normal text-[#717182]">
                {user?.email || 'No email'}
              </Text>
            </View>
          </View>
        </View>

        {/* Subscription Section */}
        <View className="px-6 pb-6 bg-white">
          <View className="border border-[#E2E8F0] rounded-2xl p-4 gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="crown-outline" size={20} color="#155dfc" />
                <Text className="text-base font-semibold text-[#0f172a]">
                  Subscription
                </Text>
              </View>
              <View className="px-3 py-1 rounded-full bg-[#155dfc]/10">
                <Text className="text-xs font-medium text-[#155dfc]">
                  Monthly
                </Text>
              </View>
            </View>

            <Text className="text-sm font-normal text-[#717182]">
              2 doctor visits included per month
            </Text>

            <TouchableOpacity
              className="h-11 rounded-xl bg-[#155dfc] items-center justify-center"
              activeOpacity={0.8}
              onPress={() => router.push('/subscription')}
            >
              <Text className="text-base font-semibold text-white">
              Upgrade Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 pt-2 pb-6 bg-white">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-normal text-[#0f172a]">
              Family Members
            </Text>
            <TouchableOpacity className="py-2 px-0" onPress={handleOpenAddMember}>
              <Text className="text-sm font-medium text-[#155dfc]">Add</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-normal text-[#717182] mb-4">
            Switch between family profiles
          </Text>

          <View className="gap-4">
            {familyMembers.map((member) => (
              <View
                key={member.id}
                className="flex-row gap-4 items-center py-2"
              >
                <View className="w-8 h-8 rounded-full bg-[#F3F4F6] items-center justify-center">
                  <Text className="text-base font-normal text-[#0f172a]">
                    {member.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                {/* Member Info */}
                <View className="flex-1 gap-0.5">
                  <Text className="text-base font-normal text-[#0f172a]">
                    {member.name}
                  </Text>
                  <Text className="text-sm font-normal text-[#717182]">
                    {member.relationship} • {member.age} years old • Blood type{' '}
                    {member.bloodType}
                  </Text>
                </View>

                {/* Arrow Icon */}
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            ))}
          </View>
        </View>

        {/* Health & Account Section */}
        <View className="px-6 pt-6 pb-6 bg-white">
          <Text className="text-base font-normal text-[#0f172a] mb-6">
            Health & Account
          </Text>

          <View className="gap-0">
            <TouchableOpacity className="py-4 px-0" onPress={() => {router.push('/documents')}}>
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#717182"
                  />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Documents & Records
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Payment History */}
            <TouchableOpacity className="py-4 px-0" onPress={() => router.push('/payment-history')}>
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="card-outline" size={20} color="#717182" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-normal text-[#0f172a]">
                    Payment History
                  </Text>
                  <Text className="text-sm font-normal text-[#94A3B8]">
                    View invoices and receipts
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Personal Information */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="person-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Personal Information
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View className="px-6 pt-6 pb-6 bg-white">
          <Text className="text-base font-normal text-[#0f172a] mb-6">
            Settings
          </Text>

          <View className="gap-0">
            {/* Notifications */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="notifications-outline" size={20} color="#717182" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-normal text-[#0f172a]">
                    Notifications
                  </Text>
                  <Text className="text-sm font-normal text-[#94A3B8]">
                    Visit and medicine reminders
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Privacy & Security */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="shield-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Privacy & Security
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Login & Security */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="lock-closed-outline" size={20} color="#717182" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-normal text-[#0f172a]">
                    Login & Security
                  </Text>
                  <Text className="text-sm font-normal text-[#94A3B8]">
                    Change password, Auth0 settings
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View className="px-6 pt-6 pb-6 bg-white">
          <Text className="text-base font-normal text-[#0f172a] mb-6">
            Support
          </Text>

          <View className="gap-0">
            {/* Contact Support */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="chatbubble-ellipses-outline" size={20} color="#717182" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-normal text-[#0f172a]">
                    Contact Support
                  </Text>
                  <Text className="text-sm font-normal text-[#94A3B8]">
                    WhatsApp, Email, Phone
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Help Center */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="help-circle-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Help Center
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Terms of Service */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="book-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Terms of Service
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Privacy Policy */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="shield-checkmark-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Privacy Policy
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 pt-4 pb-8">
          <TouchableOpacity onPress={handleLogout} className="py-4 px-0">
            <View className="flex-row gap-4 items-center">
              <View className="w-8 h-8 items-center justify-center">
                <Ionicons name="log-out-outline" size={20} color="#e7000b" />
              </View>
              <Text className="text-base font-normal text-[#e7000b]">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddFamilyMemberSheet
        visible={addMemberSheetVisible}
        onClose={handleCloseAddMember}
        onSubmit={handleSubmitAddMember}
      />
    </SafeAreaView>
  );
});


export default function Profile() {
  return <ProfileScreen />;
}
