import { useState, type ReactNode } from 'react';

import styles from './MenuIconFlyout.module.css';

interface MenuIconFlyoutProps {
  trigger: (toggle: () => void) => ReactNode;
  children: ReactNode;
}

export default function MenuIconFlyout({ trigger, children }: MenuIconFlyoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleOpenClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles['menu-icon-flyout']}>
      {trigger(handleToggleOpenClose)}
      {isMenuOpen && (
        <div className={styles['flyout-menu']}>
          {children}
        </div>
      )}
    </div>
  );
}
