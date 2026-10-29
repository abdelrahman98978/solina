import React from 'react';
import { Wrench, MapPin, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuickServicesBarProps {
  onOpenTestDrive: () => void;
  onOpenServiceBooking: () => void;
}

export const QuickServicesBar: React.FC<QuickServicesBarProps> = ({
  onOpenServiceBooking
}) => {
  const { language } = useLanguage();

  const services = [
    {
      id: 'book-service',
      title: language === 'ar' ? 'حجز خدمة' : 'Book a Service',
      icon: Wrench,
      action: 'service'
    },
    {
      id: 'find-center',
      title: language === 'ar' ? 'ابحث عن مركز' : 'Find a Centre',
      icon: MapPin,
      action: 'showrooms'
    },
    {
      id: 'offers',
      title: language === 'ar' ? 'إكتشف العروض' : 'Discover Offers',
      icon: Tag,
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
        <h2 className="text-3xl md:text-4xl font-normal text-[#141414] font-arabic mb-10 tracking-tight">
          {language === 'ar' ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
        </h2>

        {/* 3 Pills in a clean flex row */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={() => handleAction(srv.action)}
                className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-white hover:bg-[#f3f3f3] border border-[#e0e0e0] hover:border-[#141414] text-[#141414] transition-all duration-200 shadow-none cursor-pointer min-w-[210px]"
              >
                <Icon className="w-4 h-4 text-[#141414] group-hover:text-red-600 transition-colors" strokeWidth={1.75} />
                <span className="text-base font-normal text-[#141414] font-arabic">
                  {srv.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
