import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface UserPrefProvider {
  fontSizeMultiplier: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

interface UserPrefInterface {
  fontSize: number;
}

const UserPrefContext = createContext<UserPrefProvider>({} as UserPrefProvider);

export const UserPrefProvider = ({ children }: { children: ReactNode }) => {
  const [userPref, setUserPref] = useLocalStorage<UserPrefInterface>('user_preferences', { fontSize: 1 });

  const increaseFontSize = () => {
    setUserPref({ fontSize: userPref.fontSize + 0.1 });
  };

  const decreaseFontSize = () => {
    setUserPref({ fontSize: userPref.fontSize - 0.1 });
  };

  return (
    <UserPrefContext.Provider value={{ fontSizeMultiplier: userPref.fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </UserPrefContext.Provider>
  );
};

export const useUserPref = () => useContext(UserPrefContext);
