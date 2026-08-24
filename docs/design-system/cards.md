# Card System, Motion, & Responsive Breakpoints — Al Jabrani Motors

## 1. Card System Specifications

### Vehicle Explorer Card
- **Background**: Pure White `#FFFFFF`.
- **Dimensions**: Desktop width `340px`, Mobile width `100%`.
- **Internal Padding**: `24px` (`p-6`).
- **Image Stage**: `h-44` (176px), centered cutout with drop-shadow.
- **Micro-Interaction**: `group-hover:scale-105` on car image, `group-hover:text-blue-600` on title.
- **Actions**: Dual links `نظرة عامة ›` and `خيارات الشراء ›` separated by a 1px border.

### Campaign Offer Card
- **Aspect Ratio**: `16:10` banner format.
- **Image**: High-definition lifestyle render with `group-hover:scale-105` transition.
- **Bottom CTA**: Center-aligned pill button `اكتشف المزيد`.

### Discover Editorial Story Card
- **Aspect Ratio**: `2:3` tall vertical format.
- **Overlay**: Gradient from `black/85` at bottom to `transparent` at top.
- **Typography**: 2-line title with description clamp.

---

## 2. Motion Design Tokens

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-enter: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0.0, 1, 1);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Responsive Breakpoints

```css
:root {
  --bp-sm: 640px;   /* Large Phones / Phablets */
  --bp-md: 768px;   /* Tablets Portrait */
  --bp-lg: 1024px;  /* Tablets Landscape / Small Laptops */
  --bp-xl: 1280px;  /* Standard Desktop */
  --bp-2xl: 1536px; /* Ultra-Wide Screens */
}
```
