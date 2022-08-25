export interface AnswerInterface {
  id: string;
  answer: string;
  round: number;
}

export interface UserInterface {
  username: string;
  score: number;
  answers: AnswerInterface[];
  role: string;
  corrected: boolean;
  school: string;
  team: string;
}
