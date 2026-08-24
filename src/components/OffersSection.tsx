import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface OffersSectionProps {
  onOpenTestDrive: (offerTitle?: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onOpenTestDrive }) => {
  const { language } = useLanguage();

  const offers = [
    {
      id: 'hev-hybrid-offer',
      title: language === 'ar' ? 'عروض منظومة الهايبرد الذكية' : 'Smart Hybrid HEV Offers',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/hewvew/offer-card-arab-eng/offer-card-647x485-arab-eng/offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      cta: language === 'ar' ? 'اكتشف المزيد' : 'Learn More'
    },
    {
      id: 'veloz-5-years',
      title: language === 'ar' ? '5 سنوات راحة بال مع فيلوز' : '5 Years Peace of Mind with Veloz',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/veloz/offer-card/647x485/veloz-offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      cta: language === 'ar' ? 'اكتشف المزيد' : 'Learn More'
    }
  ];

  return (
    <section id="offers" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        {/* Centered Heading matching Toyota SA */}
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 font-display mb-2">
          {language === 'ar' ? 'أحدث العروض' : 'Latest Offers'}
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-medium mb-10">
          {language === 'ar' ? 'قد أكثر وادفع أقل' : 'Drive more, pay less'}
        </p>

        {/* 2 Wide Banner Cards matching Toyota SA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer aspect-[16/10] bg-gray-900"
              onClick={() => onOpenTestDrive(offer.title)}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom CTA Pill matching Toyota SA */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <button className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all duration-300">
                  {offer.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pill CTA Button matching Toyota SA */}
        <div>
          <button
            onClick={() => onOpenTestDrive(language === 'ar' ? 'كافة العروض الترويجية' : 'All Promotional Deals')}
            className="px-8 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer"
          >
            {language === 'ar' ? 'استكشف المزيد من العروض' : 'Explore More Offers'}
          </button>
        </div>
      </div>
    </section>
  );
};
