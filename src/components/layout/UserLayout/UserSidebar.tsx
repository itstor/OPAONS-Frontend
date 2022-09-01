import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Button, Drawer, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';

import 'react-perfect-scrollbar/dist/css/styles.css';

import NavItem from '@/components/layout/DashboardLayout/NavItem';
import QuestionNavigation from '@/components/QuestionNavigation';

import { useAuth } from '@/context/AuthProvider';
import { LocalUserAnswerInterface } from '@/ts/interfaces/Soal.interface';

export default function UserSidebar({
  isMobileSidebarOpen,
  onSidebarClose,
  current,
  questionData,
  changeQuestion,
  handleSubmitExam,
}: {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  questionData?: LocalUserAnswerInterface[];
  current?: number;
  changeQuestion?: (number: number) => void;
  handleSubmitExam?: () => void;
}) {
  const { logout } = useAuth();

  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const SidebarContent = (
    <SimpleBar style={{ maxHeight: mdUp ? 'calc(100vh - 45px)' : '100vh' }}>
      <Grid container direction='column' px={2} py={3} gap={2} height='100%'>
        <Typography variant='h4'>Navigasi</Typography>
        {questionData && current && changeQuestion && (
          <QuestionNavigation current={current} questionData={questionData} changeQuestion={changeQuestion} />
        )}
        <Button variant='contained' color='primary' onClick={handleSubmitExam} disableElevation>
          Selesai
        </Button>
        <Grid item>
          <NavItem item={{ type: 'item', title: 'Logout', id: 'logout', icon: faSignOut }} level={1} onClick={() => logout()} />
        </Grid>
      </Grid>
    </SimpleBar>
  );

  return (
    <Drawer
      anchor='right'
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: '265px',
          border: '0 !important',
          backgroundColor: '#F8E5C5',
        },
      }}
      variant='temporary'
    >
      {SidebarContent}
    </Drawer>
  );
}
