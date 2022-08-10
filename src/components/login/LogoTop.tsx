import Image from 'next/image';

import LogoImage from '~/images/logo-atas.webp';

export default function LogoTop({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className='flex items-center justify-center rounded-full bg-white px-4 py-3 shadow-lg shadow-black/5'>
        <Image src={LogoImage} placeholder='blur' alt='Logo Atas UNS 2022' width={200} height={39} />
      </div>
    </div>
  );
}
