import Button from "../base/Button";

const Navlinks = [
  { name: "Home" },
  { name: "Use Cases" },
  { name: "Pricing" },
  { name: "Resources/Blogs" },
  { name: "Contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 w-full z-[100] px-6">
      <div className="max-w-[1000px] mx-auto py-3 px-6 flex justify-between items-center bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full border border-black/5">
        <img src="./assets/logo.svg" alt="logo" className="h-6" />
        <div className="hidden md:flex gap-8">
          {Navlinks.map((link, idx) => (
            <a key={idx} href="#" className="text-black/80 hover:text-[#009311] font-medium text-sm transition-colors">
              {link.name}
            </a>
          ))}
        </div>
        <Button
          className="bg-[#005e19] hover:bg-[#004a14] text-white py-2.5 px-6 rounded-full font-medium text-sm transition-colors shadow-md"
          text="Join Waitlist"
        />
      </div>
    </div>
  );
}
