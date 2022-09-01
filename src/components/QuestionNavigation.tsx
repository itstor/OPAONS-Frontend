import { Grid } from '@mui/material';
import clsx from 'clsx';

import clsxm from '@/lib/clsxm';

import { LocalUserAnswerInterface } from '@/ts/interfaces/Soal.interface';

export default function QuestionNavigation({
  questionData,
  current,
  changeQuestion,
}: {
  questionData: LocalUserAnswerInterface[];
  current: number;
  changeQuestion: (number: number) => void;
}) {
  const ButtonNumber = ({ number, status }: { number: number; status: 'unvisited' | 'visited' | 'marked' | 'answered' | 'current' }) => {
    return (
      <div
        className={clsxm(
          'flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-md  text-base font-medium',
          status === 'answered' && clsx('bg-success-main/80 text-white transition-colors duration-200 ease-in-out hover:bg-success-main'),
          status === 'marked' && clsx('bg-error-main/90 text-white transition-colors duration-200 ease-in-out hover:bg-error-main'),
          status === 'current' && clsx('bg-info-main/80 text-white transition-colors duration-200 ease-in-out hover:bg-info-main'),
          status === 'visited' &&
            clsx('bg-secondary-main/90 text-white transition-colors duration-200 ease-in-out hover:bg-secondary-main'),
          status === 'unvisited' && clsx('bg-gray-200 text-black')
        )}
        onClick={() => changeQuestion(number)}
      >
        {number}
      </div>
    );
  };
  return (
    <Grid container direction='row' gap={1.5}>
      {questionData.map((question, index) => {
        let status: 'unvisited' | 'visited' | 'marked' | 'answered' | 'current' = 'unvisited';
        if (index === current) {
          status = 'current';
        } else if (question.marked) {
          status = 'marked';
        } else if (questionData[index].answer) {
          status = 'answered';
        } else if (questionData[index].visited) {
          status = 'visited';
        }
        return <ButtonNumber key={index} number={index + 1} status={status} />;
      })}
    </Grid>
  );
}
