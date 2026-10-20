import React, { useState } from 'react';
import { 
  Users, 
  Car, 
  Wrench, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  Phone,
  Building2,
  Layers,
  ShieldCheck,
  QrCode,
  Tag,
  Printer,
  Sliders,
  Filter
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdminTabType, LeadsSubTabType } from './AdminDashboard';

interface AdminOverviewTabProps {
  onSwitchTab: (tab: AdminTabType | LeadsSubTabType) => void;
}

type PeriodFilter = 'today' | 'week' | 'month' | 'quarter' | 'year';

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ onSwitchTab }) => {
  const {
    stats,
    testDrives,
    serviceAppointments,
    quotations,
    zatcaInvoices,
    vehicles,
    showrooms,
    cpoVehicles,
    spareParts,
    partQuantities
  } = useAdminData();
  const { language, formatPrice } = useLanguage();
  const [period, setPeriod] = useState<PeriodFilter>('month');

  // Period multiplier for executive BI simulation
  const periodFactor: Record<PeriodFilter, { mult: number; labelAr: string; labelEn: string }> = {
    today: { mult: 0.18, labelAr: 'اليوم', labelEn: 'Today' },
    week: { mult: 0.45, labelAr: 'آخر 7 أيام', labelEn: '7 Days' },
    month: { mult: 1.0, labelAr: 'هذا الشهر', labelEn: 'This Month' },
    quarter: { mult: 2.8, labelAr: 'الربع الحالي', labelEn: 'Quarter' },
    year: { mult: 8.5, labelAr: 'عام 2026', labelEn: 'Full Year 2026' }
  };

  const activeFactor = periodFactor[period];
  const scaledSalesSAR = Math.round(stats.totalInvoicedSalesSAR * activeFactor.mult);
  const scaledVatSAR = Math.round(stats.totalVatCollectedSAR * activeFactor.mult);
  const scaledPipelineSAR = Math.round(stats.totalPipelineValueSAR * activeFactor.mult);
  const scaledWorkshopSAR = Math.round(stats.workshopRevenueSAR * activeFactor.mult);

  const recentTestDrives = testDrives.slice(0, 4);
  const recentServices = serviceAppointments.slice(0, 4);
  const recentInvoices = zatcaInvoices.slice(0, 3);

  const kpis = [
    {
      id: 'zatca-sales',
      titleAr: `مبيعات الفواتير الضريبية (${activeFactor.labelAr})`,
      titleEn: `ZATCA Invoiced Sales (${activeFactor.labelEn})`,
      value: `${formatPrice(scaledSalesSAR)} ر.س`,
      subtextAr: `${stats.totalInvoicesCount} فاتورة معتمدة • ضريبة VAT: ${formatPrice(scaledVatSAR)} ر.س`,
      subtextEn: `${stats.totalInvoicesCount} cleared invoices`,
      icon: QrCode,
      isFeatured: true,
      popularBadge: language === 'ar' ? 'مباشر ZATCA' : 'ZATCA Live',
      tab: 'zatca' as const
    },
    {
      id: 'test-drives',
      titleAr: 'طلبات تجارب القيادة',
      titleEn: 'Test Drive Requests',
      value: stats.totalTestDrives,
      subtextAr: `${stats.newTestDrivesCount} طلب جديد يحتاج للمتابعة`,
      subtextEn: `${stats.newTestDrivesCount} new requests pending`,
      icon: Users,
      isFeatured: false,
      popularBadge: stats.newTestDrivesCount > 0 ? `${stats.newTestDrivesCount} جديد` : undefined,
      tab: 'test_drives' as const
    },
    {
      id: 'services',
      titleAr: 'حجوزات الصيانة السريعة',
      titleEn: 'Express Maintenance',
      value: stats.totalServices,
      subtextAr: `${stats.pendingServicesCount} موعد صيانة بانتظار الاعتماد`,
      subtextEn: `${stats.pendingServicesCount} appointments pending`,
      icon: Wrench,
      isFeatured: false,
      tab: 'services' as const
    },
    {
      id: 'quotations',
      titleAr: 'عروض الأسعار والتمويل',
      titleEn: 'Quotations & Finance',
      value: stats.totalQuotations,
      subtextAr: `خط المبيعات: ${formatPrice(scaledPipelineSAR)} ر.س`,
      subtextEn: `Pipeline: SAR ${formatPrice(scaledPipelineSAR)}`,
      icon: FileText,
      isFeatured: false,
      tab: 'quotations' as const
    },
    {
      id: 'vin-stock',
      titleAr: 'مخزون الشاسيه (VIN Stock)',
      titleEn: 'VIN Warehouse Stock',
      value: `${stats.totalVinStockCount} مركبة`,
      subtextAr: `${stats.inStockVinCount} جاهزة • ${stats.agingVinCount > 0 ? `${stats.agingVinCount} متقادمة (+45 يوم)` : `${stats.inTransitVinCount} في الشحن`}`,
      subtextEn: `${stats.inStockVinCount} in stock • ${stats.inTransitVinCount} in transit`,
      icon: Layers,
      isFeatured: false,
      popularBadge: stats.agingVinCount > 0 ? `${stats.agingVinCount} +45 يوم` : undefined,
      tab: 'vin_inventory' as const
    },
    {
      id: 'workshop-jobs',
      titleAr: 'أوامر العمل بالورشة (Job Cards)',
      titleEn: 'Active Workshop Job Cards',
      value: `${stats.activeJobCardsCount + stats.readyJobCardsCount} كرت عمل`,
      subtextAr: `${stats.readyJobCardsCount} جاهزة للتسليم • إيراد: ${formatPrice(scaledWorkshopSAR)} ر.س`,
      subtextEn: `${stats.readyJobCardsCount} ready for handover`,
      icon: Wrench,
      isFeatured: false,
      tab: 'workshop' as const
    },
    {
      id: 'fleet-models',
      titleAr: 'طرازات أسطول سولينا 2026',
      titleEn: '2026 Solina Fleet Models',
      value: `${stats.totalFleetCount} طراز`,
      subtextAr: `${stats.totalCPOCount} سيارة مستعملة معتمدة AutoHub`,
      subtextEn: `${stats.totalCPOCount} Certified Pre-Owned units`,
      icon: Car,
      isFeatured: false,
      tab: 'fleet' as const
    },
    {
      id: 'active-campaigns',
      titleAr: 'العروض وقطع الغيار والفروع',
      titleEn: 'Campaigns, Parts & Network',
      value: `${stats.totalOffersCount} عروض نشطة`,
      subtextAr: `${stats.totalShowroomsCount} فروع • ${stats.lowStockPartsCount > 0 ? `${stats.lowStockPartsCount} قطع منخفضة المخزون` : `${stats.totalPartsCount} قطعة أصلية`}`,
      subtextEn: `${stats.totalShowroomsCount} branches • ${stats.totalPartsCount} OEM parts`,
      icon: Tag,
      isFeatured: false,
      popularBadge: stats.lowStockPartsCount > 0 ? `تنبيه مخزون` : undefined,
      tab: 'parts' as const
    }
  ];

  // Category Breakdown for visual bar analytics
  const suvCount = vehicles.filter(v => v.category === 'suv').length;
  const sedanCount = vehicles.filter(v => v.category === 'sedan' || v.category === 'gr').length;
  const commercialCount = vehicles.filter(v => v.category === 'commercial').length;
  const totalV = Math.max(vehicles.length, 1);

  // Revenue by Business Unit
  const cpoInventoryValue = cpoVehicles.reduce((acc, c) => acc + c.price, 0);
  const partsInventoryValue = spareParts.reduce((acc, p) => acc + p.price * (partQuantities[p.id] ?? 20), 0);
  const totalUnitRevenue = Math.max(1, scaledSalesSAR + cpoInventoryValue + scaledWorkshopSAR + partsInventoryValue);

  // Sales Conversion Funnel Metrics
  const funnelSteps = [
    {
      id: 'f-leads',
      labelAr: '1. طلبات تجارب القيادة والاستفسارات',
      count: Math.max(testDrives.length, 12),
      percent: 100,
      tab: 'test_drives' as const
    },
    {
      id: 'f-quotes',
      labelAr: '2. عروض الأسعار والتمويل الصادرة',
      count: Math.max(quotations.length, 8),
      percent: 68,
      tab: 'quotations' as const
    },
    {
      id: 'f-reserved',
      labelAr: '3. المركبات المحجوزة برقم الشاسيه (VIN)',
      count: Math.max(stats.reservedVinCount + stats.totalInvoicesCount, 5),
      percent: 44,
      tab: 'vin_inventory' as const
    },
    {
      id: 'f-invoiced',
      labelAr: '4. الصفقات المغلقة والفواتير الضريبية (ZATCA)',
      count: stats.totalInvoicesCount,
      percent: 29,
      tab: 'zatca' as const
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Mobbin Gallery-White Editorial Hero Lockup */}
      <div className="bg-[#ffffff] p-6 md:p-10 rounded-[24px] border border-[#f0f0f0] space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="mobbin-badge-popular px-3 py-1">
                {language === 'ar' ? 'سولينا للسيارات ٢٠٢٦' : 'Solina Motors 2026'}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#f3f3f3] text-[#707070] text-xs font-semibold">
                {language === 'ar' ? 'نظام الإدارة التنفيذي ERP & DMS' : 'Executive ERP & DMS'}
              </span>
            </div>

            <h1 className="mobbin-display text-2xl sm:text-3xl md:text-4xl text-[#141414]">
              {language === 'ar'
                ? 'نظرة شاملة على عمليات سولينا للسيارات.'
                : 'Real-time dealership operations, curated.'}
            </h1>

            <p className="mobbin-subtitle-light text-sm md:text-base max-w-xl">
              {language === 'ar' 
                ? 'متابعة لحظية لكافة العمليات، طلبات تجارب القيادة، حجوزات الصيانة الدورية 45 دقيقة، مخزون الشاسيه VIN، والفوترة الإلكترونية ZATCA في كافة صالات سولينا.' 
                : 'Live tracking for customer test drives, 45-min express service queues, VIN stock, and ZATCA Phase 2 e-invoicing across all Solina Motors showrooms.'}
            </p>
          </div>

          {/* Period Segmented Control (Mobbin segmented-control) */}
          <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#707070] font-semibold">
              <Filter className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'النطاق الزمني للتحليلات:' : 'Analytics Period:'}</span>
            </div>
            <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full overflow-x-auto max-w-full">
              {(Object.keys(periodFactor) as PeriodFilter[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setPeriod(key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    period === key ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
                  }`}
                >
                  {language === 'ar' ? periodFactor[key].labelAr : periodFactor[key].labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Strip inside Hero Lockup */}
        <div className="pt-4 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSwitchTab('fleet')}
              className="mobbin-ink-pill px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs md:text-sm font-semibold cursor-pointer"
            >
              {language === 'ar' ? 'إدارة أسطول سولينا 2026' : 'Manage 2026 Fleet'}
            </button>
            <button
              onClick={() => onSwitchTab('zatca')}
              className="px-5 py-2.5 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-xs md:text-sm font-semibold cursor-pointer"
            >
              {language === 'ar' ? 'إصدار فاتورة ضريبية ZATCA' : 'Issue ZATCA Invoice'}
            </button>
            <button
              onClick={() => onSwitchTab('settings')}
              className="px-4 py-2.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'محرك التمويل والإعدادات' : 'Financing & Settings'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'طباعة التقرير التنفيذي' : 'Print Executive Report'}</span>
            </button>
          </div>

          <div
            onClick={() => onSwitchTab('showrooms')}
            className="flex items-center gap-3 bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-colors cursor-pointer px-4 py-2 rounded-full"
          >
            <Building2 className="w-4 h-4 text-[#141414]" />
            <span className="text-xs font-semibold text-[#141414]">
              {stats.totalShowroomsCount} {language === 'ar' ? 'فروع ومراكز صيانة نشطة بالمملكة' : 'Active Flagship Centers'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. KPI Cards Grid (8 Cards — pricing-card & pricing-card-featured with 30% squircle icon tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={kpi.id}
              onClick={() => onSwitchTab(kpi.tab)}
              className={`rounded-[24px] p-6 transition-colors cursor-pointer group flex flex-col justify-between ${
                kpi.isFeatured
                  ? 'bg-[#f3f3f3] border border-transparent hover:border-[#141414]'
                  : 'bg-[#ffffff] border border-[#f0f0f0] hover:border-[#141414]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 mobbin-squircle flex items-center justify-center ${
                  kpi.isFeatured
                    ? 'bg-[#141414] text-[#ffffff] mobbin-ink-pill'
                    : 'bg-[#f3f3f3] text-[#141414]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {kpi.popularBadge ? (
                  <span className="mobbin-badge-popular px-2.5 py-1">
                    {kpi.popularBadge}
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#707070] group-hover:bg-[#141414] group-hover:text-[#ffffff] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div>
                <span className="text-xs font-semibold text-[#707070] block mb-1">
                  {language === 'ar' ? kpi.titleAr : kpi.titleEn}
                </span>
                <div className="mobbin-heading text-2xl text-[#141414] font-mono mb-1">
                  {kpi.value}
                </div>
                <span className="text-[12px] text-[#707070] block">
                  {language === 'ar' ? kpi.subtextAr : kpi.subtextEn}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Sales Conversion Funnel & Revenue Split Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sales Conversion Funnel (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="mobbin-heading text-[#141414] text-base flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </span>
              <span>{language === 'ar' ? 'قمع التحويل البيعي والتمويلي.' : 'Sales Conversion Funnel.'}</span>
            </h3>
            <span className="mobbin-badge-popular px-2.5 py-0.5">معدل التحويل 29%</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {funnelSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => onSwitchTab(step.tab)}
                className="p-3 rounded-[16px] bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-colors cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between font-semibold text-[#141414]">
                  <span>{step.labelAr}</span>
                  <span className="font-mono text-[#707070]">{step.count} عملية ({step.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-[#ffffff] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#141414] rounded-full transition-all duration-300"
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue Breakdown & Fleet Mix (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="mobbin-heading text-[#141414] text-base flex items-center gap-2.5">
                <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </span>
                <span>{language === 'ar' ? 'توزيع الأسطول والمحفظة التشغيلية.' : 'Fleet & Portfolio Breakdown.'}</span>
              </h3>
              <span className="text-xs font-mono text-[#707070] bg-[#f3f3f3] px-3 py-1 rounded-full">{vehicles.length} طراز</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between mb-1.5 font-semibold text-[#141414]">
                  <span>سيارات الدفع الرباعي والكروس أوفر (SUV & 4x4)</span>
                  <span className="font-mono text-[#707070]">{suvCount} طراز ({Math.round((suvCount / totalV) * 100)}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#141414] rounded-full" style={{ width: `${(suvCount / totalV) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold text-[#141414]">
                  <span>سيارات السيدان والأداء الرياضي (Sedan & GR)</span>
                  <span className="font-mono text-[#707070]">{sedanCount} طراز ({Math.round((sedanCount / totalV) * 100)}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#262626] rounded-full" style={{ width: `${(sedanCount / totalV) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5 font-semibold text-[#141414]">
                  <span>السيارات التجارية والبيك أب والنقل (Commercial)</span>
                  <span className="font-mono text-[#707070]">{commercialCount} طراز ({Math.round((commercialCount / totalV) * 100)}%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#707070] rounded-full" style={{ width: `${(commercialCount / totalV) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Mini Revenue Split Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-[#f0f0f0] text-xs">
            <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
              <span className="text-[10px] text-[#707070] block">مبيعات الفواتير</span>
              <strong className="font-mono text-[#141414]">{Math.round((scaledSalesSAR / totalUnitRevenue) * 100)}%</strong>
            </div>
            <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
              <span className="text-[10px] text-[#707070] block">المستعمل AutoHub</span>
              <strong className="font-mono text-[#141414]">{Math.round((cpoInventoryValue / totalUnitRevenue) * 100)}%</strong>
            </div>
            <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
              <span className="text-[10px] text-[#707070] block">مخزون قطع الغيار</span>
              <strong className="font-mono text-[#141414]">{Math.round((partsInventoryValue / totalUnitRevenue) * 100)}%</strong>
            </div>
            <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
              <span className="text-[10px] text-[#707070] block">إيراد الصيانة</span>
              <strong className="font-mono text-[#141414]">{formatPrice(scaledWorkshopSAR)} ر.س</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Showrooms Leaderboard & Recent Cleared ZATCA Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Branch Performance Leaderboard */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="mobbin-heading text-[#141414] text-base flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </span>
              <span>{language === 'ar' ? 'أداء فروع وصالات سولينا.' : 'Solina Branches Performance.'}</span>
            </h3>
            <button
              onClick={() => onSwitchTab('showrooms')}
              className="px-3.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] cursor-pointer"
            >
              {language === 'ar' ? 'إدارة الفروع' : 'Manage Branches'}
            </button>
          </div>

          <div className="space-y-2.5">
            {showrooms.slice(0, 3).map((branch, idx) => (
              <div key={branch.id} className="p-3.5 rounded-[16px] bg-[#f3f3f3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#ffffff] border border-[#e0e0e0] font-mono font-semibold text-[#141414] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-[#141414]">{branch.name}</div>
                    <div className="text-[11px] text-[#707070]">{branch.city} • {branch.services.join(' ، ')}</div>
                  </div>
                </div>
                <span className={idx === 0 ? 'mobbin-badge-popular px-2.5 py-0.5' : 'px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] font-semibold text-[10px]'}>
                  {idx === 0 ? 'الأعلى مبيعاً' : 'نشط'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent ZATCA Cleared Invoices */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="mobbin-heading text-[#141414] text-base flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>{language === 'ar' ? 'أحدث الفواتير الضريبية المعتمدة.' : 'Recent Cleared ZATCA Invoices.'}</span>
            </h3>
            <button
              onClick={() => onSwitchTab('zatca')}
              className="px-3.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] cursor-pointer"
            >
              {language === 'ar' ? 'إدارة الفواتير' : 'Manage Invoices'}
            </button>
          </div>

          <div className="space-y-2.5">
            {recentInvoices.map(inv => (
              <div key={inv.id} className="p-3.5 rounded-[16px] bg-[#f3f3f3] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-[#141414]">{inv.invoiceNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] text-[10px] font-semibold">ZATCA ✓</span>
                  </div>
                  <div className="text-[#707070] mt-0.5">{inv.customerName} — {inv.vehicleModel}</div>
                </div>
                <div className="text-end font-mono font-semibold text-[#141414]">
                  {formatPrice(inv.totalAmount)} ر.س
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Live Operations Grid (Recent Test Drives & Service Queues) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Test Drive Leads (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </span>
              <h3 className="mobbin-heading text-[#141414] text-base">
                {language === 'ar' ? 'أحدث طلبات تجارب القيادة.' : 'Recent Test Drive Leads.'}
              </h3>
            </div>
            <button 
              onClick={() => onSwitchTab('test_drives')}
              className="px-3.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] cursor-pointer"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {recentTestDrives.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#adadad]">
                {language === 'ar' ? 'لا توجد طلبات تجارب قيادة مسجلة حالياً' : 'No test drive bookings yet'}
              </div>
            ) : (
              recentTestDrives.map((td) => (
                <div key={td.id} className="p-4 rounded-[16px] bg-[#f3f3f3] flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#141414]">{td.fullName}</span>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        td.status === 'new'
                          ? 'mobbin-badge-popular'
                          : 'bg-[#ffffff] text-[#141414] border border-[#e0e0e0]'
                      }`}>
                        {td.status === 'new' ? 'جديد' : td.status === 'contacted' ? 'تم التواصل' : td.status === 'confirmed' ? 'مؤكد' : td.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#707070]">
                      {td.modelName} • <span>{td.preferredShowroom}</span>
                    </p>
                    <span className="text-[11px] text-[#adadad] flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {td.preferredDate} ({td.preferredTimeSlot})
                    </span>
                  </div>

                  <a 
                    href={`tel:${td.phone}`}
                    className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title={td.phone}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Service & Maintenance Queue (6 Cols) */}
        <div className="lg:col-span-6 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </span>
              <h3 className="mobbin-heading text-[#141414] text-base">
                {language === 'ar' ? 'طابور الصيانة السريعة 45 دقيقة.' : '45-Min Express Service Queue.'}
              </h3>
            </div>
            <button 
              onClick={() => onSwitchTab('services')}
              className="px-3.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] cursor-pointer"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {recentServices.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#adadad]">
                {language === 'ar' ? 'لا توجد مواعيد صيانة مسجلة حالياً' : 'No service appointments yet'}
              </div>
            ) : (
              recentServices.map((srv) => (
                <div key={srv.id} className="p-4 rounded-[16px] bg-[#f3f3f3] flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#141414]">{srv.fullName}</span>
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#141414] border border-[#e0e0e0]">
                        {srv.status === 'pending' ? 'بانتظار التأكيد' : srv.status === 'in_progress' ? 'جاري الفحص' : srv.status === 'completed' ? 'مكتمل' : srv.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#707070]">
                      {srv.vehicleModel} • لوحة: <span className="font-mono font-semibold text-[#141414]">{srv.plateNumber}</span>
                    </p>
                    <p className="text-[11px] text-[#707070] font-semibold">
                      {srv.serviceType} ({formatPrice(srv.estimatedCost)} ر.س)
                    </p>
                  </div>

                  <a 
                    href={`tel:${srv.phone}`}
                    className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] hover:bg-[#141414] hover:text-[#ffffff] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title={srv.phone}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 6. Fleet Stock Overview Grid */}
      <div className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#f0f0f0] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
              <Car className="w-4 h-4" />
            </span>
            <h3 className="mobbin-heading text-[#141414] text-base md:text-lg">
              {language === 'ar' ? 'ملخص أسطول سيارات سولينا 2026 في المعارض.' : 'Solina 2026 Fleet Stock Status.'}
            </h3>
          </div>
          <button 
            onClick={() => onSwitchTab('fleet')}
            className="px-4 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] mobbin-ink-pill text-xs font-semibold cursor-pointer"
          >
            {language === 'ar' ? 'إدارة الأسطول كاملة' : 'Manage Full Fleet'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {vehicles.slice(0, 6).map((v) => (
            <div
              key={v.id}
              onClick={() => onSwitchTab('fleet')}
              className="p-4 bg-[#f3f3f3] hover:bg-[#e0e0e0] rounded-[16px] text-center space-y-2 transition-colors cursor-pointer"
            >
              <img 
                src={v.cardImage} 
                alt={v.nameAr} 
                className="h-14 w-auto mx-auto object-contain" 
              />
              <span className="text-xs font-semibold text-[#141414] block truncate">{language === 'ar' ? v.nameAr : v.nameEn}</span>
              <span className="text-[11px] font-semibold text-[#707070] font-mono block">{formatPrice(v.priceStartingFrom)} ر.س</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
