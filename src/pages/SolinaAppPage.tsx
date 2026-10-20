import React, { useState } from 'react';
import { SolinaAppExperience } from '../components/SolinaAppExperience';
import { NavigationControls } from '../components/NavigationControls';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Smartphone, QrCode, CheckCircle2, X } from 'lucide-react';

interface SolinaAppPageProps {
  onNavigateHome: () => void;
  onNavigateBack: () => void;
  onSelectVehicle?: (vehicleId: string) => void;
  onOpenTestDrive?: (modelName?: string) => void;
  onOpenServiceBooking?: () => void;
}

export const SolinaAppPage: React.FC<SolinaAppPageProps> = ({
  onNavigateHome,
  onNavigateBack,
  onSelectVehicle,
  onOpenTestDrive,
  onOpenServiceBooking
}) => {
  const { language } = useLanguage();
  const { vehicles } = useAdminData();
  const [downloadGuideModal, setDownloadGuideModal] = useState<'ios' | 'android' | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-arabic pt-24 pb-20 overflow-x-hidden">
      
      {/* Top Breadcrumb & Navigation Controls */}
      <NavigationControls
        onHome={onNavigateHome}
        onBack={onNavigateBack}
        currentPageTitle={language === 'ar' ? 'تطبيق سولينا الذكي 2026' : 'Solina Smart App 2026'}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 mt-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive App Highlights & Download Info */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-start">
            
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/30">
                <Smartphone className="w-4 h-4" />
                {language === 'ar' ? `التطبيق الرسمي المعتمد 2026 • ${vehicles.length} طراز متوفر` : `Official Mobile App 2026 • ${vehicles.length} Models`}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                {language === 'ar' ? 'تطبيق سولينا للسيارات' : 'Solina Motors App'}
              </h1>
              <p className="text-xl text-red-500 font-bold">
                {language === 'ar' ? 'كل ما تحتاجه... في تطبيق واحد' : 'All you need... in one app'}
              </p>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl font-light">
                {language === 'ar'
                  ? 'جرب التطبيق التفاعلي المباشر الآن! تصفح سيارات سولينا، جيتور، بي واي دي، هيونداي، ولكزس 2026 مع استوديو الداخليات 360°، المفتاح الذكي الرقمي، وحجز الصيانة الفورية.'
                  : 'Experience the live interactive mobile app now! Browse Solina, Jetour, BYD, Hyundai, and Lexus 2026 models with 360° interiors, Smart Digital Key, and instant service booking.'}
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { titleAr: 'تصفح السيارات والداخليات 360°', descAr: 'استعراض جيتور وبي واي دي وهونداي وسولينا' },
                { titleAr: 'المفتاح الذكي وماسح VIN', descAr: 'تشغيل عن بعد وتكييف مسبق للمقصورة' },
                { titleAr: 'ربط مباشر مع نظام الوكالة ERP', descAr: 'حجز فوري بعربون وفاتورة ZATCA ضريبية' },
                { titleAr: 'طوارئ ومساعد ذكي 24/7', descAr: 'وحدة إنقاذ متنقلة وشهادة ضمان رقمية' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-start space-y-1">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.titleAr}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-light">{item.descAr}</p>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => setDownloadGuideModal('ios')}
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-3 cursor-pointer shadow-xl"
              >
                <div className="text-start">
                  <span className="text-[10px] text-gray-500 block leading-none">Download on the</span>
                  <span className="text-sm font-black">App Store (iOS)</span>
                </div>
              </button>

              <button 
                onClick={() => setDownloadGuideModal('android')}
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-3 cursor-pointer shadow-xl"
              >
                <div className="text-start">
                  <span className="text-[10px] text-gray-500 block leading-none">GET IT ON</span>
                  <span className="text-sm font-black">Google Play (Android)</span>
                </div>
              </button>
            </div>

          </div>

          {/* Right Column: Live Interactive Mobile App Simulator */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <SolinaAppExperience
              onSelectVehicle={onSelectVehicle}
              onOpenTestDrive={onOpenTestDrive}
              onOpenServiceBooking={onOpenServiceBooking}
              isStandalone={true}
            />
          </div>

        </div>

      </div>

      {/* Store / PWA Installation Modal */}
      {downloadGuideModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-white/15 rounded-3xl p-6 text-start space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-black text-white">
                  {downloadGuideModal === 'ios' ? 'تثبيت تطبيق سولينا على آيفون (iOS)' : 'تثبيت تطبيق سولينا على أندرويد (Android)'}
                </h3>
              </div>
              <button onClick={() => setDownloadGuideModal(null)} className="p-1 text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shrink-0">
                <QrCode className="w-20 h-20 text-black" />
              </div>
              <div className="space-y-1 text-xs text-gray-300">
                <strong className="text-white block text-sm">امسح الرمز بكاميرا جوالك</strong>
                <p className="font-light leading-relaxed">
                  يدعم تطبيق سولينا تقنية التطبيقات التقدمية الفورية (PWA) للعمل بكامل الشاشة بدون استهلاك مساحة تخزين.
                </p>
              </div>
            </div>

            <button
              onClick={() => setDownloadGuideModal(null)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl cursor-pointer"
            >
              إغلاق ومتابعة التجربة التفاعلية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
