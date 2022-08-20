import { ReactElement } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import Seo from '@/components/Seo';

export default function EditSoalPage() {
  return (
    <>
      <Seo templateTitle='Dashboard' />
      <></>
    </>
  );
}

EditSoalPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <DashboardLayout title='Edit Soal'>{page}</DashboardLayout>;
};
