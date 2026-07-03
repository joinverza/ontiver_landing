import Text from "../base/Text";
import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseChallengeProps = {
  detail: UseCasePageDetail;
};

function WordReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          data-word-reveal
          className="mr-[0.25em] inline-block opacity-0"
        >
          {word}
        </span>
      ))}
    </>
  );
}

export default function UseCaseChallenge({ detail }: UseCaseChallengeProps) {
  return (
    <section data-challenge-section className="px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-[min(100%,1120px)]">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1fr] lg:items-start">
          <div>
            <Text
              btext={detail.challenge.label}
              heading={detail.challenge.heading}
              animate={false}
              containerClassName="items-start gap-4 pb-0"
              badgeWrapperClassName="mx-0"
              badgeTextClassName="border border-black/20 text-[var(--usecase-accent)]"
              headingClassName="mx-0 max-w-[620px] text-left text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.12]"
            />
          </div>
          <p
            data-challenge-copy
            className="max-w-[620px] text-base leading-[1.8] text-black/58"
          >
            <WordReveal text={detail.challenge.body} />
          </p>
        </div>

        <div
          data-challenge-panel
          className="mt-12 overflow-hidden rounded-2xl bg-[#07120c]"
        >
          <div className="relative h-[clamp(280px,40vw,480px)] overflow-hidden">
            <img
              src={detail.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.22),transparent_28%),linear-gradient(to_top,rgba(3,10,6,0.96),rgba(3,10,6,0.28))]" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--usecase-accent)]">
                Signal Map
              </p>
              <h3 className="mt-3 max-w-[520px] text-3xl font-semibold leading-tight text-white sm:text-5xl">
                {detail.challenge.visualTitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
