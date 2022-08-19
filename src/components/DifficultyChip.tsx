import FlatChip from '@/components/FlatChip';

import { Difficulty, DifficultyProps } from '@/ts/interfaces/Soal.interface';

export default function DifficultyChip({ difficulty }: { difficulty: DifficultyProps }) {
  const difficultyColor = {
    MUDAH: 'info' as const,
    SEDANG: 'success' as const,
    SULIT: 'warning' as const,
    HOTS: 'error' as const,
  };

  return <FlatChip label={Difficulty[difficulty]} color={difficultyColor[difficulty]} />;
}
