import { useRef, useEffect, useCallback } from 'react';

import ImageSlider from '../../component/image-slider/ImageSlider';
import Glass, { type GlassCreationParameters } from './glass/Glass';
import type { ImageDescriptions } from '../../../type/image';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  const glassRef = useRef<HTMLDivElement>(null);
  const glassInstanceRef = useRef<Glass | null>(null);

  // _____________________________________________________________________ Media

  const handleMediaShowProject = useCallback(
    (imageDescriptions: ImageDescriptions) => {
      console.log('SiteGlass handleMediaShowProject', imageDescriptions);
    },
    [],
  );

  const handleMediaClear = useCallback(() => {
    console.log('SiteGlass handleMediaClear');
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
      <ImageSlider />
      <div ref={glassRef} className={styles['glass-container']}></div>
    </div>
  );
}
