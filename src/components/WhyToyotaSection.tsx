import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Wrench, RefreshCw, Zap, Sparkles, LifeBuoy, TrendingUp, CheckCircle2 } from 'lucide-react';
import { WHY_TOYOTA_POINTS } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

export const WhyToyotaSection: React.FC = () => {
  const { language } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-blue-600" />;
      case 'Award': return <Award className="w-8 h-8 text-blue-600" />;
      case 'Zap': return <Zap className="w-8 h-8 text-blue-600" />;
      case 'LifeBuoy': return <LifeBuoy className="w-8 h-8 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-blue-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-8 h-8 text-blue-600" />;
      default: return <Sparkles className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ar' ? 'الثقة والاعتمادية والريادة' : 'Trust, Reliability & Excellence'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 font-display">
            {language === 'ar' ? 'لماذا تختار شركة الجبراني للسيارات؟' : 'Why Choose Al Jabrani Motors?'}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            {language === 'ar'
              ? 'خبرة عريقة في توفير أرقى السيارات الحديثة، مع شبكة متكاملة لخدمات ما بعد البيع والصيانة وضمان راحة البال التامة.'
              : 'Decades of automotive excellence delivering the latest vehicle models backed by premier aftersales service across the Kingdom.'}
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WHY_TOYOTA_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="bg-gray-50/80 hover:bg-white rounded-3xl p-8 border border-gray-200/80 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs border border-gray-100 mb-6 transition-colors">
                  {getIcon(point.icon)}
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-2.5 font-display group-hover:text-blue-600 transition-colors">
                  {language === 'ar' ? point.title : point.titleEn}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed font-light">
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
