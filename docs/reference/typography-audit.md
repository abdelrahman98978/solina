# Typography Audit & Design Tokens — Al Jabrani Motors

## 1. Font Family Stacks

```css
/* Arabic Primary */
--font-ar-primary: 'IBM Plex Sans Arabic', 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif;

/* English Primary */
--font-en-primary: 'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;

/* Display Font (Headings & Hero) */
--font-display: 'IBM Plex Sans Arabic', 'Outfit', sans-serif;

/* Monospace (Prices, Numbers, Specs) */
--font-mono: 'Outfit', 'Inter', ui-monospace, monospace;
```

---

## 2. Typographic Scale Hierarchy

| Token | Arabic Font Size | English Font Size | Weight | Line Height | Letter Spacing | Target Usage |
|---|---|---|---|---|---|---|
| `--text-display-2xl` | 56px (3.5rem) | 56px (3.5rem) | 900 (Black) | 1.1 | -0.02em | Main Hero Title |
| `--text-display-xl` | 44px (2.75rem) | 44px (2.75rem) | 900 (Black) | 1.15 | -0.015em | Major Section Headings (`استكشف جميع المركبات`) |
| `--text-h1` | 36px (2.25rem) | 36px (2.25rem) | 800 (ExtraBold) | 1.2 | -0.01em | Modal Titles & Campaign Headlines |
| `--text-h2` | 28px (1.75rem) | 28px (1.75rem) | 800 (ExtraBold) | 1.25 | normal | Section Subtitles & Story Titles |
| `--text-h3` | 22px (1.375rem) | 22px (1.375rem) | 700 (Bold) | 1.3 | normal | Vehicle Card Model Names |
| `--text-h4` | 18px (1.125rem) | 18px (1.125rem) | 700 (Bold) | 1.35 | normal | Subsection & Feature Titles |
| `--text-body-lg` | 16px (1rem) | 16px (1rem) | 400 / 500 | 1.6 | normal | Lead Paragraphs & Intro Copy |
| `--text-body` | 14px (0.875rem) | 14px (0.875rem) | 400 (Regular) | 1.5 | normal | Standard Paragraphs, Specs Descriptions |
| `--text-body-sm` | 12px (0.75rem) | 12px (0.75rem) | 400 / 500 | 1.4 | normal | Footnotes, Meta Badges, Microcopy |
| `--text-caption` | 11px (0.6875rem) | 11px (0.6875rem) | 600 (SemiBold) | 1.3 | 0.02em | Badges, Timestamps, Table Headers |
| `--text-button` | 14px (0.875rem) | 14px (0.875rem) | 700 (Bold) | 1.0 | 0.01em | Primary & Secondary CTAs |
| `--text-nav` | 14px (0.875rem) | 14px (0.875rem) | 700 (Bold) | 1.0 | normal | Main Navigation Links |
| `--text-price-lg` | 24px (1.5rem) | 24px (1.5rem) | 900 (Black) | 1.1 | normal | Vehicle Detail Cash Price |
| `--text-price-md` | 18px (1.125rem) | 18px (1.125rem) | 900 (Black) | 1.1 | normal | Vehicle Card Starting Price |
| `--text-price-sm` | 13px (0.8125rem) | 13px (0.8125rem) | 700 (Bold) | 1.1 | normal | Estimated Monthly Installments |

---

## 3. Font Weights Mapping

- `300`: Light (Subtle captions & subtitles)
- `400`: Regular (Body text & paragraphs)
- `500`: Medium (Navigation links & UI labels)
- `600`: SemiBold (Badges, table headers, interactive chips)
- `700`: Bold (Buttons, tab labels, card titles)
- `800`: ExtraBold (Section headings, modal titles)
- `900`: Black (Brand headings, vehicle names, prices)

---

## 4. Performance & Font Loading Rules

- `font-display: swap` applied to all Google Web Fonts.
- Preconnect tags for `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
- Zero cumulative layout shift (CLS) through fixed line-height metrics.
