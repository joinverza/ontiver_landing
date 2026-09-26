import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import { controlClassName, type SupportFormValues } from "../support.config";
import { SupportField } from "./SupportField";

type SupportRequestFormProps = {
  form: SupportFormValues;
  selectedTopic: string;
  topics: string[];
  busy: boolean;
  onChange: (field: keyof SupportFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const SupportRequestForm = ({
  form,
  selectedTopic,
  topics,
  busy,
  onChange,
  onSubmit,
}: SupportRequestFormProps) => (
  <form onSubmit={onSubmit} aria-busy={busy}>
    <h2 className="text-card-title font-medium">Tell us what you need</h2>

    <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
      <SupportField htmlFor="support-name" label="Name" required>
        <input
          id="support-name"
          required
          minLength={2}
          autoComplete="name"
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          className={controlClassName}
        />
      </SupportField>
      <SupportField htmlFor="support-email" label="Email" required>
        <input
          id="support-email"
          required
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => onChange("email", event.target.value)}
          className={controlClassName}
        />
      </SupportField>
      <SupportField htmlFor="support-topic" label="Topic" required>
        <select
          id="support-topic"
          required
          value={selectedTopic}
          onChange={(event) => onChange("topic", event.target.value)}
          className={controlClassName}
        >
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </SupportField>
      <SupportField htmlFor="support-subject" label="Subject" required>
        <input
          id="support-subject"
          required
          minLength={2}
          maxLength={160}
          value={form.subject}
          onChange={(event) => onChange("subject", event.target.value)}
          className={controlClassName}
        />
      </SupportField>
      <SupportField htmlFor="support-message" label="Message" required className="sm:col-span-2">
        <textarea
          id="support-message"
          required
          minLength={10}
          maxLength={4000}
          value={form.message}
          onChange={(event) => onChange("message", event.target.value)}
          className={`${controlClassName} min-h-40 resize-y py-3`}
          placeholder="Describe what happened, what you expected, and any non-sensitive error message."
        />
      </SupportField>
      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => onChange("website", event.target.value)}
        />
      </label>
    </div>

    <div className="mt-8 flex flex-col gap-5 border-t border-[#dde6dc] pt-7 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-meta text-[#526058]">
        Ontiver uses this information to respond and operate support. See our{" "}
        <Link className="font-semibold text-[#007b20] underline underline-offset-2" to="/privacy">
          Privacy Policy
        </Link>
        .
      </p>
      <button type="submit" disabled={busy} className="button-primary shrink-0">
        {busy ? "Submitting..." : "Submit request"}
        <Send className="h-4 w-4" />
      </button>
    </div>
  </form>
);
