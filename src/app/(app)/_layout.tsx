import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const ChatHeader = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView edges={['top']} className="bg-white">
      <View className="flex-row items-center justify-between px-2" style={[headerStyles.headerBorder, { height: 60.673 }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-9 h-9 rounded-lg items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={16} color="#0F172B" />
        </TouchableOpacity>
        
        <Text className="text-[#0F172B]" style={headerStyles.headerTitle}>
          Clara
        </Text>
        
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-9 h-9 rounded-lg items-center justify-center"
        >
          <Ionicons name="ellipsis-vertical" size={16} color="#0F172B" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const headerStyles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.4492,
    fontWeight: '500',
  },
  headerBorder: {
    borderBottomWidth: 0.687,
    borderBottomColor: '#E2E8F0',
  },
});

export default function TabLayout() {
  return (
    <NativeTabs 
      iconColor="#0f172a" 
      tintColor="#2883A8" 
      backgroundColor="#FFFFFF"
    >
        <NativeTabs.Trigger name="index">
          {Platform.OS === 'ios' ? (
            <Icon
              sf={{
                default: 'house',
                selected: 'house.fill',
              }}
              selectedColor="#2883A8"
            />
          ) : (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="home" />}
              selectedColor="#2883A8"
            />
          )}
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="history">
          {Platform.OS === 'ios' ? (
            <Icon
              sf={{
                default: 'bubble.left',
                selected: 'bubble.left.fill',
              }}
              selectedColor="#2883A8"
            />
          ) : (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="chat-bubble-outline" />}
              selectedColor="#2883A8"
            />
          )}
          <Label>Chat</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="appointments">
          {Platform.OS === 'ios' ? (
            <Icon
              sf={{
                default: 'calendar',
                selected: 'calendar',
              }}
              selectedColor="#2883A8"
            />
          ) : (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="event" />}
              selectedColor="#2883A8"
            />
          )}
          <Label>Appointments</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          {Platform.OS === 'ios' ? (
            <Icon
              sf={{
                default: 'person',
                selected: 'person.fill',
              }}
              selectedColor="#2883A8"
            />
          ) : (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="person" />}
              selectedColor="#2883A8"
            />
          )}
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
  );
}
