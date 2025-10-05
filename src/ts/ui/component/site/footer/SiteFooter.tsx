import { LuGithub } from "react-icons/lu";

import { ButtonIcon } from '../../button/icon/ButtonIcon';

import styles from './SiteFooter.module.css';

export default function SiteFooter() {

  const handleClickGithub = () => {
    window.open('https://github.com/barnabysheeran', '_blank');
  };

  // ____________________________________________________________________ Render

  return <div className={styles['site-footer']}>
    <ButtonIcon size="large" icon={<LuGithub />} onClick={handleClickGithub} />
  </div>;
}