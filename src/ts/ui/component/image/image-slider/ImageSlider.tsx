import type { SwipeEventData } from 'react-swipeable';

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import ImageSliderGallery, {
  type ImageSliderGalleryHandle,
} from './gallery/ImageSliderGallery';
import ImageSliderInteraction, {
  type ImageSliderInteractionHandle,
} from './interaction/ImageSliderInteraction';

import type { ImageDescriptions } from '../../../../type/image';

import styles from './ImageSlider.module.css';

export type ImageSliderHandle = {
  showImages: (imageDescriptions: ImageDescriptions) => void;
  clear: () => void;
  showInteraction: () => void;
  hideInteraction: () => void;
};

export default forwardRef<ImageSliderHandle>(function ImageSlider(_, ref) {
  // ______________________________________________________________________ Refs

  const galleryRef = useRef<ImageSliderGalleryHandle>(null);
  const interactionRef = useRef<ImageSliderInteractionHandle>(null);

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

      showInteraction() {
        interactionRef.current?.show();
      },

      hideInteraction() {
        interactionRef.current?.hide();
      },
    }),
    [],
  );

  // _____________________________________________________________________ Swipe

  const handleSwiped = useCallback((event: SwipeEventData) => {
    galleryRef.current?.handleSwiped(event);
  }, []);

  const handleSwiping = useCallback((event: SwipeEventData) => {
    galleryRef.current?.handleSwiping(event);
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['image-slider']}>
      <ImageSliderGallery
        ref={galleryRef}
        imageDescriptions={imageDescriptions}
      />
      <ImageSliderInteraction
        ref={interactionRef}
        onSwiped={handleSwiped}
        onSwiping={handleSwiping}
      />
    </div>
  );
});
