import useUiState from '../../../../store/uiState';

import { ButtonIcon } from '../../button/icon/ButtonIcon';

import styles from './SiteHeader.module.css';

export default function SiteHeader() {

  const handleClickRed = () => {
    useUiState.getState().setTheme('red');
  }

  const handleClickBlue = () => {
    useUiState.getState().setTheme('blue');
  }

  const handleClickGreen = () => {
    useUiState.getState().setTheme('green');
  }

  const handleClickBlack = () => {
    useUiState.getState().setTheme('black');
  }

  // ____________________________________________________________________ Render

  return (
    <div className={styles['site-header']}>
      <ButtonIcon size="small" onClick={handleClickRed} icon="🔴" />
      <ButtonIcon size="small" onClick={handleClickBlue} icon="🔵" />
      <ButtonIcon size="small" onClick={handleClickGreen} icon="🟢" />
      <ButtonIcon size="small" onClick={handleClickBlack} icon="⚫" />
    </div>
  );
}