import React, { useState, useEffect } from 'react';
import { 
  Menu, Bell, Search, SlidersHorizontal, Heart, Shield, ChevronLeft, ChevronRight,
  Home, Tag, Car, User, Sparkles, MapPin, Wrench, Headphones, Check, X, Star, Share2,
  Calendar, Phone, Info, Battery, Wifi, Signal, Clock, ArrowLeft, ArrowRight,
  CheckCircle2, Plus, QrCode, FileText, Settings, Globe, AlertCircle, Percent,
  Calculator, Gauge, Award, Fuel, Zap, Eye, PhoneCall, MessageCircle,
  Key, Lock, Unlock, Power, Thermometer, Volume2, Camera, ScanLine, CreditCard, Wallet, RefreshCw, Download, Smartphone
} from 'lucide-react';
import { VEHICLES, type Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { SolinaAIAssistant } from './SolinaAIAssistant';
import { VehicleCatalogModal } from './VehicleCatalogModal';

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
  const {
    vehicles: liveVehicles,
    offers: liveOffers,
    showrooms: liveShowrooms,
    addTestDrive,
    addServiceAppointment,
    addQuotation,
    addZatcaInvoice
  } = useAdminData();

  const allVehicles = liveVehicles && liveVehicles.length > 0 ? liveVehicles : VEHICLES;
  const modalOverlayPos = isNativeMobileView ? 'fixed' : 'absolute';

  // Helper to format vehicle name cleanly without duplicate 'سولينا' or '2026'
  const formatVehicleTitle = (v: Vehicle | { nameAr: string; brand?: string; year?: number }) => {
    const raw = v.nameAr.trim();
    const withYear = raw.includes('2026') || raw.includes('2025') ? raw : `${raw} ${v.year || 2026}`;
    return withYear;
  };

  // In-App Dynamic Island Toast Banner (Replaces browser alert())
  const [appToast, setAppToast] = useState<{ title: string; subtitle?: string; type?: 'success' | 'info' | 'warning' } | null>(null);
  const showAppToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setAppToast({ title, subtitle, type });
    setTimeout(() => {
      setAppToast(prev => (prev?.title === title ? null : prev));
    }, 3800);
  };
  
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'offers' | 'garage' | 'favorites' | 'account'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [cardPreviewMode, setCardPreviewMode] = useState<'exterior' | 'interior'>('exterior');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('solina_app_favorites_v1');
      return saved ? JSON.parse(saved) : ['jetour-t2-2026', 'byd-song-plus-2026', 'camry-2026', 'lc300-2026'];
    } catch {
      return ['jetour-t2-2026', 'byd-song-plus-2026', 'camry-2026', 'lc300-2026'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('solina_app_favorites_v1', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  
  // Vehicle Details Bottom Sheet State
  const [selectedVehicleDetail, setSelectedVehicleDetail] = useState<Vehicle | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('أبيض لؤلؤي كريستالي');
  const [detailColorIndex, setDetailColorIndex] = useState<number>(0);
  const [detailInteriorAngleIndex, setDetailInteriorAngleIndex] = useState<number>(0);
  const [detailInteriorColorIndex, setDetailInteriorColorIndex] = useState<number>(0);
  const [detailGradeIndex, setDetailGradeIndex] = useState<number>(0);
  const [detailViewMode, setDetailViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [catalogModalVehicle, setCatalogModalVehicle] = useState<Vehicle | null>(null);

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
  const [serviceForm, setServiceForm] = useState({ name: 'ضيف سولينا المتميز', phone: '0501234567', plate: 'س ل ن 2026', car: 'سولينا كامري 2026 هايبرد', type: 'صيانة دورية 10,000 كم', city: 'الرياض - مركز الصيانة السريعة', date: '2026-09-02' });
  const [serviceSuccess, setServiceSuccess] = useState<boolean>(false);
  const [lastServiceBookingRef, setLastServiceBookingRef] = useState<string>('SOL-SRV-8942');

  const [financeCalcVehicle, setFinanceCalcVehicle] = useState<Vehicle | null>(null);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [loanYears, setLoanYears] = useState<number>(5);
  const [financeApplicantName, setFinanceApplicantName] = useState<string>('');
  const [financeApplicantPhone, setFinanceApplicantPhone] = useState<string>('');

  const [showVipQrModal, setShowVipQrModal] = useState<boolean>(false);
  const [showAddCarModal, setShowAddCarModal] = useState<boolean>(false);
  const [newGarageCarForm, setNewGarageCarForm] = useState({
    vehicleId: 'jetour-t2-2026',
    plate: 'ج ت ر 2026',
    mileage: '1200'
  });
  const [warrantyModalCar, setWarrantyModalCar] = useState<any | null>(null);
  const [showRoadsideSosModal, setShowRoadsideSosModal] = useState<boolean>(false);
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);
  const [showInstallAppModal, setShowInstallAppModal] = useState<boolean>(false);
  const [installPlatform, setInstallPlatform] = useState<'ios' | 'android'>('ios');

  // Smart Digital Key State
  const [showSmartKeyModal, setShowSmartKeyModal] = useState<boolean>(false);
  const [smartKeyCar, setSmartKeyCar] = useState<any>(null);
  const [isEngineRunning, setIsEngineRunning] = useState<boolean>(false);
  const [isDoorsLocked, setIsDoorsLocked] = useState<boolean>(true);
  const [isAcPrecooling, setIsAcPrecooling] = useState<boolean>(false);
  const [targetAcTemp, setTargetAcTemp] = useState<number>(21.0);
  const [isHazardFlashing, setIsHazardFlashing] = useState<boolean>(false);
  const [keyActionFeedback, setKeyActionFeedback] = useState<string>('');

  // VIN Scanner State
  const [showVinScannerModal, setShowVinScannerModal] = useState<boolean>(false);
  const [isScanningVin, setIsScanningVin] = useState<boolean>(false);
  const [scannedVinRecord, setScannedVinRecord] = useState<any | null>(null);

  // Trade-In Valuation State
  const [showTradeInModal, setShowTradeInModal] = useState<boolean>(false);
  const [tradeInForm, setTradeInForm] = useState({
    brand: 'سولينا / تويوتا',
    model: 'كامري هايبرد',
    year: '2023',
    mileage: '42,000 كم',
    condition: 'ممتازة - صيانة وكالة منتظمة'
  });
  const [tradeInEstimatedValue, setTradeInEstimatedValue] = useState<number | null>(null);

  // Deposit Checkout State
  const [showDepositCheckoutModal, setShowDepositCheckoutModal] = useState<boolean>(false);
  const [depositVehicle, setDepositVehicle] = useState<Vehicle | null>(null);
  const [depositCustomerName, setDepositCustomerName] = useState<string>('ضيف سولينا المتميز');
  const [depositCustomerPhone, setDepositCustomerPhone] = useState<string>('0501234567');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'applepay' | 'visa' | 'tabby' | 'tamara'>('applepay');
  const [depositSuccess, setDepositSuccess] = useState<boolean>(false);
  const [depositReference, setDepositReference] = useState<string>('');

  // Offers Filter
  const [offersFilter, setOffersFilter] = useState<'all' | 'finance' | 'service' | 'cashback'>('all');

  // Garage Cars with localStorage persistence
  const [userCars, setUserCars] = useState(() => {
    const defaultCars = [
      {
        id: 'car-1',
        model: 'سولينا كامري 2026 هايبرد',
        plate: 'س ل ن 2026',
        vin: 'JTNB11HK9P3012948',
        mileage: 8450,
        nextServiceKm: 10000,
        nextServiceDate: '25 سبتمبر 2026',
        warrantyExpiry: '2036 (ساري 10 سنوات / 300 ألف كم)',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp'
      },
      {
        id: 'car-2',
        model: 'جيتور T2 الدفع الرباعي 2026',
        plate: 'ج ت ر 2026',
        vin: 'LVTDD24B7R0084921',
        mileage: 4200,
        nextServiceKm: 10000,
        nextServiceDate: '12 أكتوبر 2026',
        warrantyExpiry: '2036 (ضمان المصنع 10 سنوات / مليون كم)',
        image: '/vehicles/jetour-t2-ext-1.jpg?v=2026'
      },
      {
        id: 'car-3',
        model: 'سولينا لاند كروزر LC300 2026',
        plate: 'ر ي ض 300',
        vin: 'JTMAA7BJ0P4058210',
        mileage: 22100,
        nextServiceKm: 30000,
        nextServiceDate: '15 نوفمبر 2026',
        warrantyExpiry: '2036 (ساري 10 سنوات / 300 ألف كم)',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp'
      }
    ];
    try {
      const saved = localStorage.getItem('solina_app_garage_v3');
      return saved ? JSON.parse(saved) : defaultCars;
    } catch {
      return defaultCars;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('solina_app_garage_v3', JSON.stringify(userCars));
    } catch {}
  }, [userCars]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'وصول أسطول جيتور وبي واي دي وهونداي 2026!', desc: 'تصفح جيتور T2 وداشينج وبي واي دي سونغ بلس وهونداي أزرق وسنتافي مع داخليات 360°.', time: 'الآن', unread: true, tag: 'جديد' },
    { id: 2, title: 'تذكير بموعد الصيانة الدورية', desc: 'اقترب موعد صيانة 10,000 كم لسيارتك كامري 2026.', time: 'أمس', unread: true, tag: 'صيانة' },
    { id: 3, title: 'عرض تمويلي حصري 0% دفعة أولى', desc: 'استفد من أقساط ميسرة بدون رسوم إدارية حتى نهاية الشهر.', time: 'منذ يومين', unread: false, tag: 'عروض' }
  ]);

  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const quickServices = [
    { id: 'smartkey', nameAr: 'المفتاح الذكي', icon: Key, color: 'bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white' },
    { id: 'vinscan', nameAr: 'ماسح الشاسيه', icon: ScanLine, color: 'bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white' },
    { id: 'tradein', nameAr: 'تثمين سيارتك', icon: RefreshCw, color: 'bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white' },
    { id: 'offers', nameAr: 'عروض 2026', icon: Tag, color: 'bg-[#f3f3f3] text-[#141414] group-hover:bg-[#141414] group-hover:text-white' },
    { id: 'support', nameAr: 'مساعد سولينا', icon: Headphones, color: 'bg-[#f3f3f3] text-red-600 group-hover:bg-red-600 group-hover:text-white' }
  ];

  const categories = [
    { id: 'luxury', nameAr: 'فاخرة', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp' },
    { id: 'gr', nameAr: 'رياضية', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/gr86-306x122.webp' },
    { id: 'suv', nameAr: 'دفع رباعي', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp' },
    { id: 'sedan', nameAr: 'سيدان', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp' }
  ];

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const exists = favorites.includes(id);
    setFavorites(prev => 
      exists ? prev.filter(item => item !== id) : [...prev, id]
    );
    const car = allVehicles.find(v => v.id === id);
    if (car) {
      showAppToast(
        exists ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
        car.nameAr,
        exists ? 'info' : 'success'
      );
    }
  };

  const toggleComparison = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparisonList.includes(id)) {
      setComparisonList(prev => prev.filter(item => item !== id));
    } else {
      if (comparisonList.length >= 2) {
        showAppToast('الحد الأقصى للمقارنة سيارتان', 'انقر على "قارن الآن" أو أزل سيارة أولاً', 'warning');
        setShowComparisonModal(true);
        return;
      }
      const next = [...comparisonList, id];
      setComparisonList(next);
      showAppToast('أضيفت للمقارنة المباشرة', next.length === 2 ? 'جاهز للمقارنة! اضغط لعرض الجدول' : 'اختر سيارة ثانية للمقارنة', 'info');
      if (next.length === 2) {
        setShowComparisonModal(true);
      }
    }
  };

  const filteredVehicles = allVehicles.filter(v => {
    const imgPath = v.cardImage || v.heroImage || '';
    const hasValidImage = Boolean(imgPath && (imgPath.startsWith('http') || imgPath.startsWith('/')));
    const isLuxuryBrand = ['lexus', 'mercedes', 'porsche', 'bmw', 'genesis', 'landrover'].includes((v.brand || '').toLowerCase()) || v.priceStartingFrom >= 300000;
    const matchesCategory = selectedCategory === 'all' 
      || v.category === selectedCategory 
      || (selectedCategory === 'luxury' && isLuxuryBrand);
    const vBrand = (v.brand || 'toyota').toLowerCase();
    const matchesBrand = selectedBrandFilter === 'all'
      || vBrand === selectedBrandFilter
      || (selectedBrandFilter === 'luxury_elite' && ['mercedes', 'porsche', 'bmw', 'genesis', 'landrover'].includes(vBrand));
    const matchesSearch = v.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) 
      || v.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      || (v.brand && v.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return hasValidImage && matchesCategory && matchesBrand && matchesSearch;
  }).sort((a, b) => {
    const priority = ['jetour', 'byd', 'hyundai', 'lc300', 'camry', 'crown', 'prado', 'lexus', 'mercedes', 'porsche', 'range-rover', 'bmw', 'genesis', 'gr86'];
    const aIndex = priority.findIndex(p => a.id.includes(p) || (a.brand && a.brand.includes(p)));
    const bIndex = priority.findIndex(p => b.id.includes(p) || (b.brand && b.brand.includes(p)));
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
      bg: 'from-[#141414] via-red-950 to-black',
      vehicle: 'camry-2026'
    },
    {
      id: 'offer-jetour',
      category: 'finance',
      title: 'عرض جيتور T2 وداشينج 2026',
      badge: 'ضمان 10 سنوات / مليون كم',
      discount: 'قسط يبدأ من 1,450 ريال/شهر',
      desc: 'امتلك جيتور T2 الدفع الرباعي أو داشينج تيربو بدون دفعة أولى مع تظليل عازل حراري مجاناً.',
      daysLeft: 9,
      bg: 'from-[#141414] via-[#1c1c1e] to-black',
      vehicle: 'jetour-t2-2026'
    },
    {
      id: 'offer-byd',
      category: 'finance',
      title: 'باقة BYD الكهربائية والهجينة 2026',
      badge: 'شاحن منزلي مجاني 7kW',
      discount: 'ضمان بطارية Blade لـ 8 سنوات',
      desc: 'اقتنِ بي واي دي سونغ بلس DM-i أو هان EV أو سيل مع شاحن جداري مجاني وصيانة سنتين.',
      daysLeft: 11,
      bg: 'from-[#141414] via-[#262626] to-black',
      vehicle: 'byd-song-plus-2026'
    },
    {
      id: 'offer-2',
      category: 'service',
      title: 'باقة الصيانة الذهبية المجانية',
      badge: 'سنتان صيانة مجانية',
      discount: 'شاملة الزيوت والفلاتر',
      desc: 'عند شراء أي سيارة دفع رباعي (لاندكروزر، برادو، سنتافي، باليسيد) استمتع بـ 4 صيانات دورية مجانية.',
      daysLeft: 12,
      bg: 'from-[#141414] via-slate-900 to-black',
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
      bg: 'from-[#141414] via-red-950/80 to-black',
      vehicle: 'crown-2026'
    }
  ];

  const filteredOffers = offersData.filter(o => offersFilter === 'all' || o.category === offersFilter);

  const brandPills = [
    { id: 'all', label: 'الكل', count: allVehicles.length },
    { id: 'toyota', label: 'سولينا', count: allVehicles.filter(v => !v.brand || v.brand === 'toyota').length },
    { id: 'jetour', label: 'جيتور JETOUR', count: allVehicles.filter(v => v.brand === 'jetour').length },
    { id: 'byd', label: 'بي واي دي BYD', count: allVehicles.filter(v => v.brand === 'byd').length },
    { id: 'hyundai', label: 'هيونداي HYUNDAI', count: allVehicles.filter(v => v.brand === 'hyundai').length },
    { id: 'lexus', label: 'لكزس LEXUS', count: allVehicles.filter(v => v.brand === 'lexus').length },
    { id: 'luxury_elite', label: 'النخبة الفاخرة', count: allVehicles.filter(v => ['mercedes', 'porsche', 'bmw', 'genesis', 'landrover'].includes((v.brand || '').toLowerCase())).length }
  ];

  // Render Inner App UI
  const renderAppContent = () => (
    <div className={`relative w-full bg-[#ffffff] overflow-hidden flex flex-col font-arabic text-[#141414] ${isNativeMobileView ? 'min-h-screen pb-20' : 'h-[780px] rounded-[38px]'}`}>
      
      {/* Dynamic Island In-App Notification Toast */}
      {appToast && (
        <div
          onClick={() => setAppToast(null)}
          className="absolute top-10 left-3 right-3 z-[70] bg-[#141414] text-white px-3.5 py-2.5 rounded-2xl border border-white/15 flex items-center justify-between gap-2.5 animate-in slide-in-from-top duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-[30%] flex items-center justify-center shrink-0 ${
              appToast.type === 'warning' ? 'bg-red-600 text-white' : 'bg-white/15 text-white'
            }`}>
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div className="text-start">
              <div className="text-[11px] font-black leading-tight">{appToast.title}</div>
              {appToast.subtitle && (
                <div className="text-[9px] text-[#adadad] font-light mt-0.5 line-clamp-1">{appToast.subtitle}</div>
              )}
            </div>
          </div>
          <X className="w-3.5 h-3.5 text-[#adadad] shrink-0" />
        </div>
      )}

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
                    placeholder="ابحث عن جيتور، بي واي دي، هيونداي، كامري..."
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
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrandFilter('all');
                    setSearchQuery('');
                    showAppToast('تم إعادة ضبط الفلاتر', 'عرض جميع طرازات 2026', 'info');
                  }}
                  className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 shadow-xs transition-all cursor-pointer"
                  title="إعادة ضبط الفلاتر"
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
                        if (srv.id === 'smartkey') {
                          setSmartKeyCar(userCars[0]);
                          setShowSmartKeyModal(true);
                        } else if (srv.id === 'vinscan') {
                          setShowVinScannerModal(true);
                          setIsScanningVin(true);
                          setScannedVinRecord(null);
                        } else if (srv.id === 'tradein') {
                          setShowTradeInModal(true);
                        } else if (srv.id === 'offers') {
                          setActiveTab('offers');
                        } else if (srv.id === 'support') {
                          setIsAssistantOpen(true);
                        }
                      }}
                      className="flex flex-col items-center gap-1.5 min-w-[62px] p-2 rounded-2xl bg-white border border-[#e0e0e0] active:scale-95 transition-all cursor-pointer group"
                    >
                      <div className={`w-11 h-11 rounded-[30%] ${srv.color} flex items-center justify-center transition-all`}>
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-[10px] font-bold text-[#141414] text-center leading-tight">
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
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-black text-gray-900">أحدث سيارات ووكالات 2026</h4>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {filteredVehicles.length} طراز متوفر للحجز الفوري
                  </span>
                </div>

                {/* Exterior / Interior Card View Toggle */}
                <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setCardPreviewMode('exterior')}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                      cardPreviewMode === 'exterior' ? 'bg-gray-900 text-white shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    الخارجية
                  </button>
                  <button
                    onClick={() => setCardPreviewMode('interior')}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                      cardPreviewMode === 'interior' ? 'bg-red-600 text-white shadow-2xs' : 'text-gray-600'
                    }`}
                  >
                    المقصورة 360°
                  </button>
                </div>
              </div>

              {/* Brand Filter Pills (الكل، سولينا، جيتور، بي واي دي، هيونداي، لكزس، النخبة) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5">
                {brandPills.map((brandPill) => (
                  <button
                    key={brandPill.id}
                    onClick={() => setSelectedBrandFilter(brandPill.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      selectedBrandFilter === brandPill.id
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <span>{brandPill.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[8px] ${
                      selectedBrandFilter === brandPill.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {brandPill.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {filteredVehicles.map((vehicle) => {
                  const isFav = favorites.includes(vehicle.id);
                  const isCompared = comparisonList.includes(vehicle.id);
                  const displayPrice = vehicle.priceStartingFrom.toLocaleString('ar-SA');
                  const monthlyInstallment = Math.round(vehicle.priceStartingFrom / 70).toLocaleString('ar-SA');
                  const brandLabelAr: Record<string, string> = {
                    jetour: 'جيتور',
                    byd: 'بي واي دي',
                    hyundai: 'هيونداي',
                    lexus: 'لكزس',
                    mercedes: 'مرسيدس',
                    porsche: 'بورش',
                    bmw: 'بي إم دبليو',
                    genesis: 'جينيسيس',
                    landrover: 'رينج روفر',
                    toyota: 'سولينا'
                  };
                  const vBrandKey = (vehicle.brand || 'toyota').toLowerCase();

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => {
                        setSelectedVehicleDetail(vehicle);
                        setDetailColorIndex(0);
                        setDetailInteriorAngleIndex(0);
                        setDetailInteriorColorIndex(0);
                        setDetailGradeIndex(0);
                        setDetailViewMode(cardPreviewMode);
                      }}
                      className="bg-white rounded-2xl p-2.5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group cursor-pointer active:scale-[0.98]"
                    >
                      {/* Top Badges: Favorite & Brand/Powertrain */}
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

                        <div className="flex items-center gap-1">
                          {vBrandKey !== 'toyota' && (
                            <span className="px-1.5 py-0.5 rounded-md bg-gray-900 text-white text-[8px] font-black">
                              {brandLabelAr[vBrandKey] || vehicle.brand}
                            </span>
                          )}
                          <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white text-[8px] font-black">
                            {vehicle.powertrain === 'كهربائي' ? 'كهربائية EV' : vehicle.isHybrid ? 'هايبرد 2026' : '2026'}
                          </span>
                        </div>
                      </div>

                      {/* Vehicle Exterior or Interior Cabin Preview */}
                      <div className="h-20 sm:h-24 w-full flex items-center justify-center my-1 relative overflow-hidden rounded-xl">
                        {cardPreviewMode === 'interior' && vehicle.interiorImage ? (
                          <img
                            src={vehicle.interiorImage}
                            alt={`مقصورة ${vehicle.nameAr}`}
                            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={vehicle.cardImage || vehicle.heroImage}
                            alt={vehicle.nameAr}
                            className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Color Swatches Preview */}
                      {vehicle.colors && vehicle.colors.length > 0 && (
                        <div className="flex items-center justify-between my-1">
                          <div className="flex items-center gap-1">
                            {vehicle.colors.slice(0, 5).map((c) => (
                              <span
                                key={c.id}
                                className="w-2.5 h-2.5 rounded-full border border-gray-300 shadow-2xs"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                            {vehicle.colors.length > 5 && (
                              <span className="text-[8px] font-bold text-gray-400">+{vehicle.colors.length - 5}</span>
                            )}
                          </div>
                          {vehicle.interiorGallery && vehicle.interiorGallery.length > 0 && (
                            <span className="text-[8px] font-bold text-[#141414] bg-[#f3f3f3] border border-[#e0e0e0] px-1.5 py-0.5 rounded-full">
                              داخليات 360°
                            </span>
                          )}
                        </div>
                      )}

                      {/* Vehicle Meta Title */}
                      <div className="text-start space-y-0.5 mt-0.5">
                        <h5 className="text-[11px] font-black text-gray-900 line-clamp-1">
                          {formatVehicleTitle(vehicle)}
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

                      {/* Action Button: Book / Details / Catalog */}
                      <div className="pt-2 flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicleDetail(vehicle);
                            setDetailColorIndex(0);
                            setDetailInteriorAngleIndex(0);
                            setDetailInteriorColorIndex(0);
                            setDetailGradeIndex(0);
                            setDetailViewMode('exterior');
                          }}
                          className="flex-1 py-1.5 rounded-full bg-[#141414] hover:bg-red-600 text-white text-[10px] font-black transition-colors cursor-pointer"
                        >
                          تفاصيل وحجز
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCatalogModalVehicle(vehicle);
                          }}
                          className="px-2 py-1.5 rounded-full bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-[9px] font-black transition-all cursor-pointer"
                          title="الكتالوج والداخليات"
                        >
                          كتالوج
                        </button>
                        <button
                          onClick={(e) => toggleComparison(vehicle.id, e)}
                          className={`px-2 py-1.5 rounded-full border text-[9px] font-bold transition-all cursor-pointer inline-flex items-center justify-center ${
                            isCompared ? 'bg-red-600 text-white border-red-600' : 'bg-[#f3f3f3] text-[#707070] border-[#e0e0e0]'
                          }`}
                          title="مقارنة"
                        >
                          {isCompared ? <Check className="w-3 h-3" strokeWidth={2.5} /> : 'قارن'}
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
                onClick={() => setWarrantyModalCar(userCars[0])}
                className="relative w-full rounded-2xl overflow-hidden border border-[#e0e0e0] bg-[#141414] cursor-pointer active:scale-[0.98] transition-transform group"
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Tag className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">عروض سولينا الحصرية 2026</h3>
                  <p className="text-[10px] text-[#707070] font-light">أفضل الصفقات التمويلية وباقات الصيانة المعتمدة</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-[10px] font-black rounded-full">
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
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    offersFilter === f.id
                      ? 'bg-[#141414] text-white'
                      : 'bg-white text-[#141414] border border-[#e0e0e0]'
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
                  className={`p-4 rounded-3xl bg-gradient-to-r ${offer.bg} text-white space-y-2.5 relative overflow-hidden border border-white/10`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black bg-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {offer.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#adadad]">
                      <Clock className="w-3 h-3" strokeWidth={1.75} />
                      <span>متبقي {offer.daysLeft} أيام</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black">{offer.title}</h4>
                    <span className="text-[11px] font-bold text-red-400 block">{offer.discount}</span>
                    <p className="text-[11px] text-white/80 font-light mt-1 leading-snug">{offer.desc}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <button
                      onClick={() => setTestDriveModalVehicle(offer.title)}
                      className="px-4 py-1.5 rounded-full bg-white text-[#141414] hover:bg-[#f3f3f3] text-[10px] font-black cursor-pointer active:scale-95 transition-all"
                    >
                      الاستفادة من العرض الآن
                    </button>
                    <button 
                      onClick={() => {
                        try {
                          navigator.clipboard?.writeText(`${window.location.origin}/#offers`);
                        } catch {}
                        showAppToast('تم نسخ رابط العرض بنجاح', offer.title, 'info');
                      }}
                      className="p-1.5 text-white/80 hover:text-white cursor-pointer"
                      title="مشاركة العرض"
                    >
                      <Share2 className="w-3.5 h-3.5" strokeWidth={1.75} />
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Car className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">مرآبي وسياراتي المسجلة</h3>
                  <p className="text-[10px] text-[#707070] font-light">إدارة الصيانة وسجل الضمان الرقمي لمركباتك</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddCarModal(true)}
                className="px-3 py-1.5 bg-[#141414] hover:bg-black text-white text-[10px] font-bold rounded-full flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3" strokeWidth={2} />
                <span>إضافة سيارة</span>
              </button>
            </div>

            {/* User Cars List */}
            <div className="space-y-3">
              {userCars.map((car: any) => (
                <div key={car.id} className="p-4 rounded-3xl bg-white border border-[#e0e0e0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                        <Car className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#141414]">{car.model}</h4>
                        <span className="text-[10px] font-bold text-[#707070]">لوحة: {car.plate}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[9px] font-bold border border-[#e0e0e0] inline-flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      <span>الضمان نشط</span>
                    </span>
                  </div>

                  {/* Car Image Preview */}
                  <div className="h-20 w-full flex items-center justify-center bg-[#f3f3f3] rounded-2xl p-2 overflow-hidden">
                    <img src={car.image} alt={car.model} className="h-full object-contain rounded-lg" />
                  </div>

                  {/* Live Odometer & Maintenance Status */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#f3f3f3] p-2.5 rounded-2xl border border-[#e0e0e0]">
                    <div>
                      <span className="text-[#707070] block">عداد الكيلومترات</span>
                      <strong className="text-[#141414] font-bold text-xs">{Number(car.mileage).toLocaleString('ar-SA')} كم</strong>
                    </div>
                    <div>
                      <span className="text-[#707070] block">الصيانة القادمة</span>
                      <strong className="text-red-600 font-bold text-xs">{Number(car.nextServiceKm).toLocaleString('ar-SA')} كم</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button 
                      onClick={() => {
                        setSmartKeyCar(car);
                        setShowSmartKeyModal(true);
                      }}
                      className="py-2 rounded-full bg-[#141414] hover:bg-black text-white text-[10px] font-bold text-center cursor-pointer flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <Key className="w-3 h-3" strokeWidth={1.75} />
                      <span>المفتاح الذكي</span>
                    </button>
                    <button 
                      onClick={() => {
                        setServiceForm(prev => ({ ...prev, car: car.model, plate: car.plate }));
                        setServiceBookingOpen(true);
                      }}
                      className="py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold text-center cursor-pointer flex items-center justify-center gap-1 active:scale-95 transition-all"
                    >
                      <Calendar className="w-3 h-3" strokeWidth={1.75} />
                      <span>حجز صيانة</span>
                    </button>
                    <button 
                      onClick={() => setWarrantyModalCar(car)}
                      className="py-2 rounded-full bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#141414] border border-[#e0e0e0] text-[10px] font-bold cursor-pointer text-center"
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Heart className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">المفضلة والمقارنة</h3>
                  <p className="text-[10px] text-[#707070] font-light">السيارات التي تم حفظها للاطلاع والمقارنة</p>
                </div>
              </div>
              {comparisonList.length > 0 && (
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="px-3 py-1 bg-[#141414] text-white text-[10px] font-black rounded-full cursor-pointer"
                >
                  قارن الآن ({comparisonList.length})
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#e0e0e0] space-y-2">
                <Heart className="w-8 h-8 text-[#adadad] mx-auto" strokeWidth={1.5} />
                <p className="text-xs font-bold text-[#141414]">لم تقم بإضافة سيارات للمفضلة بعد</p>
                <button onClick={() => setActiveTab('home')} className="px-4 py-1.5 bg-[#141414] text-white text-xs font-bold rounded-full cursor-pointer">
                  تصفح السيارات الآن
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {allVehicles.filter(v => favorites.includes(v.id)).map(v => (
                  <div 
                    key={v.id} 
                    onClick={() => {
                      setSelectedVehicleDetail(v);
                      setDetailColorIndex(0);
                      setDetailInteriorAngleIndex(0);
                      setDetailGradeIndex(0);
                      setDetailViewMode('exterior');
                    }}
                    className="p-3 rounded-2xl bg-white border border-[#e0e0e0] flex items-center justify-between gap-3 cursor-pointer hover:border-[#141414] transition-all"
                  >
                    <img src={v.cardImage || v.heroImage || ''} alt={v.nameAr} className="h-12 w-16 object-contain rounded-lg" />
                    <div className="flex-1 text-start">
                      <h5 className="text-xs font-black text-[#141414]">{formatVehicleTitle(v)}</h5>
                      <span className="text-xs font-black text-red-600">{v.priceStartingFrom.toLocaleString('ar-SA')} ريال</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCatalogModalVehicle(v);
                        }}
                        className="px-2.5 py-1 bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-[9px] font-black rounded-full cursor-pointer"
                      >
                        كتالوج
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTestDriveModalVehicle(formatVehicleTitle(v));
                        }}
                        className="px-2.5 py-1 bg-[#141414] text-white text-[9px] font-bold rounded-full cursor-pointer"
                      >
                        تجربة
                      </button>
                      <button onClick={(e) => toggleFavorite(v.id, e)} className="p-1.5 text-red-600 cursor-pointer">
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
            <div className="p-4 rounded-3xl bg-[#141414] text-white flex items-center justify-between border border-white/10 relative overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-white" strokeWidth={1.75} />
                  <span className="text-xs font-black text-white">عضوية سولينا الذهبية VIP</span>
                </div>
                <h4 className="text-sm font-black">ضيف سولينا المتميز</h4>
                <span className="text-[10px] text-[#adadad] block font-mono">+966 50 123 4567</span>
              </div>
              <button 
                onClick={() => setShowVipQrModal(true)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white cursor-pointer"
                title="عرض رمز العضوية QR"
              >
                <QrCode className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-3xl border border-[#e0e0e0] divide-y divide-[#f0f0f0] text-xs overflow-hidden">
              <button onClick={() => setShowInstallAppModal(true)} className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors">
                <span className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                  <strong className="text-[#141414]">تثبيت التطبيق على الهاتف (iOS & Android)</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#141414] text-white text-[9px] font-bold">PWA</span>
              </button>
              <button 
                onClick={() => {
                  window.location.hash = 'erp';
                  window.location.reload();
                }} 
                className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                  <strong className="text-[#141414]">نظام إدارة الوكالة والـ ERP المتكامل</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-[9px] font-bold">ZATCA & DMS</span>
              </button>
              <button onClick={() => setServiceBookingOpen(true)} className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors">
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#707070]" strokeWidth={1.75} />
                  <strong>طلباتي ومواعيد الصيانة</strong>
                </span>
                <ChevronLeft className="w-4 h-4 text-[#adadad]" />
              </button>
              <button onClick={() => setIsAssistantOpen(true)} className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors">
                <span className="flex items-center gap-2.5">
                  <Headphones className="w-4 h-4 text-[#707070]" strokeWidth={1.75} />
                  <strong>خدمة عملاء ومساعد سولينا الذكي 24/7</strong>
                </span>
                <ChevronLeft className="w-4 h-4 text-[#adadad]" />
              </button>
              <button onClick={() => { setShowRoadsideSosModal(true); setSosDispatched(false); }} className="w-full p-3.5 flex items-center justify-between text-red-600 hover:bg-[#f3f3f3] cursor-pointer font-bold transition-colors">
                <span className="flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={1.75} />
                  <strong>طوارئ المساعدة على الطريق 24/7 (SOS)</strong>
                </span>
                <ChevronLeft className="w-4 h-4 text-red-400" />
              </button>
              <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors">
                <span className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#707070]" strokeWidth={1.75} />
                  <strong>لغة التطبيق / Language</strong>
                </span>
                <span className="text-[11px] font-bold text-[#141414]">{language === 'ar' ? 'العربية (AR)' : 'English (EN)'}</span>
              </button>
              <button onClick={() => showAppToast('تطبيق سولينا موتورز - الإصدار 2026.5.0', 'مرتبط مباشرة بنظام الـ ERP والفوترة الإلكترونية ZATCA', 'info')} className="w-full p-3.5 flex items-center justify-between text-[#141414] hover:bg-[#f3f3f3] cursor-pointer transition-colors">
                <span className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-[#707070]" strokeWidth={1.75} />
                  <strong>عن التطبيق والشروط</strong>
                </span>
                <span className="text-[10px] text-[#707070]">v2026.5</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. Bottom Tab Bar Navigation */}
      <div className={`${modalOverlayPos} bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 py-2 flex items-center justify-around z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]`}>
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
      {selectedVehicleDetail && (() => {
        const activeGrade = selectedVehicleDetail.grades?.[detailGradeIndex] || selectedVehicleDetail.grades?.[0];
        const currentPrice = activeGrade ? activeGrade.price : selectedVehicleDetail.priceStartingFrom;
        const interiorShots = selectedVehicleDetail.interiorGallery && selectedVehicleDetail.interiorGallery.length > 0
          ? selectedVehicleDetail.interiorGallery
          : [
              { id: 'cabin-main', titleAr: 'قمرة القيادة والشاشات', titleEn: 'Cockpit & Displays', image: selectedVehicleDetail.interiorImage || selectedVehicleDetail.cardImage },
              { id: 'cabin-seats', titleAr: 'المقاعد الأمامية الفاخرة', titleEn: 'Front Luxury Seats', image: selectedVehicleDetail.interiorImage || selectedVehicleDetail.cardImage }
            ];
        const activeInteriorShot = interiorShots[detailInteriorAngleIndex] || interiorShots[0];
        const upholsterySwatches = [
          { id: 'tan', nameAr: 'جلد نابا جملي فاخر', hex: '#A0522D' },
          { id: 'black', nameAr: 'جلد نابا أسود ملكي', hex: '#1C1C1E' },
          { id: 'ivory', nameAr: 'جلد بيج عاجي', hex: '#E6DCC8' },
          { id: 'crimson', nameAr: 'جلد أحمر رياضي', hex: '#7F1D1D' }
        ];

        return (
          <div className={`${modalOverlayPos} inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in duration-200`}>
            <div className="w-full max-h-[90%] bg-white rounded-t-[32px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 text-start">
              {/* Grab Handle & Close */}
              <div className="p-3 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                <div>
                  <span className="text-xs font-black text-gray-900 block">مواصفات {formatVehicleTitle(selectedVehicleDetail)}</span>
                  <span className="text-[10px] text-gray-500">{selectedVehicleDetail.bodyTypeAr} • {selectedVehicleDetail.engineSpec}</span>
                </div>
                <button 
                  onClick={() => setSelectedVehicleDetail(null)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sheet Scroll Body */}
              <div className="overflow-y-auto p-3.5 space-y-3.5 flex-1">
                {/* Car Image Stage with Exterior / Interior Switcher */}
                <div className="relative h-48 w-full bg-gradient-to-b from-gray-100 to-white rounded-2xl p-2 flex items-center justify-center border border-gray-100 overflow-hidden">
                  {detailViewMode === 'interior' ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={activeInteriorShot?.image || selectedVehicleDetail.interiorImage || selectedVehicleDetail.cardImage}
                        alt={`${selectedVehicleDetail.nameAr} - ${activeInteriorShot?.titleAr || 'داخلية'}`}
                        className="w-full h-full object-cover rounded-xl transition-all duration-300"
                      />
                      <div className="absolute bottom-2 right-2 left-2 bg-black/65 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg flex items-center justify-between text-[10px]">
                        <span className="font-bold">{activeInteriorShot?.titleAr || 'المقصورة الداخلية 360°'}</span>
                        <span className="text-red-500 font-mono">{detailInteriorAngleIndex + 1} / {interiorShots.length}</span>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={selectedVehicleDetail.colors?.[detailColorIndex]?.image || selectedVehicleDetail.cardImage || selectedVehicleDetail.heroImage} 
                      alt={selectedVehicleDetail.nameAr} 
                      className="max-h-full object-contain transition-all duration-300"
                    />
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-xs">
                    <button
                      onClick={() => setDetailViewMode('exterior')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                        detailViewMode === 'exterior' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      الخارجية
                    </button>
                    <button
                      onClick={() => setDetailViewMode('interior')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
                        detailViewMode === 'interior' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      الداخلية 360° ({interiorShots.length})
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                    موديل {selectedVehicleDetail.year}
                  </span>
                </div>

                {/* Interior 4-Angle Switcher & Upholstery Colors (when in Interior mode) */}
                {detailViewMode === 'interior' ? (
                  <div className="space-y-2.5 bg-slate-50 p-2.5 rounded-2xl border border-gray-200">
                    <div className="text-[10px] font-black text-gray-800 flex items-center justify-between">
                      <span>زوايا المقصورة الداخلية ({interiorShots.length} زوايا):</span>
                      <span className="text-red-600">{activeInteriorShot?.titleAr}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {interiorShots.map((shot, idx) => (
                        <button
                          key={shot.id || idx}
                          onClick={() => setDetailInteriorAngleIndex(idx)}
                          className={`p-1 rounded-xl border text-center transition-all cursor-pointer overflow-hidden ${
                            detailInteriorAngleIndex === idx
                              ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <img src={shot.image} alt={shot.titleAr} className="w-full h-10 object-cover rounded-lg mb-1" />
                          <span className="text-[8px] font-bold text-gray-800 line-clamp-1 block">{shot.titleAr}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-700">
                        لون الفرش: <strong className="text-red-600">{upholsterySwatches[detailInteriorColorIndex]?.nameAr}</strong>
                      </span>
                      <div className="flex items-center gap-1.5">
                        {upholsterySwatches.map((ic, idx) => (
                          <button
                            key={ic.id}
                            onClick={() => setDetailInteriorColorIndex(idx)}
                            className={`w-5 h-5 rounded-full border border-gray-300 cursor-pointer ${
                              detailInteriorColorIndex === idx ? 'ring-2 ring-red-600 ring-offset-1 scale-110' : ''
                            }`}
                            style={{ backgroundColor: ic.hex }}
                            title={ic.nameAr}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Dynamic Exterior Color Selector */
                  selectedVehicleDetail.colors && selectedVehicleDetail.colors.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-gray-900 font-bold">اللون الخارجي ({selectedVehicleDetail.colors.length} ألوان):</strong>
                        <span className="text-red-600 font-bold">{selectedVehicleDetail.colors[detailColorIndex]?.name || selectedColor}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedVehicleDetail.colors.map((c, idx) => (
                          <button
                            key={c.id || idx}
                            onClick={() => {
                              setDetailColorIndex(idx);
                              setSelectedColor(c.name);
                              setDetailViewMode('exterior');
                            }}
                            className={`w-6 h-6 rounded-full border-2 border-gray-300 transition-all cursor-pointer ${
                              detailColorIndex === idx ? 'ring-2 ring-red-500 ring-offset-2 scale-110' : ''
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}

                {/* Trim / Grade Selector Pills */}
                {selectedVehicleDetail.grades && selectedVehicleDetail.grades.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-gray-800 block">اختر الفئة ({selectedVehicleDetail.grades.length} فئات متوفرة):</span>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {selectedVehicleDetail.grades.map((grade, gIdx) => (
                        <button
                          key={gIdx}
                          onClick={() => setDetailGradeIndex(gIdx)}
                          className={`px-2.5 py-1.5 rounded-xl border text-start shrink-0 transition-all cursor-pointer ${
                            detailGradeIndex === gIdx
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : 'bg-white text-gray-800 border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="text-[10px] font-black">{grade.name}</div>
                          <div className={`text-[9px] font-bold ${detailGradeIndex === gIdx ? 'text-red-100' : 'text-red-600'}`}>
                            {grade.price.toLocaleString('ar-SA')} ريال
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Official Catalog & Interior Gallery Trigger */}
                <button
                  onClick={() => {
                    const v = selectedVehicleDetail;
                    setSelectedVehicleDetail(null);
                    setCatalogModalVehicle(v);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-gray-900 hover:bg-red-600 text-white text-xs font-black flex items-center justify-between shadow-sm transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-400" />
                    <span>استعراض الكتالوج الرسمي والداخليات (PDF)</span>
                  </span>
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Key Specs Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#f3f3f3] p-3 rounded-2xl border border-[#e0e0e0]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                    <div>
                      <span className="text-[#707070] text-[10px] block">المحرك والقوة</span>
                      <strong className="text-[#141414] font-black text-[11px]">{activeGrade?.engine || selectedVehicleDetail.horsepower || '225 حصان'}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                    <div>
                      <span className="text-[#707070] text-[10px] block">كفاءة الاستهلاك</span>
                      <strong className="text-[#141414] font-black text-[11px]">{selectedVehicleDetail.fuelEconomy || '27.7 كم/لتر'}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                    <div>
                      <span className="text-[#707070] text-[10px] block">ناقل الحركة</span>
                      <strong className="text-[#141414] font-black text-[11px]">{activeGrade?.transmission || selectedVehicleDetail.transmissionAr || 'أوتوماتيكي ذكي'}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-600" strokeWidth={1.75} />
                    <div>
                      <span className="text-[#707070] text-[10px] block">الضمان المعتمد</span>
                      <strong className="text-[#141414] font-black text-[11px]">
                        {selectedVehicleDetail.brand === 'jetour' ? '10 سنوات / مليون كم' : '10 سنوات / 300 ألف كم'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Pricing & Installment Box */}
                <div className="p-3 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#707070] block">
                      سعر فئة ({activeGrade?.name || 'القياسية'}) شامل الضريبة
                    </span>
                    <strong className="text-base font-black text-red-600">
                      {currentPrice.toLocaleString('ar-SA')} ريال
                    </strong>
                  </div>
                  <button
                    onClick={() => {
                      setFinanceCalcVehicle(selectedVehicleDetail);
                      setSelectedVehicleDetail(null);
                    }}
                    className="px-3 py-1.5 bg-white text-[#141414] border border-[#e0e0e0] rounded-full text-xs font-black cursor-pointer"
                  >
                    حاسبة التمويل
                  </button>
                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="p-3 bg-white border-t border-[#e0e0e0] space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDepositVehicle(selectedVehicleDetail);
                      setShowDepositCheckoutModal(true);
                      setDepositSuccess(false);
                      setSelectedVehicleDetail(null);
                    }}
                    className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <CreditCard className="w-4 h-4" strokeWidth={1.75} />
                    <span>حجز فوري بعربون (2,500 ريال)</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedVehicleDetail.id)}
                    className="p-2.5 rounded-full border border-[#e0e0e0] text-[#141414] hover:text-red-600 cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedVehicleDetail.id) ? 'fill-red-600 text-red-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setTestDriveModalVehicle(formatVehicleTitle(selectedVehicleDetail));
                    setSelectedVehicleDetail(null);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>طلب تجربة قيادة مجانية</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* B. In-App Test Drive Wizard (Synced with AdminDataContext) */}
      {testDriveModalVehicle && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-3`}>
          <div className="w-full bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-4 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Car className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">حجز تجربة قيادة سريعة</h3>
                  <span className="text-[10px] text-red-600 font-bold">{testDriveModalVehicle}</span>
                </div>
              </div>
              <button onClick={() => { setTestDriveModalVehicle(null); setTestDriveSuccess(false); }} className="p-1 text-[#707070] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {testDriveSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h4 className="text-base font-black text-[#141414]">تم تأكيد طلب تجربة القيادة!</h4>
                <p className="text-xs text-[#707070] max-w-xs mx-auto">
                  تم تسجيل طلبك مباشرة في نظام الوكالة (ERP) وإرسال تفاصيل الموعد إلى جوالك.
                </p>
                <button
                  onClick={() => { setTestDriveModalVehicle(null); setTestDriveSuccess(false); }}
                  className="px-6 py-2 rounded-full bg-[#141414] text-white text-xs font-bold cursor-pointer"
                >
                  العودة للرئيسية
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    value={testDriveForm.name}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="مثال: عبد الرحمن محمد"
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    value={testDriveForm.phone}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">صالة العرض المفضلة</label>
                  <select 
                    value={testDriveForm.city}
                    onChange={(e) => setTestDriveForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  >
                    {liveShowrooms && liveShowrooms.length > 0 ? (
                      liveShowrooms.map(s => (
                        <option key={s.id} value={`${s.city} - ${s.name}`}>{s.city} - {s.name}</option>
                      ))
                    ) : (
                      <>
                        <option>الرياض - المعرض الرئيسي (طريق خريص)</option>
                        <option>جدة - صالة طريق الملك عبد العزيز</option>
                        <option>الدمام - صالة طريق الظهران</option>
                        <option>مكة المكرمة - صالة الكعكية</option>
                      </>
                    )}
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!testDriveForm.phone.trim()) {
                      showAppToast('يرجى إدخال رقم الجوال', 'لتأكيد موعد تجربة القيادة عبر الرسائل القصيرة', 'warning');
                      return;
                    }
                    const matchedCar = allVehicles.find(v => testDriveModalVehicle.includes(v.nameAr));
                    addTestDrive({
                      fullName: testDriveForm.name.trim() || 'ضيف تطبيق سولينا',
                      phone: testDriveForm.phone.trim(),
                      city: testDriveForm.city.split(' - ')[0] || 'الرياض',
                      preferredShowroom: testDriveForm.city,
                      modelId: matchedCar?.id || 'camry-2026',
                      modelName: testDriveModalVehicle,
                      preferredDate: testDriveForm.date,
                      preferredTimeSlot: testDriveForm.time,
                      notes: 'تم الحجز عبر تطبيق الهاتف الذكي'
                    });
                    setTestDriveSuccess(true);
                    showAppToast('تم تسجيل حجز تجربة القيادة', `${testDriveModalVehicle} — ${testDriveForm.city}`, 'success');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-black cursor-pointer"
                >
                  تأكيد حجز التجربة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* C. In-App Service Booking Wizard (Synced with AdminDataContext) */}
      {serviceBookingOpen && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-3`}>
          <div className="w-full bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-4 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Wrench className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">حجز موعد صيانة سولينا الفورية</h3>
                  <span className="text-[10px] text-[#707070]">خدمة سريعة خلال 45 دقيقة ومعتمدة في الـ ERP</span>
                </div>
              </div>
              <button onClick={() => { setServiceBookingOpen(false); setServiceSuccess(false); }} className="p-1 text-[#707070] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {serviceSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h4 className="text-base font-black text-[#141414]">تم تأكيد موعد الصيانة بنجاح!</h4>
                <p className="text-xs text-[#707070]">رقم الحجز: <strong className="text-red-600 font-mono">{lastServiceBookingRef}</strong></p>
                <button onClick={() => { setServiceBookingOpen(false); setServiceSuccess(false); }} className="px-5 py-2 bg-[#141414] text-white text-xs font-bold rounded-full cursor-pointer">
                  إغلاق
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">السيارة</label>
                  <select 
                    value={serviceForm.car}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, car: e.target.value }))}
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                  >
                    {userCars.map((c: any) => (
                      <option key={c.id} value={c.model}>{c.model} ({c.plate})</option>
                    ))}
                    <option>جيتور داشينج 2026</option>
                    <option>بي واي دي سونغ بلس 2026</option>
                    <option>هيونداي أزرق 2026</option>
                    <option>سولينا كراون 2026</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">نوع الخدمة</label>
                  <select 
                    value={serviceForm.type}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                  >
                    <option>صيانة دورية سريعة 10,000 كم (45 دقيقة)</option>
                    <option>صيانة شاملة 20,000 كم</option>
                    <option>فحص الفرامل والمكيف والبطارية الهجينة</option>
                    <option>تغيير زيوت وفلاتر أصلية</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">تاريخ الموعد المفضل</label>
                  <input
                    type="date"
                    value={serviceForm.date}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                  />
                </div>
                <button
                  onClick={() => {
                    const ref = `SOL-SRV-${Math.floor(1000 + Math.random() * 9000)}`;
                    setLastServiceBookingRef(ref);
                    addServiceAppointment({
                      fullName: serviceForm.name || 'ضيف تطبيق سولينا',
                      phone: serviceForm.phone || '0501234567',
                      city: 'الرياض',
                      showroom: serviceForm.city,
                      vehicleModel: serviceForm.car,
                      plateNumber: serviceForm.plate || 'س ل ن 2026',
                      currentMileage: 9500,
                      packageMileage: serviceForm.type.includes('20,000') ? 20000 : 10000,
                      serviceType: serviceForm.type,
                      preferredDate: serviceForm.date,
                      preferredTime: '10:30 ص',
                      estimatedCost: serviceForm.type.includes('20,000') ? 980 : 540
                    });
                    setServiceSuccess(true);
                    showAppToast('تم حجز موعد الصيانة بنجاح', `رقم الموعد: ${ref}`, 'success');
                  }}
                  className="w-full py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-black cursor-pointer"
                >
                  تأكيد موعد الصيانة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* D. In-App Mini Finance Calculator (Synced with AdminDataContext) */}
      {financeCalcVehicle && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-3`}>
          <div className="w-full bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl space-y-3.5 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Calculator className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">حاسبة التمويل والأقساط 2026</h3>
                  <span className="text-[10px] text-red-600 font-bold">{formatVehicleTitle(financeCalcVehicle)}</span>
                </div>
              </div>
              <button onClick={() => setFinanceCalcVehicle(null)} className="p-1 text-[#707070] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
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
                  className="w-full accent-[#141414]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-bold">
                  <span>مدة التمويل ({loanYears} سنوات)</span>
                  <span className="text-[#707070]">{loanYears * 12} شهر</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-[#141414]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={financeApplicantName}
                  onChange={(e) => setFinanceApplicantName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                />
                <input
                  type="tel"
                  value={financeApplicantPhone}
                  onChange={(e) => setFinanceApplicantPhone(e.target.value)}
                  placeholder="رقم الجوال 05XXXX"
                  className="p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                />
              </div>

              {/* Calculated Result Box */}
              <div className="p-3.5 bg-[#141414] rounded-2xl text-white text-center space-y-1">
                <span className="text-[10px] text-[#adadad]">القسط الشهري التقديري (شامل التأمين)</span>
                <div className="text-xl font-black text-white">
                  {Math.round(((financeCalcVehicle.priceStartingFrom * (1 - downPaymentPercent / 100)) * 1.15) / (loanYears * 12)).toLocaleString('ar-SA')} ريال / شهر
                </div>
                <span className="text-[9px] text-[#adadad] block">بدون رسوم إدارية بمناسبة عروض 2026</span>
              </div>

              <button
                onClick={() => {
                  const basePrice = financeCalcVehicle.priceStartingFrom;
                  const vatAmount = Math.round(basePrice * 0.15);
                  const downPaymentAmount = Math.round((basePrice * downPaymentPercent) / 100);
                  const monthlyInstallment = Math.round(((basePrice * (1 - downPaymentPercent / 100)) * 1.15) / (loanYears * 12));
                  const qNum = addQuotation({
                    fullName: financeApplicantName.trim() || 'ضيف تطبيق سولينا',
                    phone: financeApplicantPhone.trim() || '0501234567',
                    city: 'الرياض',
                    vehicleId: financeCalcVehicle.id,
                    vehicleName: formatVehicleTitle(financeCalcVehicle),
                    gradeName: financeCalcVehicle.grades?.[0]?.name || 'القياسية',
                    vehiclePrice: basePrice,
                    vatAmount,
                    totalWithVat: basePrice + vatAmount,
                    financeType: 'lease',
                    downPaymentPercent,
                    downPaymentAmount,
                    durationMonths: loanYears * 12,
                    monthlyInstallment,
                    bankName: 'تمويل سولينا المعتمد',
                    status: 'sent'
                  });
                  showAppToast('تم إصدار عرض السعر والتمويل بنجاح', `رقم عرض السعر: ${qNum}`, 'success');
                  setFinanceCalcVehicle(null);
                }}
                className="w-full py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black cursor-pointer"
              >
                تقديم طلب تمويل فوري وإصدار عرض سعر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E. Notifications Center Dropdown Sheet */}
      {showNotifications && (
        <div className={`${modalOverlayPos} inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-3 animate-in fade-in duration-200`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl space-y-3 text-start mt-12 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                <h3 className="text-xs font-black text-[#141414]">مركز الإشعارات والتنبيهات</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={markAllNotificationsRead} className="text-[10px] font-bold text-[#141414] hover:underline cursor-pointer">
                  قراءة الكل
                </button>
                <button onClick={() => setShowNotifications(false)} className="p-1 text-[#707070] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#f0f0f0] max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`py-2.5 space-y-1 ${n.unread ? 'bg-[#f3f3f3] p-2 rounded-xl' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-[#e0e0e0] rounded-full text-[#141414]">{n.tag}</span>
                    <span className="text-[9px] text-[#707070]">{n.time}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#141414]">{n.title}</h5>
                  <p className="text-[10px] text-[#707070] font-light leading-snug">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* F. Side Drawer Menu */}
      {showSideMenu && (
        <div className={`${modalOverlayPos} inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-stretch justify-start animate-in fade-in duration-200`}>
          <div className="w-64 bg-white h-full p-5 shadow-2xl flex flex-col justify-between text-start font-arabic">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
                <img src="/solina-logo.png" alt="سولينا" className="h-7 w-auto" />
                <button onClick={() => setShowSideMenu(false)} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-1 text-xs font-bold text-[#141414]">
                <button onClick={() => { setActiveTab('home'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-[#f3f3f3] flex items-center gap-2.5 cursor-pointer">
                  <Home className="w-4 h-4" strokeWidth={1.75} /> <span>الرئيسية</span>
                </button>
                <button onClick={() => { setActiveTab('offers'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-[#f3f3f3] flex items-center gap-2.5 cursor-pointer">
                  <Tag className="w-4 h-4" strokeWidth={1.75} /> <span>أحدث العروض</span>
                </button>
                <button onClick={() => { setActiveTab('garage'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-[#f3f3f3] flex items-center gap-2.5 cursor-pointer">
                  <Car className="w-4 h-4" strokeWidth={1.75} /> <span>مرآبي وسياراتي ({userCars.length})</span>
                </button>
                <button onClick={() => { setServiceBookingOpen(true); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-[#f3f3f3] flex items-center gap-2.5 cursor-pointer">
                  <Wrench className="w-4 h-4" strokeWidth={1.75} /> <span>حجز موعد صيانة</span>
                </button>
                <button onClick={() => { setTestDriveModalVehicle('جيتور T2 الدفع الرباعي 2026'); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl hover:bg-[#f3f3f3] flex items-center gap-2.5 cursor-pointer">
                  <Calendar className="w-4 h-4" strokeWidth={1.75} /> <span>طلب تجربة قيادة</span>
                </button>
                <button onClick={() => { setIsAssistantOpen(true); setShowSideMenu(false); }} className="w-full p-2.5 rounded-xl bg-[#141414] text-white font-bold flex items-center gap-2.5 cursor-pointer">
                  <Headphones className="w-4 h-4" strokeWidth={1.75} /> <span>مساعد سولينا الذكي 24/7</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#f0f0f0] text-[10px] text-[#707070] text-center">
              تطبيق سولينا للسيارات 2026
            </div>
          </div>
        </div>
      )}

      {/* G. Side-by-Side Direct Comparison Modal */}
      {showComparisonModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl space-y-3 text-start font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                <h3 className="text-xs font-black text-[#141414]">مقارنة المواصفات المباشرة</h3>
              </div>
              <button onClick={() => setShowComparisonModal(false)} className="p-1 text-[#707070] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              {comparisonList.slice(0, 2).map((carId) => {
                const carObj = allVehicles.find(v => v.id === carId);
                if (!carObj) return null;
                return (
                  <div key={carId} className="p-2.5 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] space-y-2">
                    <img src={carObj.cardImage || carObj.heroImage} alt={carObj.nameAr} className="h-14 object-contain mx-auto rounded-lg" />
                    <h5 className="text-[11px] font-black text-[#141414] line-clamp-1">{formatVehicleTitle(carObj)}</h5>
                    <div className="text-xs font-black text-red-600">{carObj.priceStartingFrom.toLocaleString('ar-SA')} ريال</div>
                    <div className="text-[10px] space-y-1 text-[#141414] border-t border-[#e0e0e0] pt-1.5">
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-[#707070]" strokeWidth={1.75} />
                        <span>{carObj.horsepower || '225 حصان'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Fuel className="w-3 h-3 text-[#707070]" strokeWidth={1.75} />
                        <span>{carObj.fuelEconomy || '24.5 كم/لتر'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3 text-red-600" strokeWidth={1.75} />
                        <span>{carObj.brand === 'jetour' ? 'ضمان مليون كم' : 'ضمان 10 سنوات'}</span>
                      </div>
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
              className="w-full py-2 bg-[#141414] text-white text-xs font-bold rounded-full cursor-pointer"
            >
              إفراغ المقارنة
            </button>
          </div>
        </div>
      )}

      {/* H. VIP QR Code Modal */}
      {showVipQrModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h4 className="text-sm font-black text-[#141414]">بطاقة عضوية VIP الرقمية</h4>
            <div className="p-4 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] inline-block">
              <QrCode className="w-32 h-32 text-[#141414] mx-auto" strokeWidth={1.5} />
            </div>
            <p className="text-[10px] text-[#707070]">امسح الرمز في صالات العرض ومراكز الصيانة للحصول على خدمات VIP الفورية.</p>
            <button onClick={() => setShowVipQrModal(false)} className="w-full py-2 bg-[#141414] text-white text-xs font-bold rounded-full cursor-pointer">
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* I. Install App (iOS / Android) Guided Modal */}
      {showInstallAppModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-4 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <img src="/solina-logo.png" alt="سولينا" className="h-6 w-auto" />
                <h4 className="text-xs font-black text-[#141414]">تثبيت تطبيق سولينا</h4>
              </div>
              <button onClick={() => setShowInstallAppModal(false)} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#f3f3f3] rounded-full text-xs font-bold text-center">
              <button
                onClick={() => setInstallPlatform('ios')}
                className={`py-2 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  installPlatform === 'ios' ? 'bg-white text-[#141414]' : 'text-[#707070]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>أجهزة آيفون (iOS)</span>
              </button>
              <button
                onClick={() => setInstallPlatform('android')}
                className={`py-2 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  installPlatform === 'android' ? 'bg-white text-[#141414]' : 'text-[#707070]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>أجهزة أندرويد (Android)</span>
              </button>
            </div>

            {/* Guided Steps Body */}
            {installPlatform === 'ios' ? (
              <div className="space-y-2.5 text-xs text-[#141414] bg-[#f3f3f3] p-3.5 rounded-2xl border border-[#e0e0e0]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                  <p>اضغط على زر <strong>المشاركة (Share)</strong> في أسفل متصفح Safari.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                  <p>مرر للأسفل واختر <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                  <p>اضغط على <strong>«إضافة» (Add)</strong> في الزاوية العلوية لتثبيت أيقونة التطبيق الرسمية فوراً.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 text-xs text-[#141414] bg-[#f3f3f3] p-3.5 rounded-2xl border border-[#e0e0e0]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                  <p>اضغط على أيقونة <strong>الخيارات</strong> في الزاوية العلوية لمتصفح Chrome.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                  <p>اختر <strong>«تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية» (Install app)</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#141414] text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                  <p>اضغط <strong>«تثبيت»</strong> وسيعمل التطبيق في نافذة مستقلة وبدون متصفح.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowInstallAppModal(false)}
              className="w-full py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-bold rounded-full cursor-pointer"
            >
              فهمت، حسناً
            </button>
          </div>
        </div>
      )}

      {/* J. Smart Digital Key Remote Control Modal */}
      {showSmartKeyModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-[#141414] text-white rounded-[32px] p-5 text-start space-y-4 shadow-2xl border border-white/10 font-arabic relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-white/10 flex items-center justify-center text-white">
                  <Key className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">مفتاح سولينا الذكي الرقمي</h4>
                  <span className="text-[10px] text-[#adadad] font-mono">
                    {smartKeyCar?.plate || 'س ل ن 2026'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowSmartKeyModal(false)} 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Car Display */}
            <div className="text-center relative z-10 space-y-1">
              <span className="text-[10px] text-[#adadad] font-bold block">{smartKeyCar?.model || 'سولينا كامري 2026 هايبرد'}</span>
              <div className="flex items-center justify-center gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isEngineRunning 
                    ? 'bg-red-600/20 text-red-400 border-red-500/40' 
                    : 'bg-white/5 text-[#adadad] border-white/10'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isEngineRunning ? 'bg-red-500' : 'bg-[#707070]'}`} />
                  {isEngineRunning ? 'المحرك يعمل (تشغيل عن بعد)' : 'المحرك متوقف'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-white/10 text-white border-white/15">
                  {isDoorsLocked ? <Lock className="w-3 h-3" strokeWidth={1.75} /> : <Unlock className="w-3 h-3" strokeWidth={1.75} />}
                  <span>{isDoorsLocked ? 'الأبواب مقفلة' : 'الأبواب مفتوحة'}</span>
                </span>
              </div>
            </div>

            {/* Interactive Digital Keypad Controls */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              
              {/* Engine Start/Stop Remote */}
              <button
                onClick={() => {
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(isEngineRunning ? 120 : 60, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(isEngineRunning ? 40 : 180, ctx.currentTime + 0.4);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.4);
                  } catch (e) {}

                  setIsEngineRunning(!isEngineRunning);
                  setKeyActionFeedback(isEngineRunning ? 'تم إيقاف تشغيل المحرك عن بعد' : 'تم تشغيل المحرك بنجاح (وضع الاستعداد)');
                  setTimeout(() => setKeyActionFeedback(''), 3000);
                }}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                  isEngineRunning
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
              >
                <Power className="w-6 h-6" strokeWidth={1.75} />
                <span className="text-xs font-black">
                  {isEngineRunning ? 'إيقاف المحرك' : 'تشغيل المحرك'}
                </span>
              </button>

              {/* Doors Lock / Unlock */}
              <button
                onClick={() => {
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(isDoorsLocked ? 900 : 600, ctx.currentTime);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.15);
                  } catch (e) {}

                  setIsDoorsLocked(!isDoorsLocked);
                  setKeyActionFeedback(isDoorsLocked ? 'تم فتح أقفال جميع الأبواب' : 'تم قفل جميع الأبواب بإحكام');
                  setTimeout(() => setKeyActionFeedback(''), 3000);
                }}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                  !isDoorsLocked
                    ? 'bg-white text-[#141414] border-white'
                    : 'bg-white/10 border-white/20 text-white'
                }`}
              >
                {isDoorsLocked ? <Lock className="w-6 h-6" strokeWidth={1.75} /> : <Unlock className="w-6 h-6" strokeWidth={1.75} />}
                <span className="text-xs font-black">
                  {isDoorsLocked ? 'فتح الأبواب' : 'قفل الأبواب'}
                </span>
              </button>

            </div>

            {/* Smart Climate Pre-Cooling AC Widget */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-white" strokeWidth={1.75} />
                  <span className="text-xs font-bold text-white">التكييف المسبق للمقصورة</span>
                </div>
                <button
                  onClick={() => setIsAcPrecooling(!isAcPrecooling)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                    isAcPrecooling
                      ? 'bg-white text-[#141414] border-white font-black'
                      : 'bg-white/10 text-[#adadad] border-white/10'
                  }`}
                >
                  {isAcPrecooling ? 'يعمل الآن (بارد)' : 'مغلق'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-[10px] text-[#adadad]">درجة الحرارة المطلوبة:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setTargetAcTemp(prev => Math.max(16, +(prev - 0.5).toFixed(1)))}
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-black font-mono text-white">{targetAcTemp}°C</span>
                  <button 
                    onClick={() => setTargetAcTemp(prev => Math.min(28, +(prev + 0.5).toFixed(1)))}
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Controls (Horn / Flash & Trunk) */}
            <div className="grid grid-cols-2 gap-2 relative z-10">
              <button
                onClick={() => {
                  setIsHazardFlashing(true);
                  setKeyActionFeedback('تم تشغيل أضواء التحذير وتنبيه البوق');
                  setTimeout(() => {
                    setIsHazardFlashing(false);
                    setKeyActionFeedback('');
                  }, 2500);
                }}
                className={`py-2 px-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isHazardFlashing ? 'bg-red-600 text-white border-red-500' : 'text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>إطلاق المنبه والأضواء</span>
              </button>

              <button
                onClick={() => {
                  setKeyActionFeedback('تم فتح الصندوق الخلفي آلياً');
                  setTimeout(() => setKeyActionFeedback(''), 3000);
                }}
                className="py-2 px-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Car className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>فتح الصندوق الخلفي</span>
              </button>
            </div>

            {/* Live Feedback Toast */}
            {keyActionFeedback && (
              <div className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold text-center animate-in fade-in">
                {keyActionFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* K. VIN Chassis Camera Scanner Modal */}
      {showVinScannerModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-[#141414] text-white rounded-[32px] p-5 text-start space-y-4 shadow-2xl border border-white/10 font-arabic relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ScanLine className="w-5 h-5 text-white" strokeWidth={1.75} />
                <h4 className="text-xs font-black text-white">ماسح رقم الشاسيه (VIN) الذكي</h4>
              </div>
              <button onClick={() => setShowVinScannerModal(false)} className="p-1 text-[#adadad] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scanner Viewfinder Box */}
            <div className="relative h-44 w-full rounded-2xl bg-black/60 border-2 border-dashed border-white/40 overflow-hidden flex flex-col items-center justify-center p-4">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white" />

              {isScanningVin && (
                <div className="absolute inset-x-0 h-0.5 bg-red-600 animate-bounce" />
              )}

              <Camera className="w-8 h-8 text-white/80 mb-2" strokeWidth={1.5} />
              <span className="text-[11px] text-white font-bold text-center">
                {isScanningVin ? 'جاري قراءة رقم الشاسيه أو الباركود...' : 'وجه الكاميرا نحو رقم هيكل السيارة أو كتيب الصيانة'}
              </span>
              <span className="text-[9px] text-[#adadad] font-mono mt-1">VIN AI SCANNER v2.6</span>
            </div>

            {!scannedVinRecord && (
              <button
                onClick={() => {
                  setIsScanningVin(true);
                  setTimeout(() => {
                    setIsScanningVin(false);
                    setScannedVinRecord({
                      vin: 'LVTDD24B7R0084921',
                      model: 'جيتور T2 الدفع الرباعي 2026 Luxury',
                      year: '2026',
                      engine: '2.0L Turbo TGDI — 254 HP (XWD)',
                      warranty: 'ساري وموثق (10 سنوات / مليون كم)',
                      lastService: 'صيانة 5,000 كم (معتمدة لدى وكالة سولينا)',
                      fahasStatus: 'مجاز بالفحص الدوري السعودي'
                    });
                  }, 1000);
                }}
                className="w-full py-2.5 bg-white hover:bg-[#f3f3f3] text-[#141414] text-xs font-black rounded-full cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ScanLine className="w-4 h-4" strokeWidth={1.75} />
                <span>مسح باركود شاسيه افتراضي</span>
              </button>
            )}

            {scannedVinRecord && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/15 space-y-2 text-xs animate-in slide-in-from-bottom">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-[#adadad]">رقم الهيكل VIN:</span>
                  <span className="font-mono text-white font-bold">{scannedVinRecord.vin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#adadad] text-[11px]">الطراز:</span>
                  <span className="text-white font-bold">{scannedVinRecord.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#adadad] text-[11px]">حالة الضمان:</span>
                  <span className="text-white font-bold">{scannedVinRecord.warranty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#adadad] text-[11px]">الفحص الفني:</span>
                  <span className="text-white font-bold inline-flex items-center gap-1">
                    <Check className="w-3 h-3 text-red-500" strokeWidth={2.5} />
                    <span>{scannedVinRecord.fahasStatus}</span>
                  </span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setServiceForm(prev => ({ ...prev, car: scannedVinRecord.model }));
                      setShowVinScannerModal(false);
                      setServiceBookingOpen(true);
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-full text-center cursor-pointer"
                  >
                    حجز صيانة لهذا الهيكل
                  </button>
                  <button
                    onClick={() => setScannedVinRecord(null)}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-full cursor-pointer"
                  >
                    مسح آخر
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* L. Instant Trade-In Valuation Modal */}
      {showTradeInModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-4 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h4 className="text-xs font-black text-[#141414]">تثمين واستبدال سيارتك المستعملة</h4>
              </div>
              <button onClick={() => { setShowTradeInModal(false); setTradeInEstimatedValue(null); }} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {tradeInEstimatedValue !== null ? (
              <div className="py-4 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[10px] text-[#707070] block">القيمة التقديرية المعتمدة لاستبدال سيارتك:</span>
                  <strong className="text-2xl font-black text-[#141414] font-mono">
                    {tradeInEstimatedValue.toLocaleString('ar-SA')} ريال
                  </strong>
                </div>
                <p className="text-xs text-[#141414] bg-[#f3f3f3] p-2.5 rounded-2xl border border-[#e0e0e0]">
                  كوبون خصم الاستبدال: <strong className="text-red-600 font-mono">TRADE-SOLINA-2026</strong> يتم خصم هذا المبلغ فوراً من الدفعة الأولى لأي سيارة جديدة.
                </p>
                <button
                  onClick={() => {
                    setShowTradeInModal(false);
                    setActiveTab('home');
                    showAppToast('تم تفعيل كوبون الاستبدال TRADE-SOLINA-2026', 'اختر سيارتك الجديدة الآن', 'success');
                  }}
                  className="w-full py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-bold rounded-full cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Car className="w-4 h-4" strokeWidth={1.75} />
                  <span>استبدال وشراء سيارة جديدة الآن</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">الشركة والموديل الحالي</label>
                  <input
                    type="text"
                    value={tradeInForm.model}
                    onChange={(e) => setTradeInForm(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="مثال: تويوتا كامري GLX"
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent focus:border-[#141414] focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#141414] block mb-1">سنة الصنع</label>
                    <select
                      value={tradeInForm.year}
                      onChange={(e) => setTradeInForm(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                    >
                      <option>2025</option>
                      <option>2024</option>
                      <option>2023</option>
                      <option>2022</option>
                      <option>2021</option>
                      <option>2020</option>
                      <option>2019</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#141414] block mb-1">الممشى التقديري</label>
                    <input
                      type="text"
                      value={tradeInForm.mileage}
                      onChange={(e) => setTradeInForm(prev => ({ ...prev, mileage: e.target.value }))}
                      placeholder="مثال: 50,000 كم"
                      className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">حالة الهيكل والمحرك</label>
                  <select
                    value={tradeInForm.condition}
                    onChange={(e) => setTradeInForm(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs"
                  >
                    <option>ممتازة - صيانة وكالة منتظمة وبدون حوادث</option>
                    <option>جيدة جداً - خدوش سطحية بسيطة</option>
                    <option>جيدة - رش تجميلي</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    const baseVal = tradeInForm.year === '2025' ? 104000 : tradeInForm.year === '2024' ? 95000 : tradeInForm.year === '2023' ? 82000 : 68000;
                    setTradeInEstimatedValue(baseVal);
                  }}
                  className="w-full py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-black rounded-full cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" strokeWidth={1.75} />
                  <span>حساب قيمة التثمين الفورية</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* M. Deposit & Reservation Checkout Modal (Synced with AdminDataContext & ZATCA) */}
      {showDepositCheckoutModal && depositVehicle && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-3.5 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <CreditCard className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#141414]">حجز السيارة وتثبيت العربون</h4>
                  <span className="text-[10px] text-[#707070] font-bold">عربون مسترد 100% وموثق بفاتورة ZATCA</span>
                </div>
              </div>
              <button onClick={() => { setShowDepositCheckoutModal(false); setDepositSuccess(false); }} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {depositSuccess ? (
              <div className="py-3 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-base font-black text-[#141414]">تم تأكيد حجز السيارة بنجاح!</h4>
                  <span className="text-xs text-[#707070] block">رقم سند القبض والفاتورة الضريبية:</span>
                  <strong className="text-red-600 font-mono text-sm">{depositReference}</strong>
                </div>
                <div className="p-3 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] text-xs text-start space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#707070]">السيارة المحجوزة:</span>
                    <strong className="text-[#141414]">{formatVehicleTitle(depositVehicle)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707070]">مبلغ العربون المدفوع:</span>
                    <strong className="text-[#141414]">2,500 ريال سعودي</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707070]">طريقة الدفع:</span>
                    <strong className="text-[#141414]">{paymentMethod.toUpperCase()}</strong>
                  </div>
                </div>
                <button
                  onClick={() => {
                    showAppToast(`تم حفظ سند القبض ${depositReference}`, 'وتم تسجيل الفاتورة الضريبية في نظام ZATCA', 'success');
                    setShowDepositCheckoutModal(false);
                    setDepositSuccess(false);
                  }}
                  className="w-full py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  حفظ سند القبض الإلكتروني وإغلاق
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {/* Vehicle Summary */}
                <div className="p-2.5 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] flex items-center gap-3">
                  <img src={depositVehicle.cardImage || depositVehicle.heroImage} alt={depositVehicle.nameAr} className="h-12 w-auto object-contain rounded-lg" />
                  <div>
                    <h5 className="text-xs font-black text-[#141414]">{formatVehicleTitle(depositVehicle)}</h5>
                    <span className="text-[10px] text-[#707070]">السعر الإجمالي: {depositVehicle.priceStartingFrom.toLocaleString('ar-SA')} ريال</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={depositCustomerName}
                    onChange={(e) => setDepositCustomerName(e.target.value)}
                    placeholder="اسم المشتري"
                    className="p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={depositCustomerPhone}
                    onChange={(e) => setDepositCustomerPhone(e.target.value)}
                    placeholder="رقم الجوال"
                    className="p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                </div>

                {/* Amount Due */}
                <div className="p-3 bg-[#141414] text-white rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#adadad]">عربون الحجز الفوري المسترد:</span>
                  <strong className="text-base font-black text-white font-mono">2,500 ريال</strong>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1.5">اختر وسيلة الدفع المعتمدة:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'applepay', name: 'Apple Pay', badge: 'دفع بلمسة واحدة' },
                      { id: 'mada', name: 'بطاقة مدى Mada', badge: 'دفع محلي مباشر' },
                      { id: 'visa', name: 'Visa / Mastercard', badge: 'بطاقات ائتمانية' },
                      { id: 'tabby', name: 'Tabby تابي', badge: 'تقسيط 4 دفعات 0%' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`p-2.5 rounded-2xl border text-start transition-all cursor-pointer ${
                          paymentMethod === p.id
                            ? 'bg-[#f3f3f3] border-[#141414] ring-1 ring-[#141414]'
                            : 'bg-white border-[#e0e0e0] hover:bg-[#f3f3f3]'
                        }`}
                      >
                        <strong className="text-xs font-black text-[#141414] block">{p.name}</strong>
                        <span className="text-[9px] text-[#707070] font-light">{p.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const inv = addZatcaInvoice({
                      customerName: depositCustomerName.trim() || 'ضيف تطبيق سولينا',
                      customerPhone: depositCustomerPhone.trim() || '0501234567',
                      vehicleModel: `عربون حجز ${formatVehicleTitle(depositVehicle)}`,
                      vinNumber: `SOL-VIN-${Math.floor(100000 + Math.random() * 900000)}`,
                      totalAmount: 2500,
                      type: 'simplified_invoice',
                      status: 'cleared'
                    });
                    const ref = inv?.invoiceNumber || `SOL-DEP-${Math.floor(100000 + Math.random() * 900000)}`;
                    setDepositReference(ref);
                    setDepositSuccess(true);
                    showAppToast('تم سداد العربون وتوثيق الفاتورة', `رقم السند: ${ref}`, 'success');
                  }}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-full cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>تأكيد ودفع 2,500 ريال عبر {paymentMethod.toUpperCase()}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* N. Add New Car to Garage Modal */}
      {showAddCarModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-4 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] text-[#141414] flex items-center justify-center border border-[#e0e0e0]">
                  <Car className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h4 className="text-xs font-black text-[#141414]">إضافة سيارة جديدة إلى مرآبي</h4>
              </div>
              <button onClick={() => setShowAddCarModal(false)} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#141414] block mb-1">اختر طراز السيارة من أسطول 2026</label>
                <select
                  value={newGarageCarForm.vehicleId}
                  onChange={(e) => setNewGarageCarForm(prev => ({ ...prev, vehicleId: e.target.value }))}
                  className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                >
                  {allVehicles.map((v) => (
                    <option key={v.id} value={v.id}>{formatVehicleTitle(v)}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">رقم اللوحة</label>
                  <input
                    type="text"
                    value={newGarageCarForm.plate}
                    onChange={(e) => setNewGarageCarForm(prev => ({ ...prev, plate: e.target.value }))}
                    placeholder="مثال: أ ب ج 2026"
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#141414] block mb-1">الممشى الحالي (كم)</label>
                  <input
                    type="number"
                    value={newGarageCarForm.mileage}
                    onChange={(e) => setNewGarageCarForm(prev => ({ ...prev, mileage: e.target.value }))}
                    placeholder="1200"
                    className="w-full p-2.5 rounded-2xl bg-[#f0f0f0] border border-transparent text-xs focus:border-[#141414] focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  const chosen = allVehicles.find(v => v.id === newGarageCarForm.vehicleId) || allVehicles[0];
                  const km = Math.max(0, Number(newGarageCarForm.mileage) || 1200);
                  const nextKm = Math.ceil((km + 1000) / 10000) * 10000;
                  const newCar = {
                    id: `car-${Date.now()}`,
                    model: formatVehicleTitle(chosen),
                    plate: newGarageCarForm.plate.trim() || 'س ل ن 2026',
                    vin: `SOL2026${Math.floor(10000000 + Math.random() * 90000000)}`,
                    mileage: km,
                    nextServiceKm: nextKm,
                    nextServiceDate: '15 ديسمبر 2026',
                    warrantyExpiry: chosen.brand === 'jetour' ? '2036 (ضمان 10 سنوات / مليون كم)' : '2036 (ساري 10 سنوات / 300 ألف كم)',
                    image: chosen.cardImage || chosen.heroImage
                  };
                  setUserCars((prev: any[]) => [newCar, ...prev]);
                  setShowAddCarModal(false);
                  showAppToast('تمت إضافة السيارة إلى مرآبك', `${newCar.model} — لوحة (${newCar.plate})`, 'success');
                }}
                className="w-full py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-black rounded-full cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" strokeWidth={2} />
                <span>حفظ السيارة وتفعيل المفتاح الذكي</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* O. Digital Warranty Certificate Modal */}
      {warrantyModalCar && (
        <div className={`${modalOverlayPos} inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-[#141414] text-white rounded-3xl p-5 text-start space-y-4 shadow-2xl border border-white/15 font-arabic">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" strokeWidth={1.75} />
                <div>
                  <h4 className="text-xs font-black text-white">شهادة الضمان الرقمية المعتمدة</h4>
                  <span className="text-[9px] text-[#adadad]">موثقة لدى شركة سولينا موتورز ووزارة التجارة</span>
                </div>
              </div>
              <button onClick={() => setWarrantyModalCar(null)} className="p-1 text-[#adadad] hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#adadad] text-[10px]">الطراز المضمون:</span>
                <strong className="text-white font-black">{warrantyModalCar.model}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#adadad] text-[10px]">رقم اللوحة:</span>
                <strong className="text-white font-bold">{warrantyModalCar.plate}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#adadad] text-[10px]">رقم الهيكل (VIN):</span>
                <strong className="text-white font-mono text-[11px]">{warrantyModalCar.vin || 'JTNB11HK9P3012948'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#adadad] text-[10px]">تغطية الضمان:</span>
                <strong className="text-white font-bold">{warrantyModalCar.warrantyExpiry || '10 سنوات / 300 ألف كم'}</strong>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] text-[#adadad] space-y-1">
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-white shrink-0" strokeWidth={2} />
                    <span>يشمل المحرك وناقل الحركة والبطارية الهجينة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-white shrink-0" strokeWidth={2} />
                    <span>مساعدة مجانية على الطريق 24/7 في جميع مناطق المملكة</span>
                  </div>
                </div>
                <QrCode className="w-10 h-10 text-white shrink-0" strokeWidth={1.5} />
              </div>
            </div>

            <button
              onClick={() => {
                setWarrantyModalCar(null);
                showAppToast('تم حفظ شهادة الضمان الرقمية', 'متاحة للعرض في جميع مراكز صيانة سولينا', 'success');
              }}
              className="w-full py-2.5 bg-white hover:bg-[#f3f3f3] text-[#141414] text-xs font-black rounded-full cursor-pointer"
            >
              حفظ الشهادة في المحفظة الرقمية
            </button>
          </div>
        </div>
      )}

      {/* P. 24/7 Roadside Assistance SOS Modal */}
      {showRoadsideSosModal && (
        <div className={`${modalOverlayPos} inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-in fade-in`}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 text-start space-y-4 shadow-2xl font-arabic">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[30%] bg-red-600 text-white flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#141414]">طوارئ المساعدة على الطريق 24/7</h4>
                  <span className="text-[10px] text-red-600 font-bold">استجابة سريعة خلال 25 دقيقة — 8002444400</span>
                </div>
              </div>
              <button onClick={() => setShowRoadsideSosModal(false)} className="p-1 text-[#707070] hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sosDispatched ? (
              <div className="py-4 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h4 className="text-sm font-black text-[#141414]">تم توجيه وحدة الإنقاذ إلى موقعك!</h4>
                <p className="text-xs text-[#707070]">
                  فني سولينا المتنقل في طريقه إليك الآن (الوقت المتوقع للوصول: <strong className="text-red-600">18 دقيقة</strong>).
                </p>
                <button
                  onClick={() => setShowRoadsideSosModal(false)}
                  className="w-full py-2.5 bg-[#141414] text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  حسناً، متابعة
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" strokeWidth={1.75} />
                    <div>
                      <span className="text-[10px] text-[#707070] block">موقعك الحالي (GPS مفعل):</span>
                      <strong className="text-[#141414] text-xs">الرياض — طريق الملك فهد الفرعي</strong>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#141414] text-white text-[9px] font-bold rounded-full">متصل</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'طلب سطحة نقل فورية', desc: 'نقل لأقرب مركز صيانة', icon: Car },
                    { label: 'شحن أو استبدال البطارية', desc: 'خدمة متنقلة في موقعك', icon: Battery },
                    { label: 'إصلاح وتبديل الإطارات', desc: 'إطار احتياطي وضغط هواء', icon: Wrench },
                    { label: 'تزويد وقود / شحن EV', desc: 'إنقاذ طارئ على الطريق', icon: Fuel }
                  ].map((item, idx) => {
                    const SosIcon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSosDispatched(true);
                          showAppToast('تم إرسال بلاغ الطوارئ SOS', item.label, 'warning');
                        }}
                        className="p-2.5 rounded-2xl border border-[#e0e0e0] hover:border-[#141414] hover:bg-[#f3f3f3] text-start transition-all cursor-pointer space-y-1"
                      >
                        <SosIcon className="w-4 h-4 text-[#141414]" strokeWidth={1.75} />
                        <strong className="text-[11px] font-black text-[#141414] block">{item.label}</strong>
                        <span className="text-[9px] text-[#707070] block">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>

                <a
                  href="tel:8002444400"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-full flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" strokeWidth={1.75} />
                  <span>اتصال مباشر بطوارئ سولينا (8002444400)</span>
                </a>
              </div>
            )}
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

      {/* Official Vehicle Catalog & Interior Cabin Modal */}
      <VehicleCatalogModal
        vehicle={catalogModalVehicle}
        isOpen={!!catalogModalVehicle}
        onClose={() => setCatalogModalVehicle(null)}
        onOpenTestDrive={(name) => {
          setCatalogModalVehicle(null);
          setTestDriveModalVehicle(name || catalogModalVehicle?.nameAr || 'سولينا 2026');
        }}
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
