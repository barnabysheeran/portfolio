import { useSwipeable } from 'react-swipeable';
import type { SwipeEventData } from 'react-swipeable';
import { forwardRef, useImperativeHandle, useState } from 'react';

import styles from './ImageSliderInteraction.module.css';

// nearform.com/open-source/react-swipeable/docs/examples/feature-test-console

type ImageSliderInteractionProps = {
  onSwipe: (event: SwipeEventData) => void;
  onSwiping?: (event: SwipeEventData) => void;
};

export type ImageSliderInteractionHandle = {
  show: () => void;
  hide: () => void;
};

export default forwardRef<
  ImageSliderInteractionHandle,
  ImageSliderInteractionProps
>(function ImageSliderInteraction({ onSwipe, onSwiping }, ref) {
  const [isVisible, setIsVisible] = useState(true);

  // _______________________________________________________________________ API

  useImperativeHandle(ref, () => ({
    show() {
      setIsVisible(true);
    },
    hide() {
      setIsVisible(false);
    },
  }));

  // _____________________________________________________________________ Swipe

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log('ImageSliderInteraction. Swipe detected', {
        deltaX: eventData.deltaX,
        dir: eventData.dir,
        velocity: eventData.velocity,
      });
      onSwipe(eventData);
    },

    onSwiping: (eventData) => {
      console.log('ImageSliderInteraction. Swiping…', {
        deltaX: eventData.deltaX,
        dir: eventData.dir,
      });
      onSwiping?.(eventData);
    },

    trackMouse: true,
    trackTouch: true,

    preventScrollOnSwipe: true,
  });

  // ____________________________________________________________________ Render

  return (
    <div
      className={styles['image-slider-interaction']}
      style={{ display: isVisible ? 'block' : 'none' }}
      {...handlers}
    />
  );
});
