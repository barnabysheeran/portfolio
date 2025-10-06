import { useEffect, useRef } from 'react';

import GlassMedia from './GlassMedia';

import styles from './GlassMediaHolder.module.css';

export default function GlassMediaHolder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassMediaRef = useRef<GlassMedia | null>(null);

  // _______________________________________________________________ Glass Media

  useEffect(() => {
    // Create One Glass Instance
    if (containerRef.current && !glassMediaRef.current) {
      // Create Glass
      glassMediaRef.current = new GlassMedia();
    }

    return () => {
      // TODO: Add Stopping logic
    };
  }, []);

  // ____________________________________________________________________ Render

  return (
    <div ref={containerRef} className={styles['glass-media-holder']}>
      GlassMedia *****************
    </div>
  );
}
