import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import Seo from '@/components/Seo';

export default function EditSoalPage() {
  return (
    <>
      <Seo templateTitle='Dashboard' />
      <DashboardLayout childOf='soal'>
        <></>
      </DashboardLayout>
    </>
  );
}
