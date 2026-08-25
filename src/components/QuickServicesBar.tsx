import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface QuickServicesBarProps {
  onOpenTestDrive: () => void;
  onOpenServiceBooking: () => void;
}

export const QuickServicesBar: React.FC<QuickServicesBarProps> = ({
  onOpenTestDrive,
  onOpenServiceBooking
}) => {
  const { language } = useLanguage();

  const services = [
    {
      id: 'book-service',
      title: language === 'ar' ? 'حجز خدمة' : 'Book a Service',
      iconUrl: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/bookservice.png?w=64&q=75&f=webp',
      action: 'service'
    },
    {
      id: 'find-center',
      title: language === 'ar' ? 'ابحث عن مركز' : 'Find a Centre',
      iconUrl: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/findacentre-latest.png?w=64&q=75&f=webp',
      action: 'showrooms'
    },
    {
      id: 'offers',
      title: language === 'ar' ? 'إكتشف العروض' : 'Discover Offers',
      iconUrl: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/offers-latest.png?w=64&q=75&f=webp',
      action: 'offers'
    }
  ];

  const handleAction = (action: string) => {
    if (action === 'service') {
      onOpenServiceBooking();
    } else if (action === 'offers') {
      const el = document.getElementById('offers');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'showrooms') {
      const el = document.getElementById('showrooms');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1720px] mx-auto px-4 text-center">
        {/* Solina SA Official Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-black font-arabic mb-10 tracking-tight">
          {language === 'ar' ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
        </h2>

        {/* 3 Pills in a clean flex row */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {services.map((srv) => (
            <button
              key={srv.id}
              onClick={() => handleAction(srv.action)}
              className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 hover:border-black text-black transition-all duration-200 shadow-none cursor-pointer min-w-[210px]"
            >
              <img 
                src={srv.iconUrl} 
                alt={srv.title} 
                className="w-5 h-5 object-contain"
              />
              <span className="text-base font-normal text-black font-arabic">
                {srv.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
