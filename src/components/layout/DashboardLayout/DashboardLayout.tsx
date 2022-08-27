import { Box, Container, styled, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

import Header from '@/components/layout/DashboardLayout/Header';
import Sidebar from '@/components/layout/DashboardLayout/Sidebar';

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
}));

export default function DashboardLayout({
  children,
  title,
  secondary,
  childOf,
  backButton,
}: {
  children?: ReactNode;
  title?: string;
  childOf?: string;
  secondary?: JSX.Element;
  backButton?: boolean;
}) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const router = useRouter();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [router.pathname]);

  return (
    <MainWrapper>
      <Header
        sx={{
          paddingTop: '24px',
          paddingLeft: isSidebarOpen && lgUp ? '280px' : '',
          height: '78px',
        }}
        title={title}
        className='bg-[#fff6e8]/60 backdrop-blur-sm'
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        secondary={secondary}
        backButton={backButton}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        childOf={childOf}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: '20px',
            paddingBottom: '24px',
            paddingLeft: isSidebarOpen && lgUp ? '295px!important' : '',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
