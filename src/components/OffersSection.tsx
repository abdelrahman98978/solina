import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface OffersSectionProps {
  onOpenTestDrive: (offerTitle?: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onOpenTestDrive }) => {
  const { language } = useLanguage();

  const offers = [
    {
      id: 'veloz-5-years',
      title: language === 'ar' ? '5 سنوات مع فيلوز' : '5 Years with Veloz',
      subtitle: language === 'ar' ? 'المزيد من راحة البال تصل إلى: 5 سنوات عناية ومساعدة على الطريق' : 'More peace of mind with 5 years service care',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/veloz/offer-card/647x485/veloz-offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      cta: language === 'ar' ? 'اكتشف المزيد' : 'Learn More'
    },
    {
      id: 'hev-hybrid-offer',
      title: language === 'ar' ? 'HEV راحة بال تصل إلى 10 سنوات' : 'HEV Peace of Mind up to 10 Years',
      subtitle: language === 'ar' ? 'ضمان ممتد على بطاريات كافة موديلات الهايبرد' : 'Extended warranty on all hybrid model batteries',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/hewvew/offer-card-arab-eng/offer-card-647x485-arab-eng/offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      cta: language === 'ar' ? 'اكتشف المزيد' : 'Learn More'
    }
  ];

  return (
    <section id="offers" className="py-16 bg-white font-arabic">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        {/* Centered Heading matching Solina SA */}
        <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-2 tracking-tight">
          {language === 'ar' ? 'أحدث العروض' : 'Latest Offers'}
        </h2>
        <p className="text-lg md:text-xl text-black font-normal font-arabic mb-10">
          {language === 'ar' ? 'قد أكثر وادفع أقل' : 'Drive more, pay less'}
        </p>

        {/* 2 Wide Promotional Banner Cards matching Solina SA 1:1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer aspect-[647/485] bg-gray-100"
              onClick={() => onOpenTestDrive(offer.title)}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Bottom CTA Red Pill matching Solina SA */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <button className="px-8 py-2.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer">
                  {offer.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Outline Pill CTA Button matching Solina SA */}
        <div>
          <button
            onClick={() => onOpenTestDrive(language === 'ar' ? 'كافة العروض الترويجية' : 'All Promotional Deals')}
            className="px-8 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white font-normal text-base transition-all duration-200 cursor-pointer"
          >
            {language === 'ar' ? 'استكشف المزيد من العروض' : 'Explore More Offers'}
          </button>
        </div>
      </div>
    </section>
  );
};
