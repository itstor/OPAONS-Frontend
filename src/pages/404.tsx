import { Button } from '@mui/material';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import Anim404 from '~/anim/404.json';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Layout>
      <Seo templateTitle='404' />
      <main>
        <div className='flex min-h-screen flex-col items-center justify-center bg-left-corner-decor bg-left-bottom bg-no-repeat text-center text-black'>
          <Lottie className='w-full max-w-xs md:max-w-md 2xl:max-w-lg' animationData={Anim404} />
          <h1 className='mt-5 text-3xl md:text-4xl 2xl:text-5xl'>Page Not Found</h1>
          <Button size='large' onClick={() => router.replace('/')}>
            Back to home
          </Button>
        </div>
      </main>
    </Layout>
  );
}
