/**
 * Solina Auto-Translation & Localization Library (مكتبة الترجمة التلقائية الذكية)
 * Specialized engine for real-time Arabic <-> English translation with automotive, ERP, and ZATCA domain dictionaries.
 */

export interface TranslationDictionary {
  [arabicTerm: string]: string;
}

// 1. Automotive & Technical Dictionary
export const AUTOMOTIVE_DICTIONARY: Record<string, string> = {
  'horsepower': 'قوة حصانية',
  'twin-turbo': 'شاحن توربيني مزدوج',
  'hybrid': 'هايبرد هجين',
  'all-wheel drive': 'دفع كلي للعجلات AWD',
  'four-wheel drive': 'دفع رباعي 4x4',
  'front-wheel drive': 'دفع أمامي FWD',
  'rear-wheel drive': 'دفع خلفي RWD',
  'fuel economy': 'استهلاك الوقود',
  'transmission': 'ناقل الحركة',
  'automatic': 'أوتوماتيكي',
  'electric motor': 'محرك كهربائي',
  'chassis': 'الشاسيه / الهيكل',
  'sedan': 'سيدان',
  'suv': 'دفع رباعي / عائلية',
  'luxury': 'فاخرة',
  'sport': 'رياضية',
  'coupe': 'كوبيه',
  'warranty': 'الضمان المصنعي',
  'test drive': 'تجربة قيادة',
  'service booking': 'حجز صيانة',
  'down payment': 'الدفعة الأولى',
  'monthly installment': 'القسط الشهري',
  'finance calculator': 'حاسبة التمويل',
  'genuine parts': 'قطع غيار أصلية',
  'certified pre-owned': 'مستعمل معتمد AutoHub',
  'roadside assistance': 'المساعدة على الطريق',
  'oil change': 'تغيير الزيت والفلتر',
  'brake inspection': 'فحص الفرامل والأقمشة',
  'express maintenance': 'صيانة سريعة 45 دقيقة'
};

// 2. ERP & ZATCA e-Invoicing Terms
export const ERP_ZATCA_DICTIONARY: Record<string, string> = {
  'tax invoice': 'فاتورة ضريبية',
  'simplified invoice': 'فاتورة ضريبية مبسطة',
  'vat': 'ضريبة القيمة المضافة',
  'vat registration number': 'الرقم الضريبي للمنشأة',
  'cryptographic stamp': 'الختم الرقمي المشفر',
  'qr code': 'رمز الاستجابة السريع QR',
  'uuid': 'المعرف الفريد الموحد',
  'job card': 'كرت عمل صيانة',
  'service bay': 'مسار الصيانة',
  'lead pipeline': 'مسار تحويل العملاء',
  'vin': 'رقم الشاسيه الموحد VIN',
  'purchase order': 'أمر شراء',
  'warehouse': 'المستودع المركزي',
  'inventory': 'المخزون الفعلي',
  'technician': 'فني الصيانة المعتمد',
  'quotation': 'عرض سعر رسمي'
};

// Reverse Dictionary for Arabic to English lookups
const REVERSE_DICTIONARY: Record<string, string> = {};
Object.entries({ ...AUTOMOTIVE_DICTIONARY, ...ERP_ZATCA_DICTIONARY }).forEach(([en, ar]) => {
  REVERSE_DICTIONARY[ar.toLowerCase()] = en;
  // Also add partials
  const cleanAr = ar.replace(/[\u064B-\u065F]/g, '').trim().toLowerCase();
  REVERSE_DICTIONARY[cleanAr] = en;
});

/**
 * Detect language of given string ('ar' | 'en')
 */
export function detectLanguage(text: string): 'ar' | 'en' {
  if (!text) return 'ar';
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

/**
 * Translates a single term or sentence using domain dictionaries and fallback rules.
 */
export function autoTranslate(text: string, targetLang: 'ar' | 'en'): string {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  const sourceLang = detectLanguage(clean);

  if (sourceLang === targetLang) return clean;

  const lower = clean.toLowerCase();

  // 1. Direct dictionary match
  if (targetLang === 'ar') {
    if (AUTOMOTIVE_DICTIONARY[lower]) return AUTOMOTIVE_DICTIONARY[lower];
    if (ERP_ZATCA_DICTIONARY[lower]) return ERP_ZATCA_DICTIONARY[lower];

    // Word by word replace if sentence
    let result = clean;
    for (const [enKey, arVal] of Object.entries({ ...AUTOMOTIVE_DICTIONARY, ...ERP_ZATCA_DICTIONARY })) {
      const regex = new RegExp(`\\b${enKey}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, arVal);
      }
    }
    return result !== clean ? result : clean;
  } else {
    // Target is English
    if (REVERSE_DICTIONARY[lower]) return REVERSE_DICTIONARY[lower];

    let result = clean;
    for (const [arKey, enVal] of Object.entries(REVERSE_DICTIONARY)) {
      if (result.includes(arKey)) {
        result = result.replaceAll(arKey, enVal);
      }
    }
    return result !== clean ? result : clean;
  }
}

/**
 * Format currency according to locale with live auto-converted label
 */
export function formatCurrencyWithLabel(amount: number, lang: 'ar' | 'en'): string {
  const formattedNumber = lang === 'ar' ? amount.toLocaleString('ar-SA') : amount.toLocaleString('en-US');
  const currencyLabel = lang === 'ar' ? 'ريال سعودي' : 'SAR';
  return `${formattedNumber} ${currencyLabel}`;
}
