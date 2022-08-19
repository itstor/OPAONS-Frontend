export enum Difficulty {
  MUDAH = 'Mudah',
  SEDANG = 'Sedang',
  SULIT = 'Sulit',
  HOTS = 'HOTS',
}

export type DifficultyProps = keyof typeof Difficulty;

export enum TipeSoal {
  PILGAN = 'PILGAN',
  ESAI_SINGKAT = 'ESAI_SINGKAT',
  ESAI_PANJANG = 'ESAI_PANJANG',
}
