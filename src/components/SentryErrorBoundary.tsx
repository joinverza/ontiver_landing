import * as Sentry from "@sentry/react";
import type { ReactNode } from "react";

export function SentryErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <main
          role="alert"
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            background: "#f5f7f4",
            color: "#092c20",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <section style={{ maxWidth: 560, textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Ontiver reliability
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.05, margin: "0.75rem 0" }}>
              This page could not be opened safely.
            </h1>
            <p style={{ lineHeight: 1.6, color: "#456157" }}>
              Refresh the page. If the problem continues, contact Ontiver support and share only the time it occurred.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: "1rem",
                border: 0,
                borderRadius: 999,
                padding: "0.85rem 1.25rem",
                background: "#0b3b2c",
                color: "white",
                fontWeight: 750,
                cursor: "pointer",
              }}
            >
              Refresh securely
            </button>
          </section>
        </main>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
