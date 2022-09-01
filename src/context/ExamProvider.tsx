import { AxiosError } from 'axios';
import moment from 'moment';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocalStorage } from 'usehooks-ts';

import SoalService from '@/services/Soal.service';
import TimeService from '@/services/Time.service';
import UserService from '@/services/User.service';
import { ApiError } from '@/ts/interfaces/ApiError.interface';
import { ExamInterface, LocalUserAnswerInterface } from '@/ts/interfaces/Soal.interface';
import { TimeInterface } from '@/ts/interfaces/Time.interface';

interface ExamContextInterface {
  userAnswers: LocalUserAnswerInterface[];
  loading: boolean;
  timeLoading: boolean;
  questionLoading: boolean;
  populateUserAnswers: () => Promise<void>;
  setUserAnswers: (userAnswers: LocalUserAnswerInterface[]) => void;
  time: TimeInterface | null | boolean;
  round: number;
}

const ExamContext = createContext<ExamContextInterface>({} as ExamContextInterface);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  const [userAnswers, setUserAnswers] = useLocalStorage<LocalUserAnswerInterface[]>('userAnswers', []);
  const [timeLoading, setTimeLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [time, setTime] = useState<TimeInterface | null | false>(null);
  const [babak, setBabak] = useState(0);

  useEffect(() => {
    if (userAnswers.length !== 0) {
      setQuestionLoading(false);
    }
  }, [userAnswers.length]);

  useEffect(() => {
    if (time !== null) {
      setTimeLoading(false);
    }
  }, [time]);

  useEffect(() => {
    if (time === null) {
      getTime();
    }
  }, [time]);

  const populateUserAnswers = async () => {
    const userAnswers = await UserService.getUserAnswers();
    await SoalService.getSoalPeserta()
      .then((res) => {
        const soal: ExamInterface[] = [];
        res.data.forEach((item) => {
          const obj: LocalUserAnswerInterface = {
            answer: null,
            visited: false,
            marked: false,
            question: item,
          };
          if (userAnswers.data.answers) {
            obj.answer = userAnswers.data.answers.find((answer) => answer.id === item._id)?.answer ?? null;
          }
          soal.push(obj);
        });
        setUserAnswers(soal);
      })
      .catch((error: AxiosError<ApiError>) => {
        throw error;
      });
  };

  const getTime = () => {
    TimeService.getAllTimes({ sortBy: 'start:asc' })
      .then((res) => {
        if (res.results.length === 0) {
          toast.error('Gagal mendapatkan waktu pengerjaan');
          return;
        }

        const now = moment().valueOf();

        if (now < res.results[0].start || now < res.results[0].end) {
          setTime(res.results[0]);
          setBabak(res.results[0].round);
        } else if (now < res.results[1].start || now < res.results[1].end) {
          setTime(res.results[1]);
          setBabak(res.results[1].round);
        } else {
          setTime(false);
        }
      })
      .catch(() => {
        toast.error('Gagal mendapatkan waktu pengerjaan');
      });
  };

  return (
    <ExamContext.Provider
      value={{
        userAnswers,
        loading: questionLoading || timeLoading,
        populateUserAnswers,
        setUserAnswers,
        time,
        round: babak,
        questionLoading,
        timeLoading,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);
