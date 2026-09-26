import { useLayoutEffect, useRef, type KeyboardEvent } from "react";

export const keepDialogFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
  if (event.key !== "Tab") return;
  const focusable = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};

type MobileDialogOptions = {
  open: boolean;
  routeKey: string;
  motionDisabled: boolean;
};

export const useMobileDialog = ({ open, routeKey, motionDisabled }: MobileDialogOptions) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const previousOverflow = useRef<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const previousRoute = useRef(routeKey);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const routeChanged = previousRoute.current !== routeKey;
    previousRoute.current = routeKey;
    clearTimeout(closeTimer.current);
    if (!dialog) return;

    const finishClose = () => {
      dialog.close();
      dialog.inert = false;
      delete dialog.dataset.state;
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
      if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
      returnFocus.current = null;
      closeTimer.current = undefined;
    };

    if (open) {
      dialog.inert = false;
      dialog.dataset.state = motionDisabled ? "entered" : "open";
      if (!dialog.open) {
        returnFocus.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        previousOverflow.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        dialog
          .querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')
          ?.focus({ preventScroll: true });
      }
    } else if (dialog.open) {
      dialog.dataset.state = "closing";
      dialog.inert = true;
      // Navigation must release the body lock before the destination scrolls.
      if (motionDisabled || routeChanged) finishClose();
      else closeTimer.current = setTimeout(finishClose, 160);
    }

    return () => clearTimeout(closeTimer.current);
  }, [open, routeKey, motionDisabled]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      clearTimeout(closeTimer.current);
      dialog?.close();
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
    };
  }, []);

  return dialogRef;
};
