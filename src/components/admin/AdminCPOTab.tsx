import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  MapPin, 
  Calendar,
  Gauge
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { PreOwnedVehicle } from '../../data/toyotaData';

export const AdminCPOTab: React.FC = () => {
  const { cpoVehicles, addCPOVehicle, deleteCPOVehicle, updateCPOVehicle } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New CPO Form
  const [titleAr, setTitleAr] = useState('');
  const [year, setYear] = useState(2023);
  const [mileage, setMileage] = useState(35000);
  const [price, setPrice] = useState(115000);
  const [location, setLocation] = useState('الرياض - مركز خريص');
  const [grade, setGrade] = useState('TXL فل كامل');
  const [image, setImage] = useState('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/thumbnail/prado-513x289.png');

  const filteredCPO = cpoVehicles.filter(c => 
    c.titleAr.includes(searchQuery) ||
    c.location.includes(searchQuery) ||
    c.grade.includes(searchQuery)
  );

  const handleCreateCPO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr) return;

    const newCPO: PreOwnedVehicle = {
      id: `cpo-${Date.now()}`,
      titleAr,
      titleEn: titleAr,
      year: Number(year),
      mileage: Number(mileage),
      price: Number(price),
      monthlyInstallment: Math.round((Number(price) * 0.9) / 60),
      location,
      color: 'أبيض لؤلؤي',
      grade,
      image,
      inspectionPoints: 160,
      warrantyMonths: 12,
      isCertified: true
    };

    addCPOVehicle(newCPO);
    setIsAddModalOpen(false);
    setTitleAr('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{language === 'ar' ? 'إدارة سيارات تويوتا المستعملة المعتمدة (AutoHub CPO)' : 'Certified Pre-Owned Inventory'}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'ar' 
              ? 'متابعة وفحص سيارات المستعمل المعتمد المفحوصة بـ 160 نقطة مع الضمان المعتمد.' 
              : 'Manage 160-point inspected certified pre-owned vehicles with warranty.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة سيارة مستعملة معتمدة' : 'Add CPO Vehicle'}</span>
          </button>
        </div>
      </div>

      {/* 2. CPO Grid */}
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
                  <span>مفحوصة 160 نقطة</span>
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  موديل {cpo.year}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">{cpo.titleAr}</h3>
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
        ))}
      </div>

      {/* 3. Add CPO Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>إضافة سيارة مستعملة معتمدة (AutoHub)</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCPO} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">اسم السيارة والموديل:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تويوتا كامري GLX 2023"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">سنة الصنع:</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">الممشى (كم):</label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">السعر (ر.س):</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">مكان التواجد والفرع:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  إضافة للمخزون المعتمد
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
