import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./app/App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

// Keep route lookups and the prerendered canonical path in agreement.
const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
if (pathname !== window.location.pathname) {
  window.history.replaceState(
    window.history.state,
    "",
    `${pathname}${window.location.search}${window.location.hash}`,
  );
}

const application = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// A static host may serve the home document for a legacy or unknown URL.
// Hydrate only matching HTML; redirect/fallback routes mount their own content.
if (root.hasChildNodes() && root.dataset.prerenderedPath === pathname)
  hydrateRoot(root, application);
else createRoot(root).render(application);
