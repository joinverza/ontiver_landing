const footer = [
  {
    category: "Product",
    list: ["Features", "Pricing", "Developers", "Trusted", "Use Cases"],
  },
  {
    category: "Use Cases",
    list: ["Fintechs", "Lenders", "Marketplaces", "HR Platforms", "Schools"],
  },
  {
    category: "Company",
    list: ["About", "Resources", "Blog", "Contact", "Careers"],
  },
  {
    category: "Legal",
    list: [
      "Privacy Policy",
      "Terms of Service",
      "Data protection",
      "Cookie Policy",
    ],
  },
];

const icons = [
  {
    icon: "./assets/telegram.svg",
    alt: "telegram-icon",
  },
  {
    icon: "./assets/instagram.svg",
    alt: "instagram-icon",
  },
  {
    icon: "./assets/facebook.svg",
    alt: "facebook-icon",
  },
  {
    icon: "./assets/twitter.svg",
    alt: "twitter-icon",
  },
];

export default function Footer() {
  return (
    <div className="bg-[#05150E] px-30 py-16 text-white">
      <div className="flex justify-between">
        <div className="w-[124px]">
          <img src="./assets/green-logo.svg" />
          <p className="text-sm">Verify Once. Use Everywhere</p>
        </div>
        <div className="flex justify-between gap-x-32">
          {footer.map((foot) => {
            return (
              <div>
                <h5 className="pb-6 font-bold">{foot.category}</h5>
                <ul>
                  {foot.list.map((item) => {
                    return <ol className="pb-3 text-[#B2B2B2]">{item}</ol>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="my-7 border-[0.5px]" />
      <div className="flex justify-between">
        <p>© 2026 Ontiver. All rights reserved.</p>
        <div className="flex gap-3">
          {icons.map((i) => {
            return <img src={i.icon} alt={i.alt} />;
          })}
        </div>
      </div>
    </div>
  );
}
