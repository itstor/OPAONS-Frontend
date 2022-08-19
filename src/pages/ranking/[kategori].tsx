import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import RankingCard from '@/components/ranking/RankingCard';
import Seo from '@/components/Seo';

import NotFoundPage from '@/pages/404';

function RankingPage({ babak, kategori, isValid }: { babak: number; kategori: string; isValid: boolean }) {
  if (!isValid) {
    return <NotFoundPage />;
  }

  kategori = kategori.toUpperCase();

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <DashboardLayout title={`Ranking Babak ${babak} Kategori ${kategori}`}>
        <div className='w-full'>
          <Grid container direction='column' gap={2}>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={6} md={4}>
                <RankingCard isLoading={false} type='max' value={120} />
              </Grid>
              <Grid item xs={6} md={4}>
                <RankingCard isLoading={false} type='min' value={80} />
              </Grid>
              <Grid item xs={6} md={4}>
                <RankingCard isLoading={false} type='mean' value={101.4} />
              </Grid>
            </Grid>
            <MainCard title='Ranking'>Ranking Table Here</MainCard>
          </Grid>
        </div>
      </DashboardLayout>
    </>
  );
}

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
