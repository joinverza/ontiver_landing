import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "./lib/router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
