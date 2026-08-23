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
    <section id="showrooms" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ar' ? 'شبكة الفروع ومراكز الخدمة' : 'Showrooms & Service Network'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 font-display">
            {language === 'ar' ? 'مواقع المعارض ومراكز صيانة جبراني' : 'Find Authorized Showrooms & Service Hubs'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'أكثر من 100 صالة عرض ومركز خدمة وصيانة معتمد لخدمتكم في كافة مدن ومناطق المملكة.'
              : 'Over 100 modern showrooms and express service centers ready to assist you across Saudi Arabia.'}
          </p>
        </div>

        {/* Filter & Region Selectors */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
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
              placeholder={language === 'ar' ? 'ابحث باسم الحي أو الفرع...' : 'Search branch or city...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2.5 pr-9 pl-3 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowrooms.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                    {language === 'ar' ? branch.city : branch.cityEn}
                  </span>
                  {branch.isMain && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {language === 'ar' ? 'فرع رئيسي معتمد' : 'Flagship Center'}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-gray-900 mb-2 font-display">
                  {language === 'ar' ? branch.name : branch.nameEn}
                </h3>

                <p className="text-xs text-gray-500 mb-4 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? branch.address : branch.addressEn}</span>
                </p>

                {/* Working Hours */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4 text-[11px] text-gray-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{language === 'ar' ? 'أوقات العمل الرسمية:' : 'Working Hours:'}</span>
                  </div>
                  <p className="text-gray-500 pr-5">
                    {language === 'ar' ? branch.workingHours : branch.workingHoursEn}
                  </p>
                </div>

                {/* Available Services */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-gray-400 block mb-2">
                    {language === 'ar' ? 'الخدمات المتوفرة في هذا الفرع:' : 'Available Services:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'ar' ? branch.services : branch.servicesEn).map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg"
                      >
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${branch.phone}`}
                  className="py-2.5 px-3 rounded-xl border border-gray-200 hover:border-blue-400 font-bold text-xs text-gray-800 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{language === 'ar' ? 'اتصال بالفرع' : 'Call Branch'}</span>
                </a>

                <button
                  onClick={() => handleOpenNavigation(branch)}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'اتجاهات الخريطة' : 'GPS Directions'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
