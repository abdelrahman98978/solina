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
    jobCards, 
    addJobCard, 
    updateJobCard,
    updateJobCardStatus, 
    deleteJobCard,
    convertJobCardToInvoice,
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
    if (newCardForm.selectedPartName) parts.push(newCardForm.selectedPartName);

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
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">تم الاستلام</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 animate-pulse">قيد العمل (45 دقيقة)</span>;
      case 'quality_check':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">فحص الجودة النهائي</span>;
      case 'ready':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">جاهزة للتسليم ✓</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">تم التسليم والفوترة</span>;
    }
  };

  return (
    <div className="space-y-6 text-start font-arabic animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0056B3] flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-gray-900">إدارة أوامر العمل وورش صيانة سولينا (Workshop & Job Cards)</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            متابعة خطوط الصيانة السريعة خلال 45 دقيقة، توزيع الفنيين، وصرف قطع الغيار الأصلية مع إصدار فاتورة ZATCA عند التسليم.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportDataToCSV('job_cards')}
            className="px-3.5 py-2.5 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>تصدير أوامر العمل (كل الصيغ)</span>
          </button>

          <button
            onClick={() => setShowNewJobCardModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#0056B3] hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>فتح كرت عمل صيانة جديد</span>
          </button>
        </div>
      </div>

      {/* 2. KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">السيارات قيد الصيانة الآن</span>
          <div className="text-xl font-black text-amber-600">
            {jobCards.filter(c => c.status === 'received' || c.status === 'in_progress' || c.status === 'quality_check').length} سيارات
          </div>
          <span className="text-[10px] text-gray-400 font-light">متوسط الإنجاز: 38 دقيقة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">جاهزة للتسليم للعميل</span>
          <div className="text-xl font-black text-emerald-600">
            {jobCards.filter(c => c.status === 'ready').length} سيارات
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">بانتظار الاستلام والفوترة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">تم تسليمها اليوم</span>
          <div className="text-xl font-black text-gray-900">
            {jobCards.filter(c => c.status === 'delivered').length} سيارات
          </div>
          <span className="text-[10px] text-blue-600 font-bold">مفوترة ومعتمدة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إيرادات الورشة المسجلة</span>
          <div className="text-xl font-black text-[#0056B3]">
            {jobCards.reduce((acc, c) => acc + c.totalCost, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-gray-400 font-light">قطع غيار سولينا + أجور يد</span>
        </div>
      </div>

      {/* 3. Job Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
          <div className="relative flex-1 w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم كرت العمل، اسم العميل، أو اللوحة..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0056B3]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
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
                  statusFilter === st.id ? 'bg-[#0056B3] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <div key={card.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md">
                    {card.cardNumber}
                  </span>
                  {getStatusBadge(card.status)}
                </div>

                <div>
                  <h4 className="text-sm font-black text-gray-900">{card.vehicleModel}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-0.5">
                    <span>العميل: <strong className="text-gray-800">{card.customerName}</strong></span>
                    <span className="font-mono">{card.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>لوحة: <strong className="text-gray-800">{card.plateNumber}</strong></span>
                    <span>•</span>
                    <span>العداد: {card.mileage.toLocaleString('ar-SA')} كم</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-gray-100">
                  <div className="font-bold text-[#141414] text-[11px]">{card.serviceType}</div>
                  <div className="flex items-center justify-between text-gray-500 text-[10px]">
                    <span>الفني: <strong className="text-gray-800">{card.technicianName}</strong></span>
                    <span>المسار: <strong className="text-gray-800">{card.bayNumber}</strong></span>
                  </div>

                  {/* 45-Minute Express Service Progress Bar */}
                  {card.status !== 'delivered' && (
                    <div className="pt-1.5 border-t border-gray-200/70 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-gray-600">مؤقت المسار السريع (45 دقيقة):</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono font-bold ${card.timeRemainingMinutes <= 10 ? 'mobbin-badge-popular' : 'text-[#141414]'}`}>
                            متبقي {card.timeRemainingMinutes} د
                          </span>
                          <button
                            type="button"
                            onClick={() => updateJobCard(card.id, { timeRemainingMinutes: Math.max(0, card.timeRemainingMinutes - 5) })}
                            className="px-1.5 py-0.5 rounded-full bg-white border border-gray-200 text-[9px] font-bold text-gray-700 hover:bg-[#141414] hover:text-white cursor-pointer"
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
                  <span className="text-gray-400 font-bold block text-[10px]">قطع الغيار والفحوصات المعتمدة:</span>
                  <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-[10px]">
                    {card.partsUsed.map((p, idx) => (
                      <li key={idx} className="line-clamp-1">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 border-t border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">إجمالي التكلفة:</span>
                  <strong className="text-sm font-black text-[#0056B3] font-mono">{card.totalCost.toLocaleString('ar-SA')} ريال</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  {card.status === 'received' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'in_progress')}
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      بدء العمل بالمسار
                    </button>
                  )}
                  {card.status === 'in_progress' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'quality_check')}
                      className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      إتمام العمل ➔ فحص الجودة
                    </button>
                  )}
                  {card.status === 'quality_check' && (
                    <button
                      onClick={() => updateJobCardStatus(card.id, 'ready')}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      اعتماد الجودة ➔ جاهزة للتسليم
                    </button>
                  )}
                  {card.status === 'ready' && (
                    <button
                      onClick={() => {
                        const inv = convertJobCardToInvoice(card.id);
                        if (inv && onNavigateTab) onNavigateTab('zatca');
                      }}
                      className="flex-1 py-1.5 bg-[#0056B3] hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>تسليم وإصدار فاتورة ZATCA</span>
                    </button>
                  )}
                  {card.status === 'delivered' && (
                    <span className="flex-1 py-1.5 bg-gray-100 text-emerald-700 text-[11px] font-bold rounded-xl text-center">
                      ✓ تم التسليم {card.invoiceId ? `(${card.invoiceId})` : ''}
                    </span>
                  )}

                  <button
                    onClick={() => setPreviewJobCard(card)}
                    className="p-1.5 rounded-xl bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white transition-colors cursor-pointer"
                    title="طباعة أمر الإصلاح"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setEditingJobCard({ ...card })}
                    className="p-1.5 rounded-xl bg-blue-50 hover:bg-[#0056B3] text-[#0056B3] hover:text-white transition-colors cursor-pointer"
                    title="تعديل"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`هل تريد حذف كرت العمل ${card.cardNumber}؟`)) deleteJobCard(card.id);
                    }}
                    className="p-1.5 rounded-xl bg-gray-100 hover:bg-red-600 text-gray-400 hover:text-white transition-colors cursor-pointer"
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
          <form onSubmit={handleCreateJobCard} className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900">فتح كرت عمل صيانة سريع — مركز خدمة سولينا</h3>
              <button type="button" onClick={() => setShowNewJobCardModal(false)} className="p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">اسم العميل:</label>
                  <input
                    type="text"
                    required
                    value={newCardForm.customerName}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="مثال: سلمان بن فهد"
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">رقم الجوال:</label>
                  <input
                    type="text"
                    required
                    value={newCardForm.customerPhone}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">طراز السيارة:</label>
                  <select
                    value={newCardForm.vehicleModel}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, vehicleModel: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-bold"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.nameAr}>{v.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">رقم اللوحة:</label>
                  <input
                    type="text"
                    value={newCardForm.plateNumber}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, plateNumber: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">نوع الصيانة:</label>
                  <select
                    value={newCardForm.serviceType}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option>صيانة دورية سريعة 10,000 كم (45 دقيقة)</option>
                    <option>صيانة دورية 20,000 كم</option>
                    <option>صيانة شاملة 40,000 كم</option>
                    <option>فحص الفرامل والمكيف</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">إضافة قطعة غيار من المخزون:</label>
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
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
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
                  <label className="font-bold text-gray-700 block mb-1">الفني المسؤول:</label>
                  <select
                    value={newCardForm.technicianName}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, technicianName: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option>م. أحمد المصري</option>
                    <option>م. خالد السبيعي</option>
                    <option>م. يوسف القحطاني</option>
                    <option>م. أحمد الشريف</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">مسار الورشة:</label>
                  <select
                    value={newCardForm.bayNumber}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, bayNumber: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                  >
                    <option>المسار السريع #01</option>
                    <option>المسار السريع #02</option>
                    <option>المسار السريع #03</option>
                    <option>المسار المتقدم #05</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">التكلفة (ر.س):</label>
                  <input
                    type="number"
                    value={newCardForm.cost}
                    onChange={(e) => setNewCardForm(prev => ({ ...prev, cost: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-mono font-bold text-[#0056B3]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0056B3] hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
            >
              بدء أمر العمل في المسار السريع
            </button>
          </form>
        </div>
      )}

      {/* 5. Edit Job Card Modal */}
      {editingJobCard && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditCard} className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900">تعديل أمر العمل: {editingJobCard.cardNumber}</h3>
              <button type="button" onClick={() => setEditingJobCard(null)} className="p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  value={editingJobCard.customerName}
                  onChange={(e) => setEditingJobCard({ ...editingJobCard, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">الفني المسؤول:</label>
                  <input
                    type="text"
                    value={editingJobCard.technicianName}
                    onChange={(e) => setEditingJobCard({ ...editingJobCard, technicianName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">المسار:</label>
                  <input
                    type="text"
                    value={editingJobCard.bayNumber}
                    onChange={(e) => setEditingJobCard({ ...editingJobCard, bayNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">إجمالي التكلفة (ر.س):</label>
                <input
                  type="number"
                  value={editingJobCard.totalCost}
                  onChange={(e) => setEditingJobCard({ ...editingJobCard, totalCost: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 font-mono font-bold text-[#0056B3]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="flex-1 py-2.5 bg-[#0056B3] text-white font-bold rounded-xl cursor-pointer">
                حفظ التعديلات
              </button>
              <button type="button" onClick={() => setEditingJobCard(null)} className="px-4 py-2.5 bg-gray-100 rounded-xl font-bold text-gray-700 cursor-pointer">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Print / Preview Job Card Modal */}
      {previewJobCard && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <img src="/solina-logo.png" alt="سولينا" className="h-8 w-auto" />
                <div>
                  <h3 className="font-black text-gray-900 text-sm">بطاقة أمر إصلاح وصيانة — سولينا للسيارات</h3>
                  <span className="text-[10px] font-mono text-gray-500">{previewJobCard.cardNumber}</span>
                </div>
              </div>
              <button onClick={() => setPreviewJobCard(null)} className="p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-400 block text-[10px]">العميل والجوال:</span>
                <strong className="text-gray-900">{previewJobCard.customerName} ({previewJobCard.customerPhone})</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">المركبة واللوحة:</span>
                <strong className="text-gray-900">{previewJobCard.vehicleModel} — {previewJobCard.plateNumber}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">المهندس والمسار:</span>
                <strong className="text-[#0056B3]">{previewJobCard.technicianName} ({previewJobCard.bayNumber})</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">قراءة العداد:</span>
                <strong className="font-mono">{previewJobCard.mileage.toLocaleString('ar-SA')} كم</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 space-y-2">
              <div className="font-bold text-gray-900">{previewJobCard.serviceType}</div>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {previewJobCard.partsUsed.map((part, i) => (
                  <li key={i}>{part}</li>
                ))}
              </ul>
              <div className="flex justify-between pt-2 border-t border-gray-100 text-sm">
                <strong>إجمالي أمر العمل (شامل الضريبة):</strong>
                <strong className="font-mono text-[#0056B3] font-black">{previewJobCard.totalCost.toLocaleString('ar-SA')} ريال</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة كرت العمل</span>
              </button>
              <a
                href={`tel:${previewJobCard.customerPhone}`}
                className="px-4 py-2 bg-[#0056B3] text-white font-bold rounded-xl flex items-center gap-1.5"
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
