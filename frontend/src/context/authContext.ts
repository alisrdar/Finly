import { createContext } from 'react';
import type { User } from '../types';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  clearUser: () => void;  // For clearing user data on logout
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
