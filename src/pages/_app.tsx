import { CacheProvider, EmotionCache } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { dasboardState, DashboardContext } from '@/context/dashboardContext';
import theme from '@/styles/themes';
import createEmotionCache from '@/utils/createEmotionCache';

config.autoAddCss = false;

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme()}>
          <DashboardContext.Provider value={dasboardState}>
            <CssBaseline />
            <NextNProgress color='#774514' />
            <Component {...pageProps} />
            <Toaster />
          </DashboardContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}
