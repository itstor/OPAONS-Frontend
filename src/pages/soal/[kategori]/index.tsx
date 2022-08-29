import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import * as yup from 'yup';

import getSession from '@/components/getSession';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';
import QuestionTable from '@/components/table/QuestionTable';

import NotFoundPage from '@/pages/404';

const SoalPage = ({ babak, kategori }: { babak: number; kategori: string }) => {
  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <MainCard contentSX={{ padding: 0 }}>
          <QuestionTable babak={babak} kategori={kategori} />
        </MainCard>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { babak, kategori } = context.query;
  const { isAuthenticated, role } = getSession(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  if (role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const queryValidation = yup.object().shape({
    babak: yup.number().required().max(2).min(1),
    kategori: yup.string().required().oneOf(['sma', 'smk']),
  });

  const isValid = await queryValidation.isValid({ babak, kategori });

  return { props: { babak, kategori, isValid } };
};

export default SoalPage;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SoalPage.getLayout = function getLayout(page: ReactElement, pageProps: any): JSX.Element {
  if (!pageProps.isValid) {
    return <NotFoundPage />;
  }

  return <DashboardLayout title={`Soal Babak ${pageProps.babak} Kategori ` + pageProps.kategori.toUpperCase()}>{page}</DashboardLayout>;
};
