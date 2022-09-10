import { Grid, TextField, Typography } from '@mui/material';
import htmlParse from 'html-react-parser';
import { toNumber } from 'lodash';

import Pilgan from '@/components/Pilgan';
import SubCard from '@/components/SubCard';

import { PilganType, TipeSoal } from '@/ts/interfaces/Soal.interface';

export default function ExamSoalCard({
  type,
  question,
  title,
  multipleChoice,
  answer,
  onAnswerChange,
  fontSizeMultiplier = 1,
  showCard = true,
}: {
  type: keyof typeof TipeSoal;
  title?: string;
  question: string;
  multipleChoice?: string[];
  answer?: string | null;
  fontSizeMultiplier?: number;
  onAnswerChange?: (answer: string | undefined | null) => void;
  showCard?: boolean;
}) {
  const fontMultiplier = (size: string) => toNumber(size.split('rem')[0]) * fontSizeMultiplier + 'rem';

  const QuestionBody = () => (
    <Grid container direction='column' gap={1}>
      <Grid item>
        <div
          className='w-full select-none'
          style={{
            fontSize: fontMultiplier('1rem'),
            lineHeight: fontMultiplier('1.5rem'),
          }}
        >
          {htmlParse(question)}
        </div>
      </Grid>
      <Grid item>
        {type === 'PILGAN' && (
          <div className='w-full max-w-full md:max-w-xl'>
            <Pilgan
              direction='column'
              multipleChoice={multipleChoice ?? []}
              handleOnChange={onAnswerChange}
              answer={answer as PilganType}
              fontSizeMultiplier={fontSizeMultiplier}
              className='select-none'
            />
          </div>
        )}
        {type !== 'PILGAN' && (
          <Grid>
            <Typography variant='body2' fontWeight='500'>
              Jawaban:
            </Typography>
            <Grid container direction='row'>
              <TextField
                className='w-full max-w-full md:max-w-xl'
                variant='outlined'
                placeholder={type === 'ESAI_PANJANG' ? 'Esai Panjang' : 'Esai Singkat'}
                defaultValue={answer}
                onBlur={(e) => {
                  onAnswerChange?.(e.target.value);
                }}
                multiline={type === 'ESAI_PANJANG'}
                minRows={type === 'ESAI_PANJANG' ? 5 : 1}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  return (
    <>
      {showCard ? (
        <SubCard title={title} contentSX={{ paddingLeft: 5, paddingRight: 5 }}>
          <QuestionBody />
        </SubCard>
      ) : (
        <QuestionBody />
      )}
    </>
  );
}
