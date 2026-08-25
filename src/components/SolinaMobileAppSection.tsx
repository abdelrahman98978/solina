import React from 'react';
import { Smartphone, Car, BellRing, MapPin, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolinaMobileAppSectionProps {
  onNavigateToApp?: () => void;
}

export const SolinaMobileAppSection: React.FC<SolinaMobileAppSectionProps> = ({
  onNavigateToApp
}) => {
  const { language } = useLanguage();

  return (
    <section id="solina-app" className="relative w-full py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 font-arabic overflow-hidden border-b border-gray-100">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Section Title with Live Demo Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 pb-6 border-b border-gray-200">
          <div className="space-y-2 text-center md:text-start">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
              <Smartphone className="w-3.5 h-3.5" />
              {language === 'ar' ? 'تطبيق سولينا للهواتف الذكية' : 'Solina Smart Mobile App'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 font-arabic leading-tight">
              {language === 'ar' ? 'تطبيق سولينا للسيارات — كل ما تحتاجه في تطبيق واحد' : 'Solina Motors App — All You Need in One App'}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl font-light">
              {language === 'ar'
                ? 'استمتع بتجربة رقمية فريدة تتيح لك تصفح أحدث الموديلات، حجز الصيانة ومتابعتها، وحساب الأقساط الشهرية بلمسة واحدة.'
                : 'Experience the ultimate digital journey to browse 2026 models, book maintenance, and calculate monthly installments.'}
            </p>
          </div>

          {onNavigateToApp && (
            <button
              onClick={onNavigateToApp}
              className="px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs md:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shrink-0 self-center md:self-auto hover:scale-105"
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === 'ar' ? 'تجربة التطبيق التفاعلي مباشرة' : 'Try Live Interactive App'}</span>
            </button>
          )}
        </div>

        {/* The Official App Showcase Image (Only the First Approved Full Banner) */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white group flex items-center justify-center p-2 sm:p-4">
          <img
            src="/solina-app-showcase.png"
            alt="تطبيق سولينا للسيارات - كل ما تحتاجه في تطبيق واحد"
            className="w-full h-auto max-w-full object-contain block select-none rounded-2xl"
            loading="eager"
          />
        </div>

        {/* 4 Feature Cards with Professional 3D Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: Car,
              badgeBg: 'bg-red-50 border-red-200/80 text-red-600',
              titleAr: 'تصفح وحجز فوري',
              titleEn: 'Browse & Instant Booking',
              descAr: 'استعراض مواصفات وصور 360 درجة لجميع سيارات 2026 مع حجز تجربة قيادة فورية',
              descEn: 'Browse 360 specs and book test drives instantly.'
            },
            {
              icon: BellRing,
              badgeBg: 'bg-amber-50 border-amber-200/80 text-amber-600',
              titleAr: 'عروض وإشعارات حصرية',
              titleEn: 'Exclusive Notifications',
              descAr: 'تنبيهات فورية بخصومات الصيانة والعروض التمويلية وباقات التأجير الحصرية',
              descEn: 'Instant alerts on discounts and finance offers.'
            },
            {
              icon: MapPin,
              badgeBg: 'bg-blue-50 border-blue-200/80 text-blue-600',
              titleAr: 'محدد الفروع الذكي',
              titleEn: 'Smart Branch Locator',
              descAr: 'ملاحة دقيقة لأقرب صالة عرض أو مركز صيانة معتمد لسولينا مع أوقات العمل',
              descEn: 'Precision GPS locator for showrooms & service centers.'
            },
            {
              icon: Headphones,
              badgeBg: 'bg-emerald-50 border-emerald-200/80 text-emerald-600',
              titleAr: 'دعم ومساعدة 24/7',
              titleEn: '24/7 Priority Support',
              descAr: 'محادثة فورية مع المساعد الذكي وخدمة المساعدة على الطريق بنقرة زر واحدة',
              descEn: 'Live chat with AI Assistant and 24/7 roadside assistance.'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${feat.badgeBg} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">0{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-1.5 font-arabic group-hover:text-black">
                    {language === 'ar' ? feat.titleAr : feat.titleEn}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {language === 'ar' ? feat.descAr : feat.descEn}
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
