import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import LoadingCircle from '../../loading/loading-circle/LoadingCircle';

import styles from './ImageWrapper.module.css';

type ImageWrapperProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ImageWrapperHandle = {
  setDimensions: (width: number, height: number) => void;
};

export default forwardRef<ImageWrapperHandle, ImageWrapperProps>(
  function ImageWrapper({ src, alt, width, height }, ref) {
    // _____________________________________________________________________ State

    const [isLoading, setIsLoading] = useState(true);
    const [dimensions, setDimensions] = useState({ width, height });

    // _____________________________________________________________________ Image

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
    }, [src]);

    // _______________________________________________________________________ API

    useImperativeHandle(ref, () => ({
      setDimensions: (newWidth: number, newHeight: number) => {
        setDimensions({ width: newWidth, height: newHeight });
      },
    }));

    // ____________________________________________________________________ Render

    return (
      <div
        className={styles['image-wrapper']}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {isLoading && (
          <div className={styles['loading-container']}>
            <LoadingCircle />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoading ? styles.loading : ''}`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  },
);
