import { Stack } from 'expo-router';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { AuthProvider } from '../contexts/AuthContext';
import '../../global.css';
import tamaguiConfig from '../../tamagui.config';
import { TamaguiProvider } from 'tamagui';

export default function RootLayout() {
  const colorScheme = 'light';

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <AuthProvider>
        <ThemeProvider value={DefaultTheme}>
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </TamaguiProvider>
  );
}

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};
