import type { SwipeEventData } from 'react-swipeable';
import { forwardRef, useImperativeHandle } from 'react';

import ImageWrapper from '../../../image-wrapper/ImageWrapper';

import type { ImageDescriptions } from '../../../../../../type/image';

import styles from './ImageSliderGalleryBlock.module.css';

type ImageSliderGalleryBlockProps = {
  imageDescriptions: ImageDescriptions;
};

export type ImageSliderGalleryBlockHandle = {
  handleSwipe: (event: SwipeEventData) => void;
  handleSwiping: (event: SwipeEventData) => void;
};

export default forwardRef<
  ImageSliderGalleryBlockHandle,
  ImageSliderGalleryBlockProps
>(function ImageSliderGalleryBlock({ imageDescriptions }, ref) {
  // _______________________________________________________________________ API

  useImperativeHandle(ref, () => ({
    handleSwipe(event: SwipeEventData) {
      console.log('*** ImageSliderGalleryBlock handleSwipe', {
        deltaX: event.deltaX,
        dir: event.dir,
        velocity: event.velocity,
      });
    },
    handleSwiping(event: SwipeEventData) {
      console.log('*** ImageSliderGalleryBlock handleSwiping', {
        deltaX: event.deltaX,
        dir: event.dir,
      });
    },
  }));

  // ____________________________________________________________________ Render

  return (
    <div className={styles['image-slider-block']}>
      {imageDescriptions.map((imageDescription, index) => (
        <ImageWrapper
          key={imageDescription.url}
          src={imageDescription.url}
          alt={`Image ${index + 1}`}
          width={imageDescription.width}
          height={imageDescription.height}
        />
      ))}
    </div>
  );
});
