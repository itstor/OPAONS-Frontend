import { Box, Container, styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

import UserHeader from '@/components/layout/UserLayout/UserHeader';
import UserSidebar from '@/components/layout/UserLayout/UserSidebar';

import { LocalUserAnswerInterface } from '@/ts/interfaces/Soal.interface';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
  backgroundImage: 'url(/images/background/right-corner-decor.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom right',
}));

const PageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('lg')]: {
    paddingTop: '64px',
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0px',
    paddingTop: '58px',
  },
}));

export default function ExamLayout({
  children,
  title,
  current,
  questionData,
  changeQuestion,
  showHeaderTitle = true,
  handleSubmitExam,
  countdown,
}: {
  children?: ReactNode;
  title?: string;
  questionData?: LocalUserAnswerInterface[];
  current?: number;
  changeQuestion?: (number: number) => void;
  showHeaderTitle?: boolean;
  handleSubmitExam?: () => void;
  countdown?: JSX.Element;
}) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [router.pathname]);

  return (
    <MainWrapper>
      <UserHeader
        sx={{
          height: '70px',
        }}
        title={title}
        className='bg-[#f8e5c5]/60 backdrop-blur-sm'
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        showTitle={showHeaderTitle}
        countdown={countdown}
      />
      <UserSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        changeQuestion={changeQuestion}
        current={current}
        questionData={questionData}
        handleSubmitExam={handleSubmitExam}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: '40px',
            paddingBottom: '24px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 130px)' }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
