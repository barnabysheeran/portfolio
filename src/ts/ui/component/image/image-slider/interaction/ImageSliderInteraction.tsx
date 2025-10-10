import { useSwipeable } from 'react-swipeable';
import type { SwipeEventData } from 'react-swipeable';

import styles from './ImageSliderInteraction.module.css';

// nearform.com/open-source/react-swipeable/docs/examples/feature-test-console

type Props = {
  onSwipe: (event: SwipeEventData) => void;
  onSwiping?: (event: SwipeEventData) => void;
};

export default function ImageSliderInteraction({ onSwipe, onSwiping }: Props) {
  // _____________________________________________________________________ Swipe

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log('Swipe detected', {
        deltaX: eventData.deltaX,
        dir: eventData.dir,
        velocity: eventData.velocity,
      });
      onSwipe(eventData);
    },

    onSwiping: (eventData) => {
      console.log('Swiping…', {
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

  return <div className={styles['image-slider-interaction']} {...handlers} />;
}
