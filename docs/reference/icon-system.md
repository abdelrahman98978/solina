# Icon System & Visual Weight Audit — Al Jabrani Motors

## 1. Icon Design Principles

- **Unified Grid**: 24×24 pixel viewBox default.
- **Stroke Architecture**:
  - `stroke-width: 1.75` (regular) / `2.0` (active/bold).
  - `stroke-linecap: round`.
  - `stroke-linejoin: round`.
  - `fill: none` (with intentional fill only on solid state items e.g., active favorite heart).
- **Color Inheritance**: Icons inherit `currentColor` by default for seamless hover and active transitions.
- **RTL Flipping**: Directional navigation arrows (`ArrowLeft`, `ArrowRight`, `ChevronLeft`, `ChevronRight`) flip automatically according to `dir="rtl"` / `dir="ltr"`.

---

## 2. Icon Categories Inventory

| Icon Name | Category | Purpose | Base Size | RTL Flip | Component File |
|---|---|---|---|---|---|
| `Wrench` | Service | Service Booking Quick Action | 24x24 | No | `QuickServicesBar.tsx` |
| `MapPin` | Service | Showrooms & Branch Locator | 24x24 | No | `ShowroomsSection.tsx` |
| `Tag` / `Sparkles` | Campaign | Latest Offers & Promotions | 24x24 | No | `OffersSection.tsx` |
| `Car` | Vehicle | Test Drive & Models Explorer | 24x24 | No | `ExploreVehicles.tsx` |
| `Fuel` | Spec | Fuel Economy (km/L) | 16x16 | No | `VehicleDetailModal.tsx` |
| `Gauge` | Spec | Engine Horsepower (HP) | 16x16 | No | `VehicleDetailModal.tsx` |
| `Users` | Spec | Passenger Capacity (Seats) | 16x16 | No | `VehicleDetailModal.tsx` |
| `Zap` | Tech | Hybrid Powertrain Indicator | 16x16 | No | `TechSimulator.tsx` |
| `Flame` | Tech | Gazoo Racing (GR) Sport | 16x16 | No | `GRPerformanceSection.tsx` |
| `ShieldCheck` | Trust | Warranty & Roadside Assistance | 20x20 | No | `GuestCommitmentSection.tsx` |
| `Calculator` | Finance | Installment & Loan Calculator | 20x20 | No | `FinanceCalculator.tsx` |
| `Layers` | Action | Add to Vehicle Comparison | 16x16 | No | `ComparisonDrawer.tsx` |
| `Heart` | Action | Add / Remove from Favorites | 16x16 | No | `ExploreVehicles.tsx` |
| `Search` | Navigation | Global Instant Vehicle Search | 20x20 | No | `Header.tsx` |
| `ChevronLeft` / `ChevronRight` | Navigation | Carousel & Slider Controls | 24x24 | Yes | `ExploreVehicles.tsx` |
| `Download` / `Printer` | Action | PDF Quote & Brochure Download | 16x16 | No | `QuotationModal.tsx` |
| `Phone` | Contact | Toll-Free Care `800 244 4400` | 16x16 | No | `Footer.tsx` |

---

## 3. Touch Target Standards

- All standalone icon buttons maintain a minimum interactive hit area of **44×44px** on touch devices for WCAG 2.1 AAA compliance.
