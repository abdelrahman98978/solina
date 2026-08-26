import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const DiscoverSolinaSection: React.FC = () => {
  const { language } = useLanguage();

  const stories = [
    {
      id: 'electric-future',
      title: language === 'ar' ? 'فخر الصناعة بالسعودية والسيارات الكهربائية' : 'Made in KSA & Electric Mobility',
      description: language === 'ar' 
        ? 'ريادة محلية في تصنيع وتجميع سيارات المستقبل الكهربائية فائقة الأداء من رابغ إلى كافة مدن المملكة.' 
        : 'Pioneering local EV assembly and high-performance sustainable mobility across the Kingdom.',
      desktopImage: 'https://images.unsplash.com/photo-1563720223523-491ff04651de?w=800&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1563720223523-491ff04651de?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'luxury-experience',
      title: language === 'ar' ? 'قمة الفخامة وخدمة الضيوف VIP' : 'Ultra-Luxury & VIP Guest Care',
      description: language === 'ar' 
        ? 'مستوى غير مسبوق من الضيافة السعودية الأصيلة وخدمة تسليم واستلام السيارات من الباب إلى الباب.' 
        : 'Unparalleled Saudi hospitality with white-glove door-to-door concierge service.',
      desktopImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'performance-dunes',
      title: language === 'ar' ? 'قهر التضاريس والسباقات الرياضية' : 'Conquering Dunes & Motorsport Tracks',
      description: language === 'ar' 
        ? 'أقوى أساطير الدفع الرباعي والسيارات الرياضية الخارقة المهيأة لجميع ظروف القيادة الصحراوية والحلبات.' 
        : 'Iconic 4WD legends and track-proven supercars engineered for desert dunes and racetracks.',
      desktopImage: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=800&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section id="discover-solina" className="py-16 bg-white font-arabic">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        {/* Solina Centered Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-2 tracking-tight">
          {language === 'ar' ? 'اكتشف سولينا للسيارات' : 'Discover Solina Motors'}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 font-normal font-arabic mb-10">
          {language === 'ar' ? 'ابتكار تثق به وريادة لا تضاهى' : 'Innovation You Trust & Peerless Leadership'}
        </p>

        {/* 3 Story Cards Grid */}
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  loading="lazy"
                />
              </picture>

              {/* Gradient overlay for perfect readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

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

        {/* Bottom Outline Pill Button */}
        <div>
          <a
            href="#tech-simulator"
            className="inline-block px-8 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white font-normal text-base transition-all duration-200 cursor-pointer"
          >
            {language === 'ar' ? 'استكشف المزيد من الابتكارات' : 'Explore More Innovations'}
          </a>
        </div>
      </div>
    </section>
  );
};
