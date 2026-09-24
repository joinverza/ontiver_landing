import { ArrowUpRight, Check, Mail } from "lucide-react";
import { type RefObject } from "react";
import { contactSocialIcons } from "../../data/contact";
import PlatformIcon from "./PlatformIcon";

type SubscribeState = "idle" | "loading" | "done" | "error";

type ArticleSidebarProps = {
  emailRef: RefObject<HTMLInputElement | null>;
  email: string;
  emailError: boolean;
  consent: boolean;
  subscribeState: SubscribeState;
  onEmailChange: (value: string) => void;
  onConsentChange: (value: boolean) => void;
  onSubscribe: () => void;
};

export default function ArticleSidebar({
  emailRef, email, emailError, consent, subscribeState, onEmailChange, onConsentChange, onSubscribe,
}: ArticleSidebarProps) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
      <form className="rounded-[24px] bg-[#edf5eb] p-6 sm:p-8 lg:p-6" onSubmit={(event) => { event.preventDefault(); onSubscribe(); }} noValidate>
        <Mail size={26} className="text-[#007d21]" aria-hidden="true" />
        <p className="eyebrow mt-5">The Ontiver newsletter</p>
        <h2 className="mt-3 text-card-title font-semibold tracking-[-0.02em] text-[#002d0e]">Stay in the loop.</h2>
        <p className="mt-3 text-body text-[#002d0e]/65">Subscribe for new articles and updates from Ontiver.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="article-newsletter-email" className="mb-2 block text-sm font-medium text-[#002d0e]">Email address</label>
            <input
              id="article-newsletter-email"
              ref={emailRef}
              className={`h-12 w-full rounded-xl border bg-white px-4 text-body outline-none transition-colors placeholder:text-[#002d0e]/35 ${emailError ? "border-red-500/60" : "border-[#dde6dc] focus:border-[#009311] focus:ring-2 focus:ring-[#009311]/10"}`}
              placeholder="Enter your email"
              value={email}
              type="email"
              autoComplete="email"
              required
              aria-invalid={emailError}
              aria-describedby={emailError ? "article-newsletter-error" : undefined}
              onChange={(event) => onEmailChange(event.target.value)}
            />
          </div>
          <label className="flex items-start gap-3 text-meta leading-relaxed text-[#002d0e]/65">
            <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#009311]" checked={consent} required onChange={(event) => onConsentChange(event.target.checked)} />
            <span>By checking this box, you confirm that you have read and agree to our terms of use regarding submitted data.</span>
          </label>
          <button type="submit" className="button-primary w-full disabled:cursor-wait disabled:opacity-60" disabled={subscribeState === "loading" || subscribeState === "done"}>
            {subscribeState === "loading" ? "Subscribing..." : subscribeState === "done" ? <><Check size={17} aria-hidden="true" /> Subscribed!</> : <>Subscribe <ArrowUpRight size={17} aria-hidden="true" /></>}
          </button>
          {subscribeState === "done" && <p role="status" className="text-meta text-[#007d21]">You are subscribed. Thanks for joining us.</p>}
          {emailError && <p id="article-newsletter-error" role="alert" className="text-meta text-red-700">{subscribeState === "error" ? "Subscription failed. Please try again." : "Enter a valid email and agree to the terms to subscribe."}</p>}
        </div>
      </form>
      <div className="mt-8 border-t border-[#dde6dc] pt-7">
        <h2 className="text-card-title font-semibold text-[#002d0e]">Follow Us</h2>
        <div className="mt-5 flex gap-3">
          {contactSocialIcons.map(({ icon, ...platform }) => <PlatformIcon key={platform.label} {...platform}><img src={icon} alt="" className="h-5 w-5" /></PlatformIcon>)}
        </div>
      </div>
    </aside>
  );
}
