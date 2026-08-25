import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Edit3, 
  Star, 
  Zap, 
  Check, 
  X, 
  Filter, 
  DollarSign, 
  Layers,
  Fuel,
  Info
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Vehicle } from '../../data/toyotaData';

export const AdminFleetTab: React.FC = () => {
  const { vehicles, updateVehiclePrice, toggleVehicleFeatured } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('all');
  
  // Price Editor State
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newPriceInput, setNewPriceInput] = useState<string>('');

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = 
      v.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesPowertrain = selectedPowertrain === 'all' || v.powertrain === selectedPowertrain;

    return matchesSearch && matchesCategory && matchesPowertrain;
  });

  const handleOpenPriceModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setNewPriceInput(v.priceStartingFrom.toString());
  };

  const handleSavePrice = () => {
    if (!editingVehicle) return;
    const parsed = parseFloat(newPriceInput);
    if (!isNaN(parsed) && parsed > 0) {
      updateVehiclePrice(editingVehicle.id, parsed);
      setEditingVehicle(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header & Filters Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">
              {language === 'ar' ? 'إدارة أسطول سيارات سولينا والأسعار (2026 Fleet)' : 'Fleet Inventory & Pricing Management'}
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'ar' 
                ? 'تحكم في أسعار الموديلات، حالة التوفر، إبراز السيارات على الواجهة الرئيسية.' 
                : 'Manage starting cash prices, showroom visibility, and featured showcase status.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-mono">
              {language === 'ar' ? `إجمالي الأسطول: ${vehicles.length} موديل` : `Total Fleet: ${vehicles.length} Models`}
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-gray-100">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث باسم الموديل أو المعرّف...' : 'Search model name or ID...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-10 pl-3 focus:ring-2 focus:ring-[#EB0A1E] outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع الفئات (All)' : 'All Categories'}</option>
              <option value="suv">{language === 'ar' ? 'دفع رباعي وSUV' : 'SUV & 4x4'}</option>
              <option value="sedan">{language === 'ar' ? 'سيدان (Sedan)' : 'Sedan'}</option>
              <option value="commercial">{language === 'ar' ? 'تجارية وبيك آب' : 'Commercial & Pickups'}</option>
              <option value="gr">{language === 'ar' ? 'أداء رياضي GR' : 'Gazoo Racing (GR)'}</option>
            </select>
          </div>

          {/* Powertrain Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedPowertrain}
              onChange={(e) => setSelectedPowertrain(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
            >
              <option value="all">{language === 'ar' ? 'جميع منظومات الحركة' : 'All Powertrains'}</option>
              <option value="بنزين">{language === 'ar' ? 'بنزين (Petrol)' : 'Petrol'}</option>
              <option value="هايبرد">{language === 'ar' ? 'هايبرد هجين (HEV)' : 'Hybrid Electric'}</option>
              <option value="ديزل">{language === 'ar' ? 'تيربو ديزل (Diesel)' : 'Diesel'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Vehicles Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 text-start">{language === 'ar' ? 'السيارة' : 'Vehicle'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'الفئة والمحرك' : 'Category & Powertrain'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'السعر النقدي الأساسي' : 'Starting Price (SAR)'}</th>
                <th className="py-4 px-4 text-start">{language === 'ar' ? 'القسط الشهري التقديري' : 'Est. Monthly'}</th>
                <th className="py-4 px-4 text-center">{language === 'ar' ? 'الفئات المتاحة' : 'Grimes/Trims'}</th>
                <th className="py-4 px-4 text-center">{language === 'ar' ? 'مميزة بالرئيسية' : 'Featured'}</th>
                <th className="py-4 px-6 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Vehicle Info & Image */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-12 rounded-xl bg-gray-100/70 p-1 flex items-center justify-center border border-gray-200/60 shrink-0">
                        <img 
                          src={v.cardImage} 
                          alt={v.nameAr} 
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm" 
                        />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-sm block">
                          {language === 'ar' ? v.nameAr : v.nameEn}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {v.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category & Powertrain */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                        {language === 'ar' ? v.bodyTypeAr : v.bodyTypeEn}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          v.powertrain === 'هايبرد' ? 'bg-emerald-100 text-emerald-800' :
                          v.powertrain === 'ديزل' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {v.powertrain}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">{v.fuelEconomy}</span>
                      </div>
                    </div>
                  </td>

                  {/* Starting Price */}
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 text-sm">
                    {formatPrice(v.priceStartingFrom)} ر.س
                  </td>

                  {/* Monthly Installment */}
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-red-600">
                    {formatPrice(v.monthlyInstallmentStartingFrom)} ر.س/شهر
                  </td>

                  {/* Trims Count */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 font-bold text-gray-700 font-mono text-[11px]">
                      <Layers className="w-3 h-3 text-gray-500" />
                      {v.grades.length} فئات
                    </span>
                  </td>

                  {/* Featured Switch */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => toggleVehicleFeatured(v.id)}
                      title={v.isFeatured ? 'إلغاء التمييز' : 'تمييز بالصفحة الرئيسية'}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        v.isFeatured 
                          ? 'bg-amber-100 text-amber-600 shadow-sm ring-1 ring-amber-300' 
                          : 'bg-gray-100 text-gray-400 hover:text-amber-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${v.isFeatured ? 'fill-amber-500' : ''}`} />
                    </button>
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleOpenPriceModal(v)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#EB0A1E] text-gray-700 hover:text-white font-bold transition-all cursor-pointer shadow-sm text-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تعديل السعر' : 'Edit Price'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Price Edit Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#EB0A1E]" />
                <h3 className="font-bold text-gray-900 text-base">
                  {language === 'ar' ? `تعديل سعر: ${editingVehicle.nameAr}` : `Edit Price: ${editingVehicle.nameEn}`}
                </h3>
              </div>
              <button 
                onClick={() => setEditingVehicle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <img 
                  src={editingVehicle.cardImage} 
                  alt={editingVehicle.nameAr} 
                  className="max-h-20 w-auto object-contain filter drop-shadow" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  {language === 'ar' ? 'السعر النقدي الجديد (ر.س شاملاً ضريبة 15%):' : 'New Cash Price (SAR incl. 15% VAT):'}
                </label>
                <input
                  type="number"
                  value={newPriceInput}
                  onChange={(e) => setNewPriceInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-mono font-bold text-base rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#EB0A1E] outline-none"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-blue-800 text-[11px] flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                <span>
                  {language === 'ar' 
                    ? 'سيتم تحديث القسط الشهري التقديري تلقائياً وينعكس فوراً على حاسبة التمويل والصفحة الرئيسية.' 
                    : 'The estimated monthly installment and finance calculator will sync automatically.'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSavePrice}
                className="flex-1 bg-[#EB0A1E] hover:bg-[#BA0817] text-white font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'ar' ? 'حفظ وتحديث السعر' : 'Save & Update'}</span>
              </button>
              <button
                onClick={() => setEditingVehicle(null)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
