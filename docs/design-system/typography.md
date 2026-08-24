# Typography Design Tokens & Guidelines — Al Jabrani Motors

## 1. Font Families Stack

```css
:root {
  --font-ar-primary: "Tajawal", "IBM Plex Sans Arabic", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-en-primary: "Inter", "Outfit", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: "Tajawal", "Outfit", sans-serif;
  --font-body: "Tajawal", "Inter", sans-serif;
  --font-mono: "Outfit", "Inter", ui-monospace, monospace;
}
```

---

## 2. Typographic Scale Matrix

| Token Name | Computed Size | Font Weight | Line Height | Mobile (390px) | Target Element |
|---|---|---|---|---|---|
| `--text-display-xl` | 44px (2.75rem) | 900 (Black) | 1.15 | 30px (1.875rem) | Main Section Titles (`استكشف جميع المركبات`) |
| `--text-display-lg` | 36px (2.25rem) | 900 (Black) | 1.2 | 26px (1.625rem) | Campaign & Editorial Headlines (`أحدث العروض`) |
| `--text-h1` | 30px (1.875rem) | 800 (ExtraBold) | 1.25 | 22px (1.375rem) | Modal Titles & Story Headers |
| `--text-h2` | 24px (1.5rem) | 800 (ExtraBold) | 1.3 | 20px (1.25rem) | Vehicle Card Model Names |
| `--text-h3` | 20px (1.25rem) | 700 (Bold) | 1.35 | 18px (1.125rem) | Card Subsections & Feature Titles |
| `--text-h4` | 16px (1rem) | 700 (Bold) | 1.4 | 15px (0.9375rem) | Quick Action Pill Titles |
| `--text-body-lg` | 16px (1rem) | 500 (Medium) | 1.6 | 14px (0.875rem) | Intro Descriptions & Guest Philosophy |
| `--text-body` | 14px (0.875rem) | 400 (Regular) | 1.5 | 13px (0.8125rem) | Standard Paragraphs & Technical Specs |
| `--text-body-sm` | 12px (0.75rem) | 400 (Regular) | 1.4 | 11px (0.6875rem) | Card Footers, Meta Pills, Disclaimers |
| `--text-caption` | 11px (0.6875rem) | 600 (SemiBold) | 1.3 | 10px (0.625rem) | Year Badges, Color Swatch Labels |
| `--text-button` | 14px (0.875rem) | 700 (Bold) | 1.0 | 13px (0.8125rem) | Pill Buttons & Action CTAs |
| `--text-price-lg` | 24px (1.5rem) | 900 (Black) | 1.1 | 20px (1.25rem) | Cash Price in Detail Modal |
| `--text-price-md` | 16px (1rem) | 900 (Black) | 1.1 | 15px (0.9375rem) | Starting Price in Vehicle Cards |

---

## 3. Font Optimization & Zero CLS

- Google Fonts imported via `<link rel="preconnect">` and `font-display: swap`.
- Fixed height containers for typography blocks to eliminate Cumulative Layout Shift (CLS).
