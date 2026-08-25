import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle, Search, Building2, MessageCircle } from 'lucide-react';
import { SHOWROOMS } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

export const ShowroomsSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = [
    { id: 'all', labelAr: 'كافة مناطق المملكة', labelEn: 'All Regions' },
    { id: 'central', labelAr: 'المنطقة الوسطى (الرياض)', labelEn: 'Central (Riyadh)' },
    { id: 'western', labelAr: 'المنطقة الغربية (جدة، مكة، المدينة)', labelEn: 'Western (Jeddah, Makkah, Madinah)' },
    { id: 'eastern', labelAr: 'المنطقة الشرقية (الدمام والخبر)', labelEn: 'Eastern (Dammam, Khobar)' },
    { id: 'southern', labelAr: 'المنطقة الجنوبية (أبها وخميس مشيط)', labelEn: 'Southern (Abha, Khamis)' },
    { id: 'northern', labelAr: 'المنطقة الشمالية (تبوك)', labelEn: 'Northern (Tabuk)' }
  ];

  const filteredShowrooms = SHOWROOMS.filter((showroom) => {
    if (selectedRegion !== 'all' && showroom.region !== selectedRegion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        showroom.name.toLowerCase().includes(q) ||
        showroom.nameEn.toLowerCase().includes(q) ||
        showroom.address.toLowerCase().includes(q) ||
        showroom.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenNavigation = (showroom: typeof SHOWROOMS[0]) => {
    const query = showroom.mapQuery || `${showroom.name} ${showroom.city}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <section id="showrooms" className="py-20 bg-gray-50 border-t border-gray-200 font-arabic">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#0056B3] text-xs font-bold mb-4 border border-red-100">
            <MapPin className="w-4 h-4 text-[#0056B3]" />
            <span>{language === 'ar' ? 'شبكة الفروع ومراكز الخدمة' : 'Showrooms & Service Network'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 font-arabic tracking-tight">
            {language === 'ar' ? 'صالات العرض ومراكز صيانة سولينا المعتمدة' : 'Find Authorized Solina Showrooms & Service Centers'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'أكثر من 100 صالة عرض ومركز خدمة وصيانة معتمد لشركة سولينا للسيارات لخدمتكم في كافة مدن ومناطق المملكة.'
              : 'Over 100 modern Solina Motors showrooms and express service centers ready to assist you across Saudi Arabia.'}
          </p>
        </div>

        {/* Filter & Region Selectors */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-[#0056B3] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? reg.labelAr : reg.labelEn}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث باسم المدينة أو الفرع...' : 'Search branch or city...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-9 pl-3 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowrooms.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#0056B3]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                    {language === 'ar' ? branch.city : branch.cityEn}
                  </span>
                  {branch.isMain && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-[#0056B3]">
                      {language === 'ar' ? 'المركز الرئيسي' : 'Main Hub'}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2 font-arabic">
                  {language === 'ar' ? branch.name : branch.nameEn}
                </h3>

                <p className="text-xs text-gray-600 mb-4 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? branch.address : branch.addressEn}</span>
                </p>

                <div className="space-y-2 mb-5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{language === 'ar' ? branch.workingHours : branch.workingHoursEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span dir="ltr" className="font-mono text-gray-800 font-bold">{branch.phone}</span>
                  </div>
                </div>

                {/* Available Services */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(language === 'ar' ? branch.services : branch.servicesEn).map((srv, i) => (
                    <span key={i} className="text-[10px] bg-red-50 text-[#0056B3] font-medium px-2 py-0.5 rounded-md">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenNavigation(branch)}
                  className="w-full py-2 px-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'الاتجاهات' : 'Directions'}</span>
                </button>
                <a
                  href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-2 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'اتصل الآن' : 'Call'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
