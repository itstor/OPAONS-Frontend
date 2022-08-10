import { faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

import SocialMediaLogo from '@/components/login/SocialMediaLogo';

export default function SocialMediaBottom() {
  return (
    <div className='flex max-h-2 flex-row gap-6'>
      <SocialMediaLogo logo={faInstagram} title='@himapaksi_fkipuns' link='https://www.instagram.com/himapaksi_fkipuns/' />
      <SocialMediaLogo logo={faInstagram} title='@opauns' link='https://www.instagram.com/opauns/' />
      <SocialMediaLogo logo={faTiktok} title='himapaksifkipuns' link='https://www.tiktok.com/@himapaksifkipuns' />
      <SocialMediaLogo logo={faYoutube} title='Himapaksi FKIP UNS' link='https://www.youtube.com/channel/UC-vkq-qzNLH3h1DmuVbkkMg' />
    </div>
  );
}
