// Centralized TypeScript type definitions for Clara app

// User interface for Auth0
export interface User {
  sub: string;
  name?: string;
  email?: string;
  email_verified?: boolean;
  updated_at?: string;
  picture?: string;
}

// Auth context interface
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  signUp: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
}

// Component prop interfaces
export interface HomeScreenProps {}

export interface AuthScreenProps {}

export interface IndexProps {}

// Button action types
export type ButtonAction = 'primary' | 'secondary' | 'positive' | 'negative';

// Alert button types
export interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

// Navigation types
export interface NavigationProps {
  router: {
    push: (path: string) => void;
    replace: (path: string) => void;
    back: () => void;
  };
}

// Animation types
export interface AnimationProps {
  isAnimating: boolean;
  onAnimationComplete: () => void;
}

// Error types
export interface AuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
}
