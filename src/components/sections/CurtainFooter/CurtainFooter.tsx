import Join from "../Join/Join";
import Footer from "../Footer/Footer";
import type { Audience } from "../../../lib/audience";

export default function CurtainFooter({ audience = "individual" }: { audience?: Audience }) {
  return <><Join audience={audience} /><Footer audience={audience} /></>;
}
