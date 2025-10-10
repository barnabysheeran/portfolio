import { LuGithub } from 'react-icons/lu';

import { ButtonIcon } from '../../component/button/icon/ButtonIcon';

import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const handleClickGithub = () => {
    window.open('https://github.com/barnabysheeran/portfolio', '_blank');
  };

  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-footer']}>
      <ButtonIcon
        size="medium"
        icon={<LuGithub />}
        offsetLeft="0.04rem"
        offsetTop="0.2rem"
        onClick={handleClickGithub}
        ariaLabel="GitHub"
      />
    </div>
  );
}
