import { useState, useEffect } from 'react';

import LoadingDots from '../../loading/loading-dots/LoadingDots';

import styles from './ImageWrapper.module.css';

type ImageWrapperProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
}: ImageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return (
    <div
      className={styles['image-wrapper']}
      style={{ width: width, height: height }}
    >
      {isLoading && (
        <div className={styles['loading-container']}>
          <LoadingDots />
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
}
