import useUiState from '../store/uiState';

import SiteOverlay from './site/overlay/SiteOverlay';
import SiteHeader from './site/header/SiteHeader';
import SiteGlass from './site/glass/SiteGlass';
// import SiteSpacer from './site/spacer/SiteSpacer';
// import SiteProgress from './site/progress/SiteProgress';
import SiteFooter from './site/footer/SiteFooter';

import styles from './UIContainer.module.css';

export default function UIContainer() {
  const theme = useUiState((state) => state.themeId);
  const themeClass = 'theme-' + (theme || 'black');

  return (
    <div className={`${styles['ui-container']} ${themeClass}`}>
      <SiteHeader />
      <SiteGlass />
      {/* <SiteSpacer />
      <SiteProgress />
      <SiteSpacer /> */}
      <SiteFooter />
      <SiteOverlay />
    </div>
  );
}
