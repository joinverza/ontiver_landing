import { type FormEvent, useCallback, useEffect, useState } from "react";
import type { Audience } from "../../../../shared/lib/audience";
import {
  createPublicSupportRequest,
  getPublicSupportConversation,
  sendPublicSupportMessage,
  type PublicSupportConversation,
  type PublicSupportSession,
} from "../../../../shared/lib/landingApi";
import { emptyForm, shortcutsByAudience, type SupportFormValues } from "../support.config";
import { readStoredSession, SUPPORT_STORAGE_KEY } from "./supportSession";

export const useSupportRequest = (audience: Audience) => {
  const [form, setForm] = useState<SupportFormValues>(emptyForm);
  const topicShortcuts = shortcutsByAudience[audience];
  const selectedTopic = form.topic || topicShortcuts[0].topic;
  const topics = [
    ...new Set([
      ...topicShortcuts.map(({ topic }) => topic),
      "Credentials and sharing",
      "Billing",
      "Other",
      selectedTopic,
    ]),
  ];
  const [session, setSession] = useState<PublicSupportSession | null>(null);
  const [conversation, setConversation] = useState<PublicSupportConversation | null>(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const restoredSession = readStoredSession();
    if (!restoredSession) return;
    // Restore browser-owned storage/fragment state after the server-matched
    // first render. Reading it during render would also mutate history there.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(restoredSession);
  }, []);

  const loadConversation = useCallback(async (activeSession: PublicSupportSession) => {
    setLoadingConversation(true);
    setError("");
    try {
      setConversation(
        await getPublicSupportConversation(activeSession.requestId, activeSession.accessToken),
      );
    } catch (value) {
      setError(
        value instanceof Error ? value.message : "We could not load this support conversation.",
      );
    } finally {
      setLoadingConversation(false);
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    const timer = window.setTimeout(() => void loadConversation(session), 0);
    return () => window.clearTimeout(timer);
  }, [loadConversation, session]);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const created = await createPublicSupportRequest({ ...form, topic: selectedTopic });
      window.localStorage.setItem(SUPPORT_STORAGE_KEY, JSON.stringify(created));
      setSession(created);
      setForm(emptyForm);
      await loadConversation(created);
    } catch (value) {
      setError(
        value instanceof Error ? value.message : "We could not submit your support request.",
      );
    } finally {
      setBusy(false);
    }
  };

  const submitReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session || !reply.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await sendPublicSupportMessage(session.requestId, session.accessToken, reply);
      setReply("");
      await loadConversation(session);
    } catch (value) {
      setError(value instanceof Error ? value.message : "We could not send this message.");
    } finally {
      setBusy(false);
    }
  };

  const startNewRequest = () => {
    window.localStorage.removeItem(SUPPORT_STORAGE_KEY);
    setSession(null);
    setConversation(null);
    setReply("");
    setError("");
  };

  const updateForm = (field: keyof SupportFormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const refreshConversation = () => {
    if (session) void loadConversation(session);
  };

  return {
    form,
    selectedTopic,
    topics,
    session,
    conversation,
    reply,
    busy,
    loadingConversation,
    error,
    updateForm,
    setReply,
    submitRequest,
    submitReply,
    startNewRequest,
    refreshConversation,
  };
};
