export interface AnswerInterface {
  id: string;
  answer: string;
  round: number;
  verdict: 'CORRECT' | 'INCORRECT' | undefined;
}

export interface UserInterface {
  username: string;
  answers: AnswerInterface[];
  role: string;
  corrected: boolean;
  school: string;
  team: string;
  score_1: number;
  score_2: number;
}
