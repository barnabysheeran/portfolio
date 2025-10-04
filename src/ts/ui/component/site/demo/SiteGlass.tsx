import { useEffect, useRef } from 'react';

import Glass from './glass/Glass.ts';

import styles from './SiteGlass.module.css';

export default function SiteGlass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<Glass | null>(null);

  useEffect(() => {
    // Create One Glass Instance
    if (containerRef.current && !glassRef.current) {

      // Create Glass
      glassRef.current = new Glass({
        isDebug: false,
        assetPath: '/assets/',
        applicationContainer: containerRef.current,
      });
    }

    return () => {
      // TODO: Add stopping logic if Portfolio has a stop method
      // portfolioRef.current?.stop();
    };
  }, []);

  return <div ref={containerRef} className={styles['site-glass']}></div>;
}