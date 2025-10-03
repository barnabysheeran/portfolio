import useUiState from '../../../../store/uiState';

import MenuIconFlyout from '../../menu/flyout/MenuIconFlyout';
import { ButtonColorCircle } from '../../button/colorCircle/ButtonColorCircle';


import styles from './SiteOverlay.module.css';

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
                    <ButtonColorCircle size="medium" color="red" onClick={toggle} />
                )}
            >
                <ButtonColorCircle size="medium" color="red" onClick={handleClickRed} />
                <ButtonColorCircle size="medium" color="blue" onClick={handleClickBlue} />
                <ButtonColorCircle size="medium" color="green" onClick={handleClickGreen} />
                <ButtonColorCircle size="medium" color="black" onClick={handleClickBlack} />
            </MenuIconFlyout>
        </div>
    );
}