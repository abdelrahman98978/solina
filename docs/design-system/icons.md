# Icon System Guidelines & Implementation — Al Jabrani Motors

## 1. Icon Technical Specifications

- **Box Size**: 24×24 pixel viewBox default.
- **Stroke Architecture**:
  - `strokeWidth={1.75}` on standard icons.
  - `strokeWidth={2.0}` on interactive active/hover states.
  - `strokeLinecap="round" strokeLinejoin="round" fill="none"`.
- **RTL Automatic Mirroring**:
  - Arrow icons (`ArrowLeft`, `ArrowRight`, `ChevronLeft`, `ChevronRight`) rotate 180° when `[dir="rtl"]` is active.

---

## 2. Core Icon Mappings

| System Name | Lucide Primitive | Purpose | Standard Size | RTL Behavior |
|---|---|---|---|---|
| `icon-service` | `Wrench` | Maintenance Booking | 24px | No Flip |
| `icon-location` | `MapPin` | Showrooms Locator | 24px | No Flip |
| `icon-offer` | `Tag` / `Sparkles` | Promotional Deals | 24px | No Flip |
| `icon-car` | `Car` | Test Drive & Models | 24px | No Flip |
| `icon-fuel` | `Fuel` | Fuel Economy (km/L) | 16px | No Flip |
| `icon-power` | `Gauge` | Horsepower & Engine | 16px | No Flip |
| `icon-passengers` | `Users` | Seating Capacity | 16px | No Flip |
| `icon-hybrid` | `Zap` | HEV Hybrid Tech | 16px | No Flip |
| `icon-sport` | `Flame` | GR Performance | 16px | No Flip |
| `icon-compare` | `Layers` | Vehicle Comparison | 16px | No Flip |
| `icon-favorite` | `Heart` | Add to Wishlist | 16px | No Flip |
| `icon-next` | `ChevronRight` | Slider Next Slide | 24px | Flipped in RTL |
| `icon-prev` | `ChevronLeft` | Slider Previous Slide | 24px | Flipped in RTL |
| `icon-pdf` | `Download` / `Printer` | PDF Quotation & Brochure | 16px | No Flip |
