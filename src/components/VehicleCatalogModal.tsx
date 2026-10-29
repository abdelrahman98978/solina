import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Printer,
  Download,
  Sparkles,
  Check,
  Car,
  Eye,
  Palette,
  Layers,
  ShieldCheck,
  Gauge,
  Fuel,
  Users,
  Ruler,
  BatteryCharging,
  Volume2,
  Award,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { type Vehicle, type VehicleGrade, getBrandMeta } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface VehicleCatalogModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'cover' | 'interior' | 'colors' | 'specs';
  onOpenTestDrive?: (modelName?: string) => void;
  onOpenQuotation?: (vehicle: Vehicle, grade?: VehicleGrade) => void;
}

export const VehicleCatalogModal: React.FC<VehicleCatalogModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  initialTab = 'cover',
  onOpenTestDrive,
  onOpenQuotation
}) => {
  const { language, formatPrice } = useLanguage();
  const [activePage, setActivePage] = useState<'cover' | 'interior' | 'colors' | 'specs'>(initialTab);
  const [selectedInteriorIdx, setSelectedInteriorIdx] = useState<number>(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [selectedUpholstery, setSelectedUpholstery] = useState<'tan' | 'black' | 'burgundy' | 'ivory'>('tan');

  React.useEffect(() => {
    if (isOpen) {
      setActivePage(initialTab);
      setSelectedInteriorIdx(0);
      setSelectedColorIdx(0);
    }
  }, [isOpen, initialTab, vehicle?.id]);

  if (!isOpen || !vehicle) return null;

  const brandMeta = getBrandMeta(vehicle.brand);
  const catalog = vehicle.catalogSpecs;
  const interiorList = vehicle.interiorGallery && vehicle.interiorGallery.length > 0
    ? vehicle.interiorGallery
    : [
        {
          id: 'default-int-1',
          titleAr: `قمرة القيادة والشاشات الرقمية — ${vehicle.nameAr}`,
          titleEn: `Digital Cockpit & Displays — ${vehicle.nameEn}`,
          descAr: 'مقصورة ذكية متطورة بشاشات بانورامية عالية الدقة ونظام صوتي محيطي.',
          descEn: 'Smart digital cabin with panoramic HD displays and surround sound.',
          image: vehicle.interiorImage || vehicle.cardImage
        }
      ];

  const activeInterior = interiorList[selectedInteriorIdx] || interiorList[0];
  const activeColor = vehicle.colors[selectedColorIdx] || vehicle.colors[0];

  const upholsteryOptions = [
    { id: 'tan', nameAr: 'جلد نابا جملي فاخر (Saddle Tan)', nameEn: 'Saddle Tan Nappa Leather', hex: '#8B5A2B' },
    { id: 'black', nameAr: 'جلد أسود ملكي (Obsidian Black)', nameEn: 'Obsidian Black Leather', hex: '#18191C' },
    { id: 'burgundy', nameAr: 'جلد عنابي رياضي (Crimson Bordeaux)', nameEn: 'Crimson Bordeaux Leather', hex: '#5E1921' },
    { id: 'ivory', nameAr: 'جلد عاجي بيج (Ivory Cream)', nameEn: 'Ivory Cream Leather', hex: '#D8C8B4' }
  ];

  const handlePrintFullCatalog = () => {
    const printWin = window.open('', '_blank', 'width=1150,height=850');
    if (!printWin) return;

    const colorsHtml = vehicle.colors
      .map(
        (c) => `
        <div style="border:1px solid #e5e7eb;border-radius:10px;padding:10px;display:flex;align-items:center;gap:10px;background:#f9fafb;">
          <div style="width:28px;height:28px;border-radius:50%;background:${c.hex};border:2px solid #cbd5e1;flex-shrink:0;"></div>
          <div>
            <div style="font-weight:700;font-size:12px;color:#111827;">${c.name}</div>
            <div style="font-size:10px;color:#6b7280;font-family:monospace;">${c.nameEn} • ${c.hex}</div>
          </div>
        </div>`
      )
      .join('');

    const interiorHtml = interiorList
      .map(
        (shot) => `
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;background:#fff;">
          <img src="${shot.image}" alt="${shot.titleAr}" style="width:100%;height:150px;object-fit:cover;" />
          <div style="padding:10px;">
            <div style="font-weight:700;font-size:12px;color:#111827;margin-bottom:4px;">${shot.titleAr}</div>
            <div style="font-size:11px;color:#4b5563;line-height:1.4;">${shot.descAr}</div>
          </div>
        </div>`
      )
      .join('');

    const gradesHtml = vehicle.grades
      .map(
        (g) => `
        <tr>
          <td style="padding:10px;border:1px solid #d1d5db;font-weight:700;">${g.name}<div style="font-size:10px;color:#6b7280;">${g.nameEn}</div></td>
          <td style="padding:10px;border:1px solid #d1d5db;">${g.engine} — ${g.transmission}</td>
          <td style="padding:10px;border:1px solid #d1d5db;">${g.features.join(' • ')}</td>
          <td style="padding:10px;border:1px solid #d1d5db;font-weight:800;color:#141414;font-family:monospace;">${g.price.toLocaleString()} ر.س</td>
        </tr>`
      )
      .join('');

    printWin.document.write(`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>كتالوج ${vehicle.nameAr} الرسمي — سولينا للسيارات</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
    body { font-family: 'Cairo', sans-serif; margin: 0; padding: 24px; color: #111827; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #141414; padding-bottom: 16px; margin-bottom: 20px; }
    .badge { background: #f3f3f3; color: #141414; padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 700; border: 1px solid #e0e0e0; display: inline-block; }
    .hero { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 24px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .kpi { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; text-align: center; }
    .section-title { font-size: 16px; font-weight: 800; color: #141414; border-right: 4px solid #141414; padding-right: 10px; margin: 22px 0 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px; }
    th { background: #111827; color: #fff; padding: 10px; border: 1px solid #111827; text-align: right; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span class="badge">${brandMeta.brandName} • ${brandMeta.originCountry}</span>
      <h1 style="margin:6px 0 2px;font-size:24px;">كتالوج ومواصفات ${vehicle.nameAr}</h1>
      <div style="font-size:12px;color:#6b7280;">رمز الكتالوج الرسمي: ${catalog?.brochureCode || vehicle.id.toUpperCase()} • موديل ${vehicle.year}</div>
    </div>
    <div style="text-align:left;">
      <div style="font-weight:800;font-size:18px;color:#141414;">سولينا للسيارات</div>
      <div style="font-size:11px;color:#6b7280;">SOLINA MOTORS OFFICIAL BROCHURE</div>
    </div>
  </div>

  <div class="hero">
    <div>
      <h2 style="margin:0 0 8px;font-size:20px;">${vehicle.nameEn}</h2>
      <p style="font-size:12px;color:#374151;line-height:1.6;margin:0 0 12px;">
        ${brandMeta.taglineAr} — ${vehicle.bodyTypeAr} مزودة بمحرك ${vehicle.engineSpec} بقوة ${vehicle.horsepower} وعزم ${vehicle.torque} مع ${vehicle.drivetrain}.
      </p>
      <div style="font-size:14px;font-weight:800;color:#141414;">
        السعر يبدأ من: ${vehicle.priceStartingFrom.toLocaleString()} ر.س (شامل الضريبة) • القسط الشهري من: ${vehicle.monthlyInstallmentStartingFrom.toLocaleString()} ر.س
      </div>
    </div>
    <div style="text-align:center;">
      <img src="${vehicle.cardImage}" alt="${vehicle.nameAr}" style="max-height:160px;max-width:100%;object-fit:contain;" />
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi"><div style="font-size:10px;color:#6b7280;">القوة الحصانية</div><div style="font-weight:800;font-size:14px;">${vehicle.horsepower}</div></div>
    <div class="kpi"><div style="font-size:10px;color:#6b7280;">عزم الدوران</div><div style="font-weight:800;font-size:14px;">${vehicle.torque}</div></div>
    <div class="kpi"><div style="font-size:10px;color:#6b7280;">كفاءة الطاقة / المدى</div><div style="font-weight:800;font-size:14px;color:#141414;">${vehicle.fuelEconomy}</div></div>
    <div class="kpi"><div style="font-size:10px;color:#6b7280;">عدد المقاعد</div><div style="font-weight:800;font-size:14px;">${vehicle.seats} مقاعد</div></div>
  </div>

  <div class="section-title">1. معرض المقصورة الداخلية والتجهيزات الفاخرة (Interior Cabin)</div>
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;">
    ${interiorHtml}
  </div>

  <div class="section-title">2. كتالوج الألوان الخارجية المعتمدة (${vehicle.colors.length} ألوان)</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
    ${colorsHtml}
  </div>

  <div class="section-title">3. الفئات والأسعار الرسمية المعتمدة (Trims & Pricing)</div>
  <table>
    <thead>
      <tr>
        <th>الفئة (Grade)</th>
        <th>المحرك وناقل الحركة</th>
        <th>أبرز المواصفات والتجهيزات</th>
        <th>السعر النقدي</th>
      </tr>
    </thead>
    <tbody>${gradesHtml}</tbody>
  </table>

  <div class="section-title">4. المواصفات الهندسية والأبعاد والضمان المصنعي</div>
  <table>
    <tbody>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;width:28%;background:#f9fafb;">الأبعاد الخارجية وقاعدة العجلات</td><td style="padding:8px;border:1px solid #d1d5db;">${catalog?.dimensionsAr || '-'} (قاعدة العجلات: ${catalog?.wheelbaseAr || '-'})</td></tr>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;background:#f9fafb;">خزان الوقود / البطارية</td><td style="padding:8px;border:1px solid #d1d5db;">${catalog?.fuelTankOrBatteryAr || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;background:#f9fafb;">المقصورة والفرش الداخلي</td><td style="padding:8px;border:1px solid #d1d5db;">${catalog?.interiorMaterialsAr || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;background:#f9fafb;">الشاشات والنظام الصوتي</td><td style="padding:8px;border:1px solid #d1d5db;">${catalog?.infotainmentAndAudioAr || '-'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;background:#f9fafb;">منظومة الأمان والسلامة</td><td style="padding:8px;border:1px solid #d1d5db;">${brandMeta.safetySuite}</td></tr>
      <tr><td style="padding:8px;border:1px solid #d1d5db;font-weight:700;background:#f9fafb;">الضمان المصنعي الرسمي</td><td style="padding:8px;border:1px solid #d1d5db;">${brandMeta.warranty} — ${brandMeta.carePackage}</td></tr>
    </tbody>
  </table>

  <script>window.onload = () => { setTimeout(() => window.print(), 350); };</script>
</body>
</html>`);
    printWin.document.close();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto font-arabic">
      <div className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-gray-200 my-4 max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Catalog Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-gray-900 via-slate-900 to-black text-white border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141414] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-600/15 text-red-500 border border-red-600/40">
                  {language === 'ar' ? `الكتالوج الرقمي الرسمي • ${brandMeta.brandName}` : `Official Digital Brochure • ${brandMeta.brandNameEn}`}
                </span>
                <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
                  {catalog?.brochureCode || `SOL-${vehicle.year}`}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white mt-0.5">
                {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintFullCatalog}
              className="px-4 py-2 rounded-xl bg-[#141414] hover:bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'طباعة / حفظ الكتالوج PDF' : 'Print / Save Catalog PDF'}</span>
            </button>

            <button
              onClick={() => window.open(vehicle.brochureUrl || '/1.pdf', '_blank')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">{language === 'ar' ? 'ملف البروشور' : 'Brochure File'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Catalog Page Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 bg-gray-50 border-b border-gray-200 overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'cover', icon: BookOpen, labelAr: '1. غلاف الكتالوج والنظرة الشاملة', labelEn: '1. Cover & Highlights' },
            { id: 'interior', icon: Eye, labelAr: `2. المقصورة الداخلية (${interiorList.length} صور)`, labelEn: `2. Interior Cabin (${interiorList.length} Views)` },
            { id: 'colors', icon: Palette, labelAr: `3. الألوان الخارجية (${vehicle.colors.length} ألوان)`, labelEn: `3. Exterior Colors (${vehicle.colors.length})` },
            { id: 'specs', icon: Layers, labelAr: `4. الفئات والمواصفات الهندسية (${vehicle.grades.length} فئات)`, labelEn: '4. Trims & Full Engineering Specs' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isAct = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id as any)}
                className={`py-3.5 px-4 text-xs md:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isAct
                    ? 'border-[#141414] text-[#141414] bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Catalog Body Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8 bg-white">
          
          {/* PAGE 1: COVER & HIGHLIGHTS */}
          {activePage === 'cover' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Split Exterior & Interior Hero Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Exterior Hero Card */}
                <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6 md:p-8 flex flex-col justify-between min-h-[340px] border border-gray-800 shadow-xl">
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
                      {language === 'ar' ? `${brandMeta.brandName} • ${brandMeta.originCountry}` : `${brandMeta.brandNameEn} • ${brandMeta.originCountryEn}`}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#141414] text-white text-xs font-bold">
                      {vehicle.powertrain} • {vehicle.year}
                    </span>
                  </div>

                  <div className="relative z-10 my-4 flex items-center justify-center h-48">
                    <img
                      src={vehicle.cardImage}
                      alt={vehicle.nameAr}
                      className="max-h-48 w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-white/15">
                    <div>
                      <p className="text-xs text-red-500 font-semibold">{language === 'ar' ? brandMeta.taglineAr : brandMeta.taglineEn}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-white mt-0.5">
                        {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                      </h3>
                    </div>
                    <div className="text-end font-mono">
                      <span className="text-[11px] text-gray-300 block font-arabic">
                        {language === 'ar' ? 'يبدأ السعر النقدي من' : 'Starting Price'}
                      </span>
                      <span className="text-2xl font-black text-white">
                        {formatPrice(vehicle.priceStartingFrom)} <span className="text-xs text-red-500">ر.س</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interior Cabin Preview Card */}
                <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-gray-200 bg-gray-900 text-white relative flex flex-col justify-end min-h-[340px] group">
                  <img
                    src={vehicle.interiorImage || interiorList[0].image}
                    alt={`داخلية ${vehicle.nameAr}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="relative z-10 p-6 space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/15 border border-red-600/40 text-red-500 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'المقصورة الداخلية الفاخرة' : 'Luxury Interior Cabin'}</span>
                    </span>
                    <h4 className="text-xl font-black text-white">
                      {language === 'ar' ? `رحابة وفخامة مقصورة ${vehicle.nameAr}` : `${vehicle.nameEn} Interior Lounge`}
                    </h4>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {language === 'ar' ? catalog?.interiorMaterialsAr : catalog?.interiorMaterialsEn}
                    </p>
                    <button
                      onClick={() => setActivePage('interior')}
                      className="w-full py-2.5 rounded-xl bg-white text-gray-900 hover:bg-[#f3f3f3] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                    >
                      <Eye className="w-4 h-4 text-[#141414]" />
                      <span>{language === 'ar' ? `استعراض جميع صور الداخلية (${interiorList.length} زوايا)` : `Explore All ${interiorList.length} Interior Photos`}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 6 Engineering KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { labelAr: 'المحرك', labelEn: 'Engine', val: language === 'ar' ? vehicle.engineSpec : vehicle.engineSpecEn, icon: Gauge },
                  { labelAr: 'القوة القصوى', labelEn: 'Horsepower', val: language === 'ar' ? vehicle.horsepower : vehicle.horsepowerEn, icon: Sparkles },
                  { labelAr: 'عزم الدوران', labelEn: 'Torque', val: vehicle.torque, icon: Layers },
                  { labelAr: 'كفاءة الوقود / المدى', labelEn: 'Fuel / Range', val: language === 'ar' ? vehicle.fuelEconomy : vehicle.fuelEconomyEn, icon: Fuel },
                  { labelAr: 'منظومة الدفع', labelEn: 'Drivetrain', val: language === 'ar' ? vehicle.drivetrain : vehicle.drivetrainEn, icon: Car },
                  { labelAr: 'عدد المقاعد', labelEn: 'Seating', val: `${vehicle.seats} ${language === 'ar' ? 'ركاب' : 'Seats'}`, icon: Users }
                ].map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-gray-400 mb-2">
                        <span className="text-[11px] font-bold text-gray-500">{language === 'ar' ? k.labelAr : k.labelEn}</span>
                        <Icon className="w-4 h-4 text-[#141414]" />
                      </div>
                      <div className="text-xs md:text-sm font-black text-gray-900 leading-snug">{k.val}</div>
                    </div>
                  );
                })}
              </div>

              {/* Key Brochure Highlights */}
              {catalog && (
                <div className="bg-[#f3f3f3] rounded-3xl p-6 border border-[#e0e0e0]">
                  <h4 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#141414]" />
                    <span>{language === 'ar' ? 'أبرز مزايا الطراز في الكتالوج الرسمي:' : 'Official Brochure Key Highlights:'}</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(language === 'ar' ? catalog.keyHighlightsAr : catalog.keyHighlightsEn).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-2xs">
                        <Check className="w-4 h-4 text-[#141414] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-gray-800 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PAGE 2: INTERIOR CABIN GALLERY */}
          {activePage === 'interior' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Main Active Interior Photo Stage */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-black h-[340px] sm:h-[420px] shadow-lg">
                    <img
                      src={activeInterior.image}
                      alt={activeInterior.titleAr}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => setSelectedInteriorIdx((prev) => (prev - 1 + interiorList.length) % interiorList.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#141414] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedInteriorIdx((prev) => (prev + 1) % interiorList.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#141414] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-5 right-6 left-6 text-white">
                      <span className="px-3 py-1 rounded-full bg-[#141414] text-[11px] font-bold inline-block mb-2">
                        {language === 'ar' ? `زاوية داخلية ${selectedInteriorIdx + 1} من ${interiorList.length}` : `Interior View ${selectedInteriorIdx + 1} of ${interiorList.length}`}
                      </span>
                      <h3 className="text-lg md:text-2xl font-black">
                        {language === 'ar' ? activeInterior.titleAr : activeInterior.titleEn}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-2xl">
                        {language === 'ar' ? activeInterior.descAr : activeInterior.descEn}
                      </p>
                    </div>
                  </div>

                  {/* 4 Interior Thumbnails Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {interiorList.map((shot, idx) => (
                      <button
                        key={shot.id}
                        onClick={() => setSelectedInteriorIdx(idx)}
                        className={`rounded-2xl overflow-hidden border-2 text-start transition-all cursor-pointer group ${
                          selectedInteriorIdx === idx
                            ? 'border-[#141414] ring-2 ring-red-600/30 shadow-md'
                            : 'border-gray-200 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="h-20 overflow-hidden bg-gray-100">
                          <img src={shot.image} alt={shot.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-2 bg-white">
                          <div className="text-[11px] font-bold text-gray-900 line-clamp-1">
                            {language === 'ar' ? shot.titleAr : shot.titleEn}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column: Interior Upholstery & Cabin Specs */}
                <div className="lg:col-span-4 space-y-5 bg-gray-50 p-6 rounded-3xl border border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-[#141414] block mb-1">
                      {language === 'ar' ? 'تخصيص المقصورة والفرش الداخلي' : 'Cabin Trim & Upholstery'}
                    </span>
                    <h4 className="text-lg font-black text-gray-900">
                      {language === 'ar' ? 'خيارات ألوان الجلد والتطريز' : 'Leather & Trim Options'}
                    </h4>
                  </div>

                  {/* Upholstery Swatches */}
                  <div className="space-y-2.5">
                    {upholsteryOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedUpholstery(opt.id as any)}
                        className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                          selectedUpholstery === opt.id
                            ? 'bg-white border-[#141414] shadow-sm'
                            : 'bg-white/60 border-gray-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-7 h-7 rounded-full border-2 border-white shadow-sm shrink-0"
                            style={{ backgroundColor: opt.hex }}
                          />
                          <span className="text-xs font-bold text-gray-900">
                            {language === 'ar' ? opt.nameAr : opt.nameEn}
                          </span>
                        </div>
                        {selectedUpholstery === opt.id && <Check className="w-4 h-4 text-[#141414]" />}
                      </button>
                    ))}
                  </div>

                  {/* Cabin Technical Details */}
                  <div className="pt-4 border-t border-gray-200 space-y-3 text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">
                        {language === 'ar' ? 'الشاشات والنظام الصوتي' : 'Infotainment & Sound'}
                      </span>
                      <p className="font-bold text-gray-900 leading-relaxed">
                        {language === 'ar' ? catalog?.infotainmentAndAudioAr : catalog?.infotainmentAndAudioEn}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">
                        {language === 'ar' ? 'خامات المقصورة والراحة' : 'Cabin Materials & Comfort'}
                      </span>
                      <p className="font-bold text-gray-900 leading-relaxed">
                        {language === 'ar' ? catalog?.interiorMaterialsAr : catalog?.interiorMaterialsEn}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">
                        {language === 'ar' ? 'سعة التحميل والأمتعة' : 'Cargo & Trunk Capacity'}
                      </span>
                      <p className="font-bold text-gray-900 leading-relaxed">
                        {language === 'ar' ? catalog?.trunkOrCargoAr : catalog?.trunkOrCargoEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: EXTERIOR COLORS STUDIO */}
          {activePage === 'colors' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Live Color Studio Preview */}
                <div className="lg:col-span-7 relative rounded-3xl p-8 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 flex flex-col items-center justify-center min-h-[340px] overflow-hidden">
                  {/* Dynamic Paint Color Aura Spotlight */}
                  <div
                    className="w-72 h-72 rounded-full blur-3xl opacity-35 absolute pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: activeColor.hex }}
                  />

                  <img
                    src={activeColor.image || vehicle.cardImage}
                    alt={activeColor.name}
                    className="relative z-10 max-h-64 w-auto object-contain filter drop-shadow-2xl transition-all duration-500"
                  />

                  <div className="relative z-10 mt-6 flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                    <span
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: activeColor.hex }}
                    />
                    <span className="text-sm font-black text-gray-900">
                      {language === 'ar' ? activeColor.name : activeColor.nameEn}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{activeColor.hex}</span>
                  </div>
                </div>

                {/* All Colors Catalog List */}
                <div className="lg:col-span-5 space-y-3">
                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {language === 'ar' ? `كتالوج الألوان الخارجية الرسمية (${vehicle.colors.length} ألوان)` : `Official Exterior Paint Colors (${vehicle.colors.length})`}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                    {vehicle.colors.map((col, idx) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                          selectedColorIdx === idx
                            ? 'bg-[#f3f3f3] border-[#141414] shadow-sm'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-8 h-8 rounded-full border-2 border-white shadow-md shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <div className="text-start">
                            <span className="text-xs font-bold text-gray-900 block">
                              {language === 'ar' ? col.name : col.nameEn}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              {col.nameEn} • {col.hex}
                            </span>
                          </div>
                        </div>
                        {selectedColorIdx === idx && (
                          <span className="px-2.5 py-1 rounded-full bg-[#141414] text-white text-[10px] font-bold">
                            {language === 'ar' ? 'معروض الآن' : 'Active'}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 4: FULL TRIMS & ENGINEERING SPECS */}
          {activePage === 'specs' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Grades Comparison Table */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#141414]" />
                  <span>{language === 'ar' ? 'مقارنة الفئات والأسعار الرسمية المعتمدة' : 'Official Grades & Pricing Matrix'}</span>
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-xs text-start border-collapse">
                    <thead>
                      <tr className="bg-gray-900 text-white">
                        <th className="p-4 text-start">{language === 'ar' ? 'الفئة (Trim)' : 'Trim Grade'}</th>
                        <th className="p-4 text-start">{language === 'ar' ? 'المحرك وناقل الحركة' : 'Engine & Transmission'}</th>
                        <th className="p-4 text-start">{language === 'ar' ? 'أبرز التجهيزات القياسية والفاخرة' : 'Key Features'}</th>
                        <th className="p-4 text-start">{language === 'ar' ? 'السعر النقدي (شامل الضريبة)' : 'Cash Price (VAT Incl.)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {vehicle.grades.map((g, i) => (
                        <tr key={i} className="hover:bg-[#f3f3f3]">
                          <td className="p-4 font-black text-gray-900">{language === 'ar' ? g.name : g.nameEn}</td>
                          <td className="p-4 text-gray-700 font-medium">{language === 'ar' ? `${g.engine} • ${g.transmission}` : `${g.engineEn} • ${g.transmissionEn}`}</td>
                          <td className="p-4 text-gray-600">{(language === 'ar' ? g.features : g.featuresEn).join(' • ')}</td>
                          <td className="p-4 font-mono font-black text-sm text-[#141414] whitespace-nowrap">{formatPrice(g.price)} ر.س</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Engineering Specifications Matrix */}
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-[#141414]" />
                  <span>{language === 'ar' ? 'البيانات الهندسية والأبعاد والضمان المصنعي' : 'Engineering Dimensions, Chassis & Warranty'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { titleAr: 'الأبعاد الخارجية (الطول × العرض × الارتفاع)', titleEn: 'Exterior Dimensions (L × W × H)', val: language === 'ar' ? catalog?.dimensionsAr : catalog?.dimensionsEn },
                    { titleAr: 'طول قاعدة العجلات', titleEn: 'Wheelbase', val: language === 'ar' ? catalog?.wheelbaseAr : catalog?.wheelbaseEn },
                    { titleAr: 'خزان الوقود / سعة البطارية والشحن', titleEn: 'Fuel Tank / Battery Capacity', val: language === 'ar' ? catalog?.fuelTankOrBatteryAr : catalog?.fuelTankOrBatteryEn },
                    { titleAr: 'سعة صندوق الأمتعة / الحمولة', titleEn: 'Trunk / Payload Capacity', val: language === 'ar' ? catalog?.trunkOrCargoAr : catalog?.trunkOrCargoEn },
                    { titleAr: 'نظام التعليق والمكابح', titleEn: 'Suspension & Braking System', val: language === 'ar' ? catalog?.brakesAndSuspensionAr : catalog?.brakesAndSuspensionEn },
                    { titleAr: 'أنظمة السلامة والأمان النشطة', titleEn: 'Active Safety Suite', val: language === 'ar' ? brandMeta.safetySuite : brandMeta.safetySuiteEn },
                    { titleAr: 'الضمان المصنعي الرسمي', titleEn: 'Manufacturer Warranty', val: language === 'ar' ? brandMeta.warranty : brandMeta.warrantyEn },
                    { titleAr: 'باقة الصيانة وخدمة المساعدة على الطريق', titleEn: 'Care Package & Roadside Support', val: language === 'ar' ? brandMeta.carePackage : brandMeta.carePackageEn }
                  ].map((spec, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                      <span className="text-[11px] font-bold text-gray-400 block mb-1">
                        {language === 'ar' ? spec.titleAr : spec.titleEn}
                      </span>
                      <p className="text-xs md:text-sm font-bold text-gray-900 leading-relaxed">
                        {spec.val || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Actions Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#141414]" />
            <span>{language === 'ar' ? brandMeta.warranty : brandMeta.warrantyEn}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenQuotation && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuotation(vehicle, vehicle.grades[0]);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#f3f3f3] hover:bg-[#f3f3f3] text-[#141414] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'طلب عرض سعر رسمي' : 'Official Quotation'}</span>
              </button>
            )}

            {onOpenTestDrive && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTestDrive(vehicle.nameAr);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#141414] hover:bg-[#262626] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'حجز تجربة قيادة' : 'Book Test Drive'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
