import { useEffect, useRef } from 'react';
import styles from './SitePortfolio.module.css';

import Portfolio from './portfolio/Portfolio.ts';

export default function SitePortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<Portfolio | null>(null);

  useEffect(() => {
    // Create One Portfolio Instance
    if (containerRef.current && !portfolioRef.current) {

      // Create Portfolio
      portfolioRef.current = new Portfolio({
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

  return <div ref={containerRef} className={styles['site-portfolio']}></div>;
}