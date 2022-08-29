import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Grid, IconButton, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';

export default function Header({
  sx,
  className,
  toggleMobileSidebar,
  position,
  title,
  secondary,
  backButton,
}: {
  sx?: CSSProperties;
  className?: string;
  position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined;
  toggleSidebar?: () => void;
  toggleMobileSidebar: () => void;
  title?: string;
  secondary?: JSX.Element;
  backButton?: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const titleComponent = title ? (
    <Typography variant='h3' fontSize={mdUp ? '1.25rem' : '1rem'} color={theme.palette.primary.dark}>
      {title}
    </Typography>
  ) : (
    <></>
  );

  return (
    <AppBar sx={sx} position={position} elevation={0} className={className}>
      <Toolbar>
        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
          <Grid container direction='row' alignItems='center'>
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
            {backButton ? (
              <IconButton
                size='small'
                aria-label='menu'
                onClick={() => {
                  router.back();
                }}
                sx={{
                  display: {
                    lg: 'flex',
                    xs: 'none',
                  },
                  marginRight: '15px',
                  padding: '8px',
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} width={20} height={20} color={theme.palette.primary.dark} />
              </IconButton>
            ) : (
              <></>
            )}
            {titleComponent}
          </Grid>
          <Grid item>{secondary}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
