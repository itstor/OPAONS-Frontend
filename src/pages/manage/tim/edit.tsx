/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import DataAnggotaForm from '@/components/manage/peserta/DataAnggotaForm';
import Seo from '@/components/Seo';
import SubCard from '@/components/SubCard';

import TeamService from '@/services/Team.service';
import UserService from '@/services/User.service';
import { ApiError } from '@/ts/interfaces/ApiError.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TeamFormikInitialValuesInterface, TeamInterface } from '@/ts/interfaces/Team.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';

export default function EditPesertaPage() {
  const router = useRouter();
  const { id } = router.query;

  const dataTim = useSWR<{ team: (TeamInterface & DefaultResponseInterface)[] }, ApiError>({ id: id }, TeamService.getTeamById);
  const dataAnggota = useSWR<(UserInterface & DefaultResponseInterface)[], ApiError>(
    dataTim.data ? { ids: dataTim.data?.team[0].membersId } : null,
    TeamService.getAllTeamMembers
  );

  useEffect(() => {
    if (dataTim.data) {
      formValidation.setFieldValue('name', dataTim.data.team[0].name);
      formValidation.setFieldValue('phone', dataTim.data.team[0].phone);
      formValidation.setFieldValue('email', dataTim.data.team[0].email);
      formValidation.setFieldValue('school', dataTim.data.team[0].school);
      formValidation.setFieldValue('kategori', dataTim.data.team[0].schoolType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTim.data]);

  useEffect(() => {
    if (dataAnggota.data) {
      formValidation.setFieldValue('username1', dataAnggota.data[0].username);
      formValidation.setFieldValue('username2', dataAnggota.data[1].username);
      formValidation.setFieldValue('username3', dataAnggota.data[2].username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAnggota.data]);

  const formSchema = yup.object().shape({
    name: yup.string().required('Nama tim tidak boleh kosong'),
    phone: yup
      .string()
      .matches(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g, 'Nomor telepon tidak valid')
      .required('Nomor telepon tidak boleh kosong'),
    school: yup.string().required('Asal sekolah tidak boleh kosong'),
    email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
    kategori: yup.string().required('Kategori sekolah tidak boleh kosong'),
    username1: yup.string().required('Username tidak boleh kosong'),
    password1: yup.string(),
    username2: yup.string().required('Username tidak boleh kosong'),
    password2: yup.string(),
    username3: yup.string().required('Username tidak boleh kosong'),
    password3: yup.string(),
  });

  const formValidation = useFormik<TeamFormikInitialValuesInterface>({
    initialValues: {
      name: '',
      phone: '',
      school: '',
      email: '',
      kategori: 'SMA',
      username1: '',
      password1: '',
      username2: '',
      password2: '',
      username3: '',
      password3: '',
    },
    validationSchema: formSchema,
    onSubmit: () => {
      const teamDataChanged: Partial<TeamInterface> = {};
      const teamMembersChanged: { id: string; data: Partial<UserInterface & { password: string }> }[] = [
        { id: dataAnggota.data![0].id, data: {} },
        { id: dataAnggota.data![1].id, data: {} },
        { id: dataAnggota.data![2].id, data: {} },
      ];

      if (formValidation.values.name !== dataTim.data?.team[0].name) {
        teamDataChanged.name = formValidation.values.name;
      }
      if (formValidation.values.phone !== dataTim.data?.team[0].phone) {
        teamDataChanged.phone = formValidation.values.phone;
      }
      if (formValidation.values.email !== dataTim.data?.team[0].email) {
        teamDataChanged.email = formValidation.values.email;
      }
      if (formValidation.values.school !== dataTim.data?.team[0].school) {
        teamDataChanged.school = formValidation.values.school;
      }
      if (formValidation.values.kategori !== dataTim.data?.team[0].schoolType) {
        teamDataChanged.schoolType = formValidation.values.kategori;
      }

      if (formValidation.values.username1 !== dataAnggota.data![0].username) {
        teamMembersChanged[0].data.username = formValidation.values.username1;
      }
      if (formValidation.values.password1.length > 0) {
        teamMembersChanged[0].data.password = formValidation.values.password1;
      }
      if (formValidation.values.username2 !== dataAnggota.data![1].username) {
        teamMembersChanged[1].data.username = formValidation.values.username2;
      }
      if (formValidation.values.password2.length > 0) {
        teamMembersChanged[1].data.password = formValidation.values.password2;
      }
      if (formValidation.values.username3 !== dataAnggota.data![2].username) {
        teamMembersChanged[2].data.username = formValidation.values.username3;
      }

      if (Object.keys(teamDataChanged).length > 0) {
        TeamService.updateTeamById(dataTim.data!.team[0]._id, teamDataChanged)
          .then(() => {
            toast.success('Data tim berhasil diperbarui');
          })
          .catch((error: AxiosError<ApiError>) => {
            if (error.response?.data?.message) {
              toast.error(error.response.data.message);
            }
          });
      }

      for (const teamMember of teamMembersChanged) {
        if (Object.keys(teamMember.data).length > 0) {
          UserService.updateUserById(teamMember.id, teamMember.data)
            .then(() => {
              toast.success('Data anggota berhasil diperbarui');
            })
            .catch((error: AxiosError<ApiError>) => {
              if (error.response?.data?.message) {
                toast.error(error.response.data.message);
              }
            });
        }
      }
    },
  });

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <Grid container direction='column' gap={2}>
          <MainCard title='Edit Tim' secondary={!dataTim.data && !dataAnggota.data && <CircularProgress size={24} />}>
            <form onSubmit={formValidation.handleSubmit}>
              <Grid container direction='column' gap={2}>
                <SubCard title='Data Tim'>
                  <Grid container direction='row' spacing={2} className='max-w-full md:max-w-[350px] lg:max-w-[650px]' marginX='auto'>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel>Kategori</InputLabel>
                        <Select
                          id='kategori'
                          name='kategori'
                          label='Kategori'
                          value={formValidation.values.kategori}
                          onChange={formValidation.handleChange}
                          disabled={!dataTim.data}
                        >
                          {['SMA', 'SMK'].map((kategori: string) => (
                            <MenuItem key={kategori} value={kategori}>
                              {kategori}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Nama Tim'
                        name='name'
                        variant='outlined'
                        fullWidth
                        disabled={!dataTim.data}
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
                        disabled={!dataTim.data}
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
                        disabled={!dataTim.data}
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
                        disabled={!dataTim.data}
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.email}
                        error={formValidation.touched.email && formValidation.errors.email ? true : false}
                        helperText={formValidation.touched.email && formValidation.errors.email ? formValidation.errors.email : ''}
                      />
                    </Grid>
                  </Grid>
                </SubCard>
                <SubCard title='Data Anggota'>
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
                  Update
                </Button>
              </Grid>
            </form>
          </MainCard>
        </Grid>
      </div>
    </>
  );
}

EditPesertaPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <DashboardLayout title='Edit Peserta' childOf='manageTim' backButton>
      {page}
    </DashboardLayout>
  );
};
