import { Button, Grid, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ReactElement, useState } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';
import SubCard from '@/components/SubCard';

export default function HomePage() {
  const [value, setValue] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <MainCard title='Kontrol Pelaksanaan'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={12} md={6}>
                <SubCard title='Babak 1'>
                  <Grid container direction='column' justifyContent='center' alignContent='center' gap={2}>
                    <DatePicker
                      label='Tanggal Pelaksanaan'
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      ampm={false}
                      label='Waktu Mulai'
                      value={value2}
                      onChange={(newValue) => {
                        setValue2(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      ampm={false}
                      label='Waktu Selesai'
                      value={value2}
                      onChange={(newValue) => {
                        setValue2(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant='contained' color='secondary' disableElevation>
                      Mulai
                    </Button>
                  </Grid>
                </SubCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SubCard title='Babak 2'>
                  <Grid container direction='column' justifyContent='center' alignContent='center' gap={2}>
                    <DatePicker
                      label='Tanggal Pelaksanaan'
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      ampm={false}
                      label='Waktu Mulai'
                      value={value2}
                      onChange={(newValue) => {
                        setValue2(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      ampm={false}
                      label='Waktu Selesai'
                      value={value2}
                      onChange={(newValue) => {
                        setValue2(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Button variant='contained' color='secondary' disableElevation>
                      Mulai
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

HomePage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <DashboardLayout title='Dashboard'>{page}</DashboardLayout>;
};
