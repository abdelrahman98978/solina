import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  VEHICLES, 
  OFFERS, 
  CERTIFIED_PRE_OWNED, 
  GENUINE_PARTS, 
  SHOWROOMS, 
  Vehicle, 
  Offer,
  PreOwnedVehicle,
  SparePart,
  Showroom
} from '../data/toyotaData';

export type AdminRoleType = 'gm' | 'sales' | 'workshop' | 'finance';

export interface AdminRoleMeta {
  id: AdminRoleType;
  titleAr: string;
  titleEn: string;
  staffNameAr: string;
  staffNameEn: string;
  badgeAr: string;
}

export const ADMIN_ROLES_META: Record<AdminRoleType, AdminRoleMeta> = {
  gm: {
    id: 'gm',
    titleAr: 'المدير العام التنفيذي',
    titleEn: 'Executive General Manager',
    staffNameAr: 'م. عبدالرحمن السديري',
    staffNameEn: 'Eng. Abdulrahman Al-Sudairi',
    badgeAr: 'صلاحية كاملة'
  },
  sales: {
    id: 'sales',
    titleAr: 'مدير المبيعات والأسطول',
    titleEn: 'Sales & Fleet Director',
    staffNameAr: 'أ. تركي العتيبي',
    staffNameEn: 'Turki Al-Otaibi',
    badgeAr: 'المبيعات والأسطول'
  },
  workshop: {
    id: 'workshop',
    titleAr: 'مدير الصيانة وقطع الغيار',
    titleEn: 'Aftersales & Workshop Manager',
    staffNameAr: 'م. أحمد الشريف',
    staffNameEn: 'Eng. Ahmed Al-Sharif',
    badgeAr: 'الصيانة وقطع الغيار'
  },
  finance: {
    id: 'finance',
    titleAr: 'المدير المالي ومسؤول ZATCA',
    titleEn: 'Finance & ZATCA Tax Officer',
    staffNameAr: 'أ. فيصل القحطاني',
    staffNameEn: 'Faisal Al-Qahtani',
    badgeAr: 'المالية والضرائب'
  }
};

export interface BankPartnerConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  aprPercent: number;
  minDownPaymentPercent: number;
  adminFeePercent: number;
  isActive: boolean;
}

export interface DealershipSettings {
  companyNameAr: string;
  companyNameEn: string;
  vatNumber: string;
  crNumber: string;
  unifiedPhone: string;
  whatsappNumber: string;
  headquartersAr: string;
  zatcaEnvironment: 'production' | 'simulation';
  zatcaCsidSerial: string;
  defaultAprPercent: number;
  minDownPaymentPercent: number;
  defaultBalloonPercent: number;
  adminFeePercent: number;
  expressServiceMinutes: number;
  announcementAr: string;
  announcementEn: string;
  bankPartners: BankPartnerConfig[];
}

export interface TestDriveLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  preferredShowroom: string;
  modelId: string;
  modelName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  nationalIdOrIqama?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
  assignedAdvisor?: string;
}

export interface ServiceAppointmentLead {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  showroom: string;
  vehicleModel: string;
  plateNumber: string;
  currentMileage: number;
  packageMileage: number;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  estimatedCost: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  assignedTechnician?: string;
  jobCardId?: string;
}

export interface QuotationRecord {
  id: string;
  quotationNumber: string;
  fullName: string;
  phone: string;
  city: string;
  vehicleId: string;
  vehicleName: string;
  gradeName: string;
  vehiclePrice: number;
  vatAmount: number;
  totalWithVat: number;
  financeType: 'cash' | 'lease';
  downPaymentPercent?: number;
  downPaymentAmount?: number;
  durationMonths?: number;
  monthlyInstallment?: number;
  bankName?: string;
  createdAt: string;
  status: 'draft' | 'sent' | 'approved' | 'deal_closed';
  invoiceId?: string;
}

export interface VehicleStockItem {
  id: string;
  vin: string;
  model: string;
  category: string;
  trim: string;
  color: string;
  engine: string;
  location: string;
  status: 'in_stock' | 'reserved' | 'in_transit' | 'sold';
  price: number;
  daysInInventory: number;
  arrivalDate: string;
}

export interface JobCard {
  id: string;
  cardNumber: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  plateNumber: string;
  vinNumber: string;
  mileage: number;
  serviceType: string;
  technicianName: string;
  bayNumber: string;
  status: 'received' | 'in_progress' | 'quality_check' | 'ready' | 'delivered';
  timeRemainingMinutes: number;
  partsUsed: string[];
  totalCost: number;
  createdAt?: string;
  sourceAppointmentId?: string;
  invoiceId?: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  uuid: string;
  customerName: string;
  customerPhone: string;
  vatNumber?: string;
  vehicleModel: string;
  vinNumber: string;
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
  date: string;
  type: 'tax_invoice' | 'simplified_invoice' | 'credit_note';
  status: 'reported' | 'cleared' | 'draft' | 'refunded';
  zatcaQrBase64: string;
  sourceQuotationId?: string;
  sourceJobCardId?: string;
  referenceInvoiceNumber?: string;
}

export interface CustodyRecord {
  id: string;
  custodyNumber: string;
  employeeName: string;
  employeeRole: string;
  branchName: string;
  custodyType: 'permanent_petty_cash' | 'workshop_operations' | 'showroom_hospitality' | 'procurement_advance';
  allocatedAmount: number;
  spentAmount: number;
  remainingBalance: number;
  issueDate: string;
  lastSettlementDate: string;
  status: 'active' | 'pending_settlement' | 'settled_closed';
  notes?: string;
}

export interface AccountingVoucher {
  id: string;
  voucherNumber: string;
  type: 'receipt' | 'payment' | 'journal';
  date: string;
  partyName: string;
  description: string;
  accountCode: string;
  accountName: string;
  costCenter: string;
  paymentMethod: 'bank_transfer' | 'mada_pos' | 'cash' | 'cheque' | 'custody_deduction';
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
  referenceNumber?: string;
  status: 'posted' | 'draft' | 'cancelled';
}

export interface AccountLedgerItem {
  code: string;
  nameAr: string;
  categoryAr: 'الأصول' | 'الالتزامات' | 'حقوق الملكية' | 'الإيرادات' | 'المصروفات';
  debit: number;
  credit: number;
  balance: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  module: 'fleet' | 'vin_inventory' | 'leads' | 'workshop' | 'zatca' | 'accounting' | 'offers' | 'cpo' | 'parts' | 'showrooms' | 'settings' | 'system';
  action: 'create' | 'update' | 'delete' | 'status_change' | 'convert' | 'reset';
  summaryAr: string;
  summaryEn: string;
  details?: string;
  diffAr?: string;
  diffEn?: string;
  actorAr?: string;
  actorEn?: string;
  canUndo?: boolean;
  reverted?: boolean;
}

export type ExportCSVType = 
  | 'test_drives' 
  | 'services' 
  | 'quotations' 
  | 'fleet' 
  | 'vin_stock' 
  | 'job_cards' 
  | 'zatca_invoices'
  | 'accounting_vouchers'
  | 'custodies'
  | 'chart_of_accounts'
  | 'offers'
  | 'parts' 
  | 'cpo' 
  | 'showrooms'
  | 'audit_logs'
  | 'all_erp';

export type ExportDatasetType = ExportCSVType | 'audit_logs' | 'all_erp';

export type ExportFormatType =
  | 'excel'
  | 'csv'
  | 'pdf_print'
  | 'word'
  | 'json'
  | 'xml'
  | 'sql'
  | 'html'
  | 'markdown'
  | 'txt';

interface StateSnapshot {
  vehicles: Vehicle[];
  offers: Offer[];
  cpoVehicles: PreOwnedVehicle[];
  spareParts: SparePart[];
  showrooms: Showroom[];
  testDrives: TestDriveLead[];
  serviceAppointments: ServiceAppointmentLead[];
  quotations: QuotationRecord[];
  vinStock: VehicleStockItem[];
  jobCards: JobCard[];
  zatcaInvoices: InvoiceItem[];
  custodies: CustodyRecord[];
  vouchers: AccountingVoucher[];
  settings: DealershipSettings;
  partQuantities: Record<string, number>;
}

interface AdminDataContextType {
  vehicles: Vehicle[];
  offers: Offer[];
  cpoVehicles: PreOwnedVehicle[];
  spareParts: SparePart[];
  showrooms: Showroom[];
  testDrives: TestDriveLead[];
  serviceAppointments: ServiceAppointmentLead[];
  quotations: QuotationRecord[];
  vinStock: VehicleStockItem[];
  jobCards: JobCard[];
  zatcaInvoices: InvoiceItem[];
  custodies: CustodyRecord[];
  vouchers: AccountingVoucher[];
  chartOfAccounts: AccountLedgerItem[];
  auditLogs: AuditLogEntry[];
  settings: DealershipSettings;
  partQuantities: Record<string, number>;
  adminRole: AdminRoleType;
  setAdminRole: (role: AdminRoleType) => void;
  
  // Vehicle Actions
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicleId: string, updated: Partial<Vehicle>) => void;
  updateVehiclePrice: (vehicleId: string, newPrice: number) => void;
  toggleVehicleFeatured: (vehicleId: string) => void;
  deleteVehicle: (vehicleId: string) => void;

  // VIN Inventory Actions
  addVinStock: (item: Omit<VehicleStockItem, 'id'>) => void;
  updateVinStock: (id: string, updated: Partial<VehicleStockItem>) => void;
  updateVinStatus: (id: string, status: VehicleStockItem['status']) => void;
  transferVinBranch: (id: string, targetBranch: string) => void;
  deleteVinStock: (id: string) => void;
  
  // Offers Actions
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, updated: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;

  // CPO Actions
  addCPOVehicle: (cpo: PreOwnedVehicle) => void;
  updateCPOVehicle: (id: string, updated: Partial<PreOwnedVehicle>) => void;
  deleteCPOVehicle: (id: string) => void;

  // Spare Parts Actions
  addSparePart: (part: SparePart) => void;
  updateSparePart: (id: string, updated: Partial<SparePart>) => void;
  updateSparePartPrice: (id: string, newPrice: number) => void;
  adjustPartQuantity: (partId: string, delta: number) => void;
  deleteSparePart: (id: string) => void;

  // Showrooms Actions
  addShowroom: (showroom: Showroom) => void;
  updateShowroom: (id: string, updated: Partial<Showroom>) => void;
  deleteShowroom: (id: string) => void;
  
  // Test Drive Actions & Bulk Operations
  addTestDrive: (lead: Omit<TestDriveLead, 'id' | 'createdAt' | 'status'>) => void;
  updateTestDrive: (id: string, updated: Partial<TestDriveLead>) => void;
  updateTestDriveStatus: (id: string, status: TestDriveLead['status']) => void;
  bulkUpdateTestDriveStatus: (ids: string[], status: TestDriveLead['status']) => void;
  bulkAssignTestDriveAdvisor: (ids: string[], advisor: string) => void;
  deleteTestDrive: (id: string) => void;
  
  // Service Booking Actions
  addServiceAppointment: (appointment: Omit<ServiceAppointmentLead, 'id' | 'createdAt' | 'status'>) => void;
  updateServiceAppointment: (id: string, updated: Partial<ServiceAppointmentLead>) => void;
  updateServiceStatus: (id: string, status: ServiceAppointmentLead['status']) => void;
  deleteServiceAppointment: (id: string) => void;
  convertServiceToJobCard: (appointmentId: string, bayNumber?: string, technicianName?: string) => JobCard | null;
  
  // Quotation Actions
  addQuotation: (quotation: Omit<QuotationRecord, 'id' | 'createdAt' | 'quotationNumber'>) => string;
  updateQuotation: (id: string, updated: Partial<QuotationRecord>) => void;
  updateQuotationStatus: (id: string, status: QuotationRecord['status']) => void;
  deleteQuotation: (id: string) => void;
  convertQuotationToInvoice: (quotationId: string, vinNumber?: string) => InvoiceItem | null;

  // Workshop Job Cards Actions
  addJobCard: (card: Omit<JobCard, 'id' | 'cardNumber'>) => JobCard;
  updateJobCard: (id: string, updated: Partial<JobCard>) => void;
  updateJobCardStatus: (id: string, status: JobCard['status']) => void;
  deleteJobCard: (id: string) => void;
  convertJobCardToInvoice: (jobCardId: string) => InvoiceItem | null;

  // ZATCA Invoices Actions
  addZatcaInvoice: (
    inv: Omit<InvoiceItem, 'id' | 'invoiceNumber' | 'uuid' | 'date' | 'zatcaQrBase64' | 'baseAmount' | 'vatAmount'> & {
      baseAmount?: number;
      vatAmount?: number;
    }
  ) => InvoiceItem;
  updateZatcaInvoiceStatus: (id: string, status: InvoiceItem['status']) => void;
  issueCreditNote: (invoiceId: string) => InvoiceItem | null;
  deleteZatcaInvoice: (id: string) => void;

  // Accounting, Vouchers & Custodies Actions
  addCustody: (custody: Omit<CustodyRecord, 'id' | 'custodyNumber' | 'remainingBalance' | 'lastSettlementDate'>) => CustodyRecord;
  settleCustodyExpense: (custodyId: string, expenseAmount: number, description: string, vatIncluded?: boolean) => void;
  replenishCustody: (custodyId: string, amountToAdd: number) => void;
  closeCustody: (custodyId: string) => void;
  deleteCustody: (custodyId: string) => void;
  addVoucher: (voucher: Omit<AccountingVoucher, 'id' | 'voucherNumber' | 'date'>) => AccountingVoucher;
  updateVoucherStatus: (id: string, status: AccountingVoucher['status']) => void;
  deleteVoucher: (id: string) => void;
  createReceiptFromInvoice: (invoiceId: string, paymentMethod?: AccountingVoucher['paymentMethod']) => AccountingVoucher | null;
  exportSingleDocument: (
    titleAr: string,
    docNumber: string,
    metaRows: Array<[string, string]>,
    tableHeaders: string[],
    tableRows: string[][],
    format: ExportFormatType
  ) => void;

  // Settings & Full Backup / Undo Actions
  updateSettings: (updated: Partial<DealershipSettings>) => void;
  undoAuditLog: (logId: string) => boolean;
  exportFullBackupJSON: () => void;
  importFullBackupJSON: (jsonString: string) => boolean;

  // Export & Audit utilities
  exportDataToCSV: (type: ExportCSVType, directFormat?: ExportFormatType) => void;
  exportDataInFormat: (type: ExportDatasetType, format: ExportFormatType) => void;
  exportModalRequest: ExportDatasetType | null;
  setExportModalRequest: (type: ExportDatasetType | null) => void;
  clearAuditLogs: () => void;

  // Stats Counters
  stats: {
    totalTestDrives: number;
    newTestDrivesCount: number;
    totalServices: number;
    pendingServicesCount: number;
    totalQuotations: number;
    totalPipelineValueSAR: number;
    totalFleetCount: number;
    totalOffersCount: number;
    totalCPOCount: number;
    totalPartsCount: number;
    lowStockPartsCount: number;
    totalShowroomsCount: number;
    totalVinStockCount: number;
    inStockVinCount: number;
    reservedVinCount: number;
    inTransitVinCount: number;
    agingVinCount: number;
    totalVinStockValueSAR: number;
    activeJobCardsCount: number;
    readyJobCardsCount: number;
    workshopRevenueSAR: number;
    totalInvoicesCount: number;
    totalInvoicedSalesSAR: number;
    totalVatCollectedSAR: number;
    totalReceiptsSAR: number;
    totalPaymentsSAR: number;
    netCashFlowSAR: number;
    totalInputVatSAR: number;
    netVatPayableSAR: number;
    totalCustodiesAllocatedSAR: number;
    totalCustodiesSpentSAR: number;
    totalCustodiesRemainingSAR: number;
    activeCustodiesCount: number;
  };

  resetToDefaultData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

function generateZatcaBase64(sellerName: string, vatNo: string, timestamp: string, total: number, vat: number): string {
  try {
    const raw = `1:${sellerName}|2:${vatNo}|3:${timestamp}|4:${total.toFixed(2)}|5:${vat.toFixed(2)}`;
    return btoa(unescape(encodeURIComponent(raw)));
  } catch {
    return 'AQ9zb2xpbmEtbW90b3JzAg8zMTA5ODQ3MjkxMDAwMDMDEDIwMjYtMDgtMjZUMTU6MDA6MDA=';
  }
}

export const INITIAL_SETTINGS: DealershipSettings = {
  companyNameAr: 'شركة سولينا للسيارات',
  companyNameEn: 'Solina Motors Co.',
  vatNumber: '310984729100003',
  crNumber: '1010998877',
  unifiedPhone: '8002444400',
  whatsappNumber: '966500000000',
  headquartersAr: 'الرياض — طريق خريص الرئيسي، المملكة العربية السعودية',
  zatcaEnvironment: 'production',
  zatcaCsidSerial: '1-SOLINA|2-DMS2026|3-99482716-ZATCA-PROD',
  defaultAprPercent: 3.49,
  minDownPaymentPercent: 10,
  defaultBalloonPercent: 25,
  adminFeePercent: 1.0,
  expressServiceMinutes: 45,
  announcementAr: 'عروض سولينا للسيارات 2026: 0% دفعة أولى وصيانة مجانية حتى 50,000 كم على طرازات الهايبرد المختارة.',
  announcementEn: 'Solina Motors 2026 Offers: 0% Down Payment & Free 50,000 KM Service on Select Hybrid Models.',
  bankPartners: [
    {
      id: 'bank-rajhi',
      nameAr: 'مصرف الراجحي',
      nameEn: 'Al Rajhi Bank',
      aprPercent: 3.39,
      minDownPaymentPercent: 0,
      adminFeePercent: 0,
      isActive: true
    },
    {
      id: 'bank-snb',
      nameAr: 'البنك الأهلي السعودي (SNB)',
      nameEn: 'Saudi National Bank (SNB)',
      aprPercent: 3.49,
      minDownPaymentPercent: 10,
      adminFeePercent: 1.0,
      isActive: true
    },
    {
      id: 'bank-riyad',
      nameAr: 'بنك الرياض',
      nameEn: 'Riyad Bank',
      aprPercent: 3.65,
      minDownPaymentPercent: 10,
      adminFeePercent: 1.0,
      isActive: true
    },
    {
      id: 'bank-solina',
      nameAr: 'شركة سولينا للتمويل التأجيري',
      nameEn: 'Solina Leasing Finance',
      aprPercent: 2.99,
      minDownPaymentPercent: 5,
      adminFeePercent: 0,
      isActive: true
    }
  ]
};

const INITIAL_PART_QUANTITIES: Record<string, number> = {
  'part-1': 42,
  'part-2': 18,
  'part-3': 7,
  'part-4': 64,
  'part-5': 5,
  'part-6': 29
};

const INITIAL_TEST_DRIVES: TestDriveLead[] = [
  {
    id: 'TD-10492',
    fullName: 'عبدالله السعدي',
    phone: '0501234567',
    city: 'الرياض',
    preferredShowroom: 'مركز خريص الرئيسي',
    modelId: 'prado-2026',
    modelName: 'سولينا لاند كروزر برادو 2026',
    preferredDate: '2026-08-20',
    preferredTimeSlot: '10:00 ص - 12:00 م',
    nationalIdOrIqama: '1084729381',
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    notes: 'مهتم بفئة TXL First Edition',
    assignedAdvisor: 'أ. تركي العتيبي'
  },
  {
    id: 'TD-10491',
    fullName: 'سعود فهد القحطاني',
    phone: '0559876543',
    city: 'جدة',
    preferredShowroom: 'مركز طريق المدينة',
    modelId: 'camry-2026',
    modelName: 'سولينا كامري 2026 هايبرد',
    preferredDate: '2026-08-21',
    preferredTimeSlot: '04:00 م - 06:00 م',
    nationalIdOrIqama: '1029384756',
    status: 'contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    notes: 'يرغب في معرفة برامج التمويل بدون دفعة أولى',
    assignedAdvisor: 'أ. ريان الغامدي'
  },
  {
    id: 'TD-10490',
    fullName: 'فيصل محمد الدوسري',
    phone: '0543219876',
    city: 'الدمام والخبر',
    preferredShowroom: 'مركز طريق الملك فهد',
    modelId: 'lc300-2026',
    modelName: 'سولينا لاند كروزر LC300 2026',
    preferredDate: '2026-08-22',
    preferredTimeSlot: '07:00 م - 09:00 م',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    notes: 'تم تأكيد الموعد عبر الهاتف مع العميل',
    assignedAdvisor: 'أ. ماجد الشهري'
  }
];

const INITIAL_SERVICES: ServiceAppointmentLead[] = [
  {
    id: 'SRV-8821',
    fullName: 'خالد إبراهيم المنصور',
    phone: '0567891234',
    city: 'الرياض',
    showroom: 'مركز خريص الرئيسي',
    vehicleModel: 'سولينا راف فور 2024 هايبرد',
    plateNumber: 'أ ب ج 4492',
    currentMileage: 20450,
    packageMileage: 20000,
    serviceType: 'صيانة دورية 20,000 كم (صيانة سريعة 45 دقيقة)',
    preferredDate: '2026-08-18',
    preferredTime: '09:30 ص',
    estimatedCost: 680,
    status: 'in_progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    assignedTechnician: 'م. أحمد الشريف'
  },
  {
    id: 'SRV-8820',
    fullName: 'مها عبدالعزيز الشمري',
    phone: '0533334455',
    city: 'جدة',
    showroom: 'مركز طريق المدينة',
    vehicleModel: 'سولينا كامري 2023',
    plateNumber: 'د هـ و 7120',
    currentMileage: 41200,
    packageMileage: 40000,
    serviceType: 'صيانة كبرى 40,000 كم (شاملة السوائل)',
    preferredDate: '2026-08-19',
    preferredTime: '11:00 ص',
    estimatedCost: 990,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    assignedTechnician: 'م. خالد السبيعي'
  }
];

const INITIAL_QUOTATIONS: QuotationRecord[] = [
  {
    id: 'QUO-2026-9041',
    quotationNumber: 'SOL-QUO-9041',
    fullName: 'عمر ياسين المالكي',
    phone: '0507788990',
    city: 'الرياض',
    vehicleId: 'prado-2026',
    vehicleName: 'سولينا لاند كروزر برادو 2026',
    gradeName: 'TXL 2.4L Turbo First Edition',
    vehiclePrice: 228850,
    vatAmount: 34327.5,
    totalWithVat: 263177.5,
    financeType: 'lease',
    downPaymentPercent: 10,
    downPaymentAmount: 26317.75,
    durationMonths: 60,
    monthlyInstallment: 3450,
    bankName: 'مصرف الراجحي',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'sent'
  },
  {
    id: 'QUO-2026-9040',
    quotationNumber: 'SOL-QUO-9040',
    fullName: 'بندر ناصر العتيبي',
    phone: '0551122334',
    city: 'الخبر',
    vehicleId: 'camry-2026',
    vehicleName: 'سولينا كامري 2026 هايبرد',
    gradeName: 'LUMIERE HEV 2.5L',
    vehiclePrice: 148925,
    vatAmount: 22338.75,
    totalWithVat: 171263.75,
    financeType: 'cash',
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    status: 'approved'
  }
];

const INITIAL_VIN_STOCK: VehicleStockItem[] = [
  {
    id: 'stk-1',
    vin: 'JT3HN87R6P0098412',
    model: 'سولينا لاند كروزر LC300',
    category: 'دفع رباعي',
    trim: 'VXR Twin Turbo 2026',
    color: 'أبيض لؤلؤي كريستالي',
    engine: '3.5L V6 Twin-Turbo (409 HP)',
    location: 'صالة الرياض - المعرض الرئيسي',
    status: 'in_stock',
    price: 268295,
    daysInInventory: 4,
    arrivalDate: '2026-08-22'
  },
  {
    id: 'stk-2',
    vin: '4T1B11HK5SU084511',
    model: 'سولينا كامري هايبرد',
    category: 'سيدان',
    trim: 'Grande HEV 2026',
    color: 'فضي تيتانيوم معدني',
    engine: '2.5L 4-Cyl Hybrid (225 HP)',
    location: 'صالة جدة - طريق الملك عبد العزيز',
    status: 'reserved',
    price: 105450,
    daysInInventory: 2,
    arrivalDate: '2026-08-24'
  },
  {
    id: 'stk-3',
    vin: 'JTDBC11K8SU091244',
    model: 'سولينا كراون سيدان',
    category: 'فاخرة',
    trim: 'Majesta AWD 2026',
    color: 'أسود ملكي فاخر',
    engine: '2.4L Turbo Hybrid (340 HP)',
    location: 'المستودع المركزي - الرياض',
    status: 'in_stock',
    price: 178480,
    daysInInventory: 52,
    arrivalDate: '2026-07-04'
  },
  {
    id: 'stk-4',
    vin: 'JTMMAR7R9P0023419',
    model: 'سولينا برادو 2026',
    category: 'دفع رباعي',
    trim: 'TX-L 4x4 2026',
    color: 'رمادي إسمنتي صخري',
    engine: '2.4L Turbo (281 HP)',
    location: 'في الشحن اللوجستي - ميناء الملك عبد العزيز',
    status: 'in_transit',
    price: 199870,
    daysInInventory: 0,
    arrivalDate: '2026-08-29'
  },
  {
    id: 'stk-5',
    vin: 'W1KZF8HB3PA109283',
    model: 'مرسيدس-بنز S-Class S500 4MATIC',
    category: 'سيدان فاخرة',
    trim: 'Long Wheelbase VIP 2026',
    color: 'أسود أوبسيديان ميتاليك',
    engine: '3.0L Turbo EQ Boost (429 HP)',
    location: 'صالة الرياض - صالة كبار الشخصيات VIP',
    status: 'in_stock',
    price: 685000,
    daysInInventory: 3,
    arrivalDate: '2026-08-23'
  },
  {
    id: 'stk-6',
    vin: 'JTJHY7AX8P2039182',
    model: 'لكزس LX600 VIP 2026',
    category: 'دفع رباعي فاخرة',
    trim: 'VIP 4-Seater Executive Lounge',
    color: 'تيتانيوم سونيك فاخر',
    engine: '3.5L V6 Twin-Turbo (409 HP)',
    location: 'صالة جدة - طريق الملك عبد العزيز',
    status: 'in_stock',
    price: 575000,
    daysInInventory: 49,
    arrivalDate: '2026-07-08'
  },
  {
    id: 'stk-7',
    vin: 'WP1AA2AY5PDA02918',
    model: 'بورشه كايين توربو E-Hybrid',
    category: 'هايبرد فائقة الأداء',
    trim: 'GT Package 729 HP 2026',
    color: 'أحمر كارماين بورش',
    engine: '4.0L V8 Turbo Hybrid (729 HP)',
    location: 'صالة الخبر - المعرض الإقليمي',
    status: 'reserved',
    price: 745000,
    daysInInventory: 1,
    arrivalDate: '2026-08-25'
  },
  {
    id: 'stk-8',
    vin: 'WAUZZZF28PD039121',
    model: 'أودي RS Q8 بيرفورمانس',
    category: 'دفع رباعي كوبيه',
    trim: 'Dynamic Package Plus 640 HP',
    color: 'رمادي ناردو الرياضي',
    engine: '4.0L Twin-Turbo V8 (640 HP)',
    location: 'صالة الرياض - صالة كبار الشخصيات VIP',
    status: 'in_stock',
    price: 720000,
    daysInInventory: 3,
    arrivalDate: '2026-08-23'
  },
  {
    id: 'stk-9',
    vin: 'JN8AY2NC7P9012844',
    model: 'نيسان باترول نيسمو بطل الدروب',
    category: 'دفع رباعي',
    trim: 'NISMO Takumi Edition 2026',
    color: 'أبيض لؤلؤي مع خطوط نيسمو',
    engine: '5.6L V8 (428 HP)',
    location: 'صالة جدة - طريق الملك عبد العزيز',
    status: 'in_stock',
    price: 412000,
    daysInInventory: 6,
    arrivalDate: '2026-08-20'
  },
  {
    id: 'stk-10',
    vin: '7PDSGABA8PA001298',
    model: 'لوسيد إير سافاير (فخر الصناعة بالسعودية)',
    category: 'سيدان كهربائية خارقة',
    trim: 'Tri-Motor 1234 HP Edition (رابغ KSA)',
    color: 'أزرق سافاير الياقوتي',
    engine: 'Tri-Motor Electric (1,234 HP)',
    location: 'صالة الرياض - صالة كبار الشخصيات VIP',
    status: 'in_stock',
    price: 960000,
    daysInInventory: 2,
    arrivalDate: '2026-08-24'
  },
  {
    id: 'stk-11',
    vin: '1GYS4HKJ9PR102948',
    model: 'كاديلاك إسكاليد V سوبرتشارج',
    category: 'دفع رباعي رئاسية',
    trim: 'V-Series 682 HP 2026',
    color: 'أسود الغراب الملكي',
    engine: '6.2L Supercharged V8 (682 HP)',
    location: 'المستودع المركزي - الرياض',
    status: 'in_stock',
    price: 820000,
    daysInInventory: 4,
    arrivalDate: '2026-08-22'
  },
  {
    id: 'stk-12',
    vin: '1FTFW1RJ7PFC09214',
    model: 'فورد F-150 رابتر R سوبرتشارج',
    category: 'بيك أب خارقة',
    trim: 'Raptor R 720 HP 2026',
    color: 'برتقالي كود رابتر',
    engine: '5.2L Supercharged V8 (720 HP)',
    location: 'صالة الخبر - المعرض الإقليمي',
    status: 'in_stock',
    price: 525000,
    daysInInventory: 7,
    arrivalDate: '2026-08-19'
  }
];

const INITIAL_JOB_CARDS: JobCard[] = [
  {
    id: 'job-101',
    cardNumber: 'JC-2026-0491',
    customerName: 'عبد الرحمن الشمري',
    customerPhone: '0501234567',
    vehicleModel: 'سولينا كامري 2026 هايبرد',
    plateNumber: 'س ل ن 2026',
    vinNumber: '4T1B11HK5SU084511',
    mileage: 10250,
    serviceType: 'صيانة دورية سريعة 10,000 كم (45 دقيقة)',
    technicianName: 'م. أحمد المصري',
    bayNumber: 'المسار السريع #02',
    status: 'in_progress',
    timeRemainingMinutes: 18,
    partsUsed: ['زيت سولينا تخليقي بالكامل 0W-20 (4.5 لتر)', 'فلتر زيت أصلي OEM', 'حلقة تفريغ كارتير'],
    totalCost: 345
  },
  {
    id: 'job-102',
    cardNumber: 'JC-2026-0492',
    customerName: 'فهد عبد الله الدوسري',
    customerPhone: '0558899001',
    vehicleModel: 'سولينا لاند كروزر LC300 2026',
    plateNumber: 'ر ي ض 300',
    vinNumber: 'JT3HN87R6P0098412',
    mileage: 30100,
    serviceType: 'صيانة دورية كبرى 30,000 كم + فحص فرامل',
    technicianName: 'م. خالد السبيعي',
    bayNumber: 'المسار المتقدم #05',
    status: 'quality_check',
    timeRemainingMinutes: 5,
    partsUsed: ['زيت محرك تيربو 5W-30 (7 لتر)', 'فلتر زيت + فلتر هواء أصلي', 'أقمشة فرامل أمامية أصلية'],
    totalCost: 1120
  },
  {
    id: 'job-103',
    cardNumber: 'JC-2026-0493',
    customerName: 'مشعل ناصر العتيبي',
    customerPhone: '0543322114',
    vehicleModel: 'سولينا كراون 2026 ماجستيك',
    plateNumber: 'ك ر ن 2026',
    vinNumber: 'JTDBC11K8SU091244',
    mileage: 5000,
    serviceType: 'فحص أولي مجاني 5,000 كم + غسيل شامل',
    technicianName: 'م. يوسف القحطاني',
    bayNumber: 'المسار السريع #01',
    status: 'ready',
    timeRemainingMinutes: 0,
    partsUsed: ['فحص نقاط السلامة الـ 40 مجاناً'],
    totalCost: 0
  }
];

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'SOL-INV-2026-00891',
    uuid: 'c39a8e12-7f41-4c92-91d8-8b4e728091a1',
    customerName: 'عبد الرحمن بن عبد العزيز آل سعود',
    customerPhone: '0501234567',
    vatNumber: '310984729100003',
    vehicleModel: 'سولينا لاند كروزر LC300 VXR 2026',
    vinNumber: 'JT3HN87R6P0098412',
    baseAmount: 233300,
    vatAmount: 34995,
    totalAmount: 268295,
    date: '2026-08-26 14:22:15',
    type: 'tax_invoice',
    status: 'cleared',
    zatcaQrBase64: 'AQ9zb2xpbmEtbW90b3JzAg8zMTA5ODQ3MjkxMDAwMDMDEDIwMjYtMDgtMjZUMTQ6MjI6MTUFBjI2ODI5NQYFMzQ5OTU='
  },
  {
    id: 'inv-002',
    invoiceNumber: 'SOL-INV-2026-00892',
    uuid: 'd82b9f34-1e52-4a81-80c7-7a3f619082b2',
    customerName: 'فيصل محمد الشمري',
    customerPhone: '0559876543',
    vehicleModel: 'سولينا كامري 2026 هايبرد قراندي',
    vinNumber: '4T1B11HK5SU084511',
    baseAmount: 91695.65,
    vatAmount: 13754.35,
    totalAmount: 105450,
    date: '2026-08-26 12:45:00',
    type: 'simplified_invoice',
    status: 'reported',
    zatcaQrBase64: 'AQ9zb2xpbmEtbW90b3JzAg8zMTA5ODQ3MjkxMDAwMDMDEDIwMjYtMDgtMjZUMTI6NDU6MDAFBjEwNTQ1MAYFMTM3NTQ='
  },
  {
    id: 'inv-003',
    invoiceNumber: 'SOL-INV-2026-00893',
    uuid: 'e71c8a45-3f63-4b92-92e8-9c5f820193c3',
    customerName: 'سارة خالد القحطاني',
    customerPhone: '0567788990',
    vehicleModel: 'سولينا كراون 2026 ماجستيك سيدان',
    vinNumber: 'JTDBC11K8SU091244',
    baseAmount: 155200,
    vatAmount: 23280,
    totalAmount: 178480,
    date: '2026-08-25 18:30:10',
    type: 'simplified_invoice',
    status: 'reported',
    zatcaQrBase64: 'AQ9zb2xpbmEtbW90b3JzAg8zMTA5ODQ3MjkxMDAwMDMDEDIwMjYtMDgtMjVUMTg6MzA6MTABFjE3ODQ4MAYFMjMyODA='
  }
];

const INITIAL_CUSTODIES: CustodyRecord[] = [
  {
    id: 'cus-001',
    custodyNumber: 'CUS-2026-801',
    employeeName: 'م. أحمد الشريف',
    employeeRole: 'مدير الصيانة والورش',
    branchName: 'مركز خريص الرئيسي — الرياض',
    custodyType: 'workshop_operations',
    allocatedAmount: 50000,
    spentAmount: 18450,
    remainingBalance: 31550,
    issueDate: '2026-08-01',
    lastSettlementDate: '2026-08-24',
    status: 'active',
    notes: 'عهدة تشغيلية مستديمة لمشتريات الورشة السريعة والمستهلكات الفنية'
  },
  {
    id: 'cus-002',
    custodyNumber: 'CUS-2026-802',
    employeeName: 'أ. تركي العتيبي',
    employeeRole: 'مدير صالة العرض والمبيعات',
    branchName: 'معرض طريق الملك فهد — جدة',
    custodyType: 'showroom_hospitality',
    allocatedAmount: 25000,
    spentAmount: 9200,
    remainingBalance: 15800,
    issueDate: '2026-08-05',
    lastSettlementDate: '2026-08-22',
    status: 'active',
    notes: 'عهدة ضيافة كبار العملاء VIP وتجهيز فعاليات تسليم المركبات الجديدة'
  },
  {
    id: 'cus-003',
    custodyNumber: 'CUS-2026-803',
    employeeName: 'أ. نايف القحطاني',
    employeeRole: 'أمين المستودع المركزي',
    branchName: 'المستودع الإقليمي — الدمام',
    custodyType: 'procurement_advance',
    allocatedAmount: 35000,
    spentAmount: 31500,
    remainingBalance: 3500,
    issueDate: '2026-08-10',
    lastSettlementDate: '2026-08-25',
    status: 'pending_settlement',
    notes: 'سلفة تخليص جمركي ونقل سريع لشحنات قطع الغيار الأصلية OEM'
  },
  {
    id: 'cus-004',
    custodyNumber: 'CUS-2026-804',
    employeeName: 'أ. فهد الدوسري',
    employeeRole: 'مشرف الخدمات الإدارية',
    branchName: 'الإدارة العامة — الرياض',
    custodyType: 'permanent_petty_cash',
    allocatedAmount: 15000,
    spentAmount: 15000,
    remainingBalance: 0,
    issueDate: '2026-07-01',
    lastSettlementDate: '2026-08-15',
    status: 'settled_closed',
    notes: 'تمت تسوية كامل الفواتير الضريبية وإقفال العهدة بموجب محضر مطابقة مالي'
  }
];

const INITIAL_VOUCHERS: AccountingVoucher[] = [
  {
    id: 'vch-001',
    voucherNumber: 'RV-2026-501',
    type: 'receipt',
    date: '2026-08-26 14:25:00',
    partyName: 'عبد الرحمن بن عبد العزيز آل سعود',
    description: 'سداد قيمة فاتورة بيع سيارة سولينا لاند كروزر LC300 VXR 2026',
    accountCode: '4101',
    accountName: 'إيرادات مبيعات السيارات الجديدة',
    costCenter: 'مركز خريص الرئيسي — الرياض',
    paymentMethod: 'bank_transfer',
    baseAmount: 233300,
    vatAmount: 34995,
    totalAmount: 268295,
    referenceNumber: 'SOL-INV-2026-00891',
    status: 'posted'
  },
  {
    id: 'vch-002',
    voucherNumber: 'RV-2026-502',
    type: 'receipt',
    date: '2026-08-26 12:50:00',
    partyName: 'فيصل محمد الشمري',
    description: 'سداد فاتورة بيع سيارة سولينا كامري 2026 هايبرد قراندي',
    accountCode: '4101',
    accountName: 'إيرادات مبيعات السيارات الجديدة',
    costCenter: 'معرض طريق المدينة — جدة',
    paymentMethod: 'mada_pos',
    baseAmount: 91695.65,
    vatAmount: 13754.35,
    totalAmount: 105450,
    referenceNumber: 'SOL-INV-2026-00892',
    status: 'posted'
  },
  {
    id: 'vch-003',
    voucherNumber: 'RV-2026-503',
    type: 'receipt',
    date: '2026-08-25 18:35:00',
    partyName: 'سارة خالد القحطاني',
    description: 'دفعة مبيعات سيارة سولينا كراون 2026 ماجستيك سيدان',
    accountCode: '4101',
    accountName: 'إيرادات مبيعات السيارات الجديدة',
    costCenter: 'مركز خريص الرئيسي — الرياض',
    paymentMethod: 'bank_transfer',
    baseAmount: 155200,
    vatAmount: 23280,
    totalAmount: 178480,
    referenceNumber: 'SOL-INV-2026-00893',
    status: 'posted'
  },
  {
    id: 'vch-004',
    voucherNumber: 'PV-2026-301',
    type: 'payment',
    date: '2026-08-25 11:15:00',
    partyName: 'شركة النقل البري واللوجستيات السعودية',
    description: 'أجور شحن ونقل 14 مركبة من ميناء جدة الإسلامي إلى مستودع الرياض',
    accountCode: '5102',
    accountName: 'مصروفات الشحن والنقل والتخليص',
    costCenter: 'المستودع المركزي — الرياض',
    paymentMethod: 'bank_transfer',
    baseAmount: 28000,
    vatAmount: 4200,
    totalAmount: 32200,
    referenceNumber: 'CUS-2026-803',
    status: 'posted'
  },
  {
    id: 'vch-005',
    voucherNumber: 'PV-2026-302',
    type: 'payment',
    date: '2026-08-24 16:40:00',
    partyName: 'مؤسسة التجهيزات الصناعية للورش',
    description: 'توريد زيوت تخليقية ومستهلكات فحص المسار السريع (تسوية عهدة الورشة)',
    accountCode: '5203',
    accountName: 'مصروفات تشغيل وصيانة الورش',
    costCenter: 'مركز خريص الرئيسي — الرياض',
    paymentMethod: 'custody_deduction',
    baseAmount: 16043.48,
    vatAmount: 2406.52,
    totalAmount: 18450,
    referenceNumber: 'CUS-2026-801',
    status: 'posted'
  },
  {
    id: 'vch-006',
    voucherNumber: 'JV-2026-101',
    type: 'journal',
    date: '2026-08-24 09:00:00',
    partyName: 'قيد استحقاق وتسوية العهدة الإدارية',
    description: 'إقفال وتسوية عهدة المصروفات الإدارية والضيافة للفترة السابقة',
    accountCode: '1104',
    accountName: 'عُهد وسلف الموظفين',
    costCenter: 'الإدارة العامة — الرياض',
    paymentMethod: 'cash',
    baseAmount: 13043.48,
    vatAmount: 1956.52,
    totalAmount: 15000,
    referenceNumber: 'CUS-2026-804',
    status: 'posted'
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-init-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    module: 'zatca',
    action: 'create',
    summaryAr: 'اعتماد ومطابقة فاتورة ضريبية SOL-INV-2026-00891 مع هيئة الزكاة ZATCA',
    summaryEn: 'Cleared tax invoice SOL-INV-2026-00891 with ZATCA Phase 2',
    diffAr: 'إجمالي الفاتورة: 268,295 ر.س (شامل 15% ضريبة القيمة المضافة)',
    actorAr: 'أ. فيصل القحطاني — المدير المالي ومسؤول ZATCA',
    actorEn: 'Faisal Al-Qahtani — Finance & ZATCA Tax Officer'
  },
  {
    id: 'log-init-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    module: 'leads',
    action: 'create',
    summaryAr: 'استلام طلب تجربة قيادة جديد: عبدالله السعدي (لاند كروزر برادو 2026)',
    summaryEn: 'New test drive request received: Abdullah Al-Saadi (Prado 2026)',
    diffAr: 'الفرع: مركز خريص الرئيسي • المستشار: أ. تركي العتيبي',
    actorAr: 'أ. تركي العتيبي — مدير المبيعات والأسطول',
    actorEn: 'Turki Al-Otaibi — Sales & Fleet Director'
  }
];

function loadFromStorage<T>(key: string, legacyKey: string | null, fallback: T): T {
  try {
    const saved = localStorage.getItem(key) || (legacyKey ? localStorage.getItem(legacyKey) : null);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
  }
  return fallback;
}

function loadAndMergeVehicles(): Vehicle[] {
  try {
    const savedRaw = localStorage.getItem('solina_admin_vehicles') || localStorage.getItem('toyota_admin_vehicles');
    if (!savedRaw) return VEHICLES;
    const savedList: Vehicle[] = JSON.parse(savedRaw);
    if (!Array.isArray(savedList)) return VEHICLES;

    const savedMap = new Map<string, Vehicle>();
    for (const sv of savedList) {
      if (sv && sv.id && !savedMap.has(sv.id)) {
        savedMap.set(sv.id, sv);
      }
    }

    const canonicalIds = new Set(VEHICLES.map(v => v.id));
    // Merge canonical VEHICLES with any custom price/featured edits while ensuring new colors/interiors/catalogs are present
    const merged: Vehicle[] = VEHICLES.map(canon => {
      const saved = savedMap.get(canon.id);
      if (!saved) return canon;
      return {
        ...canon,
        priceStartingFrom: saved.priceStartingFrom ?? canon.priceStartingFrom,
        monthlyInstallmentStartingFrom: saved.monthlyInstallmentStartingFrom ?? canon.monthlyInstallmentStartingFrom,
        isFeatured: saved.isFeatured ?? canon.isFeatured,
        colors: canon.colors,
        interiorImage: canon.interiorImage,
        interiorGallery: canon.interiorGallery,
        catalogSpecs: canon.catalogSpecs,
        brochureUrl: canon.brochureUrl
      };
    });

    // Also keep any custom user-added vehicles from Admin Dashboard
    for (const [id, sv] of savedMap.entries()) {
      if (!canonicalIds.has(id)) {
        merged.push(sv);
      }
    }

    return merged;
  } catch (e) {
    console.error('Error merging vehicles from localStorage:', e);
    return VEHICLES;
  }
}

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminRole, setAdminRole] = useState<AdminRoleType>(() =>
    loadFromStorage('solina_admin_role', null, 'gm')
  );
  const [settings, setSettings] = useState<DealershipSettings>(() =>
    loadFromStorage('solina_admin_settings', null, INITIAL_SETTINGS)
  );
  const [partQuantities, setPartQuantities] = useState<Record<string, number>>(() =>
    loadFromStorage('solina_admin_part_quantities', null, INITIAL_PART_QUANTITIES)
  );
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => loadAndMergeVehicles());
  const [offers, setOffers] = useState<Offer[]>(() =>
    loadFromStorage('solina_admin_offers', 'toyota_admin_offers', OFFERS)
  );
  const [cpoVehicles, setCpoVehicles] = useState<PreOwnedVehicle[]>(() =>
    loadFromStorage('solina_admin_cpo', 'toyota_admin_cpo', CERTIFIED_PRE_OWNED)
  );
  const [spareParts, setSpareParts] = useState<SparePart[]>(() =>
    loadFromStorage('solina_admin_parts', 'toyota_admin_parts', GENUINE_PARTS)
  );
  const [showrooms, setShowrooms] = useState<Showroom[]>(() =>
    loadFromStorage('solina_admin_showrooms', 'toyota_admin_showrooms', SHOWROOMS).map(s => ({
      ...s,
      name: s.name.replace(/سولينا سولينا/g, 'سولينا')
    }))
  );
  const [testDrives, setTestDrives] = useState<TestDriveLead[]>(() =>
    loadFromStorage('solina_admin_test_drives', 'toyota_admin_test_drives', INITIAL_TEST_DRIVES)
  );
  const [serviceAppointments, setServiceAppointments] = useState<ServiceAppointmentLead[]>(() =>
    loadFromStorage('solina_admin_services', 'toyota_admin_services', INITIAL_SERVICES)
  );
  const [quotations, setQuotations] = useState<QuotationRecord[]>(() =>
    loadFromStorage('solina_admin_quotations', 'toyota_admin_quotations', INITIAL_QUOTATIONS)
  );
  const [vinStock, setVinStock] = useState<VehicleStockItem[]>(() =>
    loadFromStorage('solina_admin_vin_stock', null, INITIAL_VIN_STOCK)
  );
  const [jobCards, setJobCards] = useState<JobCard[]>(() =>
    loadFromStorage('solina_admin_job_cards', null, INITIAL_JOB_CARDS)
  );
  const [zatcaInvoices, setZatcaInvoices] = useState<InvoiceItem[]>(() =>
    loadFromStorage('solina_admin_zatca_invoices', null, INITIAL_INVOICES)
  );
  const [custodies, setCustodies] = useState<CustodyRecord[]>(() =>
    loadFromStorage('solina_admin_custodies', null, INITIAL_CUSTODIES)
  );
  const [vouchers, setVouchers] = useState<AccountingVoucher[]>(() =>
    loadFromStorage('solina_admin_vouchers', null, INITIAL_VOUCHERS)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() =>
    loadFromStorage('solina_admin_audit_logs', null, INITIAL_AUDIT_LOGS)
  );

  // Undo Snapshots Map (logId -> StateSnapshot)
  const undoSnapshotsRef = useRef<Record<string, StateSnapshot>>({});

  const captureSnapshot = (): StateSnapshot => ({
    vehicles: JSON.parse(JSON.stringify(vehicles)),
    offers: JSON.parse(JSON.stringify(offers)),
    cpoVehicles: JSON.parse(JSON.stringify(cpoVehicles)),
    spareParts: JSON.parse(JSON.stringify(spareParts)),
    showrooms: JSON.parse(JSON.stringify(showrooms)),
    testDrives: JSON.parse(JSON.stringify(testDrives)),
    serviceAppointments: JSON.parse(JSON.stringify(serviceAppointments)),
    quotations: JSON.parse(JSON.stringify(quotations)),
    vinStock: JSON.parse(JSON.stringify(vinStock)),
    jobCards: JSON.parse(JSON.stringify(jobCards)),
    zatcaInvoices: JSON.parse(JSON.stringify(zatcaInvoices)),
    custodies: JSON.parse(JSON.stringify(custodies)),
    vouchers: JSON.parse(JSON.stringify(vouchers)),
    settings: JSON.parse(JSON.stringify(settings)),
    partQuantities: { ...partQuantities }
  });

  const appendLog = (
    module: AuditLogEntry['module'],
    action: AuditLogEntry['action'],
    summaryAr: string,
    summaryEn: string,
    diffAr?: string,
    diffEn?: string,
    snapshot?: StateSnapshot
  ) => {
    const roleMeta = ADMIN_ROLES_META[adminRole];
    const logId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    if (snapshot) {
      undoSnapshotsRef.current[logId] = snapshot;
    }
    const entry: AuditLogEntry = {
      id: logId,
      timestamp: new Date().toISOString(),
      module,
      action,
      summaryAr,
      summaryEn,
      diffAr,
      diffEn,
      actorAr: `${roleMeta.staffNameAr} — ${roleMeta.titleAr}`,
      actorEn: `${roleMeta.staffNameEn} — ${roleMeta.titleEn}`,
      canUndo: Boolean(snapshot),
      reverted: false
    };
    setAuditLogs(prev => [entry, ...prev.slice(0, 99)]);
  };

  const undoAuditLog = (logId: string): boolean => {
    const snap = undoSnapshotsRef.current[logId];
    if (!snap) return false;

    setVehicles(snap.vehicles);
    setOffers(snap.offers);
    setCpoVehicles(snap.cpoVehicles);
    setSpareParts(snap.spareParts);
    setShowrooms(snap.showrooms);
    setTestDrives(snap.testDrives);
    setServiceAppointments(snap.serviceAppointments);
    setQuotations(snap.quotations);
    setVinStock(snap.vinStock);
    setJobCards(snap.jobCards);
    setZatcaInvoices(snap.zatcaInvoices);
    if (snap.custodies) setCustodies(snap.custodies);
    if (snap.vouchers) setVouchers(snap.vouchers);
    setSettings(snap.settings);
    setPartQuantities(snap.partQuantities);

    delete undoSnapshotsRef.current[logId];
    setAuditLogs(prev =>
      prev.map(l => (l.id === logId ? { ...l, reverted: true, canUndo: false } : l))
    );
    return true;
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('solina_admin_role', JSON.stringify(adminRole));
  }, [adminRole]);

  useEffect(() => {
    localStorage.setItem('solina_admin_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('solina_admin_part_quantities', JSON.stringify(partQuantities));
  }, [partQuantities]);

  useEffect(() => {
    localStorage.setItem('solina_admin_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('solina_admin_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('solina_admin_cpo', JSON.stringify(cpoVehicles));
  }, [cpoVehicles]);

  useEffect(() => {
    localStorage.setItem('solina_admin_parts', JSON.stringify(spareParts));
  }, [spareParts]);

  useEffect(() => {
    localStorage.setItem('solina_admin_showrooms', JSON.stringify(showrooms));
  }, [showrooms]);

  useEffect(() => {
    localStorage.setItem('solina_admin_test_drives', JSON.stringify(testDrives));
  }, [testDrives]);

  useEffect(() => {
    localStorage.setItem('solina_admin_services', JSON.stringify(serviceAppointments));
  }, [serviceAppointments]);

  useEffect(() => {
    localStorage.setItem('solina_admin_quotations', JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem('solina_admin_vin_stock', JSON.stringify(vinStock));
  }, [vinStock]);

  useEffect(() => {
    localStorage.setItem('solina_admin_job_cards', JSON.stringify(jobCards));
  }, [jobCards]);

  useEffect(() => {
    localStorage.setItem('solina_admin_zatca_invoices', JSON.stringify(zatcaInvoices));
  }, [zatcaInvoices]);

  useEffect(() => {
    localStorage.setItem('solina_admin_custodies', JSON.stringify(custodies));
  }, [custodies]);

  useEffect(() => {
    localStorage.setItem('solina_admin_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('solina_admin_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // -------------------------------------------------------------
  // 1. Vehicle Methods
  // -------------------------------------------------------------
  const addVehicle = (vehicle: Vehicle) => {
    const snap = captureSnapshot();
    setVehicles(prev => [vehicle, ...prev]);
    appendLog(
      'fleet',
      'create',
      `إضافة موديل جديد للأسطول: ${vehicle.nameAr}`,
      `Added new fleet model: ${vehicle.nameEn}`,
      `السعر الابتدائي: ${vehicle.priceStartingFrom.toLocaleString('ar-SA')} ر.س`,
      `Starting Price: SAR ${vehicle.priceStartingFrom.toLocaleString()}`,
      snap
    );
  };

  const updateVehicle = (vehicleId: string, updated: Partial<Vehicle>) => {
    const snap = captureSnapshot();
    const current = vehicles.find(v => v.id === vehicleId);
    const oldPrice = current?.priceStartingFrom;
    const newPrice = updated.priceStartingFrom;
    const diffAr = oldPrice && newPrice && oldPrice !== newPrice
      ? `السعر: ${oldPrice.toLocaleString('ar-SA')} ر.س ← ${newPrice.toLocaleString('ar-SA')} ر.س`
      : `تحديث المواصفات والفئات للموديل ${current?.nameAr || vehicleId}`;

    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const nextPrice = updated.priceStartingFrom !== undefined ? updated.priceStartingFrom : v.priceStartingFrom;
        const monthly = updated.monthlyInstallmentStartingFrom !== undefined
          ? updated.monthlyInstallmentStartingFrom
          : Math.round((nextPrice * 0.9) / 60);
        const updatedGrades = updated.grades || (
          updated.priceStartingFrom !== undefined && v.grades.length > 0
            ? v.grades.map((g, idx) => idx === 0 ? { ...g, price: nextPrice } : g)
            : v.grades
        );
        return {
          ...v,
          ...updated,
          priceStartingFrom: nextPrice,
          monthlyInstallmentStartingFrom: monthly,
          grades: updatedGrades
        };
      }
      return v;
    }));
    appendLog(
      'fleet',
      'update',
      `تحديث بيانات الموديل: ${current?.nameAr || vehicleId}`,
      `Updated vehicle model: ${current?.nameEn || vehicleId}`,
      diffAr,
      undefined,
      snap
    );
  };

  const updateVehiclePrice = (vehicleId: string, newPrice: number) => {
    const snap = captureSnapshot();
    const target = vehicles.find(v => v.id === vehicleId);
    const oldPrice = target?.priceStartingFrom || 1;
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const ratio = newPrice / (v.priceStartingFrom || 1);
        const monthly = Math.round((newPrice * 0.9) / 60);
        const updatedGrades = v.grades.map((g, idx) => ({
          ...g,
          price: idx === 0 ? newPrice : Math.round(g.price * ratio)
        }));
        return {
          ...v,
          priceStartingFrom: newPrice,
          monthlyInstallmentStartingFrom: monthly,
          grades: updatedGrades
        };
      }
      return v;
    }));
    appendLog(
      'fleet',
      'update',
      `تعديل سعر ${target?.nameAr || vehicleId}`,
      `Updated ${target?.nameEn || vehicleId} price`,
      `${oldPrice.toLocaleString('ar-SA')} ر.س ← ${newPrice.toLocaleString('ar-SA')} ر.س`,
      `SAR ${oldPrice.toLocaleString()} -> SAR ${newPrice.toLocaleString()}`,
      snap
    );
  };

  const toggleVehicleFeatured = (vehicleId: string) => {
    const snap = captureSnapshot();
    const target = vehicles.find(v => v.id === vehicleId);
    const nextState = !target?.isFeatured;
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, isFeatured: nextState } : v));
    appendLog(
      'fleet',
      'update',
      `${nextState ? 'تمييز' : 'إلغاء تمييز'} ${target?.nameAr || vehicleId} على الصفحة الرئيسية`,
      `${nextState ? 'Featured' : 'Unfeatured'} ${target?.nameEn || vehicleId} on homepage`,
      `الحالة: ${nextState ? 'مميزة بالرئيسية' : 'عرض قياسي'}`,
      undefined,
      snap
    );
  };

  const deleteVehicle = (vehicleId: string) => {
    const snap = captureSnapshot();
    const target = vehicles.find(v => v.id === vehicleId);
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    appendLog(
      'fleet',
      'delete',
      `حذف الموديل: ${target?.nameAr || vehicleId}`,
      `Deleted model: ${target?.nameEn || vehicleId}`,
      `تم إزالة الطراز من العرض العام`,
      undefined,
      snap
    );
  };

  // -------------------------------------------------------------
  // 2. VIN Stock Methods
  // -------------------------------------------------------------
  const addVinStock = (item: Omit<VehicleStockItem, 'id'>) => {
    const snap = captureSnapshot();
    const newItem: VehicleStockItem = {
      ...item,
      id: `stk-${Date.now()}`
    };
    setVinStock(prev => [newItem, ...prev]);
    appendLog(
      'vin_inventory',
      'create',
      `تسجيل شاسيه جديد بالمخزون: ${item.vin}`,
      `Added VIN to stock: ${item.vin}`,
      `${item.model} (${item.trim}) • ${item.location}`,
      undefined,
      snap
    );
  };

  const updateVinStock = (id: string, updated: Partial<VehicleStockItem>) => {
    const snap = captureSnapshot();
    const target = vinStock.find(s => s.id === id);
    setVinStock(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    appendLog(
      'vin_inventory',
      'update',
      `تحديث بيانات الشاسيه ${target?.vin || id}`,
      `Updated VIN stock item ${target?.vin || id}`,
      updated.location ? `الموقع: ${target?.location} ← ${updated.location}` : undefined,
      undefined,
      snap
    );
  };

  const updateVinStatus = (id: string, status: VehicleStockItem['status']) => {
    const snap = captureSnapshot();
    const target = vinStock.find(s => s.id === id);
    setVinStock(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    appendLog(
      'vin_inventory',
      'status_change',
      `تغيير حالة الشاسيه ${target?.vin || id}`,
      `Changed VIN ${target?.vin || id} status`,
      `الحالة: ${target?.status} ← ${status}`,
      undefined,
      snap
    );
  };

  const transferVinBranch = (id: string, targetBranch: string) => {
    const snap = captureSnapshot();
    const target = vinStock.find(s => s.id === id);
    if (!target) return;
    const oldBranch = target.location;
    setVinStock(prev => prev.map(s => s.id === id ? { ...s, location: targetBranch } : s));
    appendLog(
      'vin_inventory',
      'update',
      `نقل لوجستي للشاسيه ${target.vin} بين الفروع`,
      `Inter-branch transfer for VIN ${target.vin}`,
      `${oldBranch} ← ${targetBranch}`,
      `${oldBranch} -> ${targetBranch}`,
      snap
    );
  };

  const deleteVinStock = (id: string) => {
    const snap = captureSnapshot();
    const target = vinStock.find(s => s.id === id);
    setVinStock(prev => prev.filter(s => s.id !== id));
    appendLog(
      'vin_inventory',
      'delete',
      `حذف الشاسيه ${target?.vin || id} من المخزون`,
      `Removed VIN ${target?.vin || id} from inventory`,
      `${target?.model || ''}`,
      undefined,
      snap
    );
  };

  // -------------------------------------------------------------
  // 3. Offers Methods
  // -------------------------------------------------------------
  const addOffer = (offer: Offer) => {
    const snap = captureSnapshot();
    setOffers(prev => [offer, ...prev]);
    appendLog('offers', 'create', `نشر عرض ترويجي جديد: ${offer.title}`, `Published new campaign: ${offer.titleEn}`, offer.badge, undefined, snap);
  };

  const updateOffer = (id: string, updated: Partial<Offer>) => {
    const snap = captureSnapshot();
    const target = offers.find(o => o.id === id);
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
    appendLog('offers', 'update', `تحديث العرض الترويجي: ${updated.title || target?.title || id}`, `Updated campaign: ${updated.titleEn || id}`, `شارة العرض: ${updated.badge || target?.badge}`, undefined, snap);
  };

  const deleteOffer = (id: string) => {
    const snap = captureSnapshot();
    const target = offers.find(o => o.id === id);
    setOffers(prev => prev.filter(o => o.id !== id));
    appendLog('offers', 'delete', `حذف العرض الترويجي: ${target?.title || id}`, `Deleted campaign: ${target?.titleEn || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 4. CPO Methods
  // -------------------------------------------------------------
  const addCPOVehicle = (cpo: PreOwnedVehicle) => {
    const snap = captureSnapshot();
    setCpoVehicles(prev => [cpo, ...prev]);
    appendLog('cpo', 'create', `إضافة سيارة مستعملة معتمدة: ${cpo.titleAr}`, `Added CPO vehicle: ${cpo.titleEn}`, `${cpo.price.toLocaleString('ar-SA')} ر.س`, undefined, snap);
  };

  const updateCPOVehicle = (id: string, updated: Partial<PreOwnedVehicle>) => {
    const snap = captureSnapshot();
    const target = cpoVehicles.find(c => c.id === id);
    setCpoVehicles(prev => prev.map(c => {
      if (c.id === id) {
        const nextPrice = updated.price !== undefined ? updated.price : c.price;
        const monthly = updated.monthlyInstallment !== undefined
          ? updated.monthlyInstallment
          : Math.round((nextPrice * 0.9) / 60);
        return { ...c, ...updated, price: nextPrice, monthlyInstallment: monthly };
      }
      return c;
    }));
    appendLog(
      'cpo',
      'update',
      `تحديث سيارة مستعملة معتمدة: ${target?.titleAr || id}`,
      `Updated CPO vehicle: ${target?.titleEn || id}`,
      updated.price && target ? `${target.price.toLocaleString('ar-SA')} ر.س ← ${updated.price.toLocaleString('ar-SA')} ر.س` : undefined,
      undefined,
      snap
    );
  };

  const deleteCPOVehicle = (id: string) => {
    const snap = captureSnapshot();
    const target = cpoVehicles.find(c => c.id === id);
    setCpoVehicles(prev => prev.filter(c => c.id !== id));
    appendLog('cpo', 'delete', `حذف سيارة مستعملة معتمدة: ${target?.titleAr || id}`, `Deleted CPO vehicle: ${target?.titleEn || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 5. Spare Parts Methods
  // -------------------------------------------------------------
  const addSparePart = (part: SparePart) => {
    const snap = captureSnapshot();
    setSpareParts(prev => [part, ...prev]);
    setPartQuantities(prev => ({ ...prev, [part.id]: 25 }));
    appendLog('parts', 'create', `إضافة قطعة غيار أصلية: ${part.nameAr} (${part.partNumber})`, `Added genuine part: ${part.nameEn}`, `${part.price} ر.س • الكمية: 25`, undefined, snap);
  };

  const updateSparePart = (id: string, updated: Partial<SparePart>) => {
    const snap = captureSnapshot();
    const target = spareParts.find(p => p.id === id);
    setSpareParts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    appendLog(
      'parts',
      'update',
      `تحديث قطعة الغيار: ${target?.nameAr || id}`,
      `Updated spare part: ${target?.nameEn || id}`,
      updated.price && target ? `السعر: ${target.price} ر.س ← ${updated.price} ر.س` : undefined,
      undefined,
      snap
    );
  };

  const updateSparePartPrice = (id: string, newPrice: number) => {
    const snap = captureSnapshot();
    const target = spareParts.find(p => p.id === id);
    setSpareParts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
    appendLog(
      'parts',
      'update',
      `تعديل سعر القطعة ${target?.nameAr || id}`,
      `Updated part ${target?.nameEn || id} price`,
      `${target?.price || 0} ر.س ← ${newPrice} ر.س`,
      undefined,
      snap
    );
  };

  const adjustPartQuantity = (partId: string, delta: number) => {
    const snap = captureSnapshot();
    const target = spareParts.find(p => p.id === partId);
    const oldQty = partQuantities[partId] ?? 20;
    const nextQty = Math.max(0, oldQty + delta);
    setPartQuantities(prev => ({ ...prev, [partId]: nextQty }));
    appendLog(
      'parts',
      'update',
      `${delta > 0 ? 'توريد مخزون' : 'صرف مخزون'} لقطعة الغيار: ${target?.nameAr || partId}`,
      `${delta > 0 ? 'Restocked' : 'Issued'} spare part: ${target?.nameEn || partId}`,
      `الكمية بالمستودع: ${oldQty} ← ${nextQty} قطعة`,
      undefined,
      snap
    );
  };

  const deleteSparePart = (id: string) => {
    const snap = captureSnapshot();
    const target = spareParts.find(p => p.id === id);
    setSpareParts(prev => prev.filter(p => p.id !== id));
    appendLog('parts', 'delete', `حذف قطعة الغيار: ${target?.nameAr || id}`, `Deleted spare part: ${target?.nameEn || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 6. Showroom Methods
  // -------------------------------------------------------------
  const addShowroom = (showroom: Showroom) => {
    const snap = captureSnapshot();
    setShowrooms(prev => [showroom, ...prev]);
    appendLog('showrooms', 'create', `إضافة فرع/صالة عرض جديدة: ${showroom.name}`, `Added new showroom branch: ${showroom.nameEn}`, showroom.city, undefined, snap);
  };

  const updateShowroom = (id: string, updated: Partial<Showroom>) => {
    const snap = captureSnapshot();
    const target = showrooms.find(s => s.id === id);
    setShowrooms(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    appendLog('showrooms', 'update', `تحديث بيانات الفرع: ${updated.name || target?.name || id}`, `Updated showroom branch: ${updated.nameEn || id}`, undefined, undefined, snap);
  };

  const deleteShowroom = (id: string) => {
    const snap = captureSnapshot();
    const target = showrooms.find(s => s.id === id);
    setShowrooms(prev => prev.filter(s => s.id !== id));
    appendLog('showrooms', 'delete', `حذف الفرع: ${target?.name || id}`, `Deleted showroom branch: ${target?.nameEn || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 7. Test Drive Methods & Bulk Operations
  // -------------------------------------------------------------
  const addTestDrive = (lead: Omit<TestDriveLead, 'id' | 'createdAt' | 'status'>) => {
    const snap = captureSnapshot();
    const randomId = `TD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry: TestDriveLead = {
      ...lead,
      id: randomId,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setTestDrives(prev => [newEntry, ...prev]);
    appendLog('leads', 'create', `تسجيل طلب تجربة قيادة جديد: ${lead.fullName}`, `New test drive lead: ${lead.fullName}`, `${lead.modelName} • ${lead.preferredShowroom}`, undefined, snap);
  };

  const updateTestDrive = (id: string, updated: Partial<TestDriveLead>) => {
    const snap = captureSnapshot();
    setTestDrives(prev => prev.map(td => td.id === id ? { ...td, ...updated } : td));
    appendLog('leads', 'update', `تحديث بيانات طلب تجربة القيادة (${id})`, `Updated test drive lead (${id})`, updated.assignedAdvisor ? `المستشار: ${updated.assignedAdvisor}` : undefined, undefined, snap);
  };

  const updateTestDriveStatus = (id: string, status: TestDriveLead['status']) => {
    const snap = captureSnapshot();
    const target = testDrives.find(td => td.id === id);
    setTestDrives(prev => prev.map(td => td.id === id ? { ...td, status } : td));
    appendLog(
      'leads',
      'status_change',
      `تغيير حالة تجربة قيادة (${target?.fullName || id})`,
      `Updated test drive (${target?.fullName || id}) status`,
      `الحالة: ${target?.status} ← ${status}`,
      undefined,
      snap
    );
  };

  const bulkUpdateTestDriveStatus = (ids: string[], status: TestDriveLead['status']) => {
    if (ids.length === 0) return;
    const snap = captureSnapshot();
    const idSet = new Set(ids);
    setTestDrives(prev => prev.map(td => idSet.has(td.id) ? { ...td, status } : td));
    appendLog(
      'leads',
      'status_change',
      `تحديث جماعي لحالة ${ids.length} طلبات تجربة قيادة`,
      `Bulk updated ${ids.length} test drive requests`,
      `الحالة الجديدة: ${status}`,
      undefined,
      snap
    );
  };

  const bulkAssignTestDriveAdvisor = (ids: string[], advisor: string) => {
    if (ids.length === 0) return;
    const snap = captureSnapshot();
    const idSet = new Set(ids);
    setTestDrives(prev => prev.map(td => idSet.has(td.id) ? { ...td, assignedAdvisor: advisor } : td));
    appendLog(
      'leads',
      'update',
      `إسناد جماعي لـ ${ids.length} طلبات إلى المستشار ${advisor}`,
      `Bulk assigned ${ids.length} leads to ${advisor}`,
      `المستشار المعين: ${advisor}`,
      undefined,
      snap
    );
  };

  const deleteTestDrive = (id: string) => {
    const snap = captureSnapshot();
    const target = testDrives.find(td => td.id === id);
    setTestDrives(prev => prev.filter(td => td.id !== id));
    appendLog('leads', 'delete', `حذف طلب تجربة قيادة: ${target?.fullName || id}`, `Deleted test drive lead: ${target?.fullName || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 8. Service Booking Methods & Workshop Conversion
  // -------------------------------------------------------------
  const addServiceAppointment = (appointment: Omit<ServiceAppointmentLead, 'id' | 'createdAt' | 'status'>) => {
    const snap = captureSnapshot();
    const randomId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: ServiceAppointmentLead = {
      ...appointment,
      id: randomId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setServiceAppointments(prev => [newEntry, ...prev]);
    appendLog('leads', 'create', `حجز موعد صيانة جديد: ${appointment.fullName}`, `New service booking: ${appointment.fullName}`, `${appointment.vehicleModel} (${appointment.plateNumber})`, undefined, snap);
  };

  const updateServiceAppointment = (id: string, updated: Partial<ServiceAppointmentLead>) => {
    const snap = captureSnapshot();
    setServiceAppointments(prev => prev.map(srv => srv.id === id ? { ...srv, ...updated } : srv));
    appendLog('leads', 'update', `تحديث حجز الصيانة (${id})`, `Updated service appointment (${id})`, undefined, undefined, snap);
  };

  const updateServiceStatus = (id: string, status: ServiceAppointmentLead['status']) => {
    const snap = captureSnapshot();
    const target = serviceAppointments.find(srv => srv.id === id);
    setServiceAppointments(prev => prev.map(srv => srv.id === id ? { ...srv, status } : srv));
    appendLog('leads', 'status_change', `تحديث حالة موعد صيانة (${target?.fullName || id})`, `Changed service booking (${target?.fullName || id}) status`, `${target?.status} ← ${status}`, undefined, snap);
  };

  const deleteServiceAppointment = (id: string) => {
    const snap = captureSnapshot();
    const target = serviceAppointments.find(srv => srv.id === id);
    setServiceAppointments(prev => prev.filter(srv => srv.id !== id));
    appendLog('leads', 'delete', `حذف موعد صيانة: ${target?.fullName || id}`, `Deleted service appointment: ${target?.fullName || id}`, undefined, undefined, snap);
  };

  const convertServiceToJobCard = (appointmentId: string, bayNumber = 'المسار السريع #04', technicianName?: string): JobCard | null => {
    const srv = serviceAppointments.find(s => s.id === appointmentId);
    if (!srv) return null;

    const snap = captureSnapshot();
    const cardNumber = `JC-2026-0${Math.floor(500 + Math.random() * 499)}`;
    const newCard: JobCard = {
      id: `job-${Date.now()}`,
      cardNumber,
      customerName: srv.fullName,
      customerPhone: srv.phone,
      vehicleModel: srv.vehicleModel,
      plateNumber: srv.plateNumber,
      vinNumber: 'JT3' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      mileage: srv.currentMileage,
      serviceType: srv.serviceType,
      technicianName: technicianName || srv.assignedTechnician || 'م. أحمد الشريف',
      bayNumber,
      status: 'in_progress',
      timeRemainingMinutes: settings.expressServiceMinutes || 45,
      partsUsed: ['زيت سولينا تخليقي بالكامل 0W-20', 'فلتر زيت سولينا الأصلي OEM', 'فحص 24 نقطة سلامة'],
      totalCost: srv.estimatedCost,
      createdAt: new Date().toISOString(),
      sourceAppointmentId: srv.id
    };

    setJobCards(prev => [newCard, ...prev]);
    setServiceAppointments(prev => prev.map(s => s.id === appointmentId ? {
      ...s,
      status: 'in_progress',
      assignedTechnician: newCard.technicianName,
      jobCardId: newCard.cardNumber
    } : s));

    appendLog(
      'workshop',
      'convert',
      `تحويل حجز الصيانة (${srv.id}) إلى أمر عمل بالورشة (${cardNumber})`,
      `Converted service booking (${srv.id}) to workshop Job Card (${cardNumber})`,
      `${srv.fullName} • ${bayNumber}`,
      undefined,
      snap
    );
    return newCard;
  };

  // -------------------------------------------------------------
  // 9. Quotation Methods & ZATCA Conversion
  // -------------------------------------------------------------
  const addQuotation = (quotation: Omit<QuotationRecord, 'id' | 'createdAt' | 'quotationNumber'>): string => {
    const snap = captureSnapshot();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const quotationNumber = `SOL-QUO-${randomNum}`;
    const id = `QUO-2026-${randomNum}`;
    const newEntry: QuotationRecord = {
      ...quotation,
      id,
      quotationNumber,
      createdAt: new Date().toISOString()
    };
    setQuotations(prev => [newEntry, ...prev]);
    appendLog('leads', 'create', `إصدار عرض سعر جديد (${quotationNumber}) للعميل ${quotation.fullName}`, `Generated quotation (${quotationNumber}) for ${quotation.fullName}`, `${quotation.vehicleName} • ${quotation.totalWithVat.toLocaleString('ar-SA')} ر.س`, undefined, snap);
    return quotationNumber;
  };

  const updateQuotation = (id: string, updated: Partial<QuotationRecord>) => {
    const snap = captureSnapshot();
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, ...updated } : q));
    appendLog('leads', 'update', `تحديث عرض السعر (${id})`, `Updated quotation (${id})`, undefined, undefined, snap);
  };

  const updateQuotationStatus = (id: string, status: QuotationRecord['status']) => {
    const snap = captureSnapshot();
    const target = quotations.find(q => q.id === id);
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    appendLog('leads', 'status_change', `تغيير حالة عرض السعر (${target?.quotationNumber || id})`, `Changed quotation (${target?.quotationNumber || id}) status`, `${target?.status} ← ${status}`, undefined, snap);
  };

  const deleteQuotation = (id: string) => {
    const snap = captureSnapshot();
    const target = quotations.find(q => q.id === id);
    setQuotations(prev => prev.filter(q => q.id !== id));
    appendLog('leads', 'delete', `حذف عرض السعر: ${target?.quotationNumber || id}`, `Deleted quotation: ${target?.quotationNumber || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 10. Workshop Job Cards Methods
  // -------------------------------------------------------------
  const addJobCard = (card: Omit<JobCard, 'id' | 'cardNumber'>): JobCard => {
    const snap = captureSnapshot();
    const cardNumber = `JC-2026-0${Math.floor(500 + Math.random() * 499)}`;
    const newCard: JobCard = {
      ...card,
      id: `job-${Date.now()}`,
      cardNumber,
      createdAt: new Date().toISOString()
    };
    setJobCards(prev => [newCard, ...prev]);
    appendLog('workshop', 'create', `فتح أمر عمل صيانة جديد (${cardNumber}) للعميل ${card.customerName}`, `Opened new Job Card (${cardNumber}) for ${card.customerName}`, `${card.vehicleModel} • ${card.bayNumber}`, undefined, snap);
    return newCard;
  };

  const updateJobCard = (id: string, updated: Partial<JobCard>) => {
    const snap = captureSnapshot();
    setJobCards(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    appendLog('workshop', 'update', `تحديث بيانات أمر العمل (${id})`, `Updated Job Card (${id})`, undefined, undefined, snap);
  };

  const updateJobCardStatus = (id: string, status: JobCard['status']) => {
    const snap = captureSnapshot();
    const target = jobCards.find(c => c.id === id);
    setJobCards(prev => prev.map(c => {
      if (c.id === id) {
        const nextTime = status === 'ready' || status === 'delivered' ? 0 : status === 'quality_check' ? 5 : c.timeRemainingMinutes;
        return { ...c, status, timeRemainingMinutes: nextTime };
      }
      return c;
    }));
    if (target?.sourceAppointmentId && (status === 'ready' || status === 'delivered')) {
      setServiceAppointments(prev => prev.map(s => s.id === target.sourceAppointmentId ? { ...s, status: 'completed' } : s));
    }
    appendLog('workshop', 'status_change', `تحديث مرحلة أمر العمل (${target?.cardNumber || id})`, `Updated Job Card (${target?.cardNumber || id}) status`, `${target?.status} ← ${status}`, undefined, snap);
  };

  const deleteJobCard = (id: string) => {
    const snap = captureSnapshot();
    const target = jobCards.find(c => c.id === id);
    setJobCards(prev => prev.filter(c => c.id !== id));
    appendLog('workshop', 'delete', `حذف أمر العمل: ${target?.cardNumber || id}`, `Deleted Job Card: ${target?.cardNumber || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 11. ZATCA E-Invoicing Methods & Conversions
  // -------------------------------------------------------------
  const addZatcaInvoice = (
    inv: Omit<InvoiceItem, 'id' | 'invoiceNumber' | 'uuid' | 'date' | 'zatcaQrBase64' | 'baseAmount' | 'vatAmount'> & {
      baseAmount?: number;
      vatAmount?: number;
    }
  ): InvoiceItem => {
    const snap = captureSnapshot();
    const total = Number(inv.totalAmount);
    const base = inv.baseAmount !== undefined ? inv.baseAmount : Number((total / 1.15).toFixed(2));
    const vat = inv.vatAmount !== undefined ? inv.vatAmount : Number((total - base).toFixed(2));
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const prefix = inv.type === 'credit_note' ? 'SOL-CN-2026-00' : 'SOL-INV-2026-00';
    const invoiceNumber = `${prefix}${Math.floor(100 + Math.random() * 899)}`;
    const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `f91a2b3c-${Math.floor(1000 + Math.random() * 9000)}-4f7a-8b9c-0d1e2f3a4b5c`;

    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      uuid,
      customerName: inv.customerName,
      customerPhone: inv.customerPhone,
      vatNumber: inv.vatNumber,
      vehicleModel: inv.vehicleModel,
      vinNumber: inv.vinNumber,
      baseAmount: base,
      vatAmount: vat,
      totalAmount: total,
      date: dateStr,
      type: inv.type,
      status: inv.status || 'cleared',
      zatcaQrBase64: generateZatcaBase64(settings.companyNameEn, settings.vatNumber, dateStr, total, vat),
      sourceQuotationId: inv.sourceQuotationId,
      sourceJobCardId: inv.sourceJobCardId,
      referenceInvoiceNumber: inv.referenceInvoiceNumber
    };

    setZatcaInvoices(prev => [newInv, ...prev]);

    if (inv.type !== 'credit_note') {
      setVinStock(prev => prev.map(item => item.vin === inv.vinNumber ? { ...item, status: 'sold' } : item));
      const autoReceipt: AccountingVoucher = {
        id: `vch-${Date.now()}-inv`,
        voucherNumber: `RV-2026-${501 + vouchers.length}`,
        type: 'receipt',
        date: dateStr,
        partyName: inv.customerName,
        description: `تحصيل تلقائي للفاتورة الضريبية ${invoiceNumber} — ${inv.vehicleModel}`,
        accountCode: inv.sourceJobCardId ? '4102' : '4101',
        accountName: inv.sourceJobCardId ? 'إيرادات خدمات الصيانة الدورية وقطع الغيار' : 'إيرادات مبيعات السيارات الجديدة والمستعملة',
        costCenter: inv.sourceJobCardId ? 'الإدارة المالية — مركز الصيانة' : 'الإدارة المالية — المبيعات',
        paymentMethod: inv.type === 'tax_invoice' ? 'bank_transfer' : 'mada_pos',
        baseAmount: base,
        vatAmount: vat,
        totalAmount: total,
        referenceNumber: invoiceNumber,
        status: 'posted'
      };
      setVouchers(prev => [autoReceipt, ...prev]);
    } else {
      const autoRefundVoucher: AccountingVoucher = {
        id: `vch-${Date.now()}-cn`,
        voucherNumber: `PV-2026-${301 + vouchers.length}`,
        type: 'payment',
        date: dateStr,
        partyName: inv.customerName,
        description: `رد قيمة إشعار دائن ضريبي (${invoiceNumber}) مرجع ${inv.referenceInvoiceNumber || '-'}`,
        accountCode: '4101',
        accountName: 'مرتجعات وإشعارات دائنة للمبيعات',
        costCenter: 'الإدارة المالية — التسويات الضريبية',
        paymentMethod: 'bank_transfer',
        baseAmount: Math.abs(base),
        vatAmount: Math.abs(vat),
        totalAmount: Math.abs(total),
        referenceNumber: invoiceNumber,
        status: 'posted'
      };
      setVouchers(prev => [autoRefundVoucher, ...prev]);
    }

    appendLog(
      'zatca',
      'create',
      `إصدار واعتماد فاتورة ضريبية ZATCA رقم ${invoiceNumber}`,
      `Issued ZATCA invoice ${invoiceNumber}`,
      `${inv.customerName} • ${total.toLocaleString('ar-SA')} ر.س`,
      undefined,
      snap
    );
    return newInv;
  };

  const issueCreditNote = (invoiceId: string): InvoiceItem | null => {
    const orig = zatcaInvoices.find(i => i.id === invoiceId);
    if (!orig || orig.type === 'credit_note') return null;

    const snap = captureSnapshot();
    const creditNote = addZatcaInvoice({
      customerName: orig.customerName,
      customerPhone: orig.customerPhone,
      vatNumber: orig.vatNumber,
      vehicleModel: `إشعار دائن / مرتجع للفاتورة (${orig.invoiceNumber}) — ${orig.vehicleModel}`,
      vinNumber: orig.vinNumber,
      baseAmount: -Math.abs(orig.baseAmount),
      vatAmount: -Math.abs(orig.vatAmount),
      totalAmount: -Math.abs(orig.totalAmount),
      type: 'credit_note',
      status: 'cleared',
      referenceInvoiceNumber: orig.invoiceNumber
    });

    setZatcaInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status: 'refunded' } : i));
    setVinStock(prev => prev.map(item => item.vin === orig.vinNumber ? { ...item, status: 'in_stock' } : item));
    appendLog(
      'zatca',
      'create',
      `إصدار إشعار دائن ضريبي (${creditNote.invoiceNumber}) للفاتورة ${orig.invoiceNumber}`,
      `Issued ZATCA credit note (${creditNote.invoiceNumber}) for ${orig.invoiceNumber}`,
      `استرداد ضريبي: ${orig.totalAmount.toLocaleString('ar-SA')} ر.س`,
      undefined,
      snap
    );
    return creditNote;
  };

  const convertQuotationToInvoice = (quotationId: string, customVin?: string): InvoiceItem | null => {
    const q = quotations.find(item => item.id === quotationId);
    if (!q) return null;

    const matchingStock = vinStock.find(s => s.status !== 'sold' && (s.model.includes(q.vehicleName) || q.vehicleName.includes(s.model)));
    const assignedVin = customVin || matchingStock?.vin || ('JT3' + Math.random().toString(36).substring(2, 12).toUpperCase());

    const createdInvoice = addZatcaInvoice({
      customerName: q.fullName,
      customerPhone: q.phone,
      vehicleModel: `${q.vehicleName} — ${q.gradeName}`,
      vinNumber: assignedVin,
      baseAmount: Number((q.totalWithVat / 1.15).toFixed(2)),
      vatAmount: Number((q.totalWithVat - q.totalWithVat / 1.15).toFixed(2)),
      totalAmount: q.totalWithVat,
      type: 'simplified_invoice',
      status: 'cleared',
      sourceQuotationId: q.id
    });

    setQuotations(prev => prev.map(item => item.id === quotationId ? {
      ...item,
      status: 'deal_closed',
      invoiceId: createdInvoice.invoiceNumber
    } : item));

    return createdInvoice;
  };

  const convertJobCardToInvoice = (jobCardId: string): InvoiceItem | null => {
    const card = jobCards.find(c => c.id === jobCardId);
    if (!card) return null;

    const total = card.totalCost > 0 ? card.totalCost : 345;
    const createdInvoice = addZatcaInvoice({
      customerName: card.customerName,
      customerPhone: card.customerPhone,
      vehicleModel: `خدمات صيانة وقطع غيار: ${card.vehicleModel} (${card.serviceType})`,
      vinNumber: card.vinNumber || card.plateNumber,
      totalAmount: total,
      type: 'simplified_invoice',
      status: 'reported',
      sourceJobCardId: card.id
    });

    updateJobCardStatus(jobCardId, 'delivered');
    setJobCards(prev => prev.map(c => c.id === jobCardId ? { ...c, status: 'delivered', invoiceId: createdInvoice.invoiceNumber } : c));
    return createdInvoice;
  };

  const updateZatcaInvoiceStatus = (id: string, status: InvoiceItem['status']) => {
    const snap = captureSnapshot();
    setZatcaInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    appendLog('zatca', 'status_change', `تحديث حالة الفاتورة (${id}) إلى ${status}`, `Updated ZATCA invoice (${id}) status to ${status}`, undefined, undefined, snap);
  };

  const deleteZatcaInvoice = (id: string) => {
    const snap = captureSnapshot();
    const target = zatcaInvoices.find(inv => inv.id === id);
    setZatcaInvoices(prev => prev.filter(inv => inv.id !== id));
    appendLog('zatca', 'delete', `حذف مسودة الفاتورة: ${target?.invoiceNumber || id}`, `Deleted invoice record: ${target?.invoiceNumber || id}`, undefined, undefined, snap);
  };

  // -------------------------------------------------------------
  // 11B. Accounting, Vouchers & Custodies (العهد والخزينة والمحاسبة)
  // -------------------------------------------------------------
  const addCustody = (
    custody: Omit<CustodyRecord, 'id' | 'custodyNumber' | 'remainingBalance' | 'lastSettlementDate'>
  ): CustodyRecord => {
    const snap = captureSnapshot();
    const nextNum = 801 + custodies.length;
    const today = new Date().toISOString().split('T')[0];
    const newCustody: CustodyRecord = {
      ...custody,
      id: `cus-${Date.now()}`,
      custodyNumber: `CUS-2026-${nextNum}`,
      remainingBalance: Math.max(0, custody.allocatedAmount - (custody.spentAmount || 0)),
      lastSettlementDate: today
    };
    setCustodies(prev => [newCustody, ...prev]);

    // Also create a payment voucher for issuing the custody
    const vch: AccountingVoucher = {
      id: `vch-${Date.now()}-cus`,
      voucherNumber: `PV-2026-${301 + vouchers.length}`,
      type: 'payment',
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      partyName: custody.employeeName,
      description: `صرف عهدة مالية جديدة (${newCustody.custodyNumber}) — ${custody.notes || custody.branchName}`,
      accountCode: '1104',
      accountName: 'عُهد وسلف الموظفين',
      costCenter: custody.branchName,
      paymentMethod: 'bank_transfer',
      baseAmount: custody.allocatedAmount,
      vatAmount: 0,
      totalAmount: custody.allocatedAmount,
      referenceNumber: newCustody.custodyNumber,
      status: 'posted'
    };
    setVouchers(prev => [vch, ...prev]);

    appendLog(
      'accounting',
      'create',
      `صرف عهدة مالية جديدة ${newCustody.custodyNumber} للموظف: ${custody.employeeName}`,
      `Issued new custody ${newCustody.custodyNumber} to ${custody.employeeName}`,
      `المبلغ المعتمد: ${custody.allocatedAmount.toLocaleString('ar-SA')} ر.س • الفرع: ${custody.branchName}`,
      undefined,
      snap
    );
    return newCustody;
  };

  const settleCustodyExpense = (
    custodyId: string,
    expenseAmount: number,
    description: string,
    vatIncluded: boolean = true
  ) => {
    const target = custodies.find(c => c.id === custodyId);
    if (!target || expenseAmount <= 0) return;
    const snap = captureSnapshot();
    const today = new Date().toISOString().split('T')[0];

    setCustodies(prev =>
      prev.map(c => {
        if (c.id !== custodyId) return c;
        const nextSpent = c.spentAmount + expenseAmount;
        const nextRem = Math.max(0, c.allocatedAmount - nextSpent);
        return {
          ...c,
          spentAmount: nextSpent,
          remainingBalance: nextRem,
          lastSettlementDate: today,
          status: nextRem === 0 ? 'settled_closed' : nextRem <= c.allocatedAmount * 0.15 ? 'pending_settlement' : c.status
        };
      })
    );

    const baseAmt = vatIncluded ? Number((expenseAmount / 1.15).toFixed(2)) : expenseAmount;
    const vatAmt = vatIncluded ? Number((expenseAmount - baseAmt).toFixed(2)) : 0;

    const expenseVoucher: AccountingVoucher = {
      id: `vch-${Date.now()}`,
      voucherNumber: `PV-2026-${301 + vouchers.length}`,
      type: 'payment',
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      partyName: target.employeeName,
      description: `تسوية مصروف من عهدة ${target.custodyNumber}: ${description}`,
      accountCode: '5203',
      accountName: 'مصروفات تشغيل وصيانة الفروع',
      costCenter: target.branchName,
      paymentMethod: 'custody_deduction',
      baseAmount: baseAmt,
      vatAmount: vatAmt,
      totalAmount: expenseAmount,
      referenceNumber: target.custodyNumber,
      status: 'posted'
    };
    setVouchers(prev => [expenseVoucher, ...prev]);

    appendLog(
      'accounting',
      'update',
      `تسوية مصروف من العهدة ${target.custodyNumber} (${target.employeeName})`,
      `Settled expense on custody ${target.custodyNumber}`,
      `المبلغ المسوى: ${expenseAmount.toLocaleString('ar-SA')} ر.س • البيان: ${description}`,
      undefined,
      snap
    );
  };

  const replenishCustody = (custodyId: string, amountToAdd: number) => {
    const target = custodies.find(c => c.id === custodyId);
    if (!target || amountToAdd <= 0) return;
    const snap = captureSnapshot();
    const today = new Date().toISOString().split('T')[0];

    setCustodies(prev =>
      prev.map(c =>
        c.id === custodyId
          ? {
              ...c,
              allocatedAmount: c.allocatedAmount + amountToAdd,
              remainingBalance: c.remainingBalance + amountToAdd,
              lastSettlementDate: today,
              status: 'active'
            }
          : c
      )
    );

    const replenishVoucher: AccountingVoucher = {
      id: `vch-${Date.now()}-rep`,
      voucherNumber: `PV-2026-${301 + vouchers.length}`,
      type: 'payment',
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      partyName: target.employeeName,
      description: `تغذية وزيادة سقف العهدة المالية ${target.custodyNumber} — ${target.branchName}`,
      accountCode: '1104',
      accountName: 'عُهد وسلف الموظفين',
      costCenter: target.branchName,
      paymentMethod: 'bank_transfer',
      baseAmount: amountToAdd,
      vatAmount: 0,
      totalAmount: amountToAdd,
      referenceNumber: target.custodyNumber,
      status: 'posted'
    };
    setVouchers(prev => [replenishVoucher, ...prev]);

    appendLog(
      'accounting',
      'update',
      `تغذية وزيادة سقف العهدة ${target.custodyNumber} (${target.employeeName})`,
      `Replenished custody ${target.custodyNumber}`,
      `مبلغ التغذية الإضافي: +${amountToAdd.toLocaleString('ar-SA')} ر.س`,
      undefined,
      snap
    );
  };

  const closeCustody = (custodyId: string) => {
    const target = custodies.find(c => c.id === custodyId);
    if (!target) return;
    const snap = captureSnapshot();
    const today = new Date().toISOString().split('T')[0];

    setCustodies(prev =>
      prev.map(c =>
        c.id === custodyId
          ? {
              ...c,
              remainingBalance: 0,
              spentAmount: c.allocatedAmount,
              lastSettlementDate: today,
              status: 'settled_closed'
            }
          : c
      )
    );

    appendLog(
      'accounting',
      'status_change',
      `إقفال وإخلاء طرف العهدة المالية ${target.custodyNumber} (${target.employeeName})`,
      `Closed and cleared custody ${target.custodyNumber}`,
      `إجمالي المبلغ المسوى: ${target.allocatedAmount.toLocaleString('ar-SA')} ر.س`,
      undefined,
      snap
    );
  };

  const deleteCustody = (custodyId: string) => {
    const target = custodies.find(c => c.id === custodyId);
    const snap = captureSnapshot();
    setCustodies(prev => prev.filter(c => c.id !== custodyId));
    appendLog(
      'accounting',
      'delete',
      `حذف سجل العهدة: ${target?.custodyNumber || custodyId}`,
      `Deleted custody ${target?.custodyNumber || custodyId}`,
      undefined,
      undefined,
      snap
    );
  };

  const addVoucher = (
    voucher: Omit<AccountingVoucher, 'id' | 'voucherNumber' | 'date'>
  ): AccountingVoucher => {
    const snap = captureSnapshot();
    const prefix = voucher.type === 'receipt' ? 'RV' : voucher.type === 'payment' ? 'PV' : 'JV';
    const baseNum = voucher.type === 'receipt' ? 501 : voucher.type === 'payment' ? 301 : 101;
    const nextNum = baseNum + vouchers.length;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newVoucher: AccountingVoucher = {
      ...voucher,
      id: `vch-${Date.now()}`,
      voucherNumber: `${prefix}-2026-${nextNum}`,
      date: nowStr
    };

    setVouchers(prev => [newVoucher, ...prev]);
    appendLog(
      'accounting',
      'create',
      `إصدار ${voucher.type === 'receipt' ? 'سند قبض' : voucher.type === 'payment' ? 'سند صرف' : 'قيد يومية'} رقم ${newVoucher.voucherNumber}`,
      `Issued ${voucher.type} voucher ${newVoucher.voucherNumber}`,
      `الطرف: ${voucher.partyName} • المبلغ: ${voucher.totalAmount.toLocaleString('ar-SA')} ر.س`,
      undefined,
      snap
    );
    return newVoucher;
  };

  const updateVoucherStatus = (id: string, status: AccountingVoucher['status']) => {
    const snap = captureSnapshot();
    setVouchers(prev => prev.map(v => (v.id === id ? { ...v, status } : v)));
    appendLog(
      'accounting',
      'status_change',
      `تحديث حالة السند المحاسبي إلى: ${status}`,
      `Updated voucher status to ${status}`,
      undefined,
      undefined,
      snap
    );
  };

  const deleteVoucher = (id: string) => {
    const target = vouchers.find(v => v.id === id);
    const snap = captureSnapshot();
    setVouchers(prev => prev.filter(v => v.id !== id));
    appendLog(
      'accounting',
      'delete',
      `حذف السند المحاسبي: ${target?.voucherNumber || id}`,
      `Deleted accounting voucher ${target?.voucherNumber || id}`,
      undefined,
      undefined,
      snap
    );
  };

  const createReceiptFromInvoice = (
    invoiceId: string,
    paymentMethod: AccountingVoucher['paymentMethod'] = 'bank_transfer'
  ): AccountingVoucher | null => {
    const inv = zatcaInvoices.find(i => i.id === invoiceId);
    if (!inv) return null;
    const existing = vouchers.find(v => v.referenceNumber === inv.invoiceNumber && v.type === 'receipt');
    if (existing) return existing;

    return addVoucher({
      type: 'receipt',
      partyName: inv.customerName,
      description: `تحصيل قيمة الفاتورة الضريبية ${inv.invoiceNumber} (${inv.vehicleModel})`,
      accountCode: '4101',
      accountName: 'إيرادات مبيعات السيارات والصيانة',
      costCenter: 'الإدارة المالية — الرياض',
      paymentMethod,
      baseAmount: inv.baseAmount,
      vatAmount: inv.vatAmount,
      totalAmount: inv.totalAmount,
      referenceNumber: inv.invoiceNumber,
      status: 'posted'
    });
  };

  // -------------------------------------------------------------
  // 12. Settings & Full Backup JSON Import/Export
  // -------------------------------------------------------------
  const updateSettings = (updated: Partial<DealershipSettings>) => {
    const snap = captureSnapshot();
    const diffParts: string[] = [];
    if (updated.defaultAprPercent !== undefined && updated.defaultAprPercent !== settings.defaultAprPercent) {
      diffParts.push(`هامش المرابحة: ${settings.defaultAprPercent}% ← ${updated.defaultAprPercent}%`);
    }
    if (updated.minDownPaymentPercent !== undefined && updated.minDownPaymentPercent !== settings.minDownPaymentPercent) {
      diffParts.push(`الدفعة الأولى: ${settings.minDownPaymentPercent}% ← ${updated.minDownPaymentPercent}%`);
    }
    setSettings(prev => ({ ...prev, ...updated }));
    appendLog(
      'settings',
      'update',
      'تحديث إعدادات وكالة سولينا ومحرك التمويل والربط الضريبي',
      'Updated Solina dealership, financing & ZATCA settings',
      diffParts.length > 0 ? diffParts.join(' • ') : 'تم حفظ الإعدادات وتحديث الحاسبة العامة',
      undefined,
      snap
    );
  };

  const exportFullBackupJSON = () => {
    const backupPayload = {
      version: '2026.10-SOLINA-MOBBIN',
      exportedAt: new Date().toISOString(),
      settings,
      partQuantities,
      vehicles,
      offers,
      cpoVehicles,
      spareParts,
      showrooms,
      testDrives,
      serviceAppointments,
      quotations,
      vinStock,
      jobCards,
      zatcaInvoices,
      custodies,
      vouchers,
      chartOfAccounts
    };
    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solina_motors_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importFullBackupJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') return false;
      const snap = captureSnapshot();
      if (Array.isArray(parsed.vehicles)) setVehicles(parsed.vehicles);
      if (Array.isArray(parsed.offers)) setOffers(parsed.offers);
      if (Array.isArray(parsed.cpoVehicles)) setCpoVehicles(parsed.cpoVehicles);
      if (Array.isArray(parsed.spareParts)) setSpareParts(parsed.spareParts);
      if (Array.isArray(parsed.showrooms)) setShowrooms(parsed.showrooms);
      if (Array.isArray(parsed.testDrives)) setTestDrives(parsed.testDrives);
      if (Array.isArray(parsed.serviceAppointments)) setServiceAppointments(parsed.serviceAppointments);
      if (Array.isArray(parsed.quotations)) setQuotations(parsed.quotations);
      if (Array.isArray(parsed.vinStock)) setVinStock(parsed.vinStock);
      if (Array.isArray(parsed.jobCards)) setJobCards(parsed.jobCards);
      if (Array.isArray(parsed.zatcaInvoices)) setZatcaInvoices(parsed.zatcaInvoices);
      if (Array.isArray(parsed.custodies)) setCustodies(parsed.custodies);
      if (Array.isArray(parsed.vouchers)) setVouchers(parsed.vouchers);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.partQuantities) setPartQuantities(parsed.partQuantities);

      appendLog(
        'system',
        'update',
        'استيراد واستعادة نسخة احتياطية كاملة لقاعدة بيانات سولينا',
        'Restored full Solina database from JSON backup',
        `تاريخ النسخة: ${parsed.exportedAt || 'مباشر'}`,
        undefined,
        snap
      );
      return true;
    } catch {
      return false;
    }
  };

  const [exportModalRequest, setExportModalRequest] = useState<ExportDatasetType | null>(null);

  // -------------------------------------------------------------
  // 13. Universal Multi-Format Export Engine (Excel, CSV, JSON, XML, HTML, TXT, PDF/Print)
  // -------------------------------------------------------------
  const buildDatasetTable = (type: ExportDatasetType): { titleAr: string; headers: string[]; rows: string[][] } => {
    if (type === 'test_drives') {
      return {
        titleAr: 'سجل طلبات تجربة القيادة — سولينا للسيارات',
        headers: ['المعرف ID', 'اسم العميل', 'رقم الجوال', 'المدينة', 'الفرع المفضل', 'الطراز المطلوب', 'التاريخ', 'الفترة الزمنية', 'الهوية / الإقامة', 'مستشار المبيعات', 'الحالة'],
        rows: testDrives.map(td => [
          td.id, td.fullName, td.phone, td.city, td.preferredShowroom,
          td.modelName, td.preferredDate, td.preferredTimeSlot,
          td.nationalIdOrIqama || '-', td.assignedAdvisor || '-', td.status
        ])
      };
    } else if (type === 'services') {
      return {
        titleAr: 'سجل مواعيد الصيانة الدورية — سولينا للسيارات',
        headers: ['المعرف ID', 'اسم العميل', 'رقم الجوال', 'المدينة', 'الفرع', 'المركبة', 'رقم اللوحة', 'العداد (كم)', 'نوع الصيانة', 'التاريخ', 'التكلفة التقديرية (ر.س)', 'المهندس', 'الحالة'],
        rows: serviceAppointments.map(s => [
          s.id, s.fullName, s.phone, s.city, s.showroom, s.vehicleModel,
          s.plateNumber, s.currentMileage.toString(), s.serviceType,
          s.preferredDate, s.estimatedCost.toString(), s.assignedTechnician || '-', s.status
        ])
      };
    } else if (type === 'quotations') {
      return {
        titleAr: 'سجل عروض الأسعار والتمويل — سولينا للسيارات',
        headers: ['رقم العرض', 'اسم العميل', 'رقم الجوال', 'المركبة', 'الفئة', 'السعر قبل الضريبة', 'ضريبة 15%', 'الإجمالي الشامل (ر.س)', 'نوع الدفع', 'القسط الشهري', 'الحالة'],
        rows: quotations.map(q => [
          q.quotationNumber, q.fullName, q.phone, q.vehicleName, q.gradeName,
          q.vehiclePrice.toString(), q.vatAmount.toString(), q.totalWithVat.toString(),
          q.financeType === 'lease' ? 'تمويل تأجيري' : 'نقدي', (q.monthlyInstallment || 0).toString(), q.status
        ])
      };
    } else if (type === 'fleet') {
      return {
        titleAr: 'كتالوج أسطول سولينا 2026 والأسعار الرسمية',
        headers: ['المعرف ID', 'الاسم بالعربية', 'الاسم بالإنجليزية', 'الموديل', 'الفئة', 'منظومة الدفع', 'السعر يبدأ من (ر.س)', 'القسط الشهري (ر.س)', 'كفاءة الوقود', 'مميز بالواجهة'],
        rows: vehicles.map(v => [
          v.id, v.nameAr, v.nameEn, v.year.toString(), v.category,
          v.powertrain, v.priceStartingFrom.toString(),
          v.monthlyInstallmentStartingFrom.toString(), v.fuelEconomy,
          v.isFeatured ? 'نعم' : 'لا'
        ])
      };
    } else if (type === 'vin_stock') {
      return {
        titleAr: 'مخزون الشاسيه والمستودعات (VIN Inventory) — سولينا',
        headers: ['رقم الشاسيه VIN', 'الطراز', 'التصنيف', 'الفئة Trim', 'اللون', 'المحرك', 'الفرع / الموقع', 'السعر الرسمي (ر.س)', 'الحالة', 'أيام التخزين', 'تاريخ الوصول'],
        rows: vinStock.map(s => [
          s.vin, s.model, s.category, s.trim, s.color, s.engine,
          s.location, s.price.toString(), s.status, s.daysInInventory.toString(), s.arrivalDate
        ])
      };
    } else if (type === 'job_cards') {
      return {
        titleAr: 'أوامر العمل والمسار السريع للورشة — سولينا',
        headers: ['رقم الكرت', 'اسم العميل', 'رقم الجوال', 'المركبة', 'رقم اللوحة', 'رقم الشاسيه VIN', 'العداد (كم)', 'نوع الصيانة', 'الفني المسؤول', 'المسار', 'إجمالي التكلفة (ر.س)', 'الحالة'],
        rows: jobCards.map(c => [
          c.cardNumber, c.customerName, c.customerPhone, c.vehicleModel,
          c.plateNumber, c.vinNumber, c.mileage.toString(), c.serviceType,
          c.technicianName, c.bayNumber, c.totalCost.toString(), c.status
        ])
      };
    } else if (type === 'zatca_invoices') {
      return {
        titleAr: 'سجل الفواتير الضريبية الإلكترونية (ZATCA Phase 2) — سولينا',
        headers: ['رقم الفاتورة', 'المعرف الموحد UUID', 'اسم العميل / المنشأة', 'رقم الجوال', 'الرقم الضريبي للمشتري', 'البيان / المركبة', 'رقم الشاسيه VIN', 'المبلغ الخاضع (ر.س)', 'ضريبة 15% (ر.س)', 'الإجمالي النهائي (ر.س)', 'التاريخ', 'نوع الفاتورة', 'حالة ZATCA'],
        rows: zatcaInvoices.map(inv => [
          inv.invoiceNumber, inv.uuid, inv.customerName, inv.customerPhone,
          inv.vatNumber || '-', inv.vehicleModel, inv.vinNumber,
          inv.baseAmount.toString(), inv.vatAmount.toString(), inv.totalAmount.toString(),
          inv.date, inv.type, inv.status
        ])
      };
    } else if (type === 'parts') {
      return {
        titleAr: 'كتالوج ومخزون قطع الغيار الأصلية (OEM Parts) — سولينا',
        headers: ['المعرف ID', 'رقم القطعة Part #', 'اسم القطعة بالعربية', 'الاسم بالإنجليزية', 'التصنيف', 'السعر شامل الضريبة (ر.س)', 'الرصيد المخزني', 'الموديلات المتوافقة'],
        rows: spareParts.map(p => [
          p.id, p.partNumber, p.nameAr, p.nameEn, p.category, p.price.toString(), (partQuantities[p.id] ?? 20).toString(), p.compatibleModels.join(' | ')
        ])
      };
    } else if (type === 'cpo') {
      return {
        titleAr: 'السيارات المستعملة المعتمدة (AutoHub CPO) — سولينا',
        headers: ['المعرف ID', 'السيارة', 'الفئة', 'سنة الصنع', 'الممشى (كم)', 'السعر النقدي (ر.س)', 'القسط الشهري (ر.س)', 'الفرع', 'الضمان (شهر)'],
        rows: cpoVehicles.map(c => [
          c.id, c.titleAr, c.grade, c.year.toString(), c.mileage.toString(),
          c.price.toString(), c.monthlyInstallment.toString(), c.location, c.warrantyMonths.toString()
        ])
      };
    } else if (type === 'showrooms') {
      return {
        titleAr: 'شبكة الفروع وصالات العرض ومراكز الصيانة — سولينا',
        headers: ['المعرف ID', 'اسم الفرع', 'المدينة', 'المنطقة', 'العنوان التفصيلي', 'الهاتف', 'ساعات العمل', 'الخدمات المتوفرة'],
        rows: showrooms.map(s => [
          s.id, s.name, s.city, s.region, s.address, s.phone, s.workingHours, s.services.join(' | ')
        ])
      };
    } else if (type === 'offers') {
      return {
        titleAr: 'العروض الترويجية والحملات التسويقية — سولينا',
        headers: ['المعرف ID', 'عنوان العرض', 'الوصف الفرعي', 'التصنيف', 'الشارة الترويجية', 'صلاحية العرض'],
        rows: offers.map(o => [
          o.id, o.title, o.subtitle, o.category, o.badge, o.validUntil
        ])
      };
    } else if (type === 'accounting_vouchers') {
      return {
        titleAr: 'سجل سندات القبض والصرف والقيود المحاسبية — سولينا للسيارات',
        headers: ['رقم السند', 'نوع السند', 'التاريخ', 'اسم العميل / المستفيد', 'البيان المحاسبي', 'رقم الحساب', 'اسم الحساب', 'مركز التكلفة', 'طريقة الدفع', 'المبلغ الأساسي (ر.س)', 'الضريبة 15% (ر.س)', 'الإجمالي (ر.س)', 'المرجع المرتبط', 'الحالة'],
        rows: vouchers.map(v => [
          v.voucherNumber,
          v.type === 'receipt' ? 'سند قبض' : v.type === 'payment' ? 'سند صرف' : 'قيد يومية',
          v.date,
          v.partyName,
          v.description,
          v.accountCode,
          v.accountName,
          v.costCenter,
          v.paymentMethod,
          v.baseAmount.toString(),
          v.vatAmount.toString(),
          v.totalAmount.toString(),
          v.referenceNumber || '-',
          v.status === 'posted' ? 'مرحّل' : v.status === 'draft' ? 'مسودة' : 'ملغى'
        ])
      };
    } else if (type === 'custodies') {
      return {
        titleAr: 'سجل العُهد المالية والسلف التشغيلية للموظفين والفروع — سولينا',
        headers: ['رقم العهدة', 'الموظف المستلم', 'المسمى الوظيفي', 'الفرع / القسم', 'نوع العهدة', 'المبلغ المعتمد (ر.س)', 'المبلغ المصروف والمسوى (ر.س)', 'الرصيد المتبقي (ر.س)', 'تاريخ الصرف', 'آخر تسوية', 'الحالة', 'ملاحظات'],
        rows: custodies.map(c => [
          c.custodyNumber,
          c.employeeName,
          c.employeeRole,
          c.branchName,
          c.custodyType === 'permanent_petty_cash' ? 'عهدة نقدية مستديمة' : c.custodyType === 'workshop_operations' ? 'عهدة تشغيل ورشة' : c.custodyType === 'showroom_hospitality' ? 'عهدة ضيافة ومعارض' : 'سلفة مشتريات',
          c.allocatedAmount.toString(),
          c.spentAmount.toString(),
          c.remainingBalance.toString(),
          c.issueDate,
          c.lastSettlementDate,
          c.status === 'active' ? 'نشطة' : c.status === 'pending_settlement' ? 'قيد التسوية' : 'مسددة ومقفلة',
          c.notes || '-'
        ])
      };
    } else if (type === 'chart_of_accounts') {
      return {
        titleAr: 'دليل الحسابات وميزان المراجعة المالي (Chart of Accounts & Trial Balance) — سولينا',
        headers: ['كود الحساب', 'اسم الحساب المحاسبي', 'التصنيف المالي', 'إجمالي المدين (ر.س)', 'إجمالي الدائن (ر.س)', 'الرصيد الصافي (ر.س)'],
        rows: chartOfAccounts.map(acc => [
          acc.code,
          acc.nameAr,
          acc.categoryAr,
          acc.debit.toString(),
          acc.credit.toString(),
          acc.balance.toString()
        ])
      };
    } else if (type === 'audit_logs') {
      return {
        titleAr: 'سجل المراجعة والتدقيق الإداري (Audit Log) — سولينا',
        headers: ['المعرف ID', 'التوقيت', 'القسم', 'نوع العملية', 'الملخص', 'الفارق Diff', 'المسؤول المنفذ'],
        rows: auditLogs.map(l => [
          l.id, l.timestamp, l.module, l.action, l.summaryAr, l.diffAr || '-', l.actorAr || '-'
        ])
      };
    } else {
      // 'all_erp' unified master summary table
      return {
        titleAr: 'التقرير الشامل الموحد لكافة بيانات وكالة سولينا للسيارات (Master ERP Report)',
        headers: ['القسم', 'المرجع / الرقم', 'الاسم / البيان الرئيسي', 'التفاصيل الفرعية', 'القيمة المالية (ر.س)', 'الحالة / الموقع'],
        rows: [
          ...vehicles.map(v => ['الأسطول الجديد 2026', v.id, v.nameAr, `${v.category} • ${v.engineSpec}`, v.priceStartingFrom.toString(), v.isFeatured ? 'مميز' : 'نشط']),
          ...vinStock.map(s => ['مخزون الشاسيه VIN', s.vin, s.model, `${s.trim} • ${s.color}`, s.price.toString(), `${s.location} (${s.status})`]),
          ...zatcaInvoices.map(i => ['فواتير ZATCA', i.invoiceNumber, i.customerName, `${i.vehicleModel} (${i.vinNumber})`, i.totalAmount.toString(), i.status]),
          ...vouchers.map(v => ['السندات المحاسبية', v.voucherNumber, v.partyName, `${v.description} (${v.accountCode})`, v.totalAmount.toString(), v.status]),
          ...custodies.map(c => ['العهد المالية', c.custodyNumber, c.employeeName, `${c.branchName} • المتبقي: ${c.remainingBalance}`, c.allocatedAmount.toString(), c.status]),
          ...quotations.map(q => ['عروض الأسعار', q.quotationNumber, q.fullName, `${q.vehicleName} (${q.gradeName})`, q.totalWithVat.toString(), q.status]),
          ...jobCards.map(c => ['أوامر عمل الورشة', c.cardNumber, c.customerName, `${c.vehicleModel} • ${c.serviceType}`, c.totalCost.toString(), c.status]),
          ...testDrives.map(t => ['تجارب القيادة', t.id, t.fullName, `${t.modelName} • ${t.preferredDate}`, '0', `${t.preferredShowroom} (${t.status})`]),
          ...serviceAppointments.map(s => ['مواعيد الصيانة', s.id, s.fullName, `${s.vehicleModel} • ${s.serviceType}`, s.estimatedCost.toString(), s.status]),
          ...spareParts.map(p => ['قطع الغيار الأصلية', p.partNumber, p.nameAr, `${p.category} • المخزون: ${partQuantities[p.id] ?? 20}`, p.price.toString(), 'متوفر']),
          ...cpoVehicles.map(c => ['المستعمل المعتمد', c.id, c.titleAr, `${c.year} • ${c.mileage} كم`, c.price.toString(), c.location]),
          ...offers.map(o => ['العروض الترويجية', o.id, o.title, `${o.category} • ${o.badge}`, '0', o.validUntil]),
          ...showrooms.map(sh => ['فروع وصالات العرض', sh.id, sh.name, `${sh.city} • ${sh.phone}`, '0', sh.region])
        ]
      };
    }
  };

  const triggerBlobDownload = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const escapeXml = (unsafe: string) =>
    String(unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const exportDataInFormat = (type: ExportDatasetType, format: ExportFormatType) => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const baseFilename = `solina_motors_${type}_${dateStamp}`;
    const { titleAr, headers, rows } = buildDatasetTable(type);

    if (format === 'csv') {
      const csvContent = '\uFEFF' + [
        headers.join(','),
        ...rows.map(e => e.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      triggerBlobDownload(csvContent, 'text/csv;charset=utf-8;', `${baseFilename}.csv`);
      return;
    }

    if (format === 'txt') {
      const txtContent = '\uFEFF' + [
        `====================================================================`,
        `${titleAr}`,
        `شركة سولينا للسيارات | الرقم الضريبي: ${settings.vatNumber} | التاريخ: ${dateStamp}`,
        `إجمالي السجلات: ${rows.length}`,
        `====================================================================`,
        headers.join('\t'),
        ...rows.map(r => r.join('\t'))
      ].join('\r\n');
      triggerBlobDownload(txtContent, 'text/plain;charset=utf-8;', `${baseFilename}.txt`);
      return;
    }

    if (format === 'json') {
      const structuredRecords = rows.map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          obj[h] = row[idx] ?? '';
        });
        return obj;
      });
      const payload = type === 'all_erp'
        ? {
            meta: {
              agency: settings.companyNameAr,
              vatNumber: settings.vatNumber,
              exportedAt: new Date().toISOString(),
              dataset: type,
              totalRecords: rows.length
            },
            data: {
              vehicles,
              vinStock,
              testDrives,
              serviceAppointments,
              quotations,
              jobCards,
              zatcaInvoices,
              custodies,
              vouchers,
              chartOfAccounts,
              spareParts,
              partQuantities,
              cpoVehicles,
              offers,
              showrooms,
              settings,
              auditLogs
            }
          }
        : {
            meta: {
              title: titleAr,
              agency: settings.companyNameAr,
              vatNumber: settings.vatNumber,
              exportedAt: new Date().toISOString(),
              dataset: type,
              totalRecords: rows.length
            },
            records: structuredRecords
          };
      triggerBlobDownload(JSON.stringify(payload, null, 2), 'application/json;charset=utf-8;', `${baseFilename}.json`);
      return;
    }

    if (format === 'xml') {
      const xmlRecords = rows.map((row, rIdx) => {
        const fieldsXml = headers
          .map((h, cIdx) => `    <Field name="${escapeXml(h)}">${escapeXml(row[cIdx] ?? '')}</Field>`)
          .join('\n');
        return `  <Record index="${rIdx + 1}">\n${fieldsXml}\n  </Record>`;
      }).join('\n');

      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<SolinaMotorsExport dataset="${escapeXml(type)}" title="${escapeXml(titleAr)}" vatNumber="${escapeXml(settings.vatNumber)}" exportedAt="${new Date().toISOString()}" totalRecords="${rows.length}">\n${xmlRecords}\n</SolinaMotorsExport>`;
      triggerBlobDownload(xmlContent, 'application/xml;charset=utf-8;', `${baseFilename}.xml`);
      return;
    }

    if (format === 'excel') {
      // Rich Excel SpreadsheetML / HTML Table with UTF-8 BOM & RTL direction
      const theadHtml = headers.map(h => `<th style="background-color:#141414;color:#ffffff;font-weight:bold;padding:10px;border:1px solid #d0d0d0;">${escapeXml(h)}</th>`).join('');
      const tbodyHtml = rows.map((r, idx) => {
        const bg = idx % 2 === 0 ? '#ffffff' : '#f8f8f8';
        return `<tr>${r.map(c => `<td style="background-color:${bg};padding:8px;border:1px solid #e0e0e0;text-align:right;">${escapeXml(c)}</td>`).join('')}</tr>`;
      }).join('');

      const excelHtml = `\uFEFF<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" dir="rtl" lang="ar">
<head>
<meta charset="UTF-8" />
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Solina_${type}</x:Name><x:WorksheetOptions><x:DisplayRightToLeft/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
</head>
<body style="font-family:Tahoma,Arial,sans-serif;direction:rtl;">
  <table border="1" style="border-collapse:collapse;width:100%;">
    <tr>
      <td colspan="${headers.length}" style="background-color:#f3f3f3;color:#141414;font-size:16px;font-weight:bold;padding:12px;text-align:right;">
        ${escapeXml(titleAr)} — ${escapeXml(settings.companyNameAr)} (الرقم الضريبي: ${escapeXml(settings.vatNumber)}) | التاريخ: ${dateStamp}
      </td>
    </tr>
    <thead><tr>${theadHtml}</tr></thead>
    <tbody>${tbodyHtml}</tbody>
  </table>
</body>
</html>`;
      triggerBlobDownload(excelHtml, 'application/vnd.ms-excel;charset=utf-8;', `${baseFilename}.xls`);
      return;
    }

    const reportHtmlDocument = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>${escapeXml(titleAr)}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #ffffff; color: #141414; margin: 0; padding: 32px; direction: rtl; }
    .header { display: flex; justify-content: space-between; align-items: center; background: #f3f3f3; padding: 24px; border-radius: 20px; margin-bottom: 24px; border: 1px solid #e0e0e0; }
    h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; }
    .meta { font-size: 12px; color: #595959; }
    .badge { background: #141414; color: #ffffff; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; border: 1px solid #e0e0e0; border-radius: 16px; overflow: hidden; }
    th { background: #141414; color: #ffffff; padding: 12px 10px; text-align: right; font-weight: 700; }
    td { padding: 10px; border-bottom: 1px solid #eaeaea; color: #141414; }
    tr:nth-child(even) td { background: #fafafa; }
    .toolbar { margin-bottom: 16px; display: flex; gap: 10px; align-items: center; }
    @media print { .no-print { display: none !important; } body { padding: 10px; } }
  </style>
</head>
<body>
  <div class="toolbar no-print">
    <button onclick="window.print()" style="background:#141414;color:#fff;border:0;padding:10px 20px;border-radius:999px;font-weight:bold;cursor:pointer;">طباعة / حفظ كملف PDF</button>
  </div>
  <div class="header">
    <div>
      <h1>${escapeXml(titleAr)}.</h1>
      <div class="meta">${escapeXml(settings.companyNameAr)} • الرقم الضريبي الموحد: ${escapeXml(settings.vatNumber)} • تاريخ التقرير: ${new Date().toLocaleString('ar-SA')}</div>
    </div>
    <div class="badge">إجمالي السجلات: ${rows.length}</div>
  </div>
  <table>
    <thead>
      <tr>${headers.map(h => `<th>${escapeXml(h)}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rows.map(r => `<tr>${r.map(c => `<td>${escapeXml(c)}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

    if (format === 'word') {
      const wordHtml = `\uFEFF<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40" dir="rtl" lang="ar">
<head><meta charset="UTF-8"><title>${escapeXml(titleAr)}</title>
<style>
  body { font-family: 'Arial', 'Tahoma', sans-serif; direction: rtl; color: #141414; padding: 24px; }
  .header { border-bottom: 2px solid #141414; padding-bottom: 12px; margin-bottom: 20px; }
  h1 { font-size: 18pt; margin: 0 0 6px 0; }
  .meta { font-size: 10pt; color: #555555; }
  table { width: 100%; border-collapse: collapse; font-size: 10pt; margin-top: 12px; }
  th { background-color: #141414; color: #ffffff; padding: 8px; border: 1px solid #141414; text-align: right; }
  td { padding: 7px; border: 1px solid #cccccc; text-align: right; }
</style></head>
<body>
  <div class="header">
    <h1>${escapeXml(titleAr)}</h1>
    <div class="meta">${escapeXml(settings.companyNameAr)} | الرقم الضريبي: ${escapeXml(settings.vatNumber)} | السجل التجاري: ${escapeXml(settings.crNumber)} | التاريخ: ${dateStamp} | إجمالي السجلات: ${rows.length}</div>
  </div>
  <table>
    <thead><tr>${headers.map(h => `<th>${escapeXml(h)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${escapeXml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>
</body></html>`;
      triggerBlobDownload(wordHtml, 'application/msword;charset=utf-8;', `${baseFilename}.doc`);
      return;
    }

    if (format === 'sql') {
      const tableName = `solina_${type}`;
      const colNames = headers.map((_, idx) => `col_${idx + 1}`);
      const createTableSql = [
        `-- ==========================================================`,
        `-- Solina Motors ERP SQL Dump: ${titleAr}`,
        `-- VAT Number: ${settings.vatNumber} | Exported At: ${new Date().toISOString()}`,
        `-- ==========================================================`,
        `CREATE TABLE IF NOT EXISTS ${tableName} (`,
        colNames.map((c, idx) => `  ${c} TEXT COMMENT '${String(headers[idx]).replace(/'/g, "''")}'`).join(',\n'),
        `);\n`
      ].join('\n');

      const insertRowsSql = rows.map(r => {
        const vals = r.map(v => `'${String(v ?? '').replace(/'/g, "''")}'`).join(', ');
        return `INSERT INTO ${tableName} (${colNames.join(', ')}) VALUES (${vals});`;
      }).join('\n');

      triggerBlobDownload('\uFEFF' + createTableSql + insertRowsSql + '\n', 'application/sql;charset=utf-8;', `${baseFilename}.sql`);
      return;
    }

    if (format === 'markdown') {
      const mdHeader = `# ${titleAr}\n\n- **المنشأة:** ${settings.companyNameAr}\n- **الرقم الضريبي:** ${settings.vatNumber}\n- **تاريخ التصدير:** ${dateStamp}\n- **إجمالي السجلات:** ${rows.length}\n\n`;
      const mdTableHead = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n`;
      const mdTableBody = rows.map(r => `| ${r.map(c => String(c ?? '').replace(/\|/g, '\\|')).join(' | ')} |`).join('\n');
      triggerBlobDownload('\uFEFF' + mdHeader + mdTableHead + mdTableBody + '\n', 'text/markdown;charset=utf-8;', `${baseFilename}.md`);
      return;
    }

    if (format === 'html') {
      triggerBlobDownload(reportHtmlDocument, 'text/html;charset=utf-8;', `${baseFilename}.html`);
      return;
    }

    if (format === 'pdf_print') {
      const printWin = window.open('', '_blank', 'width=1100,height=800');
      if (printWin) {
        printWin.document.open();
        printWin.document.write(reportHtmlDocument);
        printWin.document.close();
        setTimeout(() => {
          printWin.focus();
          printWin.print();
        }, 350);
      } else {
        window.print();
      }
    }
  };

  const exportSingleDocument = (
    titleAr: string,
    docNumber: string,
    metaRows: Array<[string, string]>,
    tableHeaders: string[],
    tableRows: string[][],
    format: ExportFormatType
  ) => {
    const safeDoc = docNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
    const baseFilename = `solina_doc_${safeDoc}`;

    if (format === 'json') {
      const payload = {
        agency: settings.companyNameAr,
        vatNumber: settings.vatNumber,
        crNumber: settings.crNumber,
        documentTitle: titleAr,
        documentNumber: docNumber,
        metadata: Object.fromEntries(metaRows),
        items: tableRows.map(r => Object.fromEntries(tableHeaders.map((h, i) => [h, r[i] ?? ''])))
      };
      triggerBlobDownload(JSON.stringify(payload, null, 2), 'application/json;charset=utf-8;', `${baseFilename}.json`);
      return;
    }

    if (format === 'csv') {
      const lines = [
        `"${titleAr}","${docNumber}"`,
        ...metaRows.map(([k, v]) => `"${k}","${String(v).replace(/"/g, '""')}"`),
        '',
        tableHeaders.map(h => `"${h}"`).join(','),
        ...tableRows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
      ];
      triggerBlobDownload('\uFEFF' + lines.join('\n'), 'text/csv;charset=utf-8;', `${baseFilename}.csv`);
      return;
    }

    if (format === 'xml') {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<SolinaDocument number="${escapeXml(docNumber)}" title="${escapeXml(titleAr)}" vatNumber="${escapeXml(settings.vatNumber)}">
  <Metadata>
${metaRows.map(([k, v]) => `    <Meta label="${escapeXml(k)}">${escapeXml(v)}</Meta>`).join('\n')}
  </Metadata>
  <LineItems>
${tableRows.map((r, idx) => `    <Item index="${idx + 1}">\n${tableHeaders.map((h, cIdx) => `      <Field name="${escapeXml(h)}">${escapeXml(r[cIdx] ?? '')}</Field>`).join('\n')}\n    </Item>`).join('\n')}
  </LineItems>
</SolinaDocument>`;
      triggerBlobDownload(xml, 'application/xml;charset=utf-8;', `${baseFilename}.xml`);
      return;
    }

    const docHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>${escapeXml(titleAr)} - ${escapeXml(docNumber)}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: #ffffff; color: #141414; margin: 0; padding: 36px; direction: rtl; }
    .box { max-width: 860px; margin: 0 auto; border: 1px solid #141414; border-radius: 20px; padding: 28px; }
    .top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #141414; padding-bottom: 16px; margin-bottom: 20px; }
    h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 800; }
    .sub { font-size: 12px; color: #555; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #f3f3f3; padding: 16px; border-radius: 14px; margin-bottom: 20px; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
    th { background: #141414; color: #fff; padding: 10px; text-align: right; }
    td { padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; }
    .sigs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; padding-top: 16px; border-top: 1px dashed #cccccc; text-align: center; font-size: 12px; color: #555; }
    @media print { .no-print { display: none !important; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="box">
    <div class="no-print" style="margin-bottom:16px;">
      <button onclick="window.print()" style="background:#141414;color:#fff;border:0;padding:8px 18px;border-radius:999px;font-weight:bold;cursor:pointer;">طباعة / حفظ كملف PDF</button>
    </div>
    <div class="top">
      <div>
        <h1>${escapeXml(titleAr)}</h1>
        <div class="sub">${escapeXml(settings.companyNameAr)} • الرقم الضريبي: ${escapeXml(settings.vatNumber)} • س.ت: ${escapeXml(settings.crNumber)}</div>
      </div>
      <div style="background:#141414;color:#fff;padding:6px 14px;border-radius:999px;font-weight:bold;font-size:13px;">${escapeXml(docNumber)}</div>
    </div>
    <div class="grid">
      ${metaRows.map(([k, v]) => `<div><strong>${escapeXml(k)}:</strong> ${escapeXml(v)}</div>`).join('')}
    </div>
    <table>
      <thead><tr>${tableHeaders.map(h => `<th>${escapeXml(h)}</th>`).join('')}</tr></thead>
      <tbody>${tableRows.map(r => `<tr>${r.map(c => `<td>${escapeXml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <div class="sigs">
      <div>إعداد المحاسب المختص<br/><br/>___________________</div>
      <div>اعتماد المدير المالي<br/><br/>___________________</div>
      <div>توقيع المستلم / الطرف الثاني<br/><br/>___________________</div>
    </div>
  </div>
</body>
</html>`;

    if (format === 'excel') {
      triggerBlobDownload('\uFEFF' + docHtml, 'application/vnd.ms-excel;charset=utf-8;', `${baseFilename}.xls`);
      return;
    }
    if (format === 'word') {
      triggerBlobDownload('\uFEFF' + docHtml, 'application/msword;charset=utf-8;', `${baseFilename}.doc`);
      return;
    }
    if (format === 'html') {
      triggerBlobDownload(docHtml, 'text/html;charset=utf-8;', `${baseFilename}.html`);
      return;
    }
    const printWin = window.open('', '_blank', 'width=960,height=780');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(docHtml);
      printWin.document.close();
      setTimeout(() => {
        printWin.focus();
        printWin.print();
      }, 300);
    }
  };

  const exportDataToCSV = (type: ExportCSVType, directFormat?: ExportFormatType) => {
    if (directFormat) {
      exportDataInFormat(type, directFormat);
      return;
    }
    // Open the Universal Multi-Format Export Modal pre-selected to this dataset
    setExportModalRequest(type);
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    undoSnapshotsRef.current = {};
    localStorage.removeItem('solina_admin_audit_logs');
  };

  const resetToDefaultData = () => {
    setVehicles(VEHICLES);
    setOffers(OFFERS);
    setCpoVehicles(CERTIFIED_PRE_OWNED);
    setSpareParts(GENUINE_PARTS);
    setShowrooms(SHOWROOMS);
    setTestDrives(INITIAL_TEST_DRIVES);
    setServiceAppointments(INITIAL_SERVICES);
    setQuotations(INITIAL_QUOTATIONS);
    setVinStock(INITIAL_VIN_STOCK);
    setJobCards(INITIAL_JOB_CARDS);
    setZatcaInvoices(INITIAL_INVOICES);
    setSettings(INITIAL_SETTINGS);
    setPartQuantities(INITIAL_PART_QUANTITIES);
    setCustodies(INITIAL_CUSTODIES);
    setVouchers(INITIAL_VOUCHERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem('solina_admin_custodies');
    localStorage.removeItem('solina_admin_vouchers');
    undoSnapshotsRef.current = {};

    const keys = [
      'solina_admin_vehicles', 'toyota_admin_vehicles',
      'solina_admin_offers', 'toyota_admin_offers',
      'solina_admin_cpo', 'toyota_admin_cpo',
      'solina_admin_parts', 'toyota_admin_parts',
      'solina_admin_showrooms', 'toyota_admin_showrooms',
      'solina_admin_test_drives', 'toyota_admin_test_drives',
      'solina_admin_services', 'toyota_admin_services',
      'solina_admin_quotations', 'toyota_admin_quotations',
      'solina_admin_vin_stock',
      'solina_admin_job_cards',
      'solina_admin_zatca_invoices',
      'solina_admin_settings',
      'solina_admin_part_quantities',
      'solina_admin_audit_logs'
    ];
    keys.forEach(k => localStorage.removeItem(k));
  };

  // Calculated Aggregate Stats
  const totalPipelineValueSAR = quotations.reduce((acc, q) => acc + q.totalWithVat, 0);
  const newTestDrivesCount = testDrives.filter(td => td.status === 'new').length;
  const pendingServicesCount = serviceAppointments.filter(s => s.status === 'pending').length;

  const inStockVinCount = vinStock.filter(s => s.status === 'in_stock').length;
  const reservedVinCount = vinStock.filter(s => s.status === 'reserved').length;
  const inTransitVinCount = vinStock.filter(s => s.status === 'in_transit').length;
  const agingVinCount = vinStock.filter(s => s.status !== 'sold' && s.daysInInventory >= 45).length;
  const totalVinStockValueSAR = vinStock.reduce((acc, s) => acc + s.price, 0);

  const activeJobCardsCount = jobCards.filter(c => c.status === 'received' || c.status === 'in_progress' || c.status === 'quality_check').length;
  const readyJobCardsCount = jobCards.filter(c => c.status === 'ready').length;
  const workshopRevenueSAR = jobCards.reduce((acc, c) => acc + c.totalCost, 0);

  const totalInvoicedSalesSAR = zatcaInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalVatCollectedSAR = zatcaInvoices.reduce((acc, inv) => acc + inv.vatAmount, 0);
  const lowStockPartsCount = spareParts.filter(p => (partQuantities[p.id] ?? 20) <= 10).length;

  const postedVouchers = vouchers.filter(v => v.status === 'posted');
  const totalReceiptsSAR = postedVouchers.filter(v => v.type === 'receipt').reduce((acc, v) => acc + v.totalAmount, 0);
  const totalPaymentsSAR = postedVouchers.filter(v => v.type === 'payment').reduce((acc, v) => acc + v.totalAmount, 0);
  const netCashFlowSAR = totalReceiptsSAR - totalPaymentsSAR;
  const totalInputVatSAR = postedVouchers.filter(v => v.type === 'payment').reduce((acc, v) => acc + v.vatAmount, 0);
  const netVatPayableSAR = Math.max(0, totalVatCollectedSAR - totalInputVatSAR);

  const totalCustodiesAllocatedSAR = custodies.reduce((acc, c) => acc + c.allocatedAmount, 0);
  const totalCustodiesSpentSAR = custodies.reduce((acc, c) => acc + c.spentAmount, 0);
  const totalCustodiesRemainingSAR = custodies.reduce((acc, c) => acc + c.remainingBalance, 0);
  const activeCustodiesCount = custodies.filter(c => c.status !== 'settled_closed').length;

  const partsInventoryValueSAR = spareParts.reduce((acc, p) => acc + p.price * (partQuantities[p.id] ?? 20), 0);

  const chartOfAccounts: AccountLedgerItem[] = [
    {
      code: '1101',
      nameAr: 'النقدية بالخزينة والحسابات البنكية المعتمدة',
      categoryAr: 'الأصول',
      debit: totalReceiptsSAR + 2450000,
      credit: totalPaymentsSAR,
      balance: 2450000 + netCashFlowSAR
    },
    {
      code: '1104',
      nameAr: 'عُهد وسلف الموظفين والفروع التشغيلة',
      categoryAr: 'الأصول',
      debit: totalCustodiesAllocatedSAR,
      credit: totalCustodiesSpentSAR,
      balance: totalCustodiesRemainingSAR
    },
    {
      code: '1105',
      nameAr: 'ذمم العملاء وعقود التمويل تحت التحصيل',
      categoryAr: 'الأصول',
      debit: totalPipelineValueSAR,
      credit: totalReceiptsSAR,
      balance: Math.max(0, totalPipelineValueSAR - totalReceiptsSAR)
    },
    {
      code: '1201',
      nameAr: 'مخزون المركبات الجديدة والمستودعات (VIN Stock)',
      categoryAr: 'الأصول',
      debit: totalVinStockValueSAR,
      credit: 0,
      balance: totalVinStockValueSAR
    },
    {
      code: '1202',
      nameAr: 'مخزون قطع الغيار الأصلية والإكسسوارات (OEM)',
      categoryAr: 'الأصول',
      debit: partsInventoryValueSAR,
      credit: 0,
      balance: partsInventoryValueSAR
    },
    {
      code: '2101',
      nameAr: 'ذمم الموردين والوكالات والشحن الدولي',
      categoryAr: 'الالتزامات',
      debit: totalPaymentsSAR,
      credit: 1850000,
      balance: 1850000 - totalPaymentsSAR
    },
    {
      code: '2104',
      nameAr: 'حساب ضريبة القيمة المضافة المستحقة (ZATCA 15%)',
      categoryAr: 'الالتزامات',
      debit: totalInputVatSAR,
      credit: totalVatCollectedSAR,
      balance: netVatPayableSAR
    },
    {
      code: '3101',
      nameAr: 'رأس المال العامل والاحتياطي النظامي للوكالة',
      categoryAr: 'حقوق الملكية',
      debit: 0,
      credit: 15000000,
      balance: 15000000
    },
    {
      code: '4101',
      nameAr: 'إيرادات مبيعات السيارات الجديدة والمستعملة',
      categoryAr: 'الإيرادات',
      debit: 0,
      credit: totalInvoicedSalesSAR - totalVatCollectedSAR,
      balance: totalInvoicedSalesSAR - totalVatCollectedSAR
    },
    {
      code: '4102',
      nameAr: 'إيرادات خدمات الصيانة الدورية وقطع الغيار',
      categoryAr: 'الإيرادات',
      debit: 0,
      credit: workshopRevenueSAR,
      balance: workshopRevenueSAR
    },
    {
      code: '5102',
      nameAr: 'مصروفات الشحن والنقل والتخليص الجمركي',
      categoryAr: 'المصروفات',
      debit: 32200,
      credit: 0,
      balance: 32200
    },
    {
      code: '5203',
      nameAr: 'مصروفات تشغيل وصيانة الفروع والورش والعُهد',
      categoryAr: 'المصروفات',
      debit: totalCustodiesSpentSAR,
      credit: 0,
      balance: totalCustodiesSpentSAR
    }
  ];

  const stats = {
    totalTestDrives: testDrives.length,
    newTestDrivesCount,
    totalServices: serviceAppointments.length,
    pendingServicesCount,
    totalQuotations: quotations.length,
    totalPipelineValueSAR,
    totalFleetCount: vehicles.length,
    totalOffersCount: offers.length,
    totalCPOCount: cpoVehicles.length,
    totalPartsCount: spareParts.length,
    lowStockPartsCount,
    totalShowroomsCount: showrooms.length,
    totalVinStockCount: vinStock.length,
    inStockVinCount,
    reservedVinCount,
    inTransitVinCount,
    agingVinCount,
    totalVinStockValueSAR,
    activeJobCardsCount,
    readyJobCardsCount,
    workshopRevenueSAR,
    totalInvoicesCount: zatcaInvoices.length,
    totalInvoicedSalesSAR,
    totalVatCollectedSAR,
    totalReceiptsSAR,
    totalPaymentsSAR,
    netCashFlowSAR,
    totalInputVatSAR,
    netVatPayableSAR,
    totalCustodiesAllocatedSAR,
    totalCustodiesSpentSAR,
    totalCustodiesRemainingSAR,
    activeCustodiesCount
  };

  return (
    <AdminDataContext.Provider
      value={{
        vehicles,
        offers,
        cpoVehicles,
        spareParts,
        showrooms,
        testDrives,
        serviceAppointments,
        quotations,
        vinStock,
        jobCards,
        zatcaInvoices,
        custodies,
        vouchers,
        chartOfAccounts,
        auditLogs,
        settings,
        partQuantities,
        adminRole,
        setAdminRole,
        addVehicle,
        updateVehicle,
        updateVehiclePrice,
        toggleVehicleFeatured,
        deleteVehicle,
        addVinStock,
        updateVinStock,
        updateVinStatus,
        transferVinBranch,
        deleteVinStock,
        addOffer,
        updateOffer,
        deleteOffer,
        addCPOVehicle,
        updateCPOVehicle,
        deleteCPOVehicle,
        addSparePart,
        updateSparePart,
        updateSparePartPrice,
        adjustPartQuantity,
        deleteSparePart,
        addShowroom,
        updateShowroom,
        deleteShowroom,
        addTestDrive,
        updateTestDrive,
        updateTestDriveStatus,
        bulkUpdateTestDriveStatus,
        bulkAssignTestDriveAdvisor,
        deleteTestDrive,
        addServiceAppointment,
        updateServiceAppointment,
        updateServiceStatus,
        deleteServiceAppointment,
        convertServiceToJobCard,
        addQuotation,
        updateQuotation,
        updateQuotationStatus,
        deleteQuotation,
        convertQuotationToInvoice,
        addJobCard,
        updateJobCard,
        updateJobCardStatus,
        deleteJobCard,
        convertJobCardToInvoice,
        addZatcaInvoice,
        updateZatcaInvoiceStatus,
        issueCreditNote,
        deleteZatcaInvoice,
        addCustody,
        settleCustodyExpense,
        replenishCustody,
        closeCustody,
        deleteCustody,
        addVoucher,
        updateVoucherStatus,
        deleteVoucher,
        createReceiptFromInvoice,
        exportSingleDocument,
        updateSettings,
        undoAuditLog,
        exportFullBackupJSON,
        importFullBackupJSON,
        exportDataToCSV,
        exportDataInFormat,
        exportModalRequest,
        setExportModalRequest,
        clearAuditLogs,
        stats,
        resetToDefaultData
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
