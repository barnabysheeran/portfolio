import type { SwipeEventData } from 'react-swipeable';

import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import ImageSliderGallery from './gallery/ImageSliderGallery';
import ImageSliderInteraction from './interaction/ImageSliderInteraction';

import type { ImageDescriptions } from '../../../../type/image';

import styles from './ImageSlider.module.css';

export type ImageSliderHandle = {
  showImages: (imageDescriptions: ImageDescriptions) => void;
  clear: () => void;
};

export default forwardRef<ImageSliderHandle>(function ImageSlider(_, ref) {
  // _____________________________________________________________________ State

  const [imageDescriptions, setImageDescriptions] = useState<ImageDescriptions>(
    [],
  );

  // _______________________________________________________________________ API

  useImperativeHandle(
    ref,
    () => ({
      showImages(imageDescriptions: ImageDescriptions) {
        console.log('ImageSlider showImages', imageDescriptions);
        setImageDescriptions(imageDescriptions);
      },
      clear() {
        console.log('ImageSlider clear');
        setImageDescriptions([]);
      },
    }),
    [],
  );

  // _____________________________________________________________________ Swipe

  const handleSwipe = useCallback((event: SwipeEventData) => {
    console.log('ImageSlider onSwipe', {
      deltaX: event.deltaX,
      dir: event.dir,
      velocity: event.velocity,
    });
  }, []);

  const handleSwiping = useCallback((event: SwipeEventData) => {
    console.log('ImageSlider onSwiping', {
      deltaX: event.deltaX,
      dir: event.dir,
    });
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['image-slider']}>
      <ImageSliderGallery imageDescriptions={imageDescriptions} />
      <ImageSliderInteraction onSwipe={handleSwipe} onSwiping={handleSwiping} />
    </div>
  );
});
