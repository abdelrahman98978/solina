import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Layers, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { SparePart } from '../../data/toyotaData';

export const AdminPartsTab: React.FC = () => {
  const { spareParts, updateSparePartPrice, deleteSparePart, addSparePart } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Edit Price Modal
  const [editingPart, setEditingPart] = useState<SparePart | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  const filteredParts = spareParts.filter(p => {
    const matchQ = p.nameAr.includes(searchQuery) || p.partNumber.includes(searchQuery);
    const matchC = selectedCategory === 'all' || p.category === selectedCategory;
    return matchQ && matchC;
  });

  const handleSavePrice = () => {
    if (!editingPart) return;
    const parsed = parseFloat(newPrice);
    if (!isNaN(parsed) && parsed > 0) {
      updateSparePartPrice(editingPart.id, parsed);
      setEditingPart(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            <span>{language === 'ar' ? 'إدارة قطع الغيار الأصلية والإكسسوارات (Genuine Parts)' : 'Genuine Parts Inventory'}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'ar' 
              ? 'متابعة أرقام القطع الأصلية (Part Numbers)، الأسعار، والتوافق مع موديلات سولينا.' 
              : 'Manage OEM part numbers, pricing, and vehicle compatibility.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-mono">
            {spareParts.length} قطعة مسجلة
          </span>
        </div>
      </div>

      {/* 2. Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث باسم القطعة أو رقم القطعة (Part #)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-10 pl-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-60 bg-white border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
        >
          <option value="all">كافة التصنيفات</option>
          <option value="مكابح وفلاتر">المكابح والفلاتر الأصلية</option>
          <option value="إكسسوارات GR">إكسسوارات GR Sport</option>
          <option value="حماية وعناية">أطقم الحماية والفرشات</option>
          <option value="زيوت وسوائل">الزيوت والسوائل التخليقية</option>
        </select>
      </div>

      {/* 3. Parts Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 text-start">القطعة ورقمها الأصلي</th>
                <th className="py-4 px-4 text-start">التصنيف</th>
                <th className="py-4 px-4 text-start">الموديلات المتوافقة</th>
                <th className="py-4 px-4 text-start">السعر (شامل الضريبة)</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 p-1 flex items-center justify-center border border-gray-200 shrink-0">
                        <img src={part.image} alt={part.nameAr} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-sm block">{part.nameAr}</span>
                        <span className="text-[11px] text-gray-500 font-mono block">Part #: {part.partNumber}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium text-[11px]">
                      {part.category}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {part.compatibleModels.map((m, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 font-semibold px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-gray-900 text-sm">
                    {formatPrice(part.price)} ر.س
                  </td>

                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPart(part);
                          setNewPrice(part.price.toString());
                        }}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 transition-colors cursor-pointer"
                        title="تعديل السعر"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('هل تريد حذف هذه القطعة من الكتالوج؟')) deleteSparePart(part.id);
                        }}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 transition-colors cursor-pointer"
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

      {/* 4. Edit Price Modal */}
      {editingPart && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 space-y-4">
            <h3 className="font-bold text-gray-900 text-base">تعديل سعر: {editingPart.nameAr}</h3>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">السعر الجديد (ر.س):</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-mono font-bold text-base text-gray-900 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleSavePrice}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm"
              >
                حفظ التعديل
              </button>
              <button
                onClick={() => setEditingPart(null)}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
