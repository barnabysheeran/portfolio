import SiteHeader from "./component/site/header/SiteHeader";
import SitePortfolio from "./component/site/portfolio/SitePortfolio";
import SiteSpacer from "./component/site/spacer/SiteSpacer";
import SiteEVE from "./component/site/eve/SiteEVE";
import SiteFooter from "./component/site/footer/SiteFooter";

export default function UI() {
  return (
    <div>
      <SiteHeader />
      <SitePortfolio />
      <SiteSpacer />
      <SiteEVE />
      <SiteSpacer />
      <SiteFooter />
    </div>
  );
}