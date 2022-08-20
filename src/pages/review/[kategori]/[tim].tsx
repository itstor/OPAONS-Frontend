import { Button, Grid, Theme, useMediaQuery } from '@mui/material';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

import AnimatedButton from '@/components/AnimatedButton';
import DifficultyChip from '@/components/DifficultyChip';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import JawabanNav from '@/components/review/JawabanNav';
import StatsCard from '@/components/review/StatsCars';
import Seo from '@/components/Seo';
import SubCard from '@/components/SubCard';

const KoreksiJawabanTimPage = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <Grid container direction={mdUp ? 'row' : 'column-reverse'} spacing={1}>
        <Grid item xs={12} md={8} xl={9}>
          <MainCard title='Soal dan Jawaban'>
            <Grid container direction='column' gap={2}>
              {[...Array(20)].map((_, i) => (
                <SubCard
                  key={i}
                  title={
                    <>
                      Nomor {i + 1} &nbsp; <DifficultyChip difficulty='HOTS' />
                    </>
                  }
                ></SubCard>
              ))}
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <MainCard title='Stats'>
            <Grid container direction='column' gap={2}>
              <Grid container direction='row' spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StatsCard title='Skor Peserta' value={73} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatsCard title='Skor Tim' value={73} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatsCard title='Jawaban Benar' value={53} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatsCard title='Jawaban Salah' value={12} />
                </Grid>
              </Grid>
              <Grid item xs>
                <AnimatedButton>
                  <Button variant='contained' color='error' disableElevation fullWidth>
                    Batalkan Koreksi
                  </Button>
                </AnimatedButton>
              </Grid>
              <Grid item xs>
                <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                  <Grid item xs={6}>
                    <AnimatedButton>
                      <Button variant='contained' color='secondary' disableElevation fullWidth>
                        Previous
                      </Button>
                    </AnimatedButton>
                  </Grid>
                  <Grid item xs={6}>
                    <AnimatedButton>
                      <Button variant='contained' color='secondary' disableElevation fullWidth>
                        Next
                      </Button>
                    </AnimatedButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tim, babak } = context.query;

  return { props: { tim, babak } };
};

export default KoreksiJawabanTimPage;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
KoreksiJawabanTimPage.getLayout = function getLayout(page: ReactElement, pageProps: any) {
  return (
    <DashboardLayout title={`Jawaban Tim ${pageProps.tim} Babak ${pageProps.babak}`} secondary={<JawabanNav />}>
      {page}
    </DashboardLayout>
  );
};
