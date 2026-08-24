import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const DiscoverAlJabraniSection: React.FC = () => {
  const { language } = useLanguage();

  const stories = [
    {
      id: 'guest-care',
      title: language === 'ar' ? 'برنامج العناية الممتدة لسيارة الهايبرد' : 'Extended Care Program for Hybrid Vehicles',
      description: language === 'ar' ? 'نلتزم بتقديم باقات صيانة شاملة وضمان ممتد يمنحك راحة بال تامة طوال رحلتك.' : 'Committed to delivering comprehensive maintenance and peace of mind throughout your journey.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/jameel-care-program-478x717-eng.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'flagship-camry',
      title: language === 'ar' ? 'كامري هايبرد الجديدة' : 'The All-New Camry Hybrid',
      description: language === 'ar' ? 'مستوى جديد من الإمكانيات والراحة. مرحبًا بسيارة كامري الهايبرد المتطورة.' : 'A new level of possibilities and refinement. Welcome to the refined Camry Hybrid.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'hybrid-mobility',
      title: language === 'ar' ? 'تكنولوجيا الهايبرد' : 'Hybrid Technology',
      description: language === 'ar' ? 'ريادة مستمرة في البحث والتطوير لمجموعة واسعة من السيارات الصديقة للبيئة.' : 'Continuous leadership in research and development for eco-friendly vehicles.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp'
    }
  ];

  return (
    <section id="discover-aljabrani" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Centered Heading matching Toyota SA */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display mb-2">
          {language === 'ar' ? 'اكتشف الجبراني' : 'Discover Al Jabrani'}
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-medium mb-12">
          {language === 'ar' ? 'ابتكار تثق به' : 'Innovation You Can Trust'}
        </p>

        {/* 3 Tall Vertical Story Cards matching Toyota SA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[2/3] bg-gray-900 flex flex-col justify-end p-6 md:p-8 text-start"
            >
              {/* Background Image Stage */}
              <img
                src={story.image}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Text content bottom */}
              <div className="relative z-10 text-white">
                <h3 className="text-xl md:text-2xl font-black font-display mb-2 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pill Button */}
        <div>
          <button className="px-8 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer">
            {language === 'ar' ? 'استكشف المزيد من المقالات' : 'Explore More Articles'}
          </button>
        </div>
      </div>
    </section>
  );
};
