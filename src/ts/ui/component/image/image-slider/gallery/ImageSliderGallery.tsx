import type { SwipeEventData } from 'react-swipeable';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import ImageSliderGalleryBlock, {
  type ImageSliderGalleryBlockHandle,
} from './block/ImageSliderGalleryBlock';

import type { ImageDescriptions } from '../../../../../type/image';

import styles from './ImageSliderGallery.module.css';

type ImageSliderGalleryProps = {
  imageDescriptions: ImageDescriptions;
};

export type ImageSliderGalleryHandle = {
  handleSwipe: (event: SwipeEventData) => void;
  handleSwiping: (event: SwipeEventData) => void;
};

export default forwardRef<ImageSliderGalleryHandle, ImageSliderGalleryProps>(
  function ImageSliderGallery({ imageDescriptions }, ref) {
    // ____________________________________________________________________ Refs

    const blockRef = useRef<ImageSliderGalleryBlockHandle>(null);

    // _____________________________________________________________________ API

    useImperativeHandle(ref, () => ({
      handleSwipe(event: SwipeEventData) {
        console.log('** ImageSliderGallery handleSwipe', {
          deltaX: event.deltaX,
          dir: event.dir,
          velocity: event.velocity,
        });
        blockRef.current?.handleSwipe(event);
      },
      handleSwiping(event: SwipeEventData) {
        console.log('** ImageSliderGallery handleSwiping', {
          deltaX: event.deltaX,
          dir: event.dir,
        });
        blockRef.current?.handleSwiping(event);
      },
    }));

    // __________________________________________________________________ Render

    return (
      <div className={styles['image-slider-gallery']}>
        <ImageSliderGalleryBlock
          ref={blockRef}
          imageDescriptions={imageDescriptions}
        />
      </div>
    );
  },
);
