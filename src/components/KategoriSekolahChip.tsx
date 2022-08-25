import FlatChip from '@/components/FlatChip';

import { KategoriSekolah } from '@/ts/interfaces/Team.interface';

export default function KategoriSekolahChip({ kategori }: { kategori: KategoriSekolah }) {
  const kategoriColor = {
    SMA: 'info' as const,
    SMK: 'success' as const,
    undefined: 'error' as const,
  };

  return <FlatChip label={kategori ?? 'Undefined'} color={kategoriColor[kategori]} />;
}
