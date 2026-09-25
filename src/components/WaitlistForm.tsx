import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { joinWaitlist, sendContactRequest } from "../lib/landingApi";

type SignupValues = {
  name: string;
  email: string;
  userType: string;
  phone: string;
  interest: string;
  consent: boolean;
};

const consentText = "I agree to join the Ontiver waitlist and have my signup details and interests sent to the Ontiver team for early-access follow-up.";
const fieldClass = "mt-2 min-h-12 w-full min-w-0 rounded-[10px] border border-[#b6caaa] bg-white px-4 text-body font-normal text-[#002d0e] outline-none placeholder:text-[#002d0e]/45 focus:border-[#007d21] focus:ring-2 focus:ring-[#007d21]/10 disabled:opacity-65";

export default function WaitlistForm({ className = "", submitLabel = "Join the Waitlist" }: { className?: string; submitLabel?: string }) {
  const formId = useId();
  const submitting = useRef(false);
  const consentedAt = useRef("");
  const [values, setValues] = useState<SignupValues>({ name: "", email: "", userType: "Individual", phone: "", interest: "", consent: false });
  const [state, setState] = useState<"idle" | "joining" | "joined" | "error">("idle");
  const [completed, setCompleted] = useState({ registration: false, details: false });
  const [errorMessage, setErrorMessage] = useState("");
  const partial = completed.registration !== completed.details;
  const locked = state === "joining" || state === "joined" || partial;

  function update<K extends keyof SignupValues>(key: K, value: SignupValues[K]) {
    setValues(current => ({ ...current, [key]: value }));
    if (state === "error") {
      setState("idle");
      setErrorMessage("");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || state === "joined" || !values.consent) return;
    if (values.name.trim().length < 2 || !values.interest.trim()) {
      setState("error");
      setErrorMessage("Please enter a name of at least two characters and your interest area.");
      return;
    }
    submitting.current = true;
    setState("joining");
    setErrorMessage("");
    if (!consentedAt.current) consentedAt.current = new Date().toISOString();

    // The waitlist endpoint stores email only. The existing contact endpoint
    // preserves the additional details with explicit consent. Retry only a
    // failed stage, so a confirmed registration or contact is never repeated.
    const [registration, details] = await Promise.allSettled([
      completed.registration ? Promise.resolve() : joinWaitlist(values.email),
      completed.details ? Promise.resolve() : sendContactRequest({
        name: values.name,
        email: values.email,
        subject: `Ontiver waitlist signup — ${values.userType}`,
        message: [
          "Early-access signup details",
          `Name: ${values.name.trim()}`,
          `Email: ${values.email.trim()}`,
          `User type: ${values.userType}`,
          `Phone: ${values.phone.trim() || "Not provided"}`,
          `Interest area: ${values.interest.trim()}`,
          `Consent: ${consentText}`,
          `Consent recorded at: ${consentedAt.current}`,
        ].join("\n"),
      }),
    ]);
    const nextCompleted = { registration: registration.status === "fulfilled", details: details.status === "fulfilled" };
    setCompleted(nextCompleted);
    submitting.current = false;

    if (nextCompleted.registration && nextCompleted.details) {
      setState("joined");
      return;
    }

    setState("error");
    const failure = registration.status === "rejected" ? registration.reason : details.status === "rejected" ? details.reason : undefined;
    const reason = failure instanceof Error ? ` ${failure.message}` : "";
    setErrorMessage(nextCompleted.registration
      ? `Your email is on the waitlist, but your signup details were not sent. Retry to send only your details.${reason}`
      : nextCompleted.details
        ? `Your signup details were sent to the team, but your email wasn't added to the waitlist. Retry to complete only your registration.${reason}`
        : `We couldn't complete your signup. Your entries are still here; please try again.${reason}`);
  }

  return <form className={`text-left ${className}`} onSubmit={submit} aria-busy={state === "joining"}>
    <fieldset disabled={locked} className="grid min-w-0 gap-x-5 gap-y-4 sm:grid-cols-2">
      <legend className="sr-only">Join the Ontiver waitlist</legend>
      <label htmlFor={`${formId}-name`} className="text-body font-medium">Name *
        <input id={`${formId}-name`} name="name" required minLength={2} maxLength={160} autoComplete="name" value={values.name} onChange={event => update("name", event.target.value)} placeholder="Your name" className={fieldClass} />
      </label>
      <label htmlFor={`${formId}-email`} className="text-body font-medium">Email *
        <input id={`${formId}-email`} name="email" type="email" required maxLength={320} autoComplete="email" value={values.email} onChange={event => update("email", event.target.value)} placeholder="you@example.com" className={fieldClass} />
      </label>
      <label htmlFor={`${formId}-type`} className="text-body font-medium">User type *
        <select id={`${formId}-type`} name="userType" required value={values.userType} onChange={event => update("userType", event.target.value)} className={fieldClass}>
          {["Individual", "Business", "Developer", "Partner"].map(type => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label htmlFor={`${formId}-phone`} className="text-body font-medium">Phone <span className="font-normal text-[#526058]">(optional)</span>
        <input id={`${formId}-phone`} name="phone" type="tel" maxLength={80} autoComplete="tel" value={values.phone} onChange={event => update("phone", event.target.value)} className={fieldClass} />
      </label>
      <label htmlFor={`${formId}-interest`} className="text-body font-medium sm:col-span-2">Interest area *
        <input id={`${formId}-interest`} name="interest" required maxLength={1200} value={values.interest} onChange={event => update("interest", event.target.value)} placeholder="For example, reusable identity for work or school" className={fieldClass} />
      </label>
      <div className="sm:col-span-2">
        <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-meta leading-relaxed text-[#526058]">
          <input id={`${formId}-consent`} name="consent" type="checkbox" required checked={values.consent} onChange={event => update("consent", event.target.checked)} className="mt-1 size-5 shrink-0 accent-[#007d21]" />
          <span>{consentText}</span>
        </label>
      </div>
    </fieldset>
    <p className="mt-3 text-meta text-[#526058]">Read our <Link to="/privacy" className="font-medium text-[#007d21] underline underline-offset-4">Privacy Policy</Link>.</p>
    <button disabled={state === "joining" || state === "joined"} type="submit" className="button-primary mt-5 w-full sm:w-auto">
      {state === "joining" ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />Submitting...</> : state === "joined" ? <><Check size={18} aria-hidden="true" />You're on the list!</> : <>{partial ? "Retry remaining step" : submitLabel}<ArrowUpRight size={18} aria-hidden="true" /></>}
    </button>
    <div aria-live="polite">{state === "joined" ? <p className="mt-3 text-body text-[#007d21]">You're on the list! Your signup details have been sent to the Ontiver team.</p> : null}</div>
    {state === "error" && errorMessage ? <p className="mt-3 text-body text-red-700" role="alert">{errorMessage}</p> : null}
  </form>;
}
