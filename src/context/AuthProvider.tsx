import Router from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocalStorage } from 'usehooks-ts';

import AuthService from '@/services/Auth.service';
import CookiesService from '@/services/Cookies.service';
import LocalStorageService from '@/services/LocalStorage.service';
import { UserInterface } from '@/ts/interfaces/User.interface';

interface AuthContextInterface {
  user: Partial<UserInterface> | null | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<Partial<UserInterface> | null | undefined>('user', undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  const login = (username: string, password: string) => {
    AuthService.login({ username: username, password: password })
      .then((res) => {
        if (res) {
          CookiesService.setTokens(res.data.tokens);
          CookiesService.setRole(res.data.user.role);
          setUser({ school: res.data.user.school, username: res.data.user.username });

          Router.push('/');
        }
      })
      .catch((err) => {
        if (err.response.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  const logout = () => {
    const refreshToken = CookiesService.getRefreshToken();

    if (refreshToken) {
      AuthService.logout({ refreshToken: refreshToken });
    }
    CookiesService.clearCookies();
    setUser(null);

    Router.push('/auth/login');
    LocalStorageService.removeUserAnswers();
  };

  return <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
