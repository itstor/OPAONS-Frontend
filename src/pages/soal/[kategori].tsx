import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import MainCard from '@/components/MainCard';
import Seo from '@/components/Seo';

export default function HomePage() {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  return (
    <>
      <Seo templateTitle='Dashboard' />
      <DashboardLayout title='Dashboard'>
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
      </DashboardLayout>
    </>
  );
}
