import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, authClient } from '../../lib/auth';

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  const [isTimezoneSet, setIsTimezoneSet] = useState(false);

  useEffect(() => {
    if (session?.user && !(session.user as any).timezone && !isTimezoneSet) {
      // Set missing timezone for new users
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      authClient.updateUser({ timezone: tz } as any).then(() => {
        setIsTimezoneSet(true);
      });
    }
  }, [session, isTimezoneSet]);

  return (
    <AuthContext.Provider value={{ user: session?.user || null, isLoading: isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
