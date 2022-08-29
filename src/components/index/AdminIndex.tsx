/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';
import SubCard from '@/components/SubCard';

import TimeService from '@/services/Time.service';
import { ApiError } from '@/ts/interfaces/ApiError.interface';
import { PagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TimeInterface } from '@/ts/interfaces/Time.interface';

export default function AdminIndex() {
  const roundOneData = useSWR<PagingInterface<TimeInterface & DefaultResponseInterface>, ApiError>({ round: 1 }, TimeService.getAllTimes);
  const roundTwoData = useSWR<PagingInterface<TimeInterface & DefaultResponseInterface>, ApiError>({ round: 2 }, TimeService.getAllTimes);

  const [roundOneStart, setRoundOneStart] = useState<Date | null>(null);
  const [roundOneEnd, setRoundOneEnd] = useState<Date | null>(null);
  const [roundTwoStart, setRoundTwoStart] = useState<Date | null>(null);
  const [roundTwoEnd, setRoundTwoEnd] = useState<Date | null>(null);

  useEffect(() => {
    if (roundOneData.data?.results[0]) {
      setRoundOneStart(moment(roundOneData.data.results[0].start).toDate());
      setRoundOneEnd(moment(roundOneData.data.results[0].end).toDate());
    }
  }, [roundOneData.data]);

  useEffect(() => {
    if (roundTwoData.data?.results[0]) {
      setRoundTwoStart(moment(roundTwoData.data.results[0].start).toDate());
      setRoundTwoEnd(moment(roundTwoData.data.results[0].end).toDate());
    }
  }, [roundTwoData.data]);

  const handleTimeSubmit = (round: 1 | 2) => {
    const start = moment(round == 1 ? roundOneStart : roundTwoStart).valueOf();
    const end = moment(round == 1 ? roundOneEnd : roundTwoEnd).valueOf();

    if (start > end) {
      toast.error('Start time must be before end time');
      return;
    }

    if ((round === 1 ? roundOneData : roundTwoData).data!.results.length > 0) {
      if (
        (round === 1 ? roundOneData : roundTwoData).data!.results[0].start === start &&
        (round === 1 ? roundOneData : roundTwoData).data!.results[0].end === end
      ) {
        toast.error('Nothing to update');
        return;
      }

      TimeService.updateTimeById((round == 1 ? roundOneData : roundTwoData).data!.results[0].id, { start, end })
        .then(() => {
          toast.success('Time updated');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    } else {
      TimeService.createTime({ start, end, round })
        .then(() => {
          toast.success('Time created');
          (round == 1 ? roundOneData : roundTwoData).mutate();
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    }
  };

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <MainCard title='Kontrol Pelaksanaan' secondary={!roundOneData && !roundTwoData && <CircularProgress />}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} md={6}>
                <SubCard title='Babak 1'>
                  <Grid container direction='column' justifyContent='center' alignContent='center' gap={2}>
                    <DateTimePicker
                      ampm={false}
                      label='Waktu Mulai'
                      value={roundOneStart}
                      disabled={!roundOneData}
                      onChange={(date) => setRoundOneStart(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                      ampm={false}
                      label='Waktu Selesai'
                      value={roundOneEnd}
                      disabled={!roundOneData}
                      onChange={(date) => setRoundOneEnd(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant='contained' color='secondary' disableElevation onClick={() => handleTimeSubmit(1)}>
                      Update
                    </Button>
                  </Grid>
                </SubCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SubCard title='Babak 2'>
                  <Grid container direction='column' justifyContent='center' alignContent='center' gap={2}>
                    <DateTimePicker
                      ampm={false}
                      label='Waktu Mulai'
                      value={roundTwoStart}
                      disabled={!roundTwoData}
                      onChange={(date) => setRoundTwoStart(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                      ampm={false}
                      label='Waktu Selesai'
                      value={roundTwoEnd}
                      disabled={!roundTwoData}
                      onChange={(date) => setRoundTwoEnd(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant='contained' color='secondary' disableElevation onClick={() => handleTimeSubmit(2)}>
                      Update
                    </Button>
                  </Grid>
                </SubCard>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </MainCard>
      </div>
    </>
  );
}
