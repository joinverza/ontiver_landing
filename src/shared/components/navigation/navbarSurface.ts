/** Read the section beneath the floating CTA, ignoring the fixed navigation itself. */
export const navbarSurfaceIsDark = (header: HTMLElement, action: HTMLElement) => {
  const bounds = action.getBoundingClientRect();
  const x = Math.max(0, Math.min(window.innerWidth - 1, bounds.left + bounds.width / 2));
  const y = Math.max(0, Math.min(window.innerHeight - 1, bounds.top + bounds.height / 2));
  const behind = document
    .elementsFromPoint(x, y)
    .find((element) => !header.contains(element) && element !== header);
  let surface = behind?.closest("section, footer, main") ?? behind;

  // Composite transparent section backgrounds over their ancestors. This
  // follows the existing palette without maintaining a separate list of pages.
  let red = 0;
  let green = 0;
  let blue = 0;
  let remaining = 1;
  while (surface && remaining > 0.01) {
    const color = getComputedStyle(surface).backgroundColor;
    const channels = color.match(/[\d.]+/g)?.map(Number);
    if (channels && channels.length >= 3) {
      const alpha = channels[3] ?? 1;
      red += channels[0] * alpha * remaining;
      green += channels[1] * alpha * remaining;
      blue += channels[2] * alpha * remaining;
      remaining *= 1 - alpha;
    }
    surface = surface.parentElement ?? undefined;
  }
  const linear = (channel: number) => {
    const value = (channel + 255 * remaining) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue) < 0.35;
};
