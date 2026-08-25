import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const DiscoverSolinaSection: React.FC = () => {
  const { language } = useLanguage();

  const stories = [
    {
      id: 'hev-tech',
      title: language === 'ar' ? 'تكنولوجيا الهايبرد' : 'Hybrid Technology',
      description: language === 'ar' 
        ? 'تشارك سولينا في البحث والتطوير لمجموعة واسعة من السيارات الصديقة للبيئة.' 
        : 'Solina participates in research and development for a wide range of eco-friendly vehicles.',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-mobile-343x514.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'camry-2026',
      title: language === 'ar' ? 'كامري هايبرد الجديدة' : 'The All-New Camry Hybrid',
      description: language === 'ar' 
        ? 'مستوى من الإمكانيات. مرحبًا بسيارة سولينا كامري الهايبرد الجديدة والمحسنة.' 
        : 'A new level of possibilities. Welcome to the enhanced all-new Camry Hybrid.',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-mobile-343x514.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'jameel-care',
      title: language === 'ar' ? 'برنامج العناية الممتدة لسيارة الهايبرد' : 'Hybrid Extended Care Program',
      description: language === 'ar' 
        ? 'تشارك سولينا في البحث والتطوير لمجموعة واسعة من السيارات الصديقة للبيئة.' 
        : 'Solina is committed to exceptional service and reliable extended care programs.',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/jameel-care-program-478x717-eng.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/mobile-343x514-eng.webp?w=1920&q=75&f=webp'
    }
  ];

  return (
    <section id="discover-toyota" className="py-16 bg-white font-arabic">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        {/* Exact Solina SA Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-2 tracking-tight">
          {language === 'ar' ? 'اكتشف سولينا' : 'Discover Solina'}
        </h2>
        <p className="text-lg md:text-xl text-black font-normal font-arabic mb-10">
          {language === 'ar' ? 'ابتكار تثق به' : 'Innovation You Trust'}
        </p>

        {/* 3 Story Cards Grid matching Solina SA 1:1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer aspect-[478/717] bg-gray-900 flex flex-col justify-end text-white p-6 md:p-8 text-right"
            >
              {/* Responsive Card Image */}
              <picture className="absolute inset-0 z-0">
                <source media="(max-width: 767px)" srcSet={story.mobileImage} />
                <img
                  src={story.desktopImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </picture>

              {/* Gradient overlay for perfect readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Text info bottom */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-arabic mb-3">
                  {story.title}
                </h3>
                <p className="text-sm md:text-base text-gray-200 font-normal leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Outline Pill Button matching Solina SA */}
        <div>
          <a
            href="#tech-simulator"
            className="inline-block px-8 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white font-normal text-base transition-all duration-200 cursor-pointer"
          >
            {language === 'ar' ? 'استكشف المزيد من المقالات' : 'Explore More Articles'}
          </a>
        </div>
      </div>
    </section>
  );
};
