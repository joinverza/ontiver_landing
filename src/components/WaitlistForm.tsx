import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { joinWaitlist } from "../lib/landingApi";

export default function WaitlistForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "joining" | "joined" | "error">("idle");
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

  return <form className={`text-left ${className}`} onSubmit={submit} aria-busy={state === "joining"}>
    <label htmlFor="waitlist-email" className="mb-3 block text-body font-medium">Your email *</label>
    <div className="flex flex-col gap-3 sm:flex-row">
      <input id="waitlist-email" type="email" required autoComplete="email" value={email} disabled={state === "joining" || state === "joined"} onChange={event => { setEmail(event.target.value); if (state === "error") setState("idle"); }} placeholder="you@example.com" className="min-h-14 min-w-0 flex-1 rounded-full border border-[#b6caaa] bg-white px-5 text-body text-[#002d0e] outline-none placeholder:text-[#002d0e]/45 focus:border-[#007d21] disabled:opacity-60" />
      <button disabled={state === "joining" || state === "joined"} type="submit" className="button-primary min-h-14 shrink-0">{state === "joining" ? <><LoaderCircle size={18} className="animate-spin" />Joining...</> : state === "joined" ? <><Check size={18} />You're on the list!</> : <>Join Waitlist<ArrowUpRight size={18} /></>}</button>
    </div>
    <div aria-live="polite">{state === "joined" ? <p className="mt-3 text-body text-[#007d21]">You're on the list!</p> : null}</div>
    {state === "error" && errorMessage ? <p className="mt-3 text-body text-red-700" role="alert">{errorMessage}</p> : null}
  </form>;
}
