import styles from './LoadingCircle.module.css';

export default function LoadingCircle() {
  return (
    <div className={styles['loading-circle-circle']}>
      <div className={styles['loading-circle-arc']}></div>
    </div>
  );
}
