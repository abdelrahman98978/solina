import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, BadgeCheck, Scale, MessageSquareWarning, BellOff, UserX, Lock } from 'lucide-react';
import { ECommerceComplianceModal, ComplianceModalTab } from './ECommerceComplianceModal';

export const Footer: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<ComplianceModalTab>('checklist');

  const openComplianceTab = (tab: ComplianceModalTab) => {
    setComplianceTab(tab);
    setComplianceModalOpen(true);
  };

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
                className={`hover:text-[#141414] transition-colors cursor-pointer ${language === 'ar' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
              >
                ع
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`hover:text-[#141414] transition-colors cursor-pointer ${language === 'en' ? 'text-black font-extrabold' : 'text-gray-400 font-normal'}`}
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
                <a href="#b2b-cars" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'مبيعات السيارات B2B' : 'B2B Car Sales'}
                </a>
              </li>
              <li>
                <a href="#b2b-parts" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'مبيعات قطع الغيار B2B' : 'B2B Parts Sales'}
                </a>
              </li>
              <li>
                <a href="#explore-vehicles" className="hover:text-[#141414] transition-colors">
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
                <a href="#faq" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </a>
              </li>
              <li>
                <a href="tel:8002444400" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'اتصل بنا (800 244 4400)' : 'Call Us (800 244 4400)'}
                </a>
              </li>
              <li>
                <a href="#guest-commitment" className="hover:text-[#141414] transition-colors">
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
                <a href="#showrooms" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'فروعنا' : 'Our Branches'}
                </a>
              </li>
              <li>
                <a href="#service" className="hover:text-[#141414] transition-colors">
                  {language === 'ar' ? 'حجز الصيانة' : 'Book a Service'}
                </a>
              </li>
              <li>
                <a href="#parts" className="hover:text-[#141414] transition-colors">
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
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#141414] hover:border-[#141414] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/instagram.png?h=24&iar=0&w=24" alt="Instagram" className="w-4 h-4 object-contain" />
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#141414] hover:border-[#141414] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/youtube.png?h=24&iar=0&w=24" alt="YouTube" className="w-4 h-4 object-contain" />
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#141414] hover:border-[#141414] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/twitter.png?h=24&iar=0&w=24" alt="Twitter" className="w-4 h-4 object-contain" />
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:text-[#141414] hover:border-[#141414] transition-colors shadow-2xs">
                <img src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/social-icons/facebook.png?h=24&iar=0&w=24" alt="Facebook" className="w-4 h-4 object-contain" />
              </a>
            </div>
          </div>
        </div>

        {/* Saudi Ministry of Commerce E-Commerce Compliance Banner (Points 1-20 of E-Commerce-Compliance-List.pdf) */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-gray-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141414] text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-[#141414]">
                  {language === 'ar'
                    ? 'متجر إلكتروني موثق وممتثل لنظام التجارة الإلكترونية — وزارة التجارة والمركز السعودي للأعمال'
                    : 'Verified E-Store Compliant with Saudi Ministry of Commerce E-Commerce Law'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#141414] text-white text-[10px] font-bold flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3" />
                  <span>{language === 'ar' ? 'ممتثل 20/20' : '20/20 Verified'}</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {language === 'ar'
                  ? 'السجل التجاري المقيد بالمتجر: 4030794548 (الرقم الموحد: 7001928374) • الرقم الضريبي (VATIN): 310984729100003 • ترخيص رقم: 4401982736 (ساري حتى 2029/12/31م - الجهة المانحة: وزارة التجارة والهيئة العامة للنقل)'
                  : 'Registered CR: 4030794548 (Unified: 7001928374) • VATIN: 310984729100003 • License No: 4401982736 (Valid until 31/12/2029 - Issued by Ministry of Commerce & TGA)'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openComplianceTab('checklist')}
              className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer transition-colors"
            >
              {language === 'ar' ? 'قائمة امتثال وزارة التجارة (20/20)' : 'MC Compliance Checklist (20/20)'}
            </button>
            <button
              type="button"
              onClick={() => openComplianceTab('complaints')}
              className="px-3.5 py-2 rounded-xl bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-bold cursor-pointer transition-colors"
            >
              {language === 'ar' ? 'تقديم شكوى فورية' : 'Submit Complaint'}
            </button>
          </div>
        </div>

        {/* Bottom Legal Notice and Registration Numbers matching Solina SA & E-Commerce Law */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 font-normal">
            <button
              type="button"
              onClick={() => openComplianceTab('privacy_security')}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'سياسة الخصوصية وحماية بيانات المستهلك' : 'Privacy & Consumer Data Protection'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => openComplianceTab('return_policy')}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'سياسة الاستبدال والاسترجاع (7 أيام) والتوصيل' : 'Exchange, Return (7 Days) & Delivery SLA'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => openComplianceTab('complaints')}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <MessageSquareWarning className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إجراءات استقبال الشكاوى ومعالجتها' : 'Complaint Procedures'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => openComplianceTab('account_ads')}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <BellOff className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'وقف الإعلانات الإلكترونية' : 'Stop Electronic Ads'}</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => openComplianceTab('account_ads')}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <UserX className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إلغاء حساب العميل' : 'Cancel Customer Account'}</span>
            </button>
          </div>

          <div className="text-center lg:text-left text-gray-500 text-[11px] leading-relaxed">
            <p>
              شركة سولينا للسيارات المحدودة - سجل تجاري: 4030794548 - الرقم الضريبي: 310984729100003 - ترخيص: 4401982736
            </p>
            <p className="font-semibold text-gray-600 mt-0.5">
              جميع الحقوق محفوظة © 2026 • متوافق مع نظام التجارة الإلكترونية والبنك المركزي السعودي (SAMA)
            </p>
          </div>
        </div>
      </div>

      <ECommerceComplianceModal
        isOpen={complianceModalOpen}
        onClose={() => setComplianceModalOpen(false)}
        initialTab={complianceTab}
      />
    </footer>
  );
};
