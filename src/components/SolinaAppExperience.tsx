import React, { useState, useEffect } from 'react';
import { 
  Menu, Bell, Search, SlidersHorizontal, Heart, Shield, ChevronLeft, ChevronRight,
  Home, Tag, Car, User, Sparkles, MapPin, Wrench, Headphones, Check, X, Star, Share2,
  Calendar, Phone, Info, Battery, Wifi, Signal
} from 'lucide-react';
import { VEHICLES, type Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { SolinaAIAssistant } from './SolinaAIAssistant';

interface SolinaAppExperienceProps {
  onSelectVehicle?: (vehicleId: string) => void;
  onOpenTestDrive?: (modelName?: string) => void;
  onOpenServiceBooking?: () => void;
  onOpenAIAssistant?: () => void;
  onCloseModal?: () => void;
  isStandalone?: boolean;
  isNativeMobileView?: boolean;
}

export const SolinaAppExperience: React.FC<SolinaAppExperienceProps> = ({
  onSelectVehicle,
  onOpenTestDrive,
  onOpenServiceBooking,
  onOpenAIAssistant,
  onCloseModal,
  isStandalone = false,
  isNativeMobileView = false
}) => {
  const { language } = useLanguage();
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'offers' | 'garage' | 'favorites' | 'account'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['camry-2026', 'lc300-2026']);
  const [notificationsCount, setNotificationsCount] = useState<number>(3);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState<number>(0);

  const heroSlides = [
    {
      titleAr: 'تجربة تتجاوز التوقعات',
      descAr: 'اكتشف أفضل السيارات بأعلى جودة وأفضل الأسعار',
      btnAr: 'استكشف الآن',
      bg: 'from-gray-900 via-neutral-900 to-red-950',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp'
    },
    {
      titleAr: 'عروض تمويل 2026 الحصرية',
      descAr: '0% دفعة أولى و0% هامش ربح على سيارات الهايبرد',
      btnAr: 'احسب قسطك',
      bg: 'from-neutral-900 via-stone-900 to-blue-950',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp'
    },
    {
      titleAr: 'ضمان سولينا 10 سنوات',
      descAr: 'راحة بال مطلقة مع صيانة دورية سريعة 45 دقيقة',
      btnAr: 'مزايا الضمان',
      bg: 'from-black via-zinc-950 to-neutral-900',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp'
    }
  ];

  const quickServices = [
    { id: 'all', nameAr: 'جميع السيارات', icon: Car, color: 'bg-red-50 text-red-600' },
    { id: 'offers', nameAr: 'عروض خاصة', icon: Tag, color: 'bg-amber-50 text-amber-600' },
    { id: 'showrooms', nameAr: 'معارضنا', icon: MapPin, color: 'bg-blue-50 text-blue-600' },
    { id: 'aftersales', nameAr: 'خدمات ما بعد البيع', icon: Wrench, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'support', nameAr: 'الدعم والمساعدة', icon: Headphones, color: 'bg-purple-50 text-purple-600' }
  ];

  const categories = [
    { id: 'luxury', nameAr: 'فاخرة', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp' },
    { id: 'gr', nameAr: 'رياضية', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/gr86-306x122.webp' },
    { id: 'suv', nameAr: 'دفع رباعي', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp' },
    { id: 'sedan', nameAr: 'سيدان', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp' }
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredVehicles = VEHICLES.filter(v => {
    const hasValidImage = Boolean(v.cardImage && v.cardImage.startsWith('http'));
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory || (selectedCategory === 'luxury' && (v.id.includes('crown') || v.id.includes('land-cruiser') || v.id.includes('lexus')));
    const matchesSearch = v.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || v.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return hasValidImage && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Show flagship popular models first (camry, lc300, crown, rav4, prado)
    const priority = ['camry', 'lc300', 'crown', 'rav4', 'prado', 'gr86', 'corolla', 'fortuner'];
    const aIndex = priority.findIndex(p => a.id.includes(p));
    const bIndex = priority.findIndex(p => b.id.includes(p));
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  // Render Inner App UI
  const renderAppContent = () => (
    <div className={`relative w-full bg-slate-50 overflow-hidden flex flex-col font-arabic text-gray-900 ${isNativeMobileView ? 'min-h-screen pb-20' : 'h-[780px] rounded-[38px]'}`}>
      
      {/* 1. Mobile Status Bar (Rendered only on mockup or simulated view) */}
      {!isNativeMobileView && (
        <div className="w-full bg-white/95 backdrop-blur-md pt-2 px-6 pb-1 flex items-center justify-between z-30 border-b border-gray-100 text-black">
          <span className="text-[13px] font-bold tracking-tight font-sans">9:41</span>
          
          {/* Dynamic Island Capsule */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600/80 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-800">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>
      )}

      {/* 2. Solina App Top Header */}
      <div className="w-full bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 z-20 sticky top-0 shadow-xs">
        <button 
          onClick={() => setShowSideMenu(true)}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-700 active:scale-95 transition-all cursor-pointer"
          title="القائمة"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Solina Motors Official Logo */}
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img
            src="/solina-logo.png"
            alt="سولينا للسيارات"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </div>

        {/* Notification Bell with Badge */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-700 active:scale-95 transition-all cursor-pointer"
          title="التنبيهات"
        >
          <Bell className="w-5 h-5" />
          {notificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {notificationsCount}
            </span>
          )}
        </button>
      </div>

      {/* 3. Main Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/80">
        
        {activeTab === 'home' && (
          <>
            {/* Official High-Resolution Hero Banner (تجربة تتجاوز التوقعات) */}
            <div className="p-3.5">
              <div 
                onClick={() => onOpenTestDrive && onOpenTestDrive('سولينا كامري 2026')}
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-800 bg-gray-950 cursor-pointer active:scale-[0.98] transition-transform group"
              >
                <img 
                  src="/solina-app-hero-card.png" 
                  alt="تجربة تتجاوز التوقعات - سولينا 2026" 
                  className="w-full h-auto object-contain block select-none rounded-2xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="px-3.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن سيارة، موديل، أو فئة..."
                    className="w-full py-2.5 pr-9 pl-4 rounded-2xl bg-white border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 shadow-xs transition-all text-start"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute left-3 top-3 text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 shadow-xs transition-all cursor-pointer"
                  title="تصفية"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5 Quick Action Service Buttons */}
            <div className="px-3.5 mb-4">
              <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
                {quickServices.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => {
                        if (srv.id === 'offers') setActiveTab('offers');
                        else if (srv.id === 'aftersales' && onOpenServiceBooking) onOpenServiceBooking();
                        else if (srv.id === 'all') setSelectedCategory('all');
                        else if (srv.id === 'showrooms') {
                          window.location.href = '/showrooms';
                        } else if (srv.id === 'support') {
                          if (onOpenAIAssistant) onOpenAIAssistant();
                          else setIsAssistantOpen(true);
                        } else {
                          alert(`خدمة سولينا: ${srv.nameAr}`);
                        }
                      }}
                      className="flex flex-col items-center gap-1.5 min-w-[62px] p-2 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className={`w-11 h-11 rounded-xl ${srv.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">
                        {srv.nameAr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Browse by Category (تصفح حسب الفئة) */}
            <div className="px-3.5 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-black text-gray-900">تصفح حسب الفئة</h4>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-0.5 cursor-pointer"
                >
                  <span>عرض الكل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'all' : cat.id)}
                    className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-red-50/80 border-red-500 shadow-xs ring-1 ring-red-400'
                        : 'bg-white border-gray-200/80 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-8 flex items-center justify-center">
                      <img src={cat.image} alt={cat.nameAr} className="max-h-7 w-auto object-contain" />
                    </div>
                    <span className={`text-[11px] font-bold ${selectedCategory === cat.id ? 'text-red-600' : 'text-gray-700'}`}>
                      {cat.nameAr}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Vehicles Fleet Cards (أحدث السيارات) */}
            <div className="px-3.5 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-black text-gray-900">
                  {selectedCategory === 'all' ? 'أحدث سيارات 2026' : `فئة: ${categories.find(c => c.id === selectedCategory)?.nameAr || selectedCategory}`}
                </h4>
                <span className="text-[10px] text-gray-500 font-mono">
                  {filteredVehicles.length} طراز
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {filteredVehicles.slice(0, 6).map((veh) => {
                  const isFav = favorites.includes(veh.id);
                  return (
                    <div
                      key={veh.id}
                      onClick={() => onSelectVehicle ? onSelectVehicle(veh.id) : null}
                      className="relative p-3 rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:shadow-md hover:border-red-400 transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      {/* Badges & Favorite Button */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black tracking-wide">
                          جديد
                        </span>

                        <button
                          onClick={(e) => toggleFavorite(veh.id, e)}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
                        </button>
                      </div>

                      {/* Car Cutout Image */}
                      <div className="w-full h-20 flex items-center justify-center my-1 group-hover:scale-105 transition-transform">
                        <img
                          src={veh.cardImage || veh.heroImage || ''}
                          alt={veh.nameAr}
                          className="max-h-16 w-auto object-contain filter drop-shadow-sm"
                          loading="lazy"
                        />
                      </div>

                      {/* Vehicle Info */}
                      <div className="space-y-1 text-start">
                        <h5 className="text-xs font-black text-gray-900 truncate">
                          {veh.nameAr.includes('سولينا') ? veh.nameAr : `سولينا ${veh.nameAr}`}
                        </h5>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs font-black text-red-600">
                            {veh.priceStartingFrom.toLocaleString('ar-SA')} ريال
                          </span>
                          <span className="text-[9px] text-gray-400 line-through">
                            {(veh.priceStartingFrom * 1.08).toFixed(0)} ريال
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 block">
                          قسط يبدأ من: {veh.monthlyInstallmentStartingFrom} ريال/شهر
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenTestDrive) onOpenTestDrive(veh.nameAr);
                        }}
                        className="w-full mt-2 py-1.5 rounded-xl bg-gray-900 hover:bg-red-600 text-white text-[10px] font-bold transition-colors text-center"
                      >
                        طلب حجز
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official Quality & Reliability Guarantee Card (ضمان الجودة والموثوقية) */}
            <div className="px-3.5 mb-3">
              <div 
                onClick={() => alert('ضمان سولينا للسيارات 2026: ضمان شامل 10 سنوات أو 300,000 كم على المحرك ومكونات الهايبرد لراحة بالك المطلقة.')}
                className="relative w-full rounded-2xl overflow-hidden shadow-md border border-gray-800 bg-gray-950 cursor-pointer active:scale-[0.98] transition-transform group"
              >
                <img 
                  src="/solina-app-guarantee-card.png" 
                  alt="ضمان الجودة والموثوقية - سولينا للسيارات" 
                  className="w-full h-auto object-contain block select-none rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </>
        )}

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <div className="p-4 space-y-4 text-start">
            <h3 className="text-sm font-black text-gray-900 mb-2">🏷️ عروض سولينا الحصرية</h3>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white space-y-2">
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">عرض محدود</span>
              <h4 className="text-sm font-black">0% دفعة أولى على سيارات الهايبرد</h4>
              <p className="text-xs text-white/90">استمتع بتملك سولينا كامري أو كراون 2026 بأقساط ميسرة وبدون رسوم إدارية.</p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white space-y-2">
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">صيانة مجانية</span>
              <h4 className="text-sm font-black">باقة صيانة مجانية لمدة سنتين</h4>
              <p className="text-xs text-white/90">شاملة تغيير الزيوت والفلاتر والفحص الشامل في أكثر من 50 فرعاً.</p>
            </div>
          </div>
        )}

        {/* GARAGE TAB */}
        {activeTab === 'garage' && (
          <div className="p-4 space-y-4 text-start">
            <h3 className="text-sm font-black text-gray-900 mb-2">🚗 مرآبي وسياراتي المسجلة</h3>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">سولينا لاند كروزر 2026</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">حالة ممتازة</span>
              </div>
              <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp" alt="Land Cruiser" className="h-16 w-auto mx-auto object-contain" />
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                <span>موعد الصيانة القادم:</span>
                <span className="font-bold text-gray-800">بعد 4,200 كم</span>
              </div>
              <button onClick={onOpenServiceBooking} className="w-full py-2 rounded-xl bg-[#0056B3] text-white text-xs font-bold">
                حجز موعد صيانة
              </button>
            </div>
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="p-4 space-y-3 text-start">
            <h3 className="text-sm font-black text-gray-900 mb-2">❤️ السيارات المفضلة ({favorites.length})</h3>
            {favorites.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-10">لم تقم بإضافة سيارات للمفضلة بعد.</p>
            ) : (
              VEHICLES.filter(v => favorites.includes(v.id)).map(v => (
                <div key={v.id} className="p-3 rounded-2xl bg-white border border-gray-200 flex items-center justify-between gap-3 shadow-xs">
                  <img src={v.cardImage || v.heroImage || ''} alt={v.nameAr} className="h-12 w-auto object-contain" />
                  <div className="flex-1 text-start">
                    <h5 className="text-xs font-bold text-gray-900">سولينا {v.nameAr} 2026</h5>
                    <span className="text-xs font-black text-red-600">{v.priceStartingFrom.toLocaleString('ar-SA')} ريال</span>
                  </div>
                  <button onClick={(e) => toggleFavorite(v.id, e)} className="p-2 text-red-600">
                    <Heart className="w-4 h-4 fill-red-600" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === 'account' && (
          <div className="p-4 space-y-4 text-start">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900 to-black text-white flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-lg">
                VIP
              </div>
              <div>
                <h4 className="text-sm font-bold">ضيف سولينا المتميز</h4>
                <span className="text-[11px] text-gray-400">+966 50 123 4567</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 text-xs">
              <button onClick={onOpenServiceBooking} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50">
                <span>📅 طلباتي ومواعيد الصيانة</span>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setIsAssistantOpen(true)} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50">
                <span>🎧 خدمة عملاء ومساعد سولينا الذكي 24/7</span>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => alert('إصدار تطبيق سولينا 2026.4.0')} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50">
                <span>⚙️ إعدادات التطبيق واللغة</span>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. Bottom Tab Bar Navigation (Fixed Bottom) */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 py-2 flex items-center justify-around z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', label: 'الرئيسية', icon: Home },
          { id: 'offers', label: 'العروض', icon: Tag },
          { id: 'garage', label: 'سياراتي', icon: Car },
          { id: 'favorites', label: 'المفضلة', icon: Heart, badge: favorites.length },
          { id: 'account', label: 'حسابي', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-red-600 scale-105' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 1.8} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'text-red-600' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Notifications Drawer Popup */}
      {showNotifications && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-start justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-3xl p-5 shadow-2xl space-y-3 mt-12 text-start">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="text-xs font-black text-gray-900">🔔 الإشعارات الواردة (3)</h4>
              <button onClick={() => setShowNotifications(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-800 font-medium">
                🔥 وصل حديثاً: سولينا لاند كروزر 2026 بتجهيزات ملكية!
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-800 font-medium">
                🏷️ تم إطلاق باقات التمويل التأجيري 0% دفعة أولى.
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-medium">
                🚗 تذكير: استمتع بفحص مجاني لسيارتك عند حجز موعد عبر التطبيق.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side Drawer Menu */}
      {showSideMenu && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-stretch justify-start animate-in fade-in duration-200">
          <div className="w-64 bg-white h-full p-5 shadow-2xl flex flex-col justify-between text-start">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <img src="/solina-logo.png" alt="سولينا" className="h-7 w-auto" />
                <button onClick={() => setShowSideMenu(false)} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-1 text-xs font-bold text-gray-700">
                <button onClick={() => { setActiveTab('home'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
                  <Home className="w-4 h-4" /> <span>الرئيسية</span>
                </button>
                <button onClick={() => { setActiveTab('offers'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> <span>أحدث العروض</span>
                </button>
                <button onClick={() => { onOpenServiceBooking && onOpenServiceBooking(); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> <span>حجز موعد صيانة</span>
                </button>
                <button onClick={() => { onOpenTestDrive && onOpenTestDrive(); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
                  <Car className="w-4 h-4" /> <span>طلب تجربة قيادة</span>
                </button>
                <button onClick={() => { setIsAssistantOpen(true); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl bg-red-50 text-red-600 font-bold flex items-center gap-2">
                  <Headphones className="w-4 h-4" /> <span>مساعد سولينا الذكي 24/7</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
              تطبيق سولينا للسيارات © 2026
            </div>
          </div>
        </div>
      )}

      {/* Embedded Intelligent Solina AI Assistant */}
      <SolinaAIAssistant
        isOpenExternal={isAssistantOpen}
        onCloseExternal={() => setIsAssistantOpen(false)}
        showFloatingTrigger={false}
        onSelectVehicle={onSelectVehicle}
        onOpenTestDrive={onOpenTestDrive}
        onOpenServiceBooking={onOpenServiceBooking}
      />

    </div>
  );

  // If native mobile view, return directly full-screen
  if (isNativeMobileView) {
    return renderAppContent();
  }

  // Desktop mockup frame view
  return (
    <div className="flex flex-col items-center justify-center font-arabic text-gray-900 select-none">
      <div className="relative w-full max-w-[420px] bg-black rounded-[48px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border-[6px] border-gray-800 ring-1 ring-white/20 overflow-hidden">
        <div className="absolute -left-[9px] top-24 w-[3px] h-10 bg-gray-700 rounded-l-md" />
        <div className="absolute -left-[9px] top-38 w-[3px] h-12 bg-gray-700 rounded-l-md" />
        <div className="absolute -right-[9px] top-28 w-[3px] h-16 bg-gray-700 rounded-r-md" />
        {renderAppContent()}
      </div>
    </div>
  );
};
