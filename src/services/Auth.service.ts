import axios from 'axios';

import CookiesService from '@/services/Cookies.service';
import { TokensInterface } from '@/ts/interfaces/Token.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';

class AuthService {
  login({ username, password }: { username: string; password: string }) {
    return axios.post<{ user: UserInterface; tokens: TokensInterface }>('auth/login', {
      username: username,
      password: password,
    });
  }

  async logout({ refreshToken }: { refreshToken: string }) {
    return axios.post('auth/logout', {
      refreshToken,
    });
  }

  async refreshToken() {
    const refreshToken = CookiesService.getRefreshToken();

    if (!refreshToken) return;

    const response = await axios.post<TokensInterface>(
      'auth/refresh-tokens',
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refreshToken,
        },
      }
    );

    if (response.data) {
      CookiesService.setRefreshToken(response.data.refresh);
    }

    return response.data;
  }
}

export default new AuthService();
