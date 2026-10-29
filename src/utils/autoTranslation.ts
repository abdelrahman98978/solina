/**
 * Solina Auto-Translation & Localization Library (مكتبة الترجمة التلقائية الذكية)
 * Enterprise real-time bidirectional Arabic <-> English translation engine
 * with Automotive, ERP, Accounting (SOCPA), ZATCA Phase 2, and DOM MutationObserver support.
 */

export interface TranslationDictionary {
  [englishKey: string]: string;
}

export interface CustomGlossaryEntry {
  id: string;
  ar: string;
  en: string;
  category: 'automotive' | 'erp' | 'accounting' | 'ui';
}

const CUSTOM_GLOSSARY_STORAGE_KEY = 'solina_custom_translations_v1';
const AUTO_TRANSLATE_ENABLED_KEY = 'solina_auto_translate_enabled_v1';

// 1. Automotive & Technical Dictionary (EN -> AR)
export const AUTOMOTIVE_DICTIONARY: Record<string, string> = {
  'horsepower': 'قوة حصانية',
  'twin-turbo': 'شاحن توربيني مزدوج',
  'hybrid': 'هايبرد هجين',
  'hybrid electric': 'هايبرد هجين',
  'all-wheel drive': 'دفع كلي للعجلات',
  'four-wheel drive': 'دفع رباعي',
  'front-wheel drive': 'دفع أمامي',
  'rear-wheel drive': 'دفع خلفي',
  'fuel economy': 'كفاءة استهلاك الوقود',
  'transmission': 'ناقل الحركة',
  'automatic': 'أوتوماتيكي',
  'smart automatic': 'أوتوماتيكي ذكي',
  'electric motor': 'محرك كهربائي',
  'fully electric': 'كهربائي بالكامل',
  'turbo diesel': 'تيربو ديزل',
  'petrol': 'بنزين',
  'chassis': 'الشاسيه والهيكل',
  'sedan': 'سيدان',
  'suv': 'دفع رباعي وكروس أوفر',
  'luxury': 'فاخرة',
  'sport': 'رياضية',
  'coupe': 'كوبيه',
  'commercial & pickups': 'تجارية وبيك أب',
  'warranty': 'الضمان المصنعي',
  'test drive': 'تجربة قيادة',
  'service booking': 'حجز صيانة',
  'down payment': 'الدفعة الأولى',
  'monthly installment': 'القسط الشهري',
  'finance calculator': 'حاسبة التمويل',
  'genuine parts': 'قطع غيار أصلية',
  'certified pre-owned': 'السيارات المستعملة المعتمدة',
  'roadside assistance': 'المساعدة على الطريق',
  'oil change': 'تغيير الزيت والفلتر',
  'brake inspection': 'فحص الفرامل والأقمشة',
  'express maintenance': 'الصيانة السريعة خلال 45 دقيقة',
  'pearl white': 'أبيض لؤلؤي',
  'midnight black': 'أسود ملكي',
  'titanium silver': 'فضي تيتانيوم',
  'desert bronze': 'برونزي صحراوي'
};

// 2. ERP, Accounting (SOCPA) & ZATCA e-Invoicing Dictionary (EN -> AR)
export const ERP_ZATCA_DICTIONARY: Record<string, string> = {
  'tax invoice': 'فاتورة ضريبية',
  'simplified invoice': 'فاتورة ضريبية مبسطة',
  'credit note': 'إشعار دائن',
  'vat': 'ضريبة القيمة المضافة',
  'vat return': 'الإقرار الضريبي الدوري',
  'vat registration number': 'الرقم الضريبي الموحد للمنشأة',
  'cryptographic stamp': 'الختم الرقمي المشفر',
  'qr code': 'رمز الاستجابة السريع',
  'uuid': 'المعرف الفريد الموحد',
  'job card': 'أمر عمل صيانة',
  'job cards': 'أوامر العمل بالورشة',
  'service bay': 'مسار الصيانة السريعة',
  'lead pipeline': 'مسار تحويل المبيعات',
  'vin': 'رقم الشاسيه',
  'vin inventory': 'مخزون الشاسيه والمستودعات',
  'purchase order': 'أمر شراء وتوريد',
  'warehouse': 'المستودع المركزي',
  'inventory': 'المخزون الفعلي',
  'technician': 'فني الصيانة المعتمد',
  'quotation': 'عرض سعر رسمي',
  'receipt voucher': 'سند قبض',
  'payment voucher': 'سند صرف',
  'journal entry': 'قيد تسوية يومية',
  'petty cash custody': 'عهدة مالية مستديمة',
  'chart of accounts': 'دليل الحسابات وميزان المراجعة',
  'posted to ledger': 'مرحّل بالدفاتر',
  'bank transfer': 'تحويل بنكي',
  'mada pos': 'شبكة مدى / نقاط البيع',
  'cash treasury': 'نقدي خزينة',
  'certified cheque': 'شيك مصدق',
  'custody settlement': 'خصم تسوية عهدة',
  'total receipts': 'إجمالي المقبوضات',
  'total payments': 'إجمالي المصروفات',
  'remaining custody balance': 'الرصيد المتبقي بالعُهد',
  'net vat payable': 'صافي ضريبة القيمة المضافة',
  'assets': 'الأصول',
  'liabilities': 'الالتزامات',
  'equity': 'حقوق الملكية',
  'revenues': 'الإيرادات',
  'expenses': 'المصروفات'
};

// 3. Comprehensive Admin Dashboard & Storefront UI Phrase Map (AR -> EN)
export const ARABIC_TO_ENGLISH_PHRASES: Record<string, string> = {
  // Shell & Navigation
  'سولينا.': 'Solina.',
  'سولينا للسيارات.': 'Solina Motors.',
  'سولينا للسيارات': 'Solina Motors',
  'منصة إدارة الوكالة الشاملة': 'Dealership Enterprise Platform',
  'لوحة المؤشرات والتحليلات': 'Overview & Analytics',
  'أسطول سولينا والأسعار': 'Solina Fleet & Pricing',
  'مخزون الشاسيه والمستودعات': 'VIN Stock & Warehouses',
  'الطلبات والحجوزات والمبيعات': 'Leads & Appointments',
  'ورش الصيانة وأوامر العمل': 'Workshop & Job Cards',
  'الفوترة الضريبية الإلكترونية': 'ZATCA e-Invoicing',
  'المحاسبة والعُهد والخزينة': 'Accounting & Treasury',
  'العروض الترويجية والحملات': 'Campaigns & Offers',
  'السيارات المستعملة المعتمدة': 'Certified Pre-Owned',
  'قطع الغيار والإكسسوارات': 'Genuine Parts & OEM',
  'الفروع وصالات العرض': 'Showrooms Network',
  'إعدادات الوكالة والنسخ': 'Settings & Backup',
  'الدور الوظيفي:': 'Active Role:',
  'صلاحية كاملة': 'Full Access',
  'المدير العام التنفيذي (صلاحية كاملة ERP)': 'General Manager (Full ERP Access)',
  'مدير المبيعات وصالات العرض': 'Sales & Showrooms Director',
  'مدير الصيانة وقطع الغيار': 'Workshop & Parts Manager',
  'المدير المالي والتدقيق الضريبي ZATCA': 'Finance & ZATCA Auditor',
  'أقسام إدارة وكالة سولينا': 'Solina Modules',
  'توسيع العرض': 'Expand View',
  'مركز التصدير بكل الصيغ': 'Universal Export Hub',
  'تصدير بكل الصيغ': 'Export Hub',
  'المعاينة والمراجعة': 'Live Preview',
  'معاينة التعديلات حياً': 'Live Site Preview',
  'سجل المراجعة والتدقيق': 'Audit & Review Log',
  'استعادة الافتراضي': 'Reset Data',
  'الموقع العام': 'Storefront',
  'الواجهة العامة': 'Public Storefront',
  'النظام': 'ERP',
  'مباشر': 'Live',
  'ربط مباشر': 'Live ZATCA',
  'نظام محاسبي معتمد': 'SOCPA Ledger',
  'تنبيه مخزون': 'Low Stock',
  'الأعلى مبيعاً': 'Top Performing',
  'نشط': 'Active',
  'جديد': 'New',
  'مؤكد': 'Confirmed',
  'تم التواصل': 'Contacted',
  'مكتمل': 'Completed',
  'بانتظار التأكيد': 'Pending Confirmation',
  'جاري الفحص': 'In Inspection',
  'جاهزة للتسليم': 'Ready for Handover',
  'تم الاستلام': 'Received',
  'فحص الجودة النهائي': 'Final Quality Check',
  'تم التسليم والفوترة': 'Delivered & Invoiced',
  'معتمدة ضريبياً': 'ZATCA Cleared',

  // Overview Tab
  'نظام الإدارة التنفيذي الشامل للوكالة': 'Executive Dealership Platform',
  'نظرة شاملة على عمليات سولينا للسيارات.': 'Real-time dealership operations, curated.',
  'النطاق الزمني للتحليلات:': 'Analytics Period:',
  'اليوم': 'Today',
  'آخر 7 أيام': '7 Days',
  'هذا الشهر': 'This Month',
  'الربع الحالي': 'Quarter',
  'عام 2026': 'Year 2026',
  'إدارة أسطول سولينا 2026': 'Manage 2026 Fleet',
  'إصدار فاتورة ضريبية معتمدة': 'Issue ZATCA Invoice',
  'المحاسبة والعُهد والسندات': 'Accounting & Custodies',
  'محرك التمويل والإعدادات': 'Financing & Settings',
  'تصدير شامل (10 صيغ)': 'Export All (10 Formats)',
  'طباعة التقرير التنفيذي': 'Print Executive Report',
  'طلبات تجارب القيادة': 'Test Drive Requests',
  'حجوزات الصيانة السريعة': 'Express Maintenance',
  'عروض الأسعار والتمويل': 'Quotations & Finance',
  'أوامر العمل بالورشة': 'Workshop Job Cards',
  'طرازات أسطول سولينا 2026': '2026 Solina Fleet Models',
  'الخزينة والعُهد المالية': 'Treasury & Petty Cash Custodies',
  'العروض وقطع الغيار والفروع': 'Campaigns, Parts & Network',
  'قمع التحويل البيعي والتمويلي.': 'Sales Conversion Funnel.',
  'توزيع الأسطول والمحفظة التشغيلية.': 'Fleet & Portfolio Breakdown.',
  'سيارات الدفع الرباعي والكروس أوفر': 'SUV & 4x4 Crossover Fleet',
  'سيارات السيدان والأداء الرياضي': 'Sedans & Sports Performance',
  'السيارات التجارية والبيك أب والنقل': 'Commercial & Pickup Fleet',
  'مبيعات الفواتير': 'Invoiced Sales',
  'المستعمل المعتمد': 'Certified Pre-Owned',
  'مخزون قطع الغيار': 'OEM Parts Stock',
  'إيراد الصيانة': 'Service Revenue',
  'أداء فروع وصالات سولينا.': 'Solina Branches Performance.',
  'إدارة الفروع': 'Manage Branches',
  'أحدث الفواتير الضريبية المعتمدة.': 'Recent Cleared ZATCA Invoices.',
  'إدارة الفواتير': 'Manage Invoices',
  'أحدث طلبات تجارب القيادة.': 'Recent Test Drive Leads.',
  'طابور الصيانة السريعة 45 دقيقة.': '45-Min Express Service Queue.',
  'عرض الكل': 'View All',
  'ملخص أسطول سيارات سولينا 2026 في المعارض.': 'Solina 2026 Fleet Stock Status.',
  'إدارة الأسطول كاملة': 'Manage Full Fleet',

  // Accounting & Treasury Tab
  'النظام المحاسبي المالي وإدارة الخزينة والعُهد المعتمدة': 'Financial Accounting, Treasury & Custodies System',
  'الإدارة المالية، سندات القبض والصرف، العُهد، ودليل الحسابات': 'Financial Management, Vouchers, Custodies & Chart of Accounts',
  'إجمالي المقبوضات': 'Total Receipts',
  'إجمالي المصروفات': 'Total Payments',
  'الرصيد المتبقي بالعُهد': 'Remaining Custody Balance',
  'صافي ضريبة القيمة المضافة': 'Net VAT Payable',
  'تصدير القسم بكل الصيغ (10 صيغ)': 'Export Module (10 Formats)',
  'الكل': 'All',
  'سندات قبض': 'Receipt Vouchers',
  'سندات صرف': 'Payment Vouchers',
  'قيود يومية': 'Journal Entries',
  'سند قبض': 'Receipt Voucher',
  'سند صرف': 'Payment Voucher',
  'قيد تسوية يومية': 'Journal Entry',
  'قيد يومية': 'Journal Entry',
  'إصدار سند قبض / صرف جديد': 'Issue New Receipt / Payment Voucher',
  'رقم السند والنوع': 'Voucher # & Type',
  'العميل / المستفيد والبيان': 'Beneficiary & Description',
  'الحساب ومركز التكلفة': 'Account & Cost Center',
  'طريقة الدفع والمرجع': 'Payment Method & Ref',
  'المبلغ والضريبة': 'Amount & VAT',
  'الحالة': 'Status',
  'تصدير وإجراءات': 'Export & Actions',
  'مرحّل بالدفاتر': 'Posted to Ledger',
  'مسودة': 'Draft',
  'ملغى': 'Cancelled',
  'معاينة وتصدير': 'Preview & Export',
  'تحويل بنكي': 'Bank Transfer',
  'شبكة مدى / POS': 'Mada / POS',
  'نقدي خزينة': 'Cash Treasury',
  'شيك مصدق': 'Certified Cheque',
  'خصم تسوية عهدة': 'Custody Deduction',
  'صرف عهدة مالية جديدة': 'Issue New Financial Custody',
  'جميع العُهد': 'All Custodies',
  'نشطة': 'Active',
  'قيد التسوية': 'Pending Settlement',
  'مقفلة ومسددة': 'Settled & Closed',
  'عهدة نشطة': 'Active Custody',
  'تحتاج تسوية': 'Needs Settlement',
  'مسددة ومقفلة': 'Settled & Closed',
  'عهدة نقدية مستديمة': 'Permanent Petty Cash',
  'عهدة تشغيل ورش وصيانة': 'Workshop Operations Custody',
  'عهدة ضيافة ومعارض': 'Showroom Hospitality Custody',
  'سلفة مشتريات وتخليص': 'Procurement Advance',
  'المبلغ المعتمد': 'Allocated Amount',
  'المصروف والمسوى': 'Spent & Settled',
  'الرصيد المتبقي': 'Remaining Balance',
  'تسوية مصروف / فاتورة': 'Settle Expense / Invoice',
  'تغذية العهدة': 'Replenish Custody',
  'إقفال وإخلاء طرف': 'Close & Clear Custody',
  'محضر العهدة / تصدير': 'Custody Report / Export',
  'جميع الحسابات': 'All Accounts',
  'الأصول': 'Assets',
  'الالتزامات': 'Liabilities',
  'حقوق الملكية': 'Equity',
  'الإيرادات': 'Revenues',
  'المصروفات': 'Expenses',
  'تصدير ميزان المراجعة بكل الصيغ': 'Export Trial Balance (All Formats)',
  'كود الحساب': 'Account Code',
  'اسم الحساب المحاسبي المعتمد': 'Account Name (SOCPA)',
  'التصنيف المالي': 'Financial Category',
  'إجمالي المدين': 'Total Debit',
  'إجمالي الدائن': 'Total Credit',
  'الرصيد الصافي': 'Net Balance',
  'الإقرار الضريبي والمطابقة الضريبية': 'VAT Return & ZATCA Reconciliation',
  'هيئة الزكاة والضريبة والجمارك — الإقرار الضريبي الدوري': 'ZATCA — Periodic VAT Return',
  'ملخص الإقرار الضريبي الدوري ومطابقة ضريبة القيمة المضافة (15%)': 'Periodic VAT Return Summary & 15% VAT Reconciliation',

  // Fleet, VIN, Workshop, ZATCA, Parts, CPO, Offers, Showrooms, Settings
  'إدارة أسطول سيارات سولينا والأسعار لعام 2026': 'Solina 2026 Fleet & Pricing Management',
  'تصدير الأسطول (10 صيغ)': 'Export Fleet (10 Formats)',
  'إضافة موديل جديد': 'Add New Model',
  'جميع العلامات التجارية': 'All Brands',
  'جميع الفئات': 'All Categories',
  'كل المحركات': 'All Powertrains',
  'السيارة والعلامة': 'Vehicle & Brand',
  'الألوان والداخلية': 'Colors & Interior',
  'الفئة والمحرك': 'Category & Powertrain',
  'السعر النقدي الأساسي': 'Starting Cash Price',
  'الفئات المتاحة': 'Available Trims',
  'مميزة بالرئيسية': 'Featured',
  'الكتالوج والإجراءات': 'Catalog & Actions',
  'إدارة مخزون الأسطول وأرقام الشاسيه والمستودعات': 'Solina VIN Stock & Central Warehouses',
  'تصدير المخزون (10 صيغ)': 'Export Inventory (10 Formats)',
  'إضافة شحنة / مركبة برقم الشاسيه': 'Add Shipment / VIN Unit',
  'إجمالي السيارات في المخزون': 'Total Vehicles in Stock',
  'قيمة المخزون الإجمالية': 'Total Inventory Value',
  'السيارات المحجوزة': 'Reserved Vehicles',
  'شحنات في الطريق وتنبيه التقادم': 'In-Transit & Aging Stock',
  'إدارة أوامر العمل وورش صيانة سولينا السريعة': 'Solina Express Workshop & Job Cards Management',
  'تصدير أوامر العمل (10 صيغ)': 'Export Job Cards (10 Formats)',
  'فتح كرت عمل صيانة جديد': 'Open New Workshop Job Card',
  'نظام سولينا للفوترة الضريبية الإلكترونية المعتمد (المرحلة الثانية)': 'Solina ZATCA E-Invoicing System (Phase 2)',
  'تصدير سجل الفواتير (10 صيغ)': 'Export Invoices (10 Formats)',
  'إصدار فاتورة ضريبية جديدة': 'Issue New Tax Invoice',
  'إجمالي الفواتير الصادرة': 'Total Issued Invoices',
  'إجمالي المبيعات المفوترة (شامل الضريبة)': 'Total Invoiced Sales (Incl. VAT)',
  'ضريبة القيمة المضافة المحصلة (15%)': 'Collected VAT (15%)',
  'حالة الربط والاعتماد الضريبي': 'ZATCA CSID Connection Status',
  'متصل بنجاح 100%': '100% Connected & Cleared',
  'إدارة قطع غيار سولينا الأصلية والإكسسوارات': 'Solina Genuine OEM Parts & Accessories',
  'تصدير القطع (10 صيغ)': 'Export Parts (10 Formats)',
  'إضافة قطعة غيار أصلية': 'Add Genuine OEM Part',
  'القطعة ورقمها الأصلي': 'Part & OEM Number',
  'التصنيف والضمان': 'Category & Warranty',
  'الموديلات المتوافقة': 'Compatible Models',
  'الرصيد المخزني والتوريد': 'Stock Balance & Supply',
  'السعر (شامل الضريبة)': 'Price (VAT Included)',
  'الإجراءات': 'Actions',
  'نقص حرج': 'Low Stock',
  'تعديل': 'Edit',
  'حذف': 'Delete',
  'إغلاق النافذة': 'Close Window',
  'إدارة سيارات سولينا المستعملة المعتمدة': 'Solina Certified Pre-Owned Inventory',
  'تصدير المستعمل المعتمد (10 صيغ)': 'Export CPO (10 Formats)',
  'إضافة سيارة مستعملة معتمدة': 'Add Certified Pre-Owned Vehicle',
  'إدارة إعدادات الوكالة ومحرك التمويل والنسخ الاحتياطي': 'Dealership Settings, Financing Engine & Backup',
  'إعدادات وكالة سولينا ومحرك التمويل والربط الضريبي.': 'Solina Dealership, Financing & ZATCA Settings.'
};

// Build merged dictionaries
export function getCustomGlossary(): CustomGlossaryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GLOSSARY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomGlossary(entries: CustomGlossaryEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_GLOSSARY_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore storage errors
  }
}

export function isAutoTranslationEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem(AUTO_TRANSLATE_ENABLED_KEY);
  return saved !== 'false';
}

export function setAutoTranslationEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTO_TRANSLATE_ENABLED_KEY, enabled ? 'true' : 'false');
}

// Convert Eastern Arabic digits (٠-٩) to Western digits (0-9)
export function normalizeDigitsToWestern(str: string): string {
  return str
    .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/٬/g, ',')
    .replace(/٫/g, '.');
}

/**
 * Detect language of given string ('ar' | 'en')
 */
export function detectLanguage(text: string): 'ar' | 'en' {
  if (!text) return 'ar';
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
}

/**
 * Translates a single term, UI label, dynamic metric, or sentence between Arabic and English.
 */
export function autoTranslate(text: string, targetLang: 'ar' | 'en'): string {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  const customEntries = getCustomGlossary();

  if (targetLang === 'en') {
    // 1. Check custom glossary first
    const customMatch = customEntries.find(e => e.ar.trim() === trimmed);
    if (customMatch) return customMatch.en;

    // 2. Direct exact phrase lookup
    if (ARABIC_TO_ENGLISH_PHRASES[trimmed]) {
      return ARABIC_TO_ENGLISH_PHRASES[trimmed];
    }

    // 3. Normalize Eastern Arabic numerals for English display
    let working = normalizeDigitsToWestern(trimmed);
    if (ARABIC_TO_ENGLISH_PHRASES[working]) {
      return ARABIC_TO_ENGLISH_PHRASES[working];
    }

    // 4. Smart Dynamic Metric & Currency Patterns (AR -> EN)
    working = working
      .replace(/^([+-]?\s*[\d,.]+)\s*ر\.س\/ش$/g, 'SAR $1/mo')
      .replace(/^([+-]?\s*[\d,.]+)\s*ر\.س$/g, 'SAR $1')
      .replace(/^([+-]?\s*[\d,.]+)\s*ريال$/g, 'SAR $1')
      .replace(/^(\d+)\s*موديل مسجل$/g, '$1 Registered Models')
      .replace(/^(\d+)\s*موديل$/g, '$1 Models')
      .replace(/^(\d+)\s*طراز$/g, '$1 Models')
      .replace(/^(\d+)\s*مركبة$/g, '$1 Vehicles')
      .replace(/^(\d+)\s*سيارة$/g, '$1 Vehicles')
      .replace(/^(\d+)\s*سيارات$/g, '$1 Vehicles')
      .replace(/^(\d+)\s*أمر عمل$/g, '$1 Job Cards')
      .replace(/^(\d+)\s*كرت عمل$/g, '$1 Job Cards')
      .replace(/^(\d+)\s*فاتورة$/g, '$1 Invoices')
      .replace(/^(\d+)\s*عهدة$/g, '$1 Custodies')
      .replace(/^(\d+)\s*راكد$/g, '$1 Aging')
      .replace(/^(\d+)\s*جديد$/g, '$1 New')
      .replace(/^(\d+)\s*نشط$/g, '$1 Active')
      .replace(/^(\d+)\s*نقص$/g, '$1 Low Stock')
      .replace(/^(\d+)\s*فئات$/g, '$1 Trims')
      .replace(/^(\d+)\s*وحدة$/g, '$1 Units')
      .replace(/^(\d+)\s*قطعة مسجلة$/g, '$1 Registered Parts')
      .replace(/^(\d+)\s*صيغ معتمدة$/g, '$1 Formats')
      .replace(/^(\d+)\s*صيغ$/g, '$1 Formats')
      .replace(/^مرجع:\s*(.+)$/g, 'Ref: $1')
      .replace(/^المعرّف:\s*(.+)$/g, 'ID: $1')
      .replace(/^رقم القطعة:\s*(.+)$/g, 'Part #: $1')
      .replace(/^الضريبة:\s*([\d,.]+)\s*ر\.س$/g, 'VAT: SAR $1')
      .replace(/^نسبة الاستهلاك:\s*(\d+)%$/g, 'Utilization: $1%')
      .replace(/^آخر تسوية:\s*(.+)$/g, 'Last Settlement: $1')
      .replace(/^معدل التحويل\s*(\d+)%$/g, 'Conversion Rate $1%');

    if (working !== normalizeDigitsToWestern(trimmed)) {
      return working;
    }

    // 5. Substring phrase replacement for compound Arabic strings
    for (const entry of customEntries) {
      if (working.includes(entry.ar)) {
        working = working.replaceAll(entry.ar, entry.en);
      }
    }
    for (const [arPhrase, enPhrase] of Object.entries(ARABIC_TO_ENGLISH_PHRASES)) {
      if (arPhrase.length > 3 && working.includes(arPhrase)) {
        working = working.replaceAll(arPhrase, enPhrase);
      }
    }
    for (const [enTerm, arTerm] of Object.entries({ ...AUTOMOTIVE_DICTIONARY, ...ERP_ZATCA_DICTIONARY })) {
      if (arTerm.length > 3 && working.includes(arTerm)) {
        working = working.replaceAll(arTerm, enTerm);
      }
    }

    // Also replace inline ر.س or ريال in sentences
    working = working.replace(/([\d,.]+)\s*ر\.س/g, 'SAR $1').replace(/([\d,.]+)\s*ريال/g, 'SAR $1');

    return working;
  } else {
    // Target is Arabic ('ar')
    // 1. Check custom glossary
    const lower = trimmed.toLowerCase();
    const customMatch = customEntries.find(e => e.en.trim().toLowerCase() === lower);
    if (customMatch) return customMatch.ar;

    // 2. Direct dictionary match
    if (AUTOMOTIVE_DICTIONARY[lower]) return AUTOMOTIVE_DICTIONARY[lower];
    if (ERP_ZATCA_DICTIONARY[lower]) return ERP_ZATCA_DICTIONARY[lower];

    // 3. Clean awkward English parentheticals inside Arabic text if any remain
    let result = trimmed
      .replace(/\s*\(Solina VIN Inventory\)/gi, '')
      .replace(/\s*\(Genuine Parts\)/gi, '')
      .replace(/\s*\(Workshop & Job Cards\)/gi, '')
      .replace(/\s*\(Solina AutoHub CPO\)/gi, '')
      .replace(/\s*\(2026 Fleet\)/gi, '')
      .replace(/\s*\(SOCPA\)/gi, '')
      .replace(/\s*\(Debit\)/gi, '')
      .replace(/\s*\(Credit\)/gi, '')
      .replace(/\s*\(Balance\)/gi, '')
      .replace(/^Part #:\s*/i, 'رقم القطعة: ')
      .replace(/^ID:\s*/i, 'المعرّف: ');

    // 4. Word/phrase replacement if pure English string
    if (detectLanguage(result) === 'en') {
      for (const [enKey, arVal] of Object.entries({ ...AUTOMOTIVE_DICTIONARY, ...ERP_ZATCA_DICTIONARY })) {
        const regex = new RegExp(`\\b${enKey}\\b`, 'gi');
        if (regex.test(result)) {
          result = result.replace(regex, arVal);
        }
      }
    }

    return result;
  }
}

// WeakMaps to store original text nodes and attributes so switching AR <-> EN <-> AR is 100% lossless
const textNodeCache = new WeakMap<CharacterData, { original: string; lastTranslated: string }>();
const elementAttrCache = new WeakMap<Element, Record<string, { original: string; lastTranslated: string }>>();

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'SVG', 'PATH', 'TEXTAREA']);
const TRANSLATABLE_ATTRS = ['placeholder', 'title', 'aria-label'];

/**
 * Walks a DOM subtree and automatically translates all text nodes and UI attributes
 * into targetLang while preserving original source strings for lossless language toggling.
 */
export function translateDOMSubtree(root: Node, targetLang: 'ar' | 'en'): void {
  if (!root || typeof document === 'undefined' || !isAutoTranslationEnabled()) return;

  // 1. Translate Text Nodes
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-no-auto-translate="true"]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let currentNode = walker.nextNode() as CharacterData | null;
  while (currentNode) {
    const currentVal = currentNode.data;
    if (currentVal && currentVal.trim().length > 0) {
      let cached = textNodeCache.get(currentNode);
      if (!cached || (currentVal !== cached.lastTranslated && currentVal !== cached.original)) {
        cached = { original: currentVal, lastTranslated: currentVal };
        textNodeCache.set(currentNode, cached);
      }

      const sourceText = cached.original;
      const leadingSpace = sourceText.match(/^\s*/)?.[0] || '';
      const trailingSpace = sourceText.match(/\s*$/)?.[0] || '';
      const translatedCore = autoTranslate(sourceText.trim(), targetLang);
      const finalString = `${leadingSpace}${translatedCore}${trailingSpace}`;

      if (currentNode.data !== finalString) {
        cached.lastTranslated = finalString;
        currentNode.data = finalString;
      }
    }
    currentNode = walker.nextNode() as CharacterData | null;
  }

  // 2. Translate Attributes (placeholder, title, aria-label)
  if (root instanceof Element || root instanceof Document) {
    const elements = (root as Element).querySelectorAll
      ? (root as Element).querySelectorAll('[placeholder], [title], [aria-label]')
      : [];

    elements.forEach(el => {
      if (el.closest('[data-no-auto-translate="true"]')) return;
      let attrMap = elementAttrCache.get(el);
      if (!attrMap) {
        attrMap = {};
        elementAttrCache.set(el, attrMap);
      }

      for (const attr of TRANSLATABLE_ATTRS) {
        const val = el.getAttribute(attr);
        if (!val || !val.trim()) continue;
        let cachedAttr = attrMap[attr];
        if (!cachedAttr || (val !== cachedAttr.lastTranslated && val !== cachedAttr.original)) {
          cachedAttr = { original: val, lastTranslated: val };
          attrMap[attr] = cachedAttr;
        }
        const translatedAttr = autoTranslate(cachedAttr.original, targetLang);
        if (val !== translatedAttr) {
          cachedAttr.lastTranslated = translatedAttr;
          el.setAttribute(attr, translatedAttr);
        }
      }
    });
  }
}

/**
 *Format currency according to locale with live auto-converted label
 */
export function formatCurrencyWithLabel(amount: number, lang: 'ar' | 'en'): string {
  const formattedNumber = lang === 'ar' ? amount.toLocaleString('ar-SA') : amount.toLocaleString('en-US');
  const currencyLabel = lang === 'ar' ? 'ريال سعودي' : 'SAR';
  return `${formattedNumber} ${currencyLabel}`;
}

export function getTranslationLibraryStats() {
  const custom = getCustomGlossary();
  const automotiveCount = Object.keys(AUTOMOTIVE_DICTIONARY).length;
  const erpZatcaCount = Object.keys(ERP_ZATCA_DICTIONARY).length;
  const uiPhrasesCount = Object.keys(ARABIC_TO_ENGLISH_PHRASES).length;
  return {
    automotiveCount,
    erpZatcaCount,
    uiPhrasesCount,
    customCount: custom.length,
    totalTerms: automotiveCount + erpZatcaCount + uiPhrasesCount + custom.length
  };
}
