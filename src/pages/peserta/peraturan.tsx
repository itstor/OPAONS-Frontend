import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { Button, Grid, IconButton, Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import parse from 'html-react-parser';
import { toNumber } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { toast } from 'react-hot-toast';

import { PeraturanOPA } from '@/data/peraturan-data';

import AnimatedButton from '@/components/AnimatedButton';
import Countdown from '@/components/Countdown';
import ExamLayout from '@/components/layout/ExamLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';

import { ExamProvider, useExam } from '@/context/ExamProvider';
import { useUserPref } from '@/context/UserPrefProvider';
import { ApiError } from '@/ts/interfaces/ApiError.interface';
import { TimeInterface } from '@/ts/interfaces/Time.interface';

export default function PeraturanPage() {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const xlUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const { increaseFontSize, decreaseFontSize, fontSizeMultiplier } = useUserPref();
  const { timeLoading, populateUserAnswers, time } = useExam();
  const [disableStart, setDisableStart] = useState(true);
  const [showRemaining, setShowRemaining] = useState(false);
  const router = useRouter();
  const [enterTime] = useState(moment().valueOf());

  const handleStart = () => {
    populateUserAnswers()
      .then(() => {
        router.push('/peserta/soal');
      })
      .catch((err: AxiosError<ApiError>) => {
        if (err.response?.data.message === 'User has finished the exam') {
          toast.error('Anda sudah menyelesaikan kompetisi');
        } else if (err.response?.data.message === 'No exam at the moment') {
          toast.error('Tidak ada kompetisi saat ini');
        } else if (err.response?.data.message) {
          toast.error(err.response?.data.message);
        } else {
          toast.error('Terjadi kesalahan');
        }
      });
  };

  const fontMultiplier = (size: string) => toNumber(size.split('rem')[0]) * fontSizeMultiplier + 'rem';

  const handleTimeOut = () => {
    setDisableStart(false);
    setShowRemaining(true);

    if (enterTime < (time as TimeInterface)?.start) {
      handleStart();
    }
  };

  return (
    <>
      <Seo templateTitle='Peraturan' />
      <ExamLayout>
        {timeLoading ? (
          <></>
        ) : (
          <div className='flex justify-center'>
            <Grid container direction={mdUp ? 'row' : 'column-reverse'} spacing={mdUp ? 6 : 2} className='p-4 xl:max-w-[1350px]'>
              <Grid item md={8}>
                <MainCard
                  sx={{ height: 'max-content' }}
                  title={<Typography variant='h3'>Peraturan OPA UNS 2022</Typography>}
                  secondary={
                    <Grid container direction='row'>
                      <Tooltip title='Perkecil'>
                        <IconButton onClick={() => decreaseFontSize()} className='hover:text-primary-700'>
                          <ZoomOut />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Perbesar'>
                        <IconButton onClick={() => increaseFontSize()} className='hover:text-primary-700'>
                          <ZoomIn />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  }
                  contentSX={{ paddingLeft: 2, paddingRight: 8, paddingTop: 0 }}
                >
                  <div
                    className='font-normal !leading-loose'
                    style={{
                      fontSize: xlUp ? fontMultiplier('1rem') : fontMultiplier('0.875rem'),
                    }}
                  >
                    <ol>
                      {PeraturanOPA.map((peraturan, index) => (
                        <li key={index}>{parse(peraturan)}</li>
                      ))}
                    </ol>
                  </div>
                </MainCard>
              </Grid>
              <Grid item xs>
                <MainCard title={showRemaining ? 'Waktu Terisisa' : 'Waktu Pelaksanaan'}>
                  <Grid container direction='column' gap={2}>
                    {time === false ? (
                      <>Tidak ada kompetisi untuk saat ini</>
                    ) : (
                      <>
                        <Countdown
                          targetDate={showRemaining ? (time as TimeInterface)?.end : (time as TimeInterface)?.start}
                          callback={
                            showRemaining
                              ? () => {
                                  setDisableStart(true);
                                }
                              : handleTimeOut
                          }
                        />
                        {!showRemaining && (
                          <Typography variant='body1' className='text-center'>
                            Kompetisi akan dimulai pada{' '}
                            <strong>
                              {moment((time as TimeInterface)?.start)
                                .utcOffset(7)
                                .format('dddd, DD MMMM YYYY HH:mm')}{' '}
                              WIB{' '}
                            </strong>
                          </Typography>
                        )}
                      </>
                    )}
                    <AnimatedButton>
                      <Button
                        onClick={() => handleStart()}
                        disabled={disableStart}
                        variant='contained'
                        color='secondary'
                        disableElevation
                        fullWidth
                      >
                        Mulai
                      </Button>
                    </AnimatedButton>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </div>
        )}
      </ExamLayout>
    </>
  );
}

PeraturanPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <ExamProvider>{page}</ExamProvider>;
};
