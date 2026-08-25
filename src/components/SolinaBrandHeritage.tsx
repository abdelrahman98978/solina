import React from 'react';
import { Flag, Sparkles, Award, ShieldCheck, Users, MapPin, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolinaBrandHeritageProps {
  onNavigateToDiscover?: () => void;
  onOpenTestDrive?: () => void;
}

export const SolinaBrandHeritage: React.FC<SolinaBrandHeritageProps> = ({
  onNavigateToDiscover,
  onOpenTestDrive
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 font-arabic overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left/Start Column: Text & Statistics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                <Flag className="w-3.5 h-3.5" />
                {language === 'ar' ? 'هوية وريادة سولينا للسيارات' : 'Solina Brand & Heritage'}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 font-arabic leading-tight">
                {language === 'ar' ? 'راية التميز في عالم السيارات بالمملكة' : 'The Banner of Automotive Excellence in KSA'}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                {language === 'ar'
                  ? 'تفخر شركة سولينا للسيارات بريادتها لتقديم تجربة متكاملة تجمع بين أصالة الضيافة السعودية والابتكار الهندسي المتطور، لنصنع معايير جديدة لخدمة ضيوفنا في كل رحلة.'
                  : 'Solina Motors is proud to lead the automotive experience, fusing authentic hospitality with cutting-edge automotive engineering.'}
              </p>
            </div>

            {/* 4 Real-time Metric Numbers with Professional 3D Icon Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { 
                  icon: MapPin, 
                  badgeBg: 'bg-red-50 text-red-600 border-red-200/80',
                  number: '+50', 
                  labelAr: 'صالة ومركز خدمة', 
                  labelEn: 'Centers Nationwide' 
                },
                { 
                  icon: Users, 
                  badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/80',
                  number: '100k+', 
                  labelAr: 'ضيف يثق بسولينا', 
                  labelEn: 'Satisfied Guests' 
                },
                { 
                  icon: Award, 
                  badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
                  number: '100%', 
                  labelAr: 'قطع غيار أصلية', 
                  labelEn: 'Genuine Parts' 
                },
                { 
                  icon: ShieldCheck, 
                  badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
                  number: '10', 
                  labelAr: 'سنوات ضمان سولينا', 
                  labelEn: 'Years Warranty' 
                }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
                    <div className={`w-10 h-10 rounded-xl ${stat.badgeBg} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <span className="text-2xl md:text-3xl font-black text-gray-900 font-sans block mb-1">
                      {stat.number}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 font-arabic">
                      {language === 'ar' ? stat.labelAr : stat.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onNavigateToDiscover}
                className="px-8 py-3.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs md:text-sm font-bold shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
              >
                <span>{language === 'ar' ? 'اكتشف قصة سولينا ورؤيتنا' : 'Discover Solina Story'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTestDrive}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-gray-800 text-xs md:text-sm font-bold border border-gray-300 shadow-sm transition-all cursor-pointer"
              >
                {language === 'ar' ? 'طلب تجربة قيادة' : 'Request Test Drive'}
              </button>
            </div>
          </div>

          {/* Right/End Column: Official Solina Flag Mockup Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 group bg-white">
              <img
                src="/solina-flag.png"
                alt="علم وهوية سولينا للسيارات الرسمية"
                className="w-full h-auto object-cover max-h-[560px] select-none transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 right-6 left-6 text-white text-end">
                <span className="text-xs font-bold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  {language === 'ar' ? 'شركة سولينا للسيارات المحدودة' : 'Solina Motors Co. Ltd.'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
