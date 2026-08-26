import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Phone, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Fuel, 
  Gauge, 
  Users, 
  Layers, 
  Download, 
  Share2,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { type Vehicle, type VehicleGrade, VEHICLES, getBrandMeta } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { NavigationControls } from './NavigationControls';
import { SectionDivider } from './SectionDivider';

interface VehicleModelPageProps {
  vehicle: Vehicle;
  onBackToHome: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenQuotation: (vehicle: Vehicle, grade?: VehicleGrade, financeDetails?: any) => void;
  onSelectOtherVehicle: (vehicleId: string) => void;
  onOpenServiceBooking?: () => void;
  onOpenCompare?: () => void;
  comparisonCount?: number;
}

export const VehicleModelPage: React.FC<VehicleModelPageProps> = ({
  vehicle,
  onBackToHome,
  onOpenTestDrive,
  onOpenQuotation,
  onSelectOtherVehicle,
  onOpenServiceBooking,
  onOpenCompare,
  comparisonCount
}) => {
  const { language, isRTL, formatPrice } = useLanguage();
  const brandMeta = getBrandMeta(vehicle.brand);
  const [activeSection, setActiveSection] = useState<'overview' | 'features' | 'grades' | 'colors' | 'gallery' | 'offers'>('overview');
  const [featureTab, setFeatureTab] = useState<'exterior' | 'interior' | 'performance' | 'comfort'>('exterior');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(0);
  const [gradeFilter, setGradeFilter] = useState<'all' | 'petrol' | 'hybrid' | 'diesel'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [vehicle.id]);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const activeGrade = vehicle.grades[selectedGradeIndex] || vehicle.grades[0];

  const similarVehicles = VEHICLES.filter(v => 
    v.id !== vehicle.id && (v.category === vehicle.category || ['suv', 'crossover'].includes(v.category))
  ).slice(0, 4);

  // Model Specific Hero Background Banner
  const heroBanner = vehicle.heroImage || vehicle.cardImage;

  // Features data
  const featuresList = {
    exterior: [
      {
        titleAr: 'أنوار أمامية LED متطورة مع إشارة الإنعطاف التتابعية',
        titleEn: 'Advanced LED Headlamps with Sequential Turn Signals',
        descAr: 'تصميم هجومي جريء يوفر رؤية ليلية فائقة الوضوح مع لمسات كروم أنيقة.',
        descEn: 'Bold aggressive styling providing crystal-clear night visibility with sleek chrome accents.',
        image: vehicle.cardImage
      },
      {
        titleAr: 'جنوط ألمنيوم مصقولة رياضية',
        titleEn: 'Polished Sport Alloy Wheels',
        descAr: 'جنوط بتصميم ديناميكي هوائي قياس 17 بوصة تعزز الثبات والجاذبية على الطرقات.',
        descEn: '17-inch aerodynamic dual-tone alloy wheels delivering peak stability and road presence.',
        image: vehicle.cardImage
      },
      {
        titleAr: 'أنوار خلفية LED عريضة متصلة',
        titleEn: 'Connected Signature LED Taillamps',
        descAr: 'إضاءة خلفية مميزة ثلاثية الأبعاد تمنح السيارة هوية عصرية لافتة للأنظار.',
        descEn: 'Distinctive 3D rear light signature giving the vehicle an unmistakable modern presence.',
        image: vehicle.cardImage
      }
    ],
    interior: [
      {
        titleAr: 'شاشة وسائط متعددة متطورة تدعم Apple CarPlay',
        titleEn: 'Advanced Multimedia Screen with Wireless Apple CarPlay',
        descAr: 'شاشة لمس عالية الدقة قياس 8 بوصة مع نظام ملاحة متكامل وربط ذكي فوري.',
        descEn: 'HD 8-inch touchscreen with full smartphone integration and smart navigation.',
        image: vehicle.interiorImage || vehicle.cardImage
      },
      {
        titleAr: 'مقصورة ذكية متعددة الاستخدامات مع سعة تخزين مرنة',
        titleEn: 'Versatile Smart Cabin with Flexible Cargo Floor',
        descAr: 'مقاعد مريحة مع إمكانية طي الصف الثاني بنسبة 60:40 لتوفير مساحة أمتعة رحبة.',
        descEn: 'Ergonomic seating with 60:40 split-fold rear seats maximizing cargo versatility.',
        image: vehicle.interiorImage || vehicle.cardImage
      }
    ],
    performance: [
      {
        titleAr: 'كفاءة استهلاك وقود استثنائية مع ناقل CVT التتابعي',
        titleEn: 'Benchmark Fuel Efficiency with Direct Shift CVT',
        descAr: `استهلاك وقود رائد يصل إلى ${vehicle.fuelEconomy} لتجربة قيادة اقتصادية وحيوية.`,
        descEn: `Exceptional fuel economy up to ${vehicle.fuelEconomy} delivering responsive and economical drive.`,
        image: vehicle.cardImage
      },
      {
        titleAr: 'محرك مدمج نشط وقوي',
        titleEn: 'Responsive Compact Powertrain',
        descAr: `${vehicle.engineSpec} يولد ${vehicle.horsepower} وعزم دوران ${vehicle.torque} لانطلاقة واثقة.`,
        descEn: `${vehicle.engineSpec} generating ${vehicle.horsepower} and ${vehicle.torque} for confident acceleration.`,
        image: vehicle.cardImage
      }
    ],
    comfort: [
      {
        titleAr: 'نظام دخول وتشغيل ذكي بضغطة زر (Smart Keyless Entry)',
        titleEn: 'Push Button Smart Start & Keyless Entry',
        descAr: 'سهولة الدخول والتشغيل دون الحاجة لإخراج المفتاح من جيبك.',
        descEn: 'Seamless entry and ignition without ever taking the smart key out of your pocket.',
        image: vehicle.cardImage
      },
      {
        titleAr: 'أنظمة الأمان النشطة والوسائد الهوائية المتعددة',
        titleEn: 'Active Safety Shield & Multiple Airbags',
        descAr: 'كاميرا رؤية خلفية مع حساسات ركن ونظام التحكم في ثبات المركبة VSC ونظام المساعدة على صعود المرتفعات HAC.',
        descEn: 'Rear camera with parking sensors, Vehicle Stability Control (VSC), and Hill-start Assist Control (HAC).',
        image: vehicle.cardImage
      }
    ]
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-arabic flex flex-col">
      {/* 1. Global Header */}
      <Header
        onOpenTestDrive={onOpenTestDrive}
        onOpenServiceBooking={onOpenServiceBooking || (() => {})}
        onOpenCompare={onOpenCompare || (() => {})}
        comparisonCount={comparisonCount || 0}
        onSelectCategory={() => onBackToHome()}
        onSelectVehicle={(id) => onSelectOtherVehicle(id)}
      />

      <main className="flex-1">
        {/* 2. Hero Section 1:1 matching Solina Saudi Arabia */}
        <section className="relative w-full h-[65vh] min-h-[500px] max-h-[750px] bg-black overflow-hidden flex items-end">
          <img
            src={heroBanner}
            alt={vehicle.nameAr}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
          />

          {/* Gradient Overlay for Text & Buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Breadcrumbs & Navigation Controls (Home & Back) */}
          <div className="absolute top-6 right-6 md:right-12 z-30">
            <NavigationControls 
              onBack={onBackToHome} 
              onHome={onBackToHome} 
              currentPageTitle={vehicle.nameAr}
            />
          </div>

          {/* Hero CTAs matching Solina SA */}
          <div className="relative z-20 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pb-12 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuotation(vehicle, activeGrade)}
              className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer text-center"
            >
              {language === 'ar' ? 'خيارات الشراء' : 'Buying Options'}
            </button>

            <button
              onClick={() => onOpenTestDrive(vehicle.nameAr)}
              className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-black/70 hover:bg-black text-white font-bold text-base border border-white/40 hover:border-white transition-all duration-200 cursor-pointer text-center"
            >
              {language === 'ar' ? 'طلب اتصال' : 'Request a Callback'}
            </button>
          </div>
        </section>

        {/* 3. Sticky Sub-Navigation Bar matching Solina SA */}
        <nav className="sticky top-0 z-40 bg-black text-white border-b border-white/10 shadow-md">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-between h-14 overflow-x-auto no-scrollbar">
            {/* Model Name Badge */}
            <div className="text-sm md:text-base font-bold tracking-wider font-mono text-white flex-shrink-0 flex items-center gap-2">
              <span className="text-[#0056B3] font-black">{language === 'ar' ? brandMeta.brandName : brandMeta.brandNameEn}</span>
              <span className="text-gray-400">|</span>
              <span>{vehicle.nameEn.replace('2026', '').trim()}</span>
            </div>

            {/* Navigation Anchor Links with Red Active Underline */}
            <div className="flex items-center gap-6 md:gap-10 text-xs md:text-sm font-semibold flex-shrink-0">
              {[
                { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview' },
                { id: 'features', label: language === 'ar' ? 'المميزات' : 'Features' },
                { id: 'grades', label: language === 'ar' ? 'الفئات' : 'Grades' },
                { id: 'colors', label: language === 'ar' ? 'الألوان' : 'Colors' },
                { id: 'gallery', label: language === 'ar' ? 'معرض الصور' : 'Gallery' },
                { id: 'offers', label: language === 'ar' ? 'عروض' : 'Offers' }
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as any);
                      scrollToAnchor(item.id);
                    }}
                    className={`py-4 transition-all cursor-pointer relative ${
                      isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3]"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* 4. Overview Section */}
        <section id="overview" className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0056B3] text-xs font-bold border border-blue-200">
                    {language === 'ar' ? brandMeta.brandName : brandMeta.brandNameEn}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                    {language === 'ar' ? brandMeta.originCountry : brandMeta.originCountryEn}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-medium">
                    {vehicle.bodyTypeAr} • موديل {vehicle.year}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-black font-arabic tracking-tight">
                  {vehicle.nameAr}
                </h1>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {language === 'ar'
                    ? `تجسد ${vehicle.nameAr} قمة الهندسة والابتكار من ${brandMeta.brandName}، وتوفر تجربة قيادة استثنائية تجمع بين الفخامة، والقوة، وأحدث التقنيات مع الضمان المصنعي الرسمي المعتمد.`
                    : `${vehicle.nameEn} represents the pinnacle of engineering from ${brandMeta.brandNameEn}, delivering an exceptional blend of luxury, power, and state-of-the-art technology.`}
                </p>

                {/* Brand Tagline Badge */}
                <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/80 text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0056B3] flex-shrink-0" />
                  <span>{language === 'ar' ? brandMeta.taglineAr : brandMeta.taglineEn}</span>
                </div>

                {/* Key Specs Pill Matrix */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 font-mono">
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-gray-500 font-arabic block mb-1">السعر يبدأ من</span>
                    <span className="text-lg font-black text-[#0056B3]">{formatPrice(vehicle.priceStartingFrom)}</span>
                    <span className="text-xs font-bold text-[#0056B3] mr-1">﷼</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-gray-500 font-arabic block mb-1">استهلاك الوقود</span>
                    <span className="text-base font-bold text-emerald-600">{vehicle.fuelEconomy}</span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <span className="text-[10px] text-gray-500 font-arabic block mb-1">القوة القصوى</span>
                    <span className="text-base font-bold text-gray-900">{vehicle.horsepower}</span>
                  </div>
                </div>
              </div>

              {/* Large Vehicle Stage */}
              <div className="lg:col-span-6 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
                <img
                  src={activeColor.image || vehicle.cardImage}
                  alt={vehicle.nameAr}
                  className="max-h-80 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Features Section ("المميزات") */}
        <section id="features" className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-6 tracking-tight">
                {language === 'ar' ? 'المميزات' : 'Features'}
              </h2>

              {/* 4 Feature Tabs matching Solina SA */}
              <div className="flex items-center justify-center gap-6 md:gap-12 border-b border-gray-200 overflow-x-auto no-scrollbar">
                {[
                  { id: 'exterior', label: language === 'ar' ? 'المزايا الخارجية' : 'Exterior' },
                  { id: 'interior', label: language === 'ar' ? 'المزايا الداخلية' : 'Interior' },
                  { id: 'performance', label: language === 'ar' ? 'الأداء' : 'Performance' },
                  { id: 'comfort', label: language === 'ar' ? 'الراحة والسلامة' : 'Comfort & Safety' }
                ].map((t) => {
                  const isActive = featureTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setFeatureTab(t.id as any)}
                      className={`pb-3 text-sm md:text-base font-normal transition-all cursor-pointer relative ${
                        isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {t.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3]"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuresList[featureTab] || featuresList.exterior).map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0056B3]/30 hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={feat.image}
                      alt={feat.titleAr}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 font-arabic group-hover:text-[#0056B3] transition-colors">
                        {language === 'ar' ? feat.titleAr : feat.titleEn}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {language === 'ar' ? feat.descAr : feat.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider />

        {/* 6. Grades & Trims Section ("الفئات") matching Solina SA */}
        <section id="grades" className="py-16 bg-white border-b border-gray-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-6 tracking-tight">
                {language === 'ar' ? 'الفئات' : 'Grades & Trims'}
              </h2>

              {/* Fuel Type Filter Badge */}
              <div className="inline-flex items-center justify-center gap-2 bg-gray-100 p-1 rounded-full text-xs font-bold">
                <button
                  onClick={() => setGradeFilter('all')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    gradeFilter === 'all' ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {language === 'ar' ? `الجميع (${vehicle.grades.length})` : `All (${vehicle.grades.length})`}
                </button>
                <button
                  onClick={() => setGradeFilter('petrol')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    gradeFilter === 'petrol' ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {language === 'ar' ? `بنزين (${vehicle.grades.length})` : 'Petrol'}
                </button>
              </div>
            </div>

            {/* Official Grades Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1720px] mx-auto">
              {vehicle.grades.map((grade, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 hover:bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-[#0056B3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-center"
                >
                  <div>
                    {/* Fuel Badge Top Right */}
                    <div className="flex justify-start mb-4">
                      <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded">
                        {vehicle.powertrain}
                      </span>
                    </div>

                    {/* Grade Name */}
                    <h3 className="text-2xl font-bold text-gray-900 font-arabic mb-4">
                      {grade.name}
                    </h3>

                    {/* Price with SAR Symbol */}
                    <div className="mb-4">
                      <span className="text-[11px] text-gray-500 block mb-1">السعر</span>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl md:text-3xl font-black font-mono text-[#0056B3]">
                          {formatPrice(grade.price)}
                        </span>
                        <span className="text-xs font-bold text-[#0056B3]">﷼</span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        شاملة مصاريف الشحن وضريبة القيمة المضافة 15%
                      </span>
                    </div>

                    {/* Engine Info */}
                    <div className="py-3 border-t border-b border-gray-200 my-4 text-xs font-bold text-gray-900">
                      <span className="text-[10px] text-gray-500 font-normal block mb-0.5">المحرك</span>
                      {grade.engine}
                    </div>

                    {/* Detailed Specs List */}
                    <div className="space-y-3 text-xs text-gray-700 text-start py-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">القوة القصوى:</span>
                        <span className="font-bold">{vehicle.horsepower}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">نظام الدفع:</span>
                        <span className="font-bold">{vehicle.drivetrain || 'دفع أمامي FWD'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">العزم الأقصى:</span>
                        <span className="font-bold">{vehicle.torque}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ناقل الحركة:</span>
                        <span className="font-bold">{grade.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">كفاءة استهلاك الوقود:</span>
                        <span className="font-bold text-emerald-600">{vehicle.fuelEconomy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons matching Solina SA */}
                  <div className="mt-8 space-y-2.5">
                    <button
                      onClick={() => onOpenQuotation(vehicle, grade)}
                      className="w-full py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs shadow transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'خيارات الشراء' : 'Buying Options'}
                    </button>

                    <button
                      onClick={() => onOpenTestDrive(`${vehicle.nameAr} - فئة ${grade.name}`)}
                      className="w-full py-3 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs border border-gray-300 transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Colors & Customizer Section ("استكشف وخصص") matching Solina SA */}
        <section id="colors" className="py-16 bg-gray-50 border-b border-gray-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-2 tracking-tight">
              {language === 'ar' ? 'استكشف وخصص' : 'Explore & Customize'}
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              {language === 'ar' ? 'اختر لون الطلاء المفضل لاستعراض مظهر السيارة' : 'Select paint color to preview vehicle exterior'}
            </p>

            {/* Color Swatches Palette */}
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              {vehicle.colors.map((col, idx) => (
                <button
                  key={col.id}
                  onClick={() => setSelectedColorIndex(idx)}
                  title={col.name}
                  style={{ backgroundColor: col.hex }}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer shadow-sm ${
                    selectedColorIndex === idx
                      ? 'scale-125 border-[#0056B3] ring-2 ring-red-400'
                      : 'border-white hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Selected Color Name */}
            <div className="text-base font-bold text-gray-900 mb-8">
              {activeColor.name}
            </div>

            {/* Full Width Car Visual Stage */}
            <div className="max-w-4xl mx-auto h-72 sm:h-96 flex items-center justify-center p-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
              <img
                src={activeColor.image || vehicle.cardImage}
                alt={activeColor.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
        </section>

        {/* 7.5. Official Manufacturer Fact Sheet & Warranty */}
        <section className="py-14 bg-gradient-to-br from-gray-900 to-black text-white border-b border-gray-800">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0056B3]/30 border border-[#0056B3]/50 text-blue-300 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#0056B3]" />
                    <span>{language === 'ar' ? `شهادة المصنع الرسمية • ${brandMeta.brandName}` : `Official Manufacturer Certificate • ${brandMeta.brandNameEn}`}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white font-arabic">
                    {language === 'ar' ? 'الضمان المصنعي وباقة الأمان المعتمدة' : 'Official Warranty & Safety Systems'}
                  </h3>

                  <div className="space-y-3 pt-2 text-sm text-gray-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-bold block mb-0.5">{language === 'ar' ? 'الضمان الرسمي المعتمد:' : 'Certified Factory Warranty:'}</strong>
                        <span>{language === 'ar' ? brandMeta.warranty : brandMeta.warrantyEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-bold block mb-0.5">{language === 'ar' ? 'باقة أنظمة الأمان المتطورة:' : 'Active Safety Suite:'}</strong>
                        <span>{language === 'ar' ? brandMeta.safetySuite : brandMeta.safetySuiteEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-bold block mb-0.5">{language === 'ar' ? 'باقة خدمة كبار الشخصيات والدعم:' : 'VIP Service & Roadside Care:'}</strong>
                        <span>{language === 'ar' ? brandMeta.carePackage : brandMeta.carePackageEn}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
                  <button
                    onClick={() => onOpenTestDrive(vehicle.nameAr)}
                    className="px-8 py-3.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-sm shadow-lg transition-all text-center cursor-pointer"
                  >
                    {language === 'ar' ? 'حجز تجربة قيادة رسمية' : 'Book Official Test Drive'}
                  </button>

                  <button
                    onClick={() => onOpenQuotation(vehicle, activeGrade)}
                    className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center cursor-pointer"
                  >
                    {language === 'ar' ? 'طلب عرض سعر وتمويل فوري' : 'Request Instant Quotation'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Similar Vehicles Section ("السيارات المشابهة") */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-normal text-black font-arabic mb-2">
                {language === 'ar' ? 'السيارات المشابهة' : 'Similar Vehicles'}
              </h2>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'اكتشف المزيد من طرازات سولينا في نفس الفئة' : 'Explore more Solina vehicles in this segment'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarVehicles.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onSelectOtherVehicle(sim.id)}
                  className="bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#0056B3] hover:shadow-lg transition-all duration-300 cursor-pointer text-center group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-base text-gray-900 mb-1 group-hover:text-[#0056B3] transition-colors">
                      {sim.nameAr}
                    </h3>
                    <div className="text-xs text-gray-600 mb-3">
                      <span>تبدأ من </span>
                      <span className="font-bold text-[#0056B3] font-mono">{formatPrice(sim.priceStartingFrom)}</span>
                      <span className="text-[10px] font-bold text-[#0056B3]"> ﷼</span>
                    </div>
                    <div className="h-28 flex items-center justify-center">
                      <img
                        src={sim.cardImage}
                        alt={sim.nameAr}
                        className="max-h-24 object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-xs font-bold text-[#0056B3] flex items-center justify-center gap-1">
                    <span>استكشف الطراز</span>
                    <span>›</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 9. Official Footer */}
      <Footer />
    </div>
  );
};
