import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Wrench, 
  FileText, 
  Search, 
  Phone, 
  MessageCircle, 
  Trash2, 
  Calendar, 
  Clock, 
  Building2,
  Download,
  Plus,
  QrCode,
  Eye,
  X,
  Printer,
  CheckCircle2,
  LayoutList,
  Kanban,
  ArrowLeft
} from 'lucide-react';
import { useAdminData, QuotationRecord, TestDriveLead } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdminTabType, LeadsSubTabType } from './AdminDashboard';

interface AdminLeadsTabProps {
  initialSubTab?: LeadsSubTabType;
  onSubTabChange?: (sub: LeadsSubTabType) => void;
  onNavigateTab?: (tab: AdminTabType | LeadsSubTabType) => void;
}

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({ 
  initialSubTab = 'test_drives',
  onSubTabChange,
  onNavigateTab
}) => {
  const { 
    vehicles,
    showrooms,
    testDrives, 
    addTestDrive,
    updateTestDrive,
    updateTestDriveStatus, 
    bulkUpdateTestDriveStatus,
    bulkAssignTestDriveAdvisor,
    deleteTestDrive,
    serviceAppointments,
    addServiceAppointment,
    updateServiceAppointment,
    updateServiceStatus,
    deleteServiceAppointment,
    convertServiceToJobCard,
    quotations,
    addQuotation,
    updateQuotationStatus,
    deleteQuotation,
    convertQuotationToInvoice,
    exportSingleDocument,
    exportDataToCSV
  } = useAdminData();

  const { language, formatPrice } = useLanguage();
  const [subTab, setSubTab] = useState<LeadsSubTabType>(initialSubTab);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Bulk Selection State for Test Drives
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Modals State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [previewQuotation, setPreviewQuotation] = useState<QuotationRecord | null>(null);

  // New Walk-in / Phone Lead Form
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    city: 'الرياض',
    showroom: showrooms[0]?.name || 'مركز خريص الرئيسي',
    modelName: vehicles[0]?.nameAr || 'سولينا كامري 2026 هايبرد',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 ص - 12:00 م',
    plateNumber: 'س ل ن 2026',
    mileage: 10000,
    serviceType: 'صيانة دورية 10,000 كم (صيانة سريعة 45 دقيقة)',
    cost: 480,
    financeType: 'lease' as 'cash' | 'lease',
    notes: ''
  });

  useEffect(() => {
    setSubTab(initialSubTab);
    setStatusFilter('all');
    setSelectedLeadIds([]);
  }, [initialSubTab]);

  const handleSelectSubTab = (next: LeadsSubTabType) => {
    setSubTab(next);
    setStatusFilter('all');
    setSelectedLeadIds([]);
    if (onSubTabChange) onSubTabChange(next);
  };

  const toggleLeadSelection = (id: string) => {
    setSelectedLeadIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.fullName || !leadForm.phone) return;

    if (subTab === 'test_drives') {
      addTestDrive({
        fullName: leadForm.fullName,
        phone: leadForm.phone,
        city: leadForm.city,
        preferredShowroom: leadForm.showroom,
        modelId: leadForm.modelName,
        modelName: leadForm.modelName,
        preferredDate: leadForm.date,
        preferredTimeSlot: leadForm.timeSlot,
        notes: leadForm.notes || 'تسجيل مباشر من صالة عرض سولينا',
        assignedAdvisor: 'أ. تركي العتيبي'
      });
    } else if (subTab === 'services') {
      addServiceAppointment({
        fullName: leadForm.fullName,
        phone: leadForm.phone,
        city: leadForm.city,
        showroom: leadForm.showroom,
        vehicleModel: leadForm.modelName,
        plateNumber: leadForm.plateNumber,
        currentMileage: Number(leadForm.mileage),
        packageMileage: Number(leadForm.mileage),
        serviceType: leadForm.serviceType,
        preferredDate: leadForm.date,
        preferredTime: leadForm.timeSlot,
        estimatedCost: Number(leadForm.cost),
        assignedTechnician: 'م. أحمد الشريف'
      });
    } else if (subTab === 'quotations') {
      const foundVehicle = vehicles.find(v => v.nameAr === leadForm.modelName) || vehicles[0];
      const basePrice = foundVehicle ? foundVehicle.priceStartingFrom : 135000;
      const vat = Math.round(basePrice * 0.15);
      const total = basePrice + vat;
      addQuotation({
        fullName: leadForm.fullName,
        phone: leadForm.phone,
        city: leadForm.city,
        vehicleId: foundVehicle?.id || 'camry-2026',
        vehicleName: leadForm.modelName,
        gradeName: foundVehicle?.grades[0]?.name || 'GLX 2026',
        vehiclePrice: basePrice,
        vatAmount: vat,
        totalWithVat: total,
        financeType: leadForm.financeType,
        downPaymentPercent: 10,
        downPaymentAmount: Math.round(total * 0.1),
        durationMonths: 60,
        monthlyInstallment: Math.round((total * 0.9) / 60),
        bankName: 'تمويل سولينا المعتمد / مصرف الراجحي',
        status: 'sent'
      });
    }

    setShowAddLeadModal(false);
    setLeadForm(prev => ({ ...prev, fullName: '', phone: '', notes: '' }));
  };

  const filteredTestDrives = testDrives.filter(td => {
    const q = searchQuery.toLowerCase();
    const matchQ = td.fullName.toLowerCase().includes(q) || td.phone.includes(q) || td.modelName.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || td.status === statusFilter;
    return matchQ && matchS;
  });

  const filteredServices = serviceAppointments.filter(srv => {
    const q = searchQuery.toLowerCase();
    const matchQ = srv.fullName.toLowerCase().includes(q) || srv.phone.includes(q) || srv.plateNumber.toLowerCase().includes(q);
    const matchS = statusFilter === 'all' || srv.status === statusFilter;
    return matchQ && matchS;
  });

  const filteredQuotations = quotations.filter(q => {
    const query = searchQuery.toLowerCase();
    const matchQ = q.fullName.toLowerCase().includes(query) || q.phone.includes(query) || q.quotationNumber.toLowerCase().includes(query);
    const matchS = statusFilter === 'all' || q.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Mobbin Header & Sub-Tab Segmented Controls */}
      <div className="bg-[#ffffff] p-6 rounded-[24px] border border-[#f0f0f0] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h2 className="mobbin-heading text-lg md:text-xl text-[#141414]">
                {language === 'ar' ? 'إدارة الطلبات والحجوزات وعروض الأسعار.' : 'Leads, Appointments & Quotations Pipeline.'}
              </h2>
              <p className="mobbin-subtitle-light text-xs">
                متابعة فورية لطلبات تجارب القيادة، مواعيد الصيانة السريعة، وعروض التمويل مع التحويل المباشر للورشة والفوترة.
              </p>
            </div>
          </div>

          {/* View Mode Segmented Control (Table vs Kanban) */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'table' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>عرض الجدول</span>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'kanban' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>لوحة الكانبان</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Tab Segmented Control + Search & Actions */}
        <div className="pt-4 border-t border-[#f0f0f0] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => handleSelectSubTab('test_drives')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer whitespace-nowrap ${
                subTab === 'test_drives' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'طلبات تجارب القيادة' : 'Test Drives'}</span>
              <span className="mobbin-badge-popular px-2 py-0.5 text-[10px] font-mono">{testDrives.length}</span>
            </button>

            <button
              onClick={() => handleSelectSubTab('services')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer whitespace-nowrap ${
                subTab === 'services' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حجوزات الصيانة السريعة' : 'Express Service'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#e0e0e0] text-[#141414] font-mono">{serviceAppointments.length}</span>
            </button>

            <button
              onClick={() => handleSelectSubTab('quotations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer whitespace-nowrap ${
                subTab === 'quotations' ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'عروض الأسعار والتمويل' : 'Quotations'}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#e0e0e0] text-[#141414] font-mono">{quotations.length}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            <div className="relative flex-1 sm:w-52">
              <Search className="w-3.5 h-3.5 text-[#707070] absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث بالاسم أو الجوال...' : 'Search name or phone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs !pr-9"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
              {subTab === 'test_drives' && (
                <>
                  <option value="new">جديد (New)</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="confirmed">موعد مؤكد</option>
                  <option value="completed">تمت التجربة</option>
                  <option value="cancelled">ملغي</option>
                </>
              )}
              {subTab === 'services' && (
                <>
                  <option value="pending">بانتظار التأكيد</option>
                  <option value="in_progress">جاري الفحص بالورشة</option>
                  <option value="completed">تم استلام السيارة</option>
                  <option value="cancelled">ملغي</option>
                </>
              )}
              {subTab === 'quotations' && (
                <>
                  <option value="draft">مسودة</option>
                  <option value="sent">تم الإرسال للعميل</option>
                  <option value="approved">موافق عليه مبدئياً</option>
                  <option value="deal_closed">تم إبرام العقد والفوترة</option>
                </>
              )}
            </select>

            <button
              onClick={() => setShowAddLeadModal(true)}
              className="mobbin-ink-pill flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إضافة طلب جديد' : 'Add Lead'}</span>
            </button>

            <button
              onClick={() => exportDataToCSV(subTab)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-xs font-semibold cursor-pointer whitespace-nowrap"
              title="تصدير البيانات بجميع الصيغ (Excel, CSV, PDF, JSON, XML, HTML, TXT)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تصدير (كل الصيغ)' : 'Export (All Formats)'}</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar when Test Drives are selected */}
        {subTab === 'test_drives' && selectedLeadIds.length > 0 && (
          <div className="p-3.5 rounded-[16px] bg-[#f3f3f3] border border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="mobbin-badge-popular px-2.5 py-0.5 font-mono">{selectedLeadIds.length} محدد</span>
              <span className="font-semibold text-[#141414]">إجراءات جماعية سريعة للطلبات المحددة:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  bulkUpdateTestDriveStatus(selectedLeadIds, 'confirmed');
                  setSelectedLeadIds([]);
                }}
                className="mobbin-ink-pill px-3.5 py-1.5 rounded-full bg-[#141414] text-[#ffffff] font-semibold cursor-pointer"
              >
                اعتماد كموعد مؤكد
              </button>
              <button
                onClick={() => {
                  bulkAssignTestDriveAdvisor(selectedLeadIds, 'أ. تركي العتيبي');
                  setSelectedLeadIds([]);
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] font-semibold cursor-pointer"
              >
                إسناد لـ أ. تركي العتيبي
              </button>
              <button
                onClick={() => {
                  bulkAssignTestDriveAdvisor(selectedLeadIds, 'أ. ريان الغامدي');
                  setSelectedLeadIds([]);
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#ffffff] border border-[#e0e0e0] text-[#141414] font-semibold cursor-pointer"
              >
                إسناد لـ أ. ريان الغامدي
              </button>
              <button
                onClick={() => setSelectedLeadIds([])}
                className="px-3 py-1.5 rounded-full text-[#707070] hover:text-[#141414] cursor-pointer"
              >
                إلغاء التحديد
              </button>
            </div>
          </div>
        )}
      </div>

      {/* KANBAN PIPELINE VIEW MODE */}
      {viewMode === 'kanban' && subTab === 'test_drives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            { status: 'new' as const, title: '1. طلبات جديدة (New)' },
            { status: 'contacted' as const, title: '2. تم التواصل (Contacted)' },
            { status: 'confirmed' as const, title: '3. موعد مؤكد (Confirmed)' },
            { status: 'completed' as const, title: '4. تمت التجربة (Completed)' }
          ]).map((col) => {
            const colItems = filteredTestDrives.filter(td => td.status === col.status);
            const nextStatusMap: Record<string, TestDriveLead['status'] | null> = {
              new: 'contacted',
              contacted: 'confirmed',
              confirmed: 'completed',
              completed: null
            };
            const nextSt = nextStatusMap[col.status];

            return (
              <div key={col.status} className="bg-[#f3f3f3] rounded-[24px] p-4 space-y-3 flex flex-col">
                <div className="flex items-center justify-between px-1">
                  <h4 className="mobbin-heading text-xs text-[#141414]">{col.title}</h4>
                  <span className={col.status === 'new' && colItems.length > 0 ? 'mobbin-badge-popular px-2.5 py-0.5 font-mono' : 'px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#141414] text-[11px] font-mono font-semibold'}>
                    {colItems.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {colItems.length === 0 ? (
                    <div className="p-6 rounded-[16px] bg-[#ffffff]/60 text-center text-[11px] text-[#adadad]">
                      لا توجد بطاقات في هذه المرحلة
                    </div>
                  ) : (
                    colItems.map(td => (
                      <div key={td.id} className="bg-[#ffffff] rounded-[16px] p-4 border border-[#e0e0e0] space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#141414] text-sm">{td.fullName}</strong>
                          <span className="font-mono text-[10px] text-[#707070]">{td.id}</span>
                        </div>
                        <div className="text-[#141414] font-semibold">{td.modelName}</div>
                        <div className="text-[11px] text-[#707070]">{td.preferredShowroom} • {td.preferredDate}</div>
                        <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
                          <a
                            href={`tel:${td.phone}`}
                            className="p-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414]"
                            title={td.phone}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          {nextSt && (
                            <button
                              onClick={() => updateTestDriveStatus(td.id, nextSt)}
                              className="mobbin-ink-pill px-3 py-1 rounded-full bg-[#141414] text-[#ffffff] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <span>نقل للمرحلة التالية</span>
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'kanban' && subTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            { status: 'pending' as const, title: '1. بانتظار التأكيد' },
            { status: 'in_progress' as const, title: '2. قيد الفحص بالورشة' },
            { status: 'completed' as const, title: '3. مكتمل وتم التسليم' }
          ]).map(col => {
            const colItems = filteredServices.filter(s => s.status === col.status);
            return (
              <div key={col.status} className="bg-[#f3f3f3] rounded-[24px] p-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h4 className="mobbin-heading text-xs text-[#141414]">{col.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#141414] text-[11px] font-mono font-semibold">{colItems.length}</span>
                </div>
                <div className="space-y-2.5">
                  {colItems.map(srv => (
                    <div key={srv.id} className="bg-[#ffffff] rounded-[16px] p-4 border border-[#e0e0e0] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#141414]">{srv.fullName}</strong>
                        <span className="font-mono font-semibold text-[#141414]">{formatPrice(srv.estimatedCost)} ر.س</span>
                      </div>
                      <div className="text-[#707070]">{srv.vehicleModel} ({srv.plateNumber})</div>
                      <div className="text-[11px] text-[#707070]">{srv.serviceType}</div>
                      <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#707070]">{srv.preferredDate}</span>
                        <button
                          onClick={() => {
                            const created = convertServiceToJobCard(srv.id);
                            if (created && onNavigateTab) onNavigateTab('workshop');
                          }}
                          className="mobbin-ink-pill px-3 py-1 rounded-full bg-[#141414] text-[#ffffff] text-[11px] font-semibold cursor-pointer"
                        >
                          فتح كرت عمل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'kanban' && subTab === 'quotations' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {([
            { status: 'draft' as const, title: '1. مسودة' },
            { status: 'sent' as const, title: '2. تم الإرسال للعميل' },
            { status: 'approved' as const, title: '3. موافق عليه' },
            { status: 'deal_closed' as const, title: '4. تم إبرام العقد والفوترة' }
          ]).map(col => {
            const colItems = filteredQuotations.filter(q => q.status === col.status);
            return (
              <div key={col.status} className="bg-[#f3f3f3] rounded-[24px] p-4 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h4 className="mobbin-heading text-xs text-[#141414]">{col.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffffff] text-[#141414] text-[11px] font-mono font-semibold">{colItems.length}</span>
                </div>
                <div className="space-y-2.5">
                  {colItems.map(q => (
                    <div key={q.id} className="bg-[#ffffff] rounded-[16px] p-4 border border-[#e0e0e0] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-[#707070]">{q.quotationNumber}</span>
                        <strong className="font-mono text-[#141414]">{formatPrice(q.totalWithVat)} ر.س</strong>
                      </div>
                      <div className="font-semibold text-[#141414]">{q.fullName}</div>
                      <div className="text-[11px] text-[#707070]">{q.vehicleName} • {q.gradeName}</div>
                      <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                        <button
                          onClick={() => setPreviewQuotation(q)}
                          className="px-2.5 py-1 rounded-full bg-[#f3f3f3] text-[#141414] text-[11px] font-semibold cursor-pointer"
                        >
                          معاينة
                        </button>
                        <button
                          onClick={() => {
                            const inv = convertQuotationToInvoice(q.id);
                            if (inv && onNavigateTab) onNavigateTab('zatca');
                          }}
                          className="mobbin-ink-pill px-3 py-1 rounded-full bg-[#141414] text-[#ffffff] text-[11px] font-semibold cursor-pointer"
                        >
                          إصدار فاتورة ZATCA
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. TABLE VIEW MODE — SUB-TAB 1: Test Drives Table */}
      {viewMode === 'table' && subTab === 'test_drives' && (
        <div className="bg-[#ffffff] rounded-[24px] border border-[#f0f0f0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-center w-10">
                    <input
                      type="checkbox"
                      checked={filteredTestDrives.length > 0 && selectedLeadIds.length === filteredTestDrives.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeadIds(filteredTestDrives.map(td => td.id));
                        } else {
                          setSelectedLeadIds([]);
                        }
                      }}
                      className="w-4 h-4 accent-[#141414] cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'السيارة وصالة العرض' : 'Vehicle & Showroom'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'الموعد والملاحظات' : 'Preferred Slot & Notes'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'حالة الطلب' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات والتواصل' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestDrives.map((td) => (
                  <tr key={td.id}>
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedLeadIds.includes(td.id)}
                        onChange={() => toggleLeadSelection(td.id)}
                        className="w-4 h-4 accent-[#141414] cursor-pointer"
                      />
                    </td>
                    {/* Customer Info */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#141414] text-sm">{td.fullName}</span>
                          {td.status === 'new' && <span className="mobbin-badge-popular px-2 py-0.5 text-[10px]">جديد</span>}
                        </div>
                        <span className="text-[11px] text-[#707070] font-mono block">{td.phone}</span>
                        {td.assignedAdvisor && (
                          <span className="text-[10px] text-[#707070] block">المستشار: {td.assignedAdvisor}</span>
                        )}
                      </div>
                    </td>

                    {/* Vehicle & Showroom */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-[#141414] block">{td.modelName}</span>
                        <span className="text-xs text-[#707070] flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {td.preferredShowroom} ({td.city})
                        </span>
                      </div>
                    </td>

                    {/* Preferred Slot & Notes */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5 font-mono">
                        <div className="flex items-center gap-1 font-semibold text-[#141414]">
                          <Calendar className="w-3 h-3" />
                          <span>{td.preferredDate}</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-[11px] text-[#707070]">{td.preferredTimeSlot}</span>
                        </div>
                        <input
                          type="text"
                          value={td.notes || ''}
                          placeholder="إضافة ملاحظة مستشار المبيعات..."
                          onChange={(e) => updateTestDrive(td.id, { notes: e.target.value })}
                          className="w-full text-[11px] !py-1.5 !px-3"
                        />
                      </div>
                    </td>

                    {/* Status Selector */}
                    <td className="py-4 px-4 text-center">
                      <select
                        value={td.status}
                        onChange={(e) => updateTestDriveStatus(td.id, e.target.value as any)}
                        className="text-xs font-semibold cursor-pointer"
                      >
                        <option value="new">جديد</option>
                        <option value="contacted">تم التواصل</option>
                        <option value="confirmed">موعد مؤكد</option>
                        <option value="completed">تمت التجربة</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                    {/* Contact Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`tel:${td.phone}`}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414] transition-colors cursor-pointer"
                          title="اتصال هاتفي"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/966${td.phone.replace(/^0/, '')}?text=${encodeURIComponent(`مرحباً ${td.fullName}، نتواصل معك من شركة سولينا للسيارات بخصوص تأكيد موعد تجربة قيادة ${td.modelName} في ${td.preferredShowroom}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414] transition-colors cursor-pointer"
                          title="محادثة واتساب"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا السجل؟')) deleteTestDrive(td.id);
                          }}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#707070] transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TABLE VIEW MODE — SUB-TAB 2: Service Bookings Table */}
      {viewMode === 'table' && subTab === 'services' && (
        <div className="bg-[#ffffff] rounded-[24px] border border-[#f0f0f0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-start">{language === 'ar' ? 'العميل والمركبة' : 'Customer & Vehicle'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'نوع الصيانة والعداد' : 'Service Package & Mileage'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'الموعد والفني المسؤول' : 'Date & Technician'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'التكلفة التقديرية' : 'Est. Cost'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'حالة الحجز' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات والتحويل للورشة' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((srv) => (
                  <tr key={srv.id}>
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-[#141414] text-sm block">{srv.fullName}</span>
                        <span className="text-[11px] text-[#707070] font-mono block">{srv.phone}</span>
                        <span className="text-xs font-semibold text-[#141414] block">{srv.vehicleModel}</span>
                        <span className="text-[10px] text-[#707070] font-mono">لوحة: {srv.plateNumber}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="font-semibold text-[#141414] block">{srv.serviceType}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#707070] font-mono text-[10px]">
                          العداد: {formatPrice(srv.currentMileage)} كم
                        </span>
                        {srv.jobCardId && (
                          <span className="mobbin-badge-popular inline-flex items-center mr-1 px-2.5 py-0.5 font-mono text-[10px]">
                            كرت عمل: {srv.jobCardId}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1 font-mono">
                        <div className="flex items-center gap-1 font-semibold text-[#141414]">
                          <Calendar className="w-3 h-3" />
                          <span>{srv.preferredDate} ({srv.preferredTime})</span>
                        </div>
                        <div className="text-[11px] text-[#707070]">{srv.showroom}</div>
                        <select
                          value={srv.assignedTechnician || 'م. أحمد الشريف'}
                          onChange={(e) => updateServiceAppointment(srv.id, { assignedTechnician: e.target.value })}
                          className="text-[11px] !py-1 !px-2.5"
                        >
                          <option value="م. أحمد الشريف">الفني: م. أحمد الشريف</option>
                          <option value="م. خالد السبيعي">الفني: م. خالد السبيعي</option>
                          <option value="م. يوسف القحطاني">الفني: م. يوسف القحطاني</option>
                          <option value="م. أحمد المصري">الفني: م. أحمد المصري</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-[#141414] text-sm">
                      {formatPrice(srv.estimatedCost)} ر.س
                    </td>

                    <td className="py-4 px-4 text-center">
                      <select
                        value={srv.status}
                        onChange={(e) => updateServiceStatus(srv.id, e.target.value as any)}
                        className="text-xs font-semibold cursor-pointer"
                      >
                        <option value="pending">بانتظار التأكيد</option>
                        <option value="in_progress">جاري الفحص بالورشة</option>
                        <option value="completed">تم استلام السيارة</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            const created = convertServiceToJobCard(srv.id);
                            if (created && onNavigateTab) {
                              onNavigateTab('workshop');
                            }
                          }}
                          className="mobbin-ink-pill px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                          title="تحويل الحجز إلى أمر عمل بالورشة"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>فتح كرت عمل</span>
                        </button>

                        <a
                          href={`tel:${srv.phone}`}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414] transition-colors cursor-pointer"
                          title="اتصال هاتفي"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) deleteServiceAppointment(srv.id);
                          }}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#707070] transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TABLE VIEW MODE — SUB-TAB 3: Quotations Table */}
      {viewMode === 'table' && subTab === 'quotations' && (
        <div className="bg-[#ffffff] rounded-[24px] border border-[#f0f0f0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-start">{language === 'ar' ? 'رقم العرض والعميل' : 'Quote # & Customer'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'السيارة والفئة' : 'Vehicle & Trim'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'نوع التمويل والقسط' : 'Finance & Monthly'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'إجمالي السعر (شامل الضريبة)' : 'Total incl. 15% VAT'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات والفوترة' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotations.map((q) => (
                  <tr key={q.id}>
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className="font-mono font-semibold text-[#707070] text-xs block">{q.quotationNumber}</span>
                        <span className="font-semibold text-[#141414] text-sm block">{q.fullName}</span>
                        <span className="text-[11px] text-[#707070] font-mono block">{q.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-[#141414] block">{q.vehicleName}</span>
                        <span className="text-xs text-[#707070]">{q.gradeName}</span>
                        {q.invoiceId && (
                          <span className="mobbin-badge-popular inline-flex items-center px-2.5 py-0.5 font-mono text-[10px]">
                            فاتورة: {q.invoiceId}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414]">
                          {q.financeType === 'lease' ? 'تمويل تأجيري' : 'شراء نقدي كاش'}
                        </span>
                        {q.monthlyInstallment && (
                          <span className="text-xs font-mono font-semibold text-[#141414] block mt-1">
                            {formatPrice(q.monthlyInstallment)} ر.س/شهر
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-[#141414] text-sm">
                      {formatPrice(q.totalWithVat)} ر.س
                    </td>

                    <td className="py-4 px-4 text-center">
                      <select
                        value={q.status}
                        onChange={(e) => updateQuotationStatus(q.id, e.target.value as any)}
                        className="text-xs font-semibold cursor-pointer"
                      >
                        <option value="draft">مسودة</option>
                        <option value="sent">تم الإرسال للعميل</option>
                        <option value="approved">موافق عليه مبدئياً</option>
                        <option value="deal_closed">تم إبرام العقد</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setPreviewQuotation(q)}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] text-[#141414] hover:text-[#ffffff] transition-colors cursor-pointer"
                          title="معاينة وطباعة عرض السعر"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            const inv = convertQuotationToInvoice(q.id);
                            if (inv && onNavigateTab) {
                              onNavigateTab('zatca');
                            }
                          }}
                          className="mobbin-ink-pill px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                          title="إصدار فاتورة ضريبية ZATCA من عرض السعر"
                        >
                          <QrCode className="w-3 h-3" />
                          <span>إصدار فاتورة ZATCA</span>
                        </button>

                        <a
                          href={`tel:${q.phone}`}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#141414] transition-colors cursor-pointer"
                          title="اتصال هاتفي"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف عرض السعر؟')) deleteQuotation(q.id);
                          }}
                          className="p-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-[#ffffff] text-[#707070] transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Add New Walk-in / Phone Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-[#141414]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateManualLead} className="mobbin-modal-card w-full max-w-lg p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <h3 className="mobbin-heading text-sm md:text-base text-[#141414]">
                {subTab === 'test_drives' && 'تسجيل طلب تجربة قيادة جديد — صالة سولينا.'}
                {subTab === 'services' && 'حجز موعد صيانة سريعة 45 دقيقة.'}
                {subTab === 'quotations' && 'إصدار عرض سعر وتمويل جديد.'}
              </h3>
              <button type="button" onClick={() => setShowAddLeadModal(false)} className="p-1.5 rounded-full bg-[#f3f3f3] text-[#141414] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">اسم العميل الكامل *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="مثال: سلطان بن محمد العتيبي"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">رقم الجوال *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">المدينة</label>
                  <select
                    value={leadForm.city}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام والخبر">الدمام والخبر</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">الفرع / صالة سولينا</label>
                  <select
                    value={leadForm.showroom}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, showroom: e.target.value }))}
                    className="w-full"
                  >
                    {showrooms.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.city})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#141414] block mb-1">طراز السيارة</label>
                <select
                  value={leadForm.modelName}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, modelName: e.target.value }))}
                  className="w-full"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.nameAr}>{v.nameAr} ({formatPrice(v.priceStartingFrom)} ر.س)</option>
                  ))}
                </select>
              </div>

              {subTab === 'services' && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-[#141414] block mb-1">رقم اللوحة:</label>
                    <input
                      type="text"
                      value={leadForm.plateNumber}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, plateNumber: e.target.value }))}
                      className="w-full font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#141414] block mb-1">العداد (كم):</label>
                    <input
                      type="number"
                      value={leadForm.mileage}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, mileage: Number(e.target.value) }))}
                      className="w-full font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#141414] block mb-1">التكلفة (ر.س):</label>
                    <input
                      type="number"
                      value={leadForm.cost}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, cost: Number(e.target.value) }))}
                      className="w-full font-mono font-semibold"
                    />
                  </div>
                </div>
              )}

              {subTab === 'quotations' && (
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">نوع الشراء / التمويل:</label>
                  <select
                    value={leadForm.financeType}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, financeType: e.target.value as any }))}
                    className="w-full"
                  >
                    <option value="lease">تمويل تأجيري (5 سنوات)</option>
                    <option value="cash">شراء نقدي مباشر (كاش)</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">التاريخ:</label>
                  <input
                    type="date"
                    value={leadForm.date}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#141414] block mb-1">الفترة الزمنية:</label>
                  <select
                    value={leadForm.timeSlot}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full"
                  >
                    <option>10:00 ص - 12:00 م</option>
                    <option>04:00 م - 06:00 م</option>
                    <option>07:00 م - 09:00 م</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="mobbin-ink-pill flex-1 py-3 bg-[#141414] hover:bg-[#262626] text-[#ffffff] font-semibold rounded-full cursor-pointer">
                حفظ واعتماد الطلب
              </button>
              <button type="button" onClick={() => setShowAddLeadModal(false)} className="px-5 py-3 bg-[#f3f3f3] rounded-full font-semibold text-[#141414] cursor-pointer">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Quotation Preview & Print Modal */}
      {previewQuotation && (
        <div className="fixed inset-0 z-50 bg-[#141414]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="mobbin-modal-card w-full max-w-xl p-6 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <div className="flex items-center gap-2.5">
                <img src="/solina-logo.png" alt="سولينا" className="h-8 w-auto" />
                <div>
                  <h3 className="mobbin-heading text-[#141414] text-sm">عرض سعر رسمي — شركة سولينا للسيارات.</h3>
                  <span className="text-[10px] text-[#707070] font-mono">{previewQuotation.quotationNumber}</span>
                </div>
              </div>
              <button onClick={() => setPreviewQuotation(null)} className="p-1.5 rounded-full bg-[#f3f3f3] text-[#141414] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-[#f3f3f3] rounded-[16px]">
              <div>
                <span className="text-[#707070] block text-[10px]">اسم العميل:</span>
                <strong className="text-[#141414] text-sm">{previewQuotation.fullName}</strong>
              </div>
              <div>
                <span className="text-[#707070] block text-[10px]">رقم الجوال والمدينة:</span>
                <strong className="text-[#141414] font-mono">{previewQuotation.phone} — {previewQuotation.city}</strong>
              </div>
              <div>
                <span className="text-[#707070] block text-[10px]">السيارة والفئة:</span>
                <strong className="text-[#141414]">{previewQuotation.vehicleName} ({previewQuotation.gradeName})</strong>
              </div>
              <div>
                <span className="text-[#707070] block text-[10px]">نظام الدفع:</span>
                <strong className="text-[#141414]">{previewQuotation.financeType === 'lease' ? `تمويل تأجيري (${previewQuotation.bankName || 'مصرف الراجحي'})` : 'شراء نقدي مباشر'}</strong>
              </div>
            </div>

            <div className="p-4 rounded-[16px] border border-[#e0e0e0] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#707070]">السعر الأساسي قبل الضريبة:</span>
                <span className="font-mono font-semibold">{formatPrice(previewQuotation.vehiclePrice)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707070]">ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono font-semibold">{formatPrice(previewQuotation.vatAmount)} ر.س</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#f0f0f0] text-sm">
                <strong className="text-[#141414]">الإجمالي الشامل للضريبة:</strong>
                <strong className="font-mono font-semibold text-[#141414]">{formatPrice(previewQuotation.totalWithVat)} ر.س</strong>
              </div>
              {previewQuotation.monthlyInstallment && (
                <div className="flex justify-between pt-1 text-[#141414] font-semibold">
                  <span>القسط الشهري التقديري:</span>
                  <span className="font-mono">{formatPrice(previewQuotation.monthlyInstallment)} ر.س / شهرياً</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              {(['word', 'excel', 'xml', 'csv'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() =>
                    exportSingleDocument(
                      'عرض سعر رسمي — شركة سولينا للسيارات',
                      previewQuotation.quotationNumber,
                      [
                        ['اسم العميل', previewQuotation.fullName],
                        ['رقم الجوال والمدينة', `${previewQuotation.phone} — ${previewQuotation.city}`],
                        ['المركبة والفئة', `${previewQuotation.vehicleName} (${previewQuotation.gradeName})`],
                        ['نظام الدفع', previewQuotation.financeType === 'lease' ? `تمويل تأجيري (${previewQuotation.bankName || 'مصرف الراجحي'})` : 'شراء نقدي مباشر']
                      ],
                      ['البيان والمواصفات', 'السعر قبل الضريبة (ر.س)', 'ضريبة 15% (ر.س)', 'الإجمالي الشامل (ر.س)', 'القسط الشهري (ر.س)'],
                      [[
                        `${previewQuotation.vehicleName} — ${previewQuotation.gradeName}`,
                        formatPrice(previewQuotation.vehiclePrice),
                        formatPrice(previewQuotation.vatAmount),
                        formatPrice(previewQuotation.totalWithVat),
                        previewQuotation.monthlyInstallment ? formatPrice(previewQuotation.monthlyInstallment) : '-'
                      ]],
                      fmt
                    )
                  }
                  className="px-3 py-2 bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[11px] font-bold rounded-full cursor-pointer transition-colors"
                >
                  {fmt === 'word' ? 'Word .DOC' : fmt === 'excel' ? 'Excel .XLS' : fmt.toUpperCase()}
                </button>
              ))}
              <button
                onClick={() =>
                  exportSingleDocument(
                    'عرض سعر رسمي — شركة سولينا للسيارات',
                    previewQuotation.quotationNumber,
                    [
                      ['اسم العميل', previewQuotation.fullName],
                      ['رقم الجوال والمدينة', `${previewQuotation.phone} — ${previewQuotation.city}`],
                      ['المركبة والفئة', `${previewQuotation.vehicleName} (${previewQuotation.gradeName})`],
                      ['نظام الدفع', previewQuotation.financeType === 'lease' ? `تمويل تأجيري (${previewQuotation.bankName || 'مصرف الراجحي'})` : 'شراء نقدي مباشر']
                    ],
                    ['البيان والمواصفات', 'السعر قبل الضريبة (ر.س)', 'ضريبة 15% (ر.س)', 'الإجمالي الشامل (ر.س)', 'القسط الشهري (ر.س)'],
                    [[
                      `${previewQuotation.vehicleName} — ${previewQuotation.gradeName}`,
                      formatPrice(previewQuotation.vehiclePrice),
                      formatPrice(previewQuotation.vatAmount),
                      formatPrice(previewQuotation.totalWithVat),
                      previewQuotation.monthlyInstallment ? formatPrice(previewQuotation.monthlyInstallment) : '-'
                    ]],
                    'pdf_print'
                  )
                }
                className="px-4 py-2 bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] font-semibold rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة العرض PDF</span>
              </button>
              <button
                onClick={() => {
                  const inv = convertQuotationToInvoice(previewQuotation.id);
                  setPreviewQuotation(null);
                  if (inv && onNavigateTab) onNavigateTab('zatca');
                }}
                className="mobbin-ink-pill px-4 py-2 bg-[#141414] hover:bg-[#262626] text-[#ffffff] font-semibold rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>اعتماد وإصدار فاتورة ZATCA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
