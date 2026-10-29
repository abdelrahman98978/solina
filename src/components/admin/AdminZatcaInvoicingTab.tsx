import React, { useState } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  Download, 
  Printer, 
  Plus, 
  Search, 
  ShieldCheck, 
  Trash2,
  Building2,
  UserCheck,
  X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminData, InvoiceItem } from '../../context/AdminDataContext';

export const AdminZatcaInvoicingTab: React.FC = () => {
  const { language } = useLanguage();
  const {
    zatcaInvoices,
    addZatcaInvoice,
    issueCreditNote,
    deleteZatcaInvoice,
    vinStock,
    vehicles,
    updateVinStock,
    createReceiptFromInvoice,
    exportSingleDocument,
    exportDataToCSV
  } = useAdminData();

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tax_invoice' | 'simplified_invoice' | 'credit_note'>('all');

  const [newInvoiceForm, setNewInvoiceForm] = useState({
    customerName: '',
    customerPhone: '',
    vatNumber: '310',
    vehicleModel: 'سولينا كامري 2026 هايبرد',
    vinNumber: '',
    selectedVinId: '',
    amount: 105450,
    type: 'simplified_invoice' as 'tax_invoice' | 'simplified_invoice'
  });

  const handleSelectVinFromStock = (vinId: string) => {
    if (!vinId) {
      setNewInvoiceForm(prev => ({ ...prev, selectedVinId: '' }));
      return;
    }
    const found = vinStock.find(v => v.id === vinId);
    if (found) {
      setNewInvoiceForm(prev => ({
        ...prev,
        selectedVinId: found.id,
        vehicleModel: `${found.model} (${found.trim})`,
        vinNumber: found.vin,
        amount: found.price
      }));
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(newInvoiceForm.amount);
    const base = Number((total / 1.15).toFixed(2));
    const vat = Number((total - base).toFixed(2));
    const finalVin = newInvoiceForm.vinNumber || ('JT3' + Math.random().toString(36).substring(2, 12).toUpperCase());

    const created = addZatcaInvoice({
      customerName: newInvoiceForm.customerName || 'عميل نقدي متميز',
      customerPhone: newInvoiceForm.customerPhone || '0500000000',
      vatNumber: newInvoiceForm.type === 'tax_invoice' ? (newInvoiceForm.vatNumber || '310984729100003') : undefined,
      vehicleModel: newInvoiceForm.vehicleModel,
      vinNumber: finalVin,
      baseAmount: base,
      vatAmount: vat,
      totalAmount: total,
      type: newInvoiceForm.type,
      status: newInvoiceForm.type === 'tax_invoice' ? 'cleared' : 'reported'
    });

    if (newInvoiceForm.selectedVinId) {
      updateVinStock(newInvoiceForm.selectedVinId, { status: 'sold' });
    }

    setShowNewInvoiceModal(false);
    setSelectedInvoice(created);
    setNewInvoiceForm({
      customerName: '',
      customerPhone: '',
      vatNumber: '310',
      vehicleModel: 'سولينا كامري 2026 هايبرد',
      vinNumber: '',
      selectedVinId: '',
      amount: 105450,
      type: 'simplified_invoice'
    });
  };

  const filteredInvoices = zatcaInvoices.filter(inv => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.vinNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || inv.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Deterministic visual QR matrix generator from string seed
  const renderVisualQrMatrix = (seed: string) => {
    const size = 13;
    const cells: boolean[] = [];
    for (let i = 0; i < size * size; i++) {
      const charCode = seed.charCodeAt(i % seed.length) || 65;
      cells.push(((charCode + i * 7) % 3) !== 0);
    }
    return (
      <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-inner grid grid-cols-13 gap-0.5 shrink-0" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
        {cells.map((filled, idx) => {
          const row = Math.floor(idx / size);
          const col = idx % size;
          const isCorner = (row < 3 && col < 3) || (row < 3 && col >= size - 3) || (row >= size - 3 && col < 3);
          return (
            <div
              key={idx}
              className={`w-full h-full rounded-[1px] ${isCorner ? 'bg-[#141414]' : filled ? 'bg-[#141414]' : 'bg-white'}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 text-start font-arabic animate-in fade-in duration-300">
      {/* 1. Header & Summary KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center font-bold border border-[#e0e0e0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#141414]">
                {language === 'ar'
                  ? 'نظام سولينا للفوترة الضريبية الإلكترونية المعتمد (المرحلة الثانية)'
                  : 'Solina ZATCA E-Invoicing System (Phase 2)'}
              </h2>
              <p className="text-xs text-[#707070] mt-0.5">
                إصدار ومطابقة الفواتير الضريبية والمبسطة المتوافقة 100% مع هيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportDataToCSV('zatca_invoices')}
            className="px-3.5 py-2.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير سجل الفواتير (10 صيغ)</span>
          </button>
          {(['excel', 'word', 'xml', 'csv'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => exportDataToCSV('zatca_invoices', fmt)}
              className="px-3 py-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[11px] font-bold uppercase cursor-pointer transition-colors"
            >
              {fmt === 'excel' ? 'XLS' : fmt === 'word' ? 'DOC' : fmt.toUpperCase()}
            </button>
          ))}

          <button
            onClick={() => setShowNewInvoiceModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#141414] hover:bg-black active:scale-95 text-white text-xs font-bold shadow-none  flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إصدار فاتورة ضريبية جديدة</span>
          </button>
        </div>
      </div>

      {/* 2. ZATCA Compliance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">إجمالي الفواتير الصادرة</span>
          <div className="text-xl font-black text-[#141414]">{zatcaInvoices.length} فاتورة</div>
          <span className="text-[10px] text-[#141414] font-bold flex items-center gap-1">مطابقة للربط الضريبي المباشر</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">إجمالي المبيعات المفوترة (شامل الضريبة)</span>
          <div className="text-xl font-black text-[#141414] font-mono">
            {zatcaInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-[#adadad] font-medium">مبيعات وصيانة سولينا للسيارات</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">ضريبة القيمة المضافة المحصلة (15%)</span>
          <div className="text-xl font-black text-[#141414] font-mono">
            {zatcaInvoices.reduce((acc, curr) => acc + curr.vatAmount, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-[#141414] font-bold">جاهزة للإقرار الضريبي الآلي</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">حالة الربط والاعتماد الضريبي</span>
          <div className="text-base font-black text-[#141414] flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#141414] animate-pulse" />
            <span>متصل بنجاح 100%</span>
          </div>
          <span className="text-[10px] text-[#adadad] font-mono">الرقم الضريبي: 310984729100003</span>
        </div>
      </div>

      {/* 2.5 VAT Return Summary Bar (ملخص الإقرار الضريبي 15%) */}
      <div className="bg-[#f3f3f3] p-5 rounded-3xl border border-[#e0e0e0] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="mobbin-badge-popular px-2.5 py-0.5 text-[11px]">الإقرار الضريبي المعتمد</span>
            <h3 className="text-sm font-black text-[#141414]">ملخص الإقرار الضريبي الموحد لضريبة القيمة المضافة (15%).</h3>
          </div>
          <p className="text-[11px] text-[#595959] mt-0.5 font-light">
            يُحتسب صافي الضريبة المستحقة تلقائياً بعد خصم الإشعارات الدائنة والمرتجعات المعتمدة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#e0e0e0]">
            <span className="text-[10px] text-[#707070] block">المبيعات الخاضعة (قبل الضريبة)</span>
            <strong className="font-mono font-bold text-[#141414]">
              {zatcaInvoices.filter(i => i.totalAmount > 0).reduce((a, b) => a + b.baseAmount, 0).toLocaleString('ar-SA')} ر.س
            </strong>
          </div>
          <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#e0e0e0]">
            <span className="text-[10px] text-[#707070] block">ضريبة المخرجات (15%)</span>
            <strong className="font-mono font-bold text-[#141414]">
              {zatcaInvoices.filter(i => i.totalAmount > 0).reduce((a, b) => a + b.vatAmount, 0).toLocaleString('ar-SA')} ر.س
            </strong>
          </div>
          <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#e0e0e0]">
            <span className="text-[10px] text-[#707070] block">الإشعارات الدائنة (المرتجعات)</span>
            <strong className="font-mono font-bold text-[#141414]">
              {Math.abs(zatcaInvoices.filter(i => i.totalAmount < 0).reduce((a, b) => a + b.vatAmount, 0)).toLocaleString('ar-SA')} ر.س
            </strong>
          </div>
          <div className="bg-[#141414] text-white px-3.5 py-2.5 rounded-2xl">
            <span className="text-[10px] text-[#a0a0a0] block">صافي الضريبة المستحقة للسداد</span>
            <strong className="font-mono font-black text-white">
              {zatcaInvoices.reduce((a, b) => a + b.vatAmount, 0).toLocaleString('ar-SA')} ر.س
            </strong>
          </div>
        </div>
      </div>

      {/* 3. Search, Type Filter & Invoices Table */}
      <div className="bg-white rounded-3xl border border-[#e0e0e0] shadow-none overflow-hidden">
        <div className="p-4 border-b border-[#e0e0e0] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم الفاتورة، اسم العميل، الطراز، أو رقم الشاسيه VIN..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-[#f3f3f3] border border-[#e0e0e0] text-xs font-medium text-[#141414] placeholder-gray-400 focus:outline-none focus:border-[#141414]"
            />
            <Search className="w-4 h-4 text-[#adadad] absolute right-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `الكل (${zatcaInvoices.length})` },
              { id: 'tax_invoice', label: `ضريبية للشركات (${zatcaInvoices.filter(i => i.type === 'tax_invoice').length})` },
              { id: 'simplified_invoice', label: `مبسطة للأفراد (${zatcaInvoices.filter(i => i.type === 'simplified_invoice').length})` },
              { id: 'credit_note', label: `إشعارات دائنة (${zatcaInvoices.filter(i => i.type === 'credit_note').length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === tab.id
                    ? 'bg-[#141414] text-white shadow-none'
                    : 'bg-[#f0f0f0] text-[#707070] hover:bg-[#e0e0e0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#f3f3f3] text-[#707070] font-bold border-b border-[#e0e0e0]">
              <tr>
                <th className="p-3.5 text-start">رقم الفاتورة والنوع</th>
                <th className="p-3.5 text-start">اسم العميل / الرقم الضريبي</th>
                <th className="p-3.5 text-start">البيان (السيارة / الخدمة) ورقم VIN</th>
                <th className="p-3.5 text-start">المبلغ قبل الضريبة</th>
                <th className="p-3.5 text-start">ضريبة 15%</th>
                <th className="p-3.5 text-start">الإجمالي النهائي</th>
                <th className="p-3.5 text-start">حالة ZATCA</th>
                <th className="p-3.5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f3f3f3] transition-colors">
                  <td className="p-3.5">
                    <div className="font-mono font-bold text-[#141414]">{inv.invoiceNumber}</div>
                    <span className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded font-bold ${
                      inv.invoiceNumber.startsWith('SOL-CN-')
                        ? 'mobbin-badge-popular'
                        : inv.type === 'tax_invoice' ? 'bg-[#f3f3f3] text-[#141414]' : 'bg-[#f3f3f3] text-[#141414]'
                    }`}>
                      {inv.invoiceNumber.startsWith('SOL-CN-')
                        ? 'إشعار دائن / مرتجع ضريبي'
                        : inv.type === 'tax_invoice' ? 'فاتورة ضريبية (B2B)' : 'فاتورة ضريبية مبسطة (B2C)'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-[#141414]">{inv.customerName}</div>
                    <div className="text-[10px] text-[#adadad] font-mono">
                      {inv.vatNumber ? `الرقم الضريبي: ${inv.vatNumber}` : `هاتف: ${inv.customerPhone}`}
                    </div>
                  </td>
                  <td className="p-3.5 space-y-0.5">
                    <div className="font-bold text-[#141414]">{inv.vehicleModel}</div>
                    <span className="text-[10px] text-[#adadad] font-mono block">VIN: {inv.vinNumber}</span>
                  </td>
                  <td className="p-3.5 font-mono text-[#707070]">{inv.baseAmount.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3.5 font-mono font-bold text-[#707070]">{inv.vatAmount.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3.5 font-mono font-black text-[#141414]">{inv.totalAmount.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#f3f3f3] text-[#141414] text-[10px] font-bold border border-[#e0e0e0] flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>
                        {inv.status === 'refunded'
                          ? 'مستردة بإشعار دائن'
                          : inv.status === 'cleared'
                          ? 'معتمدة ضريبياً'
                          : 'مبلغة ضريبياً'}
                      </span>
                    </span>
                    <span className="text-[10px] text-[#adadad] font-mono block mt-1">{inv.date}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1.5 bg-[#141414] hover:bg-black text-white rounded-xl text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3" />
                        <span>معاينة QR</span>
                      </button>
                      {!inv.invoiceNumber.startsWith('SOL-CN-') && inv.totalAmount > 0 && (
                        <button
                          onClick={() => {
                            const vch = createReceiptFromInvoice(inv.id, 'bank_transfer');
                            if (vch) {
                              alert(`تم إصدار وترحيل سند القبض رقم ${vch.voucherNumber} بمبلغ ${vch.totalAmount.toLocaleString('ar-SA')} ر.س في النظام المحاسبي بنجاح.`);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[10px] font-bold transition-colors cursor-pointer"
                          title="إصدار سند قبض مالي مرتبط بالفاتورة"
                        >
                          سند قبض
                        </button>
                      )}
                      {!inv.invoiceNumber.startsWith('SOL-CN-') && inv.totalAmount > 0 && (
                        <button
                          onClick={() => {
                            if (confirm(`هل تريد إصدار إشعار دائن (Credit Note) للفاتورة ${inv.invoiceNumber}؟`)) {
                              const cn = issueCreditNote(inv.id);
                              if (cn) setSelectedInvoice(cn);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] text-[10px] font-bold transition-colors cursor-pointer"
                          title="إصدار إشعار دائن / مرتجع ZATCA"
                        >
                          إشعار دائن
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف الفاتورة ${inv.invoiceNumber}؟`)) {
                            deleteZatcaInvoice(inv.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-[#f0f0f0] hover:bg-red-600 hover:text-white text-[#adadad] transition-colors cursor-pointer"
                        title="حذف الفاتورة"
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

      {/* 4. Official ZATCA Tax Invoice Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-none space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Invoice Header */}
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#141414] p-2 rounded-xl">
                  <img src="/solina-logo.png" alt="سولينا" className="h-7 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#141414]">شركة سولينا للسيارات | Solina Motors Co.</h3>
                  <span className="text-[10px] text-[#707070] font-mono block">الرقم الضريبي الموحد (VATIN): 310984729100003</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-[10px] font-black">
                  {selectedInvoice.type === 'tax_invoice' ? 'فاتورة ضريبية معتمدة' : 'فاتورة ضريبية مبسطة'}
                </span>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] flex items-center justify-center text-[#707070] cursor-pointer"
                ><X className="w-4 h-4" strokeWidth={1.75} /></button>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#f3f3f3] rounded-2xl text-xs border border-[#e0e0e0]">
              <div>
                <span className="text-[#adadad] block text-[10px]">رقم الفاتورة الضريبية</span>
                <strong className="text-[#141414] font-mono">{selectedInvoice.invoiceNumber}</strong>
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">تاريخ ووقت الإصدار (ZATCA Timestamp)</span>
                <strong className="text-[#141414] font-mono">{selectedInvoice.date}</strong>
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">اسم العميل / المنشأة</span>
                <strong className="text-[#141414]">{selectedInvoice.customerName}</strong>
                {selectedInvoice.vatNumber && (
                  <span className="block text-[10px] font-mono text-[#141414] mt-0.5">
                    الرقم الضريبي للمشتري: {selectedInvoice.vatNumber}
                  </span>
                )}
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">المعرف الفريد الموحد (UUID)</span>
                <span className="text-[10px] font-mono text-[#707070] break-all">{selectedInvoice.uuid}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-[#e0e0e0] rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-start">
                <thead className="bg-[#f0f0f0] font-bold text-[#707070]">
                  <tr>
                    <th className="p-3 text-start">الوصف والمواصفات</th>
                    <th className="p-3 text-start">رقم الشاسيه / المرجع</th>
                    <th className="p-3 text-start">المبلغ الخاضع للضريبة</th>
                    <th className="p-3 text-start">الضريبة (15%)</th>
                    <th className="p-3 text-start">الإجمالي الشامل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#e0e0e0]">
                    <td className="p-3 font-bold text-[#141414]">{selectedInvoice.vehicleModel}</td>
                    <td className="p-3 font-mono text-[#707070]">{selectedInvoice.vinNumber}</td>
                    <td className="p-3 font-mono font-bold">{selectedInvoice.baseAmount.toLocaleString('ar-SA')} ريال</td>
                    <td className="p-3 font-mono font-bold text-[#707070]">{selectedInvoice.vatAmount.toLocaleString('ar-SA')} ريال</td>
                    <td className="p-3 font-mono font-black text-[#141414]">{selectedInvoice.totalAmount.toLocaleString('ar-SA')} ريال</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* QR Code & Total Summary Box */}
            <div className="p-5 bg-[#141414] rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {renderVisualQrMatrix(selectedInvoice.zatcaQrBase64 + selectedInvoice.invoiceNumber)}
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] text-white font-bold flex items-center gap-1">
                    رمز QR مشفر بنظام TLV Base64 المعتمد (Phase 2)
                  </span>
                  <span className="text-[10px] text-[#adadad] block">الختم المشفر: ECDSA secp256k1 Digital Signature</span>
                  <span className="text-[9px] text-[#adadad] block font-mono truncate max-w-[240px]">
                    TLV: {selectedInvoice.zatcaQrBase64}
                  </span>
                </div>
              </div>

              <div className="text-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <span className="text-[10px] text-[#adadad] block">المجموع الإجمالي المستحق</span>
                <strong className="text-2xl font-black text-white font-mono">
                  {selectedInvoice.totalAmount.toLocaleString('ar-SA')} ريال
                </strong>
                <span className="text-[10px] text-[#adadad] block">شامل ضريبة القيمة المضافة 15%</span>
              </div>
            </div>

            {/* Print / Download Bar (All Formats) */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              {(['word', 'excel', 'csv', 'json'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() =>
                    exportSingleDocument(
                      selectedInvoice.type === 'tax_invoice' ? 'فاتورة ضريبية معتمدة (ZATCA Phase 2)' : 'فاتورة ضريبية مبسطة (ZATCA)',
                      selectedInvoice.invoiceNumber,
                      [
                        ['تاريخ الإصدار', selectedInvoice.date],
                        ['المعرف الفريد UUID', selectedInvoice.uuid],
                        ['اسم العميل / المنشأة', selectedInvoice.customerName],
                        ['رقم الجوال / الضريبي', selectedInvoice.vatNumber || selectedInvoice.customerPhone]
                      ],
                      ['البيان والمواصفات', 'رقم الشاسيه VIN', 'المبلغ الخاضع (ر.س)', 'ضريبة 15% (ر.س)', 'الإجمالي الشامل (ر.س)'],
                      [[
                        selectedInvoice.vehicleModel,
                        selectedInvoice.vinNumber,
                        selectedInvoice.baseAmount.toLocaleString('ar-SA'),
                        selectedInvoice.vatAmount.toLocaleString('ar-SA'),
                        selectedInvoice.totalAmount.toLocaleString('ar-SA')
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
                    selectedInvoice.type === 'credit_note'
                      ? 'إشعار دائن ضريبي معتمد (ZATCA Credit Note)'
                      : selectedInvoice.type === 'tax_invoice'
                      ? 'فاتورة ضريبية معتمدة (ZATCA Phase 2)'
                      : 'فاتورة ضريبية مبسطة (ZATCA)',
                    selectedInvoice.invoiceNumber,
                    [
                      ['تاريخ الإصدار', selectedInvoice.date],
                      ['المعرف الفريد UUID', selectedInvoice.uuid],
                      ['اسم العميل / المنشأة', selectedInvoice.customerName],
                      ['رقم الجوال / الضريبي', selectedInvoice.vatNumber || selectedInvoice.customerPhone]
                    ],
                    ['البيان والمواصفات', 'رقم الشاسيه VIN', 'المبلغ الخاضع (ر.س)', 'ضريبة 15% (ر.س)', 'الإجمالي الشامل (ر.س)'],
                    [[
                      selectedInvoice.vehicleModel,
                      selectedInvoice.vinNumber,
                      selectedInvoice.baseAmount.toLocaleString('ar-SA'),
                      selectedInvoice.vatAmount.toLocaleString('ar-SA'),
                      selectedInvoice.totalAmount.toLocaleString('ar-SA')
                    ]],
                    'pdf_print'
                  )
                }
                className="px-4 py-2.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة الضريبية PDF</span>
              </button>
              <button
                onClick={() => {
                  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">\n  <ID>${selectedInvoice.invoiceNumber}</ID>\n  <UUID>${selectedInvoice.uuid}</UUID>\n  <IssueDate>${selectedInvoice.date}</IssueDate>\n  <Seller>شركة سولينا للسيارات - Solina Motors (310984729100003)</Seller>\n  <Customer>${selectedInvoice.customerName}</Customer>\n  <LineItem VIN="${selectedInvoice.vinNumber}">${selectedInvoice.vehicleModel}</LineItem>\n  <TaxExclusiveAmount currencyID="SAR">${selectedInvoice.baseAmount}</TaxExclusiveAmount>\n  <TaxAmount currencyID="SAR">${selectedInvoice.vatAmount}</TaxAmount>\n  <TaxInclusiveAmount currencyID="SAR">${selectedInvoice.totalAmount}</TaxInclusiveAmount>\n  <QRCodeTLV>${selectedInvoice.zatcaQrBase64}</QRCodeTLV>\n</Invoice>`;
                  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedInvoice.invoiceNumber}_ZATCA.xml`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2.5 bg-[#141414] hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-none"
              >
                <Download className="w-4 h-4" />
                <span>تحميل XML / PDF المعتمد</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. New Invoice Creation Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateInvoice} className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-none space-y-4 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-base font-black text-[#141414]">إصدار فاتورة ضريبية فورية (سولينا للسيارات)</h3>
              <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#707070] flex items-center justify-center cursor-pointer"><X className="w-4 h-4" strokeWidth={1.75} /></button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Invoice Type Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#f0f0f0] rounded-2xl">
                <button
                  type="button"
                  onClick={() => setNewInvoiceForm(prev => ({ ...prev, type: 'simplified_invoice' }))}
                  className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    newInvoiceForm.type === 'simplified_invoice' ? 'bg-white text-[#141414] shadow-none' : 'text-[#707070]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>فاتورة مبسطة للأفراد (B2C)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNewInvoiceForm(prev => ({ ...prev, type: 'tax_invoice' }))}
                  className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    newInvoiceForm.type === 'tax_invoice' ? 'bg-white text-[#141414] shadow-none' : 'text-[#707070]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>فاتورة ضريبية للشركات (B2B)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">اسم العميل / المنشأة *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.customerName}
                    onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="مثال: عبد الله أحمد الدوسري"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] focus:border-[#141414] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">رقم الجوال *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.customerPhone}
                    onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono focus:border-[#141414] focus:outline-none"
                  />
                </div>
              </div>

              {newInvoiceForm.type === 'tax_invoice' && (
                <div>
                  <label className="font-bold text-[#141414] block mb-1">الرقم الضريبي للمشتري (15 رقماً يبدأ بـ 3) *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceForm.vatNumber}
                    onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, vatNumber: e.target.value }))}
                    placeholder="310XXXXXXXXX003"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-[#f3f3f3] font-mono focus:border-[#141414] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-[#707070] block mb-1">ربط برقم شاسيه من مخزون سولينا (اختياري - يسحب السعر والبيانات تلقائياً)</label>
                <select
                  value={newInvoiceForm.selectedVinId}
                  onChange={(e) => handleSelectVinFromStock(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-[#f3f3f3] font-medium"
                >
                  <option value="">-- اختيار يدوي بدون سحب من المخزون --</option>
                  {vinStock.filter(v => v.status !== 'sold').map(v => (
                    <option key={v.id} value={v.id}>
                      {v.vin} | {v.model} ({v.trim}) - {v.price.toLocaleString('ar-SA')} ريال
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">طراز السيارة / البيان</label>
                  <select
                    value={newInvoiceForm.vehicleModel}
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const foundVeh = vehicles.find(v => `سولينا ${v.nameAr} ${v.year}` === selectedName);
                      setNewInvoiceForm(prev => ({
                        ...prev,
                        vehicleModel: selectedName,
                        amount: foundVeh ? foundVeh.priceStartingFrom : prev.amount
                      }));
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={`سولينا ${v.nameAr} ${v.year}`}>
                        سولينا {v.nameAr} {v.year} ({v.priceStartingFrom.toLocaleString('ar-SA')} ريال)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#707070] block mb-1">رقم الشاسيه (VIN)</label>
                  <input
                    type="text"
                    value={newInvoiceForm.vinNumber}
                    onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, vinNumber: e.target.value.toUpperCase() }))}
                    placeholder="يُولّد تلقائياً إذا تُرك فارغاً"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707070] block mb-1">المبلغ الإجمالي (شامل 15% ضريبة القيمة المضافة)</label>
                <input
                  type="number"
                  required
                  value={newInvoiceForm.amount}
                  onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-black text-[#141414] text-sm focus:border-[#141414] focus:outline-none"
                />
              </div>

              {/* Live Tax Calculation Preview */}
              <div className="p-3.5 rounded-2xl bg-[#f3f3f3] border border-[#e0e0e0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#707070] block">المبلغ الصافي قبل الضريبة:</span>
                  <strong className="font-mono text-[#141414]">{(newInvoiceForm.amount / 1.15).toFixed(2)} ر.س</strong>
                </div>
                <div>
                  <span className="text-[#707070] block">ضريبة القيمة المضافة (15%):</span>
                  <strong className="font-mono text-[#141414]">{(newInvoiceForm.amount - newInvoiceForm.amount / 1.15).toFixed(2)} ر.س</strong>
                </div>
                <div className="text-end">
                  <span className="text-[#707070] block">الإجمالي النهائي:</span>
                  <strong className="font-mono text-[#141414] text-sm">{newInvoiceForm.amount.toLocaleString('ar-SA')} ر.س</strong>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#141414] hover:bg-black text-white text-xs font-black rounded-xl shadow-none cursor-pointer transition-all"
            >
              تأكيد واعتماد الفاتورة في منصة فاتورة ZATCA
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
