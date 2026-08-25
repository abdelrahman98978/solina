import React from 'react';
import { Sparkles, ShieldCheck, Clock, Award, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolinaQualitySectionProps {
  onOpenTestDrive?: () => void;
  onNavigateToDiscover?: () => void;
}

export const SolinaQualitySection: React.FC<SolinaQualitySectionProps> = ({
  onOpenTestDrive,
  onNavigateToDiscover
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white font-arabic overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Main Banner Visual Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
          <img
            src="/solina-quality-banner.png"
            alt="جودة تتجاوز التوقعات - سولينا للسيارات"
            className="w-full h-auto object-contain block select-none"
            loading="lazy"
          />

          {/* Interactive Overlay Call to Action Bar */}
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-start">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'ar' ? 'سولينا للسيارات - التميز المؤسسي' : 'Solina Motors - Institutional Excellence'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'معايير يابانية صارمة بضيافة سعودية أصيلة' : 'Japanese Precision with Authentic Saudi Hospitality'}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
                {language === 'ar'
                  ? 'نضمن لكم أعلى مستويات الجودة في صالات العرض، خدمات ما بعد البيع، وقطع الغيار الأصلية مع ضمان ممتد حتى 10 سنوات.'
                  : 'Delivering the highest quality standards in showrooms, aftersales service, and genuine parts with up to 10 years extended warranty.'}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={onOpenTestDrive}
                className="flex-1 md:flex-none px-6 py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                {language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive'}
              </button>

              <button
                onClick={onNavigateToDiscover}
                className="flex-1 md:flex-none px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs md:text-sm font-bold border border-gray-200 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>{language === 'ar' ? 'اكتشف المزيد' : 'Discover More'}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Value Cards below banner with Professional 3D Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: ShieldCheck,
              gradient: 'from-blue-600 to-indigo-700',
              iconColor: 'text-blue-500',
              badgeBg: 'bg-blue-50 border-blue-200/80',
              titleAr: 'ضمان ممتد 10 سنوات',
              titleEn: '10-Year Extended Warranty',
              descAr: 'تغطية شاملة للمحرك، ناقل الحركة، وبطاريات الهايبرد'
            },
            {
              icon: Clock,
              gradient: 'from-amber-500 to-orange-600',
              iconColor: 'text-amber-500',
              badgeBg: 'bg-amber-50 border-amber-200/80',
              titleAr: 'صيانة سريعة 45 دقيقة',
              titleEn: '45-Min Express Care',
              descAr: 'خدمة فائقة السرعة بأيدي فنيين معتمدين من سولينا العالمية'
            },
            {
              icon: Award,
              gradient: 'from-emerald-500 to-teal-700',
              iconColor: 'text-emerald-500',
              badgeBg: 'bg-emerald-50 border-emerald-200/80',
              titleAr: 'قطع غيار أصلية 100%',
              titleEn: '100% Genuine Parts',
              descAr: 'مستودعات مركزية متكاملة تضمن توفر كل قطع الغيار الأصلية'
            },
            {
              icon: Sparkles,
              gradient: 'from-red-500 to-rose-700',
              iconColor: 'text-red-500',
              badgeBg: 'bg-red-50 border-red-200/80',
              titleAr: 'تجربة ضيافة VIP',
              titleEn: 'VIP Guest Experience',
              descAr: 'استراحات انتظار فاخرة مع ضيافة قهوة سعودية وواي فاي فائق السرعة'
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${card.badgeBg} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">0{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 font-arabic mb-1.5 group-hover:text-black">
                    {language === 'ar' ? card.titleAr : card.titleEn}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {card.descAr}
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
