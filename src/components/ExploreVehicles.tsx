import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Eye,
  Palette
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { type Vehicle, getBrandMeta } from '../data/toyotaData';
import { VehicleCatalogModal } from './VehicleCatalogModal';

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
  const { language, isRTL } = useLanguage();
  const { vehicles } = useAdminData();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'luxury' | 'sedan' | 'suv' | 'hybrid' | 'commercial'>('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [cardColorIdxMap, setCardColorIdxMap] = useState<Record<string, number>>({});
  const [cardInteriorModeMap, setCardInteriorModeMap] = useState<Record<string, boolean>>({});
  const [catalogModalVehicle, setCatalogModalVehicle] = useState<Vehicle | null>(null);

  // Comprehensive multi-brand luxury fleet categories
  const categories = [
    { id: 'all', label: language === 'ar' ? 'جميع المركبات' : 'All Vehicles' },
    { id: 'luxury', label: language === 'ar' ? 'الفاخرة والرئاسية VIP' : 'Ultra Luxury & VIP' },
    { id: 'sedan', label: language === 'ar' ? 'السيدان' : 'Sedan' },
    { id: 'suv', label: language === 'ar' ? 'الدفع الرباعي والـ SUV' : 'SUVs & Crossovers' },
    { id: 'hybrid', label: language === 'ar' ? 'الهايبرد والكهربائية' : 'Hybrid & EV' },
    { id: 'commercial', label: language === 'ar' ? 'السيارات التجارية' : 'Commercial Vehicles' }
  ];

  const brandPills = [
    { id: 'all', label: language === 'ar' ? 'جميع العلامات' : 'All Brands', count: vehicles.length },
    { id: 'toyota', label: language === 'ar' ? 'سولينا / تويوتا' : 'Solina / Toyota', count: vehicles.filter(v => !v.brand || v.brand === 'toyota').length },
    { id: 'jetour', label: language === 'ar' ? 'جيتور Jetour' : 'Jetour', count: vehicles.filter(v => v.brand === 'jetour').length },
    { id: 'byd', label: language === 'ar' ? 'بي واي دي BYD' : 'BYD', count: vehicles.filter(v => v.brand === 'byd').length },
    { id: 'hyundai', label: language === 'ar' ? 'هيونداي Hyundai' : 'Hyundai', count: vehicles.filter(v => v.brand === 'hyundai').length },
    { id: 'lexus', label: language === 'ar' ? 'لكزس Lexus' : 'Lexus', count: vehicles.filter(v => v.brand === 'lexus').length },
    { id: 'other-luxury', label: language === 'ar' ? 'النخبة الأوروبية والأمريكية' : 'Euro & US Luxury', count: vehicles.filter(v => ['mercedes', 'bmw', 'porsche', 'landrover', 'genesis', 'gmc', 'cadillac', 'audi', 'lucid', 'nissan', 'ford', 'kia', 'honda', 'mazda', 'changan', 'mg'].includes(v.brand || '')).length }
  ];

  const flagshipPriority = [
    'lc300-2026',
    'camry-2026',
    'jetour-t2-2026',
    'byd-han-2026',
    'hyundai-azera-2026',
    'prado-2026',
    'lexus-lx600-2026',
    'rav4-2026',
    'jetour-dashing-2026',
    'byd-seal-2026',
    'hyundai-palisade-2026',
    'crown-2026',
    'jetour-x90-plus-2026',
    'byd-tang-2026',
    'hyundai-santafe-2026',
    'hyundai-sonata-2026',
    'byd-song-plus-2026',
    'jetour-x70-plus-2026',
    'hyundai-tucson-2026',
    'corolla-2026',
    'yaris-2026'
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Brand check
    if (selectedBrandFilter === 'toyota' && vehicle.brand && vehicle.brand !== 'toyota') return false;
    if (selectedBrandFilter === 'jetour' && vehicle.brand !== 'jetour') return false;
    if (selectedBrandFilter === 'byd' && vehicle.brand !== 'byd') return false;
    if (selectedBrandFilter === 'hyundai' && vehicle.brand !== 'hyundai') return false;
    if (selectedBrandFilter === 'lexus' && vehicle.brand !== 'lexus') return false;
    if (selectedBrandFilter === 'other-luxury' && !['mercedes', 'bmw', 'porsche', 'landrover', 'genesis', 'gmc', 'cadillac', 'audi', 'lucid', 'nissan', 'ford', 'kia', 'honda', 'mazda', 'changan', 'mg'].includes(vehicle.brand || '')) return false;

    if (activeTab === 'all') return true;
    if (activeTab === 'luxury') return ['lexus', 'mercedes', 'porsche', 'bmw', 'genesis', 'landrover', 'audi', 'cadillac', 'lucid', 'gmc', 'byd', 'jetour'].includes(vehicle.brand || '') || vehicle.priceStartingFrom >= 180000;
    if (activeTab === 'sedan') return vehicle.category === 'sedan' || vehicle.category === 'gr';
    if (activeTab === 'suv') return ['suv', 'crossover', 'family'].includes(vehicle.category);
    if (activeTab === 'hybrid') return vehicle.category === 'hybrid' || vehicle.isHybrid || vehicle.powertrain === 'هايبرد' || vehicle.powertrain === 'كهربائي';
    if (activeTab === 'commercial') return vehicle.category === 'commercial';
    return true;
  }).sort((a, b) => {
    const idxA = flagshipPriority.indexOf(a.id);
    const idxB = flagshipPriority.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    if (a.category === 'commercial' && b.category !== 'commercial') return 1;
    if (a.category !== 'commercial' && b.category === 'commercial') return -1;
    return 0;
  });

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.abs(scrollLeft) / maxScroll;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 350;
      const factor = isRTL ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1);
      sliderRef.current.scrollBy({ left: scrollAmount * factor, behavior: 'smooth' });
    }
  };

  return (
    <section id="explore-vehicles" className="py-16 bg-white font-arabic">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        
        {/* Solina SA Official Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-10 tracking-tight">
          {language === 'ar' ? 'استكشف جميع المركبات' : 'Explore All Vehicles'}
        </h2>

        {/* Solina SA Official Category Tabs with Active Underline */}
        <div className="flex items-center justify-center gap-8 md:gap-14 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = (activeTab === cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id as any);
                  onSelectCategory(cat.id);
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`pb-4 text-base md:text-xl font-normal transition-all cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'text-black font-bold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#141414]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Multi-Brand Filter Pills (Solina, Jetour, BYD, Hyundai, Lexus, Luxury) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {brandPills.map((b) => {
            const active = selectedBrandFilter === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBrandFilter(b.id);
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  active
                    ? 'bg-[#141414] text-white border-[#141414] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <span>{b.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {b.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Carousel Slider matching Solina SA */}
        <div className="relative group mb-10">
          {/* Left Arrow */}
          <button
            onClick={() => scrollSlider('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#141414] hover:text-white transition-all cursor-pointer hidden md:flex"
            aria-label="Previous Vehicles"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollSlider('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#141414] hover:text-white transition-all cursor-pointer hidden md:flex"
            aria-label="Next Vehicles"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Content */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth items-stretch"
          >
            {filteredVehicles.map((vehicle, cardIdx) => {
              const cleanTitle = vehicle.nameAr.replace(/202[0-9]/g, '').replace(/سولينا/g, '').trim() + ' 2026';
              const brandMeta = getBrandMeta(vehicle.brand);
              const selectedColorIdx = cardColorIdxMap[vehicle.id] || 0;
              const isInterior = cardInteriorModeMap[vehicle.id] || false;
              const activeColor = vehicle.colors?.[selectedColorIdx] || vehicle.colors?.[0];
              const rawImg = isInterior
                ? (vehicle.interiorImage || vehicle.interiorGallery?.[0]?.image || vehicle.cardImage)
                : (activeColor?.image || vehicle.cardImage);
              const displayImg = rawImg?.includes('hilux-306x122.webp')
                ? rawImg.replace('hilux-306x122.webp', 'hilux-double-cab-306x122.webp')
                : rawImg;

              return (
                <div
                  key={vehicle.id}
                  className="w-[290px] sm:w-[310px] md:w-[325px] flex-shrink-0 bg-white rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#141414] group text-center relative"
                >
                  {/* Top Info: Brand Badge, Model Name & Price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {language === 'ar' ? brandMeta.brandName : brandMeta.brandNameEn}
                      </span>
                      <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardInteriorModeMap(prev => ({ ...prev, [vehicle.id]: false }));
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                            !isInterior ? 'bg-[#141414] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                          }`}
                        >
                          {language === 'ar' ? 'خارجية' : 'Ext'}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardInteriorModeMap(prev => ({ ...prev, [vehicle.id]: true }));
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                            isInterior ? 'bg-[#141414] text-white shadow-xs' : 'text-gray-600 hover:text-black'
                          }`}
                        >
                          {language === 'ar' ? 'داخلية' : 'Int'}
                        </button>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="text-lg md:text-xl font-bold text-gray-900 font-arabic mb-1 group-hover:text-[#141414] transition-colors cursor-pointer"
                    >
                      {cleanTitle}
                    </h3>
                    
                    <div className="text-sm text-gray-700 font-medium mb-2 flex items-center justify-center gap-1.5">
                      <span>{language === 'ar' ? 'تبدأ من' : 'Starts from'}</span>
                      <span className="text-base font-bold font-mono text-[#141414]">
                        {vehicle.priceStartingFrom.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#141414]">﷼</span>
                    </div>

                    {/* Vehicle Cutout / Interior Image Stage */}
                    <div 
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="h-40 flex items-center justify-center cursor-pointer overflow-hidden my-2 rounded-xl bg-gradient-to-b from-gray-50/50 to-gray-100/60 relative"
                    >
                      <img
                        src={displayImg}
                        alt={vehicle.nameAr}
                        width={306}
                        height={122}
                        className={`w-full h-full ${isInterior ? 'object-cover' : 'max-h-36 w-auto object-contain p-2'} drop-shadow-sm group-hover:scale-105 transition-transform duration-300`}
                        loading={cardIdx < 12 ? 'eager' : 'lazy'}
                      />
                      {isInterior && (
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {language === 'ar' ? 'المقصورة الداخلية' : 'Interior Cabin'}
                        </span>
                      )}
                    </div>

                    {/* Interactive Color Swatches */}
                    {vehicle.colors && vehicle.colors.length > 0 && (
                      <div className="mt-2 flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center gap-1.5">
                          {vehicle.colors.slice(0, 6).map((c, idx) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardColorIdxMap(prev => ({ ...prev, [vehicle.id]: idx }));
                                setCardInteriorModeMap(prev => ({ ...prev, [vehicle.id]: false }));
                              }}
                              title={language === 'ar' ? c.name : c.nameEn}
                              style={{ backgroundColor: c.hex }}
                              className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                                !isInterior && selectedColorIdx === idx
                                  ? 'scale-125 border-[#141414] ring-2 ring-red-600/30'
                                  : 'border-gray-300 hover:scale-110'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium truncate max-w-full">
                          {isInterior
                            ? (language === 'ar' ? `${vehicle.interiorGallery?.length || 4} صور داخلية متوفرة` : '4 Interior Shots')
                            : (language === 'ar' ? activeColor?.name : activeColor?.nameEn)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Links + Digital Catalog Trigger */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 text-xs font-bold">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectVehicle(vehicle.id)}
                        className="py-2 px-2 rounded-lg bg-gray-50 hover:bg-[#f3f3f3] text-gray-900 hover:text-[#141414] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#141414]" />
                        <span>{language === 'ar' ? 'صفحة الموديل' : 'Overview'}</span>
                      </button>

                      <button
                        onClick={() => setCatalogModalVehicle(vehicle)}
                        className="py-2 px-2 rounded-lg bg-[#f3f3f3] hover:bg-[#141414] text-[#141414] hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'الكتالوج والداخلية' : 'Catalog & Inside'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenTestDrive(cleanTitle)}
                      className="text-gray-700 hover:text-[#141414] transition-colors flex items-center justify-center gap-1.5 py-1 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'خيارات الشراء وحجز التجربة' : 'Buying Options & Test Drive'}</span>
                      <span className="text-[#141414] font-bold">›</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar Indicator matching Solina SA */}
        <div className="max-w-xs mx-auto h-1 bg-gray-200 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-[#141414] rounded-full transition-all duration-200"
            style={{ width: `${Math.max((scrollProgress * 100), 30)}%` }}
          />
        </div>

        {/* Big Pill CTA Button matching Solina SA */}
        <div>
          <button
            onClick={() => {
              const megaBtn = document.querySelector('header nav button');
              if (megaBtn) (megaBtn as HTMLButtonElement).click();
            }}
            className="px-10 py-3.5 rounded-full bg-[#141414] hover:bg-[#262626] text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            {language === 'ar' ? 'عرض جميع المركبات' : 'View All Vehicles'}
          </button>
        </div>

      </div>

      {/* Digital Catalog & Interior Modal */}
      <VehicleCatalogModal
        vehicle={catalogModalVehicle}
        isOpen={!!catalogModalVehicle}
        onClose={() => setCatalogModalVehicle(null)}
        onOpenTestDrive={(name) => {
          setCatalogModalVehicle(null);
          onOpenTestDrive(name);
        }}
      />
    </section>
  );
};
