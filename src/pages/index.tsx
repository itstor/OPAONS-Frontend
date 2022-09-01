/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetServerSideProps } from 'next';

import getSession from '@/components/getSession';
import Seo from '@/components/Seo';

const HomePage = () => {
  return (
    <>
      <Seo />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, role } = getSession(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  if (role === 'admin') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  if (role === 'user') {
    return {
      redirect: {
        destination: '/peserta',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated,
      role,
    },
  };
};

export default HomePage;
