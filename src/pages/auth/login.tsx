// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import LoginCard from '@/components/login/LoginCard';
import LoginForm from '@/components/login/LoginForm';
// import LogoTop from '@/components/login/LogoTop';
import Seo from '@/components/Seo';

import { useAuth } from '@/context/AuthProvider';

// const SocialMediaBottom = dynamic(() => import('@/components/login/SocialMediaBottom'), { ssr: false });

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isAuthenticated) {
    router.replace('/');
  }

  return (
    <Layout>
      <Seo templateTitle='Login' />
      <div className='relative flex h-screen flex-col items-center justify-center bg-left-corner-decor bg-left-bottom bg-no-repeat'>
        <div className='absolute top-6'>{/* <LogoTop /> */}</div>
        <div className='box-border w-full max-w-sm px-4 2xl:max-w-md'>
          <LoginCard>
            <LoginForm />
          </LoginCard>
        </div>
        <div className='absolute bottom-9 hidden md:block'>{/* <SocialMediaBottom /> */}</div>
      </div>
    </Layout>
  );
}
