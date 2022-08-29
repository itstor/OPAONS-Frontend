import { Tab, Tabs } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { PilganType } from '@/ts/interfaces/Soal.interface';

export interface FormJawabanPilganRef {
  getValues: () => string[];
  resetForm: () => void;
  setValues: (values: string[]) => void;
}

export const FormJawabanPilgan = forwardRef<FormJawabanPilganRef, { handleChange: (value: string[]) => void }>((props, ref) => {
  useImperativeHandle(ref, () => ({
    getValues: () => {
      return Object.values(formik.values);
    },
    resetForm: () => {
      formik.resetForm();
    },
    setValues: (values: string[]) => {
      Object.keys(formik.values).forEach((key, index) => {
        formik.setFieldValue(key, values[index], false);
      });
    },
  }));
  const [value, setValue] = useState(0);

  const formik = useFormik({
    initialValues: {
      A: '',
      B: '',
      C: '',
      D: '',
      E: '',
    },
    onSubmit: () => {
      return;
    },
  });

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, value) => {
          setValue(value);
        }}
        variant='scrollable'
      >
        <Tab label='Pilihan A' />
        <Tab label='Pilihan B' />
        <Tab label='Pilihan C' />
        <Tab label='Pilihan D' />
        <Tab label='Pilihan E' />
      </Tabs>
      <Editor
        tinymceScriptSrc='/js/tinymce/tinymce.min.js'
        onEditorChange={(e) => {
          formik.setFieldValue(`${String.fromCharCode(65 + value)}`, e).then(() => {
            props.handleChange(Object.values(formik.values));
          });
        }}
        onBlur={() => {
          props.handleChange(Object.values(formik.values));
        }}
        value={formik.values[`${String.fromCharCode(65 + value)}` as PilganType]}
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
    </>
  );
});
