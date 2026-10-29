import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Navigation,
  Download,
  X
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Showroom } from '../../data/toyotaData';

export const AdminShowroomsTab: React.FC = () => {
  const { showrooms, addShowroom, deleteShowroom, updateShowroom, exportDataToCSV } = useAdminData();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowroom, setEditingShowroom] = useState<Showroom | null>(null);

  // Showroom Form State
  const [name, setName] = useState('');
  const [city, setCity] = useState('الرياض');
  const [region, setRegion] = useState<'central' | 'western' | 'eastern' | 'southern' | 'northern'>('central');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('8002444400');
  const [workingHours, setWorkingHours] = useState('السبت - الخميس: 8:00 ص - 10:00 م');
  const [mapQuery, setMapQuery] = useState('Riyadh Khurais Road Solina Motors');
  const [selectedServices, setSelectedServices] = useState<('مبيعات' | 'صيانة' | 'قطع غيار' | 'سمكرة ودهان')[]>(['مبيعات', 'صيانة', 'قطع غيار']);

  const ALL_SERVICES: ('مبيعات' | 'صيانة' | 'قطع غيار' | 'سمكرة ودهان')[] = [
    'مبيعات',
    'صيانة',
    'قطع غيار',
    'سمكرة ودهان'
  ];

  const openAddModal = () => {
    setEditingShowroom(null);
    setName('');
    setCity('الرياض');
    setRegion('central');
    setAddress('');
    setPhone('8002444400');
    setWorkingHours('السبت - الخميس: 8:00 ص - 10:00 م');
    setMapQuery('Riyadh Solina Motors');
    setSelectedServices(['مبيعات', 'صيانة', 'قطع غيار']);
    setIsModalOpen(true);
  };

  const openEditModal = (branch: Showroom) => {
    setEditingShowroom(branch);
    setName(branch.name);
    setCity(branch.city);
    setRegion(branch.region);
    setAddress(branch.address);
    setPhone(branch.phone);
    setWorkingHours(branch.workingHours);
    setMapQuery(branch.mapQuery);
    setSelectedServices(branch.services as ('مبيعات' | 'صيانة' | 'قطع غيار' | 'سمكرة ودهان')[]);
    setIsModalOpen(true);
  };

  const toggleService = (svc: 'مبيعات' | 'صيانة' | 'قطع غيار' | 'سمكرة ودهان') => {
    setSelectedServices(prev =>
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  const filteredShowrooms = showrooms.filter(s => {
    const matchQ =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchR = selectedRegion === 'all' || s.region === selectedRegion;
    return matchQ && matchR;
  });

  const handleSaveShowroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    const servicesEnMap: Record<string, 'Sales' | 'Service' | 'Parts' | 'BodyShop'> = {
      'مبيعات': 'Sales',
      'صيانة': 'Service',
      'قطع غيار': 'Parts',
      'سمكرة ودهان': 'BodyShop'
    };

    const servicesList = selectedServices.length > 0 ? selectedServices : (['مبيعات'] as ('مبيعات')[]);
    const servicesEnList = servicesList.map(s => servicesEnMap[s] || 'Sales');

    if (editingShowroom) {
      updateShowroom(editingShowroom.id, {
        name,
        nameEn: name,
        city,
        cityEn: city,
        region,
        address,
        addressEn: address,
        phone,
        workingHours,
        workingHoursEn: workingHours,
        services: servicesList,
        servicesEn: servicesEnList,
        mapQuery: mapQuery || `${city} ${name}`
      });
    } else {
      const created: Showroom = {
        id: `showroom-${Date.now()}`,
        name,
        nameEn: name,
        city,
        cityEn: city,
        region,
        address,
        addressEn: address,
        phone,
        workingHours,
        workingHoursEn: workingHours,
        services: servicesList,
        servicesEn: servicesEnList,
        coordinates: { lat: 24.7136, lng: 46.6753 },
        mapQuery: mapQuery || `${city} ${name}`
      };
      addShowroom(created);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#e0e0e0] shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#141414] font-display flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#141414]" />
            <span>{language === 'ar' ? 'إدارة شبكة فروع سولينا وصالات العرض ومراكز الصيانة' : 'Solina Showrooms & Dealer Network'}</span>
          </h2>
          <p className="text-xs text-[#707070] mt-0.5">
            {language === 'ar' 
              ? 'متابعة وإضافة وتعديل فروع سولينا للسيارات بالمملكة، أوقات العمل، أرقام الهواتف، والخدمات المتاحة بكل فرع.' 
              : 'Manage official Solina Motors branch locators, operating hours, and service availability.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-2 rounded-xl bg-[#f0f0f0] text-[#707070] font-mono">
            {showrooms.length} فرع نشط
          </span>
          <button
            onClick={() => exportDataToCSV('showrooms')}
            className="flex items-center gap-1.5 bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير الفروع (10 صيغ)</span>
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#141414] hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-none  transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة فرع سولينا جديد</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#adadad] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث باسم الفرع، المدينة، أو العنوان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e0e0e0] text-[#141414] text-xs rounded-xl py-2.5 pr-10 pl-3 focus:border-[#141414] outline-none"
          />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full sm:w-64 bg-white border border-[#e0e0e0] text-[#141414] text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
        >
          <option value="all">كافة المناطق ({showrooms.length})</option>
          <option value="central">المنطقة الوسطى (الرياض والقصيم)</option>
          <option value="western">المنطقة الغربية (جدة، مكة، المدينة)</option>
          <option value="eastern">المنطقة الشرقية (الدمام والخبر)</option>
          <option value="southern">المنطقة الجنوبية (أبها وجازان)</option>
          <option value="northern">المنطقة الشمالية (تبوك وحائل)</option>
        </select>
      </div>

      {/* 3. Showrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredShowrooms.map((branch) => (
          <div 
            key={branch.id}
            className="bg-white rounded-3xl border border-[#e0e0e0] p-5 shadow-none hover:shadow-none transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-[#141414] text-sm block">{branch.name}</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] shrink-0">
                  {branch.city}
                </span>
              </div>

              <p className="text-xs text-[#707070] flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#adadad] shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </p>

              <div className="text-xs text-[#707070] space-y-1 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#141414]" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#707070]">
                  <Clock className="w-3.5 h-3.5 text-[#adadad]" />
                  <span>{branch.workingHours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {branch.services.map((svc, i) => (
                  <span key={i} className="text-[10px] bg-[#f0f0f0] text-[#707070] font-semibold px-2 py-0.5 rounded-md">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e0e0e0] flex items-center justify-between">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#141414] hover:underline flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>فتح على خرائط Google</span>
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(branch)}
                  className="px-2.5 py-1.5 rounded-xl bg-[#f0f0f0] hover:bg-black hover:text-white text-[#707070] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل تريد حذف هذا الفرع؟')) deleteShowroom(branch.id);
                  }}
                  className="p-1.5 rounded-xl text-[#adadad] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="حذف الفرع"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Add / Edit Showroom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-none border border-[#e0e0e0] animate-in zoom-in-95 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0]">
              <h3 className="font-bold text-[#141414] text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#141414]" />
                <span>{editingShowroom ? `تعديل الفرع: ${editingShowroom.name}` : 'إضافة فرع سولينا جديد'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#707070] hover:text-black flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveShowroom} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#707070] block mb-1">اسم الفرع / المركز *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: مركز سولينا الرئيسي - طريق خريص"
                  className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none focus:border-[#141414]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">المدينة *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">المنطقة الإدارية</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as any)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                  >
                    <option value="central">المنطقة الوسطى</option>
                    <option value="western">المنطقة الغربية</option>
                    <option value="eastern">المنطقة الشرقية</option>
                    <option value="southern">المنطقة الجنوبية</option>
                    <option value="northern">المنطقة الشمالية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707070] block mb-1">العنوان التفصيلي *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="مثال: طريق خريص الفرعي، حي المنار، الرياض"
                  className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-xs text-[#141414] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#707070] block mb-1">الرقم الموحد / الهاتف</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 font-mono text-[#141414] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#707070] block mb-1">أوقات العمل</label>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 text-[#141414] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707070] block mb-1.5">الخدمات المتوفرة في الفرع</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SERVICES.map(svc => {
                    const active = selectedServices.includes(svc);
                    return (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => toggleService(svc)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#141414] text-white border-[#141414]'
                            : 'bg-[#f3f3f3] text-[#707070] border-[#e0e0e0] hover:bg-[#f3f3f3]'
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#707070] block mb-1">عبارة البحث في خرائط Google</label>
                <input
                  type="text"
                  value={mapQuery}
                  onChange={(e) => setMapQuery(e.target.value)}
                  className="w-full bg-[#f3f3f3] border border-[#e0e0e0] rounded-xl p-2.5 font-mono text-[#141414] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#141414] hover:bg-black text-white font-bold py-3 rounded-xl text-xs cursor-pointer shadow-none"
                >
                  {editingShowroom ? 'حفظ تعديلات الفرع' : 'إضافة الفرع لشبكة سولينا'}
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
