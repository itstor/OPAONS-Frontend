import { faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Button, Grid, IconButton, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { CSSProperties } from 'react';

import LogoSection from '@/components/layout/DashboardLayout/LogoSection';

import { useAuth } from '@/context/AuthProvider';

export default function UserHeader({
  sx,
  className,
  position,
  toggleMobileSidebar,
  showTitle = true,
  countdown,
}: {
  sx?: CSSProperties;
  className?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined;
  title?: string;
  toggleMobileSidebar: () => void;
  showTitle?: boolean;
  countdown?: JSX.Element;
}) {
  const theme = useTheme();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { logout } = useAuth();

  return (
    <AppBar sx={sx} position={position} elevation={0} className={className}>
      <Toolbar>
        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
          <Grid item>
            <LogoSection small title={showTitle} />
          </Grid>
          <Grid item>{countdown}</Grid>
          <Grid item>
            {mdUp && (
              <Button
                size='large'
                startIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} width={16} height={16} color={theme.palette.primary.dark} />}
                onClick={logout}
              >
                <Typography variant='h4' fontSize={16} color={theme.palette.primary.dark}>
                  Keluar
                </Typography>
              </Button>
            )}
            {!mdUp && (
              <IconButton
                size='small'
                aria-label='menu'
                onClick={toggleMobileSidebar}
                sx={{
                  display: {
                    lg: 'none',
                    xs: 'flex',
                  },
                  marginRight: '15px',
                  padding: '8px',
                }}
              >
                <FontAwesomeIcon icon={faBars} width={20} height={20} color={theme.palette.primary.dark} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
