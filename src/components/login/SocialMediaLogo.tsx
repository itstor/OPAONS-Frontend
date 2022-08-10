import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SocialMediaLogo({ logo, title, link }: { logo: IconDefinition; title: string; link: string }): JSX.Element {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='text-primary-800 no-underline visited:text-primary-800 target:text-primary-800 hover:underline'
    >
      <div className='flex flex-row items-center gap-2'>
        <div className='flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary-800 p-[2px]'>
          <FontAwesomeIcon icon={logo} size='sm' color='#fff6e7' />
        </div>
        <caption className='text-center text-xs font-medium'>{title}</caption>
      </div>
    </a>
  );
}
