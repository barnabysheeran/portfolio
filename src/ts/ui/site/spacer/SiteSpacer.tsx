import { motion } from 'framer-motion';

import { ANIMATION_DURATION_S } from '../../../constant/constantsAnimation';

import styles from './SiteSpacer.module.css';

export default function SiteSpacer() {
  return (
    <motion.div
      className={styles['site-spacer']}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        transition: {
          duration: ANIMATION_DURATION_S * 30,
          times: [0.0, 0.05, 0.95, 1.0],
          repeat: Infinity,
          ease: ['easeIn', 'linear', 'easeOut'],
        },
      }}
    >
      /////
    </motion.div>
  );
}
