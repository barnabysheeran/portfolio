import styles from './LoadingDots.module.css';

export default function LoadingDots() {
  return (
    <span className={styles['loading-dots']}>
      <span className={styles['loading-dot']} />
      <span className={styles['loading-dot']} />
      <span className={styles['loading-dot']} />
    </span>
  );
}
