import { Chip, useTheme } from '@mui/material';

export default function FlatChip({
  label,
  color,
  ...props
}: {
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}) {
  const theme = useTheme();
  return (
    <Chip
      label={label}
      variant='filled'
      size='small'
      {...props}
      sx={{ borderRadius: 1, backgroundColor: theme.palette[color].main + 20, color: theme.palette[color].dark }}
    />
  );
}
