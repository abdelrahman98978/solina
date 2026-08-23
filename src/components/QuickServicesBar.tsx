import React from 'react';
import { Car, Calculator, Wrench, MapPin, ArrowLeft, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuickServicesBarProps {
  onOpenTestDrive: () => void;
  onOpenServiceBooking: () => void;
}

export const QuickServicesBar: React.FC<QuickServicesBarProps> = ({
  onOpenTestDrive,
  onOpenServiceBooking
}) => {
  const { language, isRTL } = useLanguage();

  const services = [
    {
      id: 'book-service',
      title: 'حجز خدمة صيانة',
      titleEn: 'Book a Service',
      badge: 'خدمة سريعة',
      badgeEn: 'Express Service',
      description: 'احجز موعد الصيانة الدورية لسيارتك في أقرب مركز خدمة معتمد بكل سهولة.',
      descriptionEn: 'Schedule periodic maintenance at your nearest certified service center effortlessly.',
      iconImg: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/bookservice.png?w=64&q=75&f=webp',
      fallbackIcon: <Wrench className="w-6 h-6 text-blue-600" />,
      action: 'service'
    },
    {
      id: 'find-center',
      title: 'ابحث عن مركز وفروعنا',
      titleEn: 'Find a Centre',
      badge: '+70 فرع بالمملكة',
      badgeEn: '70+ Branches',
      description: 'استكشف شبكة صالات العرض ومراكز الصيانة الموزعة استراتيجياً في أنحاء المملكة.',
      descriptionEn: 'Explore our widespread network of showrooms and service centers across KSA.',
      iconImg: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/findacentre-latest.png?w=64&q=75&f=webp',
      fallbackIcon: <MapPin className="w-6 h-6 text-blue-600" />,
      action: 'showrooms'
    },
    {
      id: 'offers',
      title: 'إكتشف أحدث العروض',
      titleEn: 'Discover Latest Offers',
      badge: 'عروض حصرية 2026',
      badgeEn: 'Exclusive Deals',
      description: 'تعرف على أقوى العروض التمويلية، عروض الهايبرد، وباقات الصيانة المجانية المتاحة الآن.',
      descriptionEn: 'Check out the strongest financing offers, hybrid deals, and free maintenance packages.',
      iconImg: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/navigation/quick-links/offers-latest.png?w=64&q=75&f=webp',
      fallbackIcon: <Sparkles className="w-6 h-6 text-blue-600" />,
      action: 'offers'
    },
    {
      id: 'test-drive',
      title: 'طلب تجربة قيادة',
      titleEn: 'Book a Test Drive',
      badge: 'تجربة حية ومجانية',
      badgeEn: 'Complimentary Drive',
      description: 'عش متعة قيادة موديلات تويوتا 2026 بنفسك قبل اتخاذ قرار الشراء.',
      descriptionEn: 'Experience driving the latest 2026 Toyota models firsthand before buying.',
      iconImg: null,
      fallbackIcon: <Car className="w-6 h-6 text-blue-600" />,
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
    <section className="relative z-30 max-w-7xl mx-auto px-4 md:px-12 -mt-10 md:-mt-14 mb-16">
      {/* Section Sub-Title matching Toyota SA */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {language === 'ar' ? 'اختر إحدى الخدمات السريعة لبدء رحلتك مع الجبراني للسيارات' : 'Choose a quick action service to start your journey with Al-Jabrani Motors'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('explore-vehicles');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'استكشف جميع المركبات ←' : 'Explore All Vehicles →'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => handleAction(srv.action)}
              className="group bg-gray-50/60 hover:bg-blue-50/40 rounded-2xl p-5 border border-gray-200/70 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100 p-2.5">
                    {srv.iconImg ? (
                      <img
                        src={srv.iconImg}
                        alt={srv.title}
                        className="w-full h-full object-contain group-hover:brightness-0 group-hover:invert transition-all"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      srv.fallbackIcon
                    )}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-gray-700 border border-gray-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-xs">
                    {language === 'ar' ? srv.badge : srv.badgeEn}
                  </span>
                </div>

                <h3 className="font-bold text-base text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors font-display">
                  {language === 'ar' ? srv.title : srv.titleEn}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {language === 'ar' ? srv.description : srv.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                <span>{language === 'ar' ? 'انتقل للخدمة' : 'Access Service'}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform text-blue-600" />
                ) : (
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-blue-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
