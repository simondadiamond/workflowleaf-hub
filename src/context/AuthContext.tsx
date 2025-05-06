import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to call backend API for auth state
  const fetchSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/session');
      if (!res.ok) throw new Error('Failed to fetch session');
      const json = await res.json();
      setSession(json.session ?? null);
      setUser(json.session?.user ?? null);
    } catch (error) {
      console.error('Error fetching session:', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    // Setup polling or websocket for auth state changes if needed
    // For simplicity, we can poll every 30 seconds or rely on page reloads
    // Alternatively, implement event-based auth state sync if backend supports it

    // Example polling (optional):
    // const interval = setInterval(fetchSession, 30000);
    // return () => clearInterval(interval);
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { data: null, error: new Error(errorData.message || 'Sign up failed') };
      }
      const json = await res.json();
      setSession(json.session ?? null);
      setUser(json.session?.user ?? null);
      return { data: json.session, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { data: null, error: new Error(errorData.message || 'Sign in failed') };
      }
      const json = await res.json();
      setSession(json.session ?? null);
      setUser(json.session?.user ?? null);
      return { data: json.session, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Sign out failed:', errorData.message);
      }
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
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
