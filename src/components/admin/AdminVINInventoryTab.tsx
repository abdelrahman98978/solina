import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldAlert, 
  QrCode,
  Tag,
  Warehouse
} from 'lucide-react';
import { VEHICLES } from '../../data/toyotaData';

interface VehicleStockItem {
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

export const AdminVINInventoryTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [stockList, setStockList] = useState<VehicleStockItem[]>([
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
      daysInInventory: 9,
      arrivalDate: '2026-08-17'
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
      daysInInventory: 5,
      arrivalDate: '2026-08-21'
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
  ]);

  const [newCarForm, setNewCarForm] = useState({
    model: 'سولينا كامري 2026',
    trim: 'GLX 2026',
    color: 'أبيض لؤلؤي',
    location: 'صالة الرياض - المعرض الرئيسي',
    price: 105450
  });

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    const item: VehicleStockItem = {
      id: `stk-${Date.now()}`,
      vin: 'JT3' + Math.random().toString(36).substring(2, 12).toUpperCase(),
      model: newCarForm.model,
      category: 'سيدان',
      trim: newCarForm.trim,
      color: newCarForm.color,
      engine: '2.5L Dual VVT-i',
      location: newCarForm.location,
      status: 'in_stock',
      price: newCarForm.price,
      daysInInventory: 1,
      arrivalDate: new Date().toISOString().substring(0, 10)
    };
    setStockList(prev => [item, ...prev]);
    setShowAddModal(false);
  };

  const filteredStock = stockList.filter(s => {
    const matchesSearch = s.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || s.location.includes(locationFilter);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const getStatusBadge = (status: VehicleStockItem['status']) => {
    switch (status) {
      case 'in_stock':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">جاهزة للتسليم بالمستودع</span>;
      case 'reserved':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">محجوزة لعميل تمويل</span>;
      case 'in_transit':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 animate-pulse">في الشحن والتوريد</span>;
      case 'sold':
        return <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">تم البيع والتسليم</span>;
    }
  };

  return (
    <div className="space-y-6 text-start font-arabic">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Warehouse className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-gray-900">إدارة مخزون الأسطول ورقم الشاسيه (VIN Inventory Tracker)</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            متابعة فورية لحركة السيارات الجديدة بالمستودعات المركزية وصالات العرض وتتبع رقم الشاسيه والتوريد.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شحنة / مركبة بالـ VIN</span>
        </button>
      </div>

      {/* Stock KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">إجمالي السيارات في المخزون</span>
          <div className="text-xl font-black text-gray-900">{stockList.length} سيارة</div>
          <span className="text-[10px] text-emerald-600 font-bold">جاهزة للبيع الفوري</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">قيمة المخزون الإجمالية</span>
          <div className="text-xl font-black text-red-600">
            {stockList.reduce((acc, s) => acc + s.price, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-gray-400 font-light">أسطول موديلات 2026</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">السيارات المحجوزة</span>
          <div className="text-xl font-black text-amber-600">
            {stockList.filter(s => s.status === 'reserved').length} سيارة
          </div>
          <span className="text-[10px] text-amber-600 font-bold">بانتظار موافقة البنك</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-gray-500">شحنات في الطريق (In-Transit)</span>
          <div className="text-xl font-black text-blue-600">
            {stockList.filter(s => s.status === 'in_transit').length} سيارة
          </div>
          <span className="text-[10px] text-gray-400 font-light">تصل خلال 48 ساعة</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم الشاسيه VIN، الموديل، أو اللون..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-2 rounded-xl border border-gray-200 text-xs bg-white"
            >
              <option value="all">كافة الفروع والمستودعات</option>
              <option value="الرياض">فروع ومستودع الرياض</option>
              <option value="جدة">فروع ومستودع جدة</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">رقم الشاسيه VIN</th>
                <th className="p-3">الموديل والفئة</th>
                <th className="p-3">اللون والمحرك</th>
                <th className="p-3">الموقع الحالي</th>
                <th className="p-3">السعر الرسمي</th>
                <th className="p-3">حالة المخزون</th>
                <th className="p-3">تاريخ الوصول</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredStock.map((car) => (
                <tr key={car.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-900">{car.vin}</td>
                  <td className="p-3">
                    <div className="font-bold text-gray-900">{car.model}</div>
                    <span className="text-[10px] text-gray-500">{car.trim}</span>
                  </td>
                  <td className="p-3">
                    <div className="text-gray-800 font-bold">{car.color}</div>
                    <span className="text-[10px] text-gray-400">{car.engine}</span>
                  </td>
                  <td className="p-3 flex items-center gap-1 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{car.location}</span>
                  </td>
                  <td className="p-3 font-black text-red-600">{car.price.toLocaleString('ar-SA')} ريال</td>
                  <td className="p-3">{getStatusBadge(car.status)}</td>
                  <td className="p-3 text-gray-500 font-mono">{car.arrivalDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddStock} className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900">تسجيل مركبة جديدة في المخزون بالـ VIN</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">طراز السيارة</label>
                <select
                  value={newCarForm.model}
                  onChange={(e) => setNewCarForm(prev => ({ ...prev, model: e.target.value }))}
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
                <label className="font-bold text-gray-700 block mb-1">اللون الخارجي</label>
                <input
                  type="text"
                  required
                  value={newCarForm.color}
                  onChange={(e) => setNewCarForm(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="مثال: أبيض لؤلؤي كريستالي"
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">موقع التخزين / صالة العرض</label>
                <select
                  value={newCarForm.location}
                  onChange={(e) => setNewCarForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white"
                >
                  <option>صالة الرياض - المعرض الرئيسي (طريق خريص)</option>
                  <option>صالة جدة - طريق الملك عبد العزيز</option>
                  <option>المستودع المركزي - الرياض</option>
                  <option>مستودع التوزيع الإقليمي - الدمام</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
            >
              توليد رقم VIN وحفظ في المخزون
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
