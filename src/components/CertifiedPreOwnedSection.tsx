import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Car, MapPin, Gauge, Calendar, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { CERTIFIED_PRE_OWNED, type PreOwnedVehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface CertifiedPreOwnedSectionProps {
  onOpenTestDrive: (modelName?: string) => void;
}

export const CertifiedPreOwnedSection: React.FC<CertifiedPreOwnedSectionProps> = ({
  onOpenTestDrive
}) => {
  const { language, formatPrice } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredCPO = CERTIFIED_PRE_OWNED.filter(car => {
    if (selectedLocation === 'all') return true;
    return car.location.includes(selectedLocation);
  });

  return (
    <section id="certified-preowned" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? 'أوتوهب - سيارات تويوتا المعتمدة' : 'AutoHub - Toyota Certified Pre-Owned'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'سيارات تويوتا المستعملة المضمونة' : 'Certified Pre-Owned Toyota Fleet'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-2 max-w-xl">
              {language === 'ar'
                ? 'فحص شامل لـ 160 نقطة حيوية، ضمان وكالة معتمد ممتد حتى 24 شهراً، وسجل صيانة رسمي موثق.'
                : '160-Point rigorous technical inspection, extended warranty up to 24 months, and full verified service history.'}
            </p>
          </div>

          {/* Location Filters */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
            {[
              { id: 'all', labelAr: 'كافة الفروع', labelEn: 'All Branches' },
              { id: 'الرياض', labelAr: 'الرياض', labelEn: 'Riyadh' },
              { id: 'جدة', labelAr: 'جدة', labelEn: 'Jeddah' },
              { id: 'الدمام', labelAr: 'الدمام / الخبر', labelEn: 'Eastern Region' }
            ].map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedLocation === loc.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {language === 'ar' ? loc.labelAr : loc.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* CPO Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCPO.map(car => (
            <div
              key={car.id}
              className="bg-white rounded-3xl border border-gray-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Stage */}
                <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center p-6 border-b border-gray-100">
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{car.inspectionPoints} {language === 'ar' ? 'نقطة فحص معتمدة' : 'Points Inspected'}</span>
                  </span>

                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-lg backdrop-blur-md">
                    {language === 'ar' ? `ضمان ${car.warrantyMonths} شهراً` : `${car.warrantyMonths} Months Warranty`}
                  </span>

                  <img
                    src={car.image}
                    alt={car.titleAr}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>موديل {car.year}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-blue-600" />
                      <span>{car.mileage.toLocaleString()} كم</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 mb-1 font-display group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? car.titleAr : car.titleEn}
                  </h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{car.location}</span>
                  </p>

                  {/* Price Block */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'السعر النقدي' : 'Cash Price'}</span>
                      <span className="text-lg font-black text-gray-900 font-mono">{formatPrice(car.price)} ر.س</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'أقساط تبدأ من' : 'Installment from'}</span>
                      <span className="text-sm font-black text-blue-600 font-mono">{formatPrice(car.monthlyInstallment)} ر.س/ش</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTestDrive(`طلب شراء سيارة معتمدة: ${car.titleAr} (${car.year})`)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{language === 'ar' ? 'حجز معاينة السيارة' : 'Book Vehicle Viewing'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
