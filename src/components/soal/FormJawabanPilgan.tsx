import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { memo, useState } from 'react';

// eslint-disable-next-line unused-imports/no-unused-vars
export default memo(function FormJawabanPilgan({ handlePilganChange }: { handlePilganChange?: (id: number, value: string) => void }) {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const TextEditor = ({ id }: { id: number }) => {
    return (
      <Editor
        tinymceScriptSrc='/js/tinymce/tinymce.min.js'
        // onEditorChange={(value) => handlePilganChange(id, value)}
        init={{
          height: 200,
          menubar: false,
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    );
  };

  const OpsiAccordion = ({ id, title }: { id: number; title: string }) => {
    return (
      <Accordion expanded={expanded === id} onChange={handleChange(id)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant='h5'>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextEditor id={id} />
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Grid container direction='column'>
      <OpsiAccordion title='Opsi A' id={1} />
      <OpsiAccordion title='Opsi B' id={2} />
      <OpsiAccordion title='Opsi C' id={3} />
      <OpsiAccordion title='Opsi D' id={4} />
      <OpsiAccordion title='Opsi E' id={5} />
    </Grid>
  );
});
