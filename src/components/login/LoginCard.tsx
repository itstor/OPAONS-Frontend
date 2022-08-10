import Image from 'next/image';
import { ReactNode } from 'react';

import MaskotOpa from '~/images/maskot-opa.webp';

export default function LoginCard({ children }: { children?: ReactNode }) {
  return (
    <div className='relative h-full w-full rounded-2xl bg-white px-12 py-6 shadow-xl shadow-black/5 2xl:aspect-[4/5] 2xl:px-16'>
      <div className='pointer-events-none absolute -bottom-1 -right-[130px] z-10 hidden h-[382px] w-[187px] md:block 2xl:h-[509px] 2xl:w-[249px]'>
        <Image src={MaskotOpa} placeholder='blur' alt='Maskot OPA UNS 2022' width={249} height={509} objectFit='scale-down' />
      </div>
      {children}
    </div>
  );
}
