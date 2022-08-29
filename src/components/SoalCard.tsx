import { Grid, TextField, Typography } from '@mui/material';
import htmlParse from 'html-react-parser';

import Pilgan from '@/components/Pilgan';
import SubCard from '@/components/SubCard';

import { PilganType, TipeSoal } from '@/ts/interfaces/Soal.interface';

export default function SoalCard({
  type,
  question,
  title,
  multipleChoice,
  selectedAnswer,
  correctAnswer,
  // difficulty,
  showCorrectAnswer = false,
  onAnswerChange,
}: {
  type: keyof typeof TipeSoal;
  title?: string;
  question: string;
  multipleChoice?: string[];
  selectedAnswer?: PilganType;
  correctAnswer?: PilganType;
  // difficulty?: Difficulty;
  showCorrectAnswer?: boolean;
  onAnswerChange?: (answer: string | undefined | null) => void;
}) {
  // const showDifficulty = difficulty !== undefined;

  return (
    <SubCard title={title} contentSX={{ paddingLeft: 5, paddingRight: 5 }}>
      <Grid container direction='column' gap={1}>
        <Grid item>
          <div className='w-full text-sm md:w-[70%]'>{htmlParse(question)}</div>
        </Grid>
        <Grid item>
          {type === 'PILGAN' && (
            <div className='w-full max-w-full md:max-w-xl'>
              <Pilgan
                direction='column'
                multipleChoice={multipleChoice ?? []}
                handleOnChange={onAnswerChange}
                disabled={correctAnswer !== undefined}
                answer={selectedAnswer}
              />
            </div>
          )}
          {type !== 'PILGAN' && (
            <Grid>
              <Typography variant='body2' fontWeight='500'>
                Jawaban:
              </Typography>
              <TextField
                className='w-full max-w-full md:max-w-xl'
                variant='outlined'
                placeholder={type === 'ESAI_PANJANG' ? 'Esai Panjang' : 'Esai Singkat'}
                disabled={correctAnswer !== undefined}
                onChange={(e) => {
                  if (onAnswerChange) {
                    onAnswerChange(e.target.value);
                  }
                }}
                multiline={type === 'ESAI_PANJANG'}
                minRows={type === 'ESAI_PANJANG' ? 5 : 1}
              />
            </Grid>
          )}
          {showCorrectAnswer && correctAnswer && type === 'ESAI_SINGKAT' && (
            <Typography variant='body2' fontWeight='500' color='success.main'>
              Jawaban Benar: {correctAnswer}
            </Typography>
          )}
        </Grid>
      </Grid>
    </SubCard>
  );
}
