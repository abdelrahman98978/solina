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
  CheckCircle2,
  Navigation,
  Globe
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Showroom } from '../../data/toyotaData';

export const AdminShowroomsTab: React.FC = () => {
  const { showrooms, addShowroom, deleteShowroom, updateShowroom } = useAdminData();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredShowrooms = showrooms.filter(s => {
    const matchQ = s.name.includes(searchQuery) || s.city.includes(searchQuery) || s.address.includes(searchQuery);
    const matchR = selectedRegion === 'all' || s.region === selectedRegion;
    return matchQ && matchR;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>{language === 'ar' ? 'إدارة شبكة الفروع وصالات العرض ومراكز الصيانة' : 'Showrooms & Dealer Network'}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'ar' 
              ? 'متابعة الفروع المعتمدة بالمملكة، أوقات العمل، أرقام الهواتف، والخدمات المتاحة بكل فرع.' 
              : 'Manage official ALJ branch locators, operating hours, and service availability.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-mono">
            {showrooms.length} فرع نشط
          </span>
        </div>
      </div>

      {/* 2. Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث باسم الفرع أو المدينة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-10 pl-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full sm:w-60 bg-white border border-gray-200 text-gray-800 text-xs rounded-xl py-2.5 px-3 font-medium outline-none cursor-pointer"
        >
          <option value="all">كافة المناطق</option>
          <option value="central">المنطقة الوسطى (الرياض)</option>
          <option value="western">المنطقة الغربية (جدة، مكة، المدينة)</option>
          <option value="eastern">المنطقة الشرقية (الدمام والخبر)</option>
          <option value="southern">المنطقة الجنوبية (أبها وخميس مشيط)</option>
          <option value="northern">المنطقة الشمالية (تبوك)</option>
        </select>
      </div>

      {/* 3. Showrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredShowrooms.map((branch) => (
          <div 
            key={branch.id}
            className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="font-bold text-gray-900 text-sm block">{branch.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {branch.city}
                </span>
              </div>

              <p className="text-xs text-gray-500 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </p>

              <div className="text-xs text-gray-600 space-y-1 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{branch.workingHours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2">
                {branch.services.map((svc, i) => (
                  <span key={i} className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-md">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>فتح على خرائط Google</span>
              </a>

              <button
                onClick={() => {
                  if (confirm('هل تريد حذف هذا الفرع؟')) deleteShowroom(branch.id);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="حذف الفرع"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
