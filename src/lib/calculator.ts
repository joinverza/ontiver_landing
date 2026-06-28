export function parseAmount(value: string) {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function mixColor(value: number) {
  const progress = value / 100;
  const gray = [107, 114, 128];
  const green = [0, 147, 17];
  const channel = (index: number) =>
    Math.round(gray[index] + (green[index] - gray[index]) * progress);

  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}
