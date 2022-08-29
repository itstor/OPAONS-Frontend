import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import useSWR from 'swr';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import RankingCard from '@/components/ranking/RankingCard';
import Seo from '@/components/Seo';
import RankingTable from '@/components/table/RankingTable';

import NotFoundPage from '@/pages/404';
import TeamService from '@/services/Team.service';

const RankingPage = ({ babak, kategori }: { babak: number; kategori: string }) => {
  const minimumScore = useSWR(TeamService.getMinimumScore);
  const maximumScore = useSWR(TeamService.getMaximumScore);

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <Grid container direction='column' gap={2}>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={12} md={6}>
              <RankingCard isLoading={typeof maximumScore.data !== 'undefined'} type='max' value={maximumScore.data ?? 0} />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingCard isLoading={typeof maximumScore.data !== 'undefined'} type='min' value={minimumScore.data ?? 0} />
            </Grid>
            {/* <Grid item xs={6} md={4}>
              <RankingCard isLoading={false} type='mean' value={101.4} />
            </Grid> */}
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <MainCard contentSX={{ padding: 0 }}>
              <RankingTable babak={babak} kategori={kategori} />
            </MainCard>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { babak, kategori } = context.query;

  const queryValidation = yup.object().shape({
    babak: yup.number().required().max(2).min(1),
    kategori: yup.string().required().oneOf(['sma', 'smk']),
  });

  const isValid = await queryValidation.isValid({ babak, kategori });

  return { props: { babak, kategori, isValid } };
};

export default RankingPage;

// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-explicit-any
RankingPage.getLayout = function getLayout(page: ReactElement, pageProps: any): JSX.Element {
  if (!pageProps.isValid) {
    return <NotFoundPage />;
  }

  const kategori = pageProps.kategori.toUpperCase();

  return <DashboardLayout title={`Ranking Babak ${pageProps.babak} Kategori ${kategori}`}>{page}</DashboardLayout>;
};
