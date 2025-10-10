import type { SwipeEventData } from 'react-swipeable';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from 'react';

import ImageWrapper from '../../../image-wrapper/ImageWrapper';
import type { ImageWrapperHandle } from '../../../image-wrapper/ImageWrapper';

import type {
  ImageDescription,
  ImageDescriptions,
} from '../../../../../../type/image';

import styles from './ImageSliderGalleryBlock.module.css';

type ImageSliderGalleryBlockProps = {
  imageDescriptions: ImageDescriptions;
};

export type ImageSliderGalleryBlockHandle = {
  handleSwiped: (event: SwipeEventData) => void;
  handleSwiping: (event: SwipeEventData) => void;
};

export default forwardRef<
  ImageSliderGalleryBlockHandle,
  ImageSliderGalleryBlockProps
>(function ImageSliderGalleryBlock({ imageDescriptions }, ref) {
  // _____________________________________________________________________ State

  const [offsetXTarget, setOffsetXTarget] = useState(0);

  // ______________________________________________________________________ Refs

  const animationRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapperRefs = useRef<(ImageWrapperHandle | null)[]>([]);

  // _______________________________________________________________________ API

  useImperativeHandle(ref, () => ({
    handleSwiped(event: SwipeEventData) {
      console.log('*** ImageSliderGalleryBlock handleSwipe', {
        deltaX: event.deltaX,
        dir: event.dir,
        velocity: event.velocity,
      });

      // Reset offsetX after swipe ends
      setOffsetXTarget(0);
    },

    handleSwiping(event: SwipeEventData) {
      console.log('*** ImageSliderGalleryBlock handleSwiping', {
        deltaX: event.deltaX,
        dir: event.dir,
      });
      setOffsetXTarget((prev) => prev + event.deltaX);
    },
  }));

  // ___________________________________________________________________ Animate

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  useEffect(() => {
    const animate = () => {
      // Get Container Dimensions
      const CONTAINER_HEIGHT = containerRef.current?.clientHeight || 0;

      console.log('Container:', CONTAINER_HEIGHT);

      // Size ?
      if (CONTAINER_HEIGHT === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Scale and position images using widths and heights from ImageDescriptions
      let left = 0;

      for (let i = 0; i < imageDescriptions.length; i++) {
        const IMAGE_DESCRIPTION: ImageDescription = imageDescriptions[i];

        const SCALE: number = CONTAINER_HEIGHT / IMAGE_DESCRIPTION.height;
        const SCALED_WIDTH: number = IMAGE_DESCRIPTION.width * SCALE;

        console.log(` - Image ${i} scale and position:`, SCALE, left);

        const ELEMENT = imageRefs.current[i];

        if (ELEMENT) {
          ELEMENT.style.position = 'absolute';
          ELEMENT.style.left = `${left}px`;
          ELEMENT.style.width = `${SCALED_WIDTH}px`;
          ELEMENT.style.height = `${CONTAINER_HEIGHT}px`;
        }

        imageWrapperRefs.current[i]?.setDimensions(
          SCALED_WIDTH,
          CONTAINER_HEIGHT,
        );

        // Store Width
        left += SCALED_WIDTH;
      }

      // Set container width to total cumulative width
      if (containerRef.current) {
        containerRef.current.style.width = `${left}px`;
        containerRef.current.style.position = 'relative';
      }

      // Calculate Offset
      const OFFSET_X = lerp(currentOffsetRef.current, offsetXTarget, 0.05);
      currentOffsetRef.current = OFFSET_X;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${OFFSET_X}px)`;
      }

      if (Math.abs(OFFSET_X - offsetXTarget) > 0.1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [offsetXTarget, imageDescriptions]);

  // ____________________________________________________________________ Render

  return (
    <div ref={containerRef} className={styles['image-slider-block']}>
      {imageDescriptions.map((imageDescription, index) => (
        <div
          key={imageDescription.url}
          ref={(el) => {
            imageRefs.current[index] = el;
          }}
        >
          <ImageWrapper
            ref={(el) => {
              imageWrapperRefs.current[index] = el;
            }}
            src={imageDescription.url}
            alt={`Image ${index + 1}`}
            width={imageDescription.width}
            height={imageDescription.height}
          />
        </div>
      ))}
    </div>
  );
});
