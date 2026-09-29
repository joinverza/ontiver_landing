# Frontend structure and performance

The website keeps individual and enterprise features separate. Shared audience-aware pages (support, security, resources) and common home sections have one implementation; their route supplies the audience.

```text
src/
  app/                         App shell, lazy route registry, SEO and route scrolling
  features/
    individual/                Home, identity, journey, use cases, waitlist
    enterprise/                Home, platform, industry use cases, pricing, contact
    shared/                    Blog, contact, support, legal, resources, security, home sections
      <feature>/
        pages/                 Route composition
        components/            UI used by that feature
        hooks/                 Stateful behavior, where needed
        data/                  Feature-owned content, where needed
  shared/
    components/                Navigation, layout, motion, media and reusable UI
    hooks/                     Browser/scroll visibility behavior
    lib/                       Existing API contracts and shared utilities
    data/                      Shared content and image registry
  styles/                      Tokens, base, components, media, motion, sizing, scrollbars
  prerender/                   Static HTML generation and canonical route inventory
```

## Component conventions

Use named arrow functions for ordinary components, typed props, and a default export for route modules. The React error boundary is a class because React requires one for `getDerivedStateFromError`. Arrow syntax is a consistency convention, not a rendering optimization.

Split by responsibility rather than arbitrary line counts. Pages compose sections; forms own their presentation and delegate state/submission behavior to feature hooks. Keep static copy out of components when it is substantial. Long content datasets are acceptable; do not fragment them merely to meet a line target. Avoid importing a component only for a domain type.

Use direct dynamic imports in `app/routes/pageModules.ts`. Do not restore an eager barrel of every page. Blog listings and SEO import article summaries; full article bodies belong to the article route. Shared navigation remains mounted during page changes so the audience pill can slide without resetting and menu state can close explicitly on navigation.

## Rendering and scrolling

The build waits for lazy route modules before writing complete static HTML. The client hydrates that HTML instead of replacing it. A route loading state and reloadable error boundary handle deferred route loading. `PageReveal` lives inside the Suspense boundary so it does not mutate prerendered classes before hydration.

Lenis retains native touch scrolling and reduced-motion support. Its animation frame loop runs only during active smooth scrolling. Scroll-driven effects batch geometry reads before style writes and process visible targets. Walkthrough timers pause offscreen, in background tabs, during interaction, and when motion is paused. Article progress updates its bar without rerendering the article. Blog pagination displays already-loaded content immediately.

Use one image helper where appropriate, keep intrinsic dimensions, lazy-load below-fold imagery, and reserve high fetch priority for hero images. Native scrollbars are themed globally, including horizontal rails, dialogs and textareas; forced-color mode keeps native colors.

## Section sizing

`page-intro` accounts for the fixed header and uses at least one small viewport on desktop. Other sections size to their content with consistent responsive padding. Short CTAs and accordions do not reserve an empty viewport. Long grids, forms, expanded accordions and articles grow naturally. Stacked layouts and short/zoomed windows use intrinsic heights.

`section-space` adds 48px of top and bottom padding on mobile, 72px from 640px, and 96px from 1024px. Compact strips use 32px, 48px, and 64px respectively. Hero padding has its own token, so generous content-section spacing does not push the hero beyond the screen. Use these shared classes on page-level forms, resource grids, pricing plans, and CTAs instead of one-sided padding utilities.

Use `section-compact` for small notices and CTA strips and `section-flow` for deliberately continuous long content. Image frames use explicit aspect ratios, intrinsic dimensions, and per-photo focal points. Editorial grids combine portraits with landscape details without stretching either image or clipping captions. Avoid fixed heights or `overflow: hidden` on text-bearing sections.

## Validation

- `npm run check`: lint, TypeScript/build, prerender, and checks for complete HTML, landmarks, metadata and route chunks.
- `npm run format` / `npm run format:check`: consistent formatting.
- Browser verification should include production hydration, direct deep links, route switching/back/forward, keyboard/mobile menus, reduced motion, hashes, form success/error states with mocked APIs, and desktop/mobile overflow.

Screenshots and local browser audit artifacts remain in ignored `*.local` folders. Do not publish them as application assets.
