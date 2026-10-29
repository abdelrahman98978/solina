import React, { useState } from 'react';
import {
  Wallet,
  Receipt,
  BookOpen,
  ShieldCheck,
  Plus,
  Search,
  Download,
  Printer,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Briefcase
} from 'lucide-react';
import {
  useAdminData,
  AccountingVoucher,
  CustodyRecord,
  ExportFormatType
} from '../../context/AdminDataContext';

type AccountingSubTab = 'vouchers' | 'custodies' | 'ledger' | 'vat_return';

export const AdminAccountingTab: React.FC = () => {
  const {
    vouchers,
    custodies,
    chartOfAccounts,
    zatcaInvoices,
    stats,
    settings,
    addVoucher,
    deleteVoucher,
    addCustody,
    settleCustodyExpense,
    replenishCustody,
    closeCustody,
    deleteCustody,
    exportDataToCSV,
    exportSingleDocument
  } = useAdminData();

  const [subTab, setSubTab] = useState<AccountingSubTab>('vouchers');
  const [searchQuery, setSearchQuery] = useState('');
  const [voucherTypeFilter, setVoucherTypeFilter] = useState<'all' | 'receipt' | 'payment' | 'journal'>('all');
  const [custodyStatusFilter, setCustodyStatusFilter] = useState<'all' | 'active' | 'pending_settlement' | 'settled_closed'>('all');
  const [ledgerCategoryFilter, setLedgerCategoryFilter] = useState<string>('all');

  // Modals State
  const [showNewVoucherModal, setShowNewVoucherModal] = useState(false);
  const [selectedVoucherPreview, setSelectedVoucherPreview] = useState<AccountingVoucher | null>(null);

  const [showNewCustodyModal, setShowNewCustodyModal] = useState(false);
  const [selectedCustodyForSettle, setSelectedCustodyForSettle] = useState<CustodyRecord | null>(null);
  const [selectedCustodyForReplenish, setSelectedCustodyForReplenish] = useState<CustodyRecord | null>(null);
  const [selectedCustodyPreview, setSelectedCustodyPreview] = useState<CustodyRecord | null>(null);

  // Forms State
  const [voucherForm, setVoucherForm] = useState({
    type: 'receipt' as AccountingVoucher['type'],
    partyName: '',
    description: '',
    accountCode: '4101',
    accountName: 'إيرادات مبيعات السيارات والصيانة',
    costCenter: 'مركز خريص الرئيسي — الرياض',
    paymentMethod: 'bank_transfer' as AccountingVoucher['paymentMethod'],
    totalAmount: 11500,
    vatIncluded: true,
    referenceNumber: ''
  });

  const [custodyForm, setCustodyForm] = useState({
    employeeName: '',
    employeeRole: 'مشرف مبيعات / تشغيل',
    branchName: 'مركز خريص الرئيسي — الرياض',
    custodyType: 'permanent_petty_cash' as CustodyRecord['custodyType'],
    allocatedAmount: 20000,
    spentAmount: 0,
    issueDate: new Date().toISOString().split('T')[0],
    status: 'active' as CustodyRecord['status'],
    notes: ''
  });

  const [settleExpenseForm, setSettleExpenseForm] = useState({
    amount: 2500,
    description: '',
    vatIncluded: true
  });

  const [replenishAmount, setReplenishAmount] = useState<number>(10000);

  // Filtered Lists
  const filteredVouchers = vouchers.filter(v => {
    const matchesSearch =
      v.voucherNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.referenceNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = voucherTypeFilter === 'all' || v.type === voucherTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredCustodies = custodies.filter(c => {
    const matchesSearch =
      c.custodyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.branchName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = custodyStatusFilter === 'all' || c.status === custodyStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAccounts = chartOfAccounts.filter(acc => {
    const matchesSearch =
      acc.code.includes(searchQuery) ||
      acc.nameAr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = ledgerCategoryFilter === 'all' || acc.categoryAr === ledgerCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherForm.partyName.trim() || !voucherForm.description.trim()) return;
    const total = Number(voucherForm.totalAmount) || 0;
    const base = voucherForm.vatIncluded ? Number((total / 1.15).toFixed(2)) : total;
    const vat = voucherForm.vatIncluded ? Number((total - base).toFixed(2)) : 0;

    addVoucher({
      type: voucherForm.type,
      partyName: voucherForm.partyName,
      description: voucherForm.description,
      accountCode: voucherForm.accountCode,
      accountName: voucherForm.accountName,
      costCenter: voucherForm.costCenter,
      paymentMethod: voucherForm.paymentMethod,
      baseAmount: base,
      vatAmount: vat,
      totalAmount: total,
      referenceNumber: voucherForm.referenceNumber || undefined,
      status: 'posted'
    });
    setShowNewVoucherModal(false);
    setVoucherForm(prev => ({ ...prev, partyName: '', description: '', referenceNumber: '' }));
  };

  const handleCreateCustody = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custodyForm.employeeName.trim()) return;
    addCustody(custodyForm);
    setShowNewCustodyModal(false);
    setCustodyForm(prev => ({ ...prev, employeeName: '', notes: '' }));
  };

  const handleSettleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustodyForSettle || !settleExpenseForm.description.trim()) return;
    settleCustodyExpense(
      selectedCustodyForSettle.id,
      Number(settleExpenseForm.amount),
      settleExpenseForm.description,
      settleExpenseForm.vatIncluded
    );
    setSelectedCustodyForSettle(null);
    setSettleExpenseForm({ amount: 2500, description: '', vatIncluded: true });
  };

  const handleReplenishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustodyForReplenish || replenishAmount <= 0) return;
    replenishCustody(selectedCustodyForReplenish.id, Number(replenishAmount));
    setSelectedCustodyForReplenish(null);
  };

  const paymentMethodLabel = (m: AccountingVoucher['paymentMethod']) => {
    switch (m) {
      case 'bank_transfer': return 'تحويل بنكي';
      case 'mada_pos': return 'شبكة مدى / POS';
      case 'cash': return 'نقدي خزينة';
      case 'cheque': return 'شيك مصدق';
      case 'custody_deduction': return 'خصم تسوية عهدة';
    }
  };

  const custodyTypeLabel = (t: CustodyRecord['custodyType']) => {
    switch (t) {
      case 'permanent_petty_cash': return 'عهدة نقدية مستديمة';
      case 'workshop_operations': return 'عهدة تشغيل ورش وصيانة';
      case 'showroom_hospitality': return 'عهدة ضيافة ومعارض';
      case 'procurement_advance': return 'سلفة مشتريات وتخليص';
    }
  };

  const handleExportSingleVoucher = (v: AccountingVoucher, format: ExportFormatType) => {
    const title = v.type === 'receipt' ? 'سند قبض مالي رسمي' : v.type === 'payment' ? 'سند صرف مالي رسمي' : 'قيد يومية محاسبي';
    exportSingleDocument(
      title,
      v.voucherNumber,
      [
        ['تاريخ ووقت السند', v.date],
        ['الطرف / المستفيد', v.partyName],
        ['طريقة الدفع', paymentMethodLabel(v.paymentMethod)],
        ['مركز التكلفة / الفرع', v.costCenter],
        ['الحساب المحاسبي', `${v.accountCode} — ${v.accountName}`],
        ['المرجع المرتبط', v.referenceNumber || 'غير مرتبط']
      ],
      ['البيان والتفاصيل المحاسبية', 'المبلغ قبل الضريبة (ر.س)', 'ضريبة القيمة المضافة 15% (ر.س)', 'الإجمالي النهائي (ر.س)'],
      [[v.description, v.baseAmount.toLocaleString('ar-SA'), v.vatAmount.toLocaleString('ar-SA'), v.totalAmount.toLocaleString('ar-SA')]],
      format
    );
  };

  const handleExportSingleCustody = (c: CustodyRecord, format: ExportFormatType) => {
    exportSingleDocument(
      'محضر استلام وتسوية عهدة مالية (إخلاء طرف عهدة)',
      c.custodyNumber,
      [
        ['اسم الموظف المستلم', c.employeeName],
        ['المسمى الوظيفي', c.employeeRole],
        ['الفرع / الإدارة', c.branchName],
        ['نوع العهدة المالية', custodyTypeLabel(c.custodyType)],
        ['تاريخ صرف العهدة', c.issueDate],
        ['تاريخ آخر مطابقة وتسوية', c.lastSettlementDate]
      ],
      ['البيان والملاحظات', 'المبلغ المعتمد (ر.س)', 'المبلغ المصروف والمسوى (ر.س)', 'الرصيد المتبقي بالعهدة (ر.س)', 'حالة العهدة'],
      [[
        c.notes || 'عهدة تشغيلية معتمدة وفق اللائحة المالية لشركة سولينا للسيارات',
        c.allocatedAmount.toLocaleString('ar-SA'),
        c.spentAmount.toLocaleString('ar-SA'),
        c.remainingBalance.toLocaleString('ar-SA'),
        c.status === 'active' ? 'نشطة' : c.status === 'pending_settlement' ? 'قيد التسوية' : 'مسددة ومقفلة (إخلاء طرف)'
      ]],
      format
    );
  };

  const handleExportVatReturn = (format: ExportFormatType) => {
    const taxableSalesBase = Math.max(0, stats.totalInvoicedSalesSAR - stats.totalVatCollectedSAR);
    const taxablePurchasesBase = Math.max(0, stats.totalPaymentsSAR - stats.totalInputVatSAR);
    exportSingleDocument(
      'إقرار ضريبة القيمة المضافة الدوري (ZATCA VAT Return)',
      `VAT-2026-Q3`,
      [
        ['اسم المنشأة الخاضعة للضريبة', settings.companyNameAr],
        ['الرقم الضريبي الموحد (TIN)', settings.vatNumber],
        ['رقم السجل التجاري', settings.crNumber],
        ['الفترة الضريبية', 'الربع الثالث 2026 — هيئة الزكاة والضريبة والجمارك']
      ],
      ['البند الضريبي', 'المبلغ الخاضع للضريبة (ر.س)', 'نسبة الضريبة', 'قيمة الضريبة (ر.س)'],
      [
        ['1. إجمالي المبيعات والفواتير الضريبية الخاضعة للنسبة الأساسية', taxableSalesBase.toLocaleString('ar-SA'), '15%', stats.totalVatCollectedSAR.toLocaleString('ar-SA')],
        ['2. إجمالي المشتريات والمصروفات التشغيلية والعُهد الخاضعة للضريبة', taxablePurchasesBase.toLocaleString('ar-SA'), '15%', stats.totalInputVatSAR.toLocaleString('ar-SA')],
        ['3. صافي ضريبة القيمة المضافة المستحقة للسداد لـ ZATCA', '—', 'صافي التسوية', stats.netVatPayableSAR.toLocaleString('ar-SA')]
      ],
      format
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Executive Accounting & Treasury Header Banner */}
      <div className="bg-[#141414] rounded-[24px] p-6 text-white border border-[#141414] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold">
            <Wallet className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>النظام المحاسبي المالي وإدارة الخزينة والعُهد المعتمدة</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            الإدارة المالية، سندات القبض والصرف، العُهد، ودليل الحسابات
          </h2>
          <p className="text-xs text-[#adadad] leading-relaxed">
            نظام محاسبي متكامل يربط فواتير المبيعات وأوامر عمل الصيانة بسندات القبض والصرف، ويراقب عُهد الموظفين والفروع لحظياً مع تصدير فوري بـ 10 صيغ رسمية معتمدة.
          </p>
        </div>

        {/* Top Financial Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-[18px] p-3.5 whitespace-nowrap">
            <span className="text-[10px] text-[#adadad] block mb-1">إجمالي المقبوضات</span>
            <strong className="text-base font-black text-white font-mono block">
              {stats.totalReceiptsSAR.toLocaleString('ar-SA')} <span className="text-[10px] font-normal">ر.س</span>
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[18px] p-3.5 whitespace-nowrap">
            <span className="text-[10px] text-[#adadad] block mb-1">إجمالي المصروفات</span>
            <strong className="text-base font-black text-white font-mono block">
              {stats.totalPaymentsSAR.toLocaleString('ar-SA')} <span className="text-[10px] font-normal">ر.س</span>
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[18px] p-3.5 whitespace-nowrap">
            <span className="text-[10px] text-[#adadad] block mb-1">الرصيد المتبقي بالعُهد</span>
            <strong className="text-base font-black text-white font-mono block">
              {stats.totalCustodiesRemainingSAR.toLocaleString('ar-SA')} <span className="text-[10px] font-normal">ر.س</span>
            </strong>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-[18px] p-3.5 whitespace-nowrap">
            <span className="text-[10px] text-[#adadad] block mb-1">صافي ضريبة القيمة المضافة</span>
            <strong className="text-base font-black text-white font-mono block">
              {stats.netVatPayableSAR.toLocaleString('ar-SA')} <span className="text-[10px] font-normal">ر.س</span>
            </strong>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Pills & Universal Multi-Format Export Bar */}
      <div className="bg-white p-4 rounded-[24px] border border-[#e0e0e0] flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'vouchers' as const, label: `سندات القبض والصرف (${vouchers.length})`, icon: Receipt },
            { id: 'custodies' as const, label: `إدارة العُهد والسلف (${custodies.length})`, icon: Briefcase },
            { id: 'ledger' as const, label: `دليل الحسابات وميزان المراجعة (${chartOfAccounts.length})`, icon: BookOpen },
            { id: 'vat_return' as const, label: 'الإقرار الضريبي والمطابقة الضريبية', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#141414] text-white'
                    : 'bg-[#f3f3f3] text-[#707070] hover:text-[#141414]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Universal Export Quick Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const targetDataset =
                subTab === 'vouchers'
                  ? 'accounting_vouchers'
                  : subTab === 'custodies'
                  ? 'custodies'
                  : 'chart_of_accounts';
              exportDataToCSV(targetDataset);
            }}
            className="px-4 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>تصدير القسم بكل الصيغ (10 صيغ)</span>
          </button>

          {(['excel', 'pdf_print', 'word', 'xml', 'csv'] as ExportFormatType[]).map(fmt => {
            const labelMap: Record<string, string> = {
              excel: 'Excel',
              pdf_print: 'PDF',
              word: 'Word',
              xml: 'XML',
              csv: 'CSV'
            };
            const targetDataset =
              subTab === 'vouchers'
                ? 'accounting_vouchers'
                : subTab === 'custodies'
                ? 'custodies'
                : 'chart_of_accounts';
            return (
              <button
                key={fmt}
                onClick={() => exportDataToCSV(targetDataset, fmt)}
                className="px-3 py-2 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-[11px] font-bold cursor-pointer"
              >
                {labelMap[fmt]}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          SUB-TAB 1: VOUCHERS (سندات القبض والصرف والقيود)
         ========================================================= */}
      {subTab === 'vouchers' && (
        <div className="space-y-4">
          {/* Action & Filter Bar */}
          <div className="bg-white p-4 rounded-[24px] border border-[#e0e0e0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-[#adadad] absolute right-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="ابحث برقم السند، اسم العميل/المستفيد، البيان أو رقم الفاتورة..."
                  className="w-full pr-10 pl-4 py-2 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] text-xs focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#f3f3f3] p-1 rounded-full border border-[#e0e0e0]">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'receipt', label: 'سندات قبض' },
                  { id: 'payment', label: 'سندات صرف' },
                  { id: 'journal', label: 'قيود يومية' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setVoucherTypeFilter(t.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      voucherTypeFilter === t.id ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNewVoucherModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>إصدار سند قبض / صرف جديد</span>
            </button>
          </div>

          {/* Vouchers Table */}
          <div className="bg-white rounded-[24px] border border-[#e0e0e0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#f3f3f3] border-b border-[#e0e0e0] text-[11px] font-bold text-[#707070]">
                    <th className="py-3.5 px-4">رقم السند والنوع</th>
                    <th className="py-3.5 px-4">العميل / المستفيد والبيان</th>
                    <th className="py-3.5 px-4">الحساب ومركز التكلفة</th>
                    <th className="py-3.5 px-4">طريقة الدفع والمرجع</th>
                    <th className="py-3.5 px-4">المبلغ والضريبة</th>
                    <th className="py-3.5 px-4">الحالة</th>
                    <th className="py-3.5 px-4 text-left">تصدير وإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e0e0] text-xs">
                  {filteredVouchers.map(v => (
                    <tr key={v.id} className="hover:bg-[#f3f3f3] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-[30%] bg-[#f3f3f3] border border-[#e0e0e0] flex items-center justify-center text-[#141414] shrink-0">
                            {v.type === 'receipt' ? (
                              <ArrowDownLeft className="w-4 h-4" strokeWidth={1.75} />
                            ) : v.type === 'payment' ? (
                              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                            ) : (
                              <BookOpen className="w-4 h-4" strokeWidth={1.75} />
                            )}
                          </div>
                          <div>
                            <span className="font-mono font-black text-[#141414] block">{v.voucherNumber}</span>
                            <span className="text-[10px] text-[#707070]">
                              {v.type === 'receipt' ? 'سند قبض' : v.type === 'payment' ? 'سند صرف' : 'قيد تسوية يومية'} • {v.date.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[260px]">
                        <span className="font-bold text-[#141414] block">{v.partyName}</span>
                        <span className="text-[11px] text-[#707070] line-clamp-1">{v.description}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#141414] block">{v.accountCode} — {v.accountName}</span>
                        <span className="text-[10px] text-[#707070]">{v.costCenter}</span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-[10px] font-bold inline-block mb-1 whitespace-nowrap">
                          {paymentMethodLabel(v.paymentMethod)}
                        </span>
                        {v.referenceNumber && (
                          <span className="block text-[10px] font-mono text-[#707070] whitespace-nowrap">مرجع: {v.referenceNumber}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-black text-[#141414] font-mono block text-sm whitespace-nowrap">
                          {v.type === 'payment' ? '-' : '+'}{v.totalAmount.toLocaleString('ar-SA')} ر.س
                        </span>
                        <span className="text-[10px] text-[#707070] font-mono whitespace-nowrap">
                          الضريبة: {v.vatAmount.toLocaleString('ar-SA')} ر.س
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap inline-block ${
                          v.status === 'posted'
                            ? 'bg-[#141414] text-white border-[#141414]'
                            : 'bg-[#f3f3f3] text-[#707070] border-[#e0e0e0]'
                        }`}>
                          {v.status === 'posted' ? 'مرحّل بالدفاتر' : v.status === 'draft' ? 'مسودة' : 'ملغى'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-left whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedVoucherPreview(v)}
                            className="px-3 py-1.5 rounded-full bg-[#141414] hover:bg-black text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <Printer className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                            <span>معاينة وتصدير</span>
                          </button>
                          <button
                            onClick={() => handleExportSingleVoucher(v, 'word')}
                            className="px-2.5 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-[10px] font-bold cursor-pointer whitespace-nowrap"
                            title="تصدير السند كملف Word"
                          >
                            DOC
                          </button>
                          <button
                            onClick={() => deleteVoucher(v.id)}
                            className="p-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#707070] hover:text-[#141414] cursor-pointer shrink-0"
                            title="حذف السند"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUB-TAB 2: CUSTODIES (إدارة العُهد المالية والسلف)
         ========================================================= */}
      {subTab === 'custodies' && (
        <div className="space-y-4">
          {/* Action & Filter Bar */}
          <div className="bg-white p-4 rounded-[24px] border border-[#e0e0e0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-[#adadad] absolute right-3.5 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="ابحث برقم العهدة، اسم الموظف المستلم، أو الفرع..."
                  className="w-full pr-10 pl-4 py-2 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] text-xs focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#f3f3f3] p-1 rounded-full border border-[#e0e0e0]">
                {[
                  { id: 'all', label: 'جميع العُهد' },
                  { id: 'active', label: 'نشطة' },
                  { id: 'pending_settlement', label: 'قيد التسوية' },
                  { id: 'settled_closed', label: 'مقفلة ومسددة' }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setCustodyStatusFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      custodyStatusFilter === st.id ? 'bg-[#141414] text-white' : 'text-[#707070] hover:text-[#141414]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNewCustodyModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={1.75} />
              <span>صرف عهدة مالية جديدة</span>
            </button>
          </div>

          {/* Custodies Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCustodies.map(c => {
              const spentPercent = c.allocatedAmount > 0 ? Math.min(100, Math.round((c.spentAmount / c.allocatedAmount) * 100)) : 0;
              return (
                <div key={c.id} className="bg-white rounded-[24px] p-5 border border-[#e0e0e0] flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-[30%] bg-[#141414] text-white flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs text-[#141414]">{c.custodyNumber}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[10px] font-bold text-[#141414]">
                            {custodyTypeLabel(c.custodyType)}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-[#141414] mt-0.5">{c.employeeName}</h3>
                        <p className="text-[11px] text-[#707070]">{c.employeeRole} • {c.branchName}</p>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      c.status === 'active'
                        ? 'bg-[#141414] text-white border-[#141414]'
                        : c.status === 'pending_settlement'
                        ? 'bg-[#141414] text-white border-[#141414]'
                        : 'bg-[#f3f3f3] text-[#707070] border-[#e0e0e0]'
                    }`}>
                      {c.status === 'active' ? 'عهدة نشطة' : c.status === 'pending_settlement' ? 'تحتاج تسوية' : 'مسددة ومقفلة'}
                    </span>
                  </div>

                  {/* Financial Progress & Balances */}
                  <div className="p-3.5 rounded-[16px] bg-[#f3f3f3] border border-[#e0e0e0] space-y-2.5">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#707070] block">المبلغ المعتمد</span>
                        <strong className="font-mono text-[#141414]">{c.allocatedAmount.toLocaleString('ar-SA')} ر.س</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#707070] block">المصروف والمسوى</span>
                        <strong className="font-mono text-[#141414]">{c.spentAmount.toLocaleString('ar-SA')} ر.س</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#707070] block">الرصيد المتبقي</span>
                        <strong className="font-mono text-[#141414]">{c.remainingBalance.toLocaleString('ar-SA')} ر.س</strong>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
                      <div
                        className="h-full bg-[#141414] transition-all duration-300"
                        style={{ width: `${spentPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#707070]">
                      <span>نسبة الاستهلاك: {spentPercent}%</span>
                      <span>آخر تسوية: {c.lastSettlementDate}</span>
                    </div>
                  </div>

                  {c.notes && (
                    <p className="text-[11px] text-[#707070] leading-relaxed">{c.notes}</p>
                  )}

                  {/* Custody Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e0e0e0]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {c.status !== 'settled_closed' && (
                        <>
                          <button
                            onClick={() => setSelectedCustodyForSettle(c)}
                            className="px-3 py-1.5 rounded-full bg-[#141414] hover:bg-black text-white text-[11px] font-bold cursor-pointer"
                          >
                            تسوية مصروف / فاتورة
                          </button>
                          <button
                            onClick={() => setSelectedCustodyForReplenish(c)}
                            className="px-3 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-[11px] font-bold cursor-pointer"
                          >
                            + تغذية العهدة
                          </button>
                          <button
                            onClick={() => closeCustody(c.id)}
                            className="px-3 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-[11px] font-bold cursor-pointer"
                          >
                            إقفال وإخلاء طرف
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedCustodyPreview(c)}
                        className="px-3 py-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Printer className="w-3 h-3" strokeWidth={1.75} />
                        <span>محضر العهدة / تصدير</span>
                      </button>
                      <button
                        onClick={() => deleteCustody(c.id)}
                        className="p-1.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#707070] hover:text-[#141414] cursor-pointer"
                        title="حذف سجل العهدة"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          SUB-TAB 3: CHART OF ACCOUNTS & TRIAL BALANCE (دليل الحسابات)
         ========================================================= */}
      {subTab === 'ledger' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-[24px] border border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {['all', 'الأصول', 'الالتزامات', 'حقوق الملكية', 'الإيرادات', 'المصروفات'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setLedgerCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    ledgerCategoryFilter === cat
                      ? 'bg-[#141414] text-white'
                      : 'bg-[#f3f3f3] text-[#707070] hover:text-[#141414]'
                  }`}
                >
                  {cat === 'all' ? 'جميع الحسابات' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => exportDataToCSV('chart_of_accounts')}
              className="px-4 py-2 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>تصدير ميزان المراجعة بكل الصيغ</span>
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-[#e0e0e0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#f3f3f3] border-b border-[#e0e0e0] text-[11px] font-bold text-[#707070]">
                    <th className="py-3.5 px-4">كود الحساب</th>
                    <th className="py-3.5 px-4">اسم الحساب المحاسبي المعتمد</th>
                    <th className="py-3.5 px-4">التصنيف المالي</th>
                    <th className="py-3.5 px-4">إجمالي المدين</th>
                    <th className="py-3.5 px-4">إجمالي الدائن</th>
                    <th className="py-3.5 px-4">الرصيد الصافي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e0e0] text-xs">
                  {filteredAccounts.map(acc => (
                    <tr key={acc.code} className="hover:bg-[#f3f3f3] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-black text-[#141414] whitespace-nowrap">{acc.code}</td>
                      <td className="py-3.5 px-4 font-bold text-[#141414]">{acc.nameAr}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] border border-[#e0e0e0] text-[10px] font-bold text-[#141414]">
                          {acc.categoryAr}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#141414] whitespace-nowrap">{acc.debit.toLocaleString('ar-SA')} ر.س</td>
                      <td className="py-3.5 px-4 font-mono text-[#141414] whitespace-nowrap">{acc.credit.toLocaleString('ar-SA')} ر.س</td>
                      <td className="py-3.5 px-4 font-mono font-black text-[#141414] whitespace-nowrap">{acc.balance.toLocaleString('ar-SA')} ر.س</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SUB-TAB 4: VAT RETURN & ZATCA RECONCILIATION (الإقرار الضريبي)
         ========================================================= */}
      {subTab === 'vat_return' && (
        <div className="bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
            <div>
              <span className="text-[11px] font-bold text-[#707070] block">هيئة الزكاة والضريبة والجمارك — الإقرار الضريبي الدوري</span>
              <h3 className="text-lg font-black text-[#141414]">ملخص الإقرار الضريبي الدوري ومطابقة ضريبة القيمة المضافة (15%)</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(['pdf_print', 'excel', 'word', 'xml', 'csv', 'json'] as ExportFormatType[]).map(fmt => {
                const labels: Record<string, string> = {
                  pdf_print: 'طباعة / PDF',
                  excel: 'Excel .XLS',
                  word: 'Word .DOC',
                  xml: 'ZATCA .XML',
                  csv: 'CSV',
                  json: 'JSON'
                };
                return (
                  <button
                    key={fmt}
                    onClick={() => handleExportVatReturn(fmt)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer ${
                      fmt === 'pdf_print'
                        ? 'bg-[#141414] text-white'
                        : 'bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0]'
                    }`}
                  >
                    {labels[fmt]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-[20px] bg-[#f3f3f3] border border-[#e0e0e0] space-y-1">
              <span className="text-xs text-[#707070] font-bold block">1. ضريبة المخرجات (المبيعات والفواتير)</span>
              <strong className="text-2xl font-black text-[#141414] font-mono block">
                {stats.totalVatCollectedSAR.toLocaleString('ar-SA')} ر.س
              </strong>
              <span className="text-[11px] text-[#707070] block">
                إجمالي المبيعات شاملة الضريبة: {stats.totalInvoicedSalesSAR.toLocaleString('ar-SA')} ر.س ({zatcaInvoices.length} فاتورة)
              </span>
            </div>

            <div className="p-5 rounded-[20px] bg-[#f3f3f3] border border-[#e0e0e0] space-y-1">
              <span className="text-xs text-[#707070] font-bold block">2. ضريبة المدخلات المستردة (المشتريات والعُهد)</span>
              <strong className="text-2xl font-black text-[#141414] font-mono block">
                {stats.totalInputVatSAR.toLocaleString('ar-SA')} ر.س
              </strong>
              <span className="text-[11px] text-[#707070] block">
                إجمالي المصروفات وسندات الصرف: {stats.totalPaymentsSAR.toLocaleString('ar-SA')} ر.س
              </span>
            </div>

            <div className="p-5 rounded-[20px] bg-[#141414] text-white space-y-1">
              <span className="text-xs text-[#adadad] font-bold block">3. صافي الضريبة المستحقة للسداد لـ ZATCA</span>
              <strong className="text-2xl font-black text-white font-mono block">
                {stats.netVatPayableSAR.toLocaleString('ar-SA')} ر.س
              </strong>
              <span className="text-[11px] text-[#adadad] block">
                الرقم الضريبي الموحد: {settings.vatNumber}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODALS: NEW VOUCHER, VOUCHER PREVIEW, NEW CUSTODY, SETTLE, REPLENISH, CUSTODY PREVIEW
         ========================================================= */}
      {showNewVoucherModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateVoucher}
            className="w-full max-w-lg bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-4 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-base font-black text-[#141414]">إصدار سند قبض / صرف مالي جديد</h3>
              <button
                type="button"
                onClick={() => setShowNewVoucherModal(false)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#f3f3f3] rounded-full border border-[#e0e0e0]">
                {[
                  { id: 'receipt', label: 'سند قبض' },
                  { id: 'payment', label: 'سند صرف' },
                  { id: 'journal', label: 'قيد يومية' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      setVoucherForm(prev => ({
                        ...prev,
                        type: t.id as any,
                        accountCode: t.id === 'receipt' ? '4101' : t.id === 'payment' ? '5203' : '1104',
                        accountName:
                          t.id === 'receipt'
                            ? 'إيرادات مبيعات السيارات والصيانة'
                            : t.id === 'payment'
                            ? 'مصروفات تشغيل وصيانة الفروع'
                            : 'عُهد وسلف الموظفين'
                      }))
                    }
                    className={`py-2 rounded-full font-bold cursor-pointer ${
                      voucherForm.type === t.id ? 'bg-[#141414] text-white' : 'text-[#707070]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">اسم العميل / المستفيد *</label>
                <input
                  type="text"
                  required
                  value={voucherForm.partyName}
                  onChange={e => setVoucherForm(prev => ({ ...prev, partyName: e.target.value }))}
                  placeholder="الاسم الكامل للعميل أو الجهة المستفيدة"
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">البيان والتفاصيل المحاسبية *</label>
                <input
                  type="text"
                  required
                  value={voucherForm.description}
                  onChange={e => setVoucherForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="مثال: دفعة شراء سيارة / سداد فاتورة توريد قطع غيار..."
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#141414] block mb-1">المبلغ الإجمالي (ر.س) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={voucherForm.totalAmount}
                    onChange={e => setVoucherForm(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] font-mono focus:outline-none focus:border-[#141414]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#141414] block mb-1">طريقة الدفع</label>
                  <select
                    value={voucherForm.paymentMethod}
                    onChange={e => setVoucherForm(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] focus:outline-none focus:border-[#141414]"
                  >
                    <option value="bank_transfer">تحويل بنكي</option>
                    <option value="mada_pos">شبكة مدى / POS</option>
                    <option value="cash">نقدي خزينة</option>
                    <option value="cheque">شيك مصدق</option>
                    <option value="custody_deduction">خصم تسوية عهدة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#141414] block mb-1">مركز التكلفة / الفرع</label>
                  <input
                    type="text"
                    value={voucherForm.costCenter}
                    onChange={e => setVoucherForm(prev => ({ ...prev, costCenter: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] focus:outline-none focus:border-[#141414]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#141414] block mb-1">رقم الفاتورة / العهدة المرتبطة</label>
                  <input
                    type="text"
                    value={voucherForm.referenceNumber}
                    onChange={e => setVoucherForm(prev => ({ ...prev, referenceNumber: e.target.value }))}
                    placeholder="اختياري: SOL-INV-2026-..."
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] font-mono focus:outline-none focus:border-[#141414]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e0e0e0]">
              <button
                type="button"
                onClick={() => setShowNewVoucherModal(false)}
                className="px-4 py-2.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer"
              >
                اعتماد وترحيل السند
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Voucher Official Preview & Multi-Format Export Modal */}
      {selectedVoucherPreview && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#707070] block">{settings.companyNameAr} • الرقم الضريبي: {settings.vatNumber}</span>
                <h3 className="text-lg font-black text-[#141414]">
                  {selectedVoucherPreview.type === 'receipt' ? 'سند قبض مالي رسمي' : selectedVoucherPreview.type === 'payment' ? 'سند صرف مالي رسمي' : 'قيد يومية محاسبي'} — {selectedVoucherPreview.voucherNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVoucherPreview(null)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-[18px] bg-[#f3f3f3] border border-[#e0e0e0] text-xs">
              <div>
                <span className="text-[10px] text-[#707070] block">الطرف / المستفيد</span>
                <strong className="text-[#141414]">{selectedVoucherPreview.partyName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">التاريخ والوقت</span>
                <strong className="font-mono text-[#141414]">{selectedVoucherPreview.date}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">الحساب المحاسبي</span>
                <strong className="text-[#141414]">{selectedVoucherPreview.accountCode} — {selectedVoucherPreview.accountName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">طريقة الدفع والفرع</span>
                <strong className="text-[#141414]">{paymentMethodLabel(selectedVoucherPreview.paymentMethod)} • {selectedVoucherPreview.costCenter}</strong>
              </div>
            </div>

            <div className="p-4 rounded-[18px] bg-white border border-[#e0e0e0] space-y-2 text-xs">
              <span className="text-[10px] text-[#707070] block">البيان المحاسبي:</span>
              <p className="font-bold text-[#141414]">{selectedVoucherPreview.description}</p>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#e0e0e0]">
                <div>
                  <span className="text-[10px] text-[#707070] block">المبلغ الأساسي</span>
                  <strong className="font-mono text-[#141414]">{selectedVoucherPreview.baseAmount.toLocaleString('ar-SA')} ر.س</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#707070] block">ضريبة 15%</span>
                  <strong className="font-mono text-[#141414]">{selectedVoucherPreview.vatAmount.toLocaleString('ar-SA')} ر.س</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#707070] block">الإجمالي المعتمد</span>
                  <strong className="font-mono text-base font-black text-[#141414]">{selectedVoucherPreview.totalAmount.toLocaleString('ar-SA')} ر.س</strong>
                </div>
              </div>
            </div>

            {/* Export Single Voucher in All Formats */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e0e0e0]">
              <span className="text-xs font-bold text-[#707070]">تصدير هذا السند بصيغة:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['pdf_print', 'word', 'excel', 'xml', 'csv', 'json', 'html'] as ExportFormatType[]).map(fmt => {
                  const labels: Record<string, string> = {
                    pdf_print: 'طباعة / PDF',
                    word: 'Word .DOC',
                    excel: 'Excel .XLS',
                    xml: 'XML',
                    csv: 'CSV',
                    json: 'JSON',
                    html: 'HTML'
                  };
                  return (
                    <button
                      key={fmt}
                      onClick={() => handleExportSingleVoucher(selectedVoucherPreview, fmt)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${
                        fmt === 'pdf_print'
                          ? 'bg-[#141414] text-white'
                          : 'bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0]'
                      }`}
                    >
                      {labels[fmt]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Custody Modal */}
      {showNewCustodyModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustody}
            className="w-full max-w-lg bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-base font-black text-[#141414]">صرف عهدة مالية جديدة لموظف / فرع</h3>
              <button
                type="button"
                onClick={() => setShowNewCustodyModal(false)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#141414] block mb-1">اسم الموظف المستلم *</label>
                  <input
                    type="text"
                    required
                    value={custodyForm.employeeName}
                    onChange={e => setCustodyForm(prev => ({ ...prev, employeeName: e.target.value }))}
                    placeholder="مثال: م. خالد القحطاني"
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#141414] block mb-1">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={custodyForm.employeeRole}
                    onChange={e => setCustodyForm(prev => ({ ...prev, employeeRole: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#141414] block mb-1">نوع العهدة المالية</label>
                  <select
                    value={custodyForm.custodyType}
                    onChange={e => setCustodyForm(prev => ({ ...prev, custodyType: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                  >
                    <option value="permanent_petty_cash">عهدة نقدية مستديمة</option>
                    <option value="workshop_operations">عهدة تشغيل ورشة وصيانة</option>
                    <option value="showroom_hospitality">عهدة ضيافة ومعارض</option>
                    <option value="procurement_advance">سلفة مشتريات وتخليص</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#141414] block mb-1">سقف مبلغ العهدة (ر.س) *</label>
                  <input
                    type="number"
                    required
                    min={500}
                    value={custodyForm.allocatedAmount}
                    onChange={e => setCustodyForm(prev => ({ ...prev, allocatedAmount: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">الفرع / الإدارة</label>
                <input
                  type="text"
                  value={custodyForm.branchName}
                  onChange={e => setCustodyForm(prev => ({ ...prev, branchName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">ملاحظات والغرض من العهدة</label>
                <input
                  type="text"
                  value={custodyForm.notes}
                  onChange={e => setCustodyForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="تفاصيل الصرف والبنود المسموح بها..."
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e0e0e0]">
              <button
                type="button"
                onClick={() => setShowNewCustodyModal(false)}
                className="px-4 py-2.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer"
              >
                اعتماد وصرف العهدة
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Settle Expense from Custody Modal */}
      {selectedCustodyForSettle && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSettleSubmit}
            className="w-full max-w-md bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#707070] block">{selectedCustodyForSettle.custodyNumber}</span>
                <h3 className="text-base font-black text-[#141414]">تسوية مصروف / فاتورة من عهدة {selectedCustodyForSettle.employeeName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustodyForSettle(null)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-[16px] bg-[#f3f3f3] border border-[#e0e0e0] flex justify-between">
                <span className="text-[#707070]">الرصيد المتاح حالياً بالعهدة:</span>
                <strong className="font-mono text-[#141414]">{selectedCustodyForSettle.remainingBalance.toLocaleString('ar-SA')} ر.س</strong>
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">مبلغ الفاتورة / المصروف (ر.س) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={selectedCustodyForSettle.remainingBalance}
                  value={settleExpenseForm.amount}
                  onChange={e => setSettleExpenseForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[#141414] block mb-1">بيان الفاتورة أو المصروف *</label>
                <input
                  type="text"
                  required
                  value={settleExpenseForm.description}
                  onChange={e => setSettleExpenseForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="مثال: شراء مستلزمات صيانة سريعة بموجب فاتورة ضريبية..."
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e0e0e0]">
              <button
                type="button"
                onClick={() => setSelectedCustodyForSettle(null)}
                className="px-4 py-2.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer"
              >
                خصم من العهدة وإصدار سند صرف
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Replenish Custody Modal */}
      {selectedCustodyForReplenish && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleReplenishSubmit}
            className="w-full max-w-md bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-base font-black text-[#141414]">تغذية وزيادة رصيد العهدة ({selectedCustodyForReplenish.custodyNumber})</h3>
              <button
                type="button"
                onClick={() => setSelectedCustodyForReplenish(null)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#141414] block mb-1">مبلغ التغذية الإضافي (ر.س) *</label>
                <input
                  type="number"
                  required
                  min={500}
                  value={replenishAmount}
                  onChange={e => setReplenishAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-[16px] bg-[#f0f0f0] border border-[#e0e0e0] font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e0e0e0]">
              <button
                type="button"
                onClick={() => setSelectedCustodyForReplenish(null)}
                className="px-4 py-2.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-bold cursor-pointer"
              >
                اعتماد التغذية
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Custody Clearance & Multi-Format Export Modal */}
      {selectedCustodyPreview && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-[24px] p-6 border border-[#e0e0e0] space-y-5">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#707070] block">{settings.companyNameAr} • الإدارة المالية</span>
                <h3 className="text-lg font-black text-[#141414]">
                  محضر استلام وتسوية عهدة مالية — {selectedCustodyPreview.custodyNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustodyPreview(null)}
                className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#141414] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-[18px] bg-[#f3f3f3] border border-[#e0e0e0] text-xs">
              <div>
                <span className="text-[10px] text-[#707070] block">الموظف المستلم</span>
                <strong className="text-[#141414]">{selectedCustodyPreview.employeeName} ({selectedCustodyPreview.employeeRole})</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">الفرع / القسم</span>
                <strong className="text-[#141414]">{selectedCustodyPreview.branchName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">المبلغ المعتمد</span>
                <strong className="font-mono text-[#141414]">{selectedCustodyPreview.allocatedAmount.toLocaleString('ar-SA')} ر.س</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#707070] block">المصروف / المتبقي</span>
                <strong className="font-mono text-[#141414]">
                  مصروف: {selectedCustodyPreview.spentAmount.toLocaleString('ar-SA')} ر.س | متبقي: {selectedCustodyPreview.remainingBalance.toLocaleString('ar-SA')} ر.س
                </strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e0e0e0]">
              <span className="text-xs font-bold text-[#707070]">تصدير محضر العهدة بصيغة:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['pdf_print', 'word', 'excel', 'xml', 'csv', 'json'] as ExportFormatType[]).map(fmt => {
                  const labels: Record<string, string> = {
                    pdf_print: 'طباعة / PDF',
                    word: 'Word .DOC',
                    excel: 'Excel .XLS',
                    xml: 'XML',
                    csv: 'CSV',
                    json: 'JSON'
                  };
                  return (
                    <button
                      key={fmt}
                      onClick={() => handleExportSingleCustody(selectedCustodyPreview, fmt)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${
                        fmt === 'pdf_print'
                          ? 'bg-[#141414] text-white'
                          : 'bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0]'
                      }`}
                    >
                      {labels[fmt]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
