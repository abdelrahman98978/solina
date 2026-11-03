import React from 'react';

/**
 * Official Saudi Central Bank (SAMA) Saudi Riyal Symbol Component & Utilities
 * Reference: https://sama.gov.sa/ar-sa/Currency/SRS/Documents/Guidelines.pdf
 *
 * Implements all 10 SAMA Usage Rules (قواعد استخدام رمز الريال السعودي):
 * 1. Position (الموقع): Always positioned to the left of the numeral for all languages.
 * 2. Spacing (المسافة): A clear space is required between the symbol and the numeral.
 * 3. Written Value (القيمة المكتوبة): Positioned to the left of the written value.
 * 4. Negative Value (القيمة السالبة): Positioned to the left of the minus sign and the numeral.
 * 5. Proportions (التناسب): Exact 425:475 aspect ratio maintained without distortion.
 * 6. Geometry (البنية الهندسية): Official SAMA geometric structure (X.425 × X.475, R.350, R.90, R.50, 78°/102°/12°).
 * 7. Alignment (المحاذاة): Symbol height aligned with the cap-height of the accompanying text/numerals.
 * 8. Direction (الاتجاه): Symbol direction is never flipped/mirrored horizontally.
 * 9. Negative Space (المساحة الخالية): Clear space >= 1/3 of symbol height when enclosed inside shapes/badges.
 * 10. Contrast (تباين الألوان): Inherits currentColor for high contrast against any background.
 */

export const SAUDI_RIYAL_UNICODE = '\u20C1'; // Official Unicode 17.0 Saudi Riyal Sign (⃁)
export const SAUDI_RIYAL_SYMBOL = '\u200E\u20C1'; // LRM + ⃁ to guarantee left-side placement in both RTL & LTR

export const SAMA_RIYAL_PATH_1 =
  'M264.50 420.80 L264.50 420.80 C256.92 437.61 251.91 455.86 249.98 475.00 L410.48 440.88 C418.07 424.07 423.07 405.82 425.00 386.68 Z';

export const SAMA_RIYAL_PATH_2 =
  'M410.48 338.67 C418.07 321.86 423.08 303.61 425.00 284.47 L299.98 311.06 L299.98 259.95 L410.48 236.47 C418.07 219.65 423.08 201.40 425.00 182.26 L299.98 208.83 L299.98 25.00 C280.82 35.76 263.81 50.07 249.98 66.96 L249.98 219.46 L199.98 230.08 L199.98 0.00 C180.82 10.75 163.81 25.07 149.98 41.96 L149.98 240.71 L38.11 264.48 C30.52 281.30 25.51 299.55 23.58 318.69 L149.98 291.82 L149.98 356.19 L14.52 384.98 C6.93 401.80 1.92 420.05 0.00 439.18 L141.79 409.05 C153.34 406.65 163.25 399.83 169.71 390.44 L195.71 351.88 L195.71 351.88 C198.41 347.89 199.98 343.08 199.98 337.90 L199.98 281.20 L249.98 270.57 L249.98 372.80 Z';

export const SAUDI_RIYAL_SVG_INLINE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 475" fill="currentColor" style="display:inline-block;height:0.86em;width:auto;vertical-align:-0.06em;margin-right:0.25em;flex-shrink:0;transform:none;" aria-label="Saudi Riyal"><path d="${SAMA_RIYAL_PATH_1}"/><path d="${SAMA_RIYAL_PATH_2}"/></svg>`;

export interface SaudiRiyalSymbolProps {
  className?: string;
  /** Height relative to current font size (Rule 7: aligned with text height, default '0.86em') */
  size?: string | number;
  /** Rule 9: Adds clear space equal to 1/3 of symbol height when enclosed inside shapes/badges */
  enclosed?: boolean;
  title?: string;
}

export const SaudiRiyalSymbol: React.FC<SaudiRiyalSymbolProps> = ({
  className = '',
  size = '0.86em',
  enclosed = false,
  title = 'الريال السعودي (SAR)'
}) => {
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 425 475"
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title}
      data-sama-srs="true"
      className={`inline-block shrink-0 select-none ${className}`}
      style={{
        height: typeof size === 'number' ? `${size}px` : size,
        width: 'auto',
        aspectRatio: '425 / 475',
        verticalAlign: '-0.06em',
        transform: 'none',
        direction: 'ltr'
      }}
    >
      <title>{title}</title>
      <path d={SAMA_RIYAL_PATH_1} />
      <path d={SAMA_RIYAL_PATH_2} />
    </svg>
  );

  if (enclosed) {
    return (
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ padding: '0.34em' }}
      >
        {svg}
      </span>
    );
  }

  return svg;
};

export interface SaudiRiyalPriceProps {
  /** Numeric or pre-formatted value */
  amount: number | string;
  /** Optional suffix after the numeral, e.g. '/شهر', '/mo', 'مليون', 'million' */
  suffix?: React.ReactNode;
  /** Optional className for the outer wrapper */
  className?: string;
  /** Optional className for the symbol SVG */
  symbolClassName?: string;
  /** Optional className for the suffix */
  suffixClassName?: string;
  /** Force sign prefix '+' or '-' */
  sign?: '+' | '-';
  /** Show '+' prefix when amount is non-negative */
  showPlus?: boolean;
  /** Enclose symbol with 1/3 clear space (Rule 9) */
  enclosedSymbol?: boolean;
}

/**
 * Renders a monetary amount strictly adhering to SAMA Usage Rules 1–10:
 * - Rule 1: Symbol always positioned to the visual LEFT of the numeral for all languages (`dir="ltr"`).
 * - Rule 2: Mandatory space (`0.26em`) between symbol and numeral.
 * - Rule 3: Symbol positioned to the left of written values (e.g., `[Symbol] 123 million`).
 * - Rule 4: Symbol positioned to the left of the minus sign and numeral (`[Symbol] -123`).
 * - Rule 7: Symbol height matches the numeral height (`0.86em` cap-height).
 */
export const SaudiRiyalPrice: React.FC<SaudiRiyalPriceProps> = ({
  amount,
  suffix,
  className = '',
  symbolClassName = '',
  suffixClassName = '',
  sign,
  showPlus = false,
  enclosedSymbol = false
}) => {
  let displayNum: string;
  let isNegative = sign === '-';

  if (typeof amount === 'number') {
    if (amount < 0) isNegative = true;
    displayNum = Math.abs(amount).toLocaleString('en-US');
  } else {
    const raw = String(amount).trim();
    if (raw.startsWith('-')) {
      isNegative = true;
      displayNum = raw.slice(1).trim();
    } else if (raw.startsWith('+')) {
      displayNum = raw.slice(1).trim();
    } else {
      displayNum = raw;
    }
  }

  const prefixSign = isNegative ? '-' : sign === '+' || showPlus ? '+' : '';

  return (
    <span
      dir="ltr"
      data-no-auto-translate="true"
      className={`inline-flex items-baseline whitespace-nowrap ${className}`}
      style={{ gap: '0.26em', unicodeBidi: 'isolate' }}
    >
      <SaudiRiyalSymbol className={symbolClassName} enclosed={enclosedSymbol} />
      <span>
        {prefixSign}
        {displayNum}
      </span>
      {suffix !== undefined && suffix !== null && suffix !== '' && (
        <span className={suffixClassName}>{suffix}</span>
      )}
    </span>
  );
};

/**
 * Formats a plain-text Saudi Riyal string with the official symbol positioned to the left
 * and separated by a space, protected with Unicode Left-to-Right Isolate/Mark for RTL & LTR.
 * Example: "\u200E⃁ 125,000" or "\u200E⃁ -1,250"
 */
export function formatSaudiRiyalText(
  amount: number | string,
  suffix?: string
): string {
  let isNeg = false;
  let formatted: string;

  if (typeof amount === 'number') {
    isNeg = amount < 0;
    formatted = Math.abs(amount).toLocaleString('en-US');
  } else {
    const raw = String(amount).trim();
    if (raw.startsWith('-')) {
      isNeg = true;
      formatted = raw.slice(1).trim();
    } else {
      formatted = raw;
    }
  }

  const numPart = isNeg ? `-${formatted}` : formatted;
  const suffixPart = suffix ? ` ${suffix}` : '';
  return `\u200E\u20C1 ${numPart}${suffixPart}`;
}

/**
 * Formats an HTML string with the inline SAMA vector SVG positioned to the left of the numeral.
 * Ideal for printable reports, ZATCA tax invoices, quotations, and HTML/PDF/Word exports.
 */
export function formatSaudiRiyalHtml(
  amount: number | string,
  suffix?: string
): string {
  let isNeg = false;
  let formatted: string;

  if (typeof amount === 'number') {
    isNeg = amount < 0;
    formatted = Math.abs(amount).toLocaleString('en-US');
  } else {
    const raw = String(amount).trim();
    if (raw.startsWith('-')) {
      isNeg = true;
      formatted = raw.slice(1).trim();
    } else {
      formatted = raw;
    }
  }

  const numPart = isNeg ? `-${formatted}` : formatted;
  const suffixPart = suffix ? ` <span>${suffix}</span>` : '';
  return `<span dir="ltr" style="display:inline-flex;align-items:baseline;gap:0.25em;white-space:nowrap;unicode-bidi:isolate;">${SAUDI_RIYAL_SVG_INLINE}<span>${numPart}</span>${suffixPart}</span>`;
}
