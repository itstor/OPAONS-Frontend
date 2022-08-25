export enum Difficulty {
  MUDAH = 'Mudah',
  SEDANG = 'Sedang',
  SULIT = 'Sulit',
  HOTS = 'HOTS',
}

export type DifficultyProps = keyof typeof Difficulty;

export enum TipeSoal {
  PILGAN = 'Pilgan',
  ESAI_SINGKAT = 'Esai Singkat',
  ESAI_PANJANG = 'Esai Panjang',
}

export interface TambahSoalForm {
  question: string;
  type: TipeSoal;
  difficulty: Difficulty;
  answer: string;
  multipleChoice: never[];
}

export interface SoalInterface {
  question: string;
  multipleChoice: string[];
  difficulty: string;
  school: string;
  answer: string;
  round: number;
  type: string;
}
