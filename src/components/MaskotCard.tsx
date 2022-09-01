import Image from 'next/image';
import { ReactNode } from 'react';

import MaskotOpa from '~/images/maskot-opa.webp';

export default function MaskotCard({ children }: { children?: ReactNode }) {
  return (
    <div className='relative h-full w-full rounded-2xl bg-white px-6 py-8 shadow-xl shadow-black/5 md:aspect-[5/3] 2xl:px-8'>
      <div className='pointer-events-none absolute -bottom-1 -right-[130px] z-10 hidden h-[382px] w-[187px] xl:block 2xl:h-[509px] 2xl:w-[249px]'>
        <Image src={MaskotOpa} placeholder='blur' alt='Maskot OPA UNS 2022' width={249} height={509} objectFit='scale-down' />
      </div>
      {children}
    </div>
  );
}
