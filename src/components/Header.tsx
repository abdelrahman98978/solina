import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  Search, 
  Phone, 
  Car, 
  Tag, 
  FileText, 
  MapPin, 
  Layers, 
  ChevronDown, 
  Globe,
  SlidersHorizontal,
  Wrench,
  ShieldCheck,
  Cpu,
  Flame,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Compass,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { VEHICLES } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onOpenCompare: () => void;
  comparisonCount: number;
  onSelectCategory: (category: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTestDrive,
  onOpenServiceBooking,
  onOpenCompare,
  comparisonCount,
  onSelectCategory,
  onSelectVehicle,
  onOpenAdmin
}) => {
  const { language, toggleLanguage, t, formatPrice, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehiclesDropdownOpen, setVehiclesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [offersDropdownOpen, setOffersDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaCategory, setActiveMegaCategory] = useState<'all' | 'sedan' | 'suv' | 'commercial' | 'hybrid' | 'gr'>('all');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredVehicles = VEHICLES.filter(v => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      v.nameAr.toLowerCase().includes(q) ||
      v.nameEn.toLowerCase().includes(q) ||
      v.bodyTypeAr.toLowerCase().includes(q) ||
      v.bodyTypeEn.toLowerCase().includes(q) ||
      v.powertrain.toLowerCase().includes(q)
    );
  });

  const megaMenuVehicles = activeMegaCategory === 'all' 
    ? VEHICLES.slice(0, 6) 
    : VEHICLES.filter(v => {
        if (activeMegaCategory === 'hybrid') return v.isHybrid || v.powertrain === 'هايبرد';
        if (activeMegaCategory === 'gr') return v.isGR || v.category === 'gr';
        return v.category === activeMegaCategory;
      }).slice(0, 6);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0A0E17] text-gray-300 text-xs py-2 px-4 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {language === 'ar' ? 'الموزع المعتمد — الجبراني للسيارات' : 'Official Distributor — Al Jabrani Motors'}
            </span>
            <span className="hidden md:inline-block text-gray-600">|</span>
            <a 
              href="tel:8002444400" 
              className="hidden md:flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'الرقم المجاني: 800 244 4400' : 'Toll Free: 800 244 4400'}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="#showrooms" 
              className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ar' ? 'الفروع ومراكز الخدمة' : 'Branches & Service Centers'}</span>
            </a>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] font-bold text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1 bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/20 cursor-pointer"
              >
                <span>{language === 'ar' ? 'لوحة الإدارة' : 'Admin'}</span>
              </button>
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-yellow-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`bg-white text-gray-900 border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-lg py-3' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Brand Logo: Al Jabrani Motors */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shadow-md shadow-blue-600/20 p-1.5 border border-blue-400/30">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8ZM50 86.5C29.8 86.5 13.5 70.2 13.5 50C13.5 29.8 29.8 13.5 50 13.5C70.2 13.5 86.5 29.8 86.5 50C86.5 70.2 70.2 86.5 50 86.5Z"
                    fill="white"
                  />
                  <ellipse cx="50" cy="50" rx="38" ry="18" stroke="white" strokeWidth="5.5" fill="none" />
                  <ellipse cx="50" cy="38" rx="16" ry="24" stroke="white" strokeWidth="5.5" fill="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl font-display tracking-tight text-gray-900 leading-none group-hover:text-blue-600 transition-colors">
                  {language === 'ar' ? 'الجبراني للسيارات' : 'AL JABRANI MOTORS'}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mt-1">
                  {language === 'ar' ? 'الموزع المعتمد المتميز' : 'Authorized Premier Dealer'}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Mega Menu Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-semibold text-xs md:text-sm">
            {/* 1. Vehicles Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => { setVehiclesDropdownOpen(true); setServicesDropdownOpen(false); setOffersDropdownOpen(false); }}
            >
              <button 
                onClick={() => {
                  const el = document.getElementById('explore-vehicles');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                  vehiclesDropdownOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Car className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'السيارات' : 'Vehicles'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${vehiclesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* 2. Offers Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => { setOffersDropdownOpen(true); setVehiclesDropdownOpen(false); setServicesDropdownOpen(false); }}
            >
              <button 
                onClick={() => {
                  const el = document.getElementById('offers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                  offersDropdownOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Tag className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'العروض' : 'Offers'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${offersDropdownOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* 3. Aftersales & Services Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => { setServicesDropdownOpen(true); setVehiclesDropdownOpen(false); setOffersDropdownOpen(false); }}
            >
              <button 
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                  servicesDropdownOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'خدمات ما بعد البيع' : 'After-sales & Services'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* 4. Certified Pre-Owned */}
            <a 
              href="#certified-preowned" 
              className="px-3.5 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {language === 'ar' ? 'السيارات المستعملة المعتمدة' : 'Certified Pre-Owned'}
            </a>

            {/* 5. Finance Calculator */}
            <a 
              href="#finance" 
              className="px-3.5 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {language === 'ar' ? 'حاسبة التمويل' : 'Finance Calculator'}
            </a>

            {/* 6. Branches */}
            <a 
              href="#showrooms" 
              className="px-3.5 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {language === 'ar' ? 'الفروع' : 'Branches'}
            </a>
          </div>

          {/* Action CTAs: Search, Compare, Book Test Drive */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              title={language === 'ar' ? 'البحث عن سيارة' : 'Search vehicles'}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Vehicle Drawer Trigger */}
            <button
              onClick={onOpenCompare}
              className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              title={language === 'ar' ? 'مقارنة السيارات' : 'Compare vehicles'}
            >
              <Layers className="w-4 h-4" />
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-sm">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Book Test Drive CTA */}
            <button
              onClick={() => onOpenTestDrive()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Car className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حجز تجربة قيادة' : 'Book Test Drive'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 1. Vehicles Mega Menu Dropdown */}
        {vehiclesDropdownOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 py-8 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseLeave={() => setVehiclesDropdownOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-12">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  {(['all', 'sedan', 'suv', 'commercial', 'hybrid', 'gr'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveMegaCategory(cat);
                        onSelectCategory(cat);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeMegaCategory === cat
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {cat === 'all' && (language === 'ar' ? 'كافة السيارات' : 'All Models')}
                      {cat === 'sedan' && (language === 'ar' ? 'السيدان' : 'Sedan')}
                      {cat === 'suv' && (language === 'ar' ? 'الدفع الرباعي SUV' : 'SUV & Crossover')}
                      {cat === 'commercial' && (language === 'ar' ? 'السيارات التجارية' : 'Commercial')}
                      {cat === 'hybrid' && (language === 'ar' ? 'الهايبرد HEV' : 'Hybrid & Electric')}
                      {cat === 'gr' && (language === 'ar' ? 'الأداء الرياضي GR' : 'Performance GR')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setVehiclesDropdownOpen(false);
                    const el = document.getElementById('explore-vehicles');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'عرض جميع الموديلات في الكتالوج' : 'View full vehicle showroom'}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Grid of Vehicles in Mega Menu */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {megaMenuVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    onClick={() => {
                      setVehiclesDropdownOpen(false);
                      onSelectVehicle(vehicle.id);
                    }}
                    className="group bg-gray-50 hover:bg-blue-50/50 rounded-2xl p-3 border border-gray-200/70 hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-24 flex items-center justify-center overflow-hidden">
                      <img
                        src={vehicle.cardImage}
                        alt={vehicle.nameAr}
                        className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 block line-clamp-1">
                        {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 block mt-0.5">
                        {language === 'ar' ? 'تبدأ من ' : 'From '}
                        <strong className="text-blue-600">{formatPrice(vehicle.priceStartingFrom)}</strong> {language === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Services Dropdown */}
        {servicesDropdownOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 py-8 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div 
                onClick={() => { setServicesDropdownOpen(false); onOpenServiceBooking(); }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200/80 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 mb-1">
                  {language === 'ar' ? 'حجز موعد صيانة' : 'Book a Service'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === 'ar' ? 'احجز موعد الصيانة الدورية أو الإصلاحات السريعة مع كادرنا الفني المعتمد.' : 'Schedule periodic service or rapid express maintenance.'}
                </p>
              </div>

              <div 
                onClick={() => { setServicesDropdownOpen(false); const el = document.getElementById('spare-parts'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200/80 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 mb-1">
                  {language === 'ar' ? 'قطع الغيار الأصلية 100%' : 'Genuine Spare Parts'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === 'ar' ? 'كتالوج قطع الغيار المعتمدة والإكسسوارات مع الضمان الذهبي.' : 'Authorized genuine components and factory accessories catalog.'}
                </p>
              </div>

              <div 
                onClick={() => { setServicesDropdownOpen(false); const el = document.getElementById('finance'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200/80 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                  <Calculator className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 mb-1">
                  {language === 'ar' ? 'برامج التمويل والتأجير' : 'Financing Solutions'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === 'ar' ? 'حلول تمويلية معتمدة ومتوافقة مع الشريعة بأقل هامش ربح.' : 'Sharia-compliant financing and flexible leasing schemes.'}
                </p>
              </div>

              <div 
                onClick={() => { setServicesDropdownOpen(false); const el = document.getElementById('showrooms'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200/80 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 mb-1">
                  {language === 'ar' ? 'فروعنا وشبكة الخدمة' : 'Our Branch Network'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {language === 'ar' ? 'أكثر من 70 صالة عرض ومركز خدمة موزعة في جميع مناطق المملكة.' : 'Over 70 showrooms and certified centers across Saudi Arabia.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Offers Dropdown */}
        {offersDropdownOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 py-8 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseLeave={() => setOffersDropdownOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => { setOffersDropdownOpen(false); const el = document.getElementById('offers'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-blue-50/50 hover:bg-blue-50 border border-blue-200 transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white inline-block mb-3">
                  {language === 'ar' ? 'عروض 2026' : '2026 Campaigns'}
                </span>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-blue-600 mb-1">
                  {language === 'ar' ? '5 سنوات راحة بال مع فيلوز 2026' : '5 Years Peace of Mind with Veloz'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {language === 'ar' ? 'صيانة مجانية 5 سنوات أو 100,000 كم مع ضمان شامل.' : 'Complimentary 5-year scheduled maintenance and warranty.'}
                </p>
              </div>

              <div 
                onClick={() => { setOffersDropdownOpen(false); const el = document.getElementById('offers'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white inline-block mb-3">
                  {language === 'ar' ? 'عروض الهايبرد' : 'Hybrid Campaigns'}
                </span>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-emerald-700 mb-1">
                  {language === 'ar' ? 'عروض تويوتا الهايبرد HEV الذكية' : 'Toyota HEV Smart Hybrid Offers'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {language === 'ar' ? 'استرداد نقدي فوري يصل حتى 15,000 ر.س مع تمويل ميسر.' : 'Instant cash refund up to 15,000 SAR and 0.99% profit rate.'}
                </p>
              </div>

              <div 
                onClick={() => { setOffersDropdownOpen(false); const el = document.getElementById('offers'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="p-5 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-200 transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-600 text-white inline-block mb-3">
                  {language === 'ar' ? 'تدشين حصري' : 'New Launch'}
                </span>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-amber-700 mb-1">
                  {language === 'ar' ? 'برادو 2026 الشكل الجديد كلياً' : 'All-New Prado 2026 Launch'}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {language === 'ar' ? 'تسليم فوري من صالات العرض مع باقة حماية النانو مجاناً.' : 'Priority immediate delivery with free nano-ceramic package.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Global Vehicle Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                autoFocus
                placeholder={language === 'ar' ? 'ابحث باسم الموديل (كامري، برادو، لاندكروزر، هايبرد)...' : 'Search by model (Camry, Prado, Land Cruiser, Hybrid)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm md:text-base text-gray-900 outline-none font-medium"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results or Suggested Tags */}
            <div className="p-5 max-h-96 overflow-y-auto">
              {searchQuery.trim() ? (
                filteredVehicles.length > 0 ? (
                  <div className="space-y-3">
                    {filteredVehicles.map(vehicle => (
                      <div
                        key={vehicle.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                          onSelectVehicle(vehicle.id);
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200/70 hover:border-blue-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={vehicle.cardImage}
                            alt={vehicle.nameAr}
                            className="w-16 h-10 object-contain"
                          />
                          <div>
                            <span className="font-bold text-sm text-gray-900 block">
                              {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                            </span>
                            <span className="text-xs text-gray-500">
                              {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn} • {vehicle.powertrain}
                            </span>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-xs font-mono font-bold text-blue-600 block">
                            {formatPrice(vehicle.priceStartingFrom)} {language === 'ar' ? 'ر.س' : 'SAR'}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {language === 'ar' ? 'تبدأ من' : 'Starts from'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500 text-xs">
                    {language === 'ar' ? 'لم يتم العثور على سيارات مطابقة لبحثك.' : 'No vehicles found matching your search.'}
                  </div>
                )
              ) : (
                <div>
                  <span className="text-xs font-bold text-gray-400 block mb-3">
                    {language === 'ar' ? 'عمليات البحث الشائعة:' : 'Popular Searches:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['كامري 2026', 'برادو 2026', 'لاندكروزر 300', 'راف فور هايبرد', 'فيلوز 7 ركاب', 'هايلكس غمارتين', 'سوبرا GR'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-6 space-y-5 animate-in slide-in-from-top-2 shadow-2xl">
          <div className="flex flex-col space-y-3 font-bold text-sm">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('explore-vehicles');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'السيارات وموديلات 2026' : 'Vehicles & 2026 Lineup'}</span>
              <Car className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('offers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'أحدث العروض التمويلية' : 'Financing & Deals'}</span>
              <Tag className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServiceBooking();
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'حجز خدمة صيانة' : 'Book Maintenance Service'}</span>
              <Wrench className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('certified-preowned');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'السيارات المستعملة المعتمدة' : 'Certified Pre-Owned'}</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('finance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'حاسبة التمويل والأقساط' : 'Finance Calculator'}</span>
              <Calculator className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('showrooms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-start py-2 text-gray-800 hover:text-blue-600 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{language === 'ar' ? 'الفروع وصالات العرض' : 'Showrooms & Branches'}</span>
              <MapPin className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              <span>{language === 'ar' ? 'حجز تجربة قيادة' : 'Book a Test Drive'}</span>
            </button>

            <a
              href="tel:8002444400"
              className="w-full py-3 bg-gray-100 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{language === 'ar' ? 'اتصل بخدمة الضيوف: 800 244 4400' : 'Call Care: 800 244 4400'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
