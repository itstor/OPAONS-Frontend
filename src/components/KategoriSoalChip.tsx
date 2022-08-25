import FlatChip from '@/components/FlatChip';

import { TipeSoal } from '@/ts/interfaces/Soal.interface';

export default function TipeSoalChip({ type }: { type: keyof typeof TipeSoal }) {
  const tipeColor = {
    PILGAN: 'info' as const,
    ESAI_SINGKAT: 'success' as const,
    ESAI_PANJANG: 'warning' as const,
  };

  return <FlatChip label={TipeSoal[type] ?? 'Undefined'} color={tipeColor[type]} />;
}
