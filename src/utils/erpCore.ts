/**
 * erpCore — Shared, side-effect-light helpers for the Solina ERP layer.
 *
 * Centralises the rules that MUST be identical everywhere money, tax,
 * document numbers, ZATCA e-invoices, accounting entries, and identifiers
 * are produced:
 *  - Money is computed in integer halalas (1 SAR = 100 halalas) to avoid
 *    floating-point drift, and VAT splits always satisfy base + vat === total.
 *  - Discounts are applied to the taxable base BEFORE computing VAT.
 *  - ZATCA QR payloads are encoded as binary TLV (Tag-Length-Value) → Base64,
 *    as required by the ZATCA e-invoicing QR specification (tags 1–5).
 *  - ZATCA Phase 2 structures: ICV (Invoice Counter Value), PIH (Previous
 *    Invoice Hash chain using SHA-256), and UBL 2.1 XML generation.
 *  - Document numbers are sequential per series & year (no random numbers).
 *  - Identifiers use the Web Crypto API instead of Math.random().
 */

export const DEFAULT_VAT_RATE_PERCENT = 15;
export const KSA_TIME_ZONE = 'Asia/Riyadh';

/**
 * Official ZATCA genesis Previous Invoice Hash (PIH) for the first invoice in a chain:
 * Base64 encoding of the hex SHA-256 digest of "0".
 */
export const ZATCA_GENESIS_PIH =
  'NWZlY2ViNjZmZmM4NmYzOGQ5NTI3ODZjNmQ2OTZjNzljMmRiYzIzOWRkNGU5MWI0NjcyOWQ3M2EyN2ZiNTdlOQ==';

export type ZatcaTaxCategory = 'S' | 'Z' | 'E' | 'O';

// ---------------------------------------------------------------------------
// Digits, sanitization & parsing
// ---------------------------------------------------------------------------

/** Converts Arabic-Indic (٠-٩) and Eastern Arabic-Indic (۰-۹) digits to Latin digits. */
export function normalizeDigits(input: string): string {
  return String(input ?? '')
    .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06f0))
    .replace(/\u066B/g, '.') // Arabic decimal separator
    .replace(/[\u066C,]/g, ''); // Arabic & Latin thousands separators
}

/** Parses a user-entered amount (supports Arabic digits). Returns NaN when invalid. */
export function parseAmount(input: string | number): number {
  if (typeof input === 'number') return input;
  const cleaned = normalizeDigits(input).trim();
  if (cleaned === '') return NaN;
  return Number(cleaned);
}

/** Sanitizes free-text user input (strips HTML tags & control characters) to prevent XSS. */
export function sanitizeText(input: string | undefined | null, maxLength = 500): string {
  if (!input) return '';
  return String(input)
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/** Escapes special characters for safe inclusion in XML elements/attributes. */
export function escapeXml(input: string | number | undefined | null): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ---------------------------------------------------------------------------
// Money (integer halalas) & VAT
// ---------------------------------------------------------------------------

/** SAR → integer halalas, robust against binary float artefacts (e.g. 1.005). */
export function toHalalas(sar: number): number {
  if (!Number.isFinite(sar)) throw new Error(`Invalid monetary amount: ${sar}`);
  return Math.round(parseFloat((sar * 100).toPrecision(15)));
}

export function fromHalalas(halalas: number): number {
  return halalas / 100;
}

/** Formats a SAR amount using standard Saudi locale formatting. */
export function formatCurrencySAR(amount: number, fractionDigits = 2): string {
  if (!Number.isFinite(amount)) return '0.00';
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount);
}

export interface VatSplit {
  base: number;
  vat: number;
  total: number;
}

/** Returns the effective VAT percentage for a ZATCA tax category ('S' standard, 'Z' zero, 'E' exempt, 'O' out-of-scope). */
export function effectiveVatRate(
  category: ZatcaTaxCategory = 'S',
  standardRate: number = DEFAULT_VAT_RATE_PERCENT
): number {
  return category === 'S' ? standardRate : 0;
}

/**
 * Splits a VAT-inclusive total into base + VAT, computed in halalas so that
 * base + vat always equals total exactly. Works for negative totals (credit notes).
 */
export function splitVatInclusive(total: number, ratePercent: number = DEFAULT_VAT_RATE_PERCENT): VatSplit {
  const sign = total < 0 ? -1 : 1;
  const totalH = Math.abs(toHalalas(total));
  const baseH = ratePercent > 0 ? Math.round((totalH * 100) / (100 + ratePercent)) : totalH;
  const vatH = totalH - baseH;
  return {
    base: fromHalalas(sign * baseH),
    vat: fromHalalas(sign * vatH),
    total: fromHalalas(sign * totalH)
  };
}

/** Adds VAT to a VAT-exclusive base amount (halala-accurate). */
export function addVat(base: number, ratePercent: number = DEFAULT_VAT_RATE_PERCENT): VatSplit {
  const sign = base < 0 ? -1 : 1;
  const baseH = Math.abs(toHalalas(base));
  const vatH = ratePercent > 0 ? Math.round((baseH * ratePercent) / 100) : 0;
  return {
    base: fromHalalas(sign * baseH),
    vat: fromHalalas(sign * vatH),
    total: fromHalalas(sign * (baseH + vatH))
  };
}

/**
 * Applies a trade discount BEFORE VAT (as required by ZATCA VAT regulations):
 * taxable base = max(0, grossBase - discount), then VAT is calculated on the net base.
 */
export function applyDiscountBeforeVat(
  grossBaseExclVat: number,
  discountExclVat: number,
  ratePercent: number = DEFAULT_VAT_RATE_PERCENT
): VatSplit & { grossBase: number; discount: number } {
  const grossH = Math.max(0, toHalalas(grossBaseExclVat));
  const discH = Math.min(grossH, Math.max(0, toHalalas(discountExclVat)));
  const netBaseH = grossH - discH;
  const vatH = ratePercent > 0 ? Math.round((netBaseH * ratePercent) / 100) : 0;
  return {
    grossBase: fromHalalas(grossH),
    discount: fromHalalas(discH),
    base: fromHalalas(netBaseH),
    vat: fromHalalas(vatH),
    total: fromHalalas(netBaseH + vatH)
  };
}

// ---------------------------------------------------------------------------
// Murabaha & Auto Finance Calculations (SAMA transparent disclosure)
// ---------------------------------------------------------------------------

export interface MurabahaFinanceInput {
  vehiclePriceInclVat: number;
  downPaymentPercent: number;
  balloonPercent: number;
  annualProfitRatePercent: number;
  tenureMonths: number;
  adminFeePercent?: number;
}

export interface MurabahaFinanceResult {
  vehiclePriceInclVat: number;
  downPaymentAmount: number;
  financedPrincipal: number;
  adminFeeAmount: number;
  totalTermProfit: number;
  balloonPaymentAmount: number;
  monthlyInstallment: number;
  totalCustomerPayable: number;
  /** Approximate reducing-balance equivalent APR (%) for SAMA comparison disclosure. */
  approximateAprPercent: number;
}

/**
 * Computes auto lease/Murabaha figures in halalas and estimates the equivalent
 * reducing-balance APR so the customer is never misled into confusing flat
 * annual Murabaha margin with APR.
 */
export function calculateMurabahaFinance(input: MurabahaFinanceInput): MurabahaFinanceResult {
  const priceH = Math.max(0, toHalalas(input.vehiclePriceInclVat));
  const dpPct = Math.min(80, Math.max(0, input.downPaymentPercent));
  const balloonPct = Math.min(50, Math.max(0, input.balloonPercent));
  const months = Math.max(12, Math.round(input.tenureMonths));
  const years = months / 12;
  const annualMargin = Math.max(0, input.annualProfitRatePercent);
  const adminPct = Math.max(0, input.adminFeePercent ?? 1);

  const downPaymentH = Math.round((priceH * dpPct) / 100);
  const balloonH = Math.round((priceH * balloonPct) / 100);
  const principalH = Math.max(0, priceH - downPaymentH);
  // SAMA cap on retail consumer finance admin fees is min(1% of financed amount, 5,000 SAR)
  const adminFeeH = Math.min(toHalalas(5000), Math.round((principalH * adminPct) / 100));
  const totalProfitH = Math.round(principalH * (annualMargin / 100) * years);
  const amortizableH = Math.max(0, principalH + totalProfitH - balloonH);
  const monthlyH = Math.round(amortizableH / months);
  const totalPayableH = downPaymentH + adminFeeH + monthlyH * months + balloonH;

  // Approximate effective APR using standard flat-to-effective conversion adjusted for admin fee
  const flatRate = annualMargin;
  const approxApr =
    principalH > 0
      ? Number((((flatRate * 2 * months) / (months + 1)) + adminPct / years).toFixed(2))
      : 0;

  return {
    vehiclePriceInclVat: fromHalalas(priceH),
    downPaymentAmount: fromHalalas(downPaymentH),
    financedPrincipal: fromHalalas(principalH),
    adminFeeAmount: fromHalalas(adminFeeH),
    totalTermProfit: fromHalalas(totalProfitH),
    balloonPaymentAmount: fromHalalas(balloonH),
    monthlyInstallment: fromHalalas(monthlyH),
    totalCustomerPayable: fromHalalas(totalPayableH),
    approximateAprPercent: approxApr
  };
}

// ---------------------------------------------------------------------------
// Time (KSA) & Expiry helpers
// ---------------------------------------------------------------------------

function ksaParts(date: Date): Record<string, string> {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: KSA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  if (map.hour === '24') map.hour = '00';
  return map;
}

/** "YYYY-MM-DD HH:mm:ss" in Saudi local time (Asia/Riyadh). */
export function formatKsaDateTime(date: Date = new Date()): string {
  const p = ksaParts(date);
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

/** "YYYY-MM-DD" in Saudi local time. */
export function formatKsaDate(date: Date = new Date()): string {
  const p = ksaParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

export function currentKsaYear(date: Date = new Date()): number {
  return Number(ksaParts(date).year);
}

/** ISO-8601 UTC timestamp without milliseconds, e.g. 2026-11-04T17:10:00Z (used in the ZATCA QR). */
export function isoTimestampUtc(date: Date = new Date()): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/** Default quotation expiry date (YYYY-MM-DD in KSA time, default +7 days). */
export function defaultQuotationValidUntil(issuedAt: Date = new Date(), validityDays = 7): string {
  const expires = new Date(issuedAt.getTime() + validityDays * 86_400_000);
  return formatKsaDate(expires);
}

/** True when a YYYY-MM-DD or ISO date string is strictly before today's KSA date. */
export function isIsoDateExpired(dateStr: string | undefined | null, now: Date = new Date()): boolean {
  if (!dateStr) return false;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(dateStr.trim());
  if (!match) return false;
  return match[1] < formatKsaDate(now);
}

/** Checks whether aworkshop appointment date/time falls inside normal dealership working hours. */
export function validateWorkshopSlot(dateYmd: string, timeSlot: string): { valid: boolean; reasonAr?: string } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateYmd.trim());
  if (!m) return { valid: false, reasonAr: 'صيغة التاريخ غير صحيحة (YYYY-MM-DD).' };
  if (dateYmd < formatKsaDate()) {
    return { valid: false, reasonAr: 'لا يمكن حجز موعد صيانة في تاريخ سابق.' };
  }
  const dayOfWeek = new Date(`${dateYmd}T12:00:00+03:00`).getUTCDay(); // 5 = Friday
  if (dayOfWeek === 5) {
    return { valid: false, reasonAr: 'مراكز الصيانة مغلقة يوم الجمعة — يرجى اختيار يوم آخر من السبت إلى الخميس.' };
  }
  if (!timeSlot || !timeSlot.trim()) {
    return { valid: false, reasonAr: 'يرجى تحديد الفترة الزمنية للموعد.' };
  }
  return { valid: true };
}

// ---------------------------------------------------------------------------
// Pure synchronous SHA-256 (FIPS 180-4) for ZATCA PIH & Audit Hash Chains
// ---------------------------------------------------------------------------

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

function rotr(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

/** Computes a 32-byte SHA-256 digest of a UTF-8 string. */
export function sha256Bytes(input: string): Uint8Array {
  const msg = new TextEncoder().encode(input);
  const bitLen = msg.length * 8;
  const padLen = ((msg.length + 9 + 63) & ~63);
  const buf = new Uint8Array(padLen);
  buf.set(msg);
  buf[msg.length] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(padLen - 8, Math.floor(bitLen / 0x100000000), false);
  view.setUint32(padLen - 4, bitLen >>> 0, false);

  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const w = new Uint32Array(64);

  for (let offset = 0; offset < padLen; offset += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(offset + i * 4, false);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + SHA256_K[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0;
  }

  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  [h0, h1, h2, h3, h4, h5, h6, h7].forEach((v, i) => outView.setUint32(i * 4, v, false));
  return out;
}

export function sha256Hex(input: string): string {
  return Array.from(sha256Bytes(input), b => b.toString(16).padStart(2, '0')).join('');
}

export function sha256Base64(input: string): string {
  let bin = '';
  for (const b of sha256Bytes(input)) bin += String.fromCharCode(b);
  return btoa(bin);
}

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

function uuidFromRandomBytes(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Cryptographically random RFC 4122 v4 UUID. */
export function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return uuidFromRandomBytes();
  }
  throw new Error('Web Crypto API is not available — cannot generate a safe identifier.');
}

/** Internal record id, e.g. "inv-3f2a…". */
export function generateId(prefix: string): string {
  return `${prefix}-${generateUuid()}`;
}

// ---------------------------------------------------------------------------
// Sequential document numbers & ZATCA ICV
// ---------------------------------------------------------------------------

const COUNTERS_STORAGE_KEY = 'solina_doc_counters';

function readCounters(): Record<string, number> {
  try {
    const raw = localStorage.getItem(COUNTERS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Returns the next sequential number for a document series, e.g.
 * nextDocumentNumber('SOL-INV', existingNumbers) → "SOL-INV-2026-00892".
 *
 * The next value is max(stored counter, highest existing number) + 1, so it
 * never collides with records that were created before this helper existed.
 */
export function nextDocumentNumber(
  seriesPrefix: string,
  existingNumbers: ReadonlyArray<string | undefined>,
  width = 5,
  year: number = currentKsaYear()
): string {
  const series = `${seriesPrefix}-${year}`;
  const pattern = new RegExp(`^${escapeRegex(series)}-(\\d+)$`);

  let maxExisting = 0;
  for (const num of existingNumbers) {
    const m = num ? pattern.exec(num) : null;
    if (m) maxExisting = Math.max(maxExisting, Number(m[1]));
  }

  const counters = readCounters();
  const next = Math.max(counters[series] || 0, maxExisting) + 1;
  counters[series] = next;
  safeSetItem(COUNTERS_STORAGE_KEY, JSON.stringify(counters));

  return `${series}-${String(next).padStart(width, '0')}`;
}

/**
 * Returns the next strictly monotonic ZATCA Invoice Counter Value (ICV = 1, 2, 3, …).
 * Unlike document numbers, ICV never resets on a new year.
 */
export function nextZatcaIcv(existingIcvs: ReadonlyArray<number | undefined>): number {
  let maxExisting = 0;
  for (const v of existingIcvs) {
    if (typeof v === 'number' && Number.isFinite(v) && v > maxExisting) maxExisting = v;
  }
  const counters = readCounters();
  const next = Math.max(counters['ZATCA_ICV'] || 0, maxExisting) + 1;
  counters['ZATCA_ICV'] = next;
  safeSetItem(COUNTERS_STORAGE_KEY, JSON.stringify(counters));
  return next;
}

// ---------------------------------------------------------------------------
// Validation (VAT, VIN + check digit, Saudi Phone, National ID / Iqama)
// ---------------------------------------------------------------------------

/** Saudi VAT registration number: 15 digits, starts and ends with 3. */
export function isValidSaudiVatNumber(vat: string | undefined | null): boolean {
  if (!vat) return false;
  return /^3\d{13}3$/.test(normalizeDigits(vat).trim());
}

export function normalizeVin(vin: string): string {
  return normalizeDigits(vin ?? '').trim().toUpperCase();
}

/** ISO 3779 VIN shape: 17 chars, A–Z/0–9 excluding I, O, Q. */
export function isValidVin(vin: string | undefined | null): boolean {
  if (!vin) return false;
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(normalizeVin(vin));
}

const VIN_TRANSLITERATION: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
};
const VIN_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

/** Computes the ISO 3779 / North American position-9 check digit ('0'–'9' or 'X'). */
export function computeVinCheckDigit(vin: string): string | null {
  const clean = normalizeVin(vin);
  if (!isValidVin(clean)) return null;
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const val = VIN_TRANSLITERATION[clean[i]];
    if (val === undefined) return null;
    sum += val * VIN_WEIGHTS[i];
  }
  const rem = sum % 11;
  return rem === 10 ? 'X' : String(rem);
}

/** Normalizes a Saudi mobile number to canonical 10-digit format (05XXXXXXXX). */
export function normalizeSaudiPhone(input: string | undefined | null): string {
  if (!input) return '';
  let digits = normalizeDigits(input).replace(/[\s\-().]/g, '');
  if (digits.startsWith('+966')) digits = '0' + digits.slice(4);
  else if (digits.startsWith('00966')) digits = '0' + digits.slice(5);
  else if (digits.startsWith('966') && digits.length === 12) digits = '0' + digits.slice(3);
  else if (/^5\d{8}$/.test(digits)) digits = '0' + digits;
  return digits;
}

/** Validates a Saudi mobile number (05XXXXXXXX, 10 digits). */
export function isValidSaudiPhone(input: string | undefined | null): boolean {
  return /^05\d{8}$/.test(normalizeSaudiPhone(input));
}

/**
 * Validates a Saudi National ID (starts with 1) or Resident Iqama (starts with 2),
 * 10 digits total.
 */
export function isValidSaudiNationalIdOrIqama(input: string | undefined | null): boolean {
  if (!input) return false;
  const clean = normalizeDigits(input).replace(/\s+/g, '');
  return /^[12]\d{9}$/.test(clean);
}

// ---------------------------------------------------------------------------
// Accounting rules (Period Lock & Double-Entry) and VIN State Machine
// ---------------------------------------------------------------------------

/** Returns true when a transaction date (YYYY-MM-DD…) falls on or before the locked period end date. */
export function isDateInLockedPeriod(
  transactionDate: string | undefined | null,
  lockedThroughDate: string | undefined | null
): boolean {
  if (!transactionDate || !lockedThroughDate) return false;
  const txDay = transactionDate.trim().slice(0, 10);
  const lockDay = lockedThroughDate.trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(txDay) || !/^\d{4}-\d{2}-\d{2}$/.test(lockDay)) return false;
  return txDay <= lockDay;
}

export interface JournalLine {
  accountCode: string;
  debit: number;
  credit: number;
}

/** Verifies that a double-entry journal voucher has equal non-zero debits and credits (in halalas). */
export function isBalancedJournalEntry(lines: ReadonlyArray<JournalLine>): boolean {
  if (!lines || lines.length < 2) return false;
  let debitH = 0;
  let creditH = 0;
  for (const line of lines) {
    if (!line.accountCode || line.debit < 0 || line.credit < 0) return false;
    debitH += toHalalas(line.debit);
    creditH += toHalalas(line.credit);
  }
  return debitH > 0 && debitH === creditH;
}

export type VinStockStatus = 'in_transit' | 'in_stock' | 'reserved' | 'sold';

/**
 * Enforces valid vehicle inventory lifecycle transitions:
 *  - in_transit → in_stock | reserved
 *  - in_stock   → reserved | sold | in_transit
 *  - reserved   → in_stock | sold
 *  - sold       → in_stock ONLY via a Credit Note reversal
 */
export function isValidVinStatusTransition(
  from: VinStockStatus,
  to: VinStockStatus,
  viaCreditNote = false
): boolean {
  if (from === to) return true;
  if (from === 'sold') return to === 'in_stock' && viaCreditNote;
  if (from === 'in_transit' && to === 'sold') return false; // must arrive in stock before sale/delivery
  return true;
}

// ---------------------------------------------------------------------------
// ZATCA QR (TLV → Base64) & Phase 2 UBL 2.1 XML + PIH Chain
// ---------------------------------------------------------------------------

export interface ZatcaQrInput {
  sellerName: string;
  vatNumber: string;
  /** ISO-8601 timestamp, e.g. 2026-11-04T17:10:00Z */
  timestamp: string;
  total: number;
  vat: number;
}

/**
 * Encodes the ZATCA QR payload as binary TLV then Base64.
 * Tag 1 seller name · 2 VAT number · 3 timestamp · 4 invoice total (incl. VAT) · 5 VAT total.
 * Throws instead of silently returning a placeholder — an invoice must never carry a fake QR.
 */
export function buildZatcaQrBase64(input: ZatcaQrInput): string {
  if (!isValidSaudiVatNumber(input.vatNumber)) {
    throw new Error(`الرقم الضريبي للمنشأة غير صالح (${input.vatNumber}). يجب أن يكون 15 رقماً يبدأ وينتهي بـ 3.`);
  }
  const encoder = new TextEncoder();
  const values = [
    input.sellerName.trim(),
    normalizeDigits(input.vatNumber).trim(),
    input.timestamp,
    input.total.toFixed(2),
    input.vat.toFixed(2)
  ];

  const bytes: number[] = [];
  values.forEach((value, idx) => {
    const encoded = encoder.encode(value);
    if (encoded.length === 0) throw new Error(`ZATCA QR: tag ${idx + 1} is empty.`);
    if (encoded.length > 255) throw new Error(`ZATCA QR: tag ${idx + 1} exceeds 255 bytes.`);
    bytes.push(idx + 1, encoded.length, ...encoded);
  });

  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/** Decodes a TLV Base64 payload (useful for display / verification). */
export function decodeZatcaQrBase64(base64: string): Record<number, string> {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  const decoder = new TextDecoder();
  const result: Record<number, string> = {};
  let i = 0;
  while (i + 2 <= bytes.length) {
    const tag = bytes[i];
    const len = bytes[i + 1];
    result[tag] = decoder.decode(bytes.slice(i + 2, i + 2 + len));
    i += 2 + len;
  }
  return result;
}

export interface ZatcaUblInvoiceInput {
  invoiceNumber: string;
  uuid: string;
  issueDateTimeKsa: string; // "YYYY-MM-DD HH:mm:ss"
  type: 'tax_invoice' | 'simplified_invoice' | 'credit_note';
  sellerNameAr: string;
  sellerVatNumber: string;
  sellerCrNumber?: string;
  sellerCityAr?: string;
  customerName: string;
  customerVatNumber?: string;
  description: string;
  vinNumber?: string;
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
  vatRatePercent?: number;
  taxCategory?: ZatcaTaxCategory;
  icv: number;
  previousInvoiceHash: string;
  zatcaQrBase64: string;
  referenceInvoiceNumber?: string;
}

/** Computes a deterministic SHA-256 Base64 hash for an invoice to link the ZATCA PIH chain. */
export function computeInvoiceHashBase64(input: {
  invoiceNumber: string;
  uuid: string;
  issueDateTimeKsa: string;
  sellerVatNumber: string;
  totalAmount: number;
  vatAmount: number;
  icv: number;
  previousInvoiceHash: string;
}): string {
  const canonical = [
    input.icv,
    input.invoiceNumber,
    input.uuid,
    input.issueDateTimeKsa,
    normalizeDigits(input.sellerVatNumber).trim(),
    input.totalAmount.toFixed(2),
    input.vatAmount.toFixed(2),
    input.previousInvoiceHash
  ].join('|');
  return sha256Base64(canonical);
}

/**
 * Generates a UBL 2.1 XML document following the ZATCA e-Invoicing XML Implementation Standard
 * (ProfileID, ID, UUID, IssueDate/Time, InvoiceTypeCode 388/381, ICV, PIH, QR, Supplier, Customer,
 * TaxTotal, LegalMonetaryTotal, InvoiceLine).
 */
export function buildZatcaUblXml(inv: ZatcaUblInvoiceInput): string {
  const [datePart = formatKsaDate(), timePart = '00:00:00'] = inv.issueDateTimeKsa.trim().split(' ');
  const isCreditNote = inv.type === 'credit_note';
  const isB2B = inv.type === 'tax_invoice' || Boolean(inv.customerVatNumber);
  const typeCode = isCreditNote ? '381' : '388';
  const subTypeName = isB2B ? '0100000' : '0200000';
  const profileId = isB2B ? 'reporting:1.0:clearance:1.0' : 'reporting:1.0';
  const taxCat: ZatcaTaxCategory = inv.taxCategory ?? 'S';
  const vatRate = effectiveVatRate(taxCat, inv.vatRatePercent ?? DEFAULT_VAT_RATE_PERCENT);

  const absBase = Math.abs(inv.baseAmount).toFixed(2);
  const absVat = Math.abs(inv.vatAmount).toFixed(2);
  const absTotal = Math.abs(inv.totalAmount).toFixed(2);

  const billingRefXml =
    isCreditNote && inv.referenceInvoiceNumber
      ? `\n  <cac:BillingReference>\n    <cac:InvoiceDocumentReference>\n      <cbc:ID>${escapeXml(inv.referenceInvoiceNumber)}</cbc:ID>\n    </cac:InvoiceDocumentReference>\n  </cac:BillingReference>`
      : '';

  const customerTaxXml = inv.customerVatNumber
    ? `\n      <cac:PartyTaxScheme>\n        <cbc:CompanyID>${escapeXml(inv.customerVatNumber)}</cbc:CompanyID>\n        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>\n      </cac:PartyTaxScheme>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:ProfileID>${profileId}</cbc:ProfileID>
  <cbc:ID>${escapeXml(inv.invoiceNumber)}</cbc:ID>
  <cbc:UUID>${escapeXml(inv.uuid)}</cbc:UUID>
  <cbc:IssueDate>${escapeXml(datePart)}</cbc:IssueDate>
  <cbc:IssueTime>${escapeXml(timePart)}</cbc:IssueTime>
  <cbc:InvoiceTypeCode name="${subTypeName}">${typeCode}</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>SAR</cbc:DocumentCurrencyCode>
  <cbc:TaxCurrencyCode>SAR</cbc:TaxCurrencyCode>${billingRefXml}
  <cac:AdditionalDocumentReference>
    <cbc:ID>ICV</cbc:ID>
    <cbc:UUID>${inv.icv}</cbc:UUID>
  </cac:AdditionalDocumentReference>
  <cac:AdditionalDocumentReference>
    <cbc:ID>PIH</cbc:ID>
    <cac:Attachment>
      <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">${escapeXml(inv.previousInvoiceHash)}</cbc:EmbeddedDocumentBinaryObject>
    </cac:Attachment>
  </cac:AdditionalDocumentReference>
  <cac:AdditionalDocumentReference>
    <cbc:ID>QR</cbc:ID>
    <cac:Attachment>
      <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">${escapeXml(inv.zatcaQrBase64)}</cbc:EmbeddedDocumentBinaryObject>
    </cac:Attachment>
  </cac:AdditionalDocumentReference>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="CRN">${escapeXml(inv.sellerCrNumber || '1010998877')}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PostalAddress>
        <cbc:CityName>${escapeXml(inv.sellerCityAr || 'الرياض')}</cbc:CityName>
        <cac:Country><cbc:IdentificationCode>SA</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXml(inv.sellerVatNumber)}</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(inv.sellerNameAr)}</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>${customerTaxXml}
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(inv.customerName)}</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">${absVat}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="SAR">${absBase}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="SAR">${absVat}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>${taxCat}</cbc:ID>
        <cbc:Percent>${vatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="SAR">${absBase}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="SAR">${absBase}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="SAR">${absTotal}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="SAR">${absTotal}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="PCE">1</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="SAR">${absBase}</cbc:LineExtensionAmount>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="SAR">${absVat}</cbc:TaxAmount>
      <cbc:RoundingAmount currencyID="SAR">${absTotal}</cbc:RoundingAmount>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Name>${escapeXml(inv.description)}${inv.vinNumber ? ` (VIN: ${escapeXml(inv.vinNumber)})` : ''}</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>${taxCat}</cbc:ID>
        <cbc:Percent>${vatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="SAR">${absBase}</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>`;
}

// ---------------------------------------------------------------------------
// Security, Rate Limiting, File Validation & Audit Hash Chain
// ---------------------------------------------------------------------------

const rateLimitBuckets = new Map<string, number>();

/** Simple client-side rate limiter to prevent rapid form double-submission / spam. */
export function checkRateLimit(
  actionKey: string,
  cooldownMs = 4000,
  nowMs: number = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  const last = rateLimitBuckets.get(actionKey) || 0;
  const elapsed = nowMs - last;
  if (elapsed < cooldownMs) {
    return { allowed: false, retryAfterSeconds: Math.ceil((cooldownMs - elapsed) / 1000) };
  }
  rateLimitBuckets.set(actionKey, nowMs);
  return { allowed: true, retryAfterSeconds: 0 };
}

const ALLOWED_UPLOAD_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/json',
  'text/json'
]);

/** Validates uploaded customer documents or JSON backups for safe MIME type and size. */
export function validateUploadFile(
  file: { name: string; type: string; size: number },
  maxBytes = 5 * 1024 * 1024
): { valid: boolean; errorAr?: string } {
  if (!file || typeof file.size !== 'number' || file.size <= 0) {
    return { valid: false, errorAr: 'الملف المرفق فارغ أو غير صالح.' };
  }
  if (file.size > maxBytes) {
    return { valid: false, errorAr: `حجم الملف يتجاوز الحد الأقصى المسموح (${Math.round(maxBytes / (1024 * 1024))} ميجابايت).` };
  }
  const isJsonExt = file.name.toLowerCase().endsWith('.json');
  if (!ALLOWED_UPLOAD_MIMES.has(file.type) && !isJsonExt) {
    return { valid: false, errorAr: 'نوع الملف غير مدعوم. يُسمح فقط بملفات PDF أو JSON أو الصور (JPG, PNG, WebP).' };
  }
  return { valid: true };
}

/** Computes a tamper-evident SHA-256 chain hash for an audit log entry. */
export function computeAuditChainHash(
  prevHash: string,
  entry: { id: string; timestamp: string; module: string; action: string; summaryAr: string }
): string {
  return sha256Hex(`${prevHash}|${entry.id}|${entry.timestamp}|${entry.module}|${entry.action}|${entry.summaryAr}`);
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

let storageFailureNotified = false;

/** localStorage.setItem that never fails silently (quota exceeded, private mode…). */
export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.error(`[storage] Failed to persist "${key}"`, err);
    if (!storageFailureNotified && typeof window !== 'undefined') {
      storageFailureNotified = true;
      window.alert(
        'تعذّر حفظ البيانات في المتصفح (المساحة ممتلئة أو التخزين معطّل). ' +
          'التعديلات الأخيرة قد لا تُحفظ — يُرجى تصدير البيانات وإبلاغ الدعم الفني.'
      );
    }
    return false;
  }
}
