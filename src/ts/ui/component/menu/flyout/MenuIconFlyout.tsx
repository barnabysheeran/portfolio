import { ButtonIcon } from '../../button/icon/ButtonIcon';

import styles from './MenuIconFlyout.module.css';

export default function MenuIconFlyout() {


  // ____________________________________________________________________ Render

  return <div className={styles['menu-icon-flyout']}>
    <ButtonIcon size="large" icon="☰" onClick={() => alert('Menu clicked!')} />
  </div>;
}