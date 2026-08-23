import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  Sparkles, 
  Check, 
  X, 
  Search,
  DollarSign
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Offer } from '../../data/toyotaData';

export const AdminOffersTab: React.FC = () => {
  const { offers, addOffer, deleteOffer, updateOffer } = useAdminData();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  // New Offer Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'سيارات' | 'صيانة' | 'تمويل'>('سيارات');
  const [newBadge, setNewBadge] = useState('عرض خاص 2026');
  const [newValidUntil, setNewValidUntil] = useState('حتى 31 ديسمبر 2026');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/prado/desktop/4---desktop.webp?w=1920&q=75&f=webp');

  const filteredOffers = offers.filter(o => 
    o.title.includes(searchQuery) ||
    o.subtitle.includes(searchQuery) ||
    o.badge.includes(searchQuery)
  );

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const offer: Offer = {
      id: `offer-${Date.now()}`,
      title: newTitle,
      titleEn: newTitle,
      subtitle: newSubtitle || 'عرض مميز من جبراني للسيارات',
      subtitleEn: newSubtitle || 'Special Gibrani Promotion',
      category: newCategory,
      categoryEn: newCategory === 'سيارات' ? 'Vehicles' : newCategory === 'صيانة' ? 'Service' : 'Finance',
      image: newImage,
      validUntil: newValidUntil,
      validUntilEn: 'Valid until Dec 31, 2026',
      badge: newBadge,
      badgeEn: newBadge,
      description: newDescription || 'استفد من أقوى العروض التمويلية الحصرية من جبراني للسيارات.',
      descriptionEn: 'Benefit from exclusive financing and maintenance offers.',
      features: ['بدون دفعة أولى', 'ضمان ممتد', 'صيانة مجانية'],
      featuresEn: ['Zero Down Payment', 'Extended Warranty', 'Free Maintenance'],
      ctaText: 'احجز العرض الآن',
      ctaTextEn: 'Claim Offer Now'
    };

    addOffer(offer);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-600" />
            <span>{language === 'ar' ? 'إدارة العروض الترويجية والحملات التمويلية' : 'Campaigns & Promotional Offers'}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'ar' 
              ? 'إضافة وتعديل بنرات العروض، برامج التمويل بدون دفعة أولى، وباقات الصيانة المخفضة.' 
              : 'Create, update, and manage seasonal retail and financing campaigns.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة عرض جديد' : 'New Campaign'}</span>
          </button>
        </div>
      </div>

      {/* 2. Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                  {offer.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {offer.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">{offer.title}</h3>
                <p className="text-xs text-gray-600 font-medium">{offer.subtitle}</p>
                <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono pt-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  {offer.validUntil}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-mono">ID: {offer.id}</span>
              <button
                onClick={() => {
                  if (confirm(language === 'ar' ? 'هل تريد حذف هذا العرض؟' : 'Delete this offer?')) {
                    deleteOffer(offer.id);
                  }
                }}
                className="p-2 rounded-xl bg-white hover:bg-red-600 hover:text-white text-gray-400 border border-gray-200 transition-colors cursor-pointer"
                title="حذف العرض"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Add Offer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'إضافة عرض ترويجي جديد' : 'Create New Campaign'}</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">عنوان العرض الرئيسي:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عرض الصيف التمويلي على لاند كروزر برادو 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">العنوان الفرعي والمزايا:</label>
                <input
                  type="text"
                  placeholder="مثال: 0% دفعة أولى وبدون رسوم إدارية مع ضمان 5 سنوات"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">تصنيف العرض:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 outline-none"
                  >
                    <option value="سيارات">سيارات ومبيعات</option>
                    <option value="تمويل">برامج التمويل</option>
                    <option value="صيانة">خدمات وصيانة</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">شارة العرض:</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">تاريخ سريان العرض:</label>
                <input
                  type="text"
                  value={newValidUntil}
                  onChange={(e) => setNewValidUntil(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                >
                  حفظ ونشر العرض
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
