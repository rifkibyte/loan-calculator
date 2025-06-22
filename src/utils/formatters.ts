export function formatCurrency(amount: number | string): string {
  const numAmount =
    typeof amount === "string" ? parseFloat(amount) || 0 : amount;

  if (isNaN(numAmount) || !isFinite(numAmount)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

export function formatCurrencyDisplay(amount: number | string): string {
  const numAmount =
    typeof amount === "string" ? parseFloat(amount) || 0 : amount;

  if (isNaN(numAmount) || !isFinite(numAmount)) {
    return "Rp 0";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

export function formatNumber(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  if (isNaN(numValue) || !isFinite(numValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numValue);
}

export function formatPercent(value: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return "0%";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

// Format angka dengan pemisah ribuan
export function formatThousands(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;

  if (isNaN(numValue) || !isFinite(numValue)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(numValue);
}

// Format tanggal ke format Indonesia
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Parse string currency back to number
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d]/g, "")) || 0;
}

// Format decimal number
export function formatDecimal(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) {
    return "0";
  }

  return value.toFixed(decimals);
}
