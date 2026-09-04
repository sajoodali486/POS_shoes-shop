'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/pos';
import { DEMO_USERS } from '@/data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showRevealSplash: boolean;
  setShowRevealSplash: (show: boolean) => void;
  login: (userOrRole?: User | string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showRevealSplash, setShowRevealSplash] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('pos_user_session');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (userOrRole?: User | string) => {
    let selectedUser: User = DEMO_USERS[0];
    if (typeof userOrRole === 'string') {
      const match = DEMO_USERS.find(
        (u) => u.role.toLowerCase() === userOrRole.toLowerCase() || u.name.toLowerCase().includes(userOrRole.toLowerCase())
      );
      if (match) selectedUser = match;
    } else if (userOrRole) {
      selectedUser = userOrRole;
    }

    setUser(selectedUser);
    setShowRevealSplash(true);
    localStorage.setItem('pos_user_session', JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    setShowRevealSplash(false);
    localStorage.removeItem('pos_user_session');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        showRevealSplash,
        setShowRevealSplash,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
