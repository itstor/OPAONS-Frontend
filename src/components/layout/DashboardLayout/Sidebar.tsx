import { Box, Drawer, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { items } from '@/data/menu-items';

import LogoSection from '@/components/layout/DashboardLayout/LogoSection';
import NavGroup from '@/components/layout/DashboardLayout/NavGroup';

export default function Sidebar({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  ...others
}: {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  // const [open, setOpen] = React.useState(true);

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  // const handleClick = (index: boolean) => {
  //   if (open === index) {
  //     setOpen((prevopen) => !prevopen);
  //   } else {
  //     setOpen(index);
  //   }
  // };

  const SidebarContent = (
    <PerfectScrollbar
      component='div'
      style={{
        height: !mdUp ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
      }}
    >
      <Box px={2} py={3} height='100%'>
        <LogoSection />
        <Box mt={2}>
          {items.map((item) => {
            switch (item.type) {
              case 'group':
                return <NavGroup key={item.id} item={item} {...others} />;
              default:
                return (
                  <Typography key={item.id} variant='h6' color='error' align='center'>
                    Menu Items Error
                  </Typography>
                );
            }
          })}
        </Box>
      </Box>
    </PerfectScrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open={isSidebarOpen}
        variant='persistent'
        PaperProps={{
          sx: {
            width: '280px',
            border: '0 !important',
            backgroundColor: 'transparent',
            paddingLeft: '16px',
            paddingY: '24px',
            overflow: 'visible',
          },
        }}
      >
        <div className=' h-full w-full rounded-lg bg-[#F8E5C5] shadow-xl shadow-black/5'>{SidebarContent}</div>
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor='left'
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
