import React, { useState } from 'react';
import { 
  Wrench, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Download
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { SparePart } from '../../data/toyotaData';

export const AdminPartsTab: React.FC = () => {
  const { spareParts, partQuantities, adjustPartQuantity, stats, updateSparePart, deleteSparePart, addSparePart, exportDataToCSV } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<SparePart | null>(null);

  // Form State
  const [nameAr, setNameAr] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [category, setCategory] = useState<'مكابح وفلاتر' | 'إكسسوارات GR' | 'حماية وعناية' | 'زيوت وسوائل'>('مكابح وفلاتر');
  const [price, setPrice] = useState(320);
  const [originalPrice, setOriginalPrice] = useState(380);
  const [compatibleModelsText, setCompatibleModelsText] = useState('كامري, كراون, راف فور');
  const [warranty, setWarranty] = useState('ضمان سولينا الأصلي 12 شهراً');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80');

  const openAddModal = () => {
    setEditingPart(null);
    setNameAr('');
    setPartNumber(`04465-${Math.floor(10000 + Math.random() * 90000)}`);
    setCategory('مكابح وفلاتر');
    setPrice(320);
    setOriginalPrice(380);
    setCompatibleModelsText('كامري, كراون, لاند كروزر');
    setWarranty('ضمان سولينا الأصلي 12 شهراً');
    setImage('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (part: SparePart) => {
    setEditingPart(part);
    setNameAr(part.nameAr);
    setPartNumber(part.partNumber);
    setCategory(part.category);
    setPrice(part.price);
    setOriginalPrice(part.originalPrice || Math.round(part.price * 1.15));
    setCompatibleModelsText(part.compatibleModels.join(', '));
    setWarranty(part.warranty || 'ضمان سولينا الأصلي 12 شهراً');
    setImage(part.image);
    setIsModalOpen(true);
  };

  const filteredParts = spareParts.filter(p => {
    const matchQ =
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.compatibleModels.some(m => m.includes(searchQuery));
    const matchC = selectedCategory === 'all' || p.category === selectedCategory;
    return matchQ && matchC;
  });

  const handleSavePart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !partNumber) return;

    const compatibleModels = compatibleModelsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const categoryEnMap: Record<string, string> = {
      'مكابح وفلاتر': 'Brakes & Filters',
      'إكسسوارات GR': 'GR Accessories',
      'حماية وعناية': 'Protection & Care',
      'زيوت وسوائل': 'Oils & Fluids'
    };

    if (editingPart) {
      updateSparePart(editingPart.id, {
        nameAr,
        nameEn: nameAr,
        partNumber,
        category,
        categoryEn: categoryEnMap[category] || 'Genuine Parts',
        price: Number(price),
        originalPrice: Number(originalPrice),
        compatibleModels: compatibleModels.length > 0 ? compatibleModels : ['جميع موديلات سولينا'],
        warranty,
        image
      });
    } else {
      const created: SparePart = {
        id: `part-${Date.now()}`,
        nameAr,
        nameEn: nameAr,
        partNumber,
        category,
        categoryEn: categoryEnMap[category] || 'Genuine Parts',
        price: Number(price),
        originalPrice: Number(originalPrice),
        compatibleModels: compatibleModels.length > 0 ? compatibleModels : ['جميع موديلات سولينا'],
        warranty,
        image
      };
      addSparePart(created);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#141414] font-display flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#141414]" />
            <span>{language === 'ar' ? 'إدارة قطع غيار سولينا الأصلية والإكسسوارات' : 'Solina Genuine Parts Inventory'}</span>
          </h2>
          <p className="text-xs text-[#707070] mt-0.5">
            {language === 'ar' 
              ? 'متابعة أرقام القطع الأصلية، الأسعار، الأرصدة المخزنية، والتوافق مع موديلات سولينا وأوامر الصيانة.' 
              : 'Manage OEM part numbers, pricing, and vehicle compatibility.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-2 rounded-xl bg-[#f0f0f0] text-[#707070] font-mono">
            {spareParts.length} قطعة مسجلة
          </span>
          {stats.lowStockPartsCount > 0 && (
            <span className="mobbin-badge-popular px-2.5 py-1 text-[11px]">
              {stats.lowStockPartsCount} قطع تحت حد الطلب (≤10)
            </span>
          )}
          <button
            onClick={() => exportDataToCSV('parts')}
            className="flex items-center gap-1.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#707070] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير القطع (10 صيغ)</span>
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#141414] hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-none  transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة قطعة غيار أصلية</span>
          </button>
        </div>
      </div>

      {/* 2. Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#adadad] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث باسم القطعة، رقم القطعة الأصلي، أو الموديل المتوافق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e0e0e0] text-[#141414] text-xs rounded-xl py-2.5 pr-10 pl-3 focus:border-[#141414] outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-64 bg-white border border-[#e0e0e0] text-[#141414] text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
        >
          <option value="all">كافة التصنيفات ({spareParts.length})</option>
          <option value="مكابح وفلاتر">المكابح والفلاتر الأصلية</option>
          <option value="إكسسوارات GR">الإكسسوارات الرياضية</option>
          <option value="حماية وعناية">أطقم الحماية والفرشات</option>
          <option value="زيوت وسوائل">الزيوت والسوائل التخليقية</option>
        </select>
      </div>

      {/* 3. Parts Table */}
      <div className="bg-white rounded-3xl border border-[#e0e0e0] shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#f3f3f3] text-[#707070] font-bold border-b border-[#e0e0e0] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 text-start">القطعة ورقمها الأصلي</th>
                <th className="py-4 px-4 text-start">التصنيف والضمان</th>
                <th className="py-4 px-4 text-start">الموديلات المتوافقة</th>
                <th className="py-4 px-4 text-center">الرصيد المخزني والتوريد</th>
                <th className="py-4 px-4 text-start">السعر (شامل الضريبة)</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredParts.map((part) => {
                const qty = partQuantities[part.id] ?? 20;
                const isLowStock = qty <= 10;
                return (
                <tr key={part.id} className="hover:bg-[#f3f3f3] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#f0f0f0] p-1 flex items-center justify-center border border-[#e0e0e0] shrink-0">
                        <img src={part.image} alt={part.nameAr} width={44} height={44} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-[#141414] text-sm block">{part.nameAr}</span>
                        <span className="text-[11px] text-[#707070] font-mono block">رقم القطعة: {part.partNumber}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-[#f0f0f0] text-[#707070] font-medium text-[11px]">
                      {part.category}
                    </span>
                    <span className="block text-[10px] text-[#141414] mt-1">{part.warranty}</span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {part.compatibleModels.map((m, i) => (
                        <span key={i} className="text-[10px] bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] font-semibold px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-sm text-[#141414]">{qty} وحدة</span>
                        {isLowStock && (
                          <span className="mobbin-badge-popular">نقص حرج</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustPartQuantity(part.id, -1)}
                          className="px-2 py-0.5 rounded-full bg-[#f3f3f3] hover:bg-[#e5e5e5] text-[#141414] text-[10px] font-bold cursor-pointer"
                          title="صرف قطعة واحدة للورشة"
                        >
                          -1 صرف
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustPartQuantity(part.id, 10)}
                          className="px-2.5 py-0.5 rounded-full bg-[#141414] hover:bg-[#2b2b2b] text-white text-[10px] font-bold cursor-pointer"
                          title="أمر توريد سريع (+10 وحدات)"
                        >
                          +10 توريد
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-mono font-bold text-[#141414] text-sm">{formatPrice(part.price)} ر.س</div>
                    {part.originalPrice && part.originalPrice > part.price && (
                      <span className="text-[10px] text-[#adadad] line-through font-mono">
                        {formatPrice(part.originalPrice)} ر.س
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(part)}
                        className="px-3 py-1.5 rounded-xl bg-[#f0f0f0] hover:bg-black hover:text-white text-[#707070] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="تعديل بيانات القطعة"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('هل تريد حذف هذه القطعة من الكتالوج؟')) deleteSparePart(part.id);
                        }}
                        className="p-2 rounded-xl bg-[#f0f0f0] hover:bg-red-600 hover:text-white text-[#adadad] transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add / Edit Spare Part Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-none border border-[#e0e0e0] animate-in zoom-in-95 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0]">
              <h3 className="font-bold text-[#141414] text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#141414]" />
                <span>{editingPart ? `تعديل القطعة: ${editingPart.nameAr}` : 'إضافة قطعة غيار سولينا أصلية'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#707070] hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePart} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#707070] block mb-1">اسم القطعة بالعربية *</label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: طقم فحمات فرامل أمامية أصلية - سولينا"
                  className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none focus:border-[#141414]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الرقم المرجعي للقطعة (Part #) *</label>
                  <input
                    type="text"
                    required
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs font-mono text-[#141414] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  >
                    <option value="مكابح وفلاتر">مكابح وفلاتر</option>
                    <option value="إكسسوارات GR">إكسسوارات GR</option>
                    <option value="حماية وعناية">حماية وعناية</option>
                    <option value="زيوت وسوائل">زيوت وسوائل</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">سعر البيع الشامل للضريبة (ر.س) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 font-mono font-bold text-[#141414] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">السعر قبل الخصم (اختياري)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 font-mono text-[#707070] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707070] block mb-1">الموديلات المتوافقة (مفصولة بفاصلة ,)</label>
                <input
                  type="text"
                  value={compatibleModelsText}
                  onChange={(e) => setCompatibleModelsText(e.target.value)}
                  placeholder="كامري, كراون, لاند كروزر"
                  className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الضمان</label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">رابط الصورة (URL)</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs font-mono text-[#141414] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#141414] hover:bg-black text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow-none"
                >
                  {editingPart ? 'حفظ التعديلات' : 'إضافة القطعة إلى كتالوج سولينا'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-3 bg-[#f0f0f0] text-[#707070] font-bold rounded-xl text-xs cursor-pointer"
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
