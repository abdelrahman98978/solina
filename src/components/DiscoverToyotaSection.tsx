import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Leaf, Shield, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DiscoverToyotaSection: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const stories = [
    {
      id: 'hev-tech',
      title: 'تكنولوجيا الهايبرد HEV من تويوتا',
      titleEn: 'Toyota HEV Hybrid Technology',
      subtitle: 'الريادة العالمية في كفاءة الطاقة',
      subtitleEn: 'World Leadership in Energy Efficiency',
      description: 'اكتشف كيف تدمج محركات تويوتا الهايبرد بين محرك البنزين والمحرك الكهربائي الذكي لتحقيق أقصى توفير في الوقود بدون الحاجة إلى شحن خارجي.',
      descriptionEn: 'Discover how Toyota Hybrid Synergy Drive combines petrol engine and smart electric motor for peak fuel efficiency with self-charging capability.',
      badge: 'الاستدامة والمستقبل',
      badgeEn: 'Sustainability & Future',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp',
      icon: <Leaf className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'camry-2026',
      title: 'كامري 2026 الجديدة كلياً',
      titleEn: 'All-New Camry 2026',
      subtitle: 'فخامة متجددة وأداء هجين متطور',
      subtitleEn: 'Reinvented Luxury & Hybrid Dynamics',
      description: 'أيقونة السيدان تعود بتصميم رياضي هجومي ومقصورة رقمية متكاملة مدعومة بالجيل الخامس من منظومة تويوتا الهايبرد لتجربة قيادة لا تُنسى.',
      descriptionEn: 'The sedan icon returns with an aggressive athletic stance and cutting-edge cockpit backed by the 5th generation hybrid powertrain.',
      badge: 'تدشين حصري 2026',
      badgeEn: 'Exclusive 2026 Launch',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp',
      icon: <Flame className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'jameel-care',
      title: 'برنامج عناية الجبراني للضيوف',
      titleEn: 'Al-Jabrani Guest Care Program',
      subtitle: 'راحة بال دائمة وخدمات استثنائية',
      subtitleEn: 'Complete Peace of Mind & Unmatched Service',
      description: 'نلتزم بمبدأ "الضيف أولاً" عبر تقديم باقات صيانة مجانية، وضمان ممتد معتمد، ومساعدة على الطريق 24/7 مع توفير قطع الغيار الأصلية 100%.',
      descriptionEn: 'Dedicated to our "Guest First" philosophy with complimentary service packages, certified extended warranty, and 24/7 roadside assistance.',
      badge: 'خدمات ما بعد البيع',
      badgeEn: 'Aftersales Excellence',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/jameel-care-program-478x717-eng.webp?w=1920&q=75&f=webp',
      icon: <Shield className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="discover-toyota" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'اكتشف تويوتا مع الجبراني' : 'Discover Toyota with Al-Jabrani'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">
              {language === 'ar' ? 'ابتكارات ورؤية المستقبل' : 'Innovations & Future Vision'}
            </h2>
          </div>

          <p className="text-gray-400 text-xs md:text-sm max-w-md leading-relaxed">
            {language === 'ar'
              ? 'رحلة مستمرة من الابتكار التكنولوجي، والاستدامة البيئية، وتجربة الضيافة السعودية الأصيلة.'
              : 'A continuous voyage of technological innovation, environmental sustainability, and authentic Saudi hospitality.'}
          </p>
        </div>

        {/* 3 Story Cards Grid matching Toyota SA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group relative rounded-3xl overflow-hidden bg-gray-800/80 border border-white/10 hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-end min-h-[500px] shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Card Image Stage */}
              <div className="absolute inset-0 z-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Badge top */}
              <div className="absolute top-5 right-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                  {story.icon}
                  <span>{language === 'ar' ? story.badge : story.badgeEn}</span>
                </span>
              </div>

              {/* Text Content */}
              <div className="relative z-10 p-6 md:p-8">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  {language === 'ar' ? story.subtitle : story.subtitleEn}
                </span>

                <h3 className="text-xl md:text-2xl font-black text-white font-display mb-3 group-hover:text-blue-300 transition-colors">
                  {language === 'ar' ? story.title : story.titleEn}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-5">
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
