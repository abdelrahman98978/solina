import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Car } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <footer className="w-full bg-[#F8F9FA] text-black text-sm font-arabic border-t border-gray-200">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 py-14">
        {/* Top 5-Column Navigation Grid matching Solina SA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 items-start text-right">
          
          {/* Column 1 (Right in RTL): Brand Emblem & Language Toggle */}
          <div className="space-y-5">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <button 
                onClick={() => language !== 'ar' && toggleLanguage()}
                className={`hover:text-[#0056B3] transition-colors cursor-pointer ${language === 'ar' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
              >
                ع
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`hover:text-[#0056B3] transition-colors cursor-pointer ${language === 'en' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
              >
                EN
              </button>
            </div>

            {/* Solina Motors Official Logo */}
            <div className="flex items-center">
              <img 
                src="/solina-logo.png" 
                alt="سولينا للسيارات - Solina Motors" 
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </div>

          {/* Column 2: أخرى */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-black">
              {language === 'ar' ? 'أخرى' : 'Other'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-normal">
              <li>
                <a href="#b2b-cars" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'مبيعات السيارات B2B' : 'B2B Car Sales'}
                </a>
              </li>
              <li>
                <a href="#b2b-parts" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'مبيعات قطع الغيار B2B' : 'B2B Parts Sales'}
                </a>
              </li>
              <li>
                <a href="#explore-vehicles" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'المركبات' : 'Vehicles'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: تواصل معنا */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-black">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-normal">
              <li>
                <a href="#faq" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </a>
              </li>
              <li>
                <a href="tel:8002444400" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'اتصل بنا (800 244 4400)' : 'Call Us (800 244 4400)'}
                </a>
              </li>
              <li>
                <a href="#guest-commitment" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'معلومات عنا' : 'About Us'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: الأدوات والخدمات */}
          <div className="space-y-3.5">
            <h4 className="text-base font-bold text-black">
              {language === 'ar' ? 'الأدوات والخدمات' : 'Tools & Services'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-normal">
              <li>
                <a href="#showrooms" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'فروعنا' : 'Our Branches'}
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'حجز الصيانة' : 'Book a Service'}
                </a>
              </li>
              <li>
                <a href="#parts" className="hover:text-[#0056B3] transition-colors">
                  {language === 'ar' ? 'مبيعات قطع الغيار' : 'Spare Parts Sales'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 (Left in RTL): Solina Logo & Social Icons */}
          <div className="space-y-4 flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-2">
              <img 
                src="/solina-logo.png" 
                alt="Solina Motors" 
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#0056B3] hover:border-[#0056B3] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/instagram.png?h=24&iar=0&w=24" alt="Instagram" className="w-4 h-4 object-contain" />
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#0056B3] hover:border-[#0056B3] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/youtube.png?h=24&iar=0&w=24" alt="YouTube" className="w-4 h-4 object-contain" />
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#0056B3] hover:border-[#0056B3] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/twitter.png?h=24&iar=0&w=24" alt="Twitter" className="w-4 h-4 object-contain" />
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#0056B3] hover:border-[#0056B3] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/facebook.png?h=24&iar=0&w=24" alt="Facebook" className="w-4 h-4 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice and Registration Numbers matching Solina SA */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5 font-normal">
            <a href="#" className="hover:text-black transition-colors">{language === 'ar' ? 'سياسة الخصوصية وملفات تعريف الارتباط' : 'Privacy & Cookies Policy'}</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-black transition-colors">{language === 'ar' ? 'سياسة الموقع' : 'Terms & Conditions'}</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-black transition-colors">{language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-black transition-colors">{language === 'ar' ? 'إدارة التفضيلات' : 'Cookie Preferences'}</a>
          </div>

          <div className="text-center lg:text-left text-gray-500 text-[11px] leading-relaxed">
            <p>
              شركة سولينا للسيارات المحدودة - سجل تجاري: 4030794548 - تسجيل ضريبة القيمة المضافة: 300159478400003
            </p>
            <p className="font-semibold text-gray-600 mt-0.5">
              جميع الحقوق محفوظة © 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
