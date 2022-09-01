import { CacheProvider, EmotionCache } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import moment from 'moment';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import 'moment/locale/id';

import '@/styles/css/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'simplebar/dist/simplebar.min.css';

import { AuthProvider } from '@/context/AuthProvider';
import { UserPrefProvider } from '@/context/UserPrefProvider';
import theme from '@/styles/themes';
import createEmotionCache from '@/utils/createEmotionCache';

moment.locale('id');

config.autoAddCss = false;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-explicit-any
  const getLayout = Component.getLayout ?? ((page: React.ReactNode, pageProps: any) => page);

  return (
    <AuthProvider>
      <UserPrefProvider>
        <StyledEngineProvider injectFirst>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <ThemeProvider theme={theme()}>
              <CssBaseline />
              <NextNProgress color='#774514' />
              {getLayout(<Component {...pageProps} />, pageProps)}
              <Toaster />
            </ThemeProvider>
          </CacheProvider>
        </StyledEngineProvider>
      </UserPrefProvider>
    </AuthProvider>
  );
}
