import { Typography, useTheme } from '@mui/material';

import SubCard from '@/components/SubCard';

export default function StatsCard({ title, value }: { title: string; value: number | string }) {
  const theme = useTheme();

  return (
    <SubCard title={title}>
      <Typography variant='h2' fontSize={36} fontWeight={600} textAlign='center' color={theme.palette.primary.dark}>
        {value}
      </Typography>
    </SubCard>
  );
}
