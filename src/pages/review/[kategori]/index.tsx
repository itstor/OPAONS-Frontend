import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import KoreksiCard from '@/components/review/KoreksiCard';
import Seo from '@/components/Seo';

import NotFoundPage from '@/pages/404';

function ReviewPage({ babak, kategori, isValid }: { babak: number; kategori: string; isValid: boolean }) {
  if (!isValid) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <DashboardLayout title={`Koreksi Jawaban Babak ${babak} Kategori ` + kategori.toUpperCase()}>
        <div className='w-full'>
          <Grid container direction='column' gap={2}>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <KoreksiCard isLoading={false} type='corrected' value={120} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <KoreksiCard isLoading={false} type='uncorrected' value={80} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <KoreksiCard isLoading={false} type='total' value={101.4} />
              </Grid>
            </Grid>
            <MainCard title='List Jawaban'>Jawaban Table Here</MainCard>
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

export default ReviewPage;
