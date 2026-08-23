import React from 'react';
import { Phone, Mail, MapPin, Globe, ChevronUp, Shield, Sparkles, Car, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0E17] text-gray-400 text-xs border-t border-white/10">
      {/* Support & Contact Strip matching Toyota SA */}
      <div className="bg-[#0F1424] border-b border-white/10 py-6 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-white font-bold text-sm block">
                {language === 'ar' ? 'مركز العناية بضيوف شركة جبراني للسيارات:' : 'Al-Jabrani Motors Guest Care Center:'}
              </span>
              <div className="flex items-center gap-3 mt-0.5">
                <a href="tel:8002444400" className="text-xl font-black text-white font-mono hover:text-blue-400 transition-colors">
                  800 244 4400
                </a>
                <span className="text-[11px] text-gray-400 font-normal">
                  {language === 'ar' ? '(رقم مجاني لجميع مناطق المملكة 24/7)' : '(Toll-free across KSA 24/7)'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#showrooms"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-white/15 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{language === 'ar' ? 'مواقع الفروع ومراكز الخدمة' : 'Showrooms & Service Centers'}</span>
            </a>

            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-white/15 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-yellow-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md"
              title={language === 'ar' ? 'العودة لأعلى الصفحة' : 'Back to top'}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Matrix matching Toyota SA structure */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center p-1.5 border border-gray-200 shadow-md">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8ZM50 86.5C29.8 86.5 13.5 70.2 13.5 50C13.5 29.8 29.8 13.5 50 13.5C70.2 13.5 86.5 29.8 86.5 50C86.5 70.2 70.2 86.5 50 86.5Z"
                    fill="#1A56DB"
                  />
                  <ellipse cx="50" cy="50" rx="38" ry="18" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                  <ellipse cx="50" cy="38" rx="16" ry="24" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black text-white block font-display tracking-tight">TOYOTA & LEXUS</span>
                <span className="text-[11px] text-blue-400 font-bold">
                  {language === 'ar' ? 'شركة جبراني للسيارات' : 'Al-Jabrani Motors'}
                </span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              {language === 'ar'
                ? 'الموزع والوكيل المعتمد لسيارات تويوتا ولكزس في المملكة العربية السعودية. نوفر أحدث الموديلات 2026، باقات الصيانة الشاملة، وقطع الغيار الأصلية مع تطبيق أعلى معايير الضيافة والاهتمام بالضيوف.'
                : 'Authorized distributor for Toyota & Lexus in Saudi Arabia. Offering the complete 2026 fleet, certified express servicing, and 100% genuine parts under the Guest First philosophy.'}
            </p>

            {/* Social Media Channels */}
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <div className="pt-3 text-[11px] text-gray-500 font-mono space-y-1">
              <div>{language === 'ar' ? 'السجل التجاري (CR): 4030794548' : 'Commercial Registration (CR): 4030794548'}</div>
              <div>{language === 'ar' ? 'الرقم الضريبي (VAT ID): 300159478400003' : 'VAT Registration: 300159478400003'}</div>
            </div>
          </div>

          {/* Column 1: Tools & Services (الأدوات والخدمات) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-display">
              {language === 'ar' ? 'الأدوات والخدمات' : 'Tools & Services'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#showrooms" className="hover:text-white transition-colors">{language === 'ar' ? 'فروعنا وصالات العرض' : 'Find a Centre'}</a></li>
              <li><a href="#quick-services" className="hover:text-white transition-colors">{language === 'ar' ? 'حجز الصيانة الدورية' : 'Book a Service'}</a></li>
              <li><a href="#spare-parts" className="hover:text-white transition-colors">{language === 'ar' ? 'مبيعات قطع الغيار الأصلية' : 'Genuine Spare Parts'}</a></li>
              <li><a href="#finance" className="hover:text-white transition-colors">{language === 'ar' ? 'حاسبة التمويل والأقساط' : 'Finance Calculator'}</a></li>
              <li><a href="#explore-vehicles" className="hover:text-white transition-colors">{language === 'ar' ? 'استكشف جميع المركبات' : 'Explore Vehicles'}</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">{language === 'ar' ? 'استوديو التخصيص 360°' : '360° Customizer Studio'}</a></li>
            </ul>
          </div>

          {/* Column 2: Contact & Support (تواصل معنا) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-display">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#quick-services" className="hover:text-white transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
              <li><a href="tel:8002444400" className="hover:text-white transition-colors">{language === 'ar' ? 'اتصل بخدمة الضيوف' : 'Call Guest Service'}</a></li>
              <li><a href="#quick-services" className="hover:text-white transition-colors">{language === 'ar' ? 'حجز موعد تجربة قيادة' : 'Book a Test Drive'}</a></li>
              <li><a href="#certified-preowned" className="hover:text-white transition-colors">{language === 'ar' ? 'سيارات جبراني هب المعتمدة' : 'AutoHub Certified Cars'}</a></li>
              <li><a href="#cinema" className="hover:text-white transition-colors">{language === 'ar' ? 'سينما تدشين السيارات 4K' : 'Toyota Cinema 4K'}</a></li>
            </ul>
          </div>

          {/* Column 3: Corporate & B2B (قطاع الأعمال B2B وعن الشركة) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-display">
              {language === 'ar' ? 'قطاع الأعمال وعن الشركة' : 'Corporate B2B & About'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#explore-vehicles" className="hover:text-white transition-colors">{language === 'ar' ? 'مبيعات سيارات الأسطول B2B' : 'Fleet & Corporate Sales'}</a></li>
              <li><a href="#spare-parts" className="hover:text-white transition-colors">{language === 'ar' ? 'مبيعات قطع الغيار بالجملة' : 'B2B Parts Supply'}</a></li>
              <li><a href="#discover-toyota" className="hover:text-white transition-colors">{language === 'ar' ? 'التزامنا نحو ضيوفنا' : 'Our Guest Commitment'}</a></li>
              <li><a href="#discover-toyota" className="hover:text-white transition-colors">{language === 'ar' ? 'تقنية تويوتا الهايبرد HEV' : 'Toyota Hybrid Tech'}</a></li>
              <li><a href="#gr-performance" className="hover:text-white transition-colors">{language === 'ar' ? 'فريق تويوتا جازو للسباقات GR' : 'Gazoo Racing (GR)'}</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal Bar matching Toyota SA */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            {language === 'ar'
              ? '© 2026 شركة جبراني للسيارات. جميع الحقوق محفوظة. تويوتا ولكزس هي علامات تجارية مسجلة لشركة تويوتا موتور كوربوريشن.'
              : '© 2026 Al-Jabrani Motors. All Rights Reserved. Toyota & Lexus are registered trademarks of Toyota Motor Corporation.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="hover:text-gray-300 transition-colors">{language === 'ar' ? 'سياسة الخصوصية وملفات تعريف الارتباط' : 'Privacy & Cookies'}</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">{language === 'ar' ? 'سياسة الموقع' : 'Site Policy'}</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">{language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">{language === 'ar' ? 'إدارة التفضيلات' : 'Cookie Preferences'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
