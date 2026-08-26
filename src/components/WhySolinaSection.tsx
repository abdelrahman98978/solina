import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Wrench, RefreshCw, Zap, Sparkles, LifeBuoy, TrendingUp, CheckCircle2 } from 'lucide-react';
import { WHY_SOLINA_POINTS } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

export const WhySolinaSection: React.FC = () => {
  const { language } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-[#0056B3]" />;
      case 'Award': return <Award className="w-7 h-7 text-[#0056B3]" />;
      case 'Zap': return <Zap className="w-7 h-7 text-[#0056B3]" />;
      case 'LifeBuoy': return <LifeBuoy className="w-7 h-7 text-[#0056B3]" />;
      case 'TrendingUp': return <TrendingUp className="w-7 h-7 text-[#0056B3]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-7 h-7 text-[#0056B3]" />;
      default: return <Sparkles className="w-7 h-7 text-[#0056B3]" />;
    }
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100 font-arabic">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0056B3] text-xs font-bold mb-4 border border-blue-100">
            <HeartHandshake className="w-4 h-4 text-[#0056B3]" />
            <span>{language === 'ar' ? 'الثقة والاعتمادية والريادة في المملكة' : 'Trust, Reliability & Excellence in Saudi Arabia'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 font-arabic tracking-tight">
            {language === 'ar' ? 'لماذا تختار سولينا للسيارات؟' : 'Why Choose Solina Motors?'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'عقود من الريادة والشراكة الموثوقة مع ضيوفنا في المملكة، نلتزم بتقديم أعلى معايير الجودة والاعتمادية مع شبكة مراكز بيع وصيانة تغطي كافة المناطق.'
              : 'Decades of automotive leadership and trusted guest partnership across the Kingdom, delivering peak quality, reliability, and nationwide coverage.'}
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WHY_SOLINA_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-200/70 hover:border-[#0056B3]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-white group-hover:bg-blue-50 text-[#0056B3] flex items-center justify-center shadow-sm border border-gray-100 mb-6 transition-colors">
                  {getIcon(point.icon)}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 font-arabic group-hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? point.title : point.titleEn}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'ar' ? point.description : point.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
