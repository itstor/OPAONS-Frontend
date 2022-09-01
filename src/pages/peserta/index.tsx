// import dynamic from 'next/dynamic';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, Tooltip } from '@mui/material';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import Countdown from '@/components/Countdown';
import getSession from '@/components/getSession';
import Layout from '@/components/layout/Layout';
import LogoTop from '@/components/login/LogoTop';
import MaskotCard from '@/components/MaskotCard';
import Seo from '@/components/Seo';

import { useAuth } from '@/context/AuthProvider';
import { ExamProvider, useExam } from '@/context/ExamProvider';
import { TimeInterface } from '@/ts/interfaces/Time.interface';

import OASELogo from '~/images/OASE.png';

const SocialMediaBottom = dynamic(() => import('@/components/login/SocialMediaBottom'), { ssr: false });

export default function UserIndex() {
  const { time, timeLoading } = useExam();
  const [disableStart, setDisableStart] = useState(true);
  const router = useRouter();
  const { logout } = useAuth();

  // useEffect(() => {
  //   if (time !== null && time !== false) {
  //     if ((time as TimeInterface).start < moment().valueOf() && (time as TimeInterface).end > moment().valueOf()) {
  //       router.push('/peserta/peraturan');
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [time]);

  return (
    <Layout>
      <Seo templateTitle='Peserta' />
      {timeLoading ? (
        <></>
      ) : (
        <div className='relative flex h-screen flex-col items-center justify-center bg-left-corner-decor bg-left-bottom bg-no-repeat'>
          <div className='absolute top-6'>
            <LogoTop />
          </div>
          <div className='box-border h-min w-full px-4 xl:h-min xl:max-w-3xl 2xl:max-w-4xl'>
            <MaskotCard>
              <div className='flex h-full flex-col items-center gap-2'>
                <div className='flex-none'>
                  <h1 className='text-center text-xl md:text-2xl'>Selamat datang peserta OPA UNS 2022</h1>
                </div>
                <div className='flex grow flex-col items-center justify-center'>
                  {time === false ? (
                    <div className='text-lg'>Tidak ada kompetisi untuk saat ini</div>
                  ) : (
                    <>
                      <div className='flex  w-full max-w-full md:max-w-lg'>
                        <Countdown
                          targetDate={(time as TimeInterface)?.start}
                          showDay
                          triggerWhen={moment.duration({ minutes: 15 }).asMilliseconds()}
                          callback={() => setDisableStart(false)}
                        />
                      </div>
                      <div className='mt-4 w-full text-center'>
                        Babak {(time as TimeInterface)?.round} akan dimulai pada{' '}
                        <strong>
                          {moment((time as TimeInterface)?.start)
                            .utcOffset(7)
                            .format('dddd, DD MMMM YYYY HH:mm')}{' '}
                          WIB{' '}
                        </strong>
                      </div>
                    </>
                  )}
                </div>
                <div className='relative flex w-full flex-none grow-0 items-center justify-center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    disableElevation
                    className='mt-4 min-w-[200px]'
                    disabled={disableStart}
                    onClick={() => router.push('/peserta/peraturan')}
                  >
                    Masuk
                  </Button>
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
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, role } = getSession(context);

  if (role !== 'user') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

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

UserIndex.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <ExamProvider>{page}</ExamProvider>;
};
