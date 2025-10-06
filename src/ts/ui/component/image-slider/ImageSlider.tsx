import { forwardRef, useImperativeHandle } from 'react';

import styles from './ImageSlider.module.css';

import type { ImageDescriptions } from '../../../type/image';

export type ImageSliderHandle = {
  showImages: (imageDescriptions: ImageDescriptions) => void;
  clear: () => void;
};

const ImageSlider = forwardRef<ImageSliderHandle>(function ImageSlider(_, ref) {
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
      <span>Image slider placeholder</span>
    </div>
  );
});

export default ImageSlider;
