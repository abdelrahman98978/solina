import React from 'react';
import { Car, Sparkles, ShieldCheck, Tag, ArrowLeft, CheckCircle2, Award, Zap, BadgePercent, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolinaFleetShowcaseProps {
  onOpenTestDrive?: (modelName?: string) => void;
  onExploreVehicles?: () => void;
  onSelectVehicle?: (vehicleId: string) => void;
}

export const SolinaFleetShowcase: React.FC<SolinaFleetShowcaseProps> = ({
  onOpenTestDrive,
  onExploreVehicles,
  onSelectVehicle
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full py-16 md:py-24 bg-white text-gray-900 font-arabic overflow-hidden border-b border-gray-100">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
              <Car className="w-3.5 h-3.5" />
              {language === 'ar' ? 'صالة العرض الكبرى لشركة سولينا' : 'Solina Grand Showroom Fleet'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 font-arabic">
              {language === 'ar' ? 'أسطول 2026 جاهز للتسليم الفوري' : 'The 2026 Fleet Ready for Immediate Delivery'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl font-normal">
              {language === 'ar'
                ? 'استكشف أحدث طرازات لاند كروزر 300، كامري الهايبرد، راف فور، وكراون الفاخرة داخل صالات عرض سولينا بتجهيزات كاملة وضمان ممتد.'
                : 'Experience the all-new Land Cruiser 300, Camry Hybrid, RAV4, and Crown inside Solina showrooms with full specs and extended warranties.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenTestDrive && onOpenTestDrive('لاند كروزر 2026')}
              className="px-6 py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs md:text-sm font-bold shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
            >
              <span>{language === 'ar' ? 'حجز تجربة قيادة' : 'Book Test Drive'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grand Showroom Floor Visual Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group bg-gray-50">
          <img
            src="/solina-showroom-floor.png"
            alt="صالة عرض أسطول سولينا للسيارات 2026"
            className="w-full h-auto object-contain block select-none"
            loading="lazy"
          />

          {/* Quick Vehicle Hotspots */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 right-6 left-6 flex flex-wrap items-center justify-between gap-4 text-white">
            <div className="space-y-1">
              <span className="text-xs text-red-400 font-bold tracking-wider uppercase">
                {language === 'ar' ? 'صالة العرض الرئيسية' : 'Flagship Floor'}
              </span>
              <h4 className="text-xl md:text-2xl font-bold">
                {language === 'ar' ? 'تشكيلة متكاملة من فئات الهايبرد والدفع الرباعي' : 'Complete Hybrid & 4WD Lineup'}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              {[
                { name: 'كامري 2026', id: 'camry-2026' },
                { name: 'لاند كروزر 2026', id: 'land-cruiser-2026' },
                { name: 'راف فور 2026', id: 'rav4-2026' }
              ].map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectVehicle && onSelectVehicle(m.id)}
                  className="px-4 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md text-xs font-bold border border-white/30 transition-all cursor-pointer"
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Vehicle Guarantees with Professional 3D Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: Zap,
              badgeBg: 'bg-amber-50 border-amber-200/80 text-amber-600',
              titleAr: 'تسليم فوري ومباشر',
              titleEn: 'Immediate Handover',
              descAr: 'استلم سيارتك الجديدة خلال 48 ساعة من إتمام إجراءات الشراء'
            },
            {
              icon: BadgePercent,
              badgeBg: 'bg-emerald-50 border-emerald-200/80 text-emerald-600',
              titleAr: 'عروض تمويل إسلامي 0%',
              titleEn: '0% Down Payment Finance',
              descAr: 'باقات تمويل تأجيري متوافقة مع الشريعة بأقل هامش ربح'
            },
            {
              icon: ShieldCheck,
              badgeBg: 'bg-blue-50 border-blue-200/80 text-blue-600',
              titleAr: 'ضمان سولينا 10 سنوات',
              titleEn: '10-Year Solina Warranty',
              descAr: 'تغطية مصنعية كاملة للمحرك، ناقل الحركة، وبطاريات الهايبرد'
            },
            {
              icon: Wrench,
              badgeBg: 'bg-red-50 border-red-200/80 text-red-600',
              titleAr: 'صيانة دورية مجانية',
              titleEn: 'Free Scheduled Care',
              descAr: 'باقات صيانة مجانية حتى 3 سنوات أو 50,000 كم على طرازات مختارة'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${item.badgeBg} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">0{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1.5 font-arabic group-hover:text-black">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {item.descAr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
