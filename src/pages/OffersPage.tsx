import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Calendar, 
  ShieldCheck, 
  Car, 
  Wrench, 
  Percent, 
  ChevronLeft, 
  PhoneCall, 
  CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NavigationControls } from '../components/NavigationControls';

interface OffersPageProps {
  onBackToHome: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onBackToHome,
  onOpenTestDrive,
  onOpenServiceBooking,
  onSelectVehicle
}) => {
  const { language, isRTL } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'all' | 'service' | 'finance' | 'owners'>('all');

  const offers = [
    {
      id: 'hev-10years',
      category: 'owners',
      titleAr: 'HEV راحة بال تصل إلى 10 سنوات',
      titleEn: 'HEV Peace of Mind Up to 10 Years',
      subtitleAr: 'برنامج حماية بطارية الهايبرد الممتد حتى 10 سنوات أو 240,000 كم',
      subtitleEn: 'Extended Hybrid Battery Protection up to 10 Years or 240,000 km',
      badgeAr: 'برنامج جميل كير',
      badgeEn: 'Jameel Care Program',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/hewvew/offer-card-arab-eng/offer-card-647x485-arab-eng/offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      expiryAr: 'يسري حتى نهاية 2026',
      expiryEn: 'Valid through end of 2026',
      actionType: 'service',
      actionLabelAr: 'حجز موعد خدمة',
      actionLabelEn: 'Book Service'
    },
    {
      id: 'veloz-5years',
      category: 'finance',
      titleAr: '5 سنوات مع فيلوز - راحة بال لا تنتهي',
      titleEn: '5 Years with Veloz - Endless Peace of Mind',
      subtitleAr: 'صيانة دورية مجانية حتى 5 سنوات / 100,000 كم مع تمويل ميسر',
      subtitleEn: 'Free Scheduled Maintenance for 5 Years / 100,000 km with Easy Financing',
      badgeAr: 'عرض تمويل حصري',
      badgeEn: 'Exclusive Finance Offer',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/veloz/offer-card/647x485/veloz-offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      expiryAr: 'عرض لفترة محدودة',
      expiryEn: 'Limited Time Offer',
      actionType: 'testDrive',
      modelName: 'سولينا فيلوز 2026',
      actionLabelAr: 'طلب تجربة قيادة',
      actionLabelEn: 'Book Test Drive'
    },
    {
      id: 'camry-finance',
      category: 'finance',
      titleAr: 'عرض التمويل التأجيري على كامري 2026',
      titleEn: 'Camry 2026 Lease Financing Campaign',
      subtitleAr: 'قسط شهري ميسر يبدأ من 1,199 ﷼ بدون دفعة أولى وبدون رسوم إدارية',
      subtitleEn: 'Monthly installment starting from SAR 1,199 with 0% down payment and 0% admin fees',
      badgeAr: 'تمويل إسلامي معتمد',
      badgeEn: 'Sharia Compliant',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp',
      expiryAr: 'ساري حتى نفاد الكمية',
      expiryEn: 'While stocks last',
      actionType: 'testDrive',
      modelName: 'سولينا كامري 2026',
      actionLabelAr: 'طلب عرض سعر',
      actionLabelEn: 'Request Quote'
    },
    {
      id: 'express-service-offer',
      category: 'service',
      titleAr: 'خدمة الصيانة السريعة خلال 45 دقيقة',
      titleEn: '45-Minute Express Maintenance Package',
      subtitleAr: 'فحص 24 نقطة حيوية + تغيير زيت وفلتر سولينا الأصلي مع غسيل مجاني',
      subtitleEn: '24-point vehicle inspection + Genuine Solina oil & filter replacement with complimentary wash',
      badgeAr: 'خدمة سريعة معتمدة',
      badgeEn: 'Certified Express',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/backtoschool/btsurben-cruiser--velozwebsite-bannersdt1870x850ar.webp?w=1920&q=75&f=webp',
      expiryAr: 'مستمر في جميع الفروع',
      expiryEn: 'Available across all branches',
      actionType: 'service',
      actionLabelAr: 'حجز صيانة سريعة',
      actionLabelEn: 'Book Express Service'
    },
    {
      id: 'trade-in-autohub',
      category: 'finance',
      titleAr: 'برنامج استبدال سيارتك المستعملة مع أوتوهب',
      titleEn: 'Used Vehicle Trade-In Program via AutoHub',
      subtitleAr: 'احصل على أعلى تثمين معتمد لسيارتك القديمة مع مكافأة استبدال تصل إلى 5,000 ﷼',
      subtitleEn: 'Get the highest certified valuation for your old car with trade-in bonus up to SAR 5,000',
      badgeAr: 'تثمين فوري معتمد',
      badgeEn: 'Certified Instant Appraisal',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/offers/auto-hub-750x540.jpg',
      expiryAr: 'ساري طوال العام',
      expiryEn: 'Valid all year',
      actionType: 'testDrive',
      modelName: 'استبدال سيارة مستعملة',
      actionLabelAr: 'طلب تثمين واستبدال',
      actionLabelEn: 'Request Valuation'
    },
    {
      id: 'fleet-corporate-offers',
      category: 'owners',
      titleAr: 'حلول أساطيل الشركات وعروض قطاع الأعمال',
      titleEn: 'Corporate Fleet Solutions & B2B Packages',
      subtitleAr: 'باقات صيانة مخصصة وعقود تأجير تشغيلي لأسطول هايلوكس، لاندكروزر، وهاي إيس',
      subtitleEn: 'Customized maintenance packages and operational leasing for Hilux, Land Cruiser, and Hiace fleets',
      badgeAr: 'قطاع الأعمال B2B',
      badgeEn: 'Corporate Solutions',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/hilux-306x122.webp',
      expiryAr: 'عروض سنوية مخصصة',
      expiryEn: 'Custom Annual Contracts',
      actionType: 'testDrive',
      modelName: 'أسطول شركات',
      actionLabelAr: 'طلب استشارة أسطول',
      actionLabelEn: 'Corporate Inquiry'
    }
  ];

  const filteredOffers = selectedTab === 'all' 
    ? offers 
    : offers.filter(o => o.category === selectedTab);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-arabic flex flex-col">
      <Header
        onOpenTestDrive={onOpenTestDrive}
        onOpenServiceBooking={onOpenServiceBooking}
        onOpenCompare={() => {}}
        comparisonCount={0}
        onSelectCategory={() => onBackToHome()}
        onSelectVehicle={onSelectVehicle}
      />

      <main className="flex-1">
        {/* Hero Section matching Solina SA Offers */}
        <div className="relative w-full h-[360px] md:h-[420px] bg-black overflow-hidden flex items-center justify-center text-center">
          <img
            src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover/hero-banner-service.jpg"
            alt="Solina Offers"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Breadcrumb & Navigation Controls */}
          <div className="absolute top-6 right-6 md:right-12 z-30">
            <NavigationControls 
              onBack={onBackToHome} 
              onHome={onBackToHome} 
              currentPageTitle={language === 'ar' ? 'العروض الحصرية' : 'Offers'}
            />
          </div>

          <div className="relative z-20 max-w-3xl px-4 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0056B3] text-white text-xs font-bold tracking-wider">
              {language === 'ar' ? 'عروض حصرية معتمدة' : 'Official Exclusive Campaigns'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-arabic">
              {language === 'ar' ? 'العروض' : 'Offers'}
            </h1>
            <p className="text-gray-200 text-sm md:text-lg font-light max-w-xl mx-auto">
              {language === 'ar'
                ? 'اكتشف أحدث العروض على مركبات سولينا، باقات التمويل الميسرة، وبرامج الصيانة المعتمدة'
                : 'Discover the latest official Solina vehicle campaigns, tailored finance packages, and service offers'}
            </p>
          </div>
        </div>

        {/* Filter Tabs matching Solina SA */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center gap-6 md:gap-16 overflow-x-auto no-scrollbar py-4">
            {[
              { id: 'all', label: language === 'ar' ? 'الجميع' : 'All Offers' },
              { id: 'service', label: language === 'ar' ? 'عروض الصيانة' : 'Service Offers' },
              { id: 'finance', label: language === 'ar' ? 'تمويل' : 'Finance' },
              { id: 'owners', label: language === 'ar' ? 'الملاك' : 'Owners' }
            ].map(tab => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`text-base md:text-lg font-bold pb-2 transition-all cursor-pointer relative ${
                    isActive ? 'text-black font-extrabold' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#0056B3] rounded-t-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Offers Grid */}
        <section className="py-16 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map(offer => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#0056B3] hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Stage */}
                <div className="h-56 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={offer.image}
                    alt={offer.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/20">
                    {language === 'ar' ? offer.badgeAr : offer.badgeEn}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0056B3]" />
                      <span>{language === 'ar' ? offer.expiryAr : offer.expiryEn}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0056B3] transition-colors leading-snug mb-2 font-arabic">
                      {language === 'ar' ? offer.titleAr : offer.titleEn}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {language === 'ar' ? offer.subtitleAr : offer.subtitleEn}
                    </p>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        if (offer.actionType === 'service') {
                          onOpenServiceBooking();
                        } else {
                          onOpenTestDrive(offer.modelName);
                        }
                      }}
                      className="w-full py-3.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{language === 'ar' ? offer.actionLabelAr : offer.actionLabelEn}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
