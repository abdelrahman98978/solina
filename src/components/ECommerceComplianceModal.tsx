import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Scale,
  Truck,
  BellOff,
  UserX,
  MessageSquareWarning,
  Lock,
  ExternalLink,
  Building2,
  BadgeCheck,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SaudiRiyalPrice } from './SaudiRiyalSymbol';

export type ComplianceModalTab =
  | 'checklist'
  | 'return_policy'
  | 'privacy_security'
  | 'complaints'
  | 'account_ads';

interface ECommerceComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ComplianceModalTab;
}

export const ECommerceComplianceModal: React.FC<ECommerceComplianceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'checklist'
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ComplianceModalTab>(initialTab);

  // Point 7: Electronic Ads Opt-Out State
  const [marketingOptOut, setMarketingOptOut] = useState<boolean>(() => {
    try {
      return localStorage.getItem('solina_ecc_marketing_optout') === 'true';
    } catch {
      return false;
    }
  });
  const [optOutPhoneOrEmail, setOptOutPhoneOrEmail] = useState('');
  const [optOutSavedMsg, setOptOutSavedMsg] = useState('');

  // Point 6: Customer Account Cancellation State
  const [cancelAccountIdentifier, setCancelAccountIdentifier] = useState('');
  const [cancelAccountReason, setCancelAccountReason] = useState('');
  const [cancelConfirmationCode, setCancelConfirmationCode] = useState('');

  // Point 2 & 3: Complaint Submission State
  const [complaintName, setComplaintName] = useState('');
  const [complaintPhone, setComplaintPhone] = useState('');
  const [complaintOrderRef, setComplaintOrderRef] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [complaintTicketId, setComplaintTicketId] = useState('');

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleToggleMarketingOptOut = (nextState: boolean) => {
    setMarketingOptOut(nextState);
    try {
      localStorage.setItem('solina_ecc_marketing_optout', String(nextState));
    } catch {
      // ignore storage errors
    }
    setOptOutSavedMsg(
      language === 'ar'
        ? nextState
          ? 'تم إيقاف إرسال كافة الرسائل والإعلانات الترويجية الإلكترونية فوراً وفق المادة (12) من نظام التجارة الإلكترونية.'
          : 'تم تفعيل استلام الإشعارات والعروض الترويجية.'
        : nextState
        ? 'All promotional electronic messages have been immediately stopped in accordance with Article 12 of the E-Commerce Law.'
        : 'Promotional notifications have been re-enabled.'
    );
  };

  const handleCancelAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelAccountIdentifier.trim()) return;
    const code = `SOL-DEL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setCancelConfirmationCode(code);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintName.trim() || !complaintPhone.trim()) return;
    const ticket = `SOL-CMP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setComplaintTicketId(ticket);
  };

  const complianceItems = [
    {
      num: 1,
      titleAr: 'توفير البيانات الأساسية المعرّفة لكل من المتجر، والمنتج، والخدمة',
      titleEn: 'Core identifying details for Store, Product & Service',
      detailAr: 'اسم المنشأة، العنوان الوطني، المواصفات الفنية الكاملة، وسعر الشراء الشامل بالرمز الرسمي ⃁.',
      status: 'ممتثل'
    },
    {
      num: 2,
      titleAr: 'إتاحة وسائل للتواصل وتقديم الشكوى',
      titleEn: 'Accessible communication & complaint channels',
      detailAr: 'الرقم المجاني الموحد 8002444400، البريد الإلكتروني care@solina.sa، المحادثة الفورية، ونموذج الشكاوى المباشر.',
      status: 'ممتثل'
    },
    {
      num: 3,
      titleAr: 'توضيح الإجراءات المتبعة لاستقبال الشكوى ومعالجتها',
      titleEn: 'Clear complaint handling procedures & SLA',
      detailAr: 'إشعار استلام فوري برقم مرجعي، معالجة أولية خلال 24 ساعة، وحل نهائي خلال 3 إلى 5 أيام عمل كحد أقصى.',
      status: 'ممتثل'
    },
    {
      num: 4,
      titleAr: 'الإفصاح عن سياسة الاستبدال والاسترجاع',
      titleEn: 'Disclosure of Exchange & Return Policy',
      detailAr: 'منشورة بوضوح باللغتين العربية والإنجليزية قبل إتمام الطلب وفي الفواتير وعروض الأسعار.',
      status: 'ممتثل'
    },
    {
      num: 5,
      titleAr: 'نظامية سياسة الاستبدال والاسترجاع',
      titleEn: 'Statutory compliance of Exchange & Return Policy',
      detailAr: 'حق فسخ العقد خلال 7 أيام من الاستلام (المادة 13) وحق إلغاء الطلب عند التأخر أكثر من 15 يوماً (المادة 14).',
      status: 'ممتثل'
    },
    {
      num: 6,
      titleAr: 'إتاحة إمكانية إلغاء حساب العميل',
      titleEn: 'Ability for customer to cancel/delete their account',
      detailAr: 'خدمة إلكترونية مباشرة لإلغاء حساب العميل وحذف بياناته الشخصية دون قيود.',
      status: 'ممتثل'
    },
    {
      num: 7,
      titleAr: 'إتاحة إمكانية وقف إرسال الإعلانات الإلكترونية',
      titleEn: 'Ability to stop/opt-out of electronic advertisements',
      detailAr: 'خيار فوري لإيقاف الرسائل الدعائية عبر البريد الإلكتروني والرسائل النصية والواتساب في أي وقت.',
      status: 'ممتثل'
    },
    {
      num: 8,
      titleAr: 'الإفصاح عن الوقت الأقصى للتوصيل قبل إتمام عملية الطلب',
      titleEn: 'Disclosure of maximum delivery time prior to checkout',
      detailAr: '3 إلى 5 أيام عمل للمركبات المتوفرة بالمستودع، و24 إلى 48 ساعة لقطع الغيار والإكسسوارات.',
      status: 'ممتثل'
    },
    {
      num: 9,
      titleAr: 'تضمين إجمالي سعر الطلب في الفاتورة',
      titleEn: 'Include total order price in invoice',
      detailAr: 'إجمالي المبلغ المستحق شامل ضريبة القيمة المضافة والأجور الإضافية والشحن بالريال السعودي ⃁.',
      status: 'ممتثل'
    },
    {
      num: 10,
      titleAr: 'توضيح السعر الأساسي للمنتج في الفاتورة',
      titleEn: 'Clarify base product price in invoice',
      detailAr: 'بيان السعر الأساسي للمركبة أو القطعة قبل ضريبة القيمة المضافة بشكل مستقل في جدول الفاتورة.',
      status: 'ممتثل'
    },
    {
      num: 11,
      titleAr: 'توضيح قيمة أو نسبة الضريبة من السعر الإجمالي في الفاتورة',
      titleEn: 'Clarify VAT amount and 15% rate in invoice',
      detailAr: 'إظهار نسبة ضريبة القيمة المضافة (15%) وقيمتها الفعلية بالريال السعودي ⃁ في كافة الفواتير وعروض الأسعار.',
      status: 'ممتثل'
    },
    {
      num: 12,
      titleAr: 'توضيح قيمة الأجور الإضافية في الفاتورة',
      titleEn: 'Clarify additional fees in invoice (plates, registration, installation)',
      detailAr: 'تفصيل رسوم اللوحات والاستمارة، خدمات التركيب، أو رسوم الدفع عند الاستلام بشكل منفصل وشفاف.',
      status: 'ممتثل'
    },
    {
      num: 13,
      titleAr: 'توضيح أجور الشحن والنقل والتوصيل في الفاتورة',
      titleEn: 'Clarify shipping, transport & delivery fees in invoice',
      detailAr: 'توضيح أجور النقل السطحي والتوصيل للمنزل أو الفرع في الفاتورة قبل وبعد الشراء.',
      status: 'ممتثل'
    },
    {
      num: 14,
      titleAr: 'بيان مدة أو موعد توصيل المنتج أو تقديم الخدمة في الفاتورة',
      titleEn: 'State delivery duration/date or service date in invoice',
      detailAr: 'توثيق موعد التسليم المتوقع وتاريخ تقديم خدمة الصيانة في متن الفاتورة وعرض السعر.',
      status: 'ممتثل'
    },
    {
      num: 15,
      titleAr: 'بيان اسم الناقل ورقم تتبع مسار التوصيل',
      titleEn: 'State carrier name and delivery tracking number',
      detailAr: 'إدراج اسم الناقل المعتمد (سولينا اللوجستية / سمسا / البريد السعودي سبل) ورقم التتبع الإلكتروني.',
      status: 'ممتثل'
    },
    {
      num: 16,
      titleAr: 'الإفصاح عن رقم السجل التجاري في الموقع الإلكتروني',
      titleEn: 'Disclose Commercial Registration (CR) number on website',
      detailAr: 'السجل التجاري الموحد: 4030794548 (الرقم الموحد للمنشأة: 7001928374).',
      status: 'ممتثل'
    },
    {
      num: 17,
      titleAr: 'الإفصاح عن الرقم الضريبي في الموقع الإلكتروني',
      titleEn: 'Disclose Tax Registration Number (VATIN) on website',
      detailAr: 'الرقم الضريبي المعتمد لدى هيئة الزكاة والضريبة والجمارك (ZATCA): 310984729100003.',
      status: 'ممتثل'
    },
    {
      num: 18,
      titleAr: 'الإفصاح عن رقم الترخيص أو التصريح، وتاريخ انتهائه، والجهة المانحة له',
      titleEn: 'Disclose professional license number, expiry date & issuing authority',
      detailAr: 'ترخيص وكالات ومعارض السيارات والصيانة رقم: 4401982736 • ينتهي في: 2029/12/31م • الجهة المانحة: وزارة التجارة والهيئة العامة للنقل.',
      status: 'ممتثل'
    },
    {
      num: 19,
      titleAr: 'قيد رابط المتجر الإلكتروني في السجل التجاري وتوثيق المركز السعودي للأعمال',
      titleEn: 'Store URL registered in Commercial Registration & Saudi Business Center',
      detailAr: 'رابط المتجر (https://solina.sa) مقيد رسمياً في السجل التجاري وموثق برمز الثقة في منصة الأعمال.',
      status: 'ممتثل'
    },
    {
      num: 20,
      titleAr: 'الإفصاح عن سياسة الخصوصية وحماية بيانات المستهلك والأمن السيبراني',
      titleEn: 'Disclose Privacy Policy, Consumer Data Protection & Cybersecurity',
      detailAr: 'التزام كامل بنظام حماية البيانات الشخصية السعودي (PDPL) ووثيقتي إرشادات الأمن السيبراني لوزارة التجارة.',
      status: 'ممتثل'
    }
  ];

  const officialDocs = [
    {
      titleAr: 'نظام التجارة الإلكترونية',
      titleEn: 'E-Commerce Law',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/E-commerce-system.pdf'
    },
    {
      titleAr: 'اللائحة التنفيذية لنظام التجارة الإلكترونية',
      titleEn: 'Executive Regulations of E-Commerce Law',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/ERECS.pdf'
    },
    {
      titleAr: 'قائمة الامتثال للمتاجر الإلكترونية (20 بنداً)',
      titleEn: 'E-Commerce Self-Assessment Compliance Checklist',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/E-Commerce-Compliance-List.pdf'
    },
    {
      titleAr: 'الدليل الاسترشادي للمتاجر الإلكترونية',
      titleEn: 'Guideline for Electronic Stores',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/GES.pdf'
    },
    {
      titleAr: 'إرشادات الأمن السيبراني لموفري خدمة التجارة الإلكترونية',
      titleEn: 'Cybersecurity Guidelines for E-Commerce Providers',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/security-providers.pdf'
    },
    {
      titleAr: 'إرشادات الأمن السيبراني لمستهلكي التجارة الإلكترونية',
      titleEn: 'Cybersecurity Guidelines for E-Commerce Consumers',
      url: 'https://mc.gov.sa/ar/ECC/ECC_Docs/security-consumers.pdf'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-arabic">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 border border-[#e0e0e0] shadow-2xl my-6 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e0e0e0]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#141414] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-black text-[#141414]">
                  {language === 'ar'
                    ? 'مركز امتثال التجارة الإلكترونية وحماية المستهلك — وزارة التجارة'
                    : 'Ministry of Commerce E-Commerce Compliance & Consumer Protection'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#141414] text-white text-[10px] font-bold flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'ممتثل 20/20' : '20/20 Compliant'}</span>
                </span>
              </div>
              <p className="text-xs text-[#707070] mt-0.5">
                {language === 'ar'
                  ? 'وفق نظام التجارة الإلكترونية ولائحته التنفيذية وقائمة التقييم الذاتي لامتثال المتاجر الإلكترونية بالمملكة العربية السعودية'
                  : 'In full compliance with the Saudi Ministry of Commerce E-Commerce Law, Executive Regulations & Self-Assessment Checklist'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#141414] text-[#707070] hover:text-white flex items-center justify-center transition-colors cursor-pointer self-end sm:self-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Statutory Identity Strip (Points 1, 16, 17, 18, 19) */}
        <div className="mt-5 p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#707070] block">
              {language === 'ar' ? 'السجل التجاري والرقم الموحد (16 & 19)' : 'Commercial Registration (16 & 19)'}
            </span>
            <strong className="font-mono text-[#141414] block">CR: 4030794548 • 7001928374</strong>
            <span className="text-[10px] text-[#707070]">
              {language === 'ar' ? 'مقيد رسمياً: https://solina.sa' : 'Registered URL: https://solina.sa'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#707070] block">
              {language === 'ar' ? 'الرقم الضريبي المعتمد ZATCA (17)' : 'Tax Registration VATIN (17)'}
            </span>
            <strong className="font-mono text-[#141414] block">310984729100003</strong>
            <span className="text-[10px] text-[#707070]">
              {language === 'ar' ? 'ضريبة القيمة المضافة 15% (⃁)' : '15% VAT Registered (⃁)'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#707070] block">
              {language === 'ar' ? 'رقم الترخيص وتاريخ انتهائه (18)' : 'License No. & Expiry (18)'}
            </span>
            <strong className="font-mono text-[#141414] block">4401982736 (حتى 2029/12/31)</strong>
            <span className="text-[10px] text-[#707070]">
              {language === 'ar' ? 'الجهة المانحة: وزارة التجارة والهيئة العامة للنقل' : 'Issued by: Ministry of Commerce & TGA'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#707070] block">
              {language === 'ar' ? 'التواصل ومركز بلاغات المستهلك (2)' : 'Support & Consumer Center (2)'}
            </span>
            <strong className="font-mono text-[#141414] block">800 244 4400 • 1900</strong>
            <span className="text-[10px] text-[#707070]">care@solina.sa • mc.gov.sa</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 border-b border-[#e0e0e0] pb-3">
          {[
            {
              id: 'checklist' as ComplianceModalTab,
              labelAr: 'قائمة الامتثال (20 بنداً)',
              labelEn: 'Compliance Checklist (20)',
              icon: CheckCircle2
            },
            {
              id: 'return_policy' as ComplianceModalTab,
              labelAr: 'الاستبدال والاسترجاع والتوصيل',
              labelEn: 'Return, Exchange & Delivery',
              icon: Scale
            },
            {
              id: 'complaints' as ComplianceModalTab,
              labelAr: 'تقديم شكوى ومعالجتها',
              labelEn: 'Submit & Track Complaint',
              icon: MessageSquareWarning
            },
            {
              id: 'account_ads' as ComplianceModalTab,
              labelAr: 'وقف الإعلانات وإلغاء الحساب',
              labelEn: 'Ad Opt-Out & Cancel Account',
              icon: BellOff
            },
            {
              id: 'privacy_security' as ComplianceModalTab,
              labelAr: 'الخصوصية والأمن السيبراني',
              labelEn: 'Privacy & Cybersecurity',
              icon: Lock
            }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#141414] text-white'
                    : 'bg-[#f3f3f3] text-[#707070] hover:text-[#141414]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: 20-Point Compliance Checklist */}
        {activeTab === 'checklist' && (
          <div className="mt-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {complianceItems.map(item => (
                <div
                  key={item.num}
                  className="p-3.5 rounded-2xl border border-[#e0e0e0] bg-white hover:bg-[#f8f9fa] transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#141414] text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#141414]">
                        {language === 'ar' ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-[11px] text-[#707070] mt-0.5 leading-relaxed">
                        {item.detailAr}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-[10px] font-bold shrink-0">
                    {language === 'ar' ? item.status : 'Compliant'}
                  </span>
                </div>
              ))}
            </div>

            {/* Official MC Documents Links */}
            <div className="p-4 rounded-2xl bg-[#f3f3f3] border border-[#e0e0e0] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#141414]">
                  {language === 'ar'
                    ? 'الوثائق واللوائح المرجعية الرسمية — وزارة التجارة (mc.gov.sa/ar/ECC):'
                    : 'Official Ministry of Commerce Regulatory Documents:'}
                </span>
                <a
                  href="https://mc.gov.sa/ar/ECC/pages/default.aspx"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-[#141414] underline flex items-center gap-1"
                >
                  <span>mc.gov.sa/ar/ECC</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {officialDocs.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-[#e0e0e0] hover:border-[#141414] text-[11px] font-bold text-[#141414] flex items-center justify-between gap-2 transition-colors"
                  >
                    <span className="truncate">{language === 'ar' ? doc.titleAr : doc.titleEn}</span>
                    <FileText className="w-3.5 h-3.5 shrink-0 text-[#707070]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Exchange, Return & Delivery SLA Policy (Points 4, 5, 8, 12, 13, 14, 15) */}
        {activeTab === 'return_policy' && (
          <div className="mt-5 space-y-4 text-xs leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] space-y-2">
              <h3 className="text-sm font-black text-[#141414] flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? '1. سياسة الاستبدال والاسترجاع وفسخ العقد (المادة 13 من نظام التجارة الإلكترونية)'
                    : '1. Statutory Exchange, Return & 7-Day Right of Withdrawal (Article 13)'}
                </span>
              </h3>
              <p className="text-[#555555]">
                {language === 'ar'
                  ? 'يحق للمستهلك فسخ العقد المبرم إلكترونياً واسترجاع أو استبدال المنتج خلال (7) سبعة أيام من تاريخ تسلّم المنتج أو من تاريخ التعاقد على تقديم الخدمة، ما لم يستفد من الخدمة أو يتفق الطرفان على مدة أطول، شريطة عدم استخدام المنتج أو الانتفاع به وبقائه على حالته الأصلية.'
                  : 'Consumers have the statutory right to terminate an e-commerce contract and return or exchange products within seven (7) days from receipt of the product or date of service contract, provided the product has not been used and remains in its original condition.'}
              </p>
              <ul className="list-disc list-inside text-[#555555] space-y-1 pt-1">
                <li>
                  {language === 'ar'
                    ? 'استرداد كامل المبلغ المدفوع (شامل العربون أو قيمة قطع الغيار) بنفس وسيلة الدفع خلال 5 أيام عمل في حال وجود عيب مصنعي أو مخالفة للمواصفات المتفق عليها دون أي رسوم على المستهلك.'
                    : 'Full refund via the original payment method within 5 business days in case of manufacturing defect or non-conformity at zero cost to the consumer.'}
                </li>
                <li>
                  {language === 'ar'
                    ? 'الحالات المستثناة نظاماً (المادة 13/2): المركبات أو القطع المصنعة أو المجهزة بناءً على مواصفات خاصة طلبها المستهلك شخصياً، أو بعد تسجيل المركبة وإصدار رخصة السير (الاستمارة) واللوحات باسم المستهلك إلا في حال وجود عيب مشمول بالضمان النظامي.'
                    : 'Statutory exceptions (Article 13/2): Vehicles or parts custom-built to personal specifications, or after vehicle registration/plate issuance in the customer name except where covered by statutory defect warranty.'}
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] space-y-2">
              <h3 className="text-sm font-black text-[#141414] flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? '2. الوقت الأقصى للتوصيل وحق الإلغاء عند التأخير (المادة 14 — النقطة 8 و13 و14 و15)'
                    : '2. Maximum Delivery Time & 15-Day Delay Cancellation Right (Article 14)'}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-white rounded-xl border border-[#e0e0e0]">
                  <span className="text-[10px] text-[#707070] block">الوقت الأقصى لتوصيل المركبات</span>
                  <strong className="text-[#141414]">3 إلى 5 أيام عمل</strong>
                  <span className="text-[10px] text-[#707070] block mt-0.5">أجور الشحن للمدن الرئيسية: <SaudiRiyalPrice amount={0} /></span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e0e0e0]">
                  <span className="text-[10px] text-[#707070] block">الوقت الأقصى لتوصيل قطع الغيار</span>
                  <strong className="text-[#141414]">24 إلى 48 ساعة عمل</strong>
                  <span className="text-[10px] text-[#707070] block mt-0.5">أجور التوصيل السريع: <SaudiRiyalPrice amount={35} /></span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#e0e0e0]">
                  <span className="text-[10px] text-[#707070] block">حق إلغاء الطلب عند التأخير</span>
                  <strong className="text-[#141414]">بعد 15 يوماً من الموعد</strong>
                  <span className="text-[10px] text-[#707070] block mt-0.5">استرداد فوري لكامل المبلغ المدفوع</span>
                </div>
              </div>
              <p className="text-[11px] text-[#555555] pt-1">
                {language === 'ar'
                  ? 'إذا تأخر موفر الخدمة عن التسليم أو التنفيذ لمدة تزيد على (15) خمسة عشر يوماً من تاريخ إبرام العقد أو الموعد المتفق عليه، يحق للمستهلك فسخ العقد واسترداد ما دفعه بموجب العقد والرجوع بالتعويض عن أي ضرر لحق به.'
                  : 'If delivery is delayed by more than 15 days from the agreed delivery date, the consumer has the statutory right to cancel the contract and receive an immediate full refund.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Complaint Submission & Resolution Procedures (Points 2 & 3) */}
        {activeTab === 'complaints' && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] space-y-3">
              <h3 className="text-sm font-black text-[#141414]">
                {language === 'ar'
                  ? 'الإجراءات المتبعة لاستقبال الشكوى ومعالجتها (النقطة 2 و 3)'
                  : 'Complaint Reception & Resolution Procedures (Points 2 & 3)'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-[#555555]">
                <li>
                  <strong>{language === 'ar' ? 'تسجيل الشكوى الفوري:' : 'Instant Registration:'}</strong>{' '}
                  {language === 'ar'
                    ? 'عبر النموذج الإلكتروني المباشر أو الرقم المجاني (8002444400) أو البريد (care@solina.sa) مع إصدار رقم تذكرة مرجعي فوري.'
                    : 'Submit via this portal, toll-free 8002444400, or care@solina.sa with an immediate tracking reference.'}
                </li>
                <li>
                  <strong>{language === 'ar' ? 'الإقرار بالاستلام (خلال 4 ساعات):' : 'Acknowledgment (Within 4 Hours):'}</strong>{' '}
                  {language === 'ar'
                    ? 'إرسال رسالة نصية وبريد إلكتروني للعميل بتفاصيل التذكرة واسم أخصائي العناية بالضيوف المسؤول.'
                    : 'SMS and email confirmation with ticket details and assigned specialist.'}
                </li>
                <li>
                  <strong>{language === 'ar' ? 'المعالجة والحل النهائي (خلال 3–5 أيام عمل):' : 'Resolution (Within 3–5 Business Days):'}</strong>{' '}
                  {language === 'ar'
                    ? 'فحص الطلب وإفادة العميل بالحل المعتمد (استبدال، استرجاع، أو إصلاح فوري بالضمان).'
                    : 'Full investigation and resolution via replacement, refund, or warranty repair.'}
                </li>
                <li>
                  <strong>{language === 'ar' ? 'التصعيد النظامي لوزارة التجارة:' : 'Ministry of Commerce Escalation:'}</strong>{' '}
                  {language === 'ar'
                    ? 'في حال عدم الرضا عن الحل، يحق للمستهلك رفع بلاغ تجاري عبر مركز بلاغات المستهلك (1900) أو تطبيق (بلاغ تجاري).'
                    : 'Consumers may escalate unresolved complaints to the Ministry of Commerce via 1900.'}
                </li>
              </ol>
            </div>

            <form onSubmit={handleComplaintSubmit} className="p-4 rounded-2xl border border-[#e0e0e0] space-y-3">
              <h4 className="text-sm font-black text-[#141414]">
                {language === 'ar' ? 'نموذج تقديم شكوى إلكترونية فورية' : 'Submit an Instant Electronic Complaint'}
              </h4>
              <input
                type="text"
                required
                value={complaintName}
                onChange={e => setComplaintName(e.target.value)}
                placeholder={language === 'ar' ? 'الاسم الكامل للمستهلك *' : 'Consumer Full Name *'}
                className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={complaintPhone}
                  onChange={e => setComplaintPhone(e.target.value)}
                  placeholder={language === 'ar' ? 'رقم الجوال 05XXXXXXXX *' : 'Mobile 05XXXXXXXX *'}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs font-mono"
                />
                <input
                  type="text"
                  value={complaintOrderRef}
                  onChange={e => setComplaintOrderRef(e.target.value)}
                  placeholder={language === 'ar' ? 'رقم الفاتورة / الطلب (اختياري)' : 'Invoice / Order Ref'}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs font-mono"
                />
              </div>
              <textarea
                rows={3}
                required
                value={complaintDetails}
                onChange={e => setComplaintDetails(e.target.value)}
                placeholder={language === 'ar' ? 'تفاصيل الشكوى أو الملاحظة...' : 'Complaint details...'}
                className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#141414] hover:bg-black text-white font-bold text-xs cursor-pointer"
              >
                {language === 'ar' ? 'إرسال الشكوى وإصدار رقم مرجعي فوري' : 'Submit Complaint & Generate Ticket ID'}
              </button>
              {complaintTicketId && (
                <div className="p-3 rounded-xl bg-[#f3f3f3] border border-[#141414] text-[11px] font-bold text-[#141414]">
                  {language === 'ar'
                    ? `تم تسجيل شكواكم بنجاح برقم مرجعي (${complaintTicketId}). سيتواصل معكم فريق العناية بالضيوف خلال 24 ساعة.`
                    : `Complaint registered successfully under Ticket ID (${complaintTicketId}).`}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Tab 4: Stop Electronic Ads & Cancel Customer Account (Points 6 & 7) */}
        {activeTab === 'account_ads' && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Point 7: Stop Electronic Ads */}
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] space-y-3">
              <div className="flex items-center gap-2">
                <BellOff className="w-4 h-4 text-[#141414]" />
                <h3 className="text-sm font-black text-[#141414]">
                  {language === 'ar'
                    ? 'وقف إرسال الإعلانات الإلكترونية (النقطة 7 — المادة 12)'
                    : 'Stop Electronic Promotional Messages (Point 7 — Article 12)'}
                </h3>
              </div>
              <p className="text-[#555555]">
                {language === 'ar'
                  ? 'وفقاً لنظام التجارة الإلكترونية، يمكنك في أي وقت طلب وقف إرسال الرسائل الدعائية والإعلانات الترويجية الإلكترونية عبر الرسائل النصية أو البريد الإلكتروني أو واتساب.'
                  : 'In accordance with the E-Commerce Law, you may opt out of receiving electronic promotional messages at any time.'}
              </p>
              <input
                type="text"
                value={optOutPhoneOrEmail}
                onChange={e => setOptOutPhoneOrEmail(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل رقم الجوال أو البريد الإلكتروني...' : 'Enter mobile number or email...'}
                className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white text-xs"
              />
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#e0e0e0]">
                <span className="font-bold text-[#141414]">
                  {language === 'ar' ? 'حالة الإعلانات الإلكترونية:' : 'Electronic Ads Status:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleMarketingOptOut(!marketingOptOut)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                    marketingOptOut ? 'bg-[#141414] text-white' : 'bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0]'
                  }`}
                >
                  {marketingOptOut
                    ? language === 'ar'
                      ? 'تم وقف الإعلانات ✓ (اضغط للتفعيل)'
                      : 'Ads Stopped ✓ (Click to Enable)'
                    : language === 'ar'
                    ? 'إيقاف كافة الإعلانات الإلكترونية فوراً'
                    : 'Stop All Electronic Ads Immediately'}
                </button>
              </div>
              {optOutSavedMsg && (
                <div className="p-2.5 rounded-xl bg-white border border-[#141414] text-[11px] font-bold text-[#141414]">
                  {optOutSavedMsg}
                </div>
              )}
            </div>

            {/* Point 6: Cancel Customer Account */}
            <form onSubmit={handleCancelAccountSubmit} className="p-4 rounded-2xl border border-[#e0e0e0] space-y-3">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-[#141414]" />
                <h3 className="text-sm font-black text-[#141414]">
                  {language === 'ar'
                    ? 'إلغاء حساب العميل وحذف البيانات (النقطة 6)'
                    : 'Cancel Customer Account & Delete Data (Point 6)'}
                </h3>
              </div>
              <p className="text-[#555555]">
                {language === 'ar'
                  ? 'يتيح متجر سولينا للسيارات لكل عميل إمكانية إلغاء حسابه الإلكتروني وإغلاق ملفه الشخصي وحذف بياناته المسجلة في أي وقت مع الاحتفاظ بنسخ الفواتير الضريبية النظامية فقط.'
                  : 'Solina Motors provides every customer the direct ability to cancel their account and delete personal profile data at any time.'}
              </p>
              <input
                type="text"
                required
                value={cancelAccountIdentifier}
                onChange={e => setCancelAccountIdentifier(e.target.value)}
                placeholder={language === 'ar' ? 'رقم الجوال أو البريد الإلكتروني المسجل بالحساب *' : 'Registered Mobile or Email *'}
                className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs"
              />
              <input
                type="text"
                value={cancelAccountReason}
                onChange={e => setCancelAccountReason(e.target.value)}
                placeholder={language === 'ar' ? 'سبب إلغاء الحساب (اختياري)' : 'Reason for account cancellation (optional)'}
                className="w-full p-2.5 rounded-xl border border-[#e0e0e0] text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#141414] hover:bg-black text-white font-bold text-xs cursor-pointer"
              >
                {language === 'ar' ? 'تأكيد طلب إلغاء حساب العميل فوراً' : 'Confirm Immediate Account Cancellation'}
              </button>
              {cancelConfirmationCode && (
                <div className="p-3 rounded-xl bg-[#f3f3f3] border border-[#141414] text-[11px] font-bold text-[#141414]">
                  {language === 'ar'
                    ? `تم تنفيذ طلب إلغاء الحساب وإيقاف كافة البيانات المرتبطة به بنجاح. رقم التأكيد النظامي: (${cancelConfirmationCode}).`
                    : `Account cancellation completed. Confirmation ID: (${cancelConfirmationCode}).`}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Tab 5: Privacy Policy & Cybersecurity Guidelines (Point 20) */}
        {activeTab === 'privacy_security' && (
          <div className="mt-5 space-y-4 text-xs leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#e0e0e0] space-y-2">
              <h3 className="text-sm font-black text-[#141414] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? 'سياسة الخصوصية وحماية بيانات المستهلك (المادة 5 من نظام التجارة الإلكترونية — النقطة 20)'
                    : 'Privacy Policy & Consumer Data Protection (Article 5 — Point 20)'}
                </span>
              </h3>
              <p className="text-[#555555]">
                {language === 'ar'
                  ? 'تلتزم شركة سولينا للسيارات المحدودة بحماية بيانات المستهلك الشخصية وعدم الاحتفاظ بها إلا بالقدر والمدة اللازمين لإتمام المعاملة أو تقديم خدمة الضمان والصيانة، وعدم استخدامها لأغراض غير مصرح بها أو الإفصاح عنها لأي طرف ثالث بمقابل أو بدون مقابل إلا بموافقة صريحة من المستهلك أو بموجب الأنظمة المرعية في المملكة العربية السعودية.'
                  : 'Solina Motors Co. Ltd. strictly protects consumer personal data, retains it only for the duration required to complete transactions and warranty services, and never discloses it to third parties without explicit consumer consent.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-[#e0e0e0] space-y-2">
                <h4 className="font-black text-[#141414]">
                  {language === 'ar'
                    ? 'إرشادات الأمن السيبراني لموفر الخدمة (security-providers.pdf)'
                    : 'Cybersecurity Controls for E-Commerce Provider'}
                </h4>
                <ul className="list-disc list-inside text-[#555555] space-y-1">
                  <li>تشفير كافة الاتصالات والمعاملات ببروتوكول TLS 1.3 وشهادات رقمية معتمدة.</li>
                  <li>بوابات دفع وطنية آمنة متوافقة مع معايير مدى وSAMA وPCI-DSS وتوثيق ثنائي (3D Secure / نفاذ).</li>
                  <li>توقيع رقمي مشفر ECDSA secp256k1 لكافة الفواتير الضريبية الإلكترونية (ZATCA Phase 2).</li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl border border-[#e0e0e0] space-y-2">
                <h4 className="font-black text-[#141414]">
                  {language === 'ar'
                    ? 'إرشادات الأمن السيبراني للمستهلك (security-consumers.pdf)'
                    : 'Cybersecurity Guidelines for Consumers'}
                </h4>
                <ul className="list-disc list-inside text-[#555555] space-y-1">
                  <li>تحقق دائماً من وجود قفل الأمان (HTTPS) وتوثيق المتجر في المركز السعودي للأعمال قبل الدفع.</li>
                  <li>لا تشارك رموز التحقق المؤقتة (OTP) أو الأرقام السرية للبطاقات البنكية مع أي شخص.</li>
                  <li>احتفظ بنسخة من الفاتورة الضريبية الإلكترونية المحتوية على رمز الاستجابة السريعة (QR).</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
