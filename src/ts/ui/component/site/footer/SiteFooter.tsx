import { ButtonIcon } from '../../button/icon/ButtonIcon';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {

  const handleClickGithub = () => {
    window.open('https://github.com/your-repo', '_blank');
  };

  // ____________________________________________________________________ Render

  return <div className={styles['site-footer']}>
    <ButtonIcon size="small" icon="🐱" onClick={handleClickGithub} />
  </div>;
}