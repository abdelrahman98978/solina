# Toyota Saudi Arabia - Enterprise Admin Dashboard Plan

## Goal
Build a full-featured, enterprise-grade Admin Dashboard for Toyota Saudi Arabia (ALJ Motors) to manage live leads, test drives, express maintenance bookings, official quotation applications, fleet pricing CRUD, and executive KPI analytics.

## Tasks
- [ ] Task 1: Create `src/context/AdminDataContext.tsx` with unified state for fleet, bookings, service appointments, and quotations persisted in `localStorage`.
- [ ] Task 2: Build `src/components/admin/AdminDashboard.tsx` with sidebar navigation, responsive header, metrics bar, and tab orchestration.
- [ ] Task 3: Build `src/components/admin/AdminOverviewTab.tsx` with KPI cards, revenue charts, lead conversion metrics, and quick action queues.
- [ ] Task 4: Build `src/components/admin/AdminFleetTab.tsx` for vehicle fleet management, price editor, stock status toggles, and feature badges.
- [ ] Task 5: Build `src/components/admin/AdminLeadsTab.tsx` for Test Drives, Service Bookings, and Quotations pipeline management with live status toggles and direct WhatsApp/Phone actions.
- [ ] Task 6: Connect `TestDriveModal.tsx`, `ServiceBookingModal.tsx`, and `QuotationModal.tsx` to push submitted customer entries into the admin store.
- [ ] Task 7: Update `Header.tsx` and `App.tsx` to enable seamless switching between Customer Showroom and Admin Dashboard.
- [ ] Task 8: Run `npm run build` and verify all flows in the browser with Puppeteer.

## Done When
- [ ] Admin Dashboard is accessible directly from the header with a live badge.
- [ ] Any test drive or service booked on the public site immediately appears in the admin table.
- [ ] Fleet prices and stock can be edited and reflected across the app.
- [ ] `npm run build` compiles with 0 errors.
