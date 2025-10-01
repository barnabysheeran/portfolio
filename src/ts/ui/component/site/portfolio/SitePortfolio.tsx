import { useEffect, useRef } from 'react';
import styles from './SitePortfolio.module.css';

import Portfolio from './portfolio/Portfolio.ts';

export default function SitePortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<Portfolio | null>(null);

  useEffect(() => {
    // Create Portfolio Instance
    if (containerRef.current) {
      portfolioRef.current = new Portfolio({
        isDebug: false,
        assetPath: '/assets/portfolio/',
        applicationContainer: containerRef.current,
      });
    }

    return () => {
      // TODO: Add stopping logic if Portfolio has a stop method
      // portfolioRef.current?.stop();
    };
  }, []);

  return <div ref={containerRef} className={styles['site-portfolio']}></div>;
}