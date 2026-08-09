import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createSentryViteConfiguration } from "../packages/shared/src/lib/sentry-vite";

const sentry = createSentryViteConfiguration({ appSurface: "landing" });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ...sentry.plugins],
  build: {
    sourcemap: sentry.sourceMap,
  },
});
