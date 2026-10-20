import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  MapPin, 
  Gauge,
  Download,
  Eye,
  Award
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { PreOwnedVehicle } from '../../data/toyotaData';

export const AdminCPOTab: React.FC = () => {
  const { cpoVehicles, addCPOVehicle, deleteCPOVehicle, updateCPOVehicle, exportDataToCSV } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCPO, setEditingCPO] = useState<PreOwnedVehicle | null>(null);

  // CPO Form State
  const [titleAr, setTitleAr] = useState('');
  const [year, setYear] = useState(2024);
  const [mileage, setMileage] = useState(32000);
  const [price, setPrice] = useState(118000);
  const [location, setLocation] = useState('الرياض - مركز سولينا خريص');
  const [grade, setGrade] = useState('TXL فل كامل');
  const [color, setColor] = useState('أبيض لؤلؤي');
  const [warrantyMonths, setWarrantyMonths] = useState(24);
  const [inspectionPoints, setInspectionPoints] = useState(160);
  const [image, setImage] = useState('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/thumbnail/prado-513x289.png');

  const openAddModal = () => {
    setEditingCPO(null);
    setTitleAr('');
    setYear(2024);
    setMileage(32000);
    setPrice(118000);
    setLocation('الرياض - مركز سولينا خريص');
    setGrade('TXL فل كامل');
    setColor('أبيض لؤلؤي');
    setWarrantyMonths(24);
    setInspectionPoints(160);
    setImage('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/thumbnail/prado-513x289.png');
    setIsModalOpen(true);
  };

  const openEditModal = (cpo: PreOwnedVehicle) => {
    setEditingCPO(cpo);
    setTitleAr(cpo.titleAr);
    setYear(cpo.year);
    setMileage(cpo.mileage);
    setPrice(cpo.price);
    setLocation(cpo.location);
    setGrade(cpo.grade);
    setColor(cpo.color);
    setWarrantyMonths(cpo.warrantyMonths);
    setInspectionPoints(cpo.inspectionPoints);
    setImage(cpo.image);
    setIsModalOpen(true);
  };

  const filteredCPO = cpoVehicles.filter(c => 
    c.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveCPO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr) return;

    const monthlyInstallment = Math.round((Number(price) * 0.9) / 60);

    if (editingCPO) {
      updateCPOVehicle(editingCPO.id, {
        titleAr,
        titleEn: titleAr,
        year: Number(year),
        mileage: Number(mileage),
        price: Number(price),
        monthlyInstallment,
        location,
        color,
        grade,
        image,
        inspectionPoints: Number(inspectionPoints),
        warrantyMonths: Number(warrantyMonths),
        isCertified: true
      });
    } else {
      const newCPO: PreOwnedVehicle = {
        id: `cpo-${Date.now()}`,
        titleAr,
        titleEn: titleAr,
        year: Number(year),
        mileage: Number(mileage),
        price: Number(price),
        monthlyInstallment,
        location,
        color,
        grade,
        image,
        inspectionPoints: Number(inspectionPoints),
        warrantyMonths: Number(warrantyMonths),
        isCertified: true
      };
      addCPOVehicle(newCPO);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{language === 'ar' ? 'إدارة سيارات سولينا المستعملة المعتمدة (Solina AutoHub CPO)' : 'Solina Certified Pre-Owned Inventory'}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {language === 'ar' 
              ? 'متابعة وفحص وتسعير سيارات المستعمل المعتمد المفحوصة بـ 160 نقطة مع ضمان سولينا المعتمد.' 
              : 'Manage 160-point inspected certified pre-owned vehicles with official Solina warranty.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportDataToCSV('cpo')}
            className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير CSV</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة سيارة مستعملة معتمدة' : 'Add CPO Vehicle'}</span>
          </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم السيارة، الفئة، اللون، أو الفرع..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-10 pl-3 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="text-xs font-bold text-gray-500 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
          إجمالي السيارات المعروضة: <span className="text-emerald-700 font-mono">{filteredCPO.length}</span>
        </div>
      </div>

      {/* 3. CPO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCPO.map((cpo) => (
          <div 
            key={cpo.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative bg-gray-50 p-4 flex items-center justify-center">
                <img 
                  src={cpo.image} 
                  alt={cpo.titleAr} 
                  className="max-h-full max-w-full object-contain filter drop-shadow" 
                />
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <ShieldCheck className="w-3 h-3" />
                  <span>مفحوصة {cpo.inspectionPoints} نقطة</span>
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  موديل {cpo.year}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 border border-gray-200 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  ضمان {cpo.warrantyMonths} شهر
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-sm">{cpo.titleAr}</h3>
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-semibold">{cpo.color}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">{cpo.grade}</p>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{formatPrice(cpo.mileage)} كم</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{cpo.location}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">السعر النقدي:</span>
                    <span className="text-sm font-black text-gray-900 font-mono">{formatPrice(cpo.price)} ر.س</span>
                  </div>
                  <div className="text-end">
                    <span className="text-[10px] text-gray-400 block">القسط التقديري:</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">{formatPrice(cpo.monthlyInstallment)} ر.س/ش</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-mono">ID: {cpo.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(cpo)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white text-gray-700 border border-gray-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(language === 'ar' ? 'هل تريد حذف هذه السيارة؟' : 'Delete this vehicle?')) {
                      deleteCPOVehicle(cpo.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-red-600 hover:text-white text-gray-400 border border-gray-200 transition-colors cursor-pointer"
                  title="حذف السيارة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Add / Edit CPO Modal with Live Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{editingCPO ? `تعديل بيانات: ${editingCPO.titleAr}` : 'إضافة سيارة مستعملة معتمدة (سولينا AutoHub)'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form onSubmit={handleSaveCPO} className="lg:col-span-7 space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">اسم السيارة والموديل *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سولينا كامري قراندي 2024"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">الفئة والتجهيز (Grade) *</label>
                    <input
                      type="text"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">سنة الصنع</label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">الممشى (كم)</label>
                    <input
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">السعر النقدي (ر.س)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono font-bold text-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">اللون الخارجي</label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">مدة الضمان (شهر)</label>
                    <input
                      type="number"
                      value={warrantyMonths}
                      onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">نقاط الفحص الفني</label>
                    <input
                      type="number"
                      value={inspectionPoints}
                      onChange={(e) => setInspectionPoints(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">مكان التواجد والفرع</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">رابط صورة السيارة (URL)</label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-mono text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {editingCPO ? 'حفظ التعديلات في سجل المستعمل المعتمد' : 'إضافة للمخزون المعتمد فوراً'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>

              {/* Live Card Preview */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>معاينة بطاقة المستعمل المعتمد</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">مباشر</span>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                  <div className="h-36 relative bg-gray-50 p-3 flex items-center justify-center">
                    <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" />
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-2.5 h-2.5" />
                      مفحوصة {inspectionPoints} نقطة
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-gray-900 text-xs">{titleAr || 'اسم السيارة المستعملة المعتمدة'}</h4>
                    <p className="text-[11px] text-gray-500">{grade} • {color} • موديل {year}</p>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <strong className="text-sm font-black text-gray-900 font-mono">{formatPrice(price)} ر.س</strong>
                      <span className="text-[11px] font-bold text-emerald-700 font-mono">
                        {formatPrice(Math.round((Number(price) * 0.9) / 60))} ر.س/شهرياً
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 text-center">
                  تظهر هذه البطاقة مباشرة في قسم سولينا للسيارات المستعملة المعتمدة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
