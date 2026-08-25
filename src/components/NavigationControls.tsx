import React, { useState, useEffect } from 'react';
import { ArrowRight, Home, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavigationControlsProps {
  onBack?: () => void;
  onHome?: () => void;
  currentPageTitle?: string;
  showFloating?: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBack,
  onHome,
  currentPageTitle,
  showFloating = true
}) => {
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onHome) {
      onHome();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* 1. Header / In-Hero Breadcrumb Controls */}
      <div className="flex items-center gap-2.5 z-30 font-arabic">
        {/* Home Button (زر الرئيسية) */}
        <button
          onClick={handleHome}
          className="flex items-center gap-2 bg-white/95 hover:bg-white text-gray-900 hover:text-[#0056B3] text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-gray-200/80 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title={language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
        >
          <Home className="w-4 h-4 text-[#0056B3] group-hover:scale-110 transition-transform" />
          <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </button>

        {/* Back Button (زر الرجوع) */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-black/60 hover:bg-black/85 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-white/25 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title={language === 'ar' ? 'رجوع للخلف' : 'Go Back'}
        >
          <ArrowRight className="w-4 h-4 text-white group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === 'ar' ? 'رجوع' : 'Back'}</span>
        </button>

        {/* Optional Page Title Pill */}
        {currentPageTitle && (
          <span className="hidden sm:inline-flex items-center text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
            {currentPageTitle}
          </span>
        )}
      </div>

      {/* 2. Floating Quick Navigation Bar (Bottom Corner) */}
      {showFloating && (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2.5 font-arabic">
          {/* Scroll to top button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-white text-gray-800 hover:text-[#0056B3] shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
              title={language === 'ar' ? 'العودة للأعلى' : 'Scroll to top'}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}

          {/* Floating Home & Back Pill */}
          <div className="flex items-center bg-gray-900/90 hover:bg-gray-900 text-white backdrop-blur-md rounded-full p-1.5 shadow-2xl border border-white/20 transition-all">
            <button
              onClick={handleHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
              title={language === 'ar' ? 'الرئيسية' : 'Home'}
            >
              <Home className="w-3.5 h-3.5 text-[#0056B3]" />
              <span className="hidden sm:inline">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </button>

            <span className="w-px h-4 bg-white/20 mx-1"></span>

            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
              title={language === 'ar' ? 'رجوع' : 'Back'}
            >
              <ArrowRight className="w-3.5 h-3.5 text-white" />
              <span>{language === 'ar' ? 'رجوع' : 'Back'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
