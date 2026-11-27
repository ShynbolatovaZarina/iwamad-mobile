import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { auth } from '../lib/firebase';

type AuthStatus = 'loading' | 'signed-in' | 'signed-out';

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Firebase calls this once at start (with the saved session or null) and after every sign-in / sign-out
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setStatus(nextUser ? 'signed-in' : 'signed-out');
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, status }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return value;
}
