import useUiState from '../store/uiState';

// import SiteOverlay from "./component/site/overlay/SiteOverlay";
import SiteHeader from './component/site/header/SiteHeader';
import SiteGlass from './component/site/glass/SiteGlass';
// import SiteSpacer from "./component/site/spacer/SiteSpacer";
// import SiteProgress from "./component/site/progress/SiteProgress";
// import SiteEVE from "./component/site/eve/SiteEVE";
import SiteFooter from './component/site/footer/SiteFooter';

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
      <SiteEVE />
      <SiteSpacer /> */}
      <SiteFooter />
      {/* <SiteOverlay /> */}
    </div>
  );
}
