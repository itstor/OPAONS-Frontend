import { Grid } from '@mui/material';

import { useCountdown } from '@/hooks/useCountdown';

export default function Countdown({
  targetDate,
  callback,
  showDay = false,
  triggerWhen = 0,
  showLabel = true,
}: {
  targetDate: number | boolean;
  callback?: (time: number) => void;
  showDay?: boolean;
  triggerWhen?: number;
  showLabel?: boolean;
}) {
  const [days, hours, minutes, seconds] = useCountdown({ targetDate: targetDate as number, callback: callback, triggerWhen: triggerWhen });

  const CountdownWrapper = ({ value, type }: { value: string; type: 'hari' | 'menit' | 'jam' | 'detik' }) => {
    return (
      <div className='flex aspect-square h-full w-full flex-col items-center justify-center gap-0 rounded-sm bg-secondary-500 px-2 text-center text-lg font-bold text-primary-900 md:gap-1 md:rounded-xl md:px-4 md:text-4xl'>
        {value}
        {showLabel && <div className='text-xs font-normal leading-none md:text-base'>{type}</div>}
      </div>
    );
  };

  return (
    <Grid container direction='row' spacing={2}>
      {showDay && (
        <Grid item xs>
          <CountdownWrapper value={days < 0 ? '00' : days.toString().padStart(2, '0')} type='hari' />
        </Grid>
      )}
      <Grid item xs>
        <CountdownWrapper value={hours < 0 ? '00' : hours.toString().padStart(2, '0')} type='jam' />
      </Grid>
      <Grid item xs>
        <CountdownWrapper value={minutes < 0 ? '00' : minutes.toString().padStart(2, '0')} type='menit' />
      </Grid>
      <Grid item xs>
        <CountdownWrapper value={seconds < 0 ? '00' : seconds.toString().padStart(2, '0')} type='detik' />
      </Grid>
    </Grid>
  );
}
