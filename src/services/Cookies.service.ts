import Cookies from 'js-cookie';

import { TokenInterface, TokensInterface } from '@/ts/interfaces/Token.interface';

class CookiesService {
  setTokens(tokens: TokensInterface) {
    Cookies.set('refresh_token', tokens.refresh.token, { expires: Date.parse(tokens.refresh.expires) });
    Cookies.set('access_token', tokens.access.token);
  }

  setRefreshToken(refreshToken: TokenInterface) {
    Cookies.set('refresh_token', refreshToken.token, { expires: Date.parse(refreshToken.expires) });
  }

  setAccessToken(accessToken: TokenInterface) {
    Cookies.set('access_token', accessToken.token);
  }

  setRole(role: string) {
    Cookies.set('role', role);
  }

  getRole() {
    return Cookies.get('role');
  }

  removeRefreshToken() {
    Cookies.remove('refresh_token');
  }

  removeAccessToken() {
    Cookies.remove('access_token');
  }

  getAccessToken() {
    return Cookies.get('access_token');
  }

  getRefreshToken() {
    return Cookies.get('refresh_token');
  }
}

export default new CookiesService();
