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
  handleSwiped: (event: SwipeEventData) => void;
  handleSwiping: (event: SwipeEventData) => void;
};

export default forwardRef<ImageSliderGalleryHandle, ImageSliderGalleryProps>(
  function ImageSliderGallery({ imageDescriptions }, ref) {
    // ____________________________________________________________________ Refs

    const blockRef = useRef<ImageSliderGalleryBlockHandle>(null);

    // _____________________________________________________________________ API

    useImperativeHandle(ref, () => ({
      handleSwiped(event: SwipeEventData) {
        blockRef.current?.handleSwiped(event);
      },
      handleSwiping(event: SwipeEventData) {
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
