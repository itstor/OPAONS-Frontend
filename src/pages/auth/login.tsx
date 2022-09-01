// import dynamic from 'next/dynamic';

import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import getSession from '@/components/getSession';
import Layout from '@/components/layout/Layout';
import LoginCard from '@/components/login/LoginCard';
import LoginForm from '@/components/login/LoginForm';
import LogoTop from '@/components/login/LogoTop';
import Seo from '@/components/Seo';

import OASELogo from '~/images/OASE.png';

const SocialMediaBottom = dynamic(() => import('@/components/login/SocialMediaBottom'), { ssr: false });

export default function LoginPage() {
  return (
    <Layout>
      <Seo templateTitle='Login' />
      <div className='relative flex h-screen flex-col items-center justify-center bg-left-corner-decor bg-left-bottom bg-no-repeat'>
        <div className='absolute top-6'>
          <LogoTop />
        </div>
        <div className='box-border w-full max-w-sm px-4 2xl:max-w-md'>
          <LoginCard>
            <LoginForm />
          </LoginCard>
        </div>
        <div className='absolute bottom-9 hidden md:block'>
          <SocialMediaBottom />
        </div>
        <div className='absolute bottom-2 right-4 flex flex-col text-right text-xs font-medium md:hidden lg:flex'>
          Powered by
          <a href='https://instagram.com/oasetechnology?igshid=YmMyMTA2M2Y=' target='_blank' rel='noreferrer'>
            <Image src={OASELogo} alt='OASE Logo' width={90} height={50} objectFit='contain' placeholder='blur' />
          </a>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated } = getSession(context);

  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated,
    },
  };
};
