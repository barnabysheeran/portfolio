import styles from './SiteSpacer.module.css';
import { motion } from 'framer-motion';

export default function SiteSpacer() {
  return (
    <motion.div
      className={styles['site-spacer']}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 0], 
        transition: {
          duration: 4.0,
          times: [0.0, 0.2, 0.4, 0.6, 1.0],
          repeat: Infinity,
          ease: ["easeIn", "linear", "easeOut", "linear"],
        }
      }}
    >
      /////
    </motion.div>
  );
}