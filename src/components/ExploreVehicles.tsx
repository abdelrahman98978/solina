import React, { useState } from 'react';
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
  Sparkles, 
  Layers, 
  ChevronDown, 
  Flame, 
  FileText, 
  Search, 
  ArrowUpDown,
  Crown,
  ShieldCheck
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
  const { language, t, formatPrice } = useLanguage();
  const { vehicles } = useAdminData();
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'toyota' | 'lexus'>('all');
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(650000);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'power'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<{ [vehicleId: string]: string }>({});

  const categories = [
    { id: 'all', label: t('catAll'), icon: null },
    { id: 'suv', label: t('catSUV'), icon: null },
    { id: 'sedan', label: t('catSedan'), icon: null },
    { id: 'commercial', label: t('catCommercial'), icon: null },
    { id: 'hybrid', label: t('catHybrid'), icon: Zap },
    { id: 'gr', label: language === 'ar' ? 'أداء رياضي وGR' : 'Performance & GR', icon: Flame },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Brand match
    const vBrand = vehicle.brand || 'toyota';
    if (selectedBrand !== 'all' && vBrand !== selectedBrand) return false;

    // Category match
    if (selectedCategory === 'hybrid') {
      if (!vehicle.isHybrid && vehicle.powertrain !== 'هايبرد') return false;
    } else if (selectedCategory === 'gr') {
      if (!vehicle.isGR && vehicle.category !== 'gr') return false;
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

  return (
    <section id="explore-vehicles" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'أسطول جبراني للسيارات 2026 المعتمد' : 'Official Gibrani 2026 Multi-Brand Fleet'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'استكشف أسطول سيارات تويوتا ولكزس الفاخرة' : 'Explore Toyota & Lexus Luxury Lineup'}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {language === 'ar' 
                ? 'مجموعة شاملة من أحدث موديلات 2026، من سيارات الدفع الرباعي الأسطورية إلى السيدان الفاخرة والهايبرد الهجين.' 
                : 'Browse the complete range of 2026 premium models with real-time specs, trims, and official pricing.'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن سيارة (برادو، لكزس LX، كامري)...' : 'Search models (Prado, Lexus, Camry)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 text-xs rounded-2xl py-3 pr-10 pl-4 shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>

        {/* 1. Brand Switcher Tabs (All / Toyota / Lexus) */}
        <div className="flex items-center gap-2.5 mb-6 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              selectedBrand === 'all'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
            }`}
          >
            <Car className="w-4 h-4 text-blue-400" />
            <span>{language === 'ar' ? 'كافة العلامات (الكل)' : 'All Brands'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">{vehicles.length}</span>
          </button>

          <button
            onClick={() => setSelectedBrand('toyota')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              selectedBrand === 'toyota'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
            }`}
          >
            <span className="font-bold font-display">TOYOTA</span>
            <span>{language === 'ar' ? 'تويوتا السعودية' : 'Toyota KSA'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
              {vehicles.filter(v => (v.brand || 'toyota') === 'toyota').length}
            </span>
          </button>

          <button
            onClick={() => setSelectedBrand('lexus')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              selectedBrand === 'lexus'
                ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-[#D4AF37] border border-[#D4AF37]/50 shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
            }`}
          >
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold font-display tracking-wider">LEXUS</span>
            <span>{language === 'ar' ? 'لكزس الفاخرة' : 'Lexus Luxury'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] font-mono">
              {vehicles.filter(v => v.brand === 'lexus').length}
            </span>
          </button>
        </div>

        {/* 2. Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const isLexus = vehicle.brand === 'lexus';
            const activeColor = vehicle.colors.find(c => c.id === selectedColors[vehicle.id]) || vehicle.colors[0];
            const currentImg = activeColor?.image || vehicle.cardImage;
            const isCompared = comparedVehicleIds.includes(vehicle.id);

            return (
              <div
                key={vehicle.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group ${
                  isLexus ? 'border-amber-200/80 hover:border-amber-400' : 'border-gray-200/80 hover:border-blue-300'
                }`}
              >
                <div>
                  {/* Top Image Showcase Stage */}
                  <div className="relative h-56 bg-gradient-to-b from-gray-50/80 to-white p-6 flex items-center justify-center overflow-hidden">
                    {/* Brand Badges */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
                      {isLexus ? (
                        <span className="bg-slate-900 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/30 flex items-center gap-1 shadow-sm">
                          <Crown className="w-3 h-3" />
                          <span>LEXUS</span>
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
                          TOYOTA
                        </span>
                      )}

                      {vehicle.isNew && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {language === 'ar' ? '2026 جديد' : 'New 2026'}
                        </span>
                      )}
                    </div>

                    {/* Powertrain Badge */}
                    <span className={`absolute bottom-3 left-4 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      vehicle.powertrain === 'هايبرد' ? 'bg-emerald-100 text-emerald-800' :
                      vehicle.powertrain === 'ديزل' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {vehicle.powertrain}
                    </span>

                    {/* Vehicle Cutout Image */}
                    <img
                      src={currentImg}
                      alt={language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                      className="max-h-40 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 font-display">
                        {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                      </h3>
                      <span className="text-xs text-gray-500 font-medium block">
                        {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn} • {vehicle.engineSpec}
                      </span>
                    </div>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-[11px] text-gray-600 font-mono">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-blue-600" />
                        <span>{vehicle.horsepower}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{vehicle.fuelEconomy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>{vehicle.seats} {language === 'ar' ? 'مقاعد' : 'Seats'}</span>
                      </div>
                    </div>

                    {/* Color Swatches */}
                    {vehicle.colors && vehicle.colors.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-medium">
                          {language === 'ar' ? 'الألوان المتاحة:' : 'Colors:'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {vehicle.colors.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedColors({ ...selectedColors, [vehicle.id]: c.id })}
                              title={language === 'ar' ? c.name : c.nameEn}
                              style={{ backgroundColor: c.hex }}
                              className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${
                                (selectedColors[vehicle.id] === c.id || (!selectedColors[vehicle.id] && c.id === vehicle.colors[0].id))
                                  ? 'scale-125 ring-2 ring-blue-500 shadow-sm'
                                  : 'hover:scale-110'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price & Monthly */}
                    <div className="pt-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-sans">
                          {language === 'ar' ? 'السعر النقدي يبدأ من:' : 'Starting Cash Price:'}
                        </span>
                        <span className="text-xl font-black text-gray-900 font-mono">
                          {formatPrice(vehicle.priceStartingFrom)} <span className="text-xs text-blue-600 font-bold">ر.س</span>
                        </span>
                      </div>

                      <div className="text-end">
                        <span className="text-[10px] text-gray-400 block font-sans">
                          {language === 'ar' ? 'القسط الشهري التقديري:' : 'Est. Monthly:'}
                        </span>
                        <span className="text-sm font-bold text-blue-600 font-mono">
                          {formatPrice(vehicle.monthlyInstallmentStartingFrom)} ر.س/ش
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
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
                    title="حجز تجربة قيادة"
                  >
                    {language === 'ar' ? 'تجربة' : 'Drive'}
                  </button>

                  <button
                    onClick={() => onToggleCompare(vehicle)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isCompared 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-400 hover:text-blue-600 border-gray-200'
                    }`}
                    title={isCompared ? 'إلغاء المقارنة' : 'إضافة للمقارنة'}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
