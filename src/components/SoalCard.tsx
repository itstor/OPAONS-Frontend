import { Grid, styled, TextField, Typography } from '@mui/material';
import htmlParse from 'html-react-parser';
import { toNumber } from 'lodash';
import { useEffect, useState } from 'react';

import Pilgan from '@/components/Pilgan';
import SubCard from '@/components/SubCard';

import { PilganType, TipeSoal } from '@/ts/interfaces/Soal.interface';

const QuestionWrapper = styled('div')({
  img: {
    maxWidth: '100%',
  },
});

export default function SoalCard({
  type,
  question,
  title,
  multipleChoice,
  answer,
  correctAnswer,
  display = false,
  showCorrectAnswer = false,
  onAnswerChange,
  fontSizeMultiplier = 1,
  showCard = true,
}: {
  type: keyof typeof TipeSoal;
  title?: string;
  question: string;
  multipleChoice?: string[];
  answer?: string | null;
  correctAnswer?: string;
  display?: boolean;
  showCorrectAnswer?: boolean;
  fontSizeMultiplier?: number;
  onAnswerChange?: (answer: string | undefined | null) => void;
  showCard?: boolean;
}) {
  // const showDifficulty = difficulty !== undefined;
  const [answerField, setAnswerField] = useState<string | null | undefined>(answer);

  useEffect(() => {
    setAnswerField(answer);
  }, [answer]);

  const fontMultiplier = (size: string) => toNumber(size.split('rem')[0]) * fontSizeMultiplier + 'rem';

  const QuestionBody = () => (
    <Grid container direction='column' gap={1}>
      <Grid item>
        <QuestionWrapper
          className='w-full'
          style={{
            fontSize: fontMultiplier(display ? '0.875rem' : '1rem'),
            lineHeight: fontMultiplier(display ? '1.25rem' : '1.5rem'),
          }}
        >
          {htmlParse(question)}
        </QuestionWrapper>
      </Grid>
      <Grid item>
        {type === 'PILGAN' && (
          <div className='w-full max-w-full md:max-w-xl'>
            <Pilgan
              direction='column'
              multipleChoice={multipleChoice ?? []}
              handleOnChange={onAnswerChange}
              disabled={correctAnswer !== undefined}
              answer={answer as PilganType}
              fontSizeMultiplier={fontSizeMultiplier}
              display={display}
              correctAnswer={correctAnswer}
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
                disabled={correctAnswer !== undefined}
                value={answerField}
                defaultValue={answerField}
                // onChange={(e) => {
                //   setAnswerField(e.target.value);
                // }}
                // onBlur={() => {
                //   onAnswerChange?.(answerField);
                // }}
                multiline={true}
                minRows={type === 'ESAI_PANJANG' ? 5 : 1}
              />
            </Grid>
          </Grid>
        )}
        {showCorrectAnswer && correctAnswer && type === 'ESAI_SINGKAT' && (
          <Typography variant='body2' fontWeight='500' color='success.main'>
            Jawaban Benar: {correctAnswer}
          </Typography>
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
