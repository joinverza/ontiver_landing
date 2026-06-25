import Text from "../components/base/Text";

const problems = [
  {
    image: "./assets/rep-prob.png",
    alt: "rep-image",
    title: "Repeated verification costs pile up.",
    para: "Businesses re-verify the same users across platforms, paying for checks that should only happen once.",
  },
  {
    image: "./assets/ont-prob.png",
    alt: "ont-image",
    title: "Onboarding friction kills conversion.",
    para: "Every extra document upload is a door users close. Drop-off during KYC is the hidden cost no one tracks.",
  },
  {
    image: "./assets/ver-prob.png",
    alt: "ver-image",
    title: "Compliance proof is fragmented.",
    para: "When regulators ask for an audit trail, businesses scramble across disconnected records and incomplete logs.",
  },
];

export default function Problem() {
  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20 bg-bg-light">
      <Text
        btext="The Problem"
        heading="Why building digital products still feels harder than it should."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {problems.map((prob, idx) => {
          return (
            <div key={idx} className="p-6 md:p-8 rounded-3xl bg-white shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={prob.image} alt={prob.alt} className="w-full rounded-2xl mb-6 object-cover aspect-video bg-black/5" />
              <div>
                <h6 className="text-green font-semibold text-lg mb-2">{prob.title}</h6>
                <p className="text-sm text-black/60 leading-relaxed">{prob.para}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

