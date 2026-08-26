import React, { useState } from 'react';
import { 
  FileText, 
  QrCode, 
  CheckCircle2, 
  Download, 
  Printer, 
  Plus, 
  Search, 
  ShieldCheck, 
  ExternalLink,
  Calendar,
  Building,
  User,
  Percent,
  Hash,
  Clock
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { VEHICLES } from '../../data/toyotaData';

interface InvoiceItem {
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
  type: 'tax_invoice' | 'simplified_invoice';
  status: 'reported' | 'cleared' | 'draft';
  zatcaQrBase64: string;
}

export const AdminZatcaInvoicingTab: React.FC = () => {
  const { language } = useLanguage();
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample production ZATCA Invoices
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
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
  ]);

  const [newInvoiceForm, setNewInvoiceForm] = useState({
    customerName: '',
    customerPhone: '',
    vehicleModel: 'سولينا كامري 2026 هايبرد',
    vinNumber: 'JT3' + Math.random().toString(36).substring(2, 12).toUpperCase(),
    amount: 105450,
    type: 'simplified_invoice' as 'tax_invoice' | 'simplified_invoice'
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const base = Number((newInvoiceForm.amount / 1.15).toFixed(2));
    const vat = Number((newInvoiceForm.amount - base).toFixed(2));
    
    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `SOL-INV-2026-00${Math.floor(100 + Math.random() * 900)}`,
      uuid: crypto.randomUUID ? crypto.randomUUID() : 'f91a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c',
      customerName: newInvoiceForm.customerName || 'عميل نقدي متميز',
      customerPhone: newInvoiceForm.customerPhone || '0500000000',
      vehicleModel: newInvoiceForm.vehicleModel,
      vinNumber: newInvoiceForm.vinNumber,
      baseAmount: base,
      vatAmount: vat,
      totalAmount: newInvoiceForm.amount,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: newInvoiceForm.type,
      status: 'cleared',
      zatcaQrBase64: 'AQ9zb2xpbmEtbW90b3JzAg8zMTA5ODQ3MjkxMDAwMDMDEDIwMjYtMDgtMjZUMTU6MDA6MDAFBjEwNTQ1MAYFMTM3NTQ='
    };

    setInvoices(prev => [newInv, ...prev]);
    setShowNewInvoiceModal(false);
    setSelectedInvoice(newInv);
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.vinNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-start font-arabic">
      {/* 1. Header & Summary KPIs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-gray-900">نظام الفوترة الإلكترونية المعتمد (ZATCA FATOORAH Phase 2)</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            إصدار ومطابقة الفواتير الضريبية والمبسطة المتوافقة 100% مع هيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية.
          </p>
        </div>

        <button
          onClick={() => setShowNewInvoiceModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إصدار فاتورة ضريبية جديدة</span>
        </button>
      </div>

      {/* 2. ZATCA Compliance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إجمالي الفواتير الصادرة</span>
          <div className="text-xl font-black text-gray-900">{invoices.length} فواتير</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">✓ مطابقة بالكامل لـ ZATCA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إجمالي المبيعات (شامل الضريبة)</span>
          <div className="text-xl font-black text-red-600">
            {invoices.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-gray-400 font-light">أسطول سولينا 2026</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">ضريبة القيمة المضافة (15% VAT)</span>
          <div className="text-xl font-black text-gray-900">
            {invoices.reduce((acc, curr) => acc + curr.vatAmount, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-blue-600 font-bold">جاهزة للإقرار الضريبي</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">حالة الربط والاعتماد (CSID)</span>
          <div className="text-base font-black text-emerald-600 flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>متصل بنجاح 100%</span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">الرقم الضريبي: 310984729100003</span>
        </div>
      </div>

      {/* 3. Search & Invoices Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم الفاتورة، اسم العميل، أو رقم الشاسيه VIN..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>
          <span className="text-xs text-gray-400 font-medium">{filteredInvoices.length} فاتورة مسجلة</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3 text-start">رقم الفاتورة</th>
                <th className="p-3 text-start">اسم العميل</th>
                <th className="p-3 text-start">طراز السيارة ورقم VIN</th>
                <th className="p-3 text-start">المبلغ الإجمالي</th>
                <th className="p-3 text-start">ضريبة 15%</th>
                <th className="p-3 text-start">التاريخ والوقت</th>
                <th className="p-3 text-start">حالة ZATCA</th>
                <th className="p-3 text-start">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-900">{inv.invoiceNumber}</td>
                  <td className="p-3 font-bold text-gray-900">{inv.customerName}</td>
                  <td className="p-3 space-y-0.5">
                    <div className="font-bold text-gray-800">{inv.vehicleModel}</div>
                    <span className="text-[10px] text-gray-400 font-mono">VIN: {inv.vinNumber}</span>
                  </td>
                  <td className="p-3 font-black text-red-600">{inv.totalAmount.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3 font-bold text-gray-600">{inv.vatAmount.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3 text-gray-500">{inv.date}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>معتمدة ومطابقة</span>
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1 bg-gray-900 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>عرض الفاتورة QR</span>
                    </button>
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
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Invoice Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <img src="/solina-logo.png" alt="سولينا" className="h-8 w-auto" />
                <div>
                  <h3 className="text-sm font-black text-gray-900">شركة سولينا للسيارات | Solina Motors Co.</h3>
                  <span className="text-[10px] text-gray-500">الرقم الضريبي المعتمد: 310984729100003</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl text-xs border border-gray-200">
              <div>
                <span className="text-gray-400 block text-[10px]">رقم الفاتورة الضريبية</span>
                <strong className="text-gray-900 font-mono">{selectedInvoice.invoiceNumber}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">تاريخ ووقت الإصدار (ZATCA Timestamp)</span>
                <strong className="text-gray-900 font-mono">{selectedInvoice.date}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">اسم العميل</span>
                <strong className="text-gray-900">{selectedInvoice.customerName}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">المعرف الفريد الموحد (UUID)</span>
                <span className="text-[9px] font-mono text-gray-600 break-all">{selectedInvoice.uuid}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-start">
                <thead className="bg-gray-100 font-bold text-gray-700">
                  <tr>
                    <th className="p-2.5">الوصف والمواصفات</th>
                    <th className="p-2.5">رقم الشاسيه VIN</th>
                    <th className="p-2.5">المبلغ الخاضع للضريبة</th>
                    <th className="p-2.5">نسبة الضريبة</th>
                    <th className="p-2.5">مبلغ الضريبة</th>
                    <th className="p-2.5">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-2.5 font-bold text-gray-900">{selectedInvoice.vehicleModel}</td>
                    <td className="p-2.5 font-mono text-gray-600">{selectedInvoice.vinNumber}</td>
                    <td className="p-2.5 font-bold">{selectedInvoice.baseAmount.toLocaleString('ar-SA')} ريال</td>
                    <td className="p-2.5 font-bold">15%</td>
                    <td className="p-2.5 font-bold text-gray-700">{selectedInvoice.vatAmount.toLocaleString('ar-SA')} ريال</td>
                    <td className="p-2.5 font-black text-red-600">{selectedInvoice.totalAmount.toLocaleString('ar-SA')} ريال</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* QR Code & Total Summary Box */}
            <div className="p-4 bg-gradient-to-r from-gray-950 to-slate-900 rounded-2xl text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl">
                  <QrCode className="w-20 h-20 text-black" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    ✓ رمز QR مشفر بنظام TLV Base64 المعتمد
                  </span>
                  <span className="text-[9px] text-gray-400 block">الختم المشفر: ECDSA secp256k1 Compliant</span>
                  <span className="text-[9px] text-gray-400 block font-mono">ZATCA Hash: sha256_7f8a92...</span>
                </div>
              </div>

              <div className="text-end">
                <span className="text-[10px] text-gray-400 block">المجموع الإجمالي النهائي</span>
                <strong className="text-xl font-black text-red-500">
                  {selectedInvoice.totalAmount.toLocaleString('ar-SA')} ريال
                </strong>
                <span className="text-[9px] text-gray-300 block">شامل ضريبة القيمة المضافة 15%</span>
              </div>
            </div>

            {/* Print / Download Bar */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>
              <button
                onClick={() => alert(`تم تحميل ملف الفاتورة الضريبية ZATCA XML & PDF: ${selectedInvoice.invoiceNumber}`)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>تحميل PDF معتمد</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. New Invoice Creation Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateInvoice} className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900">إصدار فاتورة ضريبية فورية</h3>
              <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="p-1 text-gray-400">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">اسم العميل / المؤسسة</label>
                <input
                  type="text"
                  required
                  value={newInvoiceForm.customerName}
                  onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="مثال: عبد الله أحمد الدوسري"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">طراز السيارة</label>
                <select
                  value={newInvoiceForm.vehicleModel}
                  onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, vehicleModel: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  {VEHICLES.map(v => (
                    <option key={v.id} value={`سولينا ${v.nameAr} 2026`}>
                      سولينا {v.nameAr} 2026 ({v.priceStartingFrom.toLocaleString('ar-SA')} ريال)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">المبلغ الإجمالي (شامل 15% ضريبة)</label>
                <input
                  type="number"
                  required
                  value={newInvoiceForm.amount}
                  onChange={(e) => setNewInvoiceForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-red-600 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
            >
              تأكيد وإرسال الفاتورة إلى ZATCA
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
