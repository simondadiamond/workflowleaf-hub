import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import * as api from '../lib/api';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'workflowleaf_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedSession = localStorage.getItem(SESSION_KEY);
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          // Check if the session is expired
          if (new Date(parsedSession.expires_at) > new Date()) {
            setSession(parsedSession);
            setUser(parsedSession.user);
          } else {
            // Clear expired session
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(SESSION_KEY);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { session: newSession, user: newUser } = await api.signUp(email, password);
      if (newSession) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setUser(newUser);
      }
      return { data: newSession, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { session: newSession, user: newUser } = await api.signIn(email, password);
      if (newSession) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setUser(newUser);
      }
      return { data: newSession, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await api.signOut();
      localStorage.removeItem(SESSION_KEY);
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
