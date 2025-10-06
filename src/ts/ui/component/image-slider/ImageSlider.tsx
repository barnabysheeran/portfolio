import ImageSliderInteraction from './interaction/ImageSliderInteraction';

import styles from './ImageSlider.module.css';

export default function ImageSlider() {
  // ____________________________________________________________________ Render

  return (
    <div className={styles['image-slider']}>
      <ImageSliderInteraction />
    </div>
  );
}
