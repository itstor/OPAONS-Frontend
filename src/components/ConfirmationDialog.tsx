import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

import { useCountdown } from '@/hooks/useCountdown';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ConfirmationDialog({
  open,
  handleClose,
  onSubmit,
  time,
}: {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
  time: number;
}) {
  const [, hours, minutes, seconds] = useCountdown({ targetDate: time });

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
      <DialogTitle fontSize={16} fontWeight='bold'>
        Apakah kamu yakin?
      </DialogTitle>
      <DialogContent>
        <DialogContentText color='black'>
          Kamu masih memiliki waktu{' '}
          <div className='inline font-semibold'>
            {hours > 0 && `${hours} jam`} {(minutes > 0 || hours > 0) && `${minutes} menit`}{' '}
            {(seconds > 0 || minutes > 0 || hours > 0) && `${seconds} detik`}{' '}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button onClick={onSubmit}>Selesai</Button>
      </DialogActions>
    </Dialog>
  );
}
