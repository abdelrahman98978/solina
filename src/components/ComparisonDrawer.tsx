import React from 'react';
import { X, Layers, ArrowLeft, ArrowRight, Check, Trash2, Fuel, Gauge, Users, Car, Zap } from 'lucide-react';
import type { Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedVehicles: Vehicle[];
  onRemoveVehicle: (vehicleId: string) => void;
  onClearAll: () => void;
  onOpenTestDrive: (modelName?: string) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  comparedVehicles,
  onRemoveVehicle,
  onClearAll,
  onOpenTestDrive
}) => {
  const { language, formatPrice } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full p-6 md:p-10 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 font-display">
                {language === 'ar' ? 'مقارنة مواصفات أسطول سيارات جبراني' : 'Side-by-Side Fleet Comparison'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? `تمت إضافة (${comparedVehicles.length}) سيارات للمقارنة المباشرة` : `Comparing ${comparedVehicles.length} vehicles`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedVehicles.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مسح الكل' : 'Clear All'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {comparedVehicles.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Car className="w-16 h-16 text-gray-300 mx-auto" />
            <h4 className="text-lg font-bold text-gray-800">
              {language === 'ar' ? 'لم تقم باختيار أي سيارة للمقارنة بعد' : 'No vehicles selected for comparison yet'}
            </h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {language === 'ar'
                ? 'تصفح قائمة السيارات وانقر على زر المقارنة (+) لإضافة حتى 4 سيارات لمقارنة أسعارها ومواصفاتها.'
                : 'Browse vehicles and click the (+) button to compare up to 4 models side-by-side.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-right border-collapse">
              {/* Image & Title Header */}
              <thead>
                <tr>
                  <th className="p-4 w-44 bg-gray-50/50 rounded-2xl text-xs font-bold text-gray-500">
                    {language === 'ar' ? 'الموديل والصورة' : 'Vehicle Model'}
                  </th>
                  {comparedVehicles.map((car) => (
                    <th key={car.id} className="p-4 text-center min-w-[220px] bg-gray-50/30 rounded-2xl relative">
                      <button
                        onClick={() => onRemoveVehicle(car.id)}
                        className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-600 flex items-center justify-center shadow-sm cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-28 flex items-center justify-center p-2 mb-2">
                        <img src={car.cardImage} alt={car.nameAr} className="max-h-full max-w-full object-contain" />
                      </div>

                      <h4 className="font-black text-base text-gray-900 font-display">
                        {language === 'ar' ? car.nameAr : car.nameEn}
                      </h4>
                      <span className="text-xs text-gray-500 font-normal">{car.bodyTypeAr} | {car.year}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-xs">
                {/* Cash Price */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'السعر النقدي (شامل الضريبة)' : 'Cash Price (Incl. VAT)'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center font-black text-base text-gray-900 font-mono">
                      {formatPrice(car.priceStartingFrom)} ر.س
                    </td>
                  ))}
                </tr>

                {/* Monthly Installment */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'القسط الشهري التقديري' : 'Monthly Installment'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center font-black text-sm text-blue-600 font-mono">
                      {formatPrice(car.monthlyInstallmentStartingFrom)} ر.س/شهر
                    </td>
                  ))}
                </tr>

                {/* Engine Spec */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'المحرك والقوة' : 'Engine & Power'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center text-gray-800">
                      <span className="font-bold block">{car.horsepower}</span>
                      <span className="text-[11px] text-gray-500">{car.engineSpec}</span>
                    </td>
                  ))}
                </tr>

                {/* Fuel Economy */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'كفاءة استهلاك الوقود' : 'Fuel Economy'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center text-gray-800 font-semibold font-mono">
                      {car.fuelEconomy}
                    </td>
                  ))}
                </tr>

                {/* Transmission & Drivetrain */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'ناقل الحركة والدفع' : 'Transmission & Drive'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center text-gray-800">
                      {car.transmissionAr} • {car.drivetrain}
                    </td>
                  ))}
                </tr>

                {/* Seats */}
                <tr>
                  <td className="p-4 font-bold text-gray-700 bg-gray-50/50">{language === 'ar' ? 'عدد المقاعد' : 'Seating Capacity'}</td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center text-gray-800 font-bold">
                      {car.seats} {language === 'ar' ? 'ركاب' : 'Seats'}
                    </td>
                  ))}
                </tr>

                {/* Action CTA Row */}
                <tr>
                  <td className="p-4 bg-gray-50/50"></td>
                  {comparedVehicles.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenTestDrive(car.nameAr);
                        }}
                        className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-600/30 transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? 'حجز تجربة' : 'Book Drive'}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
