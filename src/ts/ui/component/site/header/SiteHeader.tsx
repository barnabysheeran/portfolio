import styles from './SiteHeader.module.css';
import { motion } from 'framer-motion';

export default function SiteHeader() {
  return (
    <motion.div
      className={styles['site-header']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, delay: 1.0 }}
    >
      /////
    </motion.div>
  );
}