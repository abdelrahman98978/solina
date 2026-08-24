import React from 'react';
import { Wrench, MapPin, Tag, Car, ArrowLeft, ArrowRight } from 'lucide-react';
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
      icon: (
        <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      action: 'service'
    },
    {
      id: 'find-center',
      title: language === 'ar' ? 'ابحث عن مركز' : 'Find a Centre',
      icon: (
        <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      action: 'showrooms'
    },
    {
      id: 'offers',
      title: language === 'ar' ? 'إكتشف العروض' : 'Discover Offers',
      icon: (
        <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
          <path d="M7 7h.01"/>
        </svg>
      ),
      action: 'offers'
    },
    {
      id: 'test-drive',
      title: language === 'ar' ? 'طلب تجربة قيادة' : 'Test Drive',
      icon: (
        <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      ),
      action: 'test-drive'
    }
  ];

  const handleAction = (action: string) => {
    if (action === 'service') {
      onOpenServiceBooking();
    } else if (action === 'test-drive') {
      onOpenTestDrive();
    } else if (action === 'offers') {
      const el = document.getElementById('offers');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'showrooms') {
      const el = document.getElementById('showrooms');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Toyota SA Exact Centered Title */}
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-display mb-8">
          {language === 'ar' ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
        </h2>

        {/* Horizontal Quick Actions Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {services.map((srv) => (
            <button
              key={srv.id}
              onClick={() => handleAction(srv.action)}
              className="group flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 rounded-full bg-white hover:bg-blue-600 border border-gray-300 hover:border-blue-600 text-gray-800 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer min-w-[200px]"
            >
              <span className="text-gray-700 group-hover:text-white transition-colors">
                {srv.icon}
              </span>
              <span className="text-sm md:text-base font-bold">
                {srv.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
