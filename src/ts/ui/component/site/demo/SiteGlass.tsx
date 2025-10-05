import GlassMedia from './glass-media/GlassMedia';
import GlassHolder from './glass/GlassHolder';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  return (
    <div className={styles['site-glass']}>
      <GlassHolder />
      <GlassMedia />
    </div>
  );
}
