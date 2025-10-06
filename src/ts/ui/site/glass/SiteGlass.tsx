import { useRef, useEffect } from 'react';

import ImageSlider from '../../component/image-slider/ImageSlider';
import Glass, { type GlassCreationParameters } from './glass/Glass';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  const glassRef = useRef<HTMLDivElement>(null);
  const glassInstanceRef = useRef<Glass | null>(null);

  useEffect(() => {
    if (glassRef.current && !glassInstanceRef.current) {
      const creationParameters: GlassCreationParameters = {
        isDevelopment: false,
        assetPath: '/assets/glass/',
        applicationContainer: glassRef.current,
      };

      glassInstanceRef.current = new Glass(creationParameters);
    }
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-glass']}>
      <ImageSlider />
      <div ref={glassRef} className={styles['glass-container']}></div>
    </div>
  );
}
