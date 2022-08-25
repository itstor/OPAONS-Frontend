import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import parse from 'html-react-parser';
import { ReactElement } from 'react';
import * as yup from 'yup';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';
import FormJawabanPilgan from '@/components/soal/FormJawabanPilgan';
import SubCard from '@/components/SubCard';

import { Difficulty, TipeSoal } from '@/ts/interfaces/Soal.interface';

export default function TambahSoalPage() {
  const soalScheme = yup.object().shape({
    question: yup.string().required(),
    type: yup.string().required(),
    difficulty: yup.string().required(),
    answer: yup.string().required(),
    multipleChoice: yup.array().of(
      yup.string().when('type', {
        is: TipeSoal.PILGAN,
        then: yup.string().required(),
        otherwise: yup.string(),
      })
    ),
  });

  const formValidation = useFormik({
    initialValues: {
      question: '',
      type: TipeSoal.PILGAN,
      difficulty: Difficulty.MUDAH,
      answer: '',
      multipleChoice: [],
    },
    validationSchema: soalScheme,
    onSubmit: () => {
      return;
    },
    validateOnChange: false,
  });

  // const handlePilganChange = (id: string, value: string) => {
  //   formValidation.setFieldValue(`multipleChoice[${id}]`, value);
  // };

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <Grid container direction='column' gap={1}>
        <MainCard>
          <form onSubmit={formValidation.handleSubmit}>
            <Grid container direction='column' gap={2}>
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
                        {(Object.values(Difficulty) as Array<Difficulty>).map((target) => (
                          <MenuItem key={target} value={target}>
                            {target}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tipe Soal</InputLabel>
                      <Select
                        id='type'
                        name='type'
                        label='Tipe Soal'
                        value={formValidation.values.type}
                        onChange={formValidation.handleChange}
                      >
                        {(Object.values(TipeSoal) as Array<TipeSoal>).map((target) => (
                          <MenuItem key={target} value={target}>
                            {target}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </SubCard>
              <SubCard title='Soal'>
                <Editor
                  tinymceScriptSrc='/js/tinymce/tinymce.min.js'
                  initialValue='<p>Tulis soal di sini</p>'
                  // onBlur={(e) => {
                  //   formValidation.setFieldValue('question', e.target.getContent());
                  // }}
                  onEditorChange={(e) => {
                    formValidation.setFieldValue('question', e);
                  }}
                  init={{
                    height: 300,
                    menubar: true,
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
                    content_style: 'body { font-family:Poppins,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </SubCard>
              <SubCard title='Jawaban'>
                <FormJawabanPilgan />
              </SubCard>
              <Button type='submit' variant='contained' color='secondary' disableElevation>
                Tambah
              </Button>
            </Grid>
          </form>
        </MainCard>
        <MainCard title='Preview Soal'>{parse(formValidation.values.question)}</MainCard>
      </Grid>
    </>
  );
}

TambahSoalPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <DashboardLayout title='Tambah Soal'>{page}</DashboardLayout>;
};
