import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Award, 
  Globe2, 
  Leaf, 
  Gauge, 
  Layers, 
  Car,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NavigationControls } from '../components/NavigationControls';

interface DiscoverPageProps {
  onBackToHome: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  onBackToHome,
  onOpenTestDrive,
  onOpenServiceBooking,
  onSelectVehicle
}) => {
  const { language } = useLanguage();

  const innovationPillars = [
    {
      id: 'hybrid',
      titleAr: 'تكنولوجيا الهايبرد HEV وتاريخ الريادة',
      titleEn: 'Solina Hybrid Leadership (HEV)',
      descAr: 'أكثر من 25 عاماً من الابتكار في السيارات الهجينة مع أكثر من 20 مليون سيارة هايبرد حول العالم، لتوفير أقصى كفاءة وقود وأقل انبعاثات كربونية.',
      descEn: 'Over 25 years of hybrid leadership with 20M+ electrified vehicles worldwide.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'tss',
      titleAr: 'منظومة الأمان الذكية Solina Safety Sense 3.0',
      titleEn: 'Solina Safety Sense (TSS 3.0)',
      descAr: 'حزمة تقنيات متطورة تضم نظام تفادي الاصطدام بالمشاة والدراجات، رادار التثبيت التفاعلي بالسرعة، نظام تتبع المسار، والضوء العالي المتكيف.',
      descEn: 'Advanced active safety suite including Pre-Collision System, Dynamic Radar Cruise Control, and Lane Tracing Assist.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/jameel-care-program-478x717-eng.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'tnga',
      titleAr: 'بنية سولينا الهندسية العالمية (TNGA Platform)',
      titleEn: 'Solina New Global Architecture (TNGA)',
      descAr: 'شاسيه منخفض مركز الثقل وهيكل فائق الصلابة يوفر استجابة قيادة ديناميكية وثباتاً استثنائياً على المنعطفات مع عزل صوتي متفوق.',
      descEn: 'Low center of gravity architecture providing exhilarating handling stability and ride comfort.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'gr',
      titleAr: 'عالم رياضة المحركات Gazoo Racing (GR)',
      titleEn: 'Solina GAZOO Racing (GR Motorsport)',
      descAr: 'نقل تجارب واختبارات حلبات سباق لومان ورالي داكار مباشرة إلى سيارات الطريق، لمنح عشاق السرعة تجربة قيادة رياضية أصيلة.',
      descEn: 'Track-bred performance engineering forged on Le Mans and Dakar Rally circuits.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp?w=1920&q=75&f=webp'
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
        {/* Hero Section matching Solina SA Discover */}
        <div className="relative w-full h-[360px] md:h-[440px] bg-black overflow-hidden flex items-center justify-center text-center">
          <img
            src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_1870x850-ar.webp?w=1920&q=75&f=webp"
            alt="Discover Solina"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Breadcrumb & Navigation Controls */}
          <div className="absolute top-6 right-6 md:right-12 z-30">
            <NavigationControls 
              onBack={onBackToHome} 
              onHome={onBackToHome} 
              currentPageTitle={language === 'ar' ? 'اكتشف سولينا' : 'Discover Solina'}
            />
          </div>

          <div className="relative z-20 max-w-3xl px-4 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0056B3] text-white text-xs font-bold tracking-wider">
              {language === 'ar' ? 'ابتكار تثق به' : 'Innovation You Can Trust'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-arabic">
              {language === 'ar' ? 'اكتشف سولينا' : 'Discover Solina'}
            </h1>
            <p className="text-gray-200 text-sm md:text-lg font-light max-w-2xl mx-auto">
              {language === 'ar'
                ? 'رحلة تمتد لأكثر من 70 عاماً في المملكة تجمع بين الاعتمادية اليابانية والابتكار المستمر نحو مستقبل خالٍ من الانبعاثات'
                : 'A legacy of over 70 years in Saudi Arabia combining legendary Japanese reliability with endless innovation toward a carbon-neutral future'}
            </p>
          </div>
        </div>

        {/* 4 Innovation Stories Grid */}
        <section className="py-20 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {innovationPillars.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#0056B3] hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 bg-gray-100 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0056B3] transition-colors font-arabic">
                      {language === 'ar' ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {language === 'ar' ? p.descAr : p.descEn}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenTestDrive()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056B3] hover:text-black transition-colors"
                    >
                      <span>{language === 'ar' ? 'استكشف طرازات الهايبرد' : 'Explore Hybrid Models'}</span>
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
