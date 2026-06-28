import { Link } from "react-router-dom";
import { footerGroups, footerIcons } from "../../../data/footer";

export default function Footer() {
  return (
    <footer className="bg-[#05150E] px-5 py-12 text-white sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(180px,0.8fr)_2.2fr] lg:gap-16">
          <div className="max-w-[240px]">
            <Link to="/" aria-label="Ontiver home" className="inline-flex">
              <img
                src="/assets/green-logo.svg"
                alt="Ontiver"
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Verify Once. Use Everywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 lg:gap-x-12">
            {footerGroups.map((group) => (
              <div key={group.category}>
                <h5 className="pb-4 text-sm font-bold text-white sm:pb-5">
                  {group.category}
                </h5>
                <ul className="space-y-3">
                  {group.list.map((item) => (
                    <li key={item} className="text-sm text-white/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 border-white/15" />

        <div className="flex flex-col gap-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Ontiver. All rights reserved.</p>
          <div className="flex gap-3">
            {footerIcons.map((icon) => (
              <img
                key={icon.alt}
                src={icon.icon}
                alt={icon.alt}
                className="h-5 w-5 opacity-75 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
