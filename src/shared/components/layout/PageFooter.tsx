import Join from "./Join";
import Footer from "./Footer";
import type { Audience } from "../../lib/audience";

const PageFooter = ({ audience = "individual" }: { audience?: Audience }) => {
  return (
    <>
      <Join audience={audience} />
      <Footer audience={audience} />
    </>
  );
};

export default PageFooter;
