import React, { useState, useEffect } from 'react';
import { 
  Menu, Bell, Search, SlidersHorizontal, Heart, Shield, ChevronLeft, ChevronRight,
  Home, Tag, Car, User, Sparkles, MapPin, Wrench, Headphones, Check, X, Star, Share2,
  Calendar, Phone, Info, Battery, Wifi, Signal, Clock, ArrowLeft, ArrowRight,
  CheckCircle2, Plus, QrCode, FileText, Settings, Globe, AlertCircle, Percent,
  Calculator, Gauge, Award, Fuel, Zap, Eye, PhoneCall, MessageCircle
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
  const { language, setLanguage } = useLanguage();
  
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'offers' | 'garage' | 'favorites' | 'account'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(['camry-2026', 'lc300-2026']);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  
  // Vehicle Details Bottom Sheet State
  const [selectedVehicleDetail, setSelectedVehicleDetail] = useState<Vehicle | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('أبيض لؤلؤي كريستالي');

  // Comparison State
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  // In-App Wizards
  const [testDriveModalVehicle, setTestDriveModalVehicle] = useState<string | null>(null);
  const [testDriveStep, setTestDriveStep] = useState<number>(1);
  const [testDriveForm, setTestDriveForm] = useState({ name: '', phone: '', city: 'الرياض - المعرض الرئيسي', date: '2026-09-01', time: '10:00 ص' });
  const [testDriveSuccess, setTestDriveSuccess] = useState<boolean>(false);

  const [serviceBookingOpen, setServiceBookingOpen] = useState<boolean>(false);
  const [serviceStep, setServiceStep] = useState<number>(1);
  const [serviceForm, setServiceForm] = useState({ car: 'سولينا كامري 2026', type: 'صيانة دورية 10,000 كم', city: 'الرياض - مركز الصيانة السريعة', date: '2026-09-02' });
  const [serviceSuccess, setServiceSuccess] = useState<boolean>(false);

  const [financeCalcVehicle, setFinanceCalcVehicle] = useState<Vehicle | null>(null);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [loanYears, setLoanYears] = useState<number>(5);

  const [showVipQrModal, setShowVipQrModal] = useState<boolean>(false);
  const [showAddCarModal, setShowAddCarModal] = useState<boolean>(false);
  const [showInstallAppModal, setShowInstallAppModal] = useState<boolean>(false);
  const [installPlatform, setInstallPlatform] = useState<'ios' | 'android'>('ios');

  // Offers Filter
  const [offersFilter, setOffersFilter] = useState<'all' | 'finance' | 'service' | 'cashback'>('all');

  // Garage Cars
  const [userCars, setUserCars] = useState([
    {
      id: 'car-1',
      model: 'سولينا كامري 2026 هايبرد',
      plate: 'س ل ن 2026',
      mileage: 8450,
      nextServiceKm: 10000,
      nextServiceDate: '25 سبتمبر 2026',
      warrantyExpiry: '2036 (ساري 10 سنوات)',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp'
    },
    {
      id: 'car-2',
      model: 'سولينا لاند كروزر LC300 2026',
      plate: 'ر ي ض 300',
      mileage: 22100,
      nextServiceKm: 30000,
      nextServiceDate: '15 نوفمبر 2026',
      warrantyExpiry: '2036 (ساري 10 سنوات)',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp'
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'وصول أسطول 2026 الجديد!', desc: 'سيارات كامري وكراون ولاندكروزر 2026 متوفرة الآن في صالات العرض.', time: 'منذ ساعتين', unread: true, tag: 'جديد' },
    { id: 2, title: 'تذكير بموعد الصيانة الدورية', desc: 'اقترب موعد صيانة 10,000 كم لسيارتك كامري 2026.', time: 'أمس', unread: true, tag: 'صيانة' },
    { id: 3, title: 'عرض تمويلي حصري 0% دفعة أولى', desc: 'استفد من أقساط ميسرة بدون رسوم إدارية حتى نهاية الشهر.', time: 'منذ يومين', unread: false, tag: 'عروض' }
  ]);

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

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

  const toggleComparison = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparisonList.includes(id)) {
      setComparisonList(prev => prev.filter(item => item !== id));
    } else {
      if (comparisonList.length >= 2) {
        alert('يمكنك مقارنة سيارتين فقط في نفس الوقت.');
        return;
      }
      setComparisonList(prev => [...prev, id]);
    }
  };

  const filteredVehicles = VEHICLES.filter(v => {
    const hasValidImage = Boolean(v.cardImage && v.cardImage.startsWith('http'));
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory || (selectedCategory === 'luxury' && (v.id.includes('crown') || v.id.includes('land-cruiser') || v.id.includes('lexus')));
    const matchesSearch = v.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || v.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return hasValidImage && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priority = ['camry', 'lc300', 'crown', 'rav4', 'prado', 'gr86', 'corolla', 'fortuner'];
    const aIndex = priority.findIndex(p => a.id.includes(p));
    const bIndex = priority.findIndex(p => b.id.includes(p));
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  const offersData = [
    {
      id: 'offer-1',
      category: 'finance',
      title: 'عرض الهايبرد الحصري 2026',
      badge: '0% دفعة أولى',
      discount: 'توفير يصل إلى 15,000 ريال',
      desc: 'احصل على سولينا كامري أو كراون 2026 مع 0% رسوم إدارية وضمان صيانة 3 سنوات مجاناً.',
      daysLeft: 6,
      bg: 'from-red-600 via-rose-600 to-red-800',
      vehicle: 'camry-2026'
    },
    {
      id: 'offer-2',
      category: 'service',
      title: 'باقة الصيانة الذهبية المجانية',
      badge: 'سنتان صيانة مجانية',
      discount: 'شاملة الزيوت والفلاتر',
      desc: 'عند شراء أي سيارة دفع رباعي (لاندكروزر، برادو، راف فور) استمتع بـ 4 صيانات دورية مجانية.',
      daysLeft: 12,
      bg: 'from-gray-900 via-slate-900 to-black',
      vehicle: 'lc300-2026'
    },
    {
      id: 'offer-3',
      category: 'cashback',
      title: 'برنامج استبدال سيارتك القديمة',
      badge: 'استرداد نقدي فوري',
      discount: 'مكافأة 7,000 ريال فوق قيمة التثمين',
      desc: 'استبدل سيارتك الحالية مهما كان نوعها واحصل على تقييم فوري وأعلى سعر سوقي.',
      daysLeft: 18,
      bg: 'from-blue-700 via-indigo-800 to-slate-950',
      vehicle: 'crown-2026'
    }
  ];

  const filteredOffers = offersData.filter(o => offersFilter === 'all' || o.category === offersFilter);

  // Render Inner App UI
  const renderAppContent = () => (
    <div className={`relative w-full bg-slate-50 overflow-hidden flex flex-col font-arabic text-gray-900 ${isNativeMobileView ? 'min-h-screen pb-20' : 'h-[780px] rounded-[38px]'}`}>
      
      {/* 1. Mobile Status Bar (Rendered on mockup view) */}
      {!isNativeMobileView && (
        <div className="w-full bg-white/95 backdrop-blur-md pt-2 px-6 pb-1 flex items-center justify-between z-30 border-b border-gray-100 text-black select-none">
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
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>

      {/* 3. Main Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/80">
        
        {/* ======================= TAB 1: HOME ======================= */}
        {activeTab === 'home' && (
          <>
            {/* Official High-Resolution Hero Banner (تجربة تتجاوز التوقعات) */}
            <div className="p-3.5">
              <div 
                onClick={() => setTestDriveModalVehicle('سولينا كامري 2026')}
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
                        else if (srv.id === 'aftersales') setServiceBookingOpen(true);
                        else if (srv.id === 'all') setSelectedCategory('all');
                        else if (srv.id === 'showrooms') {
                          window.location.href = '/showrooms';
                        } else if (srv.id === 'support') {
                          setIsAssistantOpen(true);
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

              {/* 4 Category Cards Horizontal Row */}
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                      className={`flex flex-col items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer h-20 active:scale-95 ${
                        isSelected 
                          ? 'bg-red-50/80 border-red-500 shadow-sm ring-1 ring-red-500' 
                          : 'bg-white border-gray-100 shadow-xs hover:border-gray-200'
                      }`}
                    >
                      <div className="h-9 w-full flex items-center justify-center">
                        <img
                          src={cat.image}
                          alt={cat.nameAr}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <span className={`text-[11px] font-black ${isSelected ? 'text-red-600' : 'text-gray-800'}`}>
                        {cat.nameAr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Latest 2026 Vehicles 2-Column Grid */}
            <div className="px-3.5 mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-black text-gray-900">أحدث سيارات 2026</h4>
                <span className="text-[10px] text-gray-400 font-medium">
                  {filteredVehicles.length} طراز
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {filteredVehicles.map((vehicle) => {
                  const isFav = favorites.includes(vehicle.id);
                  const isCompared = comparisonList.includes(vehicle.id);
                  const displayPrice = vehicle.priceStartingFrom.toLocaleString('ar-SA');
                  const monthlyInstallment = Math.round(vehicle.priceStartingFrom / 70).toLocaleString('ar-SA');

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicleDetail(vehicle)}
                      className="bg-white rounded-2xl p-2.5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group cursor-pointer active:scale-[0.98]"
                    >
                      {/* Top Badges: Favorite & New/Hybrid */}
                      <div className="flex items-center justify-between w-full mb-1 z-10">
                        <button
                          onClick={(e) => toggleFavorite(vehicle.id, e)}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                          title="إضافة للمفضلة"
                        >
                          <Heart 
                            className={`w-4 h-4 ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
                          />
                        </button>

                        <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black">
                          {vehicle.isHybrid ? 'هايبرد 2026' : 'جديد'}
                        </span>
                      </div>

                      {/* Vehicle Real PNG Cutout */}
                      <div className="h-20 sm:h-24 w-full flex items-center justify-center my-1 relative">
                        <img
                          src={vehicle.cardImage || vehicle.heroImage}
                          alt={vehicle.nameAr}
                          className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Vehicle Meta Title */}
                      <div className="text-start space-y-0.5 mt-1">
                        <h5 className="text-[11px] font-black text-gray-900 line-clamp-1">
                          سولينا {vehicle.nameAr} 2026
                        </h5>
                        
                        {/* Price Display */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-black text-red-600">
                            {displayPrice}
                          </span>
                          <span className="text-[9px] font-bold text-gray-500">
                            ريال
                          </span>
                        </div>

                        <p className="text-[9px] text-gray-400 font-light">
                          قسط يبدأ من: {monthlyInstallment} ريال/شهر
                        </p>
                      </div>

                      {/* Action Button: Book / Details */}
                      <div className="pt-2 flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicleDetail(vehicle);
                          }}
                          className="flex-1 py-1.5 rounded-xl bg-gray-950 hover:bg-red-600 text-white text-[10px] font-black shadow-xs transition-colors cursor-pointer"
                        >
                          تفاصيل وحجز
                        </button>
                        <button
                          onClick={(e) => toggleComparison(vehicle.id, e)}
                          className={`p-1.5 rounded-xl border text-[9px] font-bold transition-all cursor-pointer ${
                            isCompared ? 'bg-red-600 text-white border-red-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                          title="مقارنة"
                        >
                          {isCompared ? '✓' : 'قارن'}
                        </button>
                      </div>
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

        {/* ======================= TAB 2: OFFERS ======================= */}
        {activeTab === 'offers' && (
          <div className="p-3.5 space-y-3.5 text-start">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">🏷️ عروض سولينا الحصرية 2026</h3>
                <p className="text-[10px] text-gray-400 font-light">أفضل الصفقات التمويلية وباقات الصيانة المعتمدة</p>
              </div>
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full">
                {filteredOffers.length} عروض نشطة
              </span>
            </div>

            {/* Offer Categories Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'جميع العروض' },
                { id: 'finance', label: 'عروض التمويل 0%' },
                { id: 'service', label: 'باقات الصيانة' },
                { id: 'cashback', label: 'الاستبدال والاسترداد' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOffersFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    offersFilter === f.id
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Offers Cards */}
            <div className="space-y-3">
              {filteredOffers.map((offer) => (
                <div 
                  key={offer.id}
                  className={`p-4 rounded-2xl bg-gradient-to-r ${offer.bg} text-white shadow-md space-y-2.5 relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {offer.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300">
                      <Clock className="w-3 h-3" />
                      <span>متبقي {offer.daysLeft} أيام</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black">{offer.title}</h4>
                    <span className="text-[11px] font-bold text-red-200 block">{offer.discount}</span>
                    <p className="text-[11px] text-white/80 font-light mt-1 leading-snug">{offer.desc}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => setTestDriveModalVehicle(offer.title)}
                      className="px-4 py-1.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-[10px] font-black shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      الاستفادة من العرض الآن
                    </button>
                    <button 
                      onClick={() => alert(`تم نسخ رابط العرض: ${offer.title}`)}
                      className="p-1.5 text-white/80 hover:text-white"
                      title="مشاركة العرض"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 3: GARAGE ======================= */}
        {activeTab === 'garage' && (
          <div className="p-3.5 space-y-3.5 text-start">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">🚗 مرآبي وسياراتي المسجلة</h3>
                <p className="text-[10px] text-gray-400 font-light">إدارة الصيانة وسجل الضمان الرقمي لمركباتك</p>
              </div>
              <button 
                onClick={() => setShowAddCarModal(true)}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة سيارة</span>
              </button>
            </div>

            {/* User Cars List */}
            <div className="space-y-3">
              {userCars.map((car) => (
                <div key={car.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-900">{car.model}</h4>
                        <span className="text-[10px] font-bold text-gray-500">لوحة: {car.plate}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold border border-emerald-200">
                      الضمان نشط ✓
                    </span>
                  </div>

                  {/* Car Image Preview */}
                  <div className="h-16 w-full flex items-center justify-center bg-gray-50 rounded-xl p-2">
                    <img src={car.image} alt={car.model} className="h-full object-contain" />
                  </div>

                  {/* Live Odometer & Maintenance Status */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 block">عداد الكيلومترات</span>
                      <strong className="text-gray-800 font-bold text-xs">{car.mileage.toLocaleString('ar-SA')} كم</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">الصيانة القادمة</span>
                      <strong className="text-red-600 font-bold text-xs">{car.nextServiceKm.toLocaleString('ar-SA')} كم</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => {
                        setServiceForm(prev => ({ ...prev, car: car.model }));
                        setServiceBookingOpen(true);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold text-center cursor-pointer active:scale-95 transition-all"
                    >
                      📅 حجز موعد صيانة
                    </button>
                    <button 
                      onClick={() => alert(`كتيب الضمان الرقمي لسيارة ${car.model}\nرقم الضمان: SOL-2026-${car.id}\nالمدة: 10 سنوات شاملة المحرك والبطارية.`)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold cursor-pointer"
                    >
                      وثيقة الضمان
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB 4: FAVORITES ======================= */}
        {activeTab === 'favorites' && (
          <div className="p-3.5 space-y-3.5 text-start">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">❤️ المفضلة والمقارنة</h3>
                <p className="text-[10px] text-gray-400 font-light">السيارات التي تم حفظها للاطلاع والمقارنة</p>
              </div>
              {comparisonList.length > 0 && (
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-xl animate-pulse cursor-pointer"
                >
                  قارن الآن ({comparisonList.length})
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-2">
                <Heart className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="text-xs font-bold text-gray-700">لم تقم بإضافة سيارات للمفضلة بعد</p>
                <button onClick={() => setActiveTab('home')} className="px-3 py-1 bg-red-600 text-white text-xs rounded-xl">
                  تصفح السيارات الآن
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {VEHICLES.filter(v => favorites.includes(v.id)).map(v => (
                  <div 
                    key={v.id} 
                    onClick={() => setSelectedVehicleDetail(v)}
                    className="p-3 rounded-2xl bg-white border border-gray-200 flex items-center justify-between gap-3 shadow-xs cursor-pointer hover:border-red-300 transition-all"
                  >
                    <img src={v.cardImage || v.heroImage || ''} alt={v.nameAr} className="h-12 w-16 object-contain" />
                    <div className="flex-1 text-start">
                      <h5 className="text-xs font-black text-gray-900">سولينا {v.nameAr} 2026</h5>
                      <span className="text-xs font-black text-red-600">{v.priceStartingFrom.toLocaleString('ar-SA')} ريال</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTestDriveModalVehicle(`سولينا ${v.nameAr} 2026`);
                        }}
                        className="px-2.5 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-lg"
                      >
                        تجربة
                      </button>
                      <button onClick={(e) => toggleFavorite(v.id, e)} className="p-1.5 text-red-600">
                        <Heart className="w-4 h-4 fill-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= TAB 5: ACCOUNT ======================= */}
        {activeTab === 'account' && (
          <div className="p-3.5 space-y-3.5 text-start">
            {/* VIP Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-950 via-slate-900 to-black text-white flex items-center justify-between shadow-lg border border-gray-800 relative overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black text-amber-400">عضوية سولينا الذهبية VIP</span>
                </div>
                <h4 className="text-sm font-black">ضيف سولينا المتميز</h4>
                <span className="text-[10px] text-gray-400 block font-mono">+966 50 123 4567</span>
              </div>
              <button 
                onClick={() => setShowVipQrModal(true)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer"
                title="عرض رمز العضوية QR"
              >
                <QrCode className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 text-xs">
              <button onClick={() => setShowInstallAppModal(true)} className="w-full p-3.5 flex items-center justify-between text-gray-900 bg-red-50/50 hover:bg-red-50 cursor-pointer">
                <span className="flex items-center gap-2">📲 <strong className="text-red-600">تثبيت التطبيق على الهاتف (iOS & Android)</strong></span>
                <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-bold">PWA</span>
              </button>
              <button onClick={() => setServiceBookingOpen(true)} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-2">📅 <strong>طلباتي ومواعيد الصيانة</strong></span>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setIsAssistantOpen(true)} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-2">🎧 <strong>خدمة عملاء ومساعد سولينا الذكي 24/7</strong></span>
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => alert('خدمة المساعدة على الطريق متوفرة فوراً على الرقم المجاني 8002444400')} className="w-full p-3.5 flex items-center justify-between text-red-600 hover:bg-red-50 cursor-pointer font-bold">
                <span className="flex items-center gap-2">🚨 <strong>طوارئ المساعدة على الطريق 24/7</strong></span>
                <ChevronLeft className="w-4 h-4 text-red-400" />
              </button>
              <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-500" /> <strong>لغة التطبيق / Language</strong></span>
                <span className="text-[11px] font-bold text-red-600">{language === 'ar' ? 'العربية (AR)' : 'English (EN)'}</span>
              </button>
              <button onClick={() => alert('تطبيق سولينا للسيارات - الإصدار 2026.5.0\nكافة الحقوق محفوظة لشركة سولينا موتورز.')} className="w-full p-3.5 flex items-center justify-between text-gray-700 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-2">⚙️ <strong>عن التطبيق والشروط</strong></span>
                <span className="text-[10px] text-gray-400">v2026.5</span>
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
              className={`flex flex-col items-center gap-1 relative py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-red-600 scale-105' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-black">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 absolute -bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* ======================= MODALS & SHEETS ======================= */}

      {/* A. Mobile Vehicle Details Bottom Sheet */}
      {selectedVehicleDetail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md max-h-[92vh] bg-white rounded-t-[32px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 text-start">
            {/* Grab Handle & Close */}
            <div className="p-3 bg-gray-50 flex items-center justify-between border-b border-gray-100">
              <span className="text-xs font-black text-gray-900">مواصفات سولينا {selectedVehicleDetail.nameAr} 2026</span>
              <button 
                onClick={() => setSelectedVehicleDetail(null)}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Scroll Body */}
            <div className="overflow-y-auto p-4 space-y-4 flex-1">
              {/* Car Image Stage */}
              <div className="relative h-44 w-full bg-gradient-to-b from-gray-100 to-white rounded-2xl p-4 flex items-center justify-center border border-gray-100">
                <img 
                  src={selectedVehicleDetail.cardImage || selectedVehicleDetail.heroImage} 
                  alt={selectedVehicleDetail.nameAr} 
                  className="max-h-full object-contain"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                  موديل 2026
                </span>
              </div>

              {/* Color Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-gray-900 font-bold">اللون المختار:</strong>
                  <span className="text-red-600 font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { name: 'أبيض لؤلؤي كريستالي', color: 'bg-slate-100 border-gray-300' },
                    { name: 'أسود ملكي فاخر', color: 'bg-black border-gray-800' },
                    { name: 'فضي تيتانيوم معدني', color: 'bg-zinc-400 border-zinc-500' },
                    { name: 'أحمر قرمزي رياضي', color: 'bg-red-600 border-red-700' }
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${c.color} ${
                        selectedColor === c.name ? 'ring-2 ring-red-500 ring-offset-2 scale-110' : ''
                      }`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-gray-400 text-[10px] block">القوة الحصانية</span>
                    <strong className="text-gray-900 font-black">{selectedVehicleDetail.horsepower || '225 حصان'}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="text-gray-400 text-[10px] block">استهلاك الوقود</span>
                    <strong className="text-gray-900 font-black">{selectedVehicleDetail.fuelEconomy || '27.7 كم/لتر'}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-500" />
                  <div>
                    <span className="text-gray-400 text-[10px] block">ناقل الحركة</span>
                    <strong className="text-gray-900 font-black">{selectedVehicleDetail.transmissionAr || 'CVT إلكتروني'}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="text-gray-400 text-[10px] block">الضمان الشامل</span>
                    <strong className="text-gray-900 font-black">10 سنوات / 300 ألف كم</strong>
                  </div>
                </div>
              </div>

              {/* Pricing & Installment Box */}
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block">السعر النقدي (شامل الضريبة)</span>
                  <strong className="text-base font-black text-red-600">
                    {selectedVehicleDetail.priceStartingFrom.toLocaleString('ar-SA')} ريال
                  </strong>
                </div>
                <button
                  onClick={() => {
                    setFinanceCalcVehicle(selectedVehicleDetail);
                    setSelectedVehicleDetail(null);
                  }}
                  className="px-3 py-1.5 bg-white text-red-600 border border-red-300 rounded-xl text-xs font-black shadow-xs cursor-pointer"
                >
                  حاسبة التمويل
                </button>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <button
                onClick={() => {
                  setTestDriveModalVehicle(`سولينا ${selectedVehicleDetail.nameAr} 2026`);
                  setSelectedVehicleDetail(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md cursor-pointer text-center"
              >
                طلب تجربة قيادة مجانية
              </button>
              <button
                onClick={() => {
                  toggleFavorite(selectedVehicleDetail.id, {} as any);
                }}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:text-red-600"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(selectedVehicleDetail.id) ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. In-App Test Drive Wizard */}
      {testDriveModalVehicle && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-4 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-gray-900">🚗 حجز تجربة قيادة سريعة</h3>
                <span className="text-[10px] text-red-600 font-bold">{testDriveModalVehicle}</span>
              </div>
              <button onClick={() => { setTestDriveModalVehicle(null); setTestDriveSuccess(false); }} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {testDriveSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-black text-gray-900">تم تأكيد طلب تجربة القيادة!</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  تم إرسال تفاصيل الموعد إلى هاتفك. سيتواصل معك مستشار سولينا لتأكيد التجربة.
                </p>
                <button
                  onClick={() => { setTestDriveModalVehicle(null); setTestDriveSuccess(false); }}
                  className="px-6 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold"
                >
                  العودة للرئيسية
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    value={testDriveForm.name}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="مثال: عبد الرحمن محمد"
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    value={testDriveForm.phone}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">صالة العرض المفضلة</label>
                  <select 
                    value={testDriveForm.city}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:border-red-500 focus:outline-none bg-white"
                  >
                    <option>الرياض - المعرض الرئيسي (طريق خريص)</option>
                    <option>جدة - صالة طريق الملك عبد العزيز</option>
                    <option>الدمام - صالة طريق الظهران</option>
                    <option>مكة المكرمة - صالة الكعكية</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!testDriveForm.phone) {
                      alert('يرجى كتابة رقم الجوال');
                      return;
                    }
                    setTestDriveSuccess(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  تأكيد حجز التجربة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* C. In-App Service Booking Wizard */}
      {serviceBookingOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-4 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-gray-900">🛠️ حجز موعد صيانة سولينا الفورية</h3>
                <span className="text-[10px] text-gray-400">خدمة سريعة خلال 45 دقيقة</span>
              </div>
              <button onClick={() => { setServiceBookingOpen(false); setServiceSuccess(false); }} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {serviceSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-black text-gray-900">تم تأكيد موعد الصيانة بنجاح!</h4>
                <p className="text-xs text-gray-500">رقم الحجز: <strong className="text-red-600 font-mono">SOL-SRV-8942</strong></p>
                <button onClick={() => { setServiceBookingOpen(false); setServiceSuccess(false); }} className="px-5 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl">
                  إغلاق
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">السيارة</label>
                  <select 
                    value={serviceForm.car}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, car: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-white"
                  >
                    <option>سولينا كامري 2026 هايبرد</option>
                    <option>سولينا لاند كروزر LC300 2026</option>
                    <option>سولينا كراون 2026</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">نوع الخدمة</label>
                  <select 
                    value={serviceForm.type}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs bg-white"
                  >
                    <option>صيانة دورية سريعة 10,000 كم (45 دقيقة)</option>
                    <option>صيانة شاملة 20,000 كم</option>
                    <option>فحص الفرامل والمكيف</option>
                    <option>تغيير زيوت وفلاتر أصلية</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">تاريخ الموعد المفضل</label>
                  <input
                    type="date"
                    value={serviceForm.date}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <button
                  onClick={() => setServiceSuccess(true)}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  تأكيد موعد الصيانة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* D. In-App Mini Finance Calculator */}
      {financeCalcVehicle && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-4 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-gray-900">💰 حاسبة التمويل والأقساط 2026</h3>
                <span className="text-[10px] text-red-600 font-bold">سولينا {financeCalcVehicle.nameAr}</span>
              </div>
              <button onClick={() => setFinanceCalcVehicle(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>الدفعة الأولى ({downPaymentPercent}%)</span>
                  <span className="text-red-600 font-bold">{Math.round((financeCalcVehicle.priceStartingFrom * downPaymentPercent) / 100).toLocaleString('ar-SA')} ريال</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>مدة التمويل ({loanYears} سنوات)</span>
                  <span className="text-gray-600">{loanYears * 12} شهر</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              {/* Calculated Result Box */}
              <div className="p-4 bg-gradient-to-r from-gray-950 to-black rounded-2xl text-white text-center space-y-1">
                <span className="text-[10px] text-gray-400">القسط الشهري التقديري (شامل التأمين)</span>
                <div className="text-xl font-black text-red-500">
                  {Math.round(((financeCalcVehicle.priceStartingFrom * (1 - downPaymentPercent / 100)) * 1.15) / (loanYears * 12)).toLocaleString('ar-SA')} ريال / شهر
                </div>
                <span className="text-[9px] text-gray-400 block">بدون رسوم إدارية بمناسبة عروض 2026</span>
              </div>

              <button
                onClick={() => {
                  alert('تم إرسال طلب عرض التمويل وسيتواصل معك مستشار التمويل المعتمد خلال دقائق.');
                  setFinanceCalcVehicle(null);
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md cursor-pointer"
              >
                تقديم طلب تمويل فوري
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E. Notifications Center Dropdown Sheet */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl space-y-3 text-start mt-12 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-red-600" />
                <h3 className="text-xs font-black text-gray-900">مركز الإشعارات والتنبيهات</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={markAllNotificationsRead} className="text-[10px] font-bold text-red-600 hover:underline">
                  قراءة الكل
                </button>
                <button onClick={() => setShowNotifications(false)} className="p-1 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`py-2.5 space-y-1 ${n.unread ? 'bg-red-50/40 p-2 rounded-xl' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{n.tag}</span>
                    <span className="text-[9px] text-gray-400">{n.time}</span>
                  </div>
                  <h5 className="text-xs font-bold text-gray-900">{n.title}</h5>
                  <p className="text-[10px] text-gray-600 font-light leading-snug">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* F. Side Drawer Menu */}
      {showSideMenu && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-stretch justify-start animate-in fade-in duration-200">
          <div className="w-64 bg-white h-full p-5 shadow-2xl flex flex-col justify-between text-start font-arabic">
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
                <button onClick={() => { setServiceBookingOpen(true); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> <span>حجز موعد صيانة</span>
                </button>
                <button onClick={() => { setTestDriveModalVehicle('سولينا 2026'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-2">
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

      {/* G. Side-by-Side Direct Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl space-y-3 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-black text-gray-900">⚖️ مقارنة المواصفات المباشرة</h3>
              <button onClick={() => setShowComparisonModal(false)} className="p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              {comparisonList.slice(0, 2).map((carId) => {
                const carObj = VEHICLES.find(v => v.id === carId);
                if (!carObj) return null;
                return (
                  <div key={carId} className="p-2 bg-slate-50 rounded-2xl border border-gray-200 space-y-2">
                    <img src={carObj.cardImage || carObj.heroImage} alt={carObj.nameAr} className="h-14 object-contain mx-auto" />
                    <h5 className="text-[11px] font-black text-gray-900">{carObj.nameAr}</h5>
                    <div className="text-xs font-black text-red-600">{carObj.priceStartingFrom.toLocaleString('ar-SA')} ريال</div>
                    <div className="text-[10px] space-y-1 text-gray-600 border-t border-gray-200 pt-1">
                      <div>⚡ {carObj.horsepower || '225 حصان'}</div>
                      <div>⛽ {carObj.fuelEconomy || '24.5 كم/لتر'}</div>
                      <div>🛡️ ضمان 10 سنوات</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => {
                setComparisonList([]);
                setShowComparisonModal(false);
              }}
              className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-xl"
            >
              إفراغ المقارنة
            </button>
          </div>
        </div>
      )}

      {/* H. VIP QR Code Modal */}
      {showVipQrModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-gray-900">بطاقة عضوية VIP الرقمية</h4>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-block">
              <QrCode className="w-32 h-32 text-gray-900 mx-auto" />
            </div>
            <p className="text-[10px] text-gray-400">امسح الرمز في صالات العرض ومراكز الصيانة للحصول على خدمات VIP الفورية.</p>
            <button onClick={() => setShowVipQrModal(false)} className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded-xl cursor-pointer">
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* I. Install App (iOS / Android) Guided Modal */}
      {showInstallAppModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-4 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <img src="/solina-logo.png" alt="سولينا" className="h-6 w-auto" />
                <h4 className="text-xs font-black text-gray-900">تثبيت تطبيق سولينا</h4>
              </div>
              <button onClick={() => setShowInstallAppModal(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-bold text-center">
              <button
                onClick={() => setInstallPlatform('ios')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  installPlatform === 'ios' ? 'bg-white text-black shadow-xs' : 'text-gray-500'
                }`}
              >
                🍏 أجهزة آيفون (iOS)
              </button>
              <button
                onClick={() => setInstallPlatform('android')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  installPlatform === 'android' ? 'bg-white text-black shadow-xs' : 'text-gray-500'
                }`}
              >
                🤖 أجهزة أندرويد (Android)
              </button>
            </div>

            {/* Guided Steps Body */}
            {installPlatform === 'ios' ? (
              <div className="space-y-2.5 text-xs text-gray-700 bg-slate-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                  <p>اضغط على زر <strong>المشاركة (Share ⎋)</strong> في أسفل متصفح Safari.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                  <p>مرر للأسفل واختر <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen ⊞)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                  <p>اضغط على <strong>«إضافة» (Add)</strong> في الزاوية العلوية لتثبيت أيقونة التطبيق الرسمية فوراً.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 text-xs text-gray-700 bg-slate-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                  <p>اضغط على أيقونة <strong>الخيارات (⋮)</strong> في الزاوية العلوية لمتصفح Chrome.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                  <p>اختر <strong>«تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية» (Install app 📥)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                  <p>اضغط <strong>«تثبيت»</strong> وسيعمل التطبيق في نافذة مستقلة وبدون متصفح.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowInstallAppModal(false)}
              className="w-full py-2.5 bg-gray-950 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              فهمت، حسناً
            </button>
          </div>
        </div>
      )}

      {/* Embedded Intelligent Solina AI Assistant */}
      <SolinaAIAssistant
        isOpenExternal={isAssistantOpen}
        onCloseExternal={() => setIsAssistantOpen(false)}
        showFloatingTrigger={false}
        onSelectVehicle={onSelectVehicle}
        onOpenTestDrive={(m) => setTestDriveModalVehicle(m || 'سولينا 2026')}
        onOpenServiceBooking={() => setServiceBookingOpen(true)}
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
