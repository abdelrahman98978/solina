import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft,
  ArrowRight
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
  const { language, isRTL } = useLanguage();
  const { vehicles } = useAdminData();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'luxury' | 'sedan' | 'suv' | 'hybrid' | 'commercial'>('all');

  // Comprehensive multi-brand luxury fleet categories
  const categories = [
    { id: 'all', label: language === 'ar' ? 'جميع المركبات' : 'All Vehicles' },
    { id: 'luxury', label: language === 'ar' ? 'الفاخرة والرئاسية VIP' : 'Ultra Luxury & VIP' },
    { id: 'sedan', label: language === 'ar' ? 'السيدان' : 'Sedan' },
    { id: 'suv', label: language === 'ar' ? 'الدفع الرباعي والـ SUV' : 'SUVs & Crossovers' },
    { id: 'hybrid', label: language === 'ar' ? 'الهايبرد' : 'Hybrid' },
    { id: 'commercial', label: language === 'ar' ? 'السيارات التجارية' : 'Commercial Vehicles' }
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'luxury') return ['lexus', 'mercedes', 'porsche', 'bmw', 'genesis', 'landrover'].includes(vehicle.brand || '') || vehicle.priceStartingFrom >= 300000;
    if (activeTab === 'sedan') return vehicle.category === 'sedan' || vehicle.category === 'gr';
    if (activeTab === 'suv') return ['suv', 'crossover', 'family'].includes(vehicle.category);
    if (activeTab === 'hybrid') return vehicle.category === 'hybrid' || vehicle.isHybrid || vehicle.powertrain === 'هايبرد';
    if (activeTab === 'commercial') return vehicle.category === 'commercial';
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

        {/* Solina SA Official Category Tabs with Red Active Underline */}
        <div className="flex items-center justify-center gap-8 md:gap-14 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
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
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Vehicle Carousel Slider matching Solina SA */}
        <div className="relative group mb-10">
          {/* Left Arrow */}
          <button
            onClick={() => scrollSlider('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#0056B3] hover:text-white transition-all cursor-pointer hidden md:flex"
            aria-label="Previous Vehicles"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollSlider('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-[#0056B3] hover:text-white transition-all cursor-pointer hidden md:flex"
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
            {filteredVehicles.map((vehicle) => {
              const cleanTitle = vehicle.nameAr.replace(/2026/g, '').replace(/سولينا/g, '').trim() + ' 2026';
              return (
                <div
                  key={vehicle.id}
                  className="w-[280px] sm:w-[300px] md:w-[310px] flex-shrink-0 bg-white rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 group text-center"
                >
                  {/* Top Info: Model Name & Price */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-arabic mb-1 group-hover:text-[#0056B3] transition-colors">
                      {cleanTitle}
                    </h3>
                    
                    <div className="text-sm text-gray-700 font-medium mb-4 flex items-center justify-center gap-1.5">
                      <span>{language === 'ar' ? 'تبدأ من' : 'Starts from'}</span>
                      <span className="text-base font-bold font-mono text-[#0056B3]">
                        {vehicle.priceStartingFrom.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#0056B3]">﷼</span>
                    </div>

                    {/* Vehicle Cutout Image Stage */}
                    <div 
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="h-36 flex items-center justify-center cursor-pointer overflow-hidden my-3"
                    >
                      <img
                        src={vehicle.cardImage}
                        alt={vehicle.nameAr}
                        className="max-h-32 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Bottom Dual Links matching Solina SA exact UX */}
                  <div className="mt-4 pt-3 flex flex-col gap-2 text-sm font-semibold text-right">
                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="text-gray-900 hover:text-[#0056B3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
                      <span className="text-[#0056B3] font-bold">›</span>
                    </button>

                    <button
                      onClick={() => onOpenTestDrive(cleanTitle)}
                      className="text-gray-900 hover:text-[#0056B3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'خيارات الشراء' : 'Buying Options'}</span>
                      <span className="text-[#0056B3] font-bold">›</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Red Progress Bar Indicator matching Solina SA */}
        <div className="max-w-xs mx-auto h-1 bg-gray-200 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-[#0056B3] rounded-full transition-all duration-200"
            style={{ width: `${Math.max((scrollProgress * 100), 30)}%` }}
          />
        </div>

        {/* Big Red Pill CTA Button matching Solina SA */}
        <div>
          <button
            onClick={() => {
              const megaBtn = document.querySelector('header nav button');
              if (megaBtn) (megaBtn as HTMLButtonElement).click();
            }}
            className="px-10 py-3.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            {language === 'ar' ? 'عرض جميع المركبات' : 'View All Vehicles'}
          </button>
        </div>

      </div>
    </section>
  );
};
