import Join from "../Join/Join";
import Footer from "../Footer/Footer";
import type { Audience } from "../../../lib/audience";

export default function CurtainFooter({ audience = "individual" }: { audience?: Audience }) {
  return (
    <>
      <div className="relative bg-[#f7f8f5]">
        <Join audience={audience} />
      </div>
      <div className="relative bg-black">
        <Footer audience={audience} />
      </div>
    </>
  );
}
