import React, { useState, useRef } from 'react';
import { 
  Car, 
  Fuel, 
  Gauge, 
  Users, 
  SlidersHorizontal, 
  Check, 
  Plus, 
  Zap, 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Layers, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Flame, 
  FileText, 
  Search, 
  ArrowUpDown,
  Heart,
  Grid,
  List,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { type Vehicle } from '../data/toyotaData';

interface ExploreVehiclesProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  onOpenTestDrive: (modelName?: string) => void;
  onToggleCompare: (vehicle: Vehicle) => void;
  onOpenQuotation?: (vehicle: Vehicle) => void;
  comparedVehicleIds: string[];
}

export const ExploreVehicles: React.FC<ExploreVehiclesProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectVehicle,
  onOpenTestDrive,
  onToggleCompare,
  onOpenQuotation,
  comparedVehicleIds
}) => {
  const { language, t, formatPrice, isRTL } = useLanguage();
  const { vehicles } = useAdminData();
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(650000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'power'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<{ [vehicleId: string]: string }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('grid');

  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: language === 'ar' ? 'كافة المركبات' : 'All Vehicles', icon: null },
    { id: 'sedan', label: language === 'ar' ? 'سيدان' : 'Sedan', icon: null },
    { id: 'suv', label: language === 'ar' ? 'دفع رباعي (SUV)' : 'SUV & 4WD', icon: null },
    { id: 'crossover', label: language === 'ar' ? 'كروس أوفر' : 'Crossover', icon: null },
    { id: 'family', label: language === 'ar' ? 'عائلية 7 ركاب' : '7-Seater Family', icon: null },
    { id: 'commercial', label: language === 'ar' ? 'تجارية وبيك أب' : 'Commercial & Pickup', icon: null },
    { id: 'hybrid', label: language === 'ar' ? 'هجينة وكهربائية' : 'Hybrid & EV', icon: Zap },
    { id: 'gr', label: language === 'ar' ? 'أداء رياضي GR' : 'GR Performance', icon: Flame },
  ];

  const toggleFavorite = (vehicleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(vehicleId) ? prev.filter(id => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Category match
    if (selectedCategory === 'hybrid') {
      if (!vehicle.isHybrid && vehicle.powertrain !== 'هايبرد') return false;
    } else if (selectedCategory === 'gr') {
      if (!vehicle.isGR && vehicle.category !== 'gr') return false;
    } else if (selectedCategory === 'crossover') {
      if (!['corolla-cross', 'urban-cruiser', 'raize', 'rav4'].includes(vehicle.id)) return false;
    } else if (selectedCategory === 'family') {
      if (vehicle.seats < 7) return false;
    } else if (selectedCategory !== 'all' && vehicle.category !== selectedCategory) {
      return false;
    }

    // Powertrain match
    if (selectedPowertrain !== 'all' && vehicle.powertrain !== selectedPowertrain) {
      return false;
    }

    // Seats match
    if (selectedSeats === '4' && vehicle.seats !== 4) return false;
    if (selectedSeats === '5' && vehicle.seats !== 5) return false;
    if (selectedSeats === '7' && vehicle.seats < 7) return false;

    // Price match
    if (vehicle.priceStartingFrom > maxPrice) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (
        vehicle.nameAr.toLowerCase().includes(q) ||
        vehicle.nameEn.toLowerCase().includes(q) ||
        vehicle.bodyTypeAr.toLowerCase().includes(q) ||
        vehicle.bodyTypeEn.toLowerCase().includes(q)
      );
      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceStartingFrom - b.priceStartingFrom;
    if (sortBy === 'price-desc') return b.priceStartingFrom - a.priceStartingFrom;
    if (sortBy === 'power') return parseInt(b.horsepower) - parseInt(a.horsepower);
    return 0;
  });

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      const factor = isRTL ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1);
      sliderRef.current.scrollBy({ left: scrollAmount * factor, behavior: 'smooth' });
    }
  };

  return (
    <section id="explore-vehicles" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ar' ? 'تشكيلة سيارات 2026 المعتمدة' : 'Official 2026 Fleet Lineup'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'استكشف جميع المركبات' : 'Explore All Vehicles'}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {language === 'ar' 
                ? 'تصفح أسطول سيارات الجبراني 2026، مع إمكانية مقارنة المواصفات، طلب عروض الأسعار، وحجز تجارب القيادة.' 
                : 'Discover the full 2026 model range with comprehensive specs, instant quotes, and test drive bookings.'}
            </p>
          </div>

          {/* Quick Search & View Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن طراز محدد...' : 'Search specific model...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-900 text-xs rounded-2xl py-3 pr-10 pl-4 shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* View Mode Switcher (Grid / Slider) */}
            <div className="flex items-center bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title={language === 'ar' ? 'عرض الشبكة' : 'Grid View'}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'slider' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title={language === 'ar' ? 'عرض السلايدر الأفقي' : 'Slider View'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 border border-gray-200/70'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Vehicles Container (Grid or Slider) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                language={language}
                formatPrice={formatPrice}
                isRTL={isRTL}
                isCompared={comparedVehicleIds.includes(vehicle.id)}
                isFavorite={favorites.includes(vehicle.id)}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                onSelectVehicle={onSelectVehicle}
                onOpenTestDrive={onOpenTestDrive}
                onToggleCompare={onToggleCompare}
                onOpenQuotation={onOpenQuotation}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Slider View */
          <div className="relative group">
            {/* Prev / Next Navigation Arrows */}
            <button
              onClick={() => scrollSlider('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth"
            >
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="w-[340px] md:w-[380px] flex-shrink-0">
                  <VehicleCard
                    vehicle={vehicle}
                    language={language}
                    formatPrice={formatPrice}
                    isRTL={isRTL}
                    isCompared={comparedVehicleIds.includes(vehicle.id)}
                    isFavorite={favorites.includes(vehicle.id)}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    onSelectVehicle={onSelectVehicle}
                    onOpenTestDrive={onOpenTestDrive}
                    onToggleCompare={onToggleCompare}
                    onOpenQuotation={onOpenQuotation}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredVehicles.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 mb-1">
              {language === 'ar' ? 'لا توجد سيارات مطابقة' : 'No vehicles found'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {language === 'ar' ? 'يرجى تجربة تعديل خيارات التصفية أو البحث عن اسم آخر.' : 'Try adjusting your filters or search terms.'}
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
  language: string;
  formatPrice: (p: number) => string;
  isRTL: boolean;
  isCompared: boolean;
  isFavorite: boolean;
  selectedColors: { [key: string]: string };
  setSelectedColors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onSelectVehicle: (id: string) => void;
  onOpenTestDrive: (name?: string) => void;
  onToggleCompare: (v: Vehicle) => void;
  onOpenQuotation?: (v: Vehicle) => void;
  toggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  language,
  formatPrice,
  isRTL,
  isCompared,
  isFavorite,
  selectedColors,
  setSelectedColors,
  onSelectVehicle,
  onOpenTestDrive,
  onToggleCompare,
  onOpenQuotation,
  toggleFavorite
}) => {
  const activeColor = vehicle.colors.find(c => c.id === selectedColors[vehicle.id]) || vehicle.colors[0];
  const currentImg = activeColor?.image || vehicle.cardImage;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-blue-300 flex flex-col justify-between group">
      <div>
        {/* Top Image Stage */}
        <div className="relative h-56 bg-gradient-to-b from-gray-50/90 to-white p-6 flex items-center justify-center overflow-hidden">
          {/* Brand & Year Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
              2026
            </span>
            {vehicle.isNew && (
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                {language === 'ar' ? 'جديد كلياً' : 'All-New'}
              </span>
            )}
          </div>

          {/* Favorite & Compare Actions Top Left */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => toggleFavorite(vehicle.id, e)}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'bg-white/80 text-gray-400 hover:text-rose-500 border border-gray-200'
              }`}
              title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Powertrain Badge */}
          <span className={`absolute bottom-3 left-4 text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
            vehicle.powertrain === 'هايبرد' ? 'bg-emerald-100 text-emerald-800' :
            vehicle.powertrain === 'ديزل' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
          }`}>
            {vehicle.powertrain}
          </span>

          {/* Cutout Image */}
          <img
            src={currentImg}
            alt={language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
            className="max-h-40 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Info Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 font-display group-hover:text-blue-600 transition-colors">
              {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
            </h3>
            <span className="text-xs text-gray-500 font-medium block mt-0.5">
              {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn} • {vehicle.engineSpec}
            </span>
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-gray-100 text-[11px] text-gray-600 font-mono">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              <span>{vehicle.horsepower}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-emerald-600" />
              <span>{vehicle.fuelEconomy}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span>{vehicle.seats} {language === 'ar' ? 'مقاعد' : 'Seats'}</span>
            </div>
          </div>

          {/* Color Palette Swatches */}
          {vehicle.colors && vehicle.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-medium">
                {language === 'ar' ? 'الألوان:' : 'Colors:'}
              </span>
              <div className="flex items-center gap-1.5">
                {vehicle.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColors({ ...selectedColors, [vehicle.id]: c.id })}
                    title={language === 'ar' ? c.name : c.nameEn}
                    style={{ backgroundColor: c.hex }}
                    className={`w-3.5 h-3.5 rounded-full border border-gray-300 transition-transform ${
                      (selectedColors[vehicle.id] === c.id || (!selectedColors[vehicle.id] && c.id === vehicle.colors[0].id))
                        ? 'scale-125 ring-2 ring-blue-500 shadow-xs'
                        : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Starting Price and Estimated Monthly Installment */}
          <div className="pt-1 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-gray-400 block font-sans">
                {language === 'ar' ? 'السعر النقدي يبدأ من:' : 'Cash Price From:'}
              </span>
              <span className="text-xl font-black text-gray-900 font-mono">
                {formatPrice(vehicle.priceStartingFrom)} <span className="text-xs text-blue-600 font-bold">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
              </span>
            </div>

            <div className="text-end">
              <span className="text-[10px] text-gray-400 block font-sans">
                {language === 'ar' ? 'القسط الشهري:' : 'Est. Monthly:'}
              </span>
              <span className="text-sm font-bold text-blue-600 font-mono">
                {formatPrice(vehicle.monthlyInstallmentStartingFrom)} {language === 'ar' ? 'ر.س/ش' : 'SAR/mo'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
        <button
          onClick={() => onSelectVehicle(vehicle.id)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all cursor-pointer text-center"
        >
          {language === 'ar' ? 'التفاصيل والفئات' : 'View Trims'}
        </button>

        <button
          onClick={() => onOpenTestDrive(vehicle.nameAr)}
          className="px-3 py-2.5 bg-white hover:bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border border-gray-200 transition-colors cursor-pointer"
          title={language === 'ar' ? 'حجز تجربة قيادة' : 'Book test drive'}
        >
          {language === 'ar' ? 'تجربة' : 'Drive'}
        </button>

        <button
          onClick={() => onToggleCompare(vehicle)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
            isCompared 
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
              : 'bg-white text-gray-400 hover:text-blue-600 border-gray-200'
          }`}
          title={isCompared ? (language === 'ar' ? 'إلغاء المقارنة' : 'Remove comparison') : (language === 'ar' ? 'إضافة للمقارنة' : 'Add to compare')}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
