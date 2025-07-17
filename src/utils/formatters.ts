// file: utils/formatters.ts (improved)

/**
 * Helper internal untuk mem-parsing dan memvalidasi nilai input.
 * @param value - Nilai yang bisa berupa angka atau string.
 * @param fallback - Nilai default jika parsing gagal.
 * @returns Angka yang valid atau nilai fallback.
 */
function _parseAndValidate(value: number | string, fallback = 0): number {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  return isNaN(num) || !isFinite(num) ? fallback : num;
}

/**
 * Memformat angka menjadi string mata uang tanpa simbol (hanya pemisah ribuan).
 * Contoh: 1000000 -> "1.000.000"
 * @param amount - Jumlah yang akan diformat.
 * @returns String angka yang diformat.
 */
export function formatCurrency(amount: number | string): string {
  const numAmount = _parseAndValidate(amount);
  return new Intl.NumberFormat("id-ID").format(numAmount);
}

/**
 * Memformat angka menjadi string mata uang lengkap dengan simbol "Rp".
 * Contoh: 1000000 -> "Rp 1.000.000"
 * @param amount - Jumlah yang akan diformat.
 * @returns String mata uang yang diformat dengan simbol.
 */
export function formatCurrencyDisplay(amount: number | string): string {
  const numAmount = _parseAndValidate(amount);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

/**
 * Memformat angka menjadi persentase dengan 1-2 angka desimal.
 * Contoh: 4.6 -> "4,6%"
 * @param value - Angka yang akan diformat (misal: 4.6 untuk 4.6%).
 * @returns String persentase yang diformat.
 */
export function formatPercent(value: number | string): string {
  // Untuk persen, jika input tidak valid, lebih baik kembalikan string kosong atau 0%
  const numValue = _parseAndValidate(value, 0);
  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(numValue / 100);
}

/**
 * Memformat tanggal ke format lokal Indonesia.
 * Contoh: new Date() -> "17 Juli 2025"
 * @param date - Objek Date yang akan diformat.
 * @returns String tanggal yang diformat.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Mengubah string (termasuk yang diformat) kembali menjadi string angka mentah.
 * Berguna untuk menangani input dari pengguna.
 * Contoh: "Rp 1.000.000" -> "1000000"
 * @param value - String yang akan di-parse.
 * @returns String yang hanya berisi angka.
 */
export function parseToNumericString(value: string): string {
  // Hanya izinkan angka dan satu koma untuk desimal
  const numericString = value.replace(/[^\d,]/g, '').replace(',', '.');
  return numericString;
}
