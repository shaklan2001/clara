import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

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

        {/* Family Members Section */}
        <View className="px-6 pt-6 pb-6 bg-white">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-normal text-[#0f172a]">
              Family Members
            </Text>
            <TouchableOpacity className="py-2 px-0">
              <Text className="text-sm font-medium text-[#155dfc]">Add</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-sm font-normal text-[#717182] mb-4">
            Switch between family profiles
          </Text>

          {/* Family Members List */}
          <View className="gap-4">
            {mockFamilyMembers.map(member => (
              <View
                key={member.id}
                className="flex-row gap-4 items-center py-2"
              >
                {/* Member Avatar */}
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
            {/* Medical History Button */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#717182"
                  />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Medical History
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#717182" />
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View className="h-[0.5px] bg-black/10 my-2" />

            {/* Insurance Information Button */}
            <TouchableOpacity className="py-4 px-0">
              <View className="flex-row gap-4 items-center w-full flex-1">
                <View className="w-8 h-8 items-center justify-center">
                  <Ionicons name="card-outline" size={20} color="#717182" />
                </View>
                <Text className="text-base font-normal text-[#0f172a] flex-1">
                  Insurance Information
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
    </SafeAreaView>
  );
});


export default function Profile() {
  return <ProfileScreen />;
}
