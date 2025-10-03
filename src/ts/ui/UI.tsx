import SiteOverlay from "./component/site/overlay/SiteOverlay";
import SiteHeader from "./component/site/header/SiteHeader";
import SitePortfolio from "./component/site/portfolio/SitePortfolio";
// import SiteSpacer from "./component/site/spacer/SiteSpacer";
// import SiteProgress from "./component/site/progress/SiteProgress";
// import SiteEVE from "./component/site/eve/SiteEVE";
import SiteFooter from "./component/site/footer/SiteFooter";

export default function UI() {
  return (
    <div>
      <SiteHeader />
      <SitePortfolio />
      {/* <SiteSpacer />
      <SiteProgress />
      <SiteEVE />
      <SiteSpacer /> */}
      <SiteFooter />
      <SiteOverlay />
    </div>
  );
}