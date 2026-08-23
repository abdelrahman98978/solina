import React, { useState } from 'react';
import { Sparkles, Car, Users, Compass, DollarSign, Check, ArrowLeft, ArrowRight, RotateCcw, Zap, Shield, Flame } from 'lucide-react';
import { VEHICLES, type Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface CarFinderWizardProps {
  onSelectVehicle: (vehicleId: string) => void;
  onOpenTestDrive: (modelName?: string) => void;
}

export const CarFinderWizard: React.FC<CarFinderWizardProps> = ({
  onSelectVehicle,
  onOpenTestDrive
}) => {
  const { language, formatPrice } = useLanguage();
  const [budgetTier, setBudgetTier] = useState<'any' | 'economy' | 'mid' | 'luxury'>('any');
  const [passengers, setPassengers] = useState<'any' | 'small' | 'medium' | 'large'>('any');
  const [usage, setUsage] = useState<'any' | 'city' | 'family' | 'offroad' | 'sport'>('any');

  // Filter and score vehicles based on answers
  const scoredVehicles = VEHICLES.map(v => {
    let score = 50;

    // Budget check
    if (budgetTier === 'economy' && v.priceStartingFrom <= 85000) score += 30;
    if (budgetTier === 'mid' && v.priceStartingFrom > 85000 && v.priceStartingFrom <= 180000) score += 30;
    if (budgetTier === 'luxury' && v.priceStartingFrom > 180000) score += 30;

    // Passenger check
    if (passengers === 'small' && v.seats <= 4) score += 25;
    if (passengers === 'medium' && v.seats === 5) score += 25;
    if (passengers === 'large' && v.seats >= 7) score += 25;

    // Usage check
    if (usage === 'city' && (v.category === 'sedan' || v.isHybrid)) score += 30;
    if (usage === 'family' && (v.seats >= 7 || v.category === 'suv')) score += 30;
    if (usage === 'offroad' && (v.drivetrain.includes('4WD') || v.drivetrain.includes('4x4') || v.id.includes('prado') || v.id.includes('lc300') || v.id.includes('hilux') || v.id.includes('lc70'))) score += 35;
    if (usage === 'sport' && (v.isGR || v.horsepower.includes('345') || v.horsepower.includes('382') || v.horsepower.includes('409'))) score += 35;

    return { ...v, matchScore: Math.min(99, score) };
  })
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 3);

  const resetFilters = () => {
    setBudgetTier('any');
    setPassengers('any');
    setUsage('any');
  };

  return (
    <section className="py-20 bg-[#12141A] text-white relative overflow-hidden border-t border-white/10">
      {/* Ambient background styling */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-bold text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{language === 'ar' ? 'المستشار الذكي لاختيار السيارة' : 'Smart AI Car Matcher'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3 font-display">
            {language === 'ar' ? 'اعثر على سيارتك المثالية في ثوانٍ' : 'Find Your Perfect Car in Seconds'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'أجب عن 3 معايير بسيطة ودع خوارزميتنا الذكية ترشح لك السيارة الأكثر مطابقة لاحتياجاتك وميزانيتك.'
              : 'Answer 3 simple criteria and let our smart matching engine recommend your ideal 2026 vehicle.'}
          </p>
        </div>

        {/* 3 Question Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Question 1: Budget */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-3">
              <DollarSign className="w-4 h-4" />
              <span>{language === 'ar' ? '1. الميزانية المستهدفة:' : '1. Target Budget:'}</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'any', labelAr: 'كافة الميزانيات', labelEn: 'Any Budget' },
                { id: 'economy', labelAr: 'اقتصادية (أقل من 85,000 ر.س)', labelEn: 'Economy (< SAR 85,000)' },
                { id: 'mid', labelAr: 'متوسطة (85,000 - 180,000 ر.س)', labelEn: 'Mid-Range (SAR 85k - 180k)' },
                { id: 'luxury', labelAr: 'فارهة & دفع رباعي (+180,000 ر.س)', labelEn: 'Luxury & 4x4 (> SAR 180k)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setBudgetTier(opt.id as any)}
                  className={`w-full text-right sm:text-inherit p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    budgetTier === opt.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                  {budgetTier === opt.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Passengers */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-3">
              <Users className="w-4 h-4" />
              <span>{language === 'ar' ? '2. سعة المقاعد والركاب:' : '2. Passenger Capacity:'}</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'any', labelAr: 'أي عدد من الركاب', labelEn: 'Any Capacity' },
                { id: 'small', labelAr: 'شخصين إلى 4 (رياضية / شبابية)', labelEn: '2-4 Seats (Coupe/Sport)' },
                { id: 'medium', labelAr: '5 ركاب (سيدان / كروس أوفر)', labelEn: '5 Seats (Sedan / Crossover)' },
                { id: 'large', labelAr: '7 ركاب فأكثر (عائلية كبيرة)', labelEn: '7+ Seats (Large Family SUV)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPassengers(opt.id as any)}
                  className={`w-full text-right sm:text-inherit p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    passengers === opt.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                  {passengers === opt.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Primary Terrain & Usage */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-3">
              <Compass className="w-4 h-4" />
              <span>{language === 'ar' ? '3. طبيعة الاستخدام والقيادة:' : '3. Driving Purpose:'}</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'any', labelAr: 'استخدام متنوع وشامل', labelEn: 'All-Around Driving' },
                { id: 'city', labelAr: 'مشاوير مدينة واقتصاد وقود هايبرد', labelEn: 'City Commute & Hybrid Economy' },
                { id: 'family', labelAr: 'رحلات عائلية وراحة وسفر طويل', labelEn: 'Family Comfort & Long Trips' },
                { id: 'offroad', labelAr: 'طرق وعرة وصحراء وتضاريس 4x4', labelEn: 'Off-Road & Desert Adventure' },
                { id: 'sport', labelAr: 'أداء رياضي متفوق وتسارع سريع', labelEn: 'High Performance & Track Racing' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setUsage(opt.id as any)}
                  className={`w-full text-right sm:text-inherit p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    usage === opt.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                  {usage === opt.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Filter Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إعادة ضبط المعايير' : 'Reset Criteria'}</span>
          </button>
        </div>

        {/* Matching Recommendations Result Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{language === 'ar' ? 'أفضل الترشيحات المتطابقة مع اختياراتك:' : 'Top Matched Vehicles for You:'}</span>
          </h3>
        </div>

        {/* Matched Cars Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scoredVehicles.map(car => (
            <div
              key={car.id}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/30">
                    {language === 'ar' ? `تطابق بنسبة ${car.matchScore}%` : `${car.matchScore}% Match`}
                  </span>
                  <span className="text-xs text-gray-400">{car.bodyTypeAr}</span>
                </div>

                <div className="h-32 w-full flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img src={car.cardImage} alt={car.nameAr} className="max-h-full max-w-full object-contain filter drop-shadow-lg" />
                </div>

                <h4 className="text-xl font-black text-white mb-1 font-display">
                  {language === 'ar' ? car.nameAr : car.nameEn}
                </h4>
                <p className="text-xs text-gray-400 mb-4">{car.engineSpec}</p>

                <div className="bg-black/30 p-3 rounded-2xl border border-white/10 mb-6 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'السعر النقدي يبدأ من' : 'Starts From'}</span>
                    <span className="font-bold text-white font-mono">{formatPrice(car.priceStartingFrom)} ر.س</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'القسط الشهري' : 'Installment'}</span>
                    <span className="font-bold text-blue-400 font-mono">{formatPrice(car.monthlyInstallmentStartingFrom)} ر.س/شهر</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => onSelectVehicle(car.id)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'تفاصيل الفئات' : 'View Trims'}
                </button>
                <button
                  onClick={() => onOpenTestDrive(car.nameAr)}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center transition-colors cursor-pointer shadow-sm shadow-blue-600/30"
                >
                  {language === 'ar' ? 'حجز تجربة' : 'Test Drive'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
