import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Appearance,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const ChatHeader = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
      <View className="flex-row items-center justify-between px-2" style={[headerStyles.headerBorder, { height: 60.673, backgroundColor: '#FFFFFF' }]}>
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

export default function TabLayout() {
  // Force light mode
  useEffect(() => {
    Appearance.setColorScheme('light');
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF');
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <NativeTabs 
        iconColor="#0f172a" 
        tintColor="#009966"
        backgroundColor="#FFFFFF"
      >
          <NativeTabs.Trigger name="index">
            {Platform.OS === 'ios' ? (
              <Icon
                sf={{
                  default: 'house',
                  selected: 'house.fill',
                }}
                selectedColor="#009966"
              />
            ) : (
              <Icon
                src={<VectorIcon family={MaterialIcons} name="home" />}
                selectedColor="#009966"
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
                selectedColor="#009966"
              />
            ) : (
              <Icon
                src={<VectorIcon family={MaterialIcons} name="chat-bubble-outline" />}
                selectedColor="#009966"
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
                selectedColor="#009966"
              />
            ) : (
              <Icon
                src={<VectorIcon family={MaterialIcons} name="event" />}
                selectedColor="#009966"
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
                selectedColor="#009966"
              />
            ) : (
              <Icon
                src={<VectorIcon family={MaterialIcons} name="person" />}
                selectedColor="#009966"
              />
            )}
            <Label>Profile</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
    </View>
  );
}

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