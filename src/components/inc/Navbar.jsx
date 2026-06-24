import React from "react";
import Button from "../base/Button";

const Navlinks = [
  {
    name: "Home",
  },
  {
    name: "Use Cases",
  },
  {
    name: "Pricing",
  },
  {
    name: "Resources/Blogs",
  },
  {
    name: "Contact",
  },
];

export default function Navbar() {
  return (
    <div className="py-4 px-3 mx-52 flex justify-between items-center shadow-[0_4px_16.7px_rgba(0,0,0,0.1)] rounded-3xl">
      <img src="./assets/logo.svg" alt="logo" />
      <div className="flex gap-6">
        {Navlinks.map((link) => {
          return <a>{link.name}</a>;
        })}
      </div>
      <Button
        className="bg-gradient-to-r from-dark-primary to-light-primary text-white py-3 px-5 rounded-xl"
        text="Join Waitlist"
      />
    </div>
  );
}
