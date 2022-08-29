import Cookies from 'js-cookie';
import moment from 'moment';

import { TokenInterface, TokensInterface } from '@/ts/interfaces/Token.interface';

class CookiesService {
  setTokens(tokens: TokensInterface) {
    this.setAccessToken(tokens.access);
    this.setRefreshToken(tokens.refresh);
  }

  setRefreshToken(refreshToken: TokenInterface) {
    Cookies.set('refresh_token', refreshToken.token, { expires: moment(refreshToken.expires).toDate() });
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

  removeRole() {
    Cookies.remove('role');
  }

  getAccessToken() {
    return Cookies.get('access_token');
  }

  getRefreshToken() {
    return Cookies.get('refresh_token');
  }

  clearCookies() {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeRole();
  }
}

export default new CookiesService();
