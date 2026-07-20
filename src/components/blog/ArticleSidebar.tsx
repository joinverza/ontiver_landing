import { Check } from "lucide-react";
import { type RefObject } from "react";
import MagneticFillButton from "../ui/MagneticFillButton";
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
  emailRef,
  email,
  emailError,
  consent,
  subscribeState,
  onEmailChange,
  onConsentChange,
  onSubscribe,
}: ArticleSidebarProps) {
  return (
    <aside className="article-sidebar min-w-0 lg:sticky lg:top-[100px] lg:self-start">
      <div>
        <h2 className="text-card-title font-bold text-[#05150E]">Follow Us</h2>
        <div className="mt-8 grid grid-cols-5 gap-3 sm:gap-4">
          <span className="article-follow-icon">
            <PlatformIcon
              label="Facebook"
              count="10k"
              color="#1877F2"
              href="https://www.facebook.com/"
            >
              <img src="/assets/facebook-post.svg" alt="" className="h-5 w-5" />
            </PlatformIcon>
          </span>
          <span className="article-follow-icon">
            <PlatformIcon
              label="Twitter"
              count="69k"
              color="#1DA1F2"
              href="https://x.com/"
            >
              <img src="/assets/twitter-post.svg" alt="" className="h-5 w-5" />
            </PlatformIcon>
          </span>
          <span className="article-follow-icon">
            <PlatformIcon
              label="Instagram"
              count="45k"
              color="#E1306C"
              href="https://www.instagram.com/"
            >
              <img src="/assets/insta-post.svg" alt="" className="h-5 w-5" />
            </PlatformIcon>
          </span>
          <span className="article-follow-icon">
            <PlatformIcon
              label="Pinterest"
              count="69k"
              color="#E60023"
              href="https://www.pinterest.com/"
            >
              <img src="/assets/pinterest.svg" alt="" className="h-5 w-5" />
            </PlatformIcon>
          </span>
          <span className="article-follow-icon">
            <PlatformIcon
              label="YouTube"
              count="69k"
              color="#FF0000"
              href="https://www.youtube.com/"
            >
              <img src="/assets/tube-post.svg" alt="" className="h-5 w-5" />
            </PlatformIcon>
          </span>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-body text-black/60">
          Subscribe to our newsletter and receive a selection of cool articles
          every week.
        </p>
        <div className="mt-6 space-y-4">
          <input
            ref={emailRef}
            className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-black/30 ${
              emailError
                ? "border-red-500/60"
                : "border-[#DDE5DD] focus:border-[#009311]/60 focus:[box-shadow:0_0_0_3px_rgba(34,197,94,0.08)]"
            }`}
            placeholder="Enter your email"
            value={email}
            type="email"
            autoComplete="email"
            onChange={(event) => onEmailChange(event.target.value)}
          />
          <MagneticFillButton
            variant="green"
            className="h-12 w-full rounded-lg px-4 text-sm font-semibold uppercase tracking-[0.08em]"
            onClick={onSubscribe}
          >
            {subscribeState === "loading" ? (
              <span className="inline-flex items-center">
                Subscribing
                <span className="ml-1">...</span>
              </span>
            ) : subscribeState === "done" ? (
              <span className="inline-flex items-center gap-2">
                <Check size={16} />
                Subscribed!
              </span>
            ) : (
              "Subscribe"
            )}
          </MagneticFillButton>
          {subscribeState === "error" ? (
            <p className="text-xs text-red-600" role="alert">
              Subscription failed. Please try again.
            </p>
          ) : null}
          <label className="flex items-start gap-3 text-xs leading-relaxed text-black/50">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors ${
                consent ? "border-[#009311] bg-[#009311]" : "border-black/20 bg-white"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={consent}
                onChange={(event) => onConsentChange(event.target.checked)}
              />
              {consent ? (
                <Check size={13} className="text-white" strokeWidth={3} />
              ) : null}
            </span>
            By checking this box, you confirm that you have read and agree to
            our terms of use regarding submitted data.
          </label>
        </div>
      </div>
    </aside>
  );
}
