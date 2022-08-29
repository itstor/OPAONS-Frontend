/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import Router from 'next/router';

import CookiesService from '@/services/Cookies.service';
import LocalStorageService from '@/services/LocalStorage.service';
import config from '@/ts/config/env.config';
import { TokensInterface } from '@/ts/interfaces/Token.interface';

export const apiPrivate = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = CookiesService.getAccessToken();
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response.status === 401 || error.response.status === 400) && originalRequest.url === `auth/refresh-tokens`) {
      CookiesService.clearCookies();
      LocalStorageService.removeUser();
      Router.push('/auth/login');

      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      if (error.response.data.message === 'Forbidden') {
        CookiesService.clearCookies();
        LocalStorageService.removeUser();
        Router.push('/auth/login');
      }

      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = CookiesService.getRefreshToken();

      return apiPrivate
        .post<TokensInterface>('auth/refresh-tokens', {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            CookiesService.setAccessToken(res.data.access);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + CookiesService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
