import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { useState } from 'react';

import { DataPesertaForm, PasswordTypesForm, UsernameTypesForm } from '@/ts/interfaces/DataPeserta.interface';

export default function DataAnggotaForm({
  title,
  validation,
  username,
  password,
}: {
  title: string;
  validation: FormikProps<DataPesertaForm>;
  username: UsernameTypesForm;
  password: PasswordTypesForm;
}) {
  const [isPasswordVisibled, setIsPasswordVisibled] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordVisibled(!isPasswordVisibled);
  };

  return (
    <Grid container direction='column' gap={2}>
      <Typography variant='h6'>{title}</Typography>
      <Grid container direction='row' spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label='Username'
            name={username}
            variant='outlined'
            fullWidth
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values[username]}
            error={validation.touched[username] && validation.errors[username] ? true : false}
            helperText={validation.touched[username] && validation.errors[username] ? validation.errors[username] : ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='Password'
            name={password}
            variant='outlined'
            fullWidth
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values[password]}
            error={validation.touched[password] && validation.errors[password] ? true : false}
            helperText={validation.touched[password] && validation.errors[password] ? validation.errors[password] : ''}
            InputProps={{
              type: isPasswordVisibled ? 'text' : 'password',
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' size='large' onClick={handleClickShowPassword}>
                    {isPasswordVisibled ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
