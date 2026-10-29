import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  QrCode,
  Warehouse,
  Download,
  Edit3,
  Trash2,
  X,
  Printer,
  RefreshCw
} from 'lucide-react';
import { useAdminData, VehicleStockItem } from '../../context/AdminDataContext';

export const AdminVINInventoryTab: React.FC = () => {
  const { 
    vehicles, 
    vinStock, 
    stats,
    addVinStock, 
    updateVinStock, 
    updateVinStatus, 
    transferVinBranch,
    deleteVinStock, 
    addZatcaInvoice,
    exportSingleDocument,
    exportDataToCSV 
  } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStock, setEditingStock] = useState<VehicleStockItem | null>(null);
  const [selectedVinSticker, setSelectedVinSticker] = useState<VehicleStockItem | null>(null);

  const [newCarForm, setNewCarForm] = useState({
    vin: 'JT3' + Math.random().toString(36).substring(2, 12).toUpperCase(),
    model: 'سولينا كامري 2026 هايبرد',
    category: 'سيدان',
    trim: 'Grande HEV 2026',
    color: 'أبيض لؤلؤي كريستالي',
    engine: '2.5L 4-Cyl Hybrid (225 HP)',
    location: 'صالة الرياض - المعرض الرئيسي',
    status: 'in_stock' as VehicleStockItem['status'],
    price: 135450
  });

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    addVinStock({
      vin: newCarForm.vin || ('JT3' + Math.random().toString(36).substring(2, 12).toUpperCase()),
      model: newCarForm.model,
      category: newCarForm.category,
      trim: newCarForm.trim,
      color: newCarForm.color,
      engine: newCarForm.engine,
      location: newCarForm.location,
      status: newCarForm.status,
      price: Number(newCarForm.price),
      daysInInventory: 1,
      arrivalDate: new Date().toISOString().substring(0, 10)
    });
    setShowAddModal(false);
    setNewCarForm(prev => ({
      ...prev,
      vin: 'JT3' + Math.random().toString(36).substring(2, 12).toUpperCase()
    }));
  };

  const handleSaveEditStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStock) return;
    updateVinStock(editingStock.id, editingStock);
    setEditingStock(null);
  };

  const filteredStock = vinStock.filter(s => {
    const matchesSearch = s.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.trim.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || s.location.includes(locationFilter);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  return (
    <div className="space-y-6 text-start font-arabic animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#f3f3f3] text-[#141414] flex items-center justify-center font-bold">
              <Warehouse className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black text-[#141414]">إدارة مخزون الأسطول وأرقام الشاسيه والمستودعات</h2>
          </div>
          <p className="text-xs text-[#707070] mt-1">
            متابعة فورية لحركة السيارات الجديدة بالمستودعات المركزية وصالات سولينا وتتبع رقم الشاسيه وحالات الحجز والتوريد.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportDataToCSV('vin_stock')}
            className="px-3.5 py-2.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير المخزون (10 صيغ)</span>
          </button>
          {(['excel', 'word', 'xml', 'csv'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => exportDataToCSV('vin_stock', fmt)}
              className="px-3 py-2 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#e0e0e0] text-[11px] font-bold uppercase cursor-pointer transition-colors"
            >
              {fmt === 'excel' ? 'XLS' : fmt === 'word' ? 'DOC' : fmt.toUpperCase()}
            </button>
          ))}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#141414] hover:bg-black active:scale-95 text-white text-xs font-bold shadow-none  flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة شحنة / مركبة برقم الشاسيه</span>
          </button>
        </div>
      </div>

      {/* 2. Stock KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">إجمالي السيارات في المخزون</span>
          <div className="text-xl font-black text-[#141414]">{vinStock.length} سيارة</div>
          <span className="text-[10px] text-[#141414] font-bold">
            {vinStock.filter(s => s.status === 'in_stock').length} جاهزة للتسليم الفوري
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">قيمة المخزون الإجمالية</span>
          <div className="text-xl font-black text-[#141414]">
            {vinStock.reduce((acc, s) => acc + s.price, 0).toLocaleString('ar-SA')} ريال
          </div>
          <span className="text-[10px] text-[#adadad] font-light">أسطول موديلات سولينا 2026</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">السيارات المحجوزة</span>
          <div className="text-xl font-black text-[#141414]">
            {vinStock.filter(s => s.status === 'reserved').length} سيارة
          </div>
          <span className="text-[10px] text-[#141414] font-bold">بانتظار إجراءات التمويل</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none space-y-1">
          <span className="text-[11px] font-bold text-[#707070]">شحنات في الطريق وتنبيه التقادم</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-[#141414]">
              {vinStock.filter(s => s.status === 'in_transit').length} في الشحن
            </span>
            {stats.agingVinCount > 0 && (
              <span className="mobbin-badge-popular">
                {stats.agingVinCount} راكدة (+45 يوم)
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#adadad] font-light">ميناء الملك عبد العزيز والمستودعات</span>
        </div>
      </div>

      {/* 3. Filters & Table */}
      <div className="bg-white rounded-3xl border border-[#e0e0e0] shadow-none overflow-hidden">
        <div className="p-4 border-b border-[#e0e0e0] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم الشاسيه VIN، الموديل، الفئة أو اللون..."
              className="w-full py-2 pr-9 pl-4 rounded-xl bg-[#f3f3f3] border border-[#e0e0e0] text-xs font-medium text-[#141414] placeholder-gray-400 focus:outline-none focus:border-[#141414]"
            />
            <Search className="w-4 h-4 text-[#adadad] absolute right-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter Pills */}
            <div className="flex items-center gap-1 bg-[#f0f0f0] p-1 rounded-xl">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'in_stock', label: 'بالمستودع' },
                { id: 'reserved', label: 'محجوزة' },
                { id: 'in_transit', label: 'في الشحن' },
                { id: 'sold', label: 'مباعة' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    statusFilter === st.id ? 'bg-[#141414] text-white shadow-2xs' : 'text-[#707070] hover:text-[#141414]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-2 rounded-xl border border-[#e0e0e0] text-xs bg-[#f3f3f3] font-medium cursor-pointer"
            >
              <option value="all">كافة الفروع والمستودعات</option>
              <option value="الرياض">فروع ومستودع الرياض</option>
              <option value="جدة">فروع ومستودع جدة</option>
              <option value="الخبر">صالة الخبر والشرقية</option>
              <option value="ميناء">الشحن اللوجستي والميناء</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#f3f3f3] text-[#707070] font-bold border-b border-[#e0e0e0]">
              <tr>
                <th className="p-3 text-start">رقم الشاسيه VIN والتقادم</th>
                <th className="p-3 text-start">الموديل والفئة</th>
                <th className="p-3 text-start">اللون والمحرك</th>
                <th className="p-3 text-start">الفرع / النقل المباشر</th>
                <th className="p-3 text-start">السعر الرسمي</th>
                <th className="p-3 text-center">حالة المخزون</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredStock.map((car) => (
                <tr key={car.id} className="hover:bg-[#f3f3f3] transition-colors">
                  <td className="p-3">
                    <span className="font-mono font-bold text-[#141414] block">{car.vin}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#adadad] font-mono">وصول: {car.arrivalDate}</span>
                      {car.daysInInventory >= 45 && car.status === 'in_stock' ? (
                        <span className="mobbin-badge-popular">+{car.daysInInventory} يوم بالمخزون</span>
                      ) : (
                        <span className="text-[10px] text-[#707070] font-mono">({car.daysInInventory} يوم)</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-[#141414]">{car.model}</div>
                    <span className="text-[10px] text-[#707070]">{car.trim}</span>
                  </td>
                  <td className="p-3">
                    <div className="text-[#141414] font-bold">{car.color}</div>
                    <span className="text-[10px] text-[#adadad]">{car.engine}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#141414] shrink-0" />
                      <select
                        value={car.location}
                        onChange={(e) => transferVinBranch(car.id, e.target.value)}
                        className="text-[11px] font-bold bg-[#f3f3f3] hover:bg-[#eaeaea] text-[#141414] px-2.5 py-1 rounded-full border-0 cursor-pointer outline-none"
                        title="نقل المركبة بين الفروع والمستودعات"
                      >
                        <option value={car.location}>{car.location}</option>
                        {[
                          'صالة الرياض - المعرض الرئيسي',
                          'صالة الرياض - صالة كبار الشخصيات VIP',
                          'صالة جدة - طريق الملك عبد العزيز',
                          'صالة الخبر - المعرض الإقليمي',
                          'المستودع المركزي - الرياض',
                          'في الشحن اللوجستي - ميناء الملك عبد العزيز'
                        ]
                          .filter(loc => loc !== car.location)
                          .map(loc => (
                            <option key={loc} value={loc}>نقل إلى: {loc}</option>
                          ))}
                      </select>
                    </div>
                  </td>
                  <td className="p-3 font-black text-[#141414] font-mono">
                    {car.price.toLocaleString('ar-SA')} ريال
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={car.status}
                      onChange={(e) => updateVinStatus(car.id, e.target.value as VehicleStockItem['status'])}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border outline-none cursor-pointer ${
                        car.status === 'in_stock' ? 'bg-[#f3f3f3] text-[#141414] border-[#e0e0e0]' :
                        car.status === 'reserved' ? 'bg-[#f3f3f3] text-[#141414] border-[#e0e0e0]' :
                        car.status === 'in_transit' ? 'bg-[#f3f3f3] text-[#141414] border-[#e0e0e0]' :
                        'bg-[#f0f0f0] text-[#707070] border-[#e0e0e0]'
                      }`}
                    >
                      <option value="in_stock">جاهزة بالمستودع</option>
                      <option value="reserved">محجوزة لعميل</option>
                      <option value="in_transit">في الشحن والتوريد</option>
                      <option value="sold">تم البيع والتسليم</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {car.status !== 'sold' && (
                        <button
                          onClick={() => {
                            const buyerName = prompt('أدخل اسم المشتري / المنشأة لإصدار الفاتورة الضريبية وعقد التسليم:', 'عميل صالة سولينا المميز');
                            if (!buyerName) return;
                            const inv = addZatcaInvoice({
                              customerName: buyerName,
                              customerPhone: '0500000000',
                              vehicleModel: `${car.model} — ${car.trim} (${car.color})`,
                              vinNumber: car.vin,
                              totalAmount: car.price,
                              type: 'simplified_invoice',
                              status: 'cleared'
                            });
                            alert(`تم بيع المركبة (${car.vin}) وإصدار الفاتورة الضريبية رقم ${inv.invoiceNumber} وسند القبض المحاسبي بنجاح.`);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-[#141414] hover:bg-black text-white text-[10px] font-bold transition-colors cursor-pointer"
                          title="بيع المركبة وإصدار فاتورة ZATCA وسند قبض"
                        >
                          بيع وفوترة
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedVinSticker(car)}
                        className="p-1.5 rounded-xl bg-[#f0f0f0] hover:bg-black text-[#707070] hover:text-white transition-colors cursor-pointer"
                        title="معاينة بطاقة الشاسيه QR"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setEditingStock({ ...car })}
                        className="p-1.5 rounded-xl bg-[#f3f3f3] hover:bg-[#141414] text-[#141414] hover:text-white transition-colors cursor-pointer"
                        title="تعديل بيانات الشاسيه"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل تريد حذف الشاسيه ${car.vin} من المخزون؟`)) {
                            deleteVinStock(car.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-[#f0f0f0] hover:bg-red-600 text-[#adadad] hover:text-white transition-colors cursor-pointer"
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

      {/* 4. Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddStock} className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-sm font-black text-[#141414]">تسجيل مركبة جديدة في مخزون سولينا بالـ VIN</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-[#adadad] hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-[#707070] block mb-1">رقم الشاسيه الموحد (17-Digit VIN):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={newCarForm.vin}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, vin: e.target.value.toUpperCase() }))}
                    className="flex-1 p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-bold text-[#141414]"
                  />
                  <button
                    type="button"
                    onClick={() => setNewCarForm(prev => ({ ...prev, vin: 'JT3' + Math.random().toString(36).substring(2, 12).toUpperCase() }))}
                    className="px-3 py-2.5 rounded-xl bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#707070] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>توليد</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">طراز السيارة:</label>
                  <select
                    value={newCarForm.model}
                    onChange={(e) => {
                      const found = vehicles.find(v => v.nameAr === e.target.value);
                      setNewCarForm(prev => ({
                        ...prev,
                        model: e.target.value,
                        price: found ? found.priceStartingFrom : prev.price,
                        engine: found ? found.engineSpec : prev.engine
                      }));
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white font-bold"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.nameAr}>
                        {v.nameAr}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الفئة (Trim):</label>
                  <input
                    type="text"
                    required
                    value={newCarForm.trim}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, trim: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">اللون الخارجي:</label>
                  <input
                    type="text"
                    required
                    value={newCarForm.color}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">السعر الرسمي (ر.س):</label>
                  <input
                    type="number"
                    required
                    value={newCarForm.price}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-bold text-[#141414]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">موقع التخزين / صالة العرض:</label>
                  <select
                    value={newCarForm.location}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white"
                  >
                    <option>صالة الرياض - المعرض الرئيسي</option>
                    <option>صالة الرياض - صالة كبار الشخصيات VIP</option>
                    <option>صالة جدة - طريق الملك عبد العزيز</option>
                    <option>صالة الخبر - المعرض الإقليمي</option>
                    <option>المستودع المركزي - الرياض</option>
                    <option>في الشحن اللوجستي - ميناء الملك عبد العزيز</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">حالة الشحنة:</label>
                  <select
                    value={newCarForm.status}
                    onChange={(e) => setNewCarForm(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0] bg-white font-bold"
                  >
                    <option value="in_stock">جاهزة للتسليم بالمستودع</option>
                    <option value="reserved">محجوزة لعميل</option>
                    <option value="in_transit">في الشحن والتوريد</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#141414] hover:bg-black text-white text-xs font-black rounded-xl shadow-none cursor-pointer"
            >
              اعتماد وحفظ المركبة في مخزون سولينا
            </button>
          </form>
        </div>
      )}

      {/* 5. Edit Stock Modal */}
      {editingStock && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditStock} className="w-full max-w-md bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <h3 className="text-sm font-black text-[#141414]">تعديل بيانات الشاسيه: {editingStock.vin}</h3>
              <button type="button" onClick={() => setEditingStock(null)} className="p-1 text-[#adadad]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-[#707070] block mb-1">الموديل:</label>
                <input
                  type="text"
                  value={editingStock.model}
                  onChange={(e) => setEditingStock({ ...editingStock, model: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الفئة (Trim):</label>
                  <input
                    type="text"
                    value={editingStock.trim}
                    onChange={(e) => setEditingStock({ ...editingStock, trim: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">اللون:</label>
                  <input
                    type="text"
                    value={editingStock.color}
                    onChange={(e) => setEditingStock({ ...editingStock, color: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-[#707070] block mb-1">الموقع / الفرع:</label>
                <input
                  type="text"
                  value={editingStock.location}
                  onChange={(e) => setEditingStock({ ...editingStock, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0]"
                />
              </div>
              <div>
                <label className="font-bold text-[#707070] block mb-1">السعر الرسمي (ر.س):</label>
                <input
                  type="number"
                  value={editingStock.price}
                  onChange={(e) => setEditingStock({ ...editingStock, price: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#e0e0e0] font-mono font-bold text-[#141414]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="flex-1 py-2.5 bg-[#141414] hover:bg-black text-white font-bold rounded-xl cursor-pointer">
                حفظ التغييرات
              </button>
              <button type="button" onClick={() => setEditingStock(null)} className="px-4 py-2.5 bg-[#f0f0f0] rounded-xl font-bold text-[#707070] cursor-pointer">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. VIN Sticker Preview Modal */}
      {selectedVinSticker && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-none space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e0e0] pb-3">
              <div className="flex items-center gap-2">
                <img src="/solina-logo.png" alt="سولينا" className="h-7 w-auto" />
                <span className="font-black text-[#141414]">بطاقة تعريف المركبة والشاسيه — سولينا</span>
              </div>
              <button onClick={() => setSelectedVinSticker(null)} className="p-1 text-[#adadad]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#141414] text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white font-bold block">SOLINA MOTORS LOGISTICS</span>
                  <h4 className="text-base font-black">{selectedVinSticker.model}</h4>
                  <span className="text-xs text-[#adadad]">{selectedVinSticker.trim}</span>
                </div>
                <div className="p-2 bg-white rounded-xl">
                  <QrCode className="w-12 h-12 text-black" />
                </div>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl font-mono text-center tracking-widest font-bold text-sm text-white">
                {selectedVinSticker.vin}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#adadad] pt-1">
                <div>اللون: <strong className="text-white">{selectedVinSticker.color}</strong></div>
                <div>المحرك: <strong className="text-white">{selectedVinSticker.engine}</strong></div>
                <div>الفرع: <strong className="text-white">{selectedVinSticker.location}</strong></div>
                <div>السعر: <strong className="text-white">{selectedVinSticker.price.toLocaleString('ar-SA')} ر.س</strong></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              {(['word', 'excel', 'xml', 'csv'] as const).map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() =>
                    exportSingleDocument(
                      'شهادة مطابقة وبطاقة شاسيه مركبة — سولينا للسيارات',
                      selectedVinSticker.vin,
                      [
                        ['رقم الشاسيه VIN', selectedVinSticker.vin],
                        ['الطراز والفئة', `${selectedVinSticker.model} (${selectedVinSticker.trim})`],
                        ['اللون والمحرك', `${selectedVinSticker.color} • ${selectedVinSticker.engine}`],
                        ['الموقع / الفرع', selectedVinSticker.location],
                        ['تاريخ الوصول', selectedVinSticker.arrivalDate],
                        ['السعر الرسمي (شامل الضريبة)', `${selectedVinSticker.price.toLocaleString('ar-SA')} ر.س`]
                      ],
                      ['رقم الشاسيه VIN', 'الطراز والفئة', 'اللون والمحرك', 'الفرع / المستودع', 'السعر الرسمي (ر.س)'],
                      [[
                        selectedVinSticker.vin,
                        `${selectedVinSticker.model} — ${selectedVinSticker.trim}`,
                        `${selectedVinSticker.color} (${selectedVinSticker.engine})`,
                        selectedVinSticker.location,
                        selectedVinSticker.price.toLocaleString('ar-SA')
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
                    'شهادة مطابقة وبطاقة شاسيه مركبة — سولينا للسيارات',
                    selectedVinSticker.vin,
                    [
                      ['رقم الشاسيه VIN', selectedVinSticker.vin],
                      ['الطراز والفئة', `${selectedVinSticker.model} (${selectedVinSticker.trim})`],
                      ['اللون والمحرك', `${selectedVinSticker.color} • ${selectedVinSticker.engine}`],
                      ['الموقع / الفرع', selectedVinSticker.location],
                      ['تاريخ الوصول', selectedVinSticker.arrivalDate],
                      ['السعر الرسمي (شامل الضريبة)', `${selectedVinSticker.price.toLocaleString('ar-SA')} ر.س`]
                    ],
                    ['رقم الشاسيه VIN', 'الطراز والفئة', 'اللون والمحرك', 'الفرع / المستودع', 'السعر الرسمي (ر.س)'],
                    [[
                      selectedVinSticker.vin,
                      `${selectedVinSticker.model} — ${selectedVinSticker.trim}`,
                      `${selectedVinSticker.color} (${selectedVinSticker.engine})`,
                      selectedVinSticker.location,
                      selectedVinSticker.price.toLocaleString('ar-SA')
                    ]],
                    'pdf_print'
                  )
                }
                className="px-4 py-2 bg-[#141414] hover:bg-black text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة ملصق وشهادة الشاسيه PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
