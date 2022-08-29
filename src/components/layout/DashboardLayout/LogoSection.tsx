import { ButtonBase, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Logo from '~/images/logo-opa.webp';

export default function LogoSection() {
  const router = useRouter();
  return (
    <ButtonBase disableRipple onClick={() => router.push('/')}>
      <Grid container justifyContent='start' alignItems='center' gap={1.5}>
        <Image src={Logo} alt='Logo' width={60} height={60} objectFit='scale-down' />
        <Typography variant='h3' fontWeight='bold' color='primary.dark'>
          OPAUNS
        </Typography>
      </Grid>
    </ButtonBase>
  );
}
