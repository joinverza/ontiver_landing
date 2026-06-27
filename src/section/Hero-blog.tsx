import Button from "../components/base/Button";

export default function Hero() {
  return (
    <div className="flex bg-bg-light">
      <div>
        <div className="absolute top-[316px] left-[118px] w-[600px]">
          <h1 className="font-bold text-6xl">
            Insights on Identity, Compliance, and Trust Infrastructure
          </h1>
          <p className="text-lg py-4">
            Explore practical guides, compliance insights, developer resources,
            and research on reusable identity, KYC optimization, AML, and
            digital trust systems.
          </p>
          <div>
            <Button
              className="rounded-lg bg-gradient-to-r from-dark-primary to-light-primary text-white py-3 px-15 font-medium text-lg mr-4"
              text="Explore Resources"
            />
            <Button
              className="border-[0.5px] py-3 px-5 text-green border-green rounded-lg font-medium text-lg"
              text="Developer Docs"
            />
          </div>
        </div>
        <div className="absolute top-[124px] left-[683px]">
          <img src="./assets/hero-blog.png" alt="hero-image" />
        </div>
      </div>
    </div>
  );
}
