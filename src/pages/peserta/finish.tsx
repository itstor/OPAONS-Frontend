import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Tooltip } from '@mui/material';
import Lottie from 'lottie-react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ReactElement } from 'react';

import getSession from '@/components/getSession';
import Layout from '@/components/layout/Layout';
import LogoTop from '@/components/login/LogoTop';
import MaskotCard from '@/components/MaskotCard';
import Seo from '@/components/Seo';

import { useAuth } from '@/context/AuthProvider';
import { ExamProvider } from '@/context/ExamProvider';

import CheckAnim from '~/anim/check.json';
import OASELogo from '~/images/OASE.png';

const SocialMediaBottom = dynamic(() => import('@/components/login/SocialMediaBottom'), { ssr: false });

export default function FinishPage() {
  const { logout } = useAuth();

  return (
    <Layout>
      <Seo templateTitle='Selesai' />
      <div className='relative flex h-screen flex-col items-center justify-center bg-left-corner-decor bg-left-bottom bg-no-repeat'>
        <div className='absolute top-6'>
          <LogoTop />
        </div>
        <div className='box-border h-min w-full px-4 xl:h-min xl:max-w-3xl 2xl:max-w-4xl'>
          <MaskotCard>
            <div className='flex h-full flex-col items-center gap-2'>
              <div className='flex grow flex-col '>
                <Lottie animationData={CheckAnim} className='max-h-64' loop={false} />
                <div className='-mt-9 flex flex-col items-center justify-center'>
                  <h3 className='text-md max-w-lg text-center md:text-2xl'>Terima kasih telah mengikuti kompetisi OPA UNS 2022.</h3>
                  {/* <caption className='max-w-lg text-center text-md'>Stay tune untuk informasi selanjutnya</caption> */}
                  <Button color='primary' disableElevation className='max-w-min' onClick={logout}>
                    Keluar
                  </Button>
                </div>
              </div>
              <div className='relative flex w-full flex-none grow-0 items-center justify-center'>
                <div className='absolute bottom-0 left-0'>
                  <Tooltip title='Keluar'>
                    <IconButton className='hover:text-primary-700' onClick={logout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={18} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </MaskotCard>
        </div>
        <div className='absolute bottom-9 hidden md:block'>
          <SocialMediaBottom />
        </div>
        <div className='absolute bottom-2 right-4 flex flex-col text-right text-xs font-medium'>
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

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth/login',
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

FinishPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <ExamProvider>{page}</ExamProvider>;
};
