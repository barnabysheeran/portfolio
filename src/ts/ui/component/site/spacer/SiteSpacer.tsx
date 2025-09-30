import styles from './SiteSpacer.module.css';
import { motion } from 'framer-motion';

export default function SiteSpacer() {
  return (
    <motion.div
      className={styles['site-spacer']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, delay: 1.0 }}
    >
      /////
    </motion.div>
  );
}