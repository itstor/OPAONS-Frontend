import { CircularProgress } from '@mui/material';
import Image from 'next/image';

import Seo from '@/components/Seo';

import Logo from '~/images/logo-opa.webp';

export default function LoadingPage() {
  return (
    <>
      <Seo templateTitle='Loading' />
      <div className='flex h-screen flex-col items-center justify-center gap-8 bg-left-corner-decor bg-left-bottom bg-no-repeat'>
        <Image src={Logo} alt='Logo' width={120} height={120} objectFit='scale-down' placeholder='blur' />
        <CircularProgress />
      </div>
    </>
  );
}
