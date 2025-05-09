
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '@/types';

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cricket_auction_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        setAuthState({ ...initialAuthState, isLoading: false });
      }
    } else {
      setAuthState({ ...initialAuthState, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call to authenticate
    // For now, we'll simulate login with mock data
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for testing different roles
    const mockUsers: Record<string, User> = {
      'admin@cricket.com': {
        id: 'admin1',
        email: 'admin@cricket.com',
        name: 'Admin User',
        role: 'admin',
      },
      'team@cricket.com': {
        id: 'team1',
        email: 'team@cricket.com',
        name: 'Team Owner',
        role: 'team-owner',
        teamId: 'team1',
      },
      'player@cricket.com': {
        id: 'player1',
        email: 'player@cricket.com',
        name: 'Cricket Player',
        role: 'player',
        playerId: 'player1',
      },
    };
    
    const user = mockUsers[email];
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Update auth state
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false,
    });
    
    // Store in local storage
    localStorage.setItem('cricket_auction_user', JSON.stringify(user));
  };
  
  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // In a real app, this would be an API call to register a new user
    // For now, we'll simulate registration
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      role,
    };
    
    // Update auth state
    setAuthState({
      isAuthenticated: true,
      user: newUser,
      isLoading: false,
    });
    
    // Store in local storage
    localStorage.setItem('cricket_auction_user', JSON.stringify(newUser));
  };
  
  const logout = () => {
    // Clear auth state
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    
    // Remove from local storage
    localStorage.removeItem('cricket_auction_user');
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...userData };
    
    // Update auth state
    setAuthState({
      ...authState,
      user: updatedUser,
    });
    
    // Update in local storage
    localStorage.setItem('cricket_auction_user', JSON.stringify(updatedUser));
  };
  
  return (
    <AuthContext.Provider value={{ authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
