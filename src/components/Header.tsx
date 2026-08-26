import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  Search, 
  Phone, 
  Car, 
  Tag, 
  FileText, 
  MapPin, 
  ChevronDown, 
  Wrench, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Sparkles, 
  User, 
  SlidersHorizontal,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  Scale,
  Smartphone
} from 'lucide-react';
import { VEHICLES, type Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onOpenCompare: () => void;
  comparisonCount: number;
  onSelectCategory: (category: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  onOpenAdmin?: () => void;
  onNavigate?: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTestDrive,
  onOpenServiceBooking,
  onOpenCompare,
  comparisonCount,
  onSelectCategory,
  onSelectVehicle,
  onOpenAdmin,
  onNavigate
}) => {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation Menus State
  const [activeMenu, setActiveMenu] = useState<'vehicles' | 'offers' | 'owners' | 'discover' | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mega Menu Filters
  const [filterBodyType, setFilterBodyType] = useState<string>('all');
  const [filterPowertrain, setFilterPowertrain] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(350000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter vehicles for the mega menu
  // Filter Solina models for fleet mega menu
  const toyotaOnlyVehicles = VEHICLES.filter(v => v.brand !== 'lexus');

  const filteredMegaVehicles = toyotaOnlyVehicles.filter(v => {
    if (filterBodyType !== 'all') {
      if (filterBodyType === 'sedan' && v.category !== 'sedan' && v.category !== 'gr') return false;
      if (filterBodyType === 'suv' && v.category !== 'suv') return false;
      if (filterBodyType === 'commercial' && v.category !== 'commercial') return false;
    }
    if (filterPowertrain !== 'all') {
      if (filterPowertrain === 'hybrid' && !v.isHybrid && v.powertrain !== 'هايبرد') return false;
      if (filterPowertrain === 'petrol' && v.powertrain !== 'بنزين') return false;
      if (filterPowertrain === 'diesel' && v.powertrain !== 'ديزل') return false;
    }
    if (v.priceStartingFrom > maxPrice) return false;
    return true;
  });

  const getModelTitle = (v: any) => {
    if (v.id.includes('yaris')) return `Yaris ${v.year}`;
    if (v.id.includes('corolla-cross')) return `Corolla Cross ${v.year}`;
    if (v.id.includes('corolla')) return `Corolla ${v.year}`;
    if (v.id.includes('camry')) return `Camry ${v.year}`;
    if (v.id.includes('crown')) return `Crown ${v.year}`;
    if (v.id.includes('gr86')) return `GR86 ${v.year}`;
    if (v.id.includes('supra')) return `Supra ${v.year}`;
    if (v.id.includes('raize')) return `Raize ${v.year}`;
    if (v.id.includes('urban-cruiser')) return `Urban Cruiser ${v.year}`;
    if (v.id.includes('veloz')) return `Veloz ${v.year}`;
    if (v.id.includes('rav4')) return `RAV4 ${v.year}`;
    if (v.id.includes('innova')) return `Innova ${v.year}`;
    if (v.id.includes('fortuner')) return `Fortuner ${v.year}`;
    if (v.id.includes('highlander')) return `Highlander ${v.year}`;
    if (v.id.includes('prado')) return `Prado ${v.year}`;
    if (v.id.includes('lc300') || v.id.includes('land-cruiser')) return `Land Cruiser ${v.year}`;
    if (v.id.includes('hilux')) return `Hilux ${v.year}`;
    if (v.id.includes('hiace')) return `Hiace ${v.year}`;
    if (v.id.includes('liteace')) return `LiteAce ${v.year}`;
    if (v.id.includes('coaster')) return `Coaster ${v.year}`;
    return v.nameEn.replace(/Solina |All-New /gi, '');
  };

  const sedanOrder = ['yaris-2026', 'corolla-2026', 'camry-2026', 'crown-2026', 'gr86-2026', 'gr-supra-2026'];
  const suvOrder = ['raize-2026', 'urban-cruiser-2026', 'veloz-2026', 'corolla-cross-2025', 'rav4-2026', 'innova-zenix-2026', 'fortuner-2026', 'highlander-2026', 'prado-2026', 'lc300-2026'];
  const commercialOrder = ['hilux-2026', 'hiace-2026', 'liteace-2026', 'coaster-2026'];

  const sedanVehicles = filteredMegaVehicles
    .filter(v => v.category === 'sedan' || v.category === 'gr')
    .sort((a, b) => {
      const idxA = sedanOrder.indexOf(a.id);
      const idxB = sedanOrder.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

  const suvVehicles = filteredMegaVehicles
    .filter(v => v.category === 'suv')
    .sort((a, b) => {
      const idxA = suvOrder.indexOf(a.id);
      const idxB = suvOrder.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

  const commercialVehicles = filteredMegaVehicles
    .filter(v => v.category === 'commercial')
    .sort((a, b) => {
      const idxA = commercialOrder.indexOf(a.id);
      const idxB = commercialOrder.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

  const colorPalette = [
    { name: 'كحلي', hex: '#1B2A4A' },
    { name: 'بني', hex: '#5C3A21' },
    { name: 'برونزي', hex: '#9C7A5B' },
    { name: 'رمادي مزرق', hex: '#637D92' },
    { name: 'أسود', hex: '#111111' },
    { name: 'ذهبي', hex: '#B89758' },
    { name: 'سماوي', hex: '#00BCD4' },
    { name: 'أبيض لؤلؤي', hex: '#EEEEEE' },
    { name: 'أحمر سولينا', hex: '#0056B3' },
    { name: 'برتقالي', hex: '#E65100' },
    { name: 'فحمي', hex: '#37474F' },
    { name: 'أخضر داكن', hex: '#1B3B2B' }
  ];

  return (
    <div ref={headerRef} className="sticky top-0 z-50 w-full bg-white font-arabic shadow-sm border-b border-gray-100">
      {/* Top Main Navigation Bar */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        {/* Right Side: Solina Motors Official Logo */}
        <div className="flex items-center gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }} className="flex items-center gap-3 group">
            <img 
              src="/solina-logo.png" 
              alt="سولينا للسيارات - Solina Motors" 
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 mr-6">
            {/* 1. المركبات */}
            <button
              onClick={() => setActiveMenu(activeMenu === 'vehicles' ? null : 'vehicles')}
              className={`relative py-6 text-base font-bold transition-colors flex items-center gap-1.5 ${
                activeMenu === 'vehicles' ? 'text-[#0056B3]' : 'text-gray-900 hover:text-[#0056B3]'
              }`}
            >
              <span>{language === 'ar' ? 'المركبات' : 'Vehicles'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'vehicles' ? 'rotate-180 text-[#0056B3]' : 'text-gray-500'}`} />
              {activeMenu === 'vehicles' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3] rounded-t-full"></span>
              )}
            </button>

            {/* 2. العروض */}
            <button
              onClick={() => setActiveMenu(activeMenu === 'offers' ? null : 'offers')}
              className={`relative py-6 text-base font-bold transition-colors flex items-center gap-1.5 ${
                activeMenu === 'offers' ? 'text-[#0056B3]' : 'text-gray-900 hover:text-[#0056B3]'
              }`}
            >
              <span>{language === 'ar' ? 'العروض' : 'Offers'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'offers' ? 'rotate-180 text-[#0056B3]' : 'text-gray-500'}`} />
              {activeMenu === 'offers' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3] rounded-t-full"></span>
              )}
            </button>

            {/* 3. ملاك سولينا */}
            <button
              onClick={() => setActiveMenu(activeMenu === 'owners' ? null : 'owners')}
              className={`relative py-6 text-base font-bold transition-colors flex items-center gap-1.5 ${
                activeMenu === 'owners' ? 'text-[#0056B3]' : 'text-gray-900 hover:text-[#0056B3]'
              }`}
            >
              <span>{language === 'ar' ? 'ملاك سولينا' : 'Solina Owners'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'owners' ? 'rotate-180 text-[#0056B3]' : 'text-gray-500'}`} />
              {activeMenu === 'owners' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3] rounded-t-full"></span>
              )}
            </button>

            {/* 4. اكتشف */}
            <button
              onClick={() => setActiveMenu(activeMenu === 'discover' ? null : 'discover')}
              className={`relative py-6 text-base font-bold transition-colors flex items-center gap-1.5 ${
                activeMenu === 'discover' ? 'text-[#0056B3]' : 'text-gray-900 hover:text-[#0056B3]'
              }`}
            >
              <span>{language === 'ar' ? 'اكتشف' : 'Discover'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'discover' ? 'rotate-180 text-[#0056B3]' : 'text-gray-500'}`} />
              {activeMenu === 'discover' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3] rounded-t-full"></span>
              )}
            </button>
          </nav>
        </div>

        {/* Left Side: Language Toggle, User Profile, and Red Solina Logo */}
        <div className="flex items-center gap-5">
          {/* Compare Shortcut Badge */}
          {comparisonCount > 0 && (
            <button 
              onClick={onOpenCompare}
              className="relative hidden sm:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
            >
              <Scale className="w-4 h-4 text-[#0056B3]" />
              <span>{language === 'ar' ? 'المقارنة' : 'Compare'}</span>
              <span className="w-5 h-5 rounded-full bg-[#0056B3] text-white flex items-center justify-center text-[10px]">
                {comparisonCount}
              </span>
            </button>
          )}

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 text-gray-700 hover:text-black py-2 px-2.5 rounded-full hover:bg-gray-100 transition-colors"
              title="حساب الضيف"
            >
              <User className="w-5 h-5 text-gray-700" />
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {userDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">{language === 'ar' ? 'أهلاً بك في سولينا' : 'Welcome to Solina'}</p>
                  <p className="text-sm font-bold text-gray-900">{language === 'ar' ? 'بوابة الضيف' : 'Guest Portal'}</p>
                </div>
                <div className="py-1">
                  <a href="#test-drive" onClick={() => { onOpenTestDrive(); setUserDropdownOpen(false); }} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#0056B3] transition-colors">
                    <Car className="w-4 h-4" />
                    <span>{language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive'}</span>
                  </a>
                  <a href="#service" onClick={() => { onOpenServiceBooking(); setUserDropdownOpen(false); }} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#0056B3] transition-colors">
                    <Wrench className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حجز موعد صيانة' : 'Book Service'}</span>
                  </a>
                  <button onClick={() => { if (onNavigate) onNavigate('showrooms'); else window.location.href = '#showrooms'; setUserDropdownOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                    <MapPin className="w-4 h-4" />
                    <span>{language === 'ar' ? 'أقرب فرع وصالة عرض' : 'Find Showroom'}</span>
                  </button>
                  <button onClick={() => { if (onNavigate) onNavigate('app'); else window.location.href = '#solina-app'; setUserDropdownOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-right cursor-pointer">
                    <Smartphone className="w-4 h-4 text-red-600" />
                    <span>{language === 'ar' ? 'تطبيق سولينا التفاعلي' : 'Solina Interactive App'}</span>
                  </button>
                  {onOpenAdmin && (
                    <button onClick={() => { onOpenAdmin(); setUserDropdownOpen(false); }} className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors text-right rounded-xl my-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>{language === 'ar' ? 'نظام إدارة الوكالة والـ ERP' : 'Dealership ERP & DMS'}</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-mono">ZATCA 2</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher: ع | EN */}
          <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
            <button 
              onClick={() => language !== 'ar' && toggleLanguage()}
              className={`hover:text-[#0056B3] transition-colors ${language === 'ar' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
            >
              ع
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => language !== 'en' && toggleLanguage()}
              className={`hover:text-[#0056B3] transition-colors ${language === 'en' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
            >
              EN
            </button>
          </div>

          {/* Official Solina Motors Left Brand Link */}
          <button 
            onClick={() => onNavigate ? onNavigate('home') : window.location.href = '/'}
            className="flex items-center gap-2 group cursor-pointer"
            title="سولينا للسيارات"
          >
            <img
              src="/solina-logo.png"
              alt="سولينا للسيارات"
              className="h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-black rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. MEGA MENU: المركبات (EXACT 1:1 SOLINA SA MEGNA MENU) */}
      {/* ========================================================================= */}
      {activeMenu === 'vehicles' && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 py-8 relative">
            
            {/* Top Close Button (Top Left) */}
            <div className="flex items-center justify-between pb-4 mb-6">
              <button 
                onClick={() => setActiveMenu(null)}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                title="إغلاق"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Vehicles Grid (Left 9 cols in RTL) */}
              <div className="lg:col-span-9 space-y-12 order-2 lg:order-1">
                
                {/* 1. قسم السيدان والرياضية */}
                {sedanVehicles.length > 0 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-right font-arabic">
                      {language === 'ar' ? 'السيدان' : 'Sedans & Sports'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                      {sedanVehicles.map((v) => (
                        <div 
                          key={v.id} 
                          onClick={() => {
                            onSelectVehicle(v.id);
                            setActiveMenu(null);
                          }}
                          className="group cursor-pointer flex flex-col items-center text-center transition-all p-2 rounded-xl hover:bg-gray-50/80"
                        >
                          <h4 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#0056B3] transition-colors leading-tight">
                            {getModelTitle(v)}
                          </h4>
                          <p className="text-xs md:text-sm font-semibold text-gray-600 mt-1 mb-3">
                            <span>{language === 'ar' ? 'تبدأ من ' : 'Starting from '}</span>
                            <span className="font-bold text-gray-900">{v.priceStartingFrom.toLocaleString()}</span>
                            <span className="text-[#0056B3] mr-1"> ﷼</span>
                          </p>
                          <div className="w-full h-28 md:h-32 flex items-center justify-center overflow-hidden">
                            <img 
                              src={v.cardImage} 
                              alt={v.nameAr} 
                              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. قسم السيارات متعددة الإستخدامات SUV */}
                {suvVehicles.length > 0 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-right font-arabic">
                      {language === 'ar' ? 'السيارات متعددة الإستخدامات' : 'SUVs & Crossovers'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                      {suvVehicles.map((v) => (
                        <div 
                          key={v.id} 
                          onClick={() => {
                            onSelectVehicle(v.id);
                            setActiveMenu(null);
                          }}
                          className="group cursor-pointer flex flex-col items-center text-center transition-all p-2 rounded-xl hover:bg-gray-50/80"
                        >
                          <h4 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#0056B3] transition-colors leading-tight">
                            {getModelTitle(v)}
                          </h4>
                          <p className="text-xs md:text-sm font-semibold text-gray-600 mt-1 mb-3">
                            <span>{language === 'ar' ? 'تبدأ من ' : 'Starting from '}</span>
                            <span className="font-bold text-gray-900">{v.priceStartingFrom.toLocaleString()}</span>
                            <span className="text-[#0056B3] mr-1"> ﷼</span>
                          </p>
                          <div className="w-full h-28 md:h-32 flex items-center justify-center overflow-hidden">
                            <img 
                              src={v.cardImage} 
                              alt={v.nameAr} 
                              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. قسم السيارات التجارية */}
                {commercialVehicles.length > 0 && (
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-right font-arabic">
                      {language === 'ar' ? 'السيارات التجارية' : 'Commercial Vehicles'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                      {commercialVehicles.map((v) => (
                        <div 
                          key={v.id} 
                          onClick={() => {
                            onSelectVehicle(v.id);
                            setActiveMenu(null);
                          }}
                          className="group cursor-pointer flex flex-col items-center text-center transition-all p-2 rounded-xl hover:bg-gray-50/80"
                        >
                          <h4 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#0056B3] transition-colors leading-tight">
                            {getModelTitle(v)}
                          </h4>
                          <p className="text-xs md:text-sm font-semibold text-gray-600 mt-1 mb-3">
                            <span>{language === 'ar' ? 'تبدأ من ' : 'Starting from '}</span>
                            <span className="font-bold text-gray-900">{v.priceStartingFrom.toLocaleString()}</span>
                            <span className="text-[#0056B3] mr-1"> ﷼</span>
                          </p>
                          <div className="w-full h-28 md:h-32 flex items-center justify-center overflow-hidden">
                            <img 
                              src={v.cardImage} 
                              alt={v.nameAr} 
                              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Filter Sidebar on Right (3 columns) */}
              <div className="lg:col-span-3 bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200/60 space-y-6 order-1 lg:order-2 h-fit text-right">
                
                {/* 1. نوع الهيكل (Body Type) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    {language === 'ar' ? 'نوع الهيكل' : 'Body Type'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'الجميع' },
                      { id: 'sedan', label: 'السيدان' },
                      { id: 'suv', label: 'السيارات متعددة الإستخدامات' },
                      { id: 'commercial', label: 'السيارات التجارية' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setFilterBodyType(tab.id)}
                        className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                          filterBodyType === tab.id
                            ? 'bg-black text-white shadow-sm'
                            : 'bg-white text-gray-800 border border-gray-300 hover:border-black'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. نوع المحرك (Engine / Powertrain) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    {language === 'ar' ? 'نوع المحرك' : 'Engine Type'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'الجميع' },
                      { id: 'petrol', label: 'بنزين' },
                      { id: 'hybrid', label: 'هجين' },
                      { id: 'diesel', label: 'ديزل' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setFilterPowertrain(tab.id)}
                        className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                          filterPowertrain === tab.id
                            ? 'bg-black text-white shadow-sm'
                            : 'bg-white text-gray-800 border border-gray-300 hover:border-black'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. شريط مدى السعر (Price Range Slider) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-900">
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </label>
                    <span className="text-xs font-mono font-bold text-[#0056B3]">
                      {maxPrice.toLocaleString()} ﷼
                    </span>
                  </div>
                  <input
                    type="range"
                    min="65000"
                    max="350000"
                    step="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0056B3]"
                  />
                  <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-mono">
                    <span>66,987 ﷼</span>
                    <span>334,535 ﷼</span>
                  </div>
                </div>

                {/* 4. دوائر الألوان (Colors) */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-gray-900">
                      {language === 'ar' ? 'اللون' : 'Color'}
                    </label>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {colorPalette.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(selectedColor === col.hex ? null : col.hex)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedColor === col.hex ? 'scale-125 border-black shadow-md ring-2 ring-[#0056B3]' : 'border-gray-200 hover:scale-110'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-left">
                    <button 
                      onClick={() => setSelectedColor(null)}
                      className="text-xs text-[#0056B3] hover:underline font-semibold"
                    >
                      {language === 'ar' ? 'رؤية الكل' : 'View All'}
                    </button>
                  </div>
                </div>

                {/* Quick Action Links matching reference */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={() => {
                      onOpenCompare();
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center justify-between text-sm font-bold text-gray-800 hover:text-[#0056B3] py-1.5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Scale className="w-4 h-4 text-[#0056B3]" />
                      <span>{language === 'ar' ? 'قارن المركبات' : 'Compare Vehicles'}</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenTestDrive();
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center justify-between text-sm font-bold text-gray-800 hover:text-[#0056B3] py-1.5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-[#0056B3]" />
                      <span>{language === 'ar' ? 'اطلب مكالمة' : 'Request a Call'}</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400" />
                  </button>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate('offers');
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center justify-between text-sm font-bold text-gray-800 hover:text-[#0056B3] py-1.5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-[#0056B3]" />
                      <span>{language === 'ar' ? 'أحدث العروض' : 'Latest Offers'}</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DROPDOWN: العروض (OFFERS) */}
      {/* ========================================================================= */}
      {activeMenu === 'offers' && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">أحدث عروض سولينا للسيارات</h3>
                <p className="text-xs text-gray-500">عروض الشراء والتمويل والصيانة المعتمدة</p>
              </div>
              <button 
                onClick={() => { if (onNavigate) onNavigate('offers'); setActiveMenu(null); }}
                className="px-5 py-2 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>استكشف صفحة العروض كاملة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <a 
                href="#offers" 
                onClick={() => { if (onNavigate) onNavigate('offers'); setActiveMenu(null); }}
                className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-300 hover:bg-red-50/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#0056B3] flex items-center justify-center mb-3">
                  <Tag className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-[#0056B3] mb-1">
                  عروض 5 سنوات مع فيلوز
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  صيانة ممتدة ومساعدة مجانية على الطريق لمدة 5 سنوات.
                </p>
              </a>

              <a 
                href="#offers" 
                onClick={() => { if (onNavigate) onNavigate('offers'); setActiveMenu(null); }}
                className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-300 hover:bg-red-50/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-[#0056B3] mb-1">
                  راحة بال HEV حتى 10 سنوات
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  ضمان ممتد على بطاريات كافة موديلات الهايبرد الصديقة للبيئة.
                </p>
              </a>

              <a 
                href="#offers" 
                onClick={() => { if (onNavigate) onNavigate('offers'); setActiveMenu(null); }}
                className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-300 hover:bg-red-50/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-[#0056B3] mb-1">
                  باقات الصيانة الدورية
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  صيانة 10,000 كم بـ 99 ريال، وخدمة 30,000 كم مجانية بالكامل.
                </p>
              </a>

              <a 
                href="#calculator" 
                onClick={() => { if (onNavigate) onNavigate('offers'); setActiveMenu(null); }}
                className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-300 hover:bg-red-50/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900 group-hover:text-[#0056B3] mb-1">
                  حاسبة التمويل والأقساط
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  احسب قسطك الشهري بدقة مع عروض التمويل التأجيري الميسرة.
                </p>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DROPDOWN: ملاك سولينا (SOLINA OWNERS) */}
      {/* ========================================================================= */}
      {activeMenu === 'owners' && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">بوابة ملاك سولينا والخدمات المعتمدة</h3>
                <p className="text-xs text-gray-500">جداول الصيانة، برنامج جميل كير، وحجز المواعيد</p>
              </div>
              <button 
                onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }}
                className="px-5 py-2 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>فتح صفحة ملاك سولينا بالكامل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">خدمات الصيانة</h4>
                <button onClick={() => { onOpenServiceBooking(); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  حجز الصيانة
                </button>
                <button onClick={() => { onOpenServiceBooking(); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  تعديل حجز الصيانة
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  الصيانة الدورية وأسعارها
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الرعاية والدعم</h4>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  مؤشرات لوحة المعلومات (رموز الطبلون)
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  حملات الإستدعاء
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  الضمان وبرامج العناية
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">مراكز الخدمة</h4>
                <button onClick={() => { if (onNavigate) onNavigate('showrooms'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  فروعنا ومراكز الصيانة السريعة
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  مبيعات قطع الغيار الأصلية
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('owners'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  الأسئلة الشائعة للملاك
                </button>
              </div>

              <div className="bg-red-50/60 rounded-2xl p-5 border border-red-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0056B3]">العناية بالضيوف 24/7</span>
                  <h5 className="text-base font-bold text-gray-900 mt-1 mb-2">اتصل بنا على الرقم المجاني</h5>
                  <p className="text-xl font-bold font-mono text-[#0056B3]">800 440 0055</p>
                </div>
                <button
                  onClick={() => {
                    onOpenServiceBooking();
                    setActiveMenu(null);
                  }}
                  className="mt-4 w-full bg-[#0056B3] text-white py-2.5 px-4 rounded-full text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  احجز موعدك الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DROPDOWN: اكتشف (DISCOVER) */}
      {/* ========================================================================= */}
      {activeMenu === 'discover' && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">عالم سولينا والابتكار</h3>
                <p className="text-xs text-gray-500">تاريخ الهايبرد، أنظمة الأمان TSS، وسباقات GR</p>
              </div>
              <button 
                onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }}
                className="px-5 py-2 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>عرض صفحة اكتشف كاملة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">تكنولوجيا وابتكار</h4>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  مستقبل التنقل وتكنولوجيا HEV
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  جازو ريسنج Gazoo Racing (GR)
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  رياضة السيارات و Esports
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  الحياد الكربوني و #غدك_اليوم
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">عن سولينا للسيارات</h4>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  معلومات عنا وقصة 80 عاماً
                </button>
                <button onClick={() => { if (onNavigate) onNavigate('discover'); setActiveMenu(null); }} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors text-right cursor-pointer">
                  التزامنا نحو ضيوفنا (الضيف أولاً)
                </button>
                <a href="#news" onClick={() => setActiveMenu(null)} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors">
                  أخبار سولينا للسيارات
                </a>
                <a href="#fake-parts" onClick={() => setActiveMenu(null)} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors">
                  حملة التوعية ضد القطع المقلدة
                </a>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">الدعم والتواصل</h4>
                <a href="#faq" onClick={() => setActiveMenu(null)} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors">
                  الأسئلة الشائعة
                </a>
                <a href="#contact" onClick={() => setActiveMenu(null)} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors">
                  اتصل بنا
                </a>
                <a href="#showrooms" onClick={() => setActiveMenu(null)} className="block text-sm font-bold text-gray-800 hover:text-[#0056B3] transition-colors">
                  مراكزنا وفروعنا
                </a>
              </div>

              <div className="relative rounded-2xl overflow-hidden group">
                <img 
                  src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp" 
                  alt="مستقبل التنقل" 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold text-[#0056B3] bg-white px-2 py-0.5 rounded w-fit mb-1">ابتكار هجين</span>
                  <h5 className="font-bold text-sm">تكنولوجيا الهايبرد HEV من سولينا</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MOBILE DRAWER NAVIGATION */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <button 
              onClick={() => {
                setActiveMenu(activeMenu === 'vehicles' ? null : 'vehicles');
              }} 
              className="w-full flex justify-between items-center py-3 text-base font-bold text-gray-900 border-b border-gray-100"
            >
              <span>المركبات</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setActiveMenu(activeMenu === 'offers' ? null : 'offers');
              }} 
              className="w-full flex justify-between items-center py-3 text-base font-bold text-gray-900 border-b border-gray-100"
            >
              <span>العروض</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setActiveMenu(activeMenu === 'owners' ? null : 'owners');
              }} 
              className="w-full flex justify-between items-center py-3 text-base font-bold text-gray-900 border-b border-gray-100"
            >
              <span>ملاك سولينا</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setActiveMenu(activeMenu === 'discover' ? null : 'discover');
              }} 
              className="w-full flex justify-between items-center py-3 text-base font-bold text-gray-900 border-b border-gray-100"
            >
              <span>اكتشف</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                onOpenTestDrive();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#0056B3] text-white py-3 rounded-full text-sm font-bold hover:bg-black transition-colors"
            >
              طلب تجربة قيادة
            </button>
            <button
              onClick={() => {
                onOpenServiceBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gray-900 text-white py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              حجز خدمة صيانة
            </button>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 border border-blue-500/30 text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>نظام إدارة الوكالة والـ ERP</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-600 text-[10px]">ZATCA 2</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
