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
  Sparkles
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
  const { language, toggleLanguage, t, formatPrice } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehiclesDropdownOpen, setVehiclesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaCategory, setActiveMegaCategory] = useState<'all' | 'sedan' | 'suv' | 'commercial' | 'gr'>('all');

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
      v.bodyTypeEn.toLowerCase().includes(q)
    );
  });

  const megaMenuVehicles = activeMegaCategory === 'all' 
    ? VEHICLES.slice(0, 6) 
    : VEHICLES.filter(v => v.category === activeMegaCategory || (activeMegaCategory === 'gr' && (v.isGR || v.category === 'gr')));

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top ALJ & Utility Bar */}
      <div className="bg-[#12141A] text-gray-300 text-xs py-1.5 px-4 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {t('officialDealer')}
            </span>
            <span className="hidden md:inline-block text-gray-600">|</span>
            <a 
              href="tel:8004400055" 
              className="hidden md:flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              {t('tollFree')}
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href="#showrooms" 
              className="hover:text-white transition-colors hidden sm:flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {t('showroomsAndService')}
            </a>

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 hover:text-white transition-all text-xs font-bold py-1 px-3 rounded-full bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-400/40 cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'ar' ? 'لوحة الإدارة' : 'Admin Portal'}</span>
              </button>
            )}

            {/* Bilingual Toggle Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 hover:text-white transition-all text-xs font-bold py-1 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-gray-200/80 ${
        isScrolled ? 'shadow-md py-2.5' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Right Section: Logo & Brand */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-3 group">
              {/* Toyota & Lexus Luxury Emblem SVG */}
              <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8ZM50 86.5C29.8 86.5 13.5 70.2 13.5 50C13.5 29.8 29.8 13.5 50 13.5C70.2 13.5 86.5 29.8 86.5 50C86.5 70.2 70.2 86.5 50 86.5Z"
                    fill="#1A56DB"
                  />
                  <ellipse cx="50" cy="50" rx="38" ry="18" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                  <ellipse cx="50" cy="38" rx="16" ry="24" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] leading-none font-display">
                  TOYOTA <span className="text-blue-600 text-sm font-semibold">& LEXUS</span>
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                  {language === 'ar' ? 'جبراني للسيارات' : 'Gibrani Motors'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Mega-menu Trigger for Vehicles */}
              <div className="relative">
                <button 
                  onClick={() => setVehiclesDropdownOpen(!vehiclesDropdownOpen)}
                  onMouseEnter={() => setVehiclesDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold text-xs md:text-sm transition-all ${
                    vehiclesDropdownOpen ? 'bg-blue-600 text-white' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>{t('vehicles')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${vehiclesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <a 
                href="#explore-vehicles" 
                onClick={() => onSelectCategory('all')}
                className="px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                {t('allModels')}
              </a>

              <a 
                href="#offers" 
                className="flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <Tag className="w-4 h-4 text-blue-600" />
                <span>{t('latestOffers')}</span>
              </a>

              <a 
                href="#finance" 
                className="flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{t('financeCalc')}</span>
              </a>

              <a 
                href="#tech-simulator" 
                className="flex items-center gap-1 px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ar' ? 'تقنيات الهايبرد والأمان' : 'Tech & Safety'}</span>
              </a>

              <a 
                href="#gr-performance" 
                className="flex items-center gap-1 px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all"
              >
                <Flame className="w-4 h-4 text-blue-600" />
                <span>GR & F-Sport</span>
              </a>

              <a 
                href="#certified-preowned" 
                className="px-3 py-2 rounded-full font-semibold text-xs md:text-sm text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-all hidden xl:block"
              >
                {t('preOwned')}
              </a>
            </nav>
          </div>

          {/* Left Section: Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="البحث عن موديل"
              className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Compare Badge CTA */}
            <button 
              onClick={onOpenCompare}
              className="relative hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all text-xs font-semibold cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>{t('compareVehicles')}</span>
              {comparisonCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center -mr-1">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Quick Service Button */}
            <button
              onClick={onOpenServiceBooking}
              className="hidden lg:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3.5 py-2.5 rounded-full border border-gray-200 transition-all cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>{t('quickService')}</span>
            </button>

            {/* Book Test Drive CTA */}
            <button 
              onClick={() => onOpenTestDrive()}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>{t('bookTestDrive')}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Mega-Menu Dropdown */}
      {vehiclesDropdownOpen && (
        <div 
          onMouseLeave={() => setVehiclesDropdownOpen(false)}
          className="hidden lg:block absolute top-full right-0 left-0 bg-white shadow-2xl border-b border-gray-200 z-40 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {language === 'ar' ? 'تصفح أسطول سيارات جبراني 2026' : 'Browse Gibrani Motors 2026 Vehicle Lineup'}
                </span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
                  {VEHICLES.length} {t('availableModelsCount')}
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: t('catAll') },
                  { id: 'sedan', label: t('catSedan') },
                  { id: 'suv', label: t('catSUV') },
                  { id: 'commercial', label: t('catCommercial') },
                  { id: 'gr', label: t('catGR') }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveMegaCategory(cat.id as any)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      activeMegaCategory === cat.id 
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mega Menu Vehicles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {megaMenuVehicles.map(vehicle => (
                <div 
                  key={vehicle.id}
                  onClick={() => {
                    setVehiclesDropdownOpen(false);
                    onSelectVehicle(vehicle.id);
                  }}
                  className="group flex flex-col p-3 rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-lg bg-gray-50/50 hover:bg-white transition-all cursor-pointer text-center"
                >
                  <div className="h-24 w-full flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={vehicle.cardImage} 
                      alt={vehicle.nameAr}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4 className="font-bold text-xs md:text-sm text-gray-900 mt-2 group-hover:text-blue-600 transition-colors truncate">
                    {language === 'ar' ? vehicle.nameAr.replace('تويوتا ', '') : vehicle.nameEn.replace('Toyota ', '')}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn}</p>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">{t('startsFrom')}</span>
                    <span className="font-bold text-gray-900 font-mono">{formatPrice(vehicle.priceStartingFrom)} ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Dropdown */}
      {searchOpen && (
        <div className="absolute top-full right-0 left-0 bg-white shadow-2xl border-b border-gray-200 z-40 p-4 md:p-6 animate-in slide-in-from-top-2">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl py-3.5 pr-12 pl-10 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filtered Search Results */}
            {searchQuery.trim() && (
              <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map(v => (
                    <div
                      key={v.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        onSelectVehicle(v.id);
                      }}
                      className="p-3 bg-gray-50 hover:bg-blue-50/50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={v.cardImage} alt={v.nameAr} className="w-14 h-10 object-contain" />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">
                            {language === 'ar' ? v.nameAr : v.nameEn}
                          </h4>
                          <span className="text-xs text-gray-500">{v.bodyTypeAr} | {v.engineSpec}</span>
                        </div>
                      </div>
                      <div className="text-left font-mono">
                        <span className="text-xs font-black text-blue-600">{formatPrice(v.priceStartingFrom)} ر.س</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-gray-500">
                    {language === 'ar' ? 'لم يتم العثور على سيارات مطابقة لنتائج البحث.' : 'No vehicles found matching your query.'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Off-Canvas Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-2">
            <a
              href="#explore-vehicles"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectCategory('all');
              }}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('allModels')}
            </a>
            <a
              href="#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('latestOffers')}
            </a>
            <a
              href="#finance"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('financeCalc')}
            </a>
            <a
              href="#tech-simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-blue-600 hover:bg-gray-100"
            >
              {t('techSimulator')}
            </a>
            <a
              href="#gr-performance"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-blue-700 hover:bg-gray-100"
            >
              {t('grPerformance')}
            </a>
            <a
              href="#certified-preowned"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('preOwned')}
            </a>
            <a
              href="#spare-parts"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('spareParts')}
            </a>
            <a
              href="#showrooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-100"
            >
              {t('showroomsAndService')}
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServiceBooking();
              }}
              className="w-full py-3 bg-gray-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>{t('quickService')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>{t('bookTestDrive')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
