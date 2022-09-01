import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AllInbox } from '@mui/icons-material';

import InfoCard from '@/components/InfoCard';

export default function KoreksiCard({
  isLoading,
  type,
  value,
}: {
  isLoading: boolean;
  type: 'corrected' | 'uncorrected' | 'total';
  value: number;
}) {
  return (
    <InfoCard
      isLoading={isLoading}
      title={type === 'corrected' ? 'Sudah Dikoreksi' : type === 'uncorrected' ? 'Belum' : 'Total'}
      value={value}
      icon={type === 'total' ? <AllInbox /> : <FontAwesomeIcon icon={type === 'corrected' ? faSquareCheck : faSquare} />}
    />
  );
}
