import { supabase } from '@/lib/supabase';
import * as SecureStore from 'expo-secure-store';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const defaultSession = {
  signOut: () => {},
  isLoggedIn: false,
  isLoading: true,
  setIsLoggedIn: (_: boolean) => {},
};

export const SessionContext = createContext(defaultSession);

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setIsLoading(true);
        setIsLoggedIn(!!session);
        await SecureStore.setItemAsync(
          'isAuthenticated',
          (!!session).toString()
        );
        setIsLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync('isAuthenticated');
    setIsLoggedIn(false);

    supabase.auth.signOut();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        signOut,
        isLoggedIn,
        isLoading,
        setIsLoggedIn,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
