import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  X, 
  Search,
  Download,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Offer } from '../../data/toyotaData';
import { SaudiRiyalPrice } from '../SaudiRiyalSymbol';

export const AdminOffersTab: React.FC = () => {
  const { offers, addOffer, deleteOffer, updateOffer, exportDataToCSV } = useAdminData();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'سيارات' | 'صيانة' | 'تمويل'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showMarketingRoiBoard, setShowMarketingRoiBoard] = useState(true);
  const [monthlyMarketingBudget, setMonthlyMarketingBudget] = useState<number>(180000);

  // Offer Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'سيارات' | 'صيانة' | 'تمويل'>('سيارات');
  const [badge, setBadge] = useState('عرض سولينا 2026');
  const [validUntil, setValidUntil] = useState('حتى 31 ديسمبر 2026');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/prado/desktop/4---desktop.webp?w=1920&q=75&f=webp');
  const [featuresText, setFeaturesText] = useState('بدون دفعة أولى, ضمان ممتد 5 سنوات, صيانة مجانية');

  const openAddModal = () => {
    setEditingOffer(null);
    setTitle('');
    setSubtitle('');
    setCategory('سيارات');
    setBadge('عرض سولينا 2026');
    setValidUntil('حتى 31 ديسمبر 2026');
    setDescription('');
    setImage('https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/prado/desktop/4---desktop.webp?w=1920&q=75&f=webp');
    setFeaturesText('بدون دفعة أولى, ضمان ممتد 5 سنوات, صيانة مجانية');
    setIsModalOpen(true);
  };

  const openEditModal = (offer: Offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setSubtitle(offer.subtitle);
    setCategory(offer.category);
    setBadge(offer.badge);
    setValidUntil(offer.validUntil);
    setDescription(offer.description);
    setImage(offer.image);
    setFeaturesText(offer.features.join(', '));
    setIsModalOpen(true);
  };

  const filteredOffers = offers.filter(o => {
    const matchesSearch =
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.badge.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || o.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const featuresList = featuresText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingOffer) {
      updateOffer(editingOffer.id, {
        title,
        titleEn: title,
        subtitle: subtitle || 'عرض حصري من سولينا للسيارات',
        subtitleEn: subtitle || 'Exclusive Solina Motors Promotion',
        category,
        categoryEn: category === 'سيارات' ? 'Vehicles' : category === 'صيانة' ? 'Service' : 'Finance',
        image,
        validUntil,
        badge,
        badgeEn: badge,
        description: description || 'استفد من أقوى العروض التمويلية والخدمية الحصرية من سولينا للسيارات.',
        features: featuresList.length > 0 ? featuresList : ['بدون دفعة أولى', 'ضمان ممتد']
      });
    } else {
      const offer: Offer = {
        id: `offer-${Date.now()}`,
        title,
        titleEn: title,
        subtitle: subtitle || 'عرض حصري من سولينا للسيارات',
        subtitleEn: subtitle || 'Exclusive Solina Motors Promotion',
        category,
        categoryEn: category === 'سيارات' ? 'Vehicles' : category === 'صيانة' ? 'Service' : 'Finance',
        image,
        validUntil,
        validUntilEn: 'Valid until Dec 31, 2026',
        badge,
        badgeEn: badge,
        description: description || 'استفد من أقوى العروض التمويلية والخدمية الحصرية من سولينا للسيارات.',
        descriptionEn: 'Benefit from exclusive Solina Motors financing and maintenance offers.',
        features: featuresList.length > 0 ? featuresList : ['بدون دفعة أولى', 'ضمان ممتد', 'صيانة مجانية'],
        featuresEn: ['Zero Down Payment', 'Extended Warranty', 'Free Maintenance'],
        ctaText: 'احجز العرض الآن',
        ctaTextEn: 'Claim Offer Now'
      };
      addOffer(offer);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#141414] font-display flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#141414]" />
            <span>{language === 'ar' ? 'إدارة عروض سولينا الترويجية والحملات التمويلية' : 'Solina Campaigns & Promotional Offers'}</span>
          </h2>
          <p className="text-xs text-[#707070] mt-0.5">
            {language === 'ar' 
              ? 'إضافة وتعديل ومعاينة بنرات العروض، برامج التمويل بدون دفعة أولى، وباقات الصيانة المعتمدة.' 
              : 'Create, update, preview, and manage seasonal retail and financing campaigns.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMarketingRoiBoard(prev => !prev)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
              showMarketingRoiBoard
                ? 'bg-[#141414] text-white border-[#141414]'
                : 'bg-[#f3f3f3] text-[#141414] border-[#e0e0e0] hover:bg-[#e0e0e0]'
            }`}
          >
            {showMarketingRoiBoard ? 'إخفاء تحليلات التسويق و ROAS' : 'لوحة ميزانية التسويق و ROAS / CAC'}
          </button>

          <button
            onClick={() => exportDataToCSV('offers')}
            className="flex items-center gap-1.5 bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير العروض (10 صيغ)</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#141414] hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-none  transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة عرض جديد' : 'New Campaign'}</span>
          </button>
        </div>
      </div>

      {/* 1.5 Omnichannel Marketing Budget, CAC, CPL & ROAS Analytics Board */}
      {showMarketingRoiBoard && (
        <div className="bg-white p-6 rounded-3xl border border-[#e0e0e0] space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f0f0f0] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="mobbin-badge-popular px-2.5 py-0.5 text-[10px]">Omnichannel Demand Generation</span>
                <span className="text-[11px] font-bold text-[#707070]">تحليل تكلفة الاستحواذ (CAC) وعائد الإنفاق الإعلاني (ROAS)</span>
              </div>
              <h3 className="text-base font-black text-[#141414] mt-1">
                خطة التسويق الرقمي والميداني وتوزيع الميزانية حسب القنوات والمواسم (2026 Marketing Plan)
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-[#f3f3f3] px-3.5 py-2 rounded-2xl text-xs">
              <span className="font-bold text-[#707070]">الميزانية التسويقية الشهرية:</span>
              <input
                type="number"
                step={10000}
                value={monthlyMarketingBudget}
                onChange={(e) => setMonthlyMarketingBudget(Math.max(20000, Number(e.target.value)))}
                className="w-28 p-1.5 rounded-lg bg-white border border-[#e0e0e0] font-mono font-bold text-center text-[#141414]"
              />
              <span className="font-bold text-[#141414]">ر.س</span>
            </div>
          </div>

          {/* 4 Channel Allocation & ROI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                channel: 'إعلانات الأداء (Google / Snap / TikTok)',
                sharePct: 45,
                cpl: 65,
                convRate: 0.085,
                avgVehicleMargin: 9800
              },
              {
                channel: 'محركات البحث والذكاء الاصطناعي (SEO / GEO)',
                sharePct: 20,
                cpl: 28,
                convRate: 0.11,
                avgVehicleMargin: 10500
              },
              {
                channel: 'الفعاليات الميدانية وتجارب القيادة VIP',
                sharePct: 20,
                cpl: 140,
                convRate: 0.22,
                avgVehicleMargin: 16400
              },
              {
                channel: 'أتمتة الولاء وإعادة الاستهداف (CRM & WhatsApp)',
                sharePct: 15,
                cpl: 18,
                convRate: 0.14,
                avgVehicleMargin: 8900
              }
            ].map((ch, idx) => {
              const allocatedSAR = Math.round((monthlyMarketingBudget * ch.sharePct) / 100);
              const estLeads = Math.max(1, Math.round(allocatedSAR / ch.cpl));
              const estClosedCars = Math.max(1, Math.round(estLeads * ch.convRate));
              const cacSAR = Math.round(allocatedSAR / estClosedCars);
              const grossProfitSAR = estClosedCars * ch.avgVehicleMargin;
              const roasMultiple = (grossProfitSAR / Math.max(1, allocatedSAR)).toFixed(1);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-2 ${
                    idx === 0 ? 'bg-[#141414] text-white border-[#141414]' : 'bg-[#f8f9fa] text-[#141414] border-[#e5e7eb]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px]">{ch.channel}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ${idx === 0 ? 'bg-white/15 text-white' : 'bg-white border border-[#e0e0e0]'}`}>
                      {ch.sharePct}%
                    </span>
                  </div>
                  <div className="font-mono font-black text-base">
                    <SaudiRiyalPrice amount={allocatedSAR.toLocaleString('en-US')} />
                  </div>
                  <div className={`grid grid-cols-2 gap-1 text-[10px] pt-1 border-t ${idx === 0 ? 'border-white/15 text-white/80' : 'border-[#e0e0e0] text-[#555555]'}`}>
                    <span>الطلبات المتوقعة: <strong className="font-mono">{estLeads}</strong></span>
                    <span>المبيعات المقدرة: <strong className="font-mono">{estClosedCars} سيارة</strong></span>
                    <span>تكلفة العميل CAC: <strong className="font-mono">{cacSAR.toLocaleString('en-US')}</strong></span>
                    <span>العائد ROAS: <strong className="font-mono">{roasMultiple}x</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seasonal Saudi Campaign Calendar Strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs pt-1">
            {[
              { q: 'Q1 — يوم التأسيس والانطلاقة', offer: '0% دفعة أولى + 0% رسوم إدارية', target: 'تصريف السيدان والهايبرد (فئة A)' },
              { q: 'Q2 — موسم رمضان المبارك', offer: 'قسطك علينا أول شهرين + صيانة سنتين', target: 'تحقيق 35% من مبيعات الأفراد السنوية' },
              { q: 'Q3 — الصيف والعودة للمدارس', offer: 'كاش باك حتى 12,000 ر.س + عروض SUV', target: 'تنشيط العائلات والسيارات الكهربائية' },
              { q: 'Q4 — اليوم الوطني وتصفية العام', offer: 'أقل هامش مرابحة 3.49% + استبدال فوري', target: 'إغلاق عقود أساطيل الشركات B2B' }
            ].map((season, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#f3f3f3] border border-[#e0e0e0] space-y-1">
                <span className="font-bold text-[#141414] block text-[11px]">{season.q}</span>
                <span className="text-[10px] font-semibold text-[#141414] block">{season.offer}</span>
                <span className="text-[10px] text-[#707070] block">{season.target}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-none flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#adadad] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بعنوان العرض، المزايا، أو الشارة..."
            className="w-full bg-[#f3f3f3] border border-[#e0e0e0] text-[#141414] text-xs rounded-xl py-2.5 pr-10 pl-3 focus:border-[#141414] outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: `الكل (${offers.length})` },
            { id: 'سيارات', label: 'عروض السيارات' },
            { id: 'تمويل', label: 'برامج التمويل' },
            { id: 'صيانة', label: 'خدمات الصيانة' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#141414] text-white shadow-none'
                  : 'bg-[#f0f0f0] text-[#707070] hover:bg-[#e0e0e0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white rounded-3xl border border-[#e0e0e0] overflow-hidden shadow-none hover:shadow-none transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 relative overflow-hidden bg-[#f0f0f0]">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 right-3 bg-[#141414] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-none">
                  {offer.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {offer.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-[#141414] text-sm">{offer.title}</h3>
                <p className="text-xs text-[#707070] font-medium">{offer.subtitle}</p>
                {offer.features && offer.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {offer.features.slice(0, 3).map((feat, i) => (
                      <span key={i} className="text-[10px] bg-[#f3f3f3] text-[#141414] px-2 py-0.5 rounded-md font-semibold">
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-[11px] text-[#adadad] flex items-center gap-1 font-mono pt-1">
                  <Calendar className="w-3 h-3 text-[#141414]" />
                  {offer.validUntil}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#f3f3f3] border-t border-[#e0e0e0] flex items-center justify-between">
              <span className="text-[11px] text-[#707070] font-mono">ID: {offer.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(offer)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-black hover:text-white text-[#707070] border border-[#e0e0e0] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="تعديل ومعاينة العرض"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(language === 'ar' ? 'هل تريد حذف هذا العرض؟' : 'Delete this offer?')) {
                      deleteOffer(offer.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-red-600 hover:text-white text-[#adadad] border border-[#e0e0e0] transition-colors cursor-pointer"
                  title="حذف العرض"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Add / Edit Offer Modal with Live Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-none border border-[#e0e0e0] animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#e0e0e0] mb-5">
              <h3 className="font-bold text-[#141414] text-base flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#141414]" />
                <span>{editingOffer ? `تعديل العرض: ${editingOffer.title}` : 'إضافة عرض ترويجي جديد في سولينا'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#707070] hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form onSubmit={handleSaveOffer} className="lg:col-span-7 space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">عنوان العرض الرئيسي *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عروض الصيف التمويلية على سولينا برادو 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] focus:border-[#141414] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#707070] block mb-1">العنوان الفرعي والمزايا المختصرة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: 0% دفعة أولى وبدون رسوم إدارية مع ضمان سولينا الممتد"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] focus:border-[#141414] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#707070] block mb-1">تصنيف العرض</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                    >
                      <option value="سيارات">سيارات ومبيعات</option>
                      <option value="تمويل">برامج التمويل</option>
                      <option value="صيانة">خدمات وصيانة</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#707070] block mb-1">شارة العرض (Badge)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#707070] block mb-1">تاريخ سريان العرض</label>
                    <input
                      type="text"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#707070] block mb-1">رابط صورة العرض (URL)</label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] font-mono outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#707070] block mb-1">نقاط المزايا (مفصولة بفاصلة ,)</label>
                  <input
                    type="text"
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="بدون دفعة أولى, صيانة مجانية سنتين, تأمين شامل"
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#707070] block mb-1">الوصف التفصيلي والشروط</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="تفاصيل الحملة الترويجية في صالات سولينا للسيارات..."
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#141414] hover:bg-black text-white font-bold py-3 rounded-xl shadow-none  transition-all cursor-pointer"
                  >
                    {editingOffer ? 'حفظ التعديلات وتحديث الموقع' : 'حفظ ونشر العرض فوراً'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#707070] font-bold rounded-xl transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>

              {/* Live Offer Card Preview */}
              <div className="lg:col-span-5 bg-[#f3f3f3] rounded-2xl p-4 border border-[#e0e0e0] flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#707070]">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#141414]" />
                    <span>معاينة حية لبطاقة العرض</span>
                  </span>
                  <span className="text-[10px] bg-[#f3f3f3] text-[#141414] px-2 py-0.5 rounded-full">مباشر</span>
                </div>

                <div className="bg-white rounded-2xl border border-[#e0e0e0] overflow-hidden shadow-none">
                  <div className="h-36 relative bg-[#f0f0f0]">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80';
                      }}
                    />
                    <span className="absolute top-2.5 right-2.5 bg-[#141414] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {badge || 'عرض سولينا'}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-[#141414] text-xs">{title || 'عنوان العرض الترويجي يظهر هنا'}</h4>
                    <p className="text-[11px] text-[#707070]">{subtitle || 'العنوان الفرعي والمزايا التمويلية من سولينا للسيارات'}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {featuresText.split(',').map(s => s.trim()).filter(Boolean).map((f, idx) => (
                        <span key={idx} className="text-[9px] bg-[#f3f3f3] text-[#141414] px-2 py-0.5 rounded font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between text-[10px] text-[#adadad]">
                      <span>{validUntil}</span>
                      <span className="text-[#141414] font-bold">سولينا للسيارات</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-[#adadad] text-center">
                  ينعكس هذا العرض تلقائياً في الصفحة الرئيسية وصفحة العروض الخاصة بمجرد الحفظ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
