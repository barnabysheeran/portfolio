import styles from './SiteProgress.module.css';

import SiteProgressBarRadix from '../progress/bar/SiteProgressBarRadix';

export default function SiteProgress() {
  return <div className={styles['site-progress']}>
    <SiteProgressBarRadix />
    <SiteProgressBarRadix />
    <SiteProgressBarRadix />
    <SiteProgressBarRadix />
    <SiteProgressBarRadix />
  </div>;
}
