import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import DataAnggotaForm from '@/components/manage/peserta/DataAnggotaForm';
import Seo from '@/components/Seo';
import SubCard from '@/components/SubCard';

import { generatePassword, generateUsername } from '@/ts/utils/generator';

export default function ManagePesertaPage() {
  const formSchema = yup.object().shape({
    name: yup.string().required('Nama tim tidak boleh kosong'),
    phone: yup
      .string()
      .required('Nomor telepon tidak boleh kosong')
      .matches(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g, 'Nomor telepon tidak valid'),
    school: yup.string().required('Asal sekolah tidak boleh kosong'),
    email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
    username1: yup.string().required('Username tidak boleh kosong'),
    password1: yup.string().required('Password tidak boleh kosong'),
    username2: yup.string(),
    password2: yup.string().when('username2', {
      is: (val: string) => !!val,
      then: yup.string().required('Password tidak boleh kosong'),
      otherwise: yup.string(),
    }),
    username3: yup.string(),
    password3: yup.string().when('username3', {
      is: (val: string) => !!val,
      then: yup.string().required('Password tidak boleh kosong'),
      otherwise: yup.string(),
    }),
  });

  const formValidation = useFormik({
    initialValues: {
      name: '',
      phone: '',
      school: '',
      email: '',
      username1: '',
      password1: '',
      username2: '',
      password2: '',
      username3: '',
      password3: '',
    },
    validationSchema: formSchema,
    onSubmit: () => {
      toast.success('Tambah tim berhasil');
      // console.log(values);
      formValidation.resetForm();
    },
  });

  const columns = ['Nama Tim', 'Nomor Telepon', 'Asal Sekolah', 'Email', 'Action'];

  const data = [
    ['Joe James', 'joe@gmail.com', 'Institut Teknologi Sepuluh Nopember', '+628886667761'],
    ['John Walsh', 'joe@gmail.com', 'Institut Teknologi Sepuluh Nopember', '+628886667761'],
    ['Bob Herm', 'joe@gmail.com', 'Institut Teknologi Sepuluh Nopember', '+628886667761'],
    ['James Houston', 'joe@gmail.com', 'Institut Teknologi Sepuluh Nopember', '+628886667761'],
  ];

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    elevation: 0,
    print: false,
    search: false,
  };

  const onAutoGenerateClick = () => {
    const teamName = formValidation.values.name;

    if (teamName.length === 0) {
      toast.error('Isi nama tim terlebih dahulu');
      return;
    }

    formValidation.setFieldValue('username1', generateUsername(teamName), false);
    formValidation.setFieldValue('username2', generateUsername(teamName), false);
    formValidation.setFieldValue('username3', generateUsername(teamName), false);

    formValidation.setFieldValue('password1', generatePassword(8), false);
    formValidation.setFieldValue('password2', generatePassword(8), false);
    formValidation.setFieldValue('password3', generatePassword(8), false);
  };

  return (
    <>
      <Seo templateTitle='Dashboard' />

      <div className='w-full'>
        <Grid container direction='column' gap={2}>
          <MainCard title='Tambah Peserta'>
            <form onSubmit={formValidation.handleSubmit}>
              <Grid container direction='column' gap={2}>
                <SubCard title='Data Tim'>
                  <Grid container direction='row' spacing={2} className='max-w-full md:max-w-[350px] lg:max-w-[650px]' marginX='auto'>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Nama Tim'
                        name='name'
                        variant='outlined'
                        fullWidth
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.name}
                        error={formValidation.touched.name && formValidation.errors.name ? true : false}
                        helperText={formValidation.touched.name && formValidation.errors.name ? formValidation.errors.name : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Nomor Telepon'
                        name='phone'
                        variant='outlined'
                        fullWidth
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.phone}
                        error={formValidation.touched.phone && formValidation.errors.phone ? true : false}
                        helperText={formValidation.touched.phone && formValidation.errors.phone ? formValidation.errors.phone : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Asal Sekolah'
                        name='school'
                        variant='outlined'
                        fullWidth
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.school}
                        error={formValidation.touched.school && formValidation.errors.school ? true : false}
                        helperText={formValidation.touched.school && formValidation.errors.school ? formValidation.errors.school : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Email'
                        name='email'
                        variant='outlined'
                        fullWidth
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.email}
                        error={formValidation.touched.email && formValidation.errors.email ? true : false}
                        helperText={formValidation.touched.email && formValidation.errors.email ? formValidation.errors.email : ''}
                      />
                    </Grid>
                  </Grid>
                </SubCard>
                <SubCard
                  title='Data Anggota'
                  secondary={
                    <Tooltip title='Generate random username and password'>
                      <Button onClick={onAutoGenerateClick} startIcon={<FontAwesomeIcon icon={faRandom} />}>
                        Auto Generate
                      </Button>
                    </Tooltip>
                  }
                >
                  <Grid container direction='column' gap={2} className='max-w-full md:max-w-[350px] lg:max-w-[650px]' marginX='auto'>
                    <DataAnggotaForm title='Anggota 1' validation={formValidation} username='username1' password='password1' />
                    <DataAnggotaForm title='Anggota 2' validation={formValidation} username='username2' password='password2' />
                    <DataAnggotaForm title='Anggota 3' validation={formValidation} username='username3' password='password3' />
                  </Grid>
                </SubCard>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  sx={{ width: 'fit-content', marginLeft: 'auto', marginRight: 0 }}
                  disableElevation
                >
                  Tambahkan
                </Button>
              </Grid>
            </form>
          </MainCard>
          <MainCard contentSX={{ padding: 0 }}>
            <MUIDataTable title={<Typography variant='h5'>List Tim</Typography>} data={data} columns={columns} options={options} />
          </MainCard>
        </Grid>
      </div>
    </>
  );
}

ManagePesertaPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <DashboardLayout title='Manage Peserta'>{page}</DashboardLayout>;
};
