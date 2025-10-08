import { useRef, useEffect, useCallback } from 'react';

import SiteGlassThree from './glass-three/SiteGlassThree';
import ImageSlider, {
  type ImageSliderHandle,
} from '../../component/image-slider/ImageSlider';
import Glass, { type GlassCreationParameters } from './glass/Glass';
import type { ImageDescriptions } from '../../../type/image';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  const glassRef = useRef<HTMLDivElement>(null);
  const glassInstanceRef = useRef<Glass | null>(null);
  const imageSliderRef = useRef<ImageSliderHandle | null>(null);

  // _____________________________________________________________________ Media

  const handleMediaShowProject = useCallback(
    (imageDescriptions: ImageDescriptions) => {
      imageSliderRef.current?.showImages(imageDescriptions);
    },
    [],
  );

  const handleMediaClear = useCallback(() => {
    imageSliderRef.current?.clear();
  }, []);

  // _____________________________________________________________________ Glass

  useEffect(() => {
    if (glassRef.current && !glassInstanceRef.current) {
      const creationParameters: GlassCreationParameters = {
        applicationContainer: glassRef.current,
        isDevelopment: false,
        onMediaShowProject: handleMediaShowProject,
        onMediaClear: handleMediaClear,
      };

      glassInstanceRef.current = new Glass(creationParameters);
    }
  }, [handleMediaClear, handleMediaShowProject]);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-glass']}>
      <SiteGlassThree />
      <ImageSlider ref={imageSliderRef} />
      <div ref={glassRef} className={styles['glass-container']}></div>
    </div>
  );
}
