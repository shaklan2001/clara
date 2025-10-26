import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from '../types';

const TOKEN_STORAGE_KEY = 'auth0_tokens';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for token storage
const storeTokens = async (tokens: any) => {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

// Get stored tokens - useful for checking token validity
export const getStoredTokens = async () => {
  try {
    const tokens = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return null;
  }
};

const clearStoredTokens = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-gxp7532f5e60qup8.uk.auth0.com"
      clientId="gEssI9303S4zyeAEqezKJPdfocgGLJsw"
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </Auth0Provider>
  );
};

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: auth0User, isLoading, authorize, clearSession } = useAuth0();
  const router = useRouter();
  const [customUser, setCustomUser] = React.useState<any>(null);

  // Determine the current user (either from Auth0 SDK or custom email/password)
  const user = auth0User || customUser;

  useEffect(() => {
    // Check for stored tokens on mount
    const checkStoredTokens = async () => {
      const tokens = await getStoredTokens();
      if (tokens && tokens.access_token) {
        // If we have stored tokens, decode and set user info
        try {
          // Decode JWT to get user info (basic implementation)
          const base64Url = tokens.id_token?.split('.')[1];
          if (base64Url) {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const userInfo = JSON.parse(jsonPayload);
            setCustomUser(userInfo);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    checkStoredTokens();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(app)');
      } else {
        router.replace('/auth');
      }
    }
  }, [user, isLoading, router]);

  const login = async (email?: string, password?: string) => {
    try {
      if (email && password) {
        const url = `https://${'dev-gxp7532f5e60qup8.uk.auth0.com'}/oauth/token`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: 'gEssI9303S4zyeAEqezKJPdfocgGLJsw',
            username: email,
            password: password,
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
            realm: 'Username-Password-Authentication',
            scope: 'openid profile email',
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error_description || 'Login failed');
        }

        const credentials = await response.json();
        console.log('Login successful:', credentials);

        // Store tokens for persistent authentication
        await storeTokens(credentials);

        // Decode and set user info from ID token
        try {
          const base64Url = credentials.id_token?.split('.')[1];
          if (base64Url) {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const userInfo = JSON.parse(jsonPayload);
            setCustomUser(userInfo);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }

        router.replace('/(app)');
      } else {
        const credentials = await authorize({
          scope: 'openid profile email',
          audience: 'https://dev-gxp7532f5e60qup8.uk.auth0.com/api/v2/',
        });
        console.log('Login successful:', credentials);
      }
    } catch (error: any) {
      if (error?.error === 'a0.session.user_cancelled') {
        console.log('User cancelled login');
        return;
      }
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signUp = async (email?: string, password?: string) => {
    try {
      console.log('Starting sign up...');

      if (email && password) {
        // Use Auth0's signup endpoint
        const url = `https://${'dev-gxp7532f5e60qup8.uk.auth0.com'}/dbconnections/signup`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: 'gEssI9303S4zyeAEqezKJPdfocgGLJsw',
            email: email,
            password: password,
            connection: 'Username-Password-Authentication',
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Sign up error details:', JSON.stringify(error));

          // Extract readable error message
          let errorMessage = error.message || 'Sign up failed';

          // Add password requirements if it's a password error
          if (error.name === 'PasswordStrengthError') {
            errorMessage = `${error.message}. Requirements: ${error.policy}`;
          }

          console.error('Error message:', errorMessage);
          throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log('Sign up successful:', result);

        // Automatically log in the user after successful signup
        await login(email, password);
      } else {
        // Use default Auth0 sign up
        const credentials = await authorize({
          scope: 'openid profile email',
          audience: 'https://dev-gxp7532f5e60qup8.uk.auth0.com/api/v2/',
        });
        console.log('Sign up successful:', credentials);
      }
    } catch (error: any) {
      if (error?.error === 'a0.session.user_cancelled') {
        console.log('User cancelled sign up');
        return;
      }
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearSession();
      await clearStoredTokens(); // Clear stored tokens
      setCustomUser(null); // Clear custom user state
      router.replace('/auth');
    } catch {
      await clearStoredTokens(); // Ensure tokens are cleared even if session clear fails
      setCustomUser(null); // Clear custom user state
      router.replace('/auth');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const credentials = await authorize({
        scope: 'openid profile email',
        audience: 'https://dev-gxp7532f5e60qup8.uk.auth0.com/api/v2/',
        connection: 'google-oauth2',
      });
      console.log('Google login successful:', credentials);
    } catch (error: any) {
      if (error?.error === 'a0.session.user_cancelled') {
        console.log('User cancelled Google login');
        return;
      }
      console.error('Google login failed:', error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      console.log('Starting Google sign up...');
      const credentials = await authorize({
        scope: 'openid profile email',
        audience: 'https://dev-gxp7532f5e60qup8.uk.auth0.com/api/v2/',
        connection: 'google-oauth2',
      });
      console.log('Google sign up successful:', credentials);
    } catch (error: any) {
      if (error?.error === 'a0.session.user_cancelled') {
        console.log('User cancelled Google sign up');
        return;
      }
      console.error('Google sign up failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signUp,
    logout,
    loginWithGoogle,
    signUpWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
