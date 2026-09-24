import Calculator from "../components/sections/Calculator/Calculator";
import CurtainFooter from "../components/sections/CurtainFooter/CurtainFooter";

export default function CalculatorPage() {
  return <main className="bg-white"><Calculator standalone /><CurtainFooter audience="enterprise" /></main>;
}
