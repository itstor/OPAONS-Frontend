import { CacheProvider, EmotionCache } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/css/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import theme from '@/styles/themes';
import createEmotionCache from '@/utils/createEmotionCache';

config.autoAddCss = false;

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
  );
}
