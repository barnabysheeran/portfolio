import styles from './SiteProgressBarRadix.module.css';
import * as Progress from '@radix-ui/react-progress';

export default function SiteProgressBarRadix() {
  return (
    <Progress.Root className={styles['site-progress-bar-radix']} value={70}>
      <Progress.Indicator
        className={styles['site-progress-bar-radix-indicator']}
        style={{ transform: 'translateX(-30%)' }}
      />
    </Progress.Root>
  );
}
