import ImageSlider from '../../../component/image-slider/ImageSlider';

import styles from './GlassMediaHolder.module.css';

export default function GlassMediaHolder() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['glass-media-holder']}>
      <ImageSlider />
    </div>
  );
}
