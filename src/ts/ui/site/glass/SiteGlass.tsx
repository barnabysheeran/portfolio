import ImageSlider from '../../component/image-slider/ImageSlider';
import GlassHolder from './glass/GlassHolder';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-glass']}>
      <ImageSlider />
      <GlassHolder />
    </div>
  );
}
