import useUiState from '../../../store/uiState';

import MenuIconFlyout from '../../component/menu/flyout/MenuIconFlyout';
import { ButtonIcon } from '../../component/button/icon/ButtonIcon';
import { ButtonColorCircle } from '../../component/button/colorCircle/ButtonColorCircle';

import styles from './SiteOverlay.module.css';
import { LuPalette } from 'react-icons/lu';

export default function SiteOverlay() {
  const handleClickRed = () => {
    useUiState.getState().setTheme('red');
  };

  const handleClickBlue = () => {
    useUiState.getState().setTheme('blue');
  };

  const handleClickGreen = () => {
    useUiState.getState().setTheme('green');
  };

  const handleClickBlack = () => {
    useUiState.getState().setTheme('black');
  };

  return (
    <div className={styles['site-overlay']}>
      <MenuIconFlyout
        trigger={(toggle) => (
          <ButtonIcon
            size="medium"
            icon={<LuPalette />}
            ariaLabel="Choose Theme Color"
            onClick={toggle}
          />
        )}
      >
        <ButtonColorCircle
          size="medium"
          color="red"
          ariaLabel="Choose Theme Red"
          onClick={handleClickRed}
        />
        <ButtonColorCircle
          size="medium"
          color="blue"
          ariaLabel="Choose Theme Blue"
          onClick={handleClickBlue}
        />
        <ButtonColorCircle
          size="medium"
          color="green"
          ariaLabel="Choose Theme Green"
          onClick={handleClickGreen}
        />
        <ButtonColorCircle
          size="medium"
          color="black"
          ariaLabel="Choose Theme Black"
          onClick={handleClickBlack}
        />
      </MenuIconFlyout>
    </div>
  );
}
