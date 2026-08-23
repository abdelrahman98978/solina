import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Fuel, 
  Gauge, 
  Users, 
  CheckCircle2, 
  FileText, 
  Plus, 
  Check, 
  Layers, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  Zap,
  Printer,
  Compass,
  Crown
} from 'lucide-react';
import type { Vehicle, VehicleGrade } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onToggleCompare: (vehicle: Vehicle) => void;
  onOpenQuotation?: (vehicle: Vehicle, grade: VehicleGrade) => void;
  isCompared: boolean;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onOpenTestDrive,
  onToggleCompare,
  onOpenQuotation,
  isCompared
}) => {
  const { language, formatPrice } = useLanguage();
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  if (!isOpen || !vehicle) return null;

  const isLexus = vehicle.brand === 'lexus';
  const currentGrade = vehicle.grades[selectedGradeIndex] || vehicle.grades[0];
  const currentColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  const estimatedMonthly = Math.round((currentGrade.price * 0.9) / 60);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-10 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            {isLexus ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>LEXUS • موديل {vehicle.year}</span>
              </span>
            ) : (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                TOYOTA • موديل {vehicle.year}
              </span>
            )}

            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
              {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn}
            </span>

            {vehicle.isHybrid && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-200">
                <Zap className="w-3 h-3" />
                <span>HEV Hybrid</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center font-bold cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Car Showcase (6 Cols) */}
          <div className="md:col-span-6 space-y-6">
            <div className="relative h-64 sm:h-72 w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center p-6 border border-gray-200/80 overflow-hidden">
              <img
                src={currentColor?.image || currentGrade?.image || vehicle.cardImage}
                alt={vehicle.nameAr}
                className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-all duration-300"
              />
            </div>

            {/* Color Swatches */}
            <div>
              <span className="text-xs font-bold text-gray-700 block mb-2">
                {language === 'ar' ? `الألوان المتاحة: ${currentColor.name}` : `Available Colors: ${currentColor.nameEn}`}
              </span>
              <div className="flex items-center gap-2">
                {vehicle.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorIndex(idx)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full border border-gray-300 transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? 'ring-2 ring-blue-600 ring-offset-2 scale-125 shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Specs Quick Strip */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'الاستهلاك' : 'Economy'}</span>
                <span className="font-bold text-gray-800 font-mono text-[11px]">{vehicle.fuelEconomy}</span>
              </div>
              <div className="border-x border-gray-200">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'القوة' : 'Power'}</span>
                <span className="font-bold text-gray-800 font-mono text-[11px]">{vehicle.horsepower}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'المقاعد' : 'Seats'}</span>
                <span className="font-bold text-gray-800 text-[11px]">{vehicle.seats} {language === 'ar' ? 'ركاب' : 'Seats'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Trims & Specifications (6 Cols) */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-display mb-1">
                {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
              </h2>
              <p className="text-xs text-gray-500">{vehicle.engineSpec}</p>
            </div>

            {/* Trims Selector Radio Cards */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                {language === 'ar' ? 'اختر فئة السيارة:' : 'Select Trim Level:'}
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                {vehicle.grades.map((grade, idx) => {
                  const isSelected = selectedGradeIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedGradeIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-600 text-gray-900 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs block">
                          {language === 'ar' ? grade.name : grade.nameEn}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {language === 'ar' ? `${grade.engine} • ${grade.transmission}` : `${grade.engineEn} • ${grade.transmissionEn}`}
                        </span>
                      </div>

                      <div className="text-left font-mono">
                        <span className="font-black text-sm text-blue-600 block">
                          {formatPrice(grade.price)} ر.س
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {language === 'ar' ? 'شامل الضريبة' : 'Incl. VAT'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features Included in Trim */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <span className="text-xs font-bold text-gray-900 block mb-2">
                {language === 'ar' ? `المواصفات القياسية لفئة (${currentGrade.name}):` : `Standard Features for (${currentGrade.nameEn}):`}
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-600">
                {(language === 'ar' ? currentGrade.features : currentGrade.featuresEn).map((f, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Monthly Installment Box */}
            <div className="bg-[#0F172A] text-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'سعر الفئة الشامل' : 'Selected Trim Price'}</span>
                <span className="text-2xl font-black text-white font-mono">{formatPrice(currentGrade.price)} ر.س</span>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'القسط الشهري التقديري' : 'Monthly Payment'}</span>
                <span className="text-base font-bold text-blue-400 font-mono">{formatPrice(estimatedMonthly)} ر.س/شهر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(vehicle)}
              className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isCompared ? (language === 'ar' ? 'مضاف للمقارنة' : 'In Comparison') : (language === 'ar' ? 'إضافة للمقارنة' : 'Add to Compare')}</span>
            </button>

            {onOpenQuotation && (
              <button
                onClick={() => onOpenQuotation(vehicle, currentGrade)}
                className="py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-400 bg-white text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'عرض سعر رسمي' : 'Official Quotation'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenTestDrive(vehicle.nameAr)}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>{language === 'ar' ? 'حجز تجربة قيادة لهذا الطراز' : 'Book Test Drive'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
