/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

import getSession from '@/components/getSession';
import AdminIndex from '@/components/index/AdminIndex';
import UserIndex from '@/components/index/UserIndex';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';

const HomePage = ({ role }: { role: string }) => {
  if (role === 'admin') {
    return <AdminIndex />;
  } else {
    return <UserIndex />;
  }
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

  return {
    props: {
      isAuthenticated,
      role,
    },
  };
};

export default HomePage;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
HomePage.getLayout = function getLayout(page: ReactElement, pageProps: any): JSX.Element {
  if (pageProps.role !== 'admin') {
    return page;
  }
  return <DashboardLayout title='Dashboard'>{page}</DashboardLayout>;
};
