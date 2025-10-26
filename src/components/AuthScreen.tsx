import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon as GoogleSVG } from '../utils/svg';

const LogoIcon = memo(() => (
  <View className="w-[79px] h-[79px] items-center justify-center bg-white rounded-full overflow-hidden">
    <Image
      source={require('../../assets/icon.png')}
      className="w-full h-full"
    />
  </View>
));
LogoIcon.displayName = 'LogoIcon';

const InputField = memo(
  ({
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    autoCapitalize = 'none',
    showPasswordToggle = false,
    onTogglePasswordVisibility,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    showPasswordToggle?: boolean;
    onTogglePasswordVisibility?: () => void;
  }) => (
    <View className="h-14 relative">
      <View
        className="absolute bg-white border border-[#cad5e2] h-14 rounded-[8px] w-full flex-row items-center px-3"
        style={{ borderWidth: 0.682 }}
      >
        <Input
          flex={1}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          placeholder={label}
          placeholderTextColor="#90a1b9"
          fontSize={16}
          borderWidth={0}
          px="$1"
          py={0}
          color="#0f172b"
          style={{ backgroundColor: 'transparent' }}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={onTogglePasswordVisibility}
            className="p-2 -mr-2"
          >
            <Ionicons
              name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#90a1b9"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
);
InputField.displayName = 'InputField';

const SocialButton = memo(
  ({
    onPress,
    icon,
    text,
    isLoading = false,
  }: {
    onPress: () => void;
    icon: React.ReactNode;
    text: string;
    isLoading?: boolean;
  }) => (
    <TouchableOpacity
      className="bg-white border border-[#cad5e2] h-14 rounded-[8px] flex-row items-center justify-center px-4"
      onPress={onPress}
      disabled={isLoading}
      style={{ borderWidth: 0.682 }}
    >
      {icon}
      <Text className="text-[#314158] text-sm font-medium ml-3.5">{text}</Text>
    </TouchableOpacity>
  )
);
SocialButton.displayName = 'SocialButton';

const Divider = memo(() => (
  <View className="relative items-center justify-center h-[17px]">
    <View className="absolute bg-black/10 h-px w-full" />
    <View className="bg-white px-3">
      <Text className="text-[#62748e] text-base font-normal">OR</Text>
    </View>
  </View>
));
Divider.displayName = 'Divider';

const AuthScreen = () => {
  const { login, signUp, loginWithGoogle, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      if (isSignUpMode) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.message || 'Authentication failed. Please try again.'
      );
    }
  }, [email, password, isSignUpMode, login, signUp]);

  const handleGoogleAuth = useCallback(async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      Alert.alert('Error', 'Google authentication failed. Please try again.');
    }
  }, [loginWithGoogle]);

  const handleForgotPassword = useCallback(() => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon.');
  }, []);

  const handleSignUp = useCallback(() => {
    setIsSignUpMode(true);
  }, []);

  const handleBackToLogin = useCallback(() => {
    setIsSignUpMode(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="items-center" style={{ marginTop: 110 }}>
          <LogoIcon />
          <Text className="text-[#0f172b] text-3xl font-normal text-center mt-8 mb-2 leading-8 tracking-[0.07px]">
            {isSignUpMode ? 'Sign Up' : 'Sign In'}
          </Text>
          <Text className="text-[#45556c] mt-2 text-base font-normal text-center leading-6 tracking-[-0.31px]">
            {isSignUpMode
              ? 'Create an account to continue'
              : 'Please login to continue'}
          </Text>
        </View>

        <View className="mt-12">
          <InputField
            label="Email address*"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <View className="mt-6">
            <InputField
              label="Password*"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPasswordToggle
              onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
          </View>
          <Pressable onPress={handleForgotPassword} className="mt-4">
            <Text className="text-[#155dfc] text-sm font-normal leading-5 tracking-[-0.15px]">
              Forgot password?
            </Text>
          </Pressable>
          <TouchableOpacity
            className="bg-[#155dfc] h-14 rounded-[8px] flex-row items-center justify-center mt-8"
            onPress={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-sm font-medium leading-5 tracking-[-0.15px]">
                {isSignUpMode ? 'Sign Up' : 'Continue'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="items-center mt-6 mb-6">
          {isSignUpMode ? (
            <Text className="text-[#45556c] text-sm font-normal text-center leading-5 tracking-[-0.15px]">
              Already have an account?{' '}
              <Text
                className="text-[#155dfc] font-medium text-base leading-6 tracking-[-0.31px]"
                onPress={handleBackToLogin}
              >
                Sign in
              </Text>
            </Text>
          ) : (
            <Text className="text-[#45556c] text-sm font-normal text-center leading-5 tracking-[-0.15px]">
              Don't have an account?{' '}
              <Text
                className="text-[#155dfc] font-medium text-base leading-6 tracking-[-0.31px]"
                onPress={handleSignUp}
              >
                Sign up
              </Text>
            </Text>
          )}
        </View>
        <Divider />
        <View className="mt-6">
          <SocialButton
            icon={<GoogleSVG size={16} />}
            text="Continue with Google"
            onPress={handleGoogleAuth}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
