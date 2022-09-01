import { ButtonBase, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Logo from '~/images/logo-opa.webp';

export default function LogoSection({ title = true, small = false }: { title?: boolean; small?: boolean }) {
  const router = useRouter();
  return (
    <ButtonBase disableRipple onClick={() => router.push('/')}>
      <Grid container justifyContent='start' alignItems='center' gap={1.5}>
        <Image src={Logo} alt='Logo' width={small ? 40 : 60} height={small ? 40 : 60} objectFit='scale-down' />
        {title && (
          <Typography variant='h3' fontWeight='bold' fontSize={small ? 18 : 24} color='primary.dark'>
            OPAUNS
          </Typography>
        )}
      </Grid>
    </ButtonBase>
  );
}
