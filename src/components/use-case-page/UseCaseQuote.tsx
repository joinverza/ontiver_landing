import type { UseCasePageDetail } from "../../data/useCases";

type UseCaseQuoteProps = {
  quote: UseCasePageDetail["quote"];
};

export default function UseCaseQuote({ quote }: UseCaseQuoteProps) {
  const quoteWords = quote.text.split(" ");

  return (
    <section
      data-quote-section
      className="bg-[#0A1A12] px-5 py-20 text-white sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-[860px]">
        <span
          data-quote-mark
          className="block text-[80px] font-semibold leading-none text-[var(--usecase-accent)]"
        >
          "
        </span>
        <blockquote className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.4]">
          {quoteWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden"
            >
              <span data-quote-word className="mr-[0.25em] inline-block">
                {word}
              </span>
            </span>
          ))}
        </blockquote>
        <p
          data-quote-attribution
          data-text={quote.attribution}
          className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--usecase-accent)]"
        />
      </div>
    </section>
  );
}
