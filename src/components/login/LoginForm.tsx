import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import * as Yup from 'yup';

import useScriptRef from '@/hooks/useScriptRef';

import AnimatedButton from '@/components/AnimatedButton';

import { useAuth } from '@/context/AuthProvider';

import LogoOPA from '~/images/logo-opa.webp';

export default function LoginForm() {
  const theme = useTheme();
  const auth = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' height='100%' gap={1.5}>
      <Grid container direction='column' justifyContent='center' alignItems='center' gap={1}>
        <div className='h-[75px] w-[55px] 2xl:h-[100px] 2xl:w-[74px]'>
          <Image src={LogoOPA} alt='Logo OPA UNS 2022' width={74} height={100} objectFit='scale-down' placeholder='blur' />
        </div>
        <Typography variant='h2' color='textPrimary' textAlign='center' className='text-sm 2xl:text-xl'>
          OPA UNS 2022
        </Typography>
        <Typography variant='caption' color='textPrimary' textAlign='center' className='2xl:text-md text-xs'>
          Kompetisi Pendidikan Akuntansi
          <br />
          Universitas Sebelas Maret
        </Typography>
      </Grid>
      <Grid item xs width='100%'>
        <Formik
          initialValues={{
            submit: null,
            username: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('Username is required'),
            password: Yup.string().max(255).required('Password is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
              }

              auth?.login(values.username, values.password);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.response.data.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} style={{ height: '100%' }}>
              <Grid container direction='column' justifyContent='start' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor='username-field'>Username</InputLabel>
                  <OutlinedInput
                    id='username-field'
                    type='text'
                    value={values.username}
                    name='username'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label='Username'
                    inputProps={{}}
                  />
                  {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor='password-field'>Password</InputLabel>
                  <OutlinedInput
                    id='password-field'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                          size='large'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                    inputProps={{}}
                  />
                  {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                </FormControl>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
                <Grid item xs width='100%' mt={1.5} mb={3} sx={{ justifyContent: 'end', display: 'flex', flexDirection: 'column' }}>
                  <AnimatedButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      color='secondary'
                    >
                      Masuk
                    </Button>
                  </AnimatedButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}
