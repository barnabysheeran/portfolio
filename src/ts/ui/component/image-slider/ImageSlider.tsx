import { forwardRef, useImperativeHandle } from 'react';

import ImageSliderInteraction from './interaction/ImageSliderInteraction';

import type { ImageDescriptions } from '../../../type/image';

import styles from './ImageSlider.module.css';

export type ImageSliderHandle = {
  showImages: (imageDescriptions: ImageDescriptions) => void;
  clear: () => void;
};

export default forwardRef<ImageSliderHandle>(function ImageSlider(_, ref) {
  useImperativeHandle(
    ref,
    () => ({
      showImages(imageDescriptions) {
        console.log('ImageSlider showImages', imageDescriptions);
      },
      clear() {
        console.log('ImageSlider clear');
      },
    }),
    [],
  );

  return (
    <div className={styles['image-slider']}>
      <ImageSliderInteraction />
    </div>
  );
});
