import { Stack } from 'expo-router';
import {
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthContext';
import '../../global.css';
import tamaguiConfig from '../../tamagui.config';
import { TamaguiProvider } from 'tamagui';
import { View, StatusBar, Appearance } from 'react-native';
import { useEffect } from 'react';

// Force light theme
const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0F172B',
    border: '#E2E8F0',
    notification: '#009966',
    primary: '#009966',
  },
};

export default function RootLayout() {
  // Force light mode on app start
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <AuthProvider>
          <ThemeProvider value={LightTheme}>
            <RootLayoutNav />
          </ThemeProvider>
        </AuthProvider>
      </TamaguiProvider>
    </View>
  );
}

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#FFFFFF' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        animation: 'none', // Disable animations to prevent flash
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};