import GlassMediaHolder from './glass-media/GlassMediaHolder';
import GlassHolder from './glass/GlassHolder';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  // _______________________________________________________________ Glass Media

  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-glass']}>
      <GlassMediaHolder />
      <GlassHolder />
    </div>
  );
}
