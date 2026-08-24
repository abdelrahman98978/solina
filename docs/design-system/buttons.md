# Buttons, Cards, Motion & Responsive Systems — Al Jabrani Motors

## 1. Button Variant Hierarchy

| Variant | Styles | Border / Radius | Hover / Active State | Target Usage |
|---|---|---|---|---|
| **Primary Pill** | `bg-blue-600 text-white font-bold` | `rounded-full` / None | `hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/20` | Section Main Action (`عرض جميع المركبات`, `استكشف المزيد`) |
| **Secondary Pill** | `border-2 border-gray-900 text-gray-900 font-bold` | `rounded-full` | `hover:bg-gray-900 hover:text-white transition-all` | Secondary Exploration Action (`استكشف المزيد من العروض`) |
| **Quick Action Pill** | `bg-white border border-gray-300 text-gray-800` | `rounded-full` | `hover:bg-blue-600 hover:text-white hover:border-blue-600` | Quick Actions Hub (`حجز خدمة`, `ابحث عن مركز`) |
| **Standard CTA** | `bg-blue-600 text-white font-bold text-xs` | `rounded-xl` | `hover:bg-blue-500 transition-colors` | Card Action Buttons (`حجز تجربة قيادة`, `طلب عرض سعر`) |
| **Ghost / Link** | `text-gray-900 hover:text-blue-600` | None | `hover:translate-x-1 font-bold text-sm` | Card Drill-down (`نظرة عامة ›`, `خيارات الشراء ›`) |
| **Circular Icon** | `w-11 h-11 bg-white border border-gray-200` | `rounded-full` | `hover:bg-blue-600 hover:text-white shadow-lg` | Carousel navigation arrows & Modal Close |

---

## 2. Card Composition Standards

- **Vehicle Card**:
  - Background: Pure White (`#FFFFFF`).
  - Padding: `p-6` (24px).
  - Top text: Bold Model Name + Starting Price with SAR token.
  - Center: High-res cutout transparent vehicle image (`h-44`, `object-contain`).
  - Bottom: Twin action links (`نظرة عامة ›`, `خيارات الشراء ›`) separated by subtle divider.
  - Hover: Elevation to `shadow-xl` with smooth image scale `group-hover:scale-105`.
- **Offer Card**:
  - Aspect Ratio: `16:10` cinematic banner.
  - Image: Full bleed background with bottom gradient overlay (`from-black/60 to-transparent`).
  - CTA: Center-bottom pill button with smooth hover scale.
- **Discover Story Card**:
  - Aspect Ratio: `2:3` tall vertical format.
  - Background: Full bleed image with `from-black/85 via-black/30` gradient overlay.
  - Typography: Crisp white title and subtitle aligned to bottom with `line-clamp-2`.

---

## 3. Motion & Animation Tokens

```css
:root {
  --duration-fast: 150ms;    /* Button hover & pill transitions */
  --duration-normal: 300ms;  /* Card hover, modal zoom, tab indicator */
  --duration-slow: 600ms;    /* Carousel slide transition, hero fade */
  
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1); /* Material Deceleration */
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1); /* Pop/Zoom entrance */
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Responsive Breakpoints Scale

| Breakpoint Token | Min Width | Target Devices | Grid Columns | Gutter |
|---|---|---|---|---|
| `--bp-xs` | 0px | Small Mobile (iPhone SE, Galaxy A) | 1 Column | 16px |
| `--bp-sm` | 640px | Large Mobile & Small Tablets | 1 - 2 Columns | 16px |
| `--bp-md` | 768px | Tablets Portrait (iPad) | 2 Columns | 24px |
| `--bp-lg` | 1024px | Tablets Landscape & Laptops | 3 Columns | 24px |
| `--bp-xl` | 1280px | Standard Desktop (1440x900) | 3 - 4 Columns | 32px |
| `--bp-2xl` | 1536px | Ultra-wide Desktop (1920x1080) | 4 Columns | 32px |
