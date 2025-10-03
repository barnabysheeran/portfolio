import SiteOverlay from "./component/site/overlay/SiteOverlay";
import SiteHeader from "./component/site/header/SiteHeader";
import SitePortfolio from "./component/site/portfolio/SitePortfolio";
import SiteSpacer from "./component/site/spacer/SiteSpacer";
import SiteProgress from "./component/site/progress/SiteProgress";
import SiteEVE from "./component/site/eve/SiteEVE";
import SiteFooter from "./component/site/footer/SiteFooter";

import styles from "./UI.module.css";

export default function UI() {
  return (
    <div className={styles['ui']}>
      <SiteHeader />
      <SitePortfolio />
      <SiteSpacer />
      <SiteProgress />
      <SiteEVE />
      <SiteSpacer />
      <SiteFooter />
      <SiteOverlay />
    </div>
  );
}