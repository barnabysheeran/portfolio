import { useState } from 'react';
import useUiState from '../../../../store/uiState';

import { ButtonIcon } from '../../button/icon/ButtonIcon';

import styles from './MenuIconFlyout.module.css';

export default function MenuIconFlyout() {

  // Local State not Stored in uiStore
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ____________________________________________________________ Click Handlers

  const handleToggleOpenClose = () => {
    // Toggle
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickRed = () => {
    useUiState.getState().setTheme('red');

    // Close Menu
    setIsMenuOpen(false);
  }

  const handleClickBlue = () => {
    useUiState.getState().setTheme('blue');

    // Close Menu
    setIsMenuOpen(false);
  }

  const handleClickGreen = () => {
    useUiState.getState().setTheme('green');

    // Close Menu
    setIsMenuOpen(false);
  };

  const handleClickBlack = () => {
    useUiState.getState().setTheme('black');

    // Close Menu
    setIsMenuOpen(false);
  }

  // ____________________________________________________________________ Render

  return <div className={styles['menu-icon-flyout']}>
    <ButtonIcon size="large" icon="☰" onClick={handleToggleOpenClose} />
    {isMenuOpen && (
      <div className={styles['flyout-menu']}>
        <ButtonIcon size="large" icon="🔴" onClick={handleClickRed} />
        <ButtonIcon size="large" icon="🔵" onClick={handleClickBlue} />
        <ButtonIcon size="large" icon="🟢" onClick={handleClickGreen} />
        <ButtonIcon size="large" icon="⚫" onClick={handleClickBlack} />
      </div>
    )}
  </div>;
}
