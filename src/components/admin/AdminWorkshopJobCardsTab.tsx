import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Phone,
  Download,
  Trash2,
  Edit3,
  Printer,
  QrCode,
  X,
  CheckCircle2
} from 'lucide-react';
import { useAdminData, JobCard } from '../../context/AdminDataContext';
import { AdminTabType, LeadsSubTabType } from './AdminDashboard';

interface AdminWorkshopJobCardsTabProps {
  onNavigateTab?: (tab: AdminTabType | LeadsSubTabType) => void;
}

export const AdminWorkshopJobCardsTab: React.FC<AdminWorkshopJobCardsTabProps> = ({ onNavigateTab }) => {
  const { 
    vehicles, 
    spareParts,
    adjustPartQuantity,
    jobCards, 
    addJobCard, 
    updateJobCard,
    updateJobCardStatus, 
    deleteJobCard,
    convertJobCardToInvoice,
    exportSingleDocument,
    exportDataToCSV 
  } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewJobCardModal, setShowNewJobCardModal] = useState(false);
  const [editingJobCard, setEditingJobCard] = useState<JobCard | null>(null);
  const [previewJobCard, setPreviewJobCard] = useState<JobCard | null>(null);

  const [newCardForm, setNewCardForm] = useState({
    customerName: '',
    customerPhone: '',
    vehicleModel: 'سولينا كامري 2026 هايبرد',
    plateNumber: 'س ل ن 2026',
    mileage: 10000,
    serviceType: 'صيانة دورية سريعة 10,000 كم (45 دقيقة)',
    technicianName: 'م. أحمد المصري',
    bayNumber: 'المسار السريع #03',
    cost: 345,
    selectedPartName: ''
  });

  const handleCreateJobCard = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = ['زيت سولينا تخليقي بالكامل 0W-20', 'فلتر زيت سولينا الأصلي OEM'];
    if (newCardForm.selectedPartName) {
      parts.push(newCardForm.selectedPartName);
      const matchedPart = spareParts.find(p => p.nameAr === newCardForm.selectedPartName);
      if (matchedPart) {
        adjustPartQuantity(matchedPart.id, -1);
      }
    }

    addJobCard({
      customerName: newCardForm.customerName || 'عميل صيانة سولينا',
      customerPhone: newCardForm.customerPhone || '0500000000',
      vehicleModel: newCardForm.vehicleModel,
      plateNumber: newCardForm.plateNumber,
      vinNumber: 'JT3' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      mileage: Number(newCardForm.mileage),
      serviceType: newCardForm.serviceType,
      technicianName: newCardForm.technicianName,
      bayNumber: newCardForm.bayNumber,
      status: 'in_progress',
      timeRemainingMinutes: 45,
      partsUsed: parts,
      totalCost: Number(newCardForm.cost)
    });

    setShowNewJobCardModal(false);
    setNewCardForm(prev => ({ ...prev, customerName: '', customerPhone: '' }));
  };

  const handleSaveEditCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJobCard) return;
    updateJobCard(editingJobCard.id, editingJobCard);
    setEditingJobCard(null);
  };

  const filteredCards = jobCards.filter(c => {
    const matchesSearch = c.cardNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: JobCard['status']) => {
    switch (status) {
      case 'received':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[10px] font-bold border border-[#e0e0e0]">تم الاستلام</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[10px] font-bold border border-[#e0e0e0] animate-pulse">قيد العمل (45 دقيقة)</span>;
      case 'quality_check':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[10px] font-bold border border-[#e0e0e0]">فحص الجودة النهائي</span>;
      case 'ready':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] text-[10px] font-bold border border-[#e0e0e0]">جاهزة للتسليم</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#f0f0f0] text-[#707070] text-[10px] font-bold">تم التسليم والفوترة</span>;
    }
  };

  return (
    <div className="space-y-6 text-start font-arabic animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-[#141414]">إدارة أوامر العمل وورش صيانة سولينا السريعة</h2>
          </div>
          <p className="text-xs text-[#707070] mt-1">
            متابعة خطوط الصيانة السريعة خلال 45 دقيقة، توزيع الفنيين، وصرف قطع الغيار الأصلية مع إصدار فاتورة ضريبية معتمدة عند التسليم.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportDataToCSV('job_cards')}
            className="px-3.5 py-2.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير أوامر العمل (10 صيغ)</span>
          </button>
          {(['excel', 'word', 'xml', 'csv'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => exportDataToCSV('job_cards', fmt)}
              className="px-3 py-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[11px] font-bold uppercase cursor-pointer transition-colors"
            >
              {fmt === 'excel' ? 'XLS' : fmt === 'word' ? 'DOC' : fmt.toUpperCase()}
            </button>
          ))}

          <button
            onClick={() => setShowNewJobCardModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#141414] hover:bg-black active:scale-95 text-white text-xs font-bold shadow-none  flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>فتح كرت عمل صيانة جديد</span>
          </button>
        </div>
      </div>

      {/* 2. KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">السيارات قيد الصيانة الآن</span>
          <div className="text-xl font-black text-[#141414]">
            {jobCards.filter(c => c.status === 'received' || c.status === 'in_progress' || c.status === 'quality_check').length} سيارات
          </div>
          <span className="text-[10px] text-[#adadad] font-light">متوسط الإنجاز: 38 دقيقة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">جاهزة للتسليم للعميل</span>
          <div className="text-xl font-black text-[#141414]">
            {jobCards.filter(c => c.status === 'ready').length} سيارات
          </div>
          <span className="text-[10px] text-[#141414] font-bold">بانتظار الاستلام والفوترة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">تم تسليمها اليوم</span>
          <div className="text-xl font-black text-[#141414]">
            {jobCards.filter(c => c.status === 'delivered').length} سيارات
          </div>
          <span className="text-[10px] text-[#141414] font-bold">مفوترة ومعتمدة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">إيرادات الورشة المسجلة</span>
          <div className="text-xl font-black text-[#141414]">
            {jobCards.reduce((acc, c) => acc + c.totalCost, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-[#adadad] font-light">قطع غيار سولينا + أجور يد</span>
        </div>
      </div>

      {/* 3. Job Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e0e0e0]">
          <div className="relative flex-1 w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم كرت العمل، اسم العميل، أو اللوحة..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-[#f3f3f3] border border-[#e0e0e0] text-xs font-medium text-[#141414] placeholder-gray-400 focus:outline-none focus:border-[#141414]"
            />
            <Search className="w-4 h-4 text-[#adadad] absolute right-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'in_progress', label: 'قيد العمل' },
              { id: 'quality_check', label: 'فحص الجودة' },
              { id: 'ready', label: 'جاهزة للتسليم' },
              { id: 'delivered', label: 'تم التسليم' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === st.id ? 'bg-[#141414] text-white' : 'bg-[#f0f0f0] text-[#707070] hover:bg-[#e0e0e0]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <div key={card.id} className="bg-white rounded-3xl p-5 border border-[#e0e0e0] shadow-none space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-[#141414] bg-[#f0f0f0] px-2.5 py-0.5 rounded-md">
                    {card.cardNumber}
                  </span>
                  {getStatusBadge(card.status)}
                </div>

                <div>
                  <h4 className="text-sm font-black text-[#141414]">{card.vehicleModel}</h4>
                  <div className="flex items-center justify-between text-xs text-[#707070] mt-0.5">
                    <span>العميل: <strong className="text-[#141414]">{card.customerName}</strong></span>
                    <span className="font-mono">{card.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#707070] mt-0.5">
                    <span>لوحة: <strong className="text-[#141414]">{card.plateNumber}</strong></span>
                    <span>•</span>
                    <span>العداد: {card.mileage.toLocaleString('ar-SA')} كم</span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#f3f3f3] rounded-xl text-xs space-y-1.5 border border-[#e0e0e0]">
                  <div className="font-bold text-[#141414] text-[11px]">{card.serviceType}</div>
                  <div className="flex items-center justify-between text-[#707070] text-[10px]">
                    <span>الفني: <strong className="text-[#141414]">{card.technicianName}</strong></span>
                    <span>المسار: <strong className="text-[#141414]">{card.bayNumber}</strong></span>
                  </div>

                  {/* 45-Minute Express Service Progress Bar */}
                  {card.status !== 'delivered' && (
                    <div className="pt-1.5 border-t border-[#e0e0e0] space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#707070]">مؤقت المسار السريع (45 دقيقة):</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono font-bold ${card.timeRemainingMinutes <= 10 ? 'mobbin-badge-popular' : 'text-[#141414]'}`}>
                            متبقي {card.timeRemainingMinutes} د
                          </span>
                          <button
                            type="button"
                            onClick={() => updateJobCard(card.id, { timeRemainingMinutes: Math.max(0, card.timeRemainingMinutes - 5) })}
                            className="px-1.5 py-0.5 rounded-full bg-white border border-[#e0e0e0] text-[9px] font-bold text-[#707070] hover:bg-[#141414] hover:text-white cursor-pointer"
                            title="تقدم 5 دقائق"
                          >
                            -5 د
                          </button>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#141414] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(8, Math.round(((45 - card.timeRemainingMinutes) / 45) * 100)))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Parts Used */}
                <div className="space-y-1 text-[11px]">
                  <span className="text-[#adadad] font-bold block text-[10px]">قطع الغيار والفحوصات المعتمدة:</span>
                  <ul className="list-disc list-inside text-[#707070] space-y-0.5 text-[10px]">
                    {card.partsUsed.map((p, idx) => (
                      <li key={idx} className="line-clamp-1">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 border-t border-[#e0e0e0] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#adadad]">إجمالي التكلفة:</span>
                  <strong className="text-sm font-black text-[#141414] font-mono">{card.totalCost.toLocaleString('ar-SA')} ريال</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  {card.status === 'received' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'in_progress')}
                      className="flex-1 py-1.5 bg-[#141414] hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-none cursor-pointer"
                    >
                      بدء العمل بالمسار
                    </button>
                  )}
                  {card.status === 'in_progress' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'quality_check')}
                      className="flex-1 py-1.5 bg-[#141414] hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-none cursor-pointer"
                    >
                      إتمام العمل - فحص الجودة
                    </button>
                  )}
                  {card.status === 'quality_check' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'ready')}
                      className="flex-1 py-1.5 bg-[#141414] hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-none cursor-pointer"
                    >
                      اعتماد الجودة - جاهزة للتسليم
                    </button>
                  )}
                  {card.status === 'ready' && (
                    <button
                      onClick={() => {
                        const inv = convertJobCardToInvoice(card.id);
                        if (inv && onNavigateTab) onNavigateTab('zatca');
                      }}
                      className="flex-1 py-1.5 bg-[#141414] hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-none cursor-pointer flex items-center justify-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>تسليم وإصدار فاتورة ZATCA</span>
                    </button>
                  )}
                  {card.status === 'delivered' && (
                    <span className="flex-1 py-1.5 bg-[#f0f0f0] text-[#141414] text-[11px] font-bold rounded-xl text-center">
                      تم التسليم {card.invoiceId ? `(${card.invoiceId})` : ''}
                    </span>
                  )}

                  <button
                    onClick={() => setPreviewJobCard(card)}
                    className="p-1.5 rounded-xl bg-[#f0f0f0] hover:bg-black text-[#707070] hover:text-white transition-colors cursor-pointer"
                    title="طباعة أمر الإصلاح"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setEditingJobCard({ ...card })}
                    className="p-1.5 rounded-xl bg-[#f3f3f3] hover:bg-[#141414] text-[#141414] hover:text-white transition-colors cursor-pointer"
                    title="تعديل"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`هل تريد حذف كرت العمل ${card.cardNumber}؟`)) deleteJobCard(card.id);
                    }}
                    className="p-1.5 rounded-xl bg-[#f0f0f0] hover:bg-red-600 text-[#adadad] hover:text-white transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. New Job Card Modal */}
      {showNewJobCardModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateJobCard} className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-sm font-black text-[#141414]">فتح كرت عمل صيانة سريع — مركز خدمة سولينا</h3>
              <button type="button" onClick={() => setShowNewJobCardModal(false)} className="p-1 text-[#adadad]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">اسم العميل:</label>
                  <input
                    type="text"
                    required
                    value={newCardForm.customerName}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="مثال: سلمان بن فهد"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">رقم الجوال:</label>
                  <input
                    type="text"
                    required
                    value={newCardForm.customerPhone}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="font-bold text-[#707070] block mb-1">طراز السيارة:</label>
                  <select
                    value={newCardForm.vehicleModel}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, vehicleModel: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white font-bold"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.nameAr}>{v.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">رقم اللوحة:</label>
                  <input
                    type="text"
                    value={newCardForm.plateNumber}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, plateNumber: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">نوع الصيانة:</label>
                  <select
                    value={newCardForm.serviceType}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    <option>صيانة دورية سريعة 10,000 كم (45 دقيقة)</option>
                    <option>صيانة دورية 20,000 كم</option>
                    <option>صيانة شاملة 40,000 كم</option>
                    <option>فحص الفرامل والمكيف</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">إضافة قطعة غيار من المخزون:</label>
                  <select
                    value={newCardForm.selectedPartName}
                    onChange={(e) => {
                      const found = spareParts.find(p => p.nameAr === e.target.value);
                      setNewCardForm(prev => ({
                        ...prev,
                        selectedPartName: e.target.value,
                        cost: found ? 345 + found.price : prev.cost
                      }));
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    <option value="">بدون قطع إضافية</option>
                    {spareParts.map(p => (
                      <option key={p.id} value={p.nameAr}>{p.nameAr} (+{p.price} ر.س)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الفني المسؤول:</label>
                  <select
                    value={newCardForm.technicianName}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, technicianName: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    <option>م. أحمد المصري</option>
                    <option>م. خالد السبيعي</option>
                    <option>م. يوسف القحطاني</option>
                    <option>م. أحمد الشريف</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">مسار الورشة:</label>
                  <select
                    value={newCardForm.bayNumber}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, bayNumber: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    <option>المسار السريع #01</option>
                    <option>المسار السريع #02</option>
                    <option>المسار السريع #03</option>
                    <option>المسار المتقدم #05</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">التكلفة (ر.س):</label>
                  <input
                    type="number"
                    value={newCardForm.cost}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, cost: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-bold text-[#141414]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#141414] hover:bg-black text-white text-xs font-black rounded-xl shadow-none cursor-pointer"
            >
              بدء أمر العمل في المسار السريع
            </button>
          </form>
        </div>
      )}

      {/* 5. Edit Job Card Modal */}
      {editingJobCard && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditCard} className="w-full max-w-md bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-sm font-black text-[#141414]">تعديل أمر العمل: {editingJobCard.cardNumber}</h3>
              <button type="button" onClick={() => setEditingJobCard(null)} className="p-1 text-[#adadad]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-[#707070] block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  value={editingJobCard.customerName}
                  onChange={(e) => setEditingJobCard({ ...editingJobCard, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الفني المسؤول:</label>
                  <input
                    type="text"
                    value={editingJobCard.technicianName}
                    onChange={(e) => setEditingJobCard({ ...editingJobCard, technicianName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">المسار:</label>
                  <input
                    type="text"
                    value={editingJobCard.bayNumber}
                    onChange={(e) => setEditingJobCard({ ...editingJobCard, bayNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-[#707070] block mb-1">إجمالي التكلفة (ر.س):</label>
                <input
                  type="number"
                  value={editingJobCard.totalCost}
                  onChange={(e) => setEditingJobCard({ ...editingJobCard, totalCost: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-bold text-[#141414]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="flex-1 py-2.5 bg-[#141414] text-white font-bold rounded-xl cursor-pointer">
                حفظ التعديلات
              </button>
              <button type="button" onClick={() => setEditingJobCard(null)} className="px-4 py-2.5 bg-[#f0f0f0] rounded-xl font-bold text-[#707070] cursor-pointer">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Print / Preview Job Card Modal */}
      {previewJobCard && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <div className="flex items-center gap-2">
                <img src="/solina-logo.png" alt="سولينا" className="h-8 w-auto" />
                <div>
                  <h3 className="font-black text-[#141414] text-sm">بطاقة أمر إصلاح وصيانة — سولينا للسيارات</h3>
                  <span className="text-[10px] font-mono text-[#707070]">{previewJobCard.cardNumber}</span>
                </div>
              </div>
              <button onClick={() => setPreviewJobCard(null)} className="p-1 text-[#adadad]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-[#f3f3f3] rounded-2xl border border-[#e0e0e0]">
              <div>
                <span className="text-[#adadad] block text-[10px]">العميل والجوال:</span>
                <strong className="text-[#141414]">{previewJobCard.customerName} ({previewJobCard.customerPhone})</strong>
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">المركبة واللوحة:</span>
                <strong className="text-[#141414]">{previewJobCard.vehicleModel} — {previewJobCard.plateNumber}</strong>
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">المهندس والمسار:</span>
                <strong className="text-[#141414]">{previewJobCard.technicianName} ({previewJobCard.bayNumber})</strong>
              </div>
              <div>
                <span className="text-[#adadad] block text-[10px]">قراءة العداد:</span>
                <strong className="font-mono">{previewJobCard.mileage.toLocaleString('ar-SA')} كم</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[#e0e0e0] space-y-2">
              <div className="font-bold text-[#141414]">{previewJobCard.serviceType}</div>
              <ul className="list-disc list-inside text-[#707070] space-y-1">
                {previewJobCard.partsUsed.map((part, i) => (
                  <li key={i}>{part}</li>
                ))}
              </ul>
              <div className="flex justify-between pt-2 border-t border-[#e0e0e0] text-sm">
                <strong>إجمالي أمر العمل (شامل الضريبة):</strong>
                <strong className="font-mono text-[#141414] font-black">{previewJobCard.totalCost.toLocaleString('ar-SA')} ريال</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              {(['word', 'excel', 'xml', 'csv'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() =>
                    exportSingleDocument(
                      'بطاقة أمر إصلاح وصيانة — سولينا للسيارات',
                      previewJobCard.cardNumber,
                      [
                        ['اسم العميل', previewJobCard.customerName],
                        ['رقم الجوال', previewJobCard.customerPhone],
                        ['المركبة واللوحة', `${previewJobCard.vehicleModel} (${previewJobCard.plateNumber})`],
                        ['قراءة العداد', `${previewJobCard.mileage.toLocaleString('ar-SA')} كم`],
                        ['المهندس المسؤول', previewJobCard.technicianName],
                        ['مسار الخدمة', previewJobCard.bayNumber]
                      ],
                      ['نوع الصيانة', 'قطع الغيار والفحوصات المعتمدة', 'إجمالي التكلفة شامل الضريبة (ر.س)'],
                      [[
                        previewJobCard.serviceType,
                        previewJobCard.partsUsed.join(' • '),
                        previewJobCard.totalCost.toLocaleString('ar-SA')
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
                    'بطاقة أمر إصلاح وصيانة — سولينا للسيارات',
                    previewJobCard.cardNumber,
                    [
                      ['اسم العميل', previewJobCard.customerName],
                      ['رقم الجوال', previewJobCard.customerPhone],
                      ['المركبة واللوحة', `${previewJobCard.vehicleModel} (${previewJobCard.plateNumber})`],
                      ['قراءة العداد', `${previewJobCard.mileage.toLocaleString('ar-SA')} كم`],
                      ['المهندس المسؤول', previewJobCard.technicianName],
                      ['مسار الخدمة', previewJobCard.bayNumber]
                    ],
                    ['نوع الصيانة', 'قطع الغيار والفحوصات المعتمدة', 'إجمالي التكلفة شامل الضريبة (ر.س)'],
                    [[
                      previewJobCard.serviceType,
                      previewJobCard.partsUsed.join(' • '),
                      previewJobCard.totalCost.toLocaleString('ar-SA')
                    ]],
                    'pdf_print'
                  )
                }
                className="px-4 py-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#141414] font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة كرت العمل PDF</span>
              </button>
              <a
                href={`tel:${previewJobCard.customerPhone}`}
                className="px-4 py-2 bg-[#141414] text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>الاتصال بالعميل</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
