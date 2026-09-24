import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { joinWaitlist } from "../../../lib/landingApi";
import type { Audience } from "../../../lib/audience";
import HeroActions from "../Hero/HeroActions";

type JoinState = "idle" | "joining" | "joined" | "error";

export default function Join({ audience }: { audience: Audience }) {
  const enterprise = audience === "enterprise";
  const [email, setEmail] = useState("");
  const [state, setState] = useState<JoinState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "joining" || state === "joined") return;
    setState("joining");
    setErrorMessage("");
    try {
      await joinWaitlist(email);
      setState("joined");
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not join the waitlist. Please try again.");
    }
  }

  return (
    <section id="join" className="bg-[#edf5eb] pt-16 sm:pt-20">
      <div className="site-container">
        <div className="relative grid overflow-hidden rounded-[32px] bg-[#002d0e] p-7 text-white sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:p-16">
          <img src="/assets/ontiver-icon.svg" aria-hidden="true" alt="" className="pointer-events-none absolute -right-10 -top-16 w-[450px] opacity-[.035] brightness-0 invert" />
          <div className="relative">
            <p className="eyebrow text-[#a5d69a]">{enterprise ? "Enterprise access" : "Early access"}</p>
            <h2 className="section-heading mt-5 max-w-[530px]">{enterprise ? "Build your next workflow on trust." : "Your next chapter starts with you."}</h2>
            <p className="mt-5 max-w-[520px] text-subtitle text-white/70">{enterprise ? "Explore how verification, consent, and reusable proof could fit your business. Let's start with your first workflow." : "Join the Ontiver waitlist for early access, private beta invites, and a simpler way to carry trusted identity proof."}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-meta text-white/60">{(enterprise ? ["A focused pilot", "Your workflow", "Clear success criteria"] : ["Early beta", "Private invites", "Product updates"]).map(item => <span key={item} className="inline-flex items-center gap-2"><span className="size-1 rounded-full bg-[#a5d69a]" />{item}</span>)}</div>
          </div>
          <div className="relative mt-10 lg:mt-0">
            <h3 className="mb-6 text-card-title font-medium">{enterprise ? "Tell us what you need. We will map the right rollout." : "Tell us where to send your invite."}</h3>
            {enterprise ? <HeroActions audience={audience} light /> : <form onSubmit={submit}>
              <label htmlFor="waitlist-email" className="mb-3 block text-sm text-white/80">Your email *</label>
              <input id="waitlist-email" type="email" required autoComplete="email" value={email} disabled={state === "joining" || state === "joined"} onChange={event => { setEmail(event.target.value); if (state === "error") setState("idle"); }} placeholder="you@example.com" className="min-h-14 w-full rounded-full border border-white/25 bg-white/10 px-5 text-body text-white outline-none placeholder:text-white/40 focus:border-[#a5d69a] disabled:opacity-60" />
              <button disabled={state === "joining" || state === "joined"} type="submit" className="button-primary mt-3 min-h-14 w-full bg-white text-[#002d0e] hover:bg-[#d8edcf]">{state === "joining" ? <><LoaderCircle size={18} className="animate-spin" />Joining...</> : state === "joined" ? <><Check size={18} />You're on the list!</> : <>Join Waitlist<ArrowUpRight size={18} /></>}</button>
              <Link to="/#solution" className="button-secondary mt-3 w-full border-white/30 text-white hover:bg-white/10 hover:text-white">See how it works</Link>
              <div aria-live="polite">{state === "joined" ? <p className="mt-3 text-sm text-[#b4e9a8]">You're on the list!</p> : null}</div>
              {state === "error" && errorMessage ? <p className="mt-3 text-sm text-red-200" role="alert">{errorMessage}</p> : null}
            </form>}
          </div>
        </div>
      </div>
    </section>
  );
}
