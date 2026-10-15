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

`SiteImage` supplies native lazy loading, asynchronous decoding, intrinsic dimensions, and responsive WebP sources from `shared/data/responsivePhotos.json`. Derivatives live beside the original photo library under `public/assets/photos/responsive`; source images remain the fallback. Use an accurate `sizes` fallback for eager images, and let lazy images use automatic sizing where supported. Only media visible on arrival should receive `priority`. Photographs reveal outward from the center once on entry; reduced or paused motion shows them immediately.

Horizontal regions must still allow the page to scroll vertically. The pricing comparison scopes Lenis prevention to horizontal input and explicitly allows vertical scroll chaining. Avoid blanket `data-lenis-prevent` on horizontal-only tables; it contains both axes and can trap wheel scrolling.

## Section sizing

Use the `surface`, `surface-raised`, and `surface-muted` color tokens for the page canvas, controls/cards, and contrasting sections. These softened neutral backgrounds share the existing green palette; `accent` supplies a darker green for readable foregrounds. Keep white foregrounds on dark buttons and image overlays. The enterprise hero uses the same neutral canvas as the individual pages.

`page-intro` accounts for the fixed header and sizes to its content. The two home heroes retain their editorial layout. Secondary pages use `split-hero-grid`: equal-height copy and square-corner media columns, with `split-hero-grid--image-left` alternating the image side. Phones stack naturally with copy first. Short CTAs and accordions do not reserve an empty viewport. Long grids, forms, expanded accordions and articles grow naturally.

`section-space` adds 48px of top and bottom padding on phones, 72px from 640px, then scales from 72px to 112px on desktop (96px at 1440px). Compact strips use 32px on phones, 40px on tablets, and up to 56px on desktop. Hero spacing has separate tokens. Page gutters use 12px on phones, 24px from 640px, and 2.222vw on desktop, capped at 64px. Use these shared classes on page-level forms, resource grids, pricing plans, and CTAs instead of one-sided padding utilities.

Use `section-compact` for small notices and CTA strips and `section-flow` for deliberately continuous long content. Image frames use explicit aspect ratios, intrinsic dimensions, and per-photo focal points. Editorial grids combine portraits with landscape details without stretching either image or clipping captions. Avoid fixed heights or `overflow: hidden` on text-bearing sections.

Photo-and-detail sections use `story-split`: a square-corner photo and unboxed content in equal-height desktop columns. `equal-columns` also stretches paired form, calculator, and plan panels; mobile panels retain natural height. The enterprise home hero keeps its sticky media behavior, now with its supplied film. Never introduce an internal scrolling text panel.

`DirectionAwarePhoto` and `DirectionAwareFrame` move existing image captions into overlays, with image/text motion based on the pointer's entry edge. They support keyboard focus and show captions continuously on touch, reduced-motion, and paused-motion layouts. Keep collage media as a grid so its absolutely positioned images retain a height. Hero photos load eagerly with responsive half-width sources; lower images remain lazy.

Related-industry rails use `data-lenis-prevent-horizontal` with vertical overscroll chaining allowed. Blanket prevention here mixes native wheel scrolling with outstanding Lenis momentum and can produce backward jumps. Verify scrolling into the rail while momentum is still active, rather than testing only from a stationary position.

Shared primary and secondary buttons use responsive rectangular dimensions. Primary actions and active switches use dark green. Dark buttons reveal a pale-green fill with dark text on hover/focus; pale secondary actions reveal a dark fill with white text. Dark-band CTAs have a visible light border. Hover and keyboard focus move the custom directional mark from right to left without changing button width. The text and visible mark form one centered group with equal outer padding; synchronized incoming/outgoing icon widths preserve the group's total width during the transition. Adjust `--button-x` for local sizing instead of overriding the shared padding. Reduced or paused motion disables these transitions. Keep compact media controls, filters, and navigation toggles distinct from primary actions.

Forward actions and disclosure controls use the shared `ActionIcon`, a custom filled SVG mark with forward/back/up/down variants. Keep the button hover mask identical to that geometry. Text links use a shared underline reveal with keyboard-focus and reduced-motion support; header navigation is excluded and uses color to indicate its active route. Footer social links display the existing brand icons and platform names without boxed tiles.

`editorial-links` uses thin dividers and open columns for resource and platform links. `spotlight-grid` reveals existing details on hover or keyboard focus inside green panels. Touch layouts, reduced motion, and paused motion always show those details. Keep the existing content and evidence requirements; a visual treatment must never introduce fictional customer results or partners.

`ImageHoverPanels` gently expands photo panels on desktop hover or keyboard focus, with text always visible. Mobile layouts use a horizontal snap rail, and request details expand in normal flow. `ImageTimeline` switches a shared background on hover, focus, or tap; arrow keys navigate steps. It loads each step's photograph on first selection and retains the previous image until the next has loaded. Both patterns respect reduced and paused motion and reuse existing copy. The brief enterprise use-case carousel uses 16:9 photos capped at 480px rather than tall editorial frames.

CTA bands use a full-width green surface with a divided, equal-height detail column. Platform modules use accessible tabs and numbered photo-hover links. Workflow tiles and pale promise cards reuse existing titles and descriptions. Navbar active states include descendant routes; dropdown link hover/focus updates the summary and full-height image together.

Home films share `FilmPlayer`, `FilmControls`, and `useVideoPlayback`. Sources and captions belong to the individual/enterprise feature wrappers. Films reserve a 16:9 frame and use a WebP poster with `preload="none"`; automatic playback is muted and pauses offscreen or in background tabs. Reduced motion, paused animation, and Save-Data disable automatic playback while leaving explicit controls available. The individual hero separates copy from its layered film stage. That stage observes visibility and batches scroll updates into one animation frame, with no pinned spacer or React rerender per scroll event.

`SlidingPill` supplies one measured moving background for audience, billing/currency, blog, FAQ, and industry selections. It follows variable-width labels and wrapped rows, provides keyboard navigation, and falls back to an immediate selection for reduced/paused motion. Calculator boolean controls retain switch semantics.

`FormSelect` replaces visible OS dropdowns with a branded, portalled listbox. A hidden native select preserves required validation and FormData. The visible combobox supports arrow keys, type-ahead, Home/End, Escape, and touch; its popover follows the field, flips near viewport edges, and contains its own scrolling. Dropdown navigation descriptions crossfade in reserved-height layers; photographs remain visible until the next asset decodes. Explicit Close and Escape return focus to the menu trigger.

The shared FAQ uses numbered rows and a single expanded answer. Grid-row and opacity transitions animate natural answer heights; closed answers are inert and hidden from assistive technology. Category changes reset the open answer, and reduced/paused motion removes transitions. Preserve each variant's existing questions, answers, and support links.

## Validation

- `npm run check`: lint, TypeScript/build, prerender, and checks for complete HTML, landmarks, metadata and route chunks.
- `npm run format` / `npm run format:check`: consistent formatting.
- Browser verification should include production hydration, direct deep links, route switching/back/forward, keyboard/mobile menus, reduced motion, hashes, form success/error states with mocked APIs, and desktop/mobile overflow.

Screenshots and local browser audit artifacts remain in ignored `*.local` folders. Do not publish them as application assets.
