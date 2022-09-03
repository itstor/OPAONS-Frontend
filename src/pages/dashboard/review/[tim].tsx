import { Button, Grid, Theme, Tooltip, useMediaQuery } from '@mui/material';
import { toNumber } from 'lodash';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

import AnimatedButton from '@/components/AnimatedButton';
import DifficultyChip from '@/components/DifficultyChip';
import FlatChip from '@/components/FlatChip';
import getSession from '@/components/getSession';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import StatsCard from '@/components/review/StatsCars';
import Seo from '@/components/Seo';
import SoalCard from '@/components/SoalCard';
import SubCard from '@/components/SubCard';

import SoalService from '@/services/Soal.service';
import TeamService from '@/services/Team.service';
import UserService from '@/services/User.service';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { Difficulty, SoalInterface, TipeSoal } from '@/ts/interfaces/Soal.interface';

interface UserQuestionAnswer {
  userAnswer: Partial<{ userId: string; userAnswer: string; verdict: 'CORRECT' | 'INCORRECT' | undefined }>[];
}

interface UserVerdict {
  true: number;
  false: number;
}

const KoreksiJawabanTimPage = ({ tim, babak, id }: { tim: string; babak: number; id?: number; kategori: string }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [selectedIndex, setSelectedIndex] = useState(toNumber(id ?? 0));
  const [verdict, setVerdict] = useState<UserVerdict[]>([]);
  const teamData = useSWR({ name: tim }, TeamService.getTeamByName);
  const questionData = useSWR(
    teamData.data && teamData.data?.team.length > 0 ? { round: babak, kategori: teamData.data?.team[0].schoolType } : null,
    SoalService.getSoalByRound
  );
  const router = useRouter();

  const [data, setData] = useState<Partial<SoalInterface & DefaultResponseInterface & UserQuestionAnswer>[]>([]);

  useEffect(() => {
    if (teamData.data?.team.length === 0) {
      toast.error('Tim tidak ditemukan');
    }
  }, [teamData.data]);

  useEffect(() => {
    router.replace(`/dashboard/review/${tim}?babak=${babak}&id=${selectedIndex}`, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  useMemo(() => {
    if (teamData.data && questionData.data) {
      if (teamData.data?.team.length > 0 && questionData.data?.results.length > 0) {
        const question: Partial<SoalInterface & DefaultResponseInterface & UserQuestionAnswer>[] = questionData.data.results;
        const verdict: UserVerdict[] = [];

        question.forEach(({ _id, type }, qindex) => {
          question[qindex].userAnswer = [];
          teamData.data?.team[0].members.forEach((user, index) => {
            if (verdict[index] === undefined) {
              verdict.push({ true: 0, false: 0 });
            }

            const answer = user.answers.find((answer) => answer.id === _id);
            if (answer) {
              question[qindex].userAnswer?.push({
                userId: user._id,
                userAnswer: answer.answer,
                verdict: answer.verdict,
              });

              if (answer.verdict === 'CORRECT') {
                verdict[index].true += 1;
              } else if (answer.verdict === 'INCORRECT') {
                verdict[index].false += 1;
              }
            } else {
              question[qindex].userAnswer?.push({
                userId: user._id,
                userAnswer: '',
                verdict: undefined,
              });

              if (type !== 'ESAI_PANJANG') {
                verdict[index].false += 1;
              }
            }
          });
        });
        setVerdict(verdict);
        setData(question);
      }
    }
  }, [teamData.data, questionData.data]);

  const handleToggleCorrected = () => {
    UserService.toggleCorected(teamData.data?.team[0].members[selectedIndex]._id as string)
      .then(() => {
        toast.success('Berhasil mengubah status');
        teamData.mutate();
      })
      .catch(() => {
        toast.error('Gagal mengubah status');
      });
  };

  const hangleChangePeserta = (type: 'next' | 'prev') => {
    if (type === 'next') {
      setSelectedIndex((prev) => prev + 1);
    } else {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <Seo templateTitle='Dashboard' />
      {teamData.data !== undefined && teamData.data.team.length > 0 ? (
        <Grid container direction={mdUp ? 'row' : 'column-reverse'} spacing={1}>
          <Grid item xs={12} md={8} xl={9}>
            <MainCard title='Soal dan Jawaban'>
              <Grid container direction='column' gap={2}>
                {data.map((data, i) => (
                  <SubCard
                    key={i}
                    title={
                      <>
                        Nomor {i + 1} &nbsp; <DifficultyChip difficulty={data.difficulty as keyof typeof Difficulty} /> &nbsp;{' '}
                        {data.type !== 'ESAI_PANJANG' && (
                          <FlatChip
                            color={data.userAnswer?.[selectedIndex].verdict === 'CORRECT' ? 'success' : 'error'}
                            label={data.userAnswer?.[selectedIndex].verdict ?? 'INCORRECT'}
                          />
                        )}
                      </>
                    }
                  >
                    <SoalCard
                      question={data.question ?? 'Question not found'}
                      type={data.type as keyof typeof TipeSoal}
                      multipleChoice={data.multipleChoice}
                      answer={data.userAnswer?.[selectedIndex]?.userAnswer ?? ''}
                      correctAnswer={data.answer}
                      showCard={false}
                      showCorrectAnswer
                      display
                    />
                  </SubCard>
                ))}
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <MainCard title='Stats'>
              <Grid container direction='column' gap={2}>
                <Grid container direction='row' spacing={1}>
                  <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                    <StatsCard
                      title='Skor Peserta'
                      value={teamData.data ? teamData.data.team[0].members[selectedIndex][`score_${babak as 1 | 2}`] : '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                    <StatsCard title='Skor Tim' value={teamData.data ? teamData.data.team[0][`scoreTotal_${babak as 1 | 2}`] : '-'} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                    <StatsCard title='Jawaban Benar' value={verdict[selectedIndex]?.true} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ height: '100%' }}>
                    <StatsCard title='Jawaban Salah' value={verdict[selectedIndex]?.false} />
                  </Grid>
                </Grid>
                <Grid item xs>
                  <AnimatedButton>
                    <Button
                      variant='contained'
                      color={teamData.data?.team[0].members[selectedIndex].corrected ? 'error' : 'success'}
                      className='text-white'
                      disableElevation
                      fullWidth
                      disabled={!teamData || babak === 1}
                      onClick={handleToggleCorrected}
                    >
                      {teamData.data?.team[0].members[selectedIndex].corrected || babak === 1 ? 'Batalkan Koreksi' : 'Koreksi'}
                    </Button>
                  </AnimatedButton>
                </Grid>
                <Grid item xs>
                  <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                    <Grid item xs={6}>
                      <AnimatedButton>
                        <Tooltip title='Peserta sebelumnya'>
                          <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                            fullWidth
                            onClick={() => hangleChangePeserta('prev')}
                            disabled={!teamData || selectedIndex === 0}
                          >
                            Previous
                          </Button>
                        </Tooltip>
                      </AnimatedButton>
                    </Grid>
                    <Grid item xs={6}>
                      <AnimatedButton>
                        <Tooltip title='Peserta selanjutya'>
                          <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                            fullWidth
                            onClick={() => hangleChangePeserta('next')}
                            disabled={!teamData || teamData.data?.team[0].members.length === selectedIndex + 1}
                          >
                            Next
                          </Button>
                        </Tooltip>
                      </AnimatedButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

export default KoreksiJawabanTimPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, role } = getSession(context);
  const { tim, babak, id } = context.query;

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

  if (!id) {
    return { props: { tim, babak } };
  }

  return { props: { tim, babak, id } };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
KoreksiJawabanTimPage.getLayout = function getLayout(page: ReactElement, pageProps: any) {
  return (
    <DashboardLayout title={`Jawaban Tim ${pageProps.tim} Babak ${pageProps.babak}`} backButton>
      {page}
    </DashboardLayout>
  );
};
