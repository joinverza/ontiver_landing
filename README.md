# Ontiver Landing

The public Ontiver website, built with React, TypeScript, and Vite.

## Local development

```bash
npm ci
copy .env.example .env.local
npm run dev
```

`VITE_ONTIVER_API_BASE_URL` selects the Ontiver API used by the contact,
waitlist, and newsletter forms. It defaults to `https://api.ontiver.com`.

## Production

Render deploys the `startup` branch as a static site:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- SPA fallback: `/*` rewrites to `/index.html`

Run `npm run lint` and `npm run build` before publishing.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
