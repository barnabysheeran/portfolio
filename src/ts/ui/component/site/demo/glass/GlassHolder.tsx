import { useEffect, useRef } from "react";

import Glass from "./Glass";

import styles from "./GlassHolder.module.css";

export default function GlassHolder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<Glass | null>(null);

  // _____________________________________________________________________ Glass

  useEffect(() => {
    // Create One Glass Instance
    if (containerRef.current && !glassRef.current) {
      // Create Glass
      glassRef.current = new Glass({
        isDebug: false,
        assetPath: "./assets/",
        applicationContainer: containerRef.current,
      });
    }

    return () => {
      // TODO: Add stopping logic if Portfolio has a stop method
      // portfolioRef.current?.stop();
    };
  }, []);

  // ____________________________________________________________________ Render

  return <div ref={containerRef} className={styles["glass-holder"]}></div>;
}
