import React, { useState } from 'react';
import { Wrench, ShieldCheck, CheckCircle2, Search, ShoppingBag, ArrowLeft, Tag, Layers } from 'lucide-react';
import { GENUINE_PARTS, type SparePart } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface PartsAccessoriesSectionProps {
  onOpenTestDrive: (partTitle?: string) => void;
}

export const PartsAccessoriesSection: React.FC<PartsAccessoriesSectionProps> = ({
  onOpenTestDrive
}) => {
  const { language, formatPrice } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelAr: 'كافة القطع والإكسسوارات', labelEn: 'All Parts & Accessories' },
    { id: 'مكابح وفلاتر', labelAr: 'المكابح والفلاتر الأصلية', labelEn: 'Brakes & Filters' },
    { id: 'إكسسوارات GR', labelAr: 'إكسسوارات جازو ريسنج GR', labelEn: 'GR Sport Accessories' },
    { id: 'حماية وعناية', labelAr: 'أطقم الحماية والفرشات', labelEn: 'Protection & Liners' },
    { id: 'زيوت وسوائل', labelAr: 'الزيوت التخليقية والسوائل', labelEn: 'Oils & Fluids' }
  ];

  const filteredParts = GENUINE_PARTS.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.compatibleModels.some(m => m.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section id="spare-parts" className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>{language === 'ar' ? 'قطع الغيار والإكسسوارات الأصلية 100%' : '100% Genuine Parts & Accessories'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'حافظ على أداء وأصالة سيارتك تويوتا' : 'Preserve Your Toyota\'s Peak Performance'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-2 max-w-xl">
              {language === 'ar'
                ? 'قطع غيار تويوتا الأصلية صممت واختبرت هندسياً بأعلى معايير الجودة اليابانية لضمان أقصى درجات الأمان والعمر المديد.'
                : 'Engineered and certified to exact Toyota factory specifications for uncompromised safety and durability.'}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث باسم القطعة، الموديل أو رقم القطعة...' : 'Search by part name or number...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-2xl py-3 pr-10 pl-4 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map(part => (
            <div
              key={part.id}
              className="bg-white rounded-3xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
                    {part.partNumber}
                  </span>
                  {part.badge && (
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      {part.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-gray-900 mb-1 font-display group-hover:text-blue-600 transition-colors">
                  {language === 'ar' ? part.nameAr : part.nameEn}
                </h3>

                <p className="text-[11px] text-gray-500 mb-4">{part.category}</p>

                {/* Compatibility tags */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1.5">
                    {language === 'ar' ? 'متوافق مع طرازات:' : 'Compatible Models:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {part.compatibleModels.map((m, i) => (
                      <span key={i} className="text-[10px] bg-gray-50 border border-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'السعر الرسمي' : 'Official Price'}</span>
                  <span className="text-xl font-black text-gray-900 font-mono">{formatPrice(part.price)} ر.س</span>
                </div>

                <button
                  onClick={() => onOpenTestDrive(`طلب واستفسار عن قطعة الغيار: ${part.nameAr} (${part.partNumber})`)}
                  className="py-2.5 px-4 bg-gray-100 hover:bg-blue-600 text-gray-800 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'طلب القطعة' : 'Order Part'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
