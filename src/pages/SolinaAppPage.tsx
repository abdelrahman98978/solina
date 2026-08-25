import React from 'react';
import { SolinaAppExperience } from '../components/SolinaAppExperience';
import { NavigationControls } from '../components/NavigationControls';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, Download, QrCode, Sparkles, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';

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
                {language === 'ar' ? 'التطبيق الرسمي المعتمد 2026' : 'Official Mobile App 2026'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                {language === 'ar' ? 'تطبيق سولينا للسيارات' : 'Solina Motors App'}
              </h1>
              <p className="text-xl text-red-500 font-bold">
                {language === 'ar' ? 'كل ما تحتاجه... في تطبيق واحد' : 'All you need... in one app'}
              </p>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl font-light">
                {language === 'ar'
                  ? 'جرب التطبيق التفاعلي المباشر الآن! تصفح سيارات 2026، أحدث العروض التمويلية، حجز مواعيد الصيانة، واستكشف أقرب الفروع بكل سهولة.'
                  : 'Experience the live interactive mobile app now! Browse 2026 vehicles, finance offers, book service appointments, and locate showrooms.'}
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { titleAr: 'تصفح السيارات 360°', descAr: 'استعراض دقيق للمواصفات والأسعار' },
                { titleAr: 'عروض حصرية 0%', descAr: 'باقات تمويل وتأجير استثنائية' },
                { titleAr: 'معارض وفروع قريبة', descAr: 'ملاحة ذكية لأكثر من 50 موقعاً' },
                { titleAr: 'دعم ومساعدة 24/7', descAr: 'روبوت ذكي ومساعدة على الطريق' }
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
                onClick={() => alert('جاري توجيهك إلى متجر App Store')}
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-3 cursor-pointer shadow-xl"
              >
                <div className="text-start">
                  <span className="text-[10px] text-gray-500 block leading-none">Download on the</span>
                  <span className="text-sm font-black">App Store</span>
                </div>
              </button>

              <button 
                onClick={() => alert('جاري توجيهك إلى متجر Google Play')}
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-3 cursor-pointer shadow-xl"
              >
                <div className="text-start">
                  <span className="text-[10px] text-gray-500 block leading-none">GET IT ON</span>
                  <span className="text-sm font-black">Google Play</span>
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
    </div>
  );
};
