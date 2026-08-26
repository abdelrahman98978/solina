import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Car, 
  Plus, 
  Search, 
  Check, 
  Play, 
  Pause,
  Filter,
  FileCheck,
  Zap,
  Phone
} from 'lucide-react';
import { VEHICLES } from '../../data/toyotaData';

interface JobCard {
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
}

export const AdminWorkshopJobCardsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewJobCardModal, setShowNewJobCardModal] = useState(false);

  const [jobCards, setJobCards] = useState<JobCard[]>([
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
  ]);

  const [newCardForm, setNewCardForm] = useState({
    customerName: '',
    customerPhone: '',
    vehicleModel: 'سولينا كامري 2026 هايبرد',
    plateNumber: 'س ل ن 2026',
    serviceType: 'صيانة دورية سريعة 10,000 كم (45 دقيقة)',
    technicianName: 'م. أحمد المصري',
    bayNumber: 'المسار السريع #03',
    cost: 345
  });

  const handleCreateJobCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: JobCard = {
      id: `job-${Date.now()}`,
      cardNumber: `JC-2026-0${Math.floor(500 + Math.random() * 400)}`,
      customerName: newCardForm.customerName || 'عميل صيانة',
      customerPhone: newCardForm.customerPhone || '0500000000',
      vehicleModel: newCardForm.vehicleModel,
      plateNumber: newCardForm.plateNumber,
      vinNumber: 'JT3' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      mileage: 10000,
      serviceType: newCardForm.serviceType,
      technicianName: newCardForm.technicianName,
      bayNumber: newCardForm.bayNumber,
      status: 'in_progress',
      timeRemainingMinutes: 45,
      partsUsed: ['زيت سولينا أصلي', 'فلتر زيت OEM'],
      totalCost: newCardForm.cost
    };

    setJobCards(prev => [newCard, ...prev]);
    setShowNewJobCardModal(false);
  };

  const updateCardStatus = (id: string, newStatus: JobCard['status']) => {
    setJobCards(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredCards = jobCards.filter(c => {
    const matchesSearch = c.cardNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());
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
        return <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">تم التسليم للعميل</span>;
    }
  };

  return (
    <div className="space-y-6 text-start font-arabic">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-gray-900">إدارة أوامر العمل وورش الصيانة (Workshop & Job Cards)</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            متابعة خطوط الصيانة السريعة خلال 45 دقيقة، توزيع الفنيين، وصرف قطع الغيار الأصلية مع بطاقة الفحص المعتمدة.
          </p>
        </div>

        <button
          onClick={() => setShowNewJobCardModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>فتح كرت عمل صيانة جديد</span>
        </button>
      </div>

      {/* 2. KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">السيارات قيد الصيانة الآن</span>
          <div className="text-xl font-black text-amber-600">
            {jobCards.filter(c => c.status === 'in_progress' || c.status === 'quality_check').length} سيارات
          </div>
          <span className="text-[10px] text-gray-400 font-light">متوسط الإنجاز: 38 دقيقة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">جاهزة للتسليم للعميل</span>
          <div className="text-xl font-black text-emerald-600">
            {jobCards.filter(c => c.status === 'ready').length} سيارات
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">تم إرسال إشعار SMS</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إشغال مسارات الصيانة السريعة</span>
          <div className="text-xl font-black text-gray-900">85%</div>
          <span className="text-[10px] text-blue-600 font-bold">6 من 7 مسارات نشطة</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إيرادات الورشة اليومية</span>
          <div className="text-xl font-black text-red-600">
            {jobCards.reduce((acc, c) => acc + c.totalCost, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-gray-400 font-light">قطع غيار + أجور يد</span>
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
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'in_progress', 'quality_check', 'ready'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === st ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st === 'all' ? 'الكل' : st === 'in_progress' ? 'قيد العمل' : st === 'quality_check' ? 'فحص الجودة' : 'جاهزة للتسليم'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <div key={card.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">
                    {card.cardNumber}
                  </span>
                  {getStatusBadge(card.status)}
                </div>

                <div>
                  <h4 className="text-sm font-black text-gray-900">{card.vehicleModel}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>لوحة: <strong className="text-gray-800">{card.plateNumber}</strong></span>
                    <span>•</span>
                    <span>العداد: {card.mileage.toLocaleString('ar-SA')} كم</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl text-xs space-y-1 border border-gray-100">
                  <div className="font-bold text-red-600 text-[11px]">{card.serviceType}</div>
                  <div className="flex items-center justify-between text-gray-500 text-[10px]">
                    <span>الفني: <strong className="text-gray-800">{card.technicianName}</strong></span>
                    <span>المسار: <strong className="text-gray-800">{card.bayNumber}</strong></span>
                  </div>
                </div>

                {/* Parts Used */}
                <div className="space-y-1 text-[11px]">
                  <span className="text-gray-400 font-bold block text-[10px]">قطع الغيار المستخدمة:</span>
                  <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-[10px]">
                    {card.partsUsed.map((p, idx) => (
                      <li key={idx} className="line-clamp-1">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">إجمالي الفاتورة:</span>
                  <strong className="text-sm font-black text-red-600">{card.totalCost.toLocaleString('ar-SA')} ريال</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  {card.status === 'in_progress' && (
                    <button
                      onClick={() => updateCardStatus(card.id, 'quality_check')}
                      className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      إتمام العمل ➔ فحص الجودة
                    </button>
                  )}
                  {card.status === 'quality_check' && (
                    <button
                      onClick={() => updateCardStatus(card.id, 'ready')}
                      className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      اعتماد الجودة ➔ جاهزة للتسليم
                    </button>
                  )}
                  {card.status === 'ready' && (
                    <button
                      onClick={() => alert(`تم إرسال إشعار SMS للعميل ${card.customerName} على الرقم ${card.customerPhone} لاستلام سيارته ${card.vehicleModel}.`)}
                      className="w-full py-1.5 bg-gray-900 hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      📱 إرسال إشعار استلام للعميل
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. New Job Card Modal */}
      {showNewJobCardModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateJobCard} className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900">فتح كرت عمل صيانة سريع</h3>
              <button type="button" onClick={() => setShowNewJobCardModal(false)} className="p-1 text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">اسم العميل</label>
                <input
                  type="text"
                  required
                  value={newCardForm.customerName}
                  onChange={(e) => setNewCardForm(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="مثال: سلمان بن فهد"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">طراز السيارة</label>
                <select
                  value={newCardForm.vehicleModel}
                  onChange={(e) => setNewCardForm(prev => ({ ...prev, vehicleModel: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  {VEHICLES.map(v => (
                    <option key={v.id} value={`سولينا ${v.nameAr} 2026`}>
                      سولينا {v.nameAr} 2026
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">نوع الصيانة</label>
                <select
                  value={newCardForm.serviceType}
                  onChange={(e) => setNewCardForm(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  <option>صيانة دورية سريعة 10,000 كم (45 دقيقة)</option>
                  <option>صيانة شاملة 30,000 كم</option>
                  <option>فحص الفرامل والمكيف</option>
                  <option>تغيير زيوت وفلاتر أصلية</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
            >
              بدء أمر العمل في المسار السريع
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
