import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Wrench, 
  FileText, 
  Tag, 
  MapPin, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Menu, 
  X,
  Layers,
  PackageCheck,
  Eye,
  History,
  Monitor,
  Smartphone,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  Search,
  Settings,
  Undo2,
  UserCheck,
  Command,
  Download,
  FileSpreadsheet,
  FileCode,
  FileJson,
  Printer,
  PanelRightClose,
  PanelRightOpen,
  Maximize2,
  Wallet
} from 'lucide-react';
import { 
  useAdminData, 
  ADMIN_ROLES_META, 
  AdminRoleType, 
  ExportDatasetType, 
  ExportFormatType 
} from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import './mobbin-admin.css';

// Tabs
import { AdminOverviewTab } from './AdminOverviewTab';
const AdminFleetTab = lazy(() => import('./AdminFleetTab').then(m => ({ default: m.AdminFleetTab })));
const AdminLeadsTab = lazy(() => import('./AdminLeadsTab').then(m => ({ default: m.AdminLeadsTab })));
const AdminOffersTab = lazy(() => import('./AdminOffersTab').then(m => ({ default: m.AdminOffersTab })));
const AdminCPOTab = lazy(() => import('./AdminCPOTab').then(m => ({ default: m.AdminCPOTab })));
const AdminPartsTab = lazy(() => import('./AdminPartsTab').then(m => ({ default: m.AdminPartsTab })));
const AdminShowroomsTab = lazy(() => import('./AdminShowroomsTab').then(m => ({ default: m.AdminShowroomsTab })));
const AdminZatcaInvoicingTab = lazy(() => import('./AdminZatcaInvoicingTab').then(m => ({ default: m.AdminZatcaInvoicingTab })));
const AdminAccountingTab = lazy(() => import('./AdminAccountingTab').then(m => ({ default: m.AdminAccountingTab })));
const AdminWorkshopJobCardsTab = lazy(() => import('./AdminWorkshopJobCardsTab').then(m => ({ default: m.AdminWorkshopJobCardsTab })));
const AdminVINInventoryTab = lazy(() => import('./AdminVINInventoryTab').then(m => ({ default: m.AdminVINInventoryTab })));
const AdminSettingsTab = lazy(() => import('./AdminSettingsTab').then(m => ({ default: m.AdminSettingsTab })));

interface AdminDashboardProps {
  onClose: () => void;
}

export type AdminTabType =
  | 'overview'
  | 'fleet'
  | 'vin_inventory'
  | 'leads'
  | 'workshop'
  | 'zatca'
  | 'accounting'
  | 'offers'
  | 'cpo'
  | 'parts'
  | 'showrooms'
  | 'settings';

export type LeadsSubTabType = 'test_drives' | 'services' | 'quotations';

const EXPORT_DATASETS_LIST: Array<{ id: ExportDatasetType; labelAr: string; descAr: string }> = [
  { id: 'all_erp', labelAr: 'كافة بيانات وسجلات الوكالة الشاملة (Master ERP)', descAr: 'تصدير موحد لجميع الأقسام والعمليات والمخزون والفواتير' },
  { id: 'fleet', labelAr: 'كتالوج أسطول سولينا 2026 والأسعار', descAr: 'جميع الموديلات والفئات والأسعار والأقساط الشهرية' },
  { id: 'vin_stock', labelAr: 'مخزون الشاسيه والمستودعات (VIN Inventory)', descAr: 'أرقام الشاسيه، مواقع الفروع، حالات التوريد وأيام التخزين' },
  { id: 'test_drives', labelAr: 'طلبات تجربة القيادة (Test Drives)', descAr: 'بيانات العملاء، المواعيد، الفروع، ومستشاري المبيعات' },
  { id: 'services', labelAr: 'حجوزات مواعيد الصيانة الدورية', descAr: 'مواعيد الصيانة، اللوحات، قراءات العداد والتكلفة التقديرية' },
  { id: 'quotations', labelAr: 'عروض الأسعار وطلبات التمويل', descAr: 'عروض الأسعار الرسمية، مبالغ الضريبة، والتمويل التأجيري' },
  { id: 'job_cards', labelAr: 'أوامر العمل بالورشة والمسار السريع', descAr: 'كروت العمل، الفنيين، قطع الغيار المصروفة والتكاليف' },
  { id: 'zatca_invoices', labelAr: 'الفواتير الضريبية الإلكترونية (ZATCA Phase 2)', descAr: 'الفواتير الضريبية والمبسطة والإشعارات الدائنة' },
  { id: 'accounting_vouchers', labelAr: 'سندات القبض والصرف والقيود المحاسبية', descAr: 'حركة الخزينة، التحويلات البنكية، وسندات القبض والصرف' },
  { id: 'custodies', labelAr: 'سجل العُهد المالية والسلف التشغيلية (Petty Cash & Custodies)', descAr: 'عُهد الموظفين والفروع، المبالغ المصروفة، والأرصدة المتبقية' },
  { id: 'chart_of_accounts', labelAr: 'دليل الحسابات وميزان المراجعة (Chart of Accounts)', descAr: 'شجرة الحسابات المحاسبية SOCPA وأرصدة المدين والدائن' },
  { id: 'parts', labelAr: 'قطع الغيار الأصلية والأرصدة المخزنية', descAr: 'أرقام القطع OEM، الأسعار، والكميات المتوفرة بالمستودع' },
  { id: 'offers', labelAr: 'العروض الترويجية والحملات التسويقية', descAr: 'حملات التمويل والصيانة والعروض الموسمية' },
  { id: 'cpo', labelAr: 'السيارات المستعملة المعتمدة (AutoHub CPO)', descAr: 'السيارات المفحوصة، الممشى، الضمان والأسعار' },
  { id: 'showrooms', labelAr: 'الفروع وصالات العرض ومراكز الصيانة', descAr: 'العناوين، أرقام التواصل، وساعات العمل' },
  { id: 'audit_logs', labelAr: 'سجل المراجعة والتدقيق الإداري (Audit Log)', descAr: 'توثيق كافة التعديلات والفوارق الزمنية والمسؤولين' }
];

const EXPORT_FORMATS_LIST: Array<{
  id: ExportFormatType;
  ext: string;
  titleAr: string;
  descAr: string;
  badge: string;
}> = [
  {
    id: 'excel',
    ext: '.XLS',
    titleAr: 'ملف إكسل منسق (Microsoft Excel)',
    descAr: 'جدول إكسل عربي منسق بالأعمدة والترويسة الرسمية جاهز للتحليل المحاسبي',
    badge: 'الأكثر استخداماً'
  },
  {
    id: 'csv',
    ext: '.CSV',
    titleAr: 'ملف قيم مفصولة بفواصل (UTF-8 CSV)',
    descAr: 'متوافق 100% مع Excel وGoogle Sheets وكافة أنظمة ERP المحاسبية',
    badge: 'قياسي'
  },
  {
    id: 'pdf_print',
    ext: '.PDF',
    titleAr: 'تقرير PDF رسمي / طباعة فورية',
    descAr: 'يفتح وثيقة رسمية بترويسة شركة سولينا للسيارات جاهزة للحفظ كـ PDF أو الطباعة',
    badge: 'رسمي للطباعة'
  },
  {
    id: 'json',
    ext: '.JSON',
    titleAr: 'بيانات مهيكلة برمجياً (JSON Data)',
    descAr: 'صيغة JSON كاملة مع البيانات الوصفية للربط البرمجي والنسخ الاحتياطي',
    badge: 'للمطورين والربط'
  },
  {
    id: 'xml',
    ext: '.XML',
    titleAr: 'ملف XML قياسي (Enterprise & ZATCA XML)',
    descAr: 'مهيكل وفق المعايير القياسية لتبادل البيانات المالية والضريبية',
    badge: 'ZATCA / ERP'
  },
  {
    id: 'html',
    ext: '.HTML',
    titleAr: 'تقرير ويب تفاعلي مستقل (HTML5 Report)',
    descAr: 'ملف ويب مستقل يعمل بدون إنترنت في أي متصفح مع تنسيق كامل',
    badge: 'تفاعلي'
  },
  {
    id: 'word',
    ext: '.DOC',
    titleAr: 'مستند وورد رسمي (Microsoft Word)',
    descAr: 'مستند وورد منسق بترويسة وكالة سولينا والرقم الضريبي جاهز للتعديل والاعتماد',
    badge: 'مستند رسمي'
  },
  {
    id: 'sql',
    ext: '.SQL',
    titleAr: 'قاعدة بيانات SQL (Database Dump)',
    descAr: 'أوامر CREATE TABLE و INSERT INTO جاهزة للاستيراد في MySQL و PostgreSQL',
    badge: 'قواعد بيانات'
  },
  {
    id: 'markdown',
    ext: '.MD',
    titleAr: 'وثيقة جداول ماركداون (Markdown Table)',
    descAr: 'جداول توثيقية منسقة متوافقة مع أنظمة التوثيق والتقارير الفنية',
    badge: 'توثيق'
  },
  {
    id: 'txt',
    ext: '.TXT',
    titleAr: 'ملف نصي جدولي (Plain Text / TSV)',
    descAr: 'ملف نصي خفيف مفصول بمسافات جدولية متوافق مع جميع الأنظمة',
    badge: 'نصي'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { 
    stats, 
    resetToDefaultData, 
    vehicles, 
    vinStock,
    offers, 
    cpoVehicles, 
    spareParts, 
    showrooms,
    testDrives,
    serviceAppointments,
    quotations,
    jobCards,
    zatcaInvoices,
    vouchers,
    custodies,
    auditLogs,
    undoAuditLog,
    clearAuditLogs,
    adminRole,
    setAdminRole,
    exportDataInFormat,
    exportModalRequest,
    setExportModalRequest
  } = useAdminData();
  const { language, setLanguage, isRTL, formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [leadsSubTab, setLeadsSubTab] = useState<LeadsSubTabType>('test_drives');
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarCollapsedDesktop, setSidebarCollapsedDesktop] = useState(false);

  // Command Palette (Ctrl+K / ⌘K) State
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Universal Multi-Format Export Modal State
  const [selectedExportDataset, setSelectedExportDataset] = useState<ExportDatasetType>('all_erp');

  useEffect(() => {
    if (exportModalRequest) {
      setSelectedExportDataset(exportModalRequest);
    }
  }, [exportModalRequest]);

  // Notifications & Live Preview / Review Modals
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'live_preview' | 'audit_log'>('live_preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewSection, setPreviewSection] = useState<'fleet' | 'live_site' | 'live_app' | 'offers' | 'cpo' | 'parts' | 'showrooms' | 'zatca' | 'accounting'>('fleet');
  const [previewSearchQuery, setPreviewSearchQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setCommandOpen(false);
        setExportModalRequest(null);
        setPreviewDrawerOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setExportModalRequest]);

  const handleNavigateTab = (tab: AdminTabType | LeadsSubTabType) => {
    if (tab === 'test_drives' || tab === 'services' || tab === 'quotations') {
      setLeadsSubTab(tab);
      setActiveTab('leads');
    } else {
      setActiveTab(tab);
    }
    setSidebarOpenMobile(false);
    setNotificationsOpen(false);
    setCommandOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadAlertsCount = stats.newTestDrivesCount + stats.pendingServicesCount + stats.readyJobCardsCount;
  const hasNewLeads = (stats.newTestDrivesCount + stats.pendingServicesCount) > 0;

  const navItems = [
    {
      id: 'overview' as const,
      labelAr: 'لوحة المؤشرات والتحليلات',
      labelEn: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: undefined,
      isPopularSignal: false
    },
    {
      id: 'fleet' as const,
      labelAr: 'أسطول سولينا والأسعار',
      labelEn: 'Solina Fleet & Pricing',
      icon: Car,
      badge: language === 'ar' ? `${stats.totalFleetCount} موديل` : `${stats.totalFleetCount} Models`,
      isPopularSignal: false
    },
    {
      id: 'vin_inventory' as const,
      labelAr: 'مخزون الشاسيه والمستودعات',
      labelEn: 'VIN Stock & Warehouses',
      icon: Layers,
      badge: stats.agingVinCount > 0
        ? (language === 'ar' ? `${stats.agingVinCount} راكد` : `${stats.agingVinCount} Aging`)
        : (language === 'ar' ? `${stats.totalVinStockCount} مركبة` : `${stats.totalVinStockCount} VIN`),
      isPopularSignal: stats.agingVinCount > 0
    },
    {
      id: 'leads' as const,
      labelAr: 'الطلبات والحجوزات والمبيعات',
      labelEn: 'Leads & Appointments',
      icon: Users,
      badge: hasNewLeads
        ? (language === 'ar' ? `${stats.newTestDrivesCount + stats.pendingServicesCount} جديد` : `${stats.newTestDrivesCount + stats.pendingServicesCount} New`)
        : `${stats.totalTestDrives + stats.totalServices + stats.totalQuotations}`,
      isPopularSignal: hasNewLeads
    },
    {
      id: 'workshop' as const,
      labelAr: 'ورش الصيانة وأوامر العمل',
      labelEn: 'Workshop & Express Bay',
      icon: Wrench,
      badge: language === 'ar'
        ? `${stats.activeJobCardsCount + stats.readyJobCardsCount} نشط`
        : `${stats.activeJobCardsCount + stats.readyJobCardsCount} Active`,
      isPopularSignal: false
    },
    {
      id: 'zatca' as const,
      labelAr: 'الفوترة الضريبية الإلكترونية',
      labelEn: 'ZATCA e-Invoicing',
      icon: FileText,
      badge: language === 'ar' ? `${stats.totalInvoicesCount} فاتورة` : `${stats.totalInvoicesCount} Inv`,
      isPopularSignal: false
    },
    {
      id: 'accounting' as const,
      labelAr: 'المحاسبة والعُهد والخزينة',
      labelEn: 'Accounting & Treasury',
      icon: Wallet,
      badge: language === 'ar' ? `${stats.activeCustodiesCount} عهدة` : `${stats.activeCustodiesCount} Active`,
      isPopularSignal: false
    },
    {
      id: 'offers' as const,
      labelAr: 'العروض الترويجية والحملات',
      labelEn: 'Campaigns & Offers',
      icon: Tag,
      badge: `${stats.totalOffersCount}`,
      isPopularSignal: false
    },
    {
      id: 'cpo' as const,
      labelAr: 'السيارات المستعملة المعتمدة',
      labelEn: 'Certified Pre-Owned',
      icon: ShieldCheck,
      badge: `${stats.totalCPOCount}`,
      isPopularSignal: false
    },
    {
      id: 'parts' as const,
      labelAr: 'قطع الغيار والإكسسوارات',
      labelEn: 'Genuine Parts & OEM',
      icon: PackageCheck,
      badge: stats.lowStockPartsCount > 0
        ? (language === 'ar' ? `${stats.lowStockPartsCount} نقص` : `${stats.lowStockPartsCount} Low`)
        : `${stats.totalPartsCount}`,
      isPopularSignal: stats.lowStockPartsCount > 0
    },
    {
      id: 'showrooms' as const,
      labelAr: 'الفروع وصالات العرض',
      labelEn: 'Showrooms Network',
      icon: MapPin,
      badge: `${stats.totalShowroomsCount}`,
      isPopularSignal: false
    },
    {
      id: 'settings' as const,
      labelAr: 'إعدادات الوكالة والنسخ',
      labelEn: 'Settings & Backup',
      icon: Settings,
      badge: language === 'ar' ? 'النظام' : 'ERP',
      isPopularSignal: false
    }
  ];

  // Role-based filtering of sidebar modules
  const ROLE_ALLOWED_TABS: Record<AdminRoleType, AdminTabType[]> = {
    gm: ['overview', 'fleet', 'vin_inventory', 'leads', 'workshop', 'zatca', 'accounting', 'offers', 'cpo', 'parts', 'showrooms', 'settings'],
    sales: ['overview', 'fleet', 'vin_inventory', 'leads', 'offers', 'cpo', 'showrooms'],
    workshop: ['overview', 'workshop', 'parts', 'leads'],
    finance: ['overview', 'zatca', 'accounting', 'vin_inventory', 'leads', 'settings']
  };
  const allowedTabsForRole = ROLE_ALLOWED_TABS[adminRole];
  const visibleNavItems = navItems.filter(item => allowedTabsForRole.includes(item.id));

  // Global Command Palette Search Results
  const commandResults = useMemo(() => {
    const q = commandQuery.trim().toLowerCase();
    const results: Array<{
      id: string;
      categoryAr: string;
      titleAr: string;
      subtitleAr: string;
      targetTab: AdminTabType | LeadsSubTabType;
      badgeAr?: string;
    }> = [];

    if (!q) {
      return [
        { id: 'qa-overview', categoryAr: 'تنقل سريع', titleAr: 'لوحة المؤشرات والتحليلات التنفيذية', subtitleAr: 'عرض قمع المبيعات، الإيرادات، وأداء الفروع', targetTab: 'overview' as const, badgeAr: 'Overview' },
        { id: 'qa-leads', categoryAr: 'تنقل سريع', titleAr: 'إدارة الطلبات والحجوزات (Kanban / جدول)', subtitleAr: `${testDrives.length} تجربة قيادة • ${serviceAppointments.length} صيانة`, targetTab: 'leads' as const, badgeAr: 'CRM' },
        { id: 'qa-vin', categoryAr: 'تنقل سريع', titleAr: 'مخزون الشاسيه والمستودعات (VIN)', subtitleAr: `${vinStock.length} مركبة مسجلة بالـ VIN`, targetTab: 'vin_inventory' as const, badgeAr: 'VIN' },
        { id: 'qa-workshop', categoryAr: 'تنقل سريع', titleAr: 'أوامر العمل والمسار السريع 45 دقيقة', subtitleAr: `${jobCards.length} كرت عمل بالورشة`, targetTab: 'workshop' as const, badgeAr: 'Workshop' },
        { id: 'qa-zatca', categoryAr: 'تنقل سريع', titleAr: 'الفوترة الإلكترونية ZATCA وإشعارات الدائن', subtitleAr: `${zatcaInvoices.length} فاتورة ضريبية ومبسطة`, targetTab: 'zatca' as const, badgeAr: 'ZATCA' },
        { id: 'qa-accounting', categoryAr: 'تنقل سريع', titleAr: 'النظام المحاسبي وسندات القبض والصرف والعُهد المالية', subtitleAr: `${vouchers.length} سند محاسبي • ${custodies.length} عهدة مالية`, targetTab: 'accounting' as const, badgeAr: 'Accounting' },
        { id: 'qa-settings', categoryAr: 'تنقل سريع', titleAr: 'إعدادات الوكالة ومحرك التمويل والنسخ الاحتياطي', subtitleAr: 'تعديل نسب المرابحة APR وتصدير قاعدة البيانات JSON', targetTab: 'settings' as const, badgeAr: 'ERP' }
      ];
    }

    vehicles.forEach(v => {
      if (v.nameAr.toLowerCase().includes(q) || v.nameEn.toLowerCase().includes(q)) {
        results.push({
          id: `veh-${v.id}`,
          categoryAr: 'أسطول سولينا 2026',
          titleAr: `سولينا ${v.nameAr} (${v.year})`,
          subtitleAr: `السعر يبدأ من ${v.priceStartingFrom.toLocaleString('ar-SA')} ر.س • ${v.engineSpec}`,
          targetTab: 'fleet',
          badgeAr: v.bodyTypeAr
        });
      }
    });

    vinStock.forEach(s => {
      if (s.vin.toLowerCase().includes(q) || s.model.toLowerCase().includes(q) || s.location.toLowerCase().includes(q)) {
        results.push({
          id: `vin-${s.id}`,
          categoryAr: 'مخزون الشاسيه VIN',
          titleAr: `${s.vin} — ${s.model}`,
          subtitleAr: `${s.location} • ${s.price.toLocaleString('ar-SA')} ر.س`,
          targetTab: 'vin_inventory',
          badgeAr: s.status
        });
      }
    });

    testDrives.forEach(td => {
      if (td.fullName.toLowerCase().includes(q) || td.phone.includes(q) || td.modelName.toLowerCase().includes(q)) {
        results.push({
          id: `td-${td.id}`,
          categoryAr: 'طلبات تجربة القيادة',
          titleAr: `${td.fullName} (${td.phone})`,
          subtitleAr: `${td.modelName} • ${td.preferredShowroom}`,
          targetTab: 'test_drives',
          badgeAr: td.status
        });
      }
    });

    serviceAppointments.forEach(srv => {
      if (srv.fullName.toLowerCase().includes(q) || srv.phone.includes(q) || srv.plateNumber.toLowerCase().includes(q)) {
        results.push({
          id: `srv-${srv.id}`,
          categoryAr: 'مواعيد الصيانة',
          titleAr: `${srv.fullName} — لوحة ${srv.plateNumber}`,
          subtitleAr: `${srv.serviceType} • ${srv.preferredDate}`,
          targetTab: 'services',
          badgeAr: srv.status
        });
      }
    });

    quotations.forEach(qt => {
      if (qt.fullName.toLowerCase().includes(q) || qt.quotationNumber.toLowerCase().includes(q)) {
        results.push({
          id: `qt-${qt.id}`,
          categoryAr: 'عروض الأسعار والتمويل',
          titleAr: `${qt.quotationNumber} — ${qt.fullName}`,
          subtitleAr: `${qt.vehicleName} • ${qt.totalWithVat.toLocaleString('ar-SA')} ر.س`,
          targetTab: 'quotations',
          badgeAr: qt.financeType === 'lease' ? 'تمويل' : 'نقدي'
        });
      }
    });

    jobCards.forEach(jc => {
      if (jc.cardNumber.toLowerCase().includes(q) || jc.customerName.toLowerCase().includes(q) || jc.plateNumber.toLowerCase().includes(q)) {
        results.push({
          id: `jc-${jc.id}`,
          categoryAr: 'أوامر العمل بالورشة',
          titleAr: `${jc.cardNumber} — ${jc.vehicleModel}`,
          subtitleAr: `العميل: ${jc.customerName} • الفني: ${jc.technicianName}`,
          targetTab: 'workshop',
          badgeAr: jc.status
        });
      }
    });

    zatcaInvoices.forEach(inv => {
      if (inv.invoiceNumber.toLowerCase().includes(q) || inv.customerName.toLowerCase().includes(q) || inv.vinNumber.toLowerCase().includes(q)) {
        results.push({
          id: `inv-${inv.id}`,
          categoryAr: 'فواتير ZATCA الضريبية',
          titleAr: `${inv.invoiceNumber} — ${inv.customerName}`,
          subtitleAr: `${inv.vehicleModel} • الإجمالي: ${inv.totalAmount.toLocaleString('ar-SA')} ر.س`,
          targetTab: 'zatca',
          badgeAr: inv.status
        });
      }
    });

    spareParts.forEach(p => {
      if (p.nameAr.toLowerCase().includes(q) || p.partNumber.toLowerCase().includes(q)) {
        results.push({
          id: `part-${p.id}`,
          categoryAr: 'قطع الغيار الأصلية',
          titleAr: `${p.nameAr} (${p.partNumber})`,
          subtitleAr: `${p.category} • ${p.price} ر.س`,
          targetTab: 'parts',
          badgeAr: 'OEM'
        });
      }
    });

    vouchers.forEach(vch => {
      if (vch.voucherNumber.toLowerCase().includes(q) || vch.partyName.toLowerCase().includes(q) || vch.description.toLowerCase().includes(q)) {
        results.push({
          id: `vch-${vch.id}`,
          categoryAr: 'السندات المحاسبية والخزينة',
          titleAr: `${vch.voucherNumber} — ${vch.partyName}`,
          subtitleAr: `${vch.description} • ${vch.totalAmount.toLocaleString('ar-SA')} ر.س`,
          targetTab: 'accounting',
          badgeAr: vch.type === 'receipt' ? 'سند قبض' : vch.type === 'payment' ? 'سند صرف' : 'قيد يومية'
        });
      }
    });

    custodies.forEach(cst => {
      if (cst.custodyNumber.toLowerCase().includes(q) || cst.employeeName.toLowerCase().includes(q) || cst.branchName.toLowerCase().includes(q)) {
        results.push({
          id: `cst-${cst.id}`,
          categoryAr: 'العُهد المالية والسلف',
          titleAr: `${cst.custodyNumber} — ${cst.employeeName}`,
          subtitleAr: `${cst.branchName} • المتبقي: ${cst.remainingBalance.toLocaleString('ar-SA')} ر.س`,
          targetTab: 'accounting',
          badgeAr: 'عهدة مالية'
        });
      }
    });

    return results.slice(0, 12);
  }, [commandQuery, vehicles, vinStock, testDrives, serviceAppointments, quotations, jobCards, zatcaInvoices, spareParts, vouchers, custodies]);

  const handleDownloadAllFormats = (dataset: ExportDatasetType) => {
    const downloadableFormats: ExportFormatType[] = ['excel', 'csv', 'word', 'json', 'xml', 'sql', 'html', 'markdown', 'txt'];
    downloadableFormats.forEach((fmt, idx) => {
      setTimeout(() => {
        exportDataInFormat(dataset, fmt);
      }, idx * 180);
    });
  };

  return (
    <div className="mobbin-admin-shell w-full min-h-screen bg-[#ffffff] text-[#141414] flex flex-col justify-between select-none">
      {/* 1. Full-Screen Responsive Floating Stadium Header (nav-pill) */}
      <header className="sticky top-0 z-40 pt-3 pb-2 px-3 sm:px-5 lg:px-7 bg-[#ffffff]/95 backdrop-blur-md w-full">
        <div className="w-full max-w-none bg-[#f3f3f3] rounded-full px-3 md:px-5 py-2 flex items-center justify-between gap-3">
          
          {/* Brand Lockup + Desktop Sidebar Collapse Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)}
              className="lg:hidden p-2 rounded-full bg-[#ffffff] text-[#141414] border border-[#e0e0e0] hover:bg-[#e0e0e0] cursor-pointer shrink-0"
              title={language === 'ar' ? 'القائمة الجانبية' : 'Sidebar Menu'}
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSidebarCollapsedDesktop(!sidebarCollapsedDesktop)}
              className="hidden lg:flex p-2 rounded-full bg-[#ffffff] text-[#141414] border border-[#e0e0e0] hover:bg-[#e0e0e0] cursor-pointer shrink-0"
              title={sidebarCollapsedDesktop ? (language === 'ar' ? 'توسيع القائمة الجانبية' : 'Expand Sidebar') : (language === 'ar' ? 'طي القائمة الجانبية (ملء الشاشة الكامل)' : 'Collapse Sidebar')}
            >
              {sidebarCollapsedDesktop ? <PanelRightOpen className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 px-1.5 bg-[#ffffff] border border-[#e0e0e0] mobbin-squircle flex items-center justify-center shrink-0">
                <img src="/solina-logo.png" alt="سولينا للسيارات" width={40} height={24} className="h-6 w-auto object-contain" />
              </div>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="mobbin-heading text-base md:text-lg text-[#141414]">
                  {language === 'ar' ? 'سولينا.' : 'Solina.'}
                </span>
                <span className="hidden md:inline-block text-xs text-[#707070] font-normal">
                  {language === 'ar' ? 'منصة إدارة الوكالة الشاملة' : 'Dealership Enterprise Platform'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Global Search Trigger (Command Palette Ctrl+K) + Quick Nav (when sidebar collapsed) */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-3xl min-w-0">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#eaeaea] text-[#707070] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer w-full max-w-md justify-between whitespace-nowrap"
              title={language === 'ar' ? 'البحث الشامل في النظام (Ctrl+K)' : 'Global System Search (Ctrl+K)'}
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-[#141414] shrink-0" />
                <span className="truncate">{language === 'ar' ? 'بحث شامل (رقم الشاسيه، عميل، فاتورة، قطعة غيار)...' : 'Search VIN, Customer, Invoice, Part...'}</span>
              </span>
              <kbd className="px-2 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] font-mono text-[10px] shrink-0">Ctrl+K</kbd>
            </button>

            {sidebarCollapsedDesktop && (
              <nav className="hidden 2xl:flex items-center gap-1 shrink-0">
                {[
                  { id: 'overview' as const, ar: 'المؤشرات', en: 'Overview' },
                  { id: 'fleet' as const, ar: 'الأسطول', en: 'Fleet' },
                  { id: 'vin_inventory' as const, ar: 'المستودعات', en: 'VIN' },
                  { id: 'leads' as const, ar: 'المبيعات', en: 'Leads' },
                  { id: 'workshop' as const, ar: 'الصيانة', en: 'Workshop' },
                  { id: 'zatca' as const, ar: 'الفوترة', en: 'ZATCA' },
                  { id: 'accounting' as const, ar: 'المحاسبة', en: 'Accounting' },
                  { id: 'settings' as const, ar: 'الإعدادات', en: 'Settings' }
                ]
                  .filter(link => allowedTabsForRole.includes(link.id))
                  .map(link => {
                    const active = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavigateTab(link.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#ffffff] text-[#141414]'
                            : 'text-[#707070] hover:text-[#141414]'
                        }`}
                      >
                        {language === 'ar' ? link.ar : link.en}
                      </button>
                    );
                  })}
              </nav>
            )}
          </div>

          {/* Right Pill Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile/Tablet Search Button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="lg:hidden p-2 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] transition-colors cursor-pointer shrink-0"
              title={language === 'ar' ? 'بحث شامل (Ctrl+K)' : 'Global Search (Ctrl+K)'}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Universal Multi-Format Export Button (تصدير بكل الصيغ) */}
            <button
              onClick={() => setExportModalRequest('all_erp')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={language === 'ar' ? 'تصدير الملفات والتقارير بجميع الصيغ المعتمدة' : 'Export Reports in All 10 Formats'}
            >
              <Download className="w-3.5 h-3.5 text-[#141414] shrink-0" />
              <span className="hidden sm:inline">{language === 'ar' ? 'تصدير بكل الصيغ' : 'Export Hub'}</span>
              <span className="mobbin-badge-popular px-2 py-0.5 text-[10px]">{language === 'ar' ? '10 صيغ' : '10 Formats'}</span>
            </button>

            {/* Live Preview & Audit Review Trigger */}
            <button
              onClick={() => {
                setPreviewMode('live_preview');
                setPreviewDrawerOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#141414] text-xs font-semibold border border-[#e0e0e0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={language === 'ar' ? 'المعاينة الحية وسجل المراجعة' : 'Live Preview & Audit Log'}
            >
              <Eye className="w-3.5 h-3.5 text-[#141414] shrink-0" />
              <span className="hidden md:inline">{language === 'ar' ? 'المعاينة والمراجعة' : 'Live Preview'}</span>
              {auditLogs.length > 0 && (
                <span className="mobbin-badge-popular px-2 py-0.5 text-[11px] font-mono">
                  {auditLogs.length}
                </span>
              )}
            </button>

            {/* Notifications Bell Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] transition-colors cursor-pointer"
                title={language === 'ar' ? 'التنبيهات اللحظية' : 'Live Notifications'}
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="mobbin-badge-popular absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="mobbin-modal-card absolute left-0 mt-3 w-80 bg-[#ffffff] text-[#141414] p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-2.5">
                    <span className="font-semibold text-xs text-[#141414] flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#141414]" />
                      <span>{language === 'ar' ? 'تنبيهات عمليات سولينا.' : 'Solina Live Alerts.'}</span>
                    </span>
                    <button onClick={() => setNotificationsOpen(false)} className="text-[#707070] hover:text-[#141414] p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                    {testDrives.filter(t => t.status === 'new').map(td => (
                      <div
                        key={td.id}
                        onClick={() => handleNavigateTab('test_drives')}
                        className="p-3 rounded-[16px] bg-[#f3f3f3] hover:bg-[#e0e0e0] cursor-pointer transition-colors"
                      >
                        <div className="font-semibold text-[#141414]">{language === 'ar' ? `طلب تجربة قيادة جديد: ${td.fullName}` : `New Test Drive: ${td.fullName}`}</div>
                        <div className="text-[11px] text-[#707070] mt-0.5">{td.modelName} • {td.preferredShowroom}</div>
                      </div>
                    ))}
                    {serviceAppointments.filter(s => s.status === 'pending').map(srv => (
                      <div
                        key={srv.id}
                        onClick={() => handleNavigateTab('services')}
                        className="p-3 rounded-[16px] bg-[#f3f3f3] hover:bg-[#e0e0e0] cursor-pointer transition-colors"
                      >
                        <div className="font-semibold text-[#141414]">{language === 'ar' ? `حجز صيانة بانتظار التأكيد: ${srv.fullName}` : `Pending Service: ${srv.fullName}`}</div>
                        <div className="text-[11px] text-[#707070] mt-0.5">{srv.vehicleModel} ({srv.plateNumber})</div>
                      </div>
                    ))}
                    {stats.readyJobCardsCount > 0 && (
                      <div
                        onClick={() => handleNavigateTab('workshop')}
                        className="p-3 rounded-[16px] bg-[#f3f3f3] hover:bg-[#e0e0e0] cursor-pointer transition-colors"
                      >
                        <div className="font-semibold text-[#141414]">{language === 'ar' ? `${stats.readyJobCardsCount} سيارات جاهزة للتسليم بالورشة` : `${stats.readyJobCardsCount} Vehicles Ready for Handover`}</div>
                        <div className="text-[11px] text-[#707070] mt-0.5">{language === 'ar' ? 'اضغط لإصدار الفاتورة وتسليم العميل' : 'Click to issue invoice & handover'}</div>
                      </div>
                    )}
                    {unreadAlertsCount === 0 && (
                      <div className="text-center py-4 text-[#adadad] text-xs">
                        {language === 'ar' ? 'لا توجد تنبيهات معلقة حالياً' : 'No pending alerts'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (confirm(language === 'ar' ? 'هل تريد استعادة البيانات الافتراضية الأولية لوكالة سولينا؟' : 'Reset to default Solina seed data?')) {
                  resetToDefaultData();
                }
              }}
              title={language === 'ar' ? 'استعادة البيانات الافتراضية' : 'Reset Demo Data'}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] border border-[#e0e0e0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#707070]" />
              <span className="hidden 2xl:inline">{language === 'ar' ? 'استعادة الافتراضي' : 'Reset'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-xs font-semibold text-[#141414] border border-[#e0e0e0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#707070]" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Return to Public Showroom */}
            <button
              onClick={onClose}
              className="mobbin-ink-pill flex items-center gap-2 bg-[#141414] hover:bg-[#262626] text-[#ffffff] font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{language === 'ar' ? 'الموقع العام' : 'Showroom'}</span>
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Full-Screen Adaptive Workspace (100% Viewport Width with Collapsible Sidebar) */}
      <div className="flex-1 w-full max-w-none px-3 sm:px-5 lg:px-7 py-4 md:py-6 flex flex-col lg:flex-row gap-5 items-start">
        
        {/* Sidebar Navigation (Collapsible on Desktop, Drawer on Mobile) */}
        <aside className={`bg-[#ffffff] rounded-[24px] border border-[#f0f0f0] space-y-1.5 sticky top-20 transition-all duration-200 shrink-0 ${
          sidebarCollapsedDesktop ? 'lg:w-[82px] p-3' : 'lg:w-[300px] xl:w-[315px] p-4'
        } ${
          sidebarOpenMobile ? 'fixed inset-x-4 top-16 z-50 block max-h-[84vh] overflow-y-auto mobbin-modal-card p-5' : 'hidden lg:block'
        }`}>
          {sidebarOpenMobile && (
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#f0f0f0] lg:hidden">
              <span className="font-semibold text-xs text-[#707070]">{language === 'ar' ? 'القائمة الإدارية — سولينا.' : 'Admin Navigation — Solina.'}</span>
              <button onClick={() => setSidebarOpenMobile(false)} className="p-1 text-[#707070]">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Role Switcher Card (Hidden when collapsed to icon rail) */}
          {!sidebarCollapsedDesktop && (
            <div className="p-3 rounded-[18px] bg-[#f3f3f3] mb-2.5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#141414] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#141414]" />
                  <span>{language === 'ar' ? 'الدور الوظيفي:' : 'Active Role:'}</span>
                </span>
                <span className="mobbin-badge-popular px-2.5 py-0.5 text-[10px]">
                  {language === 'ar' ? ADMIN_ROLES_META[adminRole].badgeAr : adminRole.toUpperCase()}
                </span>
              </div>
              <select
                id="admin-role-select"
                name="adminRole"
                aria-label={language === 'ar' ? 'الدور الوظيفي' : 'Active Role'}
                value={adminRole}
                onChange={(e) => {
                  const nextRole = e.target.value as AdminRoleType;
                  setAdminRole(nextRole);
                  const allowed = ROLE_ALLOWED_TABS[nextRole];
                  if (!allowed.includes(activeTab)) {
                    setActiveTab('overview');
                  }
                }}
                className="w-full py-1.5 px-2.5 rounded-xl bg-[#ffffff] text-[#141414] text-xs font-bold border border-[#e0e0e0] cursor-pointer outline-none"
              >
                {(Object.keys(ADMIN_ROLES_META) as AdminRoleType[]).map(r => (
                  <option key={r} value={r}>
                    {language === 'ar'
                      ? ADMIN_ROLES_META[r].titleAr
                      : r === 'gm'
                        ? 'General Manager (Full Access)'
                        : r === 'sales'
                          ? 'Sales & Showrooms Director'
                          : r === 'workshop'
                            ? 'Workshop & Parts Manager'
                            : 'Finance & ZATCA Auditor'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!sidebarCollapsedDesktop && (
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#707070] px-2.5 py-1">
              <span>{language === 'ar' ? 'أقسام إدارة وكالة سولينا' : 'Solina Modules'}</span>
              <button
                onClick={() => setSidebarCollapsedDesktop(true)}
                className="hidden lg:inline-flex items-center gap-1 text-[10px] text-[#707070] hover:text-[#141414] cursor-pointer"
                title={language === 'ar' ? 'توسيع مساحة العمل' : 'Maximize Workspace'}
              >
                <Maximize2 className="w-3 h-3" />
                <span>{language === 'ar' ? 'توسيع العرض' : 'Expand'}</span>
              </button>
            </div>
          )}

          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigateTab(item.id)}
                title={language === 'ar' ? item.labelAr : item.labelEn}
                className={`mobbin-shell-row w-full flex items-center ${
                  sidebarCollapsedDesktop ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
                } text-[13px] font-semibold transition-colors cursor-pointer text-start gap-2 ${
                  isActive
                    ? 'bg-[#141414] text-[#ffffff] mobbin-ink-pill'
                    : 'bg-transparent text-[#141414] hover:bg-[#f3f3f3]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-7 h-7 mobbin-squircle flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#262626] text-[#ffffff]' : 'bg-[#f3f3f3] text-[#141414]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  {!sidebarCollapsedDesktop && (
                    <span className="whitespace-nowrap truncate">{language === 'ar' ? item.labelAr : item.labelEn}</span>
                  )}
                </div>

                {!sidebarCollapsedDesktop && item.badge && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-mono shrink-0 whitespace-nowrap ${
                    item.isPopularSignal
                      ? 'mobbin-badge-popular'
                      : isActive 
                        ? 'bg-[#262626] text-[#ffffff]' 
                        : 'bg-[#f3f3f3] text-[#707070]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Export, Preview & Review Shortcuts inside Sidebar */}
          {!sidebarCollapsedDesktop ? (
            <div className="pt-3 border-t border-[#f0f0f0] space-y-2 mt-2">
              <button
                onClick={() => setExportModalRequest('all_erp')}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] mobbin-ink-pill font-semibold text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'ar' ? 'مركز التصدير بكل الصيغ' : 'Universal Export Hub'}</span>
                </div>
                <span className="mobbin-badge-popular px-2 py-0.5 text-[10px]">{language === 'ar' ? '10 صيغ' : '10 Formats'}</span>
              </button>

              <button
                onClick={() => {
                  setPreviewMode('live_preview');
                  setPreviewDrawerOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] font-semibold text-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Eye className="w-3.5 h-3.5 text-[#141414] shrink-0" />
                  <span>{language === 'ar' ? 'معاينة التعديلات حياً' : 'Live Site Preview'}</span>
                </div>
                <span className="mobbin-badge-popular px-2 py-0.5 text-[10px]">{language === 'ar' ? 'مباشر' : 'Live'}</span>
              </button>

              <button
                onClick={() => {
                  setPreviewMode('audit_log');
                  setPreviewDrawerOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] font-semibold text-xs transition-colors cursor-pointer border border-[#e0e0e0]"
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <History className="w-3.5 h-3.5 text-[#707070] shrink-0" />
                  <span>{language === 'ar' ? 'سجل المراجعة والتدقيق' : 'Audit & Review Log'}</span>
                </div>
                <span className="text-[11px] font-mono bg-[#f3f3f3] text-[#141414] px-2 py-0.5 rounded-full">
                  {auditLogs.length}
                </span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#f0f0f0] flex flex-col items-center gap-2 mt-2">
              <button
                onClick={() => setExportModalRequest('all_erp')}
                title={language === 'ar' ? 'مركز التصدير بكل الصيغ' : 'Universal Export Hub'}
                className="p-2.5 rounded-full bg-[#141414] text-[#ffffff] mobbin-ink-pill cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSidebarCollapsedDesktop(false)}
                title={language === 'ar' ? 'توسيع القائمة الجانبية' : 'Expand Sidebar'}
                className="p-2.5 rounded-full bg-[#f3f3f3] text-[#141414] cursor-pointer"
              >
                <PanelRightOpen className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>

        {/* Content Tab Stage — Stretches to 100% of remaining viewport width */}
        <main className="flex-1 min-w-0 w-full">
          <Suspense
            fallback={
              <div className="p-12 text-center bg-[#ffffff] rounded-[24px] border border-[#f0f0f0] text-xs font-bold text-[#707070]">
                جاري تحميل القسم...
              </div>
            }
          >
            {activeTab === 'overview' && (
              <AdminOverviewTab onSwitchTab={handleNavigateTab} />
            )}

            {activeTab === 'fleet' && (
              <AdminFleetTab />
            )}

            {activeTab === 'vin_inventory' && (
              <AdminVINInventoryTab />
            )}

            {activeTab === 'leads' && (
              <AdminLeadsTab 
                initialSubTab={leadsSubTab} 
                onSubTabChange={setLeadsSubTab}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'workshop' && (
              <AdminWorkshopJobCardsTab onNavigateTab={handleNavigateTab} />
            )}

            {activeTab === 'zatca' && (
              <AdminZatcaInvoicingTab />
            )}

            {activeTab === 'accounting' && (
              <AdminAccountingTab />
            )}

            {activeTab === 'offers' && (
              <AdminOffersTab />
            )}

            {activeTab === 'cpo' && (
              <AdminCPOTab />
            )}

            {activeTab === 'parts' && (
              <AdminPartsTab />
            )}

            {activeTab === 'showrooms' && (
              <AdminShowroomsTab />
            )}

            {activeTab === 'settings' && (
              <AdminSettingsTab />
            )}
          </Suspense>
        </main>

      </div>

      {/* 3. Full-Width Polarity-Inverted Mobbin Footer Block (#141414 with 24px top corners) */}
      <footer className="mobbin-footer-inverse mt-10 px-4 sm:px-6 lg:px-10 py-8 w-full">
        <div className="w-full max-w-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 px-1.5 bg-[#ffffff] mobbin-squircle flex items-center justify-center">
                <img src="/solina-logo.png" alt="سولينا للسيارات" className="h-5 w-auto object-contain" />
              </div>
              <h3 className="text-base font-semibold">
                {language === 'ar' ? 'سولينا للسيارات.' : 'Solina Motors.'}
              </h3>
            </div>
            <p className="mobbin-footer-muted text-xs max-w-xl">
              {language === 'ar'
                ? 'منصة الإدارة التنفيذية الموحدة لعمليات الأسطول، المستودعات، الصيانة السريعة، والفوترة الضريبية المعتمدة.'
                : 'Unified dealership operations platform for fleet, VIN logistics, express maintenance, and ZATCA e-invoicing.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
            <button onClick={() => setExportModalRequest('all_erp')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'تصدير شامل (10 صيغ)' : 'Multi-Format Export'}
            </button>
            <button onClick={() => handleNavigateTab('overview')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'المؤشرات التنفيذية' : 'Executive Overview'}
            </button>
            <button onClick={() => handleNavigateTab('fleet')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'أسطول 2026' : '2026 Fleet'}
            </button>
            <button onClick={() => handleNavigateTab('vin_inventory')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'مخزون المركبات' : 'VIN Inventory'}
            </button>
            <button onClick={() => handleNavigateTab('zatca')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'الفوترة الضريبية' : 'ZATCA Phase 2'}
            </button>
            <button onClick={() => handleNavigateTab('accounting')} className="mobbin-footer-link hover:opacity-80 cursor-pointer">
              {language === 'ar' ? 'المحاسبة والعُهد' : 'Accounting & Custodies'}
            </button>
            <button onClick={onClose} className="mobbin-footer-link hover:opacity-80 cursor-pointer inline-flex items-center gap-1">
              <span>{language === 'ar' ? 'الواجهة العامة' : 'Public Storefront'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-full max-w-none mt-6 pt-4 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="mobbin-footer-muted">
            © 2026 {language === 'ar' ? 'شركة سولينا للسيارات — جميع الحقوق محفوظة.' : 'Solina Motors Co. All rights reserved.'}
          </span>
          <span className="mobbin-footer-muted font-mono">
            {language === 'ar'
              ? 'الرقم الضريبي: 310984729100003 • الفوترة الإلكترونية المعتمدة (المرحلة الثانية)'
              : 'VATIN: 310984729100003 • ZATCA Phase 2 Connected • Full-Viewport Responsive'}
          </span>
        </div>
      </footer>

      {/* 4. UNIVERSAL MULTI-FORMAT EXPORT MODAL (مركز تصدير الملفات بجميع الصيغ) */}
      {exportModalRequest && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setExportModalRequest(null)}
        >
          <div
            className="mobbin-modal-card max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#e0e0e0] flex items-center justify-between gap-4 bg-[#ffffff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 mobbin-squircle bg-[#141414] text-[#ffffff] flex items-center justify-center shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="mobbin-heading text-base md:text-lg text-[#141414]">
                      {language === 'ar' ? 'مركز تصدير الملفات والتقارير بجميع الصيغ.' : 'Universal Multi-Format Export Hub.'}
                    </h3>
                    <span className="mobbin-badge-popular px-2.5 py-0.5 text-[11px]">{language === 'ar' ? '10 صيغ معتمدة' : '10 Formats'}</span>
                  </div>
                  <p className="mobbin-subtitle-light text-xs mt-0.5">
                    {language === 'ar'
                      ? 'اختر القسم أو الجدول المطلوب وحمّله فوراً بجميع الصيغ الرسمية المعتمدة'
                      : 'Select any dataset and download immediately in 10 enterprise formats'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setExportModalRequest(null)}
                title="إغلاق نافذة التصدير"
                aria-label="إغلاق نافذة التصدير"
                className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] flex items-center justify-center text-[#141414] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 bg-[#ffffff]">
              {/* Step 1: Dataset Selector */}
              <div className="space-y-2">
                <label htmlFor="export-dataset-select" className="text-xs font-bold text-[#141414] block">
                  {language === 'ar' ? '1. اختر القسم أو قاعدة البيانات المطلوب تصديرها:' : '1. Select Dataset to Export:'}
                </label>
                <select
                  id="export-dataset-select"
                  name="exportDataset"
                  value={selectedExportDataset}
                  onChange={(e) => setSelectedExportDataset(e.target.value as ExportDatasetType)}
                  className="w-full p-3 rounded-2xl bg-[#f0f0f0] text-[#141414] text-xs md:text-sm font-bold cursor-pointer"
                >
                  {EXPORT_DATASETS_LIST.map(ds => (
                    <option key={ds.id} value={ds.id}>
                      {ds.labelAr} — ({ds.descAr})
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Format Cards Grid */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#141414]">
                    {language === 'ar' ? '2. اختر صيغة التصدير المطلوبة للتحميل الفوري:' : '2. Choose Export Format:'}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDownloadAllFormats(selectedExportDataset)}
                    className="mobbin-ink-pill px-4 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تحميل بجميع الصيغ دفعة واحدة (9 ملفات)' : 'Download All Formats at Once (9 Files)'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EXPORT_FORMATS_LIST.map(fmt => (
                    <div
                      key={fmt.id}
                      onClick={() => exportDataInFormat(selectedExportDataset, fmt.id)}
                      className="p-4 rounded-[20px] bg-[#f3f3f3] hover:bg-[#eaeaea] border border-[#e0e0e0] flex flex-col justify-between gap-3 cursor-pointer transition-all"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-full bg-[#141414] text-[#ffffff]">
                            {fmt.ext}
                          </span>
                          <span className={fmt.id === 'excel' || fmt.id === 'pdf_print' ? 'mobbin-badge-popular' : 'text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#707070]'}>
                            {fmt.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs md:text-sm text-[#141414] pt-1">{fmt.titleAr}</h4>
                        <p className="text-[11px] text-[#707070] leading-relaxed">{fmt.descAr}</p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          exportDataInFormat(selectedExportDataset, fmt.id);
                        }}
                        className="w-full py-2 rounded-full bg-[#ffffff] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414] border border-[#e0e0e0] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {fmt.id === 'pdf_print' ? <Printer className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                        <span>{fmt.id === 'pdf_print' ? 'معاينة وطباعة PDF' : `تصدير بصيغة ${fmt.ext}`}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-[#f3f3f3] border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#707070]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#141414]" />
                <FileJson className="w-3.5 h-3.5 text-[#141414]" />
                <FileCode className="w-3.5 h-3.5 text-[#141414]" />
                <span>جميع الملفات المصدرة تدعم الترميز العربي القياسي (UTF-8 BOM) والترويسة الضريبية لوكالة سولينا.</span>
              </div>
              <button
                onClick={() => setExportModalRequest(null)}
                className="px-4 py-1.5 rounded-full bg-[#ffffff] text-[#141414] font-bold border border-[#e0e0e0] cursor-pointer"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Global Command Palette Modal (Ctrl+K / ⌘K) */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/60 backdrop-blur-xs flex items-start justify-center pt-16 p-4"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="mobbin-modal-card max-w-2xl w-full bg-[#ffffff] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#e0e0e0] flex items-center gap-3">
              <div className="w-9 h-9 mobbin-squircle bg-[#141414] text-[#ffffff] flex items-center justify-center shrink-0">
                <Command className="w-4 h-4" />
              </div>
              <input
                id="command-search-input"
                name="commandQuery"
                aria-label="بحث الأوامر الشامل"
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="ابحث برقم الشاسيه VIN، اسم العميل، رقم الفاتورة، القطعة، أو اسم الموديل..."
                className="flex-1 text-sm font-semibold bg-[#f0f0f0] px-4 py-2.5 rounded-xl text-[#141414] outline-none"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="px-3 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-xs font-bold text-[#707070] cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1.5">
              {commandResults.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#707070]">
                  لا توجد نتائج مطابقة لـ "{commandQuery}" في سجلات سولينا
                </div>
              ) : (
                commandResults.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigateTab(item.targetTab)}
                    className="w-full p-3 rounded-[16px] hover:bg-[#f3f3f3] flex items-center justify-between gap-3 text-start transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f3f3f3] text-[#707070]">
                          {item.categoryAr}
                        </span>
                        <span className="text-xs font-bold text-[#141414]">{item.titleAr}</span>
                      </div>
                      <p className="text-[11px] text-[#707070] mt-0.5">{item.subtitleAr}</p>
                    </div>
                    {item.badgeAr && (
                      <span className="mobbin-badge-popular shrink-0">{item.badgeAr}</span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2.5 bg-[#f3f3f3] border-t border-[#e0e0e0] flex items-center justify-between text-[11px] text-[#707070]">
              <span>استخدم البحث الشامل للوصول الفوري لأي شاسيه أو فاتورة أو عميل</span>
              <span className="font-mono">Solina Command Center • Ctrl+K</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Live Preview & Audit Review Modal (Full-Viewport Responsive) */}
      {previewDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
          onClick={() => setPreviewDrawerOpen(false)}
        >
          <div
            className="mobbin-modal-card max-w-[96vw] w-full h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="bg-[#ffffff] px-6 py-4 border-b border-[#f0f0f0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                  {previewMode === 'live_preview' ? <Eye className="w-5 h-5" /> : <History className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="mobbin-heading text-base md:text-lg text-[#141414]">
                    {language === 'ar' 
                      ? 'مركز المعاينة الحية ومراجعة التعديلات.' 
                      : 'Live Storefront Preview & Audit Review.'}
                  </h3>
                  <p className="mobbin-subtitle-light text-xs">
                    {language === 'ar'
                      ? 'عاين كيف تظهر التعديلات للعملاء على الموقع العام وتطبيق الجوال أو راجع سجل العمليات الإدارية مع التراجع الفوري'
                      : 'Preview how changes appear on the public storefront and mobile app or inspect the administrative audit trail'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full">
                  <button
                    onClick={() => setPreviewMode('live_preview')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      previewMode === 'live_preview' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>المعاينة الحية للموقع</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('audit_log')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      previewMode === 'audit_log' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>سجل المراجعة ({auditLogs.length})</span>
                  </button>
                </div>

                <button
                  onClick={() => setPreviewDrawerOpen(false)}
                  title="إغلاق المعاينة"
                  aria-label="إغلاق المعاينة"
                  className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] flex items-center justify-center text-[#141414] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode 1: LIVE SITE PREVIEW */}
            {previewMode === 'live_preview' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#f3f3f3]">
                <div className="bg-[#ffffff] px-6 py-3 border-b border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                      { id: 'fleet', label: `الأسطول والأسعار (${vehicles.length})` },
                      { id: 'live_site', label: 'الموقع التفاعلي الكامل' },
                      { id: 'live_app', label: 'تطبيق الجوال التفاعلي' },
                      { id: 'offers', label: `العروض الترويجية (${offers.length})` },
                      { id: 'cpo', label: `المستعمل المعتمد (${cpoVehicles.length})` },
                      { id: 'parts', label: `قطع الغيار (${spareParts.length})` },
                      { id: 'showrooms', label: `الفروع (${showrooms.length})` },
                      { id: 'zatca', label: `الفواتير الضريبية (${zatcaInvoices.length})` },
                      { id: 'accounting', label: `السندات والعُهد (${vouchers.length + custodies.length})` }
                    ].map(sec => (
                      <button
                        key={sec.id}
                        onClick={() => setPreviewSection(sec.id as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          previewSection === sec.id
                            ? 'bg-[#141414] text-[#ffffff] mobbin-ink-pill'
                            : 'bg-[#f3f3f3] text-[#707070] hover:text-[#141414]'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full">
                      <button
                        onClick={() => setPreviewDevice('desktop')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                          previewDevice === 'desktop' ? 'mobbin-segmented-active' : 'text-[#707070]'
                        }`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>سطح المكتب</span>
                      </button>
                      <button
                        onClick={() => setPreviewDevice('mobile')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                          previewDevice === 'mobile' ? 'mobbin-segmented-active' : 'text-[#707070]'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>الجوال</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setPreviewDrawerOpen(false);
                        onClose();
                      }}
                      className="mobbin-ink-pill px-4 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح الموقع الكامل</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
                  <div className={`bg-[#ffffff] rounded-[24px] border border-[#e0e0e0] p-4 sm:p-6 transition-all duration-300 w-full ${
                    previewDevice === 'mobile' || previewSection === 'live_app' ? 'max-w-[430px]' : 'max-w-full'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#f0f0f0]">
                      <div className="flex items-center gap-2.5">
                        <img src="/solina-logo.png" alt="سولينا" className="h-7 w-auto object-contain" />
                        <span className="font-semibold text-sm text-[#141414]">معاينة الواجهة العامة — سولينا للسيارات.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {previewSection === 'fleet' && (
                          <input
                            id="preview-fleet-search"
                            name="previewFleetSearch"
                            aria-label="بحث في الأسطول"
                            type="text"
                            value={previewSearchQuery}
                            onChange={(e) => setPreviewSearchQuery(e.target.value)}
                            placeholder="ابحث عن مركبة في المعاينة..."
                            className="px-3.5 py-1.5 rounded-full bg-[#f3f3f3] text-xs font-semibold text-[#141414] outline-none w-48 sm:w-64"
                          />
                        )}
                        <span className="mobbin-badge-popular px-3 py-1">
                          متزامن لحظياً ({vehicles.length} مركبة)
                        </span>
                      </div>
                    </div>

                    {previewSection === 'live_site' && (
                      <div className="w-full h-[70vh] rounded-[20px] overflow-hidden border border-[#e0e0e0] bg-[#ffffff]">
                        <iframe
                          src="/?view=storefront"
                          title="المعاينة التفاعلية للموقع العام"
                          className="w-full h-full border-0"
                        />
                      </div>
                    )}

                    {previewSection === 'live_app' && (
                      <div className="w-full h-[72vh] rounded-[28px] overflow-hidden border-4 border-[#141414] bg-[#f3f3f3] shadow-xl">
                        <iframe
                          src="/?view=mobile-native"
                          title="معاينة تطبيق سولينا للجوال"
                          className="w-full h-full border-0"
                        />
                      </div>
                    )}

                    {previewSection === 'fleet' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                        {vehicles
                          .filter(v => {
                            if (!previewSearchQuery.trim()) return true;
                            const q = previewSearchQuery.toLowerCase();
                            return v.nameAr.toLowerCase().includes(q) || v.nameEn.toLowerCase().includes(q) || v.bodyTypeAr.toLowerCase().includes(q);
                          })
                          .map(v => (
                          <div key={v.id} className="p-5 rounded-[24px] border border-[#f0f0f0] hover:border-[#141414] transition-colors flex flex-col justify-between bg-[#ffffff]">
                            <div>
                              <div className="flex items-center justify-between text-[11px] font-semibold mb-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#707070]">{v.bodyTypeAr}</span>
                                {v.isFeatured && <span className="mobbin-badge-popular px-2.5 py-0.5">مميزة</span>}
                              </div>
                              <div className="h-28 flex items-center justify-center my-2 bg-[#f3f3f3] rounded-[16px] p-2">
                                <img src={v.cardImage} alt={v.nameAr} className="max-h-full max-w-full object-contain" loading="lazy" width={220} height={96} />
                              </div>
                              <h4 className="mobbin-heading text-[#141414] text-sm mt-2">{v.nameAr}</h4>
                              <p className="text-[12px] text-[#707070]">{v.engineSpec} • {v.fuelEconomy}</p>
                            </div>
                            <div className="pt-3 mt-3 border-t border-[#f0f0f0] space-y-2.5">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[11px] text-[#adadad] block">يبدأ من</span>
                                  <strong className="text-sm font-semibold text-[#141414] font-mono">{formatPrice(v.priceStartingFrom)} ر.س</strong>
                                </div>
                                <div className="text-end">
                                  <span className="text-[11px] text-[#adadad] block">القسط الشهري</span>
                                  <span className="text-xs font-semibold text-[#707070] font-mono">{formatPrice(v.monthlyInstallmentStartingFrom)} ر.س</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewDrawerOpen(false);
                                  handleNavigateTab('fleet');
                                }}
                                className="w-full py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#141414] text-[#141414] hover:text-[#ffffff] text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                تعديل السعر والبيانات في الأسطول
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'offers' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {offers.map(o => (
                          <div key={o.id} className="rounded-[24px] border border-[#f0f0f0] overflow-hidden bg-[#ffffff]">
                            <div className="h-40 relative bg-[#f3f3f3]">
                              <img src={o.image} alt={o.title} className="w-full h-full object-cover" />
                              <span className="mobbin-badge-overlay absolute top-3 right-3 px-3 py-1">
                                {o.badge}
                              </span>
                            </div>
                            <div className="p-5 space-y-1">
                              <h4 className="mobbin-heading text-[#141414] text-sm">{o.title}</h4>
                              <p className="text-xs text-[#707070]">{o.subtitle}</p>
                              <div className="text-[11px] text-[#adadad] pt-1">{o.validUntil}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'cpo' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'}`}>
                        {cpoVehicles.map(c => (
                          <div key={c.id} className="p-5 rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] space-y-2">
                            <div className="h-28 bg-[#f3f3f3] rounded-[16px] flex items-center justify-center p-2">
                              <img src={c.image} alt={c.titleAr} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h4 className="mobbin-heading text-[#141414] text-sm">{c.titleAr}</h4>
                            <p className="text-xs text-[#707070]">{c.grade} • موديل {c.year} • {formatPrice(c.mileage)} كم</p>
                            <div className="font-semibold text-[#141414] font-mono text-sm">{formatPrice(c.price)} ر.س</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'parts' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'}`}>
                        {spareParts.map(p => (
                          <div key={p.id} className="p-4 rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] flex items-center gap-3">
                            <img src={p.image} alt={p.nameAr} className="w-14 h-14 object-contain bg-[#f3f3f3] rounded-[16px] p-1.5" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-[#141414] text-xs truncate">{p.nameAr}</h4>
                              <span className="text-[11px] text-[#adadad] font-mono block">{p.partNumber}</span>
                              <strong className="text-xs font-semibold text-[#141414] font-mono">{formatPrice(p.price)} ر.س</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'showrooms' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {showrooms.map(s => (
                          <div key={s.id} className="p-5 rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="mobbin-heading text-[#141414] text-sm">{s.name}</h4>
                              <span className="text-[11px] bg-[#f3f3f3] text-[#141414] font-semibold px-2.5 py-0.5 rounded-full">{s.city}</span>
                            </div>
                            <p className="text-xs text-[#707070]">{s.address}</p>
                            <p className="text-[11px] text-[#707070] font-mono">{s.phone} • {s.workingHours}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'zatca' && (
                      <div className={`grid gap-4 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {zatcaInvoices.map(inv => (
                          <div key={inv.id} className="p-5 rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#141414]">{inv.invoiceNumber}</span>
                              <span className="mobbin-badge-popular px-2.5 py-0.5 text-[10px]">ZATCA Phase 2</span>
                            </div>
                            <h4 className="mobbin-heading text-[#141414] text-sm">{inv.customerName}</h4>
                            <p className="text-xs text-[#707070]">{inv.vehicleModel} • {inv.vinNumber}</p>
                            <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                              <span className="text-[11px] text-[#707070] font-mono">{inv.date}</span>
                              <strong className="text-sm font-bold text-[#141414] font-mono">{formatPrice(inv.totalAmount)} ر.س</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {previewSection === 'accounting' && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="mobbin-heading text-sm text-[#141414] mb-3">سندات القبض والصرف والقيود ({vouchers.length})</h4>
                          <div className={`grid gap-3 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                            {vouchers.map(vch => (
                              <div key={vch.id} className="p-4 rounded-[20px] border border-[#f0f0f0] bg-[#ffffff] space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-bold text-[#141414]">{vch.voucherNumber}</span>
                                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414]">
                                    {vch.type === 'receipt' ? 'سند قبض' : vch.type === 'payment' ? 'سند صرف' : 'قيد يومية'}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-[#141414]">{vch.partyName}</p>
                                <p className="text-[11px] text-[#707070]">{vch.description}</p>
                                <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                                  <span className="text-[11px] text-[#707070] font-mono">{vch.date}</span>
                                  <strong className="text-xs font-bold text-[#141414] font-mono">{formatPrice(vch.totalAmount)} ر.س</strong>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mobbin-heading text-sm text-[#141414] mb-3">العُهد المالية وصناديق المصروفات النثرية ({custodies.length})</h4>
                          <div className={`grid gap-3 ${previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                            {custodies.map(cst => (
                              <div key={cst.id} className="p-4 rounded-[20px] border border-[#f0f0f0] bg-[#ffffff] space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-bold text-[#141414]">{cst.custodyNumber}</span>
                                  <span className="mobbin-badge-popular px-2.5 py-0.5 text-[10px]">{cst.branchName}</span>
                                </div>
                                <p className="text-xs font-bold text-[#141414]">{cst.employeeName} — {cst.employeeRole}</p>
                                <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-mono">
                                  <span className="text-[#707070]">المتبقي: <strong className="text-[#141414]">{formatPrice(cst.remainingBalance)} ر.س</strong></span>
                                  <span className="text-[#707070]">من {formatPrice(cst.allocatedAmount)} ر.س</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: AUDIT & REVIEW LOG */}
            {previewMode === 'audit_log' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#f3f3f3] p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ffffff] p-5 rounded-[24px] border border-[#e0e0e0]">
                  <div>
                    <h4 className="mobbin-heading text-sm text-[#141414]">سجل المراجعة والتدقيق للعمليات الإدارية (مع التراجع الفوري).</h4>
                    <p className="mobbin-subtitle-light text-xs">
                      يتم توثيق كافة عمليات الإضافة والتعديل والحذف والاعتماد مع حفظ لقطة استرجاع (Snapshot) للتراجع بضغطة واحدة
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExportModalRequest('audit_logs')}
                      className="px-4 py-1.5 rounded-full bg-[#141414] text-[#ffffff] mobbin-ink-pill text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تصدير سجل المراجعة (كل الصيغ)</span>
                    </button>
                    {auditLogs.length > 0 && (
                      <button
                        onClick={clearAuditLogs}
                        className="px-4 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>مسح السجل</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5">
                  {auditLogs.length === 0 ? (
                    <div className="text-center py-12 bg-[#ffffff] rounded-[24px] border border-[#e0e0e0] text-[#adadad] text-xs">
                      لا توجد تعديلات مسجلة في السجل حالياً
                    </div>
                  ) : (
                    auditLogs.map(log => (
                      <div key={log.id} className="bg-[#ffffff] p-4 rounded-[16px] border border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-xs md:text-sm text-[#141414]">
                                {language === 'ar' ? log.summaryAr : log.summaryEn}
                              </span>
                              {log.reverted && (
                                <span className="mobbin-badge-popular">تم التراجع</span>
                              )}
                            </div>

                            {log.diffAr && (
                              <div className="mt-1 inline-block px-2.5 py-0.5 rounded-md bg-[#f3f3f3] text-[#141414] font-mono text-[11px] font-semibold">
                                الفارق (Diff): {log.diffAr}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-[#707070] font-mono">
                              <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] font-semibold">{log.module}</span>
                              {log.actorAr && (
                                <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#595959]">بواسطة: {log.actorAr}</span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(log.timestamp).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {log.canUndo && !log.reverted && (
                          <button
                            onClick={() => undoAuditLog(log.id)}
                            className="mobbin-ink-pill px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#2b2b2b] text-[#ffffff] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer self-end sm:self-center"
                            title="استرجاع الحالة السابقة قبل هذا التعديل"
                          >
                            <Undo2 className="w-3.5 h-3.5" />
                            <span>تراجع عن التعديل (Undo)</span>
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
