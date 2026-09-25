import StandalonePage from "../components/ui/StandalonePage";
import ContextPhoto from "../components/ui/ContextPhoto";
import { imagery } from "../data/imagery";

const journeys = [
  { title: "Applying for a loan", organization: "A digital lender or microfinance bank", purpose: "Confirm your identity and reduce fraud risk before approving your application", claims: "Identity, phone number, consent, risk signals", description: "You receive a request from the lender, review what's needed, submit your evidence once, and the lender reviews your verified profile alongside your application." },
  { title: "Starting a new job", organization: "An employer or HR platform", purpose: "Confirm your identity, certificates, and employment history before onboarding", claims: "Identity, education, employment history, references", description: "Your new employer sends a request, you upload your certificates and previous employment details, referees confirm what's needed, and your employer reviews the result." },
  { title: "Joining a delivery team", organization: "A logistics or delivery platform", purpose: "Confirm your identity, license, and vehicle details before activation", claims: "Identity, license, vehicle documents, emergency contact", description: "You submit your documents and a liveness check, operations reviews the evidence, and you're activated — with renewal reminders as documents approach expiry." },
  { title: "Becoming an approved vendor", organization: "A marketplace or procurement team", purpose: "Confirm your identity and business details before you can sell or supply", claims: "Identity, business registration, address, payout ownership", description: "The marketplace requests your business evidence, you submit documents and payout details, and the marketplace reviews before approving your seller profile." },
  { title: "Applying to a school", organization: "A school or education platform", purpose: "Confirm your identity and academic records as part of admission", claims: "Identity, certificates, enrollment records", description: "The school requests your academic evidence, you submit records and certificates, the institution confirms what's needed, and admissions reviews your verified profile." },
  { title: "Opening a seller account", organization: "An e-commerce or marketplace platform", purpose: "Confirm your identity before you can list products or receive payouts", claims: "Identity, phone, documents, payout ownership", description: "You submit your identity and payout evidence once, the platform reviews it, and your seller account is approved." },
];

export default function IndividualUseCasesPage() {
  const photos = [imagery.mobileApplication, imagery.candidateReview, imagery.courierOnboarding, imagery.siteWorkers, imagery.studentAdmissions, imagery.merchantOrders];
  return (
    <StandalonePage
      eyebrow="Planned verification journeys"
      title={<>Different requests.<br /><span className="text-[#007d21]">One place to respond.</span></>}
      description="A job, loan or supplier application asks for different evidence. Ontiver is designed to help you complete each request and reuse approved claims where supported."
      visual={<ContextPhoto image={imagery.candidateReview} priority />}
      secondaryAction={{ label: "See how it works", to: "/how-it-works" }}
      finalTitle="Make room for what comes next."
    >
      <section className="section-space" aria-label="Individual use cases">
        <div className="site-container grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map((journey, index) => (
              <article key={journey.title} className="min-w-0" data-scroll-reveal>
                <ContextPhoto image={photos[index]} size="card" />
                <h2 className="mt-4 text-card-title font-medium">{journey.title}</h2>
                <p className="mt-2 text-body text-[#526058]">{journey.organization}</p>
                <details className="group mt-4 border-y border-[#002d0e]/15 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-medium text-[#007d21] [&::-webkit-details-marker]:hidden">View request details<span aria-hidden="true" className="group-open:rotate-45">+</span></summary>
                  <dl className="mt-4 space-y-4 text-body">
                    <div><dt className="font-medium">Purpose</dt><dd className="mt-1 text-[#526058]">{journey.purpose}</dd></div>
                    <div><dt className="font-medium">Required claims</dt><dd className="mt-1 text-[#526058]">{journey.claims}</dd></div>
                    <div><dt className="font-medium">Your journey</dt><dd className="mt-1 text-[#526058]">{journey.description}</dd></div>
                  </dl>
                </details>
              </article>
          ))}
        </div>
      </section>
    </StandalonePage>
  );
}
