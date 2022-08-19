import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InfoCard from '@/components/InfoCard';

export default function RankingCard({ isLoading, type, value }: { isLoading: boolean; type: 'min' | 'max' | 'mean'; value: number }) {
  return (
    <InfoCard
      isLoading={isLoading}
      title={type === 'min' ? 'Nilai Minimum' : type === 'max' ? 'Nilai Maximum' : 'Nilai Rata-rata'}
      value={value}
      icon={<FontAwesomeIcon icon={type === 'min' ? faStarRegular : type === 'max' ? faStarSolid : faStarHalfStroke} />}
    />
  );
}
