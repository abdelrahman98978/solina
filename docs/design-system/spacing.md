# Spacing, Radius, and Shadow Tokens — Al Jabrani Motors

## 1. Spacing Scale

```css
:root {
  --space-0: 0px;
  --space-1: 4px;    /* Micro gaps & icon margins */
  --space-2: 8px;    /* Compact element spacing */
  --space-3: 12px;   /* Standard padding & gap */
  --space-4: 16px;   /* Card internal padding */
  --space-5: 20px;   /* Medium section gaps */
  --space-6: 24px;   /* Large card padding */
  --space-8: 32px;   /* Grid gutters & module margins */
  --space-10: 40px;  /* Section header margins */
  --space-12: 48px;  /* Section internal vertical padding */
  --space-16: 64px;  /* Major section top/bottom padding */
  --space-20: 80px;  /* Deep section breathing room */
  --space-24: 96px;  /* Large hero spacing */
  --space-30: 120px; /* Full page transitions */
}
```

---

## 2. Border Radius Tokens

```css
:root {
  --radius-xs: 4px;    /* Badges & fine tags */
  --radius-sm: 8px;    /* Inputs & small dropdowns */
  --radius-md: 12px;   /* Standard buttons & sub-cards */
  --radius-lg: 16px;   /* Feature cards & interactive pills */
  --radius-xl: 24px;   /* Major vehicle cards & story modules */
  --radius-2xl: 32px;  /* Modals & large containers */
  --radius-full: 9999px; /* Pill buttons (`rounded-full`) & circular avatars */
}
```

---

## 3. Elevation & Shadow Tokens

```css
:root {
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-brand: 0 10px 25px -5px rgba(26, 86, 219, 0.25); /* Blue glow on primary CTA */
}
```
