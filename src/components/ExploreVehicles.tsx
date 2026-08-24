import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Heart,
  ChevronDown
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
  const { language, formatPrice, isRTL } = useLanguage();
  const { vehicles } = useAdminData();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Tabs matching Toyota Saudi Arabia architecture
  const categories = [
    { id: 'sedan', label: language === 'ar' ? 'السيدان' : 'Sedan' },
    { id: 'suv', label: language === 'ar' ? 'السيارات متعددة الإستخدامات' : 'SUVs & Crossovers' },
    { id: 'commercial', label: language === 'ar' ? 'السيارات التجارية' : 'Commercial' },
    { id: 'hybrid', label: language === 'ar' ? 'الهايبرد' : 'Hybrids (HEV)' },
    { id: 'gr', label: language === 'ar' ? 'الأداء الرياضي GR' : 'GR Performance' },
    { id: 'all', label: language === 'ar' ? 'كافة المركبات' : 'All Models' }
  ];

  const currentTab = selectedCategory === 'all' ? 'sedan' : selectedCategory;

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (currentTab === 'sedan') return vehicle.category === 'sedan';
    if (currentTab === 'suv') return ['suv', 'crossover', 'family'].includes(vehicle.category);
    if (currentTab === 'commercial') return vehicle.category === 'commercial';
    if (currentTab === 'hybrid') return vehicle.isHybrid || vehicle.powertrain === 'هايبرد';
    if (currentTab === 'gr') return vehicle.isGR || vehicle.category === 'gr';
    return true;
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
      const scrollAmount = 380;
      const factor = isRTL ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1);
      sliderRef.current.scrollBy({ left: scrollAmount * factor, behavior: 'smooth' });
    }
  };

  return (
    <section id="explore-vehicles" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        
        {/* Exact Toyota SA Centered Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display mb-10">
          {language === 'ar' ? 'استكشف جميع المركبات' : 'Explore All Vehicles'}
        </h2>

        {/* Toyota SA Category Tabs with Underline Indicator */}
        <div className="flex items-center justify-center gap-6 md:gap-12 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = (currentTab === cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`pb-4 text-base md:text-lg font-bold transition-all cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'text-gray-900 border-b-4 border-blue-600 font-black'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Vehicle Carousel Slider matching Toyota SA */}
        <div className="relative group mb-10">
          {/* Left Arrow */}
          <button
            onClick={() => scrollSlider('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-all cursor-pointer hidden md:flex"
            aria-label="Previous Vehicles"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollSlider('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-all cursor-pointer hidden md:flex"
            aria-label="Next Vehicles"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Content */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth items-stretch"
          >
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 bg-white rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group text-center"
              >
                {/* Top Info: Model Name & Price */}
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 font-display mb-1 group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                  </h3>
                  
                  <div className="text-sm text-gray-600 font-bold mb-4 flex items-center justify-center gap-1">
                    <span>{language === 'ar' ? 'تبدأ من' : 'Starts from'}</span>
                    <span className="text-base font-black font-mono text-gray-900">
                      {formatPrice(vehicle.priceStartingFrom)}
                    </span>
                    <span className="text-xs text-blue-600 font-bold">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </div>

                  {/* Cutout Image Stage */}
                  <div 
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="h-44 flex items-center justify-center cursor-pointer overflow-hidden my-3"
                  >
                    <img
                      src={vehicle.cardImage}
                      alt={language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                      className="max-h-36 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Bottom Dual Links matching Toyota SA exact UX */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2.5 text-sm font-bold">
                  <button
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
                    <span className="text-blue-600 font-bold">›</span>
                  </button>

                  <button
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="text-gray-900 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'خيارات الشراء' : 'Buying Options'}</span>
                    <span className="text-blue-600 font-bold">›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Indicator matching Toyota SA */}
        <div className="max-w-md mx-auto h-1.5 bg-gray-200 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${Math.max((scrollProgress * 100), 25)}%` }}
          />
        </div>

        {/* Big Centered CTA Button matching Toyota SA */}
        <div>
          <button
            onClick={() => {
              onSelectCategory('all');
            }}
            className="px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            {language === 'ar' ? 'عرض جميع المركبات' : 'View All Vehicles'}
          </button>
        </div>

      </div>
    </section>
  );
};
