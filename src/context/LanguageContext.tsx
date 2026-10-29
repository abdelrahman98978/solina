import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS, type Language } from '../data/translations';
import {
  autoTranslate as autoTranslateUtil,
  detectLanguage as detectLanguageUtil,
  translateDOMSubtree,
  getCustomGlossary,
  saveCustomGlossary,
  CustomGlossaryEntry,
  isAutoTranslationEnabled,
  setAutoTranslationEnabled,
  getTranslationLibraryStats
} from '../utils/autoTranslation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof TRANSLATIONS.ar) => string;
  autoTranslate: (text: string, targetLang?: Language) => string;
  detectLanguage: (text: string) => 'ar' | 'en';
  isRTL: boolean;
  formatPrice: (amount: number) => string;
  autoTranslateEnabled: boolean;
  toggleAutoTranslateEngine: (enabled: boolean) => void;
  customGlossary: CustomGlossaryEntry[];
  addGlossaryTerm: (ar: string, en: string, category?: CustomGlossaryEntry['category']) => void;
  removeGlossaryTerm: (id: string) => void;
  translationStats: ReturnType<typeof getTranslationLibraryStats>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('toyota_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  const [autoTranslateEnabled, setAutoTranslateEnabledState] = useState<boolean>(() =>
    isAutoTranslationEnabled()
  );

  const [customGlossary, setCustomGlossaryState] = useState<CustomGlossaryEntry[]>(() =>
    getCustomGlossary()
  );

  useEffect(() => {
    localStorage.setItem('toyota_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-sans');
    }
  }, [language]);

  // Real-time Automatic DOM Translation Observer (مكتبة الترجمة التلقائية الفورية)
  useEffect(() => {
    if (!autoTranslateEnabled || typeof document === 'undefined') return;

    let rafId: number | null = null;
    let isApplying = false;

    const observer = new MutationObserver(() => {
      if (isApplying) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        runTranslationPass();
        rafId = null;
      });
    });

    const runTranslationPass = () => {
      if (isApplying) return;
      isApplying = true;
      try {
        translateDOMSubtree(document.body, language);
      } finally {
        // Drain any mutation records caused by our own translation pass so observer never loops
        observer.takeRecords();
        isApplying = false;
      }
    };

    // Initial pass when language or glossary changes
    runTranslationPass();

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [language, autoTranslateEnabled, customGlossary]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const toggleAutoTranslateEngine = useCallback((enabled: boolean) => {
    setAutoTranslationEnabled(enabled);
    setAutoTranslateEnabledState(enabled);
  }, []);

  const addGlossaryTerm = useCallback(
    (ar: string, en: string, category: CustomGlossaryEntry['category'] = 'ui') => {
      if (!ar.trim() || !en.trim()) return;
      const next: CustomGlossaryEntry = {
        id: `gloss-${Date.now()}`,
        ar: ar.trim(),
        en: en.trim(),
        category
      };
      const updated = [next, ...getCustomGlossary()];
      saveCustomGlossary(updated);
      setCustomGlossaryState(updated);
    },
    []
  );

  const removeGlossaryTerm = useCallback((id: string) => {
    const updated = getCustomGlossary().filter(item => item.id !== id);
    saveCustomGlossary(updated);
    setCustomGlossaryState(updated);
  }, []);

  const t = useCallback(
    (key: keyof typeof TRANSLATIONS.ar): string => {
      return TRANSLATIONS[language][key] || TRANSLATIONS.ar[key] || '';
    },
    [language]
  );

  const autoTranslate = useCallback(
    (text: string, targetLang?: Language): string => {
      const target = targetLang || language;
      return autoTranslateUtil(text, target);
    },
    [language]
  );

  const formatPrice = useCallback(
    (amount: number): string => {
      if (language === 'ar') {
        return amount.toLocaleString('ar-SA');
      }
      return amount.toLocaleString('en-US');
    },
    [language]
  );

  const translationStats = getTranslationLibraryStats();

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        autoTranslate,
        detectLanguage: detectLanguageUtil,
        isRTL: language === 'ar',
        formatPrice,
        autoTranslateEnabled,
        toggleAutoTranslateEngine,
        customGlossary,
        addGlossaryTerm,
        removeGlossaryTerm,
        translationStats
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
