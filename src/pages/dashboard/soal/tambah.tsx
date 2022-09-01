import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { GetServerSideProps } from 'next';
import { ReactElement, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import getSession from '@/components/getSession';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Pilgan from '@/components/Pilgan';
import Seo from '@/components/Seo';
import { FormJawabanPilgan, FormJawabanPilganRef } from '@/components/soal/FormJawabanPilgan';
import SoalCard from '@/components/SoalCard';
import SubCard from '@/components/SubCard';

import NotFoundPage from '@/pages/404';
import SoalService from '@/services/Soal.service';
import { ApiError } from '@/ts/interfaces/ApiError.interface';
import { Difficulty, PilganType, TipeSoal } from '@/ts/interfaces/Soal.interface';

export default function TambahSoalPage({ babak, kategori }: { babak: number; kategori: string }) {
  const formPilganRef = useRef<FormJawabanPilganRef>(null);
  const editorRef = useRef<Editor>(null);

  const soalScheme = yup.object().shape({
    question: yup.string().required('Pertanyaan tidak boleh kosong'),
    type: yup.string().required(),
    difficulty: yup.string().required(),
    answer: yup.string().when('type', {
      is: 'ESAI_PANJANG',
      then: yup.string(),
      otherwise: yup.string().required('Kunci jawaban harus diisi'),
    }),
    multipleChoice: yup.array().of(
      yup.string().when('type', {
        is: 'PILGAN',
        then: yup.string().required('Pilihan jawaban harus diisi'),
        otherwise: yup.string(),
      })
    ),
  });

  const formValidation = useFormik({
    initialValues: {
      question: '',
      type: 'PILGAN' as keyof typeof TipeSoal,
      difficulty: 'MUDAH' as keyof typeof Difficulty,
      answer: '',
      multipleChoice: [],
    },
    validationSchema: soalScheme,
    onSubmit: () => {
      const soal = formValidation.values;

      if (formValidation.values.type !== 'PILGAN') {
        soal.multipleChoice = [];
      }

      if (formValidation.values.type === 'ESAI_PANJANG') {
        soal.answer = 'null';
      }

      SoalService.createSoal({ ...soal, round: babak, school: kategori.toUpperCase() })
        .then(() => {
          toast.success('Soal berhasil ditambahkan');
          formValidation.setFieldValue('question', '');
          formValidation.setFieldValue('answer', '');
          formValidation.setFieldValue('multipleChoice', []);
          if (editorRef.current?.editor) {
            editorRef.current?.editor.setContent('');
          }
          formPilganRef.current?.resetForm();
        })
        .catch((err) => {
          if (axios.isAxiosError(err) && err.response) {
            toast.error((err as AxiosError<ApiError>).response?.data.message || 'Terjadi kesalahan');
          }

          toast.error('Terjadi kesalahan saat menambahkan soal');
        });
    },
  });

  const handleTipeSoalChange = (event: SelectChangeEvent<keyof typeof TipeSoal>) => {
    formValidation.setFieldValue('answer', '', false);
    formValidation.setFieldValue('type', event.target.value, false);
  };

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <Grid container direction='column' gap={1}>
        <MainCard sx={{ width: '100%' }}>
          <form onSubmit={formValidation.handleSubmit} style={{ width: '100%' }}>
            <Grid container direction='column' gap={2} sx={{ width: '100%' }}>
              <SubCard title='Opsi Soal'>
                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tingkat Kesulitan</InputLabel>
                      <Select
                        id='difficulty'
                        name='difficulty'
                        label='Tingkat Kesulitan'
                        value={formValidation.values.difficulty}
                        onChange={formValidation.handleChange}
                      >
                        {(Object.keys(Difficulty) as Array<keyof typeof Difficulty>).map((target) => (
                          <MenuItem key={target} value={target}>
                            {Difficulty[target]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tipe Soal</InputLabel>
                      <Select id='type' name='type' label='Tipe Soal' value={formValidation.values.type} onChange={handleTipeSoalChange}>
                        {(Object.keys(TipeSoal) as Array<keyof typeof TipeSoal>).map((target) => (
                          <MenuItem key={target} value={target}>
                            {TipeSoal[target]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </SubCard>
              <Grid item sx={{ width: '100%', maxWidth: '100%' }}>
                <SubCard title='Pertanyaan'>
                  <Editor
                    ref={editorRef}
                    tinymceScriptSrc='/js/tinymce/tinymce.min.js'
                    onEditorChange={(e) => {
                      formValidation.setFieldValue('question', e);
                    }}
                    init={{
                      height: 300,
                      width: '100%',
                      menubar: true,
                      mobile: {
                        width: '100%',
                      },
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'charmap',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'table',
                        'preview',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | table',
                      content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:12pt; line-height:1.5; }',
                    }}
                  />
                  <FormHelperText error={formValidation.errors.question ? true : false}>{formValidation.errors.question}</FormHelperText>
                </SubCard>
              </Grid>
              <Grid item sx={{ maxWidth: '100%', width: '100%' }} display={formValidation.values.type === 'PILGAN' ? 'block' : 'none'}>
                <SubCard title='Pilihan Jawaban'>
                  <Box width='100%'>
                    <FormJawabanPilgan
                      ref={formPilganRef}
                      handleChange={(value) => formValidation.setFieldValue('multipleChoice', value)}
                    />
                  </Box>
                </SubCard>
              </Grid>
              {formValidation.values.type !== 'ESAI_PANJANG' && (
                <Grid item sx={{ maxWidth: '100%', width: '100%' }}>
                  <SubCard title='Kunci Jawaban'>
                    {formValidation.values.type === 'PILGAN' && (
                      <>
                        <Pilgan
                          direction='row'
                          multipleChoice={5}
                          answer={formValidation.values.answer as PilganType}
                          handleOnChange={(value) => {
                            formValidation.setFieldValue('answer', value);
                          }}
                        />
                        <FormHelperText error={formValidation.errors.answer ? true : false}>{formValidation.errors.answer}</FormHelperText>
                      </>
                    )}
                    {formValidation.values.type === 'ESAI_SINGKAT' && (
                      <TextField
                        fullWidth
                        id='answer'
                        name='answer'
                        label='Jawaban Esai Singkat'
                        onChange={formValidation.handleChange}
                        onBlur={formValidation.handleBlur}
                        value={formValidation.values.answer}
                        error={formValidation.touched.answer && formValidation.errors.answer ? true : false}
                        helperText={formValidation.touched.answer && formValidation.errors.answer ? formValidation.errors.answer : ''}
                      />
                    )}
                  </SubCard>
                </Grid>
              )}
              <Button type='submit' variant='contained' color='secondary' disableElevation>
                Tambah
              </Button>
            </Grid>
          </form>
        </MainCard>
        <MainCard title='Preview Soal'>
          <SoalCard
            question={formValidation.values.question}
            type={formValidation.values.type}
            multipleChoice={formValidation.values.multipleChoice}
          />
        </MainCard>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { babak, kategori } = context.query;
  const { isAuthenticated, role } = getSession(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  if (role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const queryValidation = yup.object().shape({
    babak: yup.number().required().max(2).min(1),
    kategori: yup.string().required().oneOf(['sma', 'smk']),
  });

  const isValid = await queryValidation.isValid({ babak, kategori });

  return { props: { babak, kategori, isValid } };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
TambahSoalPage.getLayout = function getLayout(page: ReactElement, pageProps: any): JSX.Element {
  if (!pageProps.isValid) {
    return <NotFoundPage />;
  }

  return (
    <DashboardLayout title='Tambah Soal' childOf={`soal${pageProps.kategori}${pageProps.babak}`} backButton>
      {page}
    </DashboardLayout>
  );
};
