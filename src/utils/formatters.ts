// file: utils/formatters.ts

/**
 * Parses a locale-specific numeric string (ID-ID) into a number.
 * Handles thousand separators (.) and decimal separators (,).
 * @param value The string to parse.
 * @returns A valid number or NaN if parsing is not possible.
 */
export function parseLocaleNumber(value: string): number {
  const cleanValue = String(value).replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue);
}

/**
 * Helper internal untuk memvalidasi nilai dan memberikan nilai fallback.
 * @param value Nilai yang bisa berupa angka atau string.
 * @param fallback Nilai default jika parsing gagal (default: 0).
 * @returns Angka yang valid atau nilai fallback.
 */
export function getValidNumber(value: number | string, fallback = 0): number {
  const num = typeof value === "string" ? parseLocaleNumber(value) : value;
  return isNaN(num) || !isFinite(num) ? fallback : num;
}

// --- FUNGSI-FUNGSI YANG DIEKSPOR ---

/**
 * Memformat angka atau string angka menjadi string dengan pemisah ribuan.
 * Contoh: 1000000 -> "1.000.000"
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  // Selalu format tanpa desimal untuk input
  return new Intl.NumberFormat("id-ID").format(numAmount);
}

/**
 * Memformat angka menjadi string mata uang lengkap dengan simbol "Rp" dan tanpa desimal.
 * Contoh: 1000000 -> "Rp 1.000.000"
 */
export function formatCurrencyDisplay(amount: number | string): string {
  const numAmount = getValidNumber(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

/**
 * Memformat angka menjadi persentase.
 * Contoh: 4.6 -> "4,6%"
 */
export function formatPercent(
  value: number | string,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const numValue = getValidNumber(value, 0);

  // --- PERBAIKAN LOGIKA ---
  // Tentukan digit min/max untuk mencegah error.
  const minDigits = options?.minimumFractionDigits ?? 1;
  // Pastikan maxDigits tidak pernah lebih kecil dari minDigits.
  // Jika maxDigits tidak diset, gunakan nilai yang lebih besar antara minDigits atau default (2).
  const maxDigits = options?.maximumFractionDigits ?? Math.max(minDigits, 2);

  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
  }).format(numValue / 100);
}

/**
 * Memformat tanggal ke format lokal Indonesia ("17 Juli 2025").
 */
export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Mengubah string input (termasuk yang diformat) kembali menjadi string angka mentah.
 * Contoh: "Rp 1.000.000" -> "1000000"
 * @param value - String yang akan di-parse.
 * @returns String yang hanya berisi angka.
 */
export function parseToNumericString(value: string): string {
  // Hanya simpan angka dari string
  return String(value).replace(/[^\d]/g, "");
}
