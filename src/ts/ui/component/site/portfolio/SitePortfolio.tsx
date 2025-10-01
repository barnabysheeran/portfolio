import { useEffect, useRef } from 'react';
import styles from './SitePortfolio.module.css';

import Portfolio from './portfolio/Portfolio.ts';

export default function SitePortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {

      // TODO Add Stopping of Portfolio

      const portfolio = new Portfolio({
        isDebug: false,
        applicationContainer: containerRef.current,
      });
    }
  }, []);

  return <div ref={containerRef} className={styles['site-portfolio']}></div>;
}