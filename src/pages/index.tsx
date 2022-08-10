import { TextField } from '@mui/material';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <div className='flex h-screen items-center justify-center'>
        <TextField label='Hello' />
      </div>
    </Layout>
  );
}
