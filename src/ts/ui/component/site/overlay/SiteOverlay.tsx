import MenuIconFlyout from '../../menu/flyout/MenuIconFlyout';

import styles from './SiteOverlay.module.css';

export default function SiteOverlay() {
    return <div className={styles['site-overlay']}>
        <MenuIconFlyout />
    </div>;
}