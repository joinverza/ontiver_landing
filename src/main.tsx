import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "./lib/router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { SentryErrorBoundary } from "@ontiver/shared/components/SentryErrorBoundary";
import { initializeBrowserSentry } from "@ontiver/shared/lib/sentry";

initializeBrowserSentry("landing");

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <SentryErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </SentryErrorBoundary>
  </StrictMode>,
);
