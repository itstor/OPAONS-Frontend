import JoditEditor from 'jodit-react';
import { ReactElement, useRef, useState } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';

export default function SoalPage() {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <div className='w-full'>
        <MainCard title='List Soal'>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent: string) => {
              return newContent;
            }}
          />
        </MainCard>
      </div>
    </>
  );
}

SoalPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <DashboardLayout title='List Soal'>{page}</DashboardLayout>;
};
