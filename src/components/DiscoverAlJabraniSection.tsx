import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Leaf, Shield, Flame, Compass, Wrench, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DiscoverAlJabraniSection: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const stories = [
    {
      id: 'hybrid-mobility',
      title: 'منظومة الطاقة الهجينة HEV والقيادة الذكية',
      titleEn: 'Hybrid HEV Powertrain & Smart Mobility',
      subtitle: 'كفاءة طاقة استثنائية وانبعاثات منخفضة',
      subtitleEn: 'Exceptional Efficiency & Low Emissions',
      description: 'تعرف على التكنولوجيا الهجينة المتطورة التي تجمع بين محركات البنزين والبطاريات الكهربائية الذكية ذاتية الشحن لتحقيق أقصى توفير في الوقود بدون الحاجة إلى قابس شحن.',
      descriptionEn: 'Discover the advanced self-charging hybrid technology combining petrol power and smart electric batteries for optimal fuel savings.',
      badge: 'الاستدامة والابتكار',
      badgeEn: 'Sustainability & Green Tech',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp',
      icon: <Leaf className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'flagship-camry',
      title: 'كامري 2026 الجديدة كلياً — قمة الفخامة الرياضية',
      titleEn: 'All-New Camry 2026 — Peak Dynamic Luxury',
      subtitle: 'الجيل الخامس من الأناقة والتكنولوجيا',
      subtitleEn: '5th Generation Design & Connectivity',
      description: 'أيقونة سيارات السيدان تعود بإطلالة رياضية هجومية ومقصورة ذكية متكاملة مزودة بأحدث أنظمة الأمان والوسائط الرقمية لتجربة قيادة فاخرة لا تضاهى.',
      descriptionEn: 'The flagship sedan redefines dynamic elegance with an aggressive stance, digital cockpit, and advanced driver assistance systems.',
      badge: 'تدشين حصري 2026',
      badgeEn: 'Exclusive 2026 Reveal',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp',
      icon: <Flame className="w-4 h-4 text-blue-400" />
    },
    {
      id: 'guest-care',
      title: 'برنامج رعاية الضيوف وضمان الجبراني المعتمد',
      titleEn: 'Al Jabrani Guest Care & Certified Warranty',
      subtitle: 'راحة بال تامة وخدمات ما بعد البيع المتميزة',
      subtitleEn: 'Comprehensive Peace of Mind & Support',
      description: 'نلتزم بفلسفة "الضيف أولاً" عبر تقديم باقات صيانة مجانية، وضمان شامل ممتد، ومساعدة فورية على الطريق 24/7 مع توفير قطع الغيار الأصلية بنسبة 100%.',
      descriptionEn: 'Committed to our "Guest First" ethos with complimentary maintenance schedules, extended warranty coverage, and 24/7 roadside assistance.',
      badge: 'خدمات ما بعد البيع',
      badgeEn: 'Aftersales Excellence',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/jameel-care-program-478x717-eng.webp?w=1920&q=75&f=webp',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <section id="discover-aljabrani" className="py-20 bg-[#0A0E17] text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial from-blue-900/25 via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'اكتشف الجبراني للسيارات' : 'Discover Al Jabrani Motors'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">
              {language === 'ar' ? 'ابتكارات وريادة المستقبل' : 'Innovations & Future Leadership'}
            </h2>
          </div>

          <p className="text-gray-400 text-xs md:text-sm max-w-md leading-relaxed font-light">
            {language === 'ar'
              ? 'رحلة مستمرة من الابتكار التكنولوجي، الاستدامة البيئية، وتجربة الضيافة الراقية لعملائنا في كافة أرجاء المملكة.'
              : 'A relentless pursuit of automotive innovation, green mobility, and authentic Saudi hospitality for our guests across the Kingdom.'}
          </p>
        </div>

        {/* 3 Story Cards Grid matching Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group relative rounded-3xl overflow-hidden bg-gray-900 border border-white/10 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-end min-h-[500px] shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Card Image Stage */}
              <div className="absolute inset-0 z-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
              </div>

              {/* Badge top */}
              <div className="absolute top-5 right-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
                  {story.icon}
                  <span>{language === 'ar' ? story.badge : story.badgeEn}</span>
                </span>
              </div>

              {/* Text Content */}
              <div className="relative z-10 p-6 md:p-8">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  {language === 'ar' ? story.subtitle : story.subtitleEn}
                </span>

                <h3 className="text-xl md:text-2xl font-black text-white font-display mb-3 group-hover:text-blue-300 transition-colors leading-snug">
                  {language === 'ar' ? story.title : story.titleEn}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-6 font-light">
                  {language === 'ar' ? story.description : story.descriptionEn}
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-white transition-colors">
                  <span>{language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
