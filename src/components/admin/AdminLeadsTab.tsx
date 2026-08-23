import React, { useState } from 'react';
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
  CheckCircle2, 
  AlertCircle,
  Building2,
  ExternalLink,
  ChevronDown,
  Download
} from 'lucide-react';
import { useAdminData, TestDriveLead, ServiceAppointmentLead, QuotationRecord } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';

interface AdminLeadsTabProps {
  initialSubTab?: 'test_drives' | 'services' | 'quotations';
}

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({ initialSubTab = 'test_drives' }) => {
  const { 
    testDrives, 
    updateTestDriveStatus, 
    deleteTestDrive,
    serviceAppointments,
    updateServiceStatus,
    deleteServiceAppointment,
    quotations,
    updateQuotationStatus,
    deleteQuotation,
    exportDataToCSV
  } = useAdminData();

  const { language, formatPrice } = useLanguage();
  const [subTab, setSubTab] = useState<'test_drives' | 'services' | 'quotations'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Sub-Tab Switcher Navigation */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { setSubTab('test_drives'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'test_drives'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === 'ar' ? 'طلبات تجارب القيادة' : 'Test Drive Leads'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">{testDrives.length}</span>
          </button>

          <button
            onClick={() => { setSubTab('services'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'services'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{language === 'ar' ? 'حجوزات الصيانة السريعة' : 'Service Appointments'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">{serviceAppointments.length}</span>
          </button>

          <button
            onClick={() => { setSubTab('quotations'); setStatusFilter('all'); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'quotations'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{language === 'ar' ? 'عروض الأسعار والتمويل' : 'Quotations & Finance'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">{quotations.length}</span>
          </button>
        </div>

        {/* Search & Status Filter & Export Button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'بحث بالاسم أو الجوال...' : 'Search name or phone...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2 pr-9 pl-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2 px-3 font-medium outline-none cursor-pointer"
          >
            <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="new">{language === 'ar' ? 'جديد (New)' : 'New'}</option>
            <option value="pending">{language === 'ar' ? 'معلق (Pending)' : 'Pending'}</option>
            <option value="contacted">{language === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
            <option value="confirmed">{language === 'ar' ? 'مؤكد (Confirmed)' : 'Confirmed'}</option>
            <option value="completed">{language === 'ar' ? 'مكتمل (Completed)' : 'Completed'}</option>
          </select>

          <button
            onClick={() => exportDataToCSV(subTab)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
            title="تصدير ملف CSV"
          >
            <Download className="w-3.5 h-3.5 text-red-400" />
            <span>{language === 'ar' ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB 1: Test Drives Table */}
      {subTab === 'test_drives' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'السيارة وصالة العرض' : 'Vehicle & Showroom'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'الموعد المفضل' : 'Preferred Slot'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'حالة الطلب' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات والتواصل' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testDrives
                  .filter(td => {
                    const matchQ = td.fullName.includes(searchQuery) || td.phone.includes(searchQuery) || td.modelName.includes(searchQuery);
                    const matchS = statusFilter === 'all' || td.status === statusFilter;
                    return matchQ && matchS;
                  })
                  .map((td) => (
                    <tr key={td.id} className="hover:bg-blue-50/20 transition-colors">
                      {/* Customer Info */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 text-sm block">{td.fullName}</span>
                          <span className="text-[11px] text-gray-500 font-mono block">{td.phone}</span>
                          {td.nationalIdOrIqama && (
                            <span className="text-[10px] text-gray-400 font-mono">هوية: {td.nationalIdOrIqama}</span>
                          )}
                        </div>
                      </td>

                      {/* Vehicle & Showroom */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 block">{td.modelName}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            {td.preferredShowroom} ({td.city})
                          </span>
                        </div>
                      </td>

                      {/* Preferred Slot */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 font-mono text-gray-700">
                          <div className="flex items-center gap-1 font-semibold">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span>{td.preferredDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{td.preferredTimeSlot}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={td.status}
                          onChange={(e) => updateTestDriveStatus(td.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                            td.status === 'new' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            td.status === 'contacted' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            td.status === 'confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            td.status === 'completed' ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <option value="new">جديد (New)</option>
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
                            className="p-2 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 transition-colors shadow-sm cursor-pointer"
                            title="اتصال هاتفي"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/966${td.phone.replace(/^0/, '')}?text=${encodeURIComponent(`مرحباً ${td.fullName}، نتواصل معك من تويوتا عبد اللطيف جميل بخصوص طلب تجربة قيادة ${td.modelName}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 transition-colors shadow-sm cursor-pointer"
                            title="محادثة واتساب"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => {
                              if (confirm('هل أنت متأكد من حذف هذا السجل؟')) deleteTestDrive(td.id);
                            }}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 transition-colors cursor-pointer"
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

      {/* 3. SUB-TAB 2: Service Bookings Table */}
      {subTab === 'services' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-start">{language === 'ar' ? 'العميل والمركبة' : 'Customer & Vehicle'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'نوع الصيانة والعداد' : 'Service Package & Mileage'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'الموعد والفرع' : 'Date & Showroom'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'التكلفة التقديرية' : 'Est. Cost'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'حالة الحجز' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {serviceAppointments
                  .filter(srv => {
                    const matchQ = srv.fullName.includes(searchQuery) || srv.phone.includes(searchQuery) || srv.plateNumber.includes(searchQuery);
                    const matchS = statusFilter === 'all' || srv.status === statusFilter;
                    return matchQ && matchS;
                  })
                  .map((srv) => (
                    <tr key={srv.id} className="hover:bg-emerald-50/20 transition-colors">
                      {/* Customer & Vehicle */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 text-sm block">{srv.fullName}</span>
                          <span className="text-[11px] text-gray-500 font-mono block">{srv.phone}</span>
                          <span className="text-xs font-bold text-emerald-800 block">{srv.vehicleModel}</span>
                          <span className="text-[10px] text-gray-400 font-mono">لوحة: {srv.plateNumber}</span>
                        </div>
                      </td>

                      {/* Service Package */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-900 block">{srv.serviceType}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-mono text-[10px]">
                            العداد: {formatPrice(srv.currentMileage)} كم
                          </span>
                        </div>
                      </td>

                      {/* Date & Location */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-gray-700 font-mono">
                          <div className="flex items-center gap-1 font-semibold">
                            <Calendar className="w-3 h-3 text-emerald-600" />
                            <span>{srv.preferredDate}</span>
                          </div>
                          <div className="text-[11px] text-gray-500">{srv.preferredTime}</div>
                          <div className="text-[10px] text-gray-400">{srv.showroom}</div>
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="py-4 px-4 font-mono font-bold text-gray-900 text-sm">
                        {formatPrice(srv.estimatedCost)} ر.س
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={srv.status}
                          onChange={(e) => updateServiceStatus(srv.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                            srv.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            srv.status === 'in_progress' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            srv.status === 'completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <option value="pending">بانتظار التأكيد</option>
                          <option value="in_progress">جاري الفحص بالورشة</option>
                          <option value="completed">تم استلام السيارة</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                      </td>

                      {/* Contact Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`tel:${srv.phone}`}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700 transition-colors shadow-sm cursor-pointer"
                            title="اتصال هاتفي"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => {
                              if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) deleteServiceAppointment(srv.id);
                            }}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 transition-colors cursor-pointer"
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

      {/* 4. SUB-TAB 3: Quotations Table */}
      {subTab === 'quotations' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 text-start">{language === 'ar' ? 'رقم العرض والعميل' : 'Quote # & Customer'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'السيارة والفئة' : 'Vehicle & Trim'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'نوع التمويل والقسط' : 'Finance & Monthly'}</th>
                  <th className="py-4 px-4 text-start">{language === 'ar' ? 'إجمالي السعر (شامل الضريبة)' : 'Total incl. 15% VAT'}</th>
                  <th className="py-4 px-4 text-center">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotations
                  .filter(q => {
                    const matchQ = q.fullName.includes(searchQuery) || q.phone.includes(searchQuery) || q.quotationNumber.includes(searchQuery);
                    const matchS = statusFilter === 'all' || q.status === statusFilter;
                    return matchQ && matchS;
                  })
                  .map((q) => (
                    <tr key={q.id} className="hover:bg-purple-50/20 transition-colors">
                      {/* Quote Number & Customer */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-purple-700 text-xs block">{q.quotationNumber}</span>
                          <span className="font-bold text-gray-900 text-sm block">{q.fullName}</span>
                          <span className="text-[11px] text-gray-500 font-mono block">{q.phone}</span>
                        </div>
                      </td>

                      {/* Vehicle & Grade */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 block">{q.vehicleName}</span>
                          <span className="text-xs text-gray-500 font-medium">{q.gradeName}</span>
                        </div>
                      </td>

                      {/* Finance & Monthly */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            q.financeType === 'lease' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {q.financeType === 'lease' ? 'تمويل تأجيري' : 'شراء نقدي كاش'}
                          </span>
                          {q.monthlyInstallment && (
                            <span className="text-xs font-mono font-bold text-red-600 block">
                              {formatPrice(q.monthlyInstallment)} ر.س/شهر
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Total with VAT */}
                      <td className="py-4 px-4 font-mono font-bold text-gray-900 text-sm">
                        {formatPrice(q.totalWithVat)} ر.س
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuotationStatus(q.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                            q.status === 'draft' ? 'bg-gray-100 text-gray-800 border-gray-300' :
                            q.status === 'sent' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            q.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-purple-50 text-purple-800 border-purple-200'
                          }`}
                        >
                          <option value="draft">مسودة</option>
                          <option value="sent">تم الإرسال للعميل</option>
                          <option value="approved">موافق عليه مبدئياً</option>
                          <option value="deal_closed">تم إبرام العقد</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={`tel:${q.phone}`}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-700 transition-colors shadow-sm cursor-pointer"
                            title="اتصال هاتفي"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => {
                              if (confirm('هل أنت متأكد من حذف هذا العرض؟')) deleteQuotation(q.id);
                            }}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 transition-colors cursor-pointer"
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

    </div>
  );
};
