export function formatPrice(value: number | null) {
  if (value === null) return "Custom";
  if (value === 0) return "$0";
  return `$${Math.round(value).toLocaleString()}`;
}
