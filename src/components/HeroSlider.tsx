import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSliderProps {
  onOpenTestDrive?: (modelName?: string) => void;
  onExploreModel?: (modelId: string) => void;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  targetId: string;
  desktopImage: string;
  mobileImage: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenTestDrive, onExploreModel }) => {
  const { language, isRTL } = useLanguage();

  const slides: HeroSlide[] = [
    {
      id: 'rav4-2026',
      title: 'راف فور 2026 الجديدة كلياً',
      subtitle: 'تنبض حياة',
      ctaText: 'اكتشف المزيد',
      targetId: 'rav4',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_1870x850-ar.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_375x666_ar.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'lc300-hev',
      title: 'لاندكروزر 300 هايبرد ماكس',
      subtitle: 'قمة القوة والأداء الهجين',
      ctaText: 'اكتشف المزيد',
      targetId: 'lc300-hev-max',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-1870x850-arab.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-375x666-arab.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'back-to-school',
      title: 'عروض العودة إلى المدارس',
      subtitle: 'فيلوز وأوربان كروزر بأقساط ميسرة',
      ctaText: 'اكتشف المزيد',
      targetId: 'veloz',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/backtoschool/btsurben-cruiser--velozwebsite-bannersdt1870x850ar.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/backtoschool/btsurben-cruiser--velozwebsite-bannersmob375x666ar.webp?w=1920&q=75&f=webp'
    },
    {
      id: 'buy-online',
      title: 'سولينا GR86 و سوبرا',
      subtitle: 'اشترِ سيارتك أونلاين بضغطة زر',
      ctaText: 'اكتشف المزيد',
      targetId: 'gr86',
      desktopImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp?w=1920&q=75&f=webp',
      mobileImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/hero-slider/ar/mobile/buy-it-online-mobile-375x666-arab.webp?w=1920&q=75&f=webp'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-black select-none">
      {/* Slider Viewport */}
      <div className="relative w-full aspect-[1870/850] min-h-[380px] md:min-h-[500px] lg:min-h-[640px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Responsive Background Images */}
            <picture className="w-full h-full">
              <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
              <img
                src={slide.desktopImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>

            {/* Floating CTA Overlay (Official Positioning matching Solina SA) */}
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 sm:pb-12 md:pb-16 z-20 pointer-events-none">
              <button
                onClick={() => {
                  if (onExploreModel) {
                    onExploreModel(slide.targetId);
                  }
                }}
                className="pointer-events-auto bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-sm sm:text-base px-8 sm:px-12 py-2.5 sm:py-3.5 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {slide.ctaText}
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 group cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronRight className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 group cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronLeft className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators / Bar */}
        <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#0056B3]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
