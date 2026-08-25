import React, { useState } from 'react';
import { 
  ArrowRight, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  PhoneCall, 
  Clock, 
  Sparkles, 
  Car, 
  HelpCircle,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NavigationControls } from '../components/NavigationControls';

interface OwnersPageProps {
  onBackToHome: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export const OwnersPage: React.FC<OwnersPageProps> = ({
  onBackToHome,
  onOpenTestDrive,
  onOpenServiceBooking,
  onSelectVehicle
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'schedule' | 'care' | 'calculator' | 'manuals'>('schedule');
  const [selectedMileage, setSelectedMileage] = useState<number>(10000);

  const maintenanceSchedule = [
    {
      km: 10000,
      titleAr: 'صيانة 10,000 كم (أو 6 أشهر)',
      titleEn: '10,000 km Service (or 6 months)',
      price: 495,
      itemsAr: [
        'تغيير زيت المحرك التخليقي بالكامل 0W-20 وفلتر الزيت الأصلي',
        'تدوير الإطارات وضبط ضغط الهواء الأوتوماتيكي',
        'فحص سوائل المكابح، المقود، ومستوى سائل التبريد',
        'فحص نظام التعليق والبطارية الإلكتروني'
      ]
    },
    {
      km: 20000,
      titleAr: 'صيانة 20,000 كم (أو 12 شهر)',
      titleEn: '20,000 km Service (or 12 months)',
      price: 790,
      itemsAr: [
        'جميع بنود صيانة 10,000 كم',
        'استبدال فلتر مكيف الهواء المقصورة ومصفي الغبار',
        'فحص شامل لمنظومة الفرامل الأمامية والخلفية وسماكة الأقمشة',
        'فحص أنظمة الأمان المتطورة TSS وضبط الكاميرات والحساسات'
      ]
    },
    {
      km: 40000,
      titleAr: 'صيانة 40,000 كم (الصيانة الرئيسية)',
      titleEn: '40,000 km Major Service',
      price: 1350,
      itemsAr: [
        'جميع بنود صيانة 20,000 كم',
        'استبدال فلتر هواء المحرك الأصلي وشمعات الاحتراق',
        'تغيير سائل الفرامل وزيت ناقل الحركة CVT/Automatic بالكامل',
        'فحص شامل لنظام التبريد ووصلات الدفع الرباعي 4WD'
      ]
    },
    {
      km: 80000,
      titleAr: 'صيانة 80,000 كم (العناية الشاملة)',
      titleEn: '80,000 km Comprehensive Service',
      price: 1890,
      itemsAr: [
        'فحص واستبدال سيور المحرك ومضخة التبريد إن لزم',
        'فحص نظام الهايبرد HEV وبطارية الجهد العالي عبر الجهاز التشخيصي',
        'تنظيف الثروتل وحساسات الهواء ونظام حقن الوقود EFI',
        'تقرير تشخيص شامل معتمد بـ 45 نقطة'
      ]
    }
  ];

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
        {/* Hero Section matching Solina SA Owners with Solina Grand Showroom Floor */}
        <div className="relative w-full h-[380px] md:h-[460px] bg-black overflow-hidden flex items-center justify-center text-center">
          <img
            src="/solina-showroom-floor.png"
            alt="صالة عرض وخدمات سولينا للسيارات"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Breadcrumb & Navigation Controls */}
          <div className="absolute top-6 right-6 md:right-12 z-30">
            <NavigationControls 
              onBack={onBackToHome} 
              onHome={onBackToHome} 
              currentPageTitle={language === 'ar' ? 'ملاك سولينا' : 'Solina Owners'}
            />
          </div>

          <div className="relative z-20 max-w-3xl px-4 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0056B3] text-white text-xs font-bold tracking-wider">
              {language === 'ar' ? 'خدمات سولينا للسيارات' : 'Official ALJ Ownership Services'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-arabic">
              {language === 'ar' ? 'ملاك سولينا' : 'Solina Owners'}
            </h1>
            <p className="text-gray-200 text-sm md:text-lg font-light max-w-xl mx-auto">
              {language === 'ar'
                ? 'عناية متكاملة لسيارتك بأيدي مهندسين معتمدين وقطع غيار سولينا الأصلية 100%'
                : 'Comprehensive care for your vehicle with certified master technicians and 100% genuine Solina parts'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenServiceBooking}
                className="px-8 py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-sm shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'حجز موعد صيانة إلكتروني' : 'Book Service Online'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillar Quick Actions */}
        <div className="bg-gray-50 py-10 border-b border-gray-200">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  titleAr: 'الصيانة السريعة 45 دقيقة',
                  descAr: 'صيانة دورية معتمدة دون انتظار طويل مع راحة تامة',
                  icon: Clock,
                  action: onOpenServiceBooking
                },
                {
                  titleAr: 'برنامج جميل كير (Jameel Care)',
                  descAr: 'باقات حماية ممتدة وضمان بطاريات الهايبرد حتى 10 سنوات',
                  icon: ShieldCheck,
                  action: () => setActiveTab('care')
                },
                {
                  titleAr: 'قطع الغيار الأصلية 100%',
                  descAr: 'ضمان سنة كاملة على كافة القطع وتركيب معتمد من المصنع',
                  icon: Wrench,
                  action: () => setActiveTab('schedule')
                },
                {
                  titleAr: 'المساعدة على الطريق 24/7',
                  descAr: 'دعم فوري على الرقم المجاني 800 440 0055 في كل مناطق المملكة',
                  icon: PhoneCall,
                  action: () => alert('مركز الاتصال الموحد للمساعدة على الطريق: 8004400055')
                }
              ].map((pill, idx) => (
                <div
                  key={idx}
                  onClick={pill.action}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0056B3] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-[#0056B3] text-[#0056B3] group-hover:text-white flex items-center justify-center transition-colors">
                      <pill.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0056B3] transition-colors">
                      {pill.titleAr}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {pill.descAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance Schedule & Pricing Table */}
        <section className="py-16 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-gray-900 font-arabic mb-3">
              {language === 'ar' ? 'جدول الصيانة الدورية المعتمدة' : 'Official Scheduled Maintenance'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              {language === 'ar'
                ? 'حافظ على أداء وقيمة سيارتك من خلال الالتزام بمواعيد الفحص والصيانة الدورية'
                : 'Maintain vehicle reliability and resale value by following genuine maintenance intervals'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceSchedule.map((sch) => (
              <div
                key={sch.km}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#0056B3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-[#0056B3] bg-red-50 px-2.5 py-1 rounded-full font-mono">
                      {sch.km.toLocaleString()} كم
                    </span>
                    <div className="text-lg font-black text-gray-900 font-mono">
                      <span>{sch.price}</span>
                      <span className="text-xs text-[#0056B3] mr-1">﷼</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 mb-4 font-arabic">
                    {sch.titleAr}
                  </h3>

                  <ul className="space-y-2.5 text-xs text-gray-600 mb-6">
                    {sch.itemsAr.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenServiceBooking}
                  className="w-full py-2.5 rounded-full bg-white hover:bg-[#0056B3] text-gray-900 hover:text-white font-bold text-xs border border-gray-300 hover:border-[#0056B3] transition-all cursor-pointer shadow-sm"
                >
                  {language === 'ar' ? 'حجز هذه الصيانة' : 'Book This Interval'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
