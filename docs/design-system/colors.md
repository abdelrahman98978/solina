# Color Tokens & Design System — Al Jabrani Motors

## 1. Brand Palette (Al Jabrani Blue Theme)

```css
:root {
  /* Brand Primary */
  --brand-primary: #1A56DB;         /* Vibrant Royal Blue - Main Actions & Highlights */
  --brand-primary-hover: #1546B8;   /* 10% Darker for Hover */
  --brand-primary-active: #0F3EAB;  /* 20% Darker for Pressed */
  
  /* Brand Secondary & Deep Navy */
  --brand-secondary: #0A266E;       /* Deep Luxury Navy - Accents & Footers */
  --brand-dark: #0A0E17;            /* Ultra Dark Slate - Cinema & Dark Sections */
  --brand-light: #EFF6FF;           /* Soft Sky Blue Tint - Background Badges */
  
  /* Backgrounds */
  --background-primary: #FFFFFF;    /* Pure White */
  --background-secondary: #F8FAFC;  /* Cool Light Gray Surface */
  --background-muted: #F1F5F9;      /* Slate Tint for Cards */
  
  /* Surfaces */
  --surface: #FFFFFF;
  --surface-hover: #F8FAFC;
  --surface-elevated: #FFFFFF;
  
  /* Text */
  --text-primary: #0F172A;          /* Charcoal Black - Headings & High Contrast Body */
  --text-secondary: #64748B;        /* Slate Gray - Descriptions & Secondary Meta */
  --text-muted: #94A3B8;            /* Light Muted Text - Captions & Placeholders */
  --text-inverse: #FFFFFF;          /* Crisp White on Dark Surfaces */
  
  /* Borders & Dividers */
  --border: #E2E8F0;                /* Subtle Card & Divider Border */
  --border-strong: #CBD5E1;         /* Interactive Inputs Border */
  --border-focus: #1A56DB;          /* 2px Solid Primary Blue Focus Ring */
  
  /* Status Colors */
  --success: #10B981;               /* Emerald Green - Hybrid & Confirmed */
  --warning: #F59E0B;               /* Amber Gold - Alerts & Limited Offers */
  --danger: #EF4444;                /* Crimson Red - Errors & Reset */
  --info: #3B82F6;                  /* Cerulean Blue - Informational Banners */
}
```

---

## 2. Accessibility & Contrast Ratios

- High contrast text (`--text-primary` #0F172A on `--background-primary` #FFFFFF): **16.2:1** (Exceeds WCAG AAA standard of 7:1).
- Interactive button contrast (`#FFFFFF` text on `--brand-primary` #1A56DB): **5.9:1** (Exceeds WCAG AA standard of 4.5:1).
- Focus Ring indicator: 2px solid with 2px offset (`outline: 2px solid var(--brand-primary); outline-offset: 2px;`).
