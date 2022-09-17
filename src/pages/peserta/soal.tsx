import { ChevronLeft, ChevronRight, Clear, Flag, ZoomIn, ZoomOut } from '@mui/icons-material';
import { Button, Grid, IconButton, Theme, Tooltip, useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import moment from 'moment';
import { ApiError } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';

import AnimatedButton from '@/components/AnimatedButton';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import Countdown from '@/components/Countdown';
import ExamSoalCard from '@/components/ExamSoalCard';
import ExamLayout from '@/components/layout/ExamLayout';
import MainCard from '@/components/MainCard';
import QuestionNavigation from '@/components/QuestionNavigation';
import Seo from '@/components/Seo';

import { ExamProvider, useExam } from '@/context/ExamProvider';
import { useUserPref } from '@/context/UserPrefProvider';
import LocalStorageService from '@/services/LocalStorage.service';
import SoalService from '@/services/Soal.service';
import { TipeSoal } from '@/ts/interfaces/Soal.interface';
import { TimeInterface } from '@/ts/interfaces/Time.interface';

export default function SoalPage() {
  const router = useRouter();
  const [answer, setAnswer] = useState<string | null | false>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const debouncedAnswer = useDebounce(answer, 3000);
  const [selectedSoal, setSelectedSoal] = useState(1);
  const { userAnswers, setUserAnswers, loading, populateUserAnswers, time, timeLoading } = useExam();
  const { increaseFontSize, decreaseFontSize, fontSizeMultiplier } = useUserPref();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  //Set route params and set visited
  useEffect(() => {
    const selected = userAnswers[selectedSoal - 1];
    router.push(`/peserta/soal?soal=${selectedSoal}`, undefined, { shallow: true });

    if (loading || !router.isReady) {
      return;
    }

    if (!selected.visited) {
      selected.visited = true;
      setUserAnswers(userAnswers ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSoal]);

  useEffect(() => {
    if (!timeLoading && time === false) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLoading, time]);

  //Save answer on 3 sec
  useEffect(() => {
    if (answer !== false) {
      const selected = userAnswers[selectedSoal - 1];
      const prevAnswer = selected.answer;

      selected.answer = answer;
      SoalService.jawabSoal({ id: selected.question._id, answer: answer })
        .then(() => {
          setUserAnswers(userAnswers);
        })
        .catch((err: AxiosError<ApiError>) => {
          selected.answer = prevAnswer;
          setUserAnswers(userAnswers);

          if (err.code === 'ERR_NETWORK') {
            toast.error('Koneksi internet bermasalah');
            return;
          }

          if (err.response?.data?.message === 'Max login reached, please logout from another device') {
            toast.error('Akun kamu melebihi batas login');
            return;
          }

          if (err.response?.status === 403) {
            toast.error('Waktu sudah habis');
            handleSubmitExam();

            return;
          }
          toast.error('Terjadi kesalahan saat menyimpan jawaban');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAnswer]);

  //Get soal
  useEffect(() => {
    if (!userAnswers.length) {
      populateUserAnswers().catch((err: AxiosError<ApiError>) => {
        if (err.response?.data?.message === 'User has finished the exam') {
          toast.error('Anda sudah menyelesaikan kompetisi');
        } else if (err.response?.data?.message === 'No exam at the moment') {
          toast.error('Tidak ada kompetisi saat ini');
        } else {
          toast.error('Terjadi kesalahan saat mengambil soal');
        }

        router.push('/peserta');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswers.length]);

  const RenderSoal = () => {
    if (loading) {
      return <></>;
    }

    const selected = userAnswers[selectedSoal - 1];

    return (
      <ExamSoalCard
        question={selected.question.question}
        type={selected.question.type as keyof typeof TipeSoal}
        multipleChoice={selected.question.multipleChoice}
        onAnswerChange={(value) => setAnswer(value as string)}
        answer={answer || selected.answer}
        fontSizeMultiplier={fontSizeMultiplier}
        showCard={mdUp}
      />
    );
  };

  const handleChangeSoal = ({ type, number }: { type?: 'next' | 'previous'; number?: number }) => {
    const selected = userAnswers[selectedSoal - 1];

    if (answer !== false) {
      const prevAnswer = selected.answer;
      selected.answer = answer;
      SoalService.jawabSoal({ id: selected.question._id, answer: answer })
        .then(() => {
          setUserAnswers(userAnswers);
        })
        .catch((err: AxiosError<ApiError>) => {
          selected.answer = prevAnswer;
          setUserAnswers(userAnswers);

          if (err.code === 'ERR_NETWORK') {
            toast.error('Koneksi internet bermasalah');
            return;
          }

          if (err.response?.data?.message === 'Max login reached, please logout from another device') {
            toast.error('Akun kamu melebihi batas login');
            return;
          }

          if (err.response?.status === 403) {
            toast.error('Waktu sudah habis');
            handleSubmitExam();
            return;
          }
          toast.error('Terjadi kesalahan saat menyimpan jawaban');
        });
    }

    setAnswer(false);

    if (type) {
      if (type === 'next') {
        setSelectedSoal((prevState) => prevState + 1);
      } else {
        setSelectedSoal((prevState) => prevState - 1);
      }
    } else if (number) {
      setSelectedSoal(number);
    }
  };

  const handleMarkQuestion = () => {
    const selected = userAnswers[selectedSoal - 1];
    selected.marked = !selected.marked;
    setUserAnswers(userAnswers);
  };

  const handleRemoveAnswer = () => {
    const selected = userAnswers[selectedSoal - 1];
    const prevAnswer = selected.answer;
    selected.answer = null;
    setAnswer(null);
    SoalService.jawabSoal({ id: selected.question._id, answer: null })
      .then(() => {
        setUserAnswers(userAnswers);
      })
      .catch((err: AxiosError<ApiError>) => {
        selected.answer = prevAnswer;
        setUserAnswers(userAnswers);

        if (err.code === 'ERR_NETWORK') {
          toast.error('Koneksi internet bermasalah');
          return;
        }

        if (err.response?.data?.message === 'Max login reached, please logout from another device') {
          toast.error('Akun kamu melebihi batas login');
          return;
        }

        if (err.response?.status === 403) {
          toast.error('Waktu sudah habis');
          handleSubmitExam();
          return;
        }

        toast.error('Terjadi kesalahan saat menyimpan jawaban');
      });
  };

  const handleSubmitExam = () => {
    SoalService.submitExam().then(() => {
      router.replace('/peserta/finish');
      LocalStorageService.removeUserAnswers();
    });
  };

  return (
    <>
      <Seo templateTitle='Kompetisi' />
      <ExamLayout
        changeQuestion={(number) => handleChangeSoal({ number })}
        current={selectedSoal - 1}
        questionData={userAnswers}
        showHeaderTitle={mdUp}
        handleSubmitExam={() => setIsDialogOpen(true)}
        countdown={
          !mdUp ? (
            loading || time === false ? (
              <></>
            ) : (
              <Countdown
                targetDate={typeof time !== 'boolean' ? time?.end ?? 0 : moment().valueOf()}
                callback={() => {
                  toast.error('Waktu sudah habis');
                  handleSubmitExam();
                }}
                showLabel={false}
              />
            )
          ) : (
            <></>
          )
        }
      >
        {loading || time === false ? (
          <></>
        ) : (
          <div className='flex justify-center'>
            <Grid container direction='row' spacing={6} className='md:p-4 xl:max-w-[1350px]'>
              <Grid item xs={12} md={8}>
                <MainCard
                  sx={{ height: 'max-content', overflow: 'auto' }}
                  title={
                    <Button color='error' startIcon={<Flag />} onClick={handleMarkQuestion}>
                      {userAnswers[selectedSoal - 1].marked ? 'Hapus tandai' : 'Tandai'}
                    </Button>
                  }
                  secondary={
                    smUp && (
                      <Grid container direction='row'>
                        <Tooltip title='Perkecil'>
                          <IconButton className='hover:text-primary-700' onClick={() => decreaseFontSize()}>
                            <ZoomOut />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='Perbesar'>
                          <IconButton className='hover:text-primary-700' onClick={() => increaseFontSize()}>
                            <ZoomIn />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    )
                  }
                  contentSX={{ paddingTop: 0 }}
                >
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <RenderSoal />
                    </Grid>
                    <Grid item>
                      <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                        <Grid item>
                          <AnimatedButton>
                            <Button color='error' variant='contained' onClick={handleRemoveAnswer} disableElevation>
                              {!smUp ? <Clear /> : 'Hapus Jawaban'}
                            </Button>
                          </AnimatedButton>
                        </Grid>
                        <Grid item direction='row' gap={2} sx={{ display: 'flex' }}>
                          {selectedSoal !== 1 && (
                            <AnimatedButton>
                              <Button
                                color='primary'
                                onClick={() => handleChangeSoal({ type: 'previous' })}
                                startIcon={<ChevronLeft />}
                                disableElevation
                              >
                                Previous
                              </Button>
                            </AnimatedButton>
                          )}
                          <AnimatedButton>
                            <Button
                              color='primary'
                              onClick={() =>
                                selectedSoal === userAnswers.length ? setIsDialogOpen(true) : handleChangeSoal({ type: 'next' })
                              }
                              endIcon={<ChevronRight />}
                              disableElevation
                            >
                              {selectedSoal === userAnswers.length ? 'Selesai' : 'Next'}
                            </Button>
                          </AnimatedButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              {mdUp && (
                <Grid item xs>
                  <Grid container direction='column' gap={2}>
                    <MainCard title='Waktu Tersisa' contentSX={{ paddingTop: 0, height: '150px' }}>
                      <Countdown
                        targetDate={typeof time !== 'boolean' ? time?.end ?? 0 : moment().valueOf()}
                        callback={() => {
                          toast.error('Waktu sudah habis');
                          handleSubmitExam();
                        }}
                      />
                    </MainCard>

                    <MainCard title='Navigasi' contentSX={{ paddingTop: 0 }}>
                      <Grid container direction='column' gap={2} justifyContent='center' alignItems='center'>
                        <QuestionNavigation
                          questionData={userAnswers}
                          current={selectedSoal - 1}
                          changeQuestion={(number) => handleChangeSoal({ number })}
                        />
                      </Grid>
                    </MainCard>

                    <MainCard>
                      <AnimatedButton>
                        <Button
                          variant='contained'
                          color='secondary'
                          disableElevation
                          fullWidth
                          onClick={() => {
                            setIsDialogOpen(true);
                          }}
                        >
                          Selesai
                        </Button>
                      </AnimatedButton>
                    </MainCard>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </ExamLayout>
      <ConfirmationDialog
        open={isDialogOpen}
        handleClose={() => {
          setIsDialogOpen(false);
        }}
        time={(time as TimeInterface)?.end}
        onSubmit={() => {
          handleSubmitExam();
        }}
      />
    </>
  );
}

SoalPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <ExamProvider>{page}</ExamProvider>;
};
