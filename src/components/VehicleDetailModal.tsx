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
  Crown,
  Download,
  Calculator,
  Sliders,
  Award,
  Info,
  Shield,
  Eye
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
  const { language, formatPrice, isRTL } = useLanguage();
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'grades' | 'finance'>('overview');
  const [interiorMode, setInteriorMode] = useState<boolean>(false);

  // Local Finance Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [financeTenureMonths, setFinanceTenureMonths] = useState<number>(60);
  const [profitRate, setProfitRate] = useState<number>(2.5);

  if (!isOpen || !vehicle) return null;

  const currentGrade = vehicle.grades[selectedGradeIndex] || vehicle.grades[0];
  const currentColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  const carPrice = currentGrade.price;
  const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
  const principalAmount = carPrice - downPaymentAmount;
  const tenureYears = financeTenureMonths / 12;
  const totalProfit = Math.round(principalAmount * (profitRate / 100) * tenureYears);
  const totalFinanceAmount = principalAmount + totalProfit;
  const monthlyInstallment = Math.round(totalFinanceAmount / financeTenureMonths);

  const handleDownloadBrochure = () => {
    window.open('/1.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto font-arabic">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-gray-200 my-6 animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/90 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-[#0056B3] border border-red-200 shadow-xs">
              {language === 'ar' ? 'سولينا للسيارات • موديل ' : 'Solina Saudi Arabia • Model '} {vehicle.year}
            </span>

            <span className="text-xs text-gray-600 font-medium hidden sm:inline-block">
              {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn}
            </span>

            {vehicle.isHybrid && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-200">
                <Zap className="w-3 h-3" />
                <span>HEV Hybrid</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(vehicle)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompared 
                  ? 'bg-[#0056B3] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? (language === 'ar' ? 'تمت الإضافة للمقارنة' : 'Compared') : (language === 'ar' ? 'مقارنة' : 'Compare')}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center font-bold cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-100 bg-white overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'overview', label: language === 'ar' ? 'نظرة عامة والتصميم' : 'Overview & Design' },
            { id: 'specs', label: language === 'ar' ? 'المواصفات الفنية الكاملة' : 'Full Technical Specs' },
            { id: 'grades', label: language === 'ar' ? 'الفئات والأسعار' : 'Trims & Pricing' },
            { id: 'finance', label: language === 'ar' ? 'حاسبة التمويل والأقساط' : 'Finance Calculator' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#0056B3] text-[#0056B3]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Car Showcase (6 Cols) */}
              <div className="md:col-span-6 space-y-5">
                <div className="relative h-64 sm:h-80 w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center p-6 border border-gray-200 overflow-hidden">
                  {/* Exterior / Interior Toggle */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-xs">
                    <button
                      onClick={() => setInteriorMode(false)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        !interiorMode ? 'bg-[#0056B3] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'ar' ? 'المظهر الخارجي' : 'Exterior'}
                    </button>
                    <button
                      onClick={() => setInteriorMode(true)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        interiorMode ? 'bg-[#0056B3] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'ar' ? 'المقصورة الداخلية' : 'Interior'}
                    </button>
                  </div>

                  <img
                    src={interiorMode ? (vehicle.interiorImage || currentGrade?.image || vehicle.cardImage) : (currentColor?.image || currentGrade?.image || vehicle.cardImage)}
                    alt={vehicle.nameAr}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-all duration-300"
                  />
                </div>

                {/* Color Selector */}
                {!interiorMode && vehicle.colors && vehicle.colors.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-700">
                        {language === 'ar' ? 'اللون الخارجي المختار:' : 'Selected Exterior Color:'}
                      </span>
                      <span className="text-xs font-semibold text-[#0056B3]">
                        {language === 'ar' ? currentColor.name : currentColor.nameEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {vehicle.colors.map((color, idx) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColorIndex(idx)}
                          title={language === 'ar' ? color.name : color.nameEn}
                          style={{ backgroundColor: color.hex }}
                          className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer shadow-xs ${
                            selectedColorIndex === idx ? 'scale-125 border-[#0056B3] ring-2 ring-red-400' : 'border-white hover:scale-110'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Key Details & Trims (6 Cols) */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-arabic">
                    {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium block mt-1">
                    {language === 'ar' ? vehicle.bodyTypeAr : vehicle.bodyTypeEn} • {vehicle.powertrain} • {vehicle.engineSpec}
                  </span>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-arabic">{language === 'ar' ? 'القوة' : 'Power'}</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-[#0056B3]" />
                      {vehicle.horsepower}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-arabic">{language === 'ar' ? 'استهلاك الوقود' : 'Fuel Economy'}</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                      {vehicle.fuelEconomy}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-400 font-arabic">{language === 'ar' ? 'المقاعد' : 'Seats'}</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      {vehicle.seats} {language === 'ar' ? 'ركاب' : 'Seats'}
                    </span>
                  </div>
                </div>

                {/* Grade Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-700 block">
                    {language === 'ar' ? 'اختر فئة السيارة:' : 'Select Trim Grade:'}
                  </label>
                  <div className="space-y-2">
                    {vehicle.grades.map((grade, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedGradeIndex(idx)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedGradeIndex === idx
                            ? 'bg-red-50/70 border-[#0056B3] shadow-xs'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedGradeIndex === idx ? 'border-[#0056B3] bg-[#0056B3] text-white' : 'border-gray-300'
                          }`}>
                            {selectedGradeIndex === idx && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-gray-900 block font-arabic">
                              {language === 'ar' ? grade.name : grade.nameEn}
                            </span>
                            <span className="text-[10px] text-gray-500 font-arabic">
                              {language === 'ar' ? grade.engine : grade.engineEn}
                            </span>
                          </div>
                        </div>

                        <span className="font-bold font-mono text-sm text-gray-900">
                          {formatPrice(grade.price)} <span className="text-[10px] text-[#0056B3] font-bold">﷼</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-300 block">
                      {language === 'ar' ? 'السعر النقدي للفئة المختارة (شامل الضريبة):' : 'Cash Price for Selected Trim:'}
                    </span>
                    <span className="text-2xl font-black font-mono text-white">
                      {formatPrice(currentGrade.price)} <span className="text-xs text-[#0056B3] font-bold">﷼</span>
                    </span>
                  </div>

                  <div className="text-end">
                    <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'قسط شهري تقديري:' : 'Est. Monthly:'}</span>
                    <span className="text-sm font-bold text-[#0056B3] font-mono">
                      {formatPrice(monthlyInstallment)} {language === 'ar' ? '﷼/ش' : 'SAR/mo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'منظومة الحركة' : 'Powertrain'}</h4>
                  <p className="font-bold text-sm text-gray-900">{vehicle.engineSpec}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'نوع الوقود:' : 'Fuel:'} {vehicle.powertrain}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'القوة والعزم' : 'Power & Torque'}</h4>
                  <p className="font-bold text-sm text-gray-900">{vehicle.horsepower} • {vehicle.torque}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'التسارع 0-100 كم/س:' : '0-100 km/h:'} {vehicle.acceleration0to100 || '7.5 ثوانٍ'}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'ناقل الحركة والدفع' : 'Transmission & Drivetrain'}</h4>
                  <p className="font-bold text-sm text-gray-900">{language === 'ar' ? vehicle.transmissionAr : vehicle.transmissionEn}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? vehicle.drivetrain : vehicle.drivetrainEn}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'استهلاك الوقود' : 'Efficiency'}</h4>
                  <p className="font-bold text-sm text-emerald-600">{vehicle.fuelEconomy}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'تصنيف ممتاز في كفاءة الطاقة' : 'Excellent energy efficiency grade'}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'أنظمة الأمان' : 'Safety Systems'}</h4>
                  <p className="font-bold text-sm text-gray-900">{language === 'ar' ? 'نظام الأمان النشط TSS 3.0 والوسائد الهوائية' : 'Active Safety Sense & Full Airbags'}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'نظام التحذير من مغادرة المسار وفرامل الطوارئ' : 'Lane trace assist & PCS braking'}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'الضمان وخدمات الضيوف' : 'Warranty & Care'}</h4>
                  <p className="font-bold text-sm text-gray-900">{language === 'ar' ? 'ضمان 5 سنوات أو 150,000 كم' : '5 Years or 150,000 km Warranty'}</p>
                  <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? 'مساعدة على الطريق 24/7' : '24/7 Roadside Assistance'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GRADES & TRIMS */}
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-3 text-start">{language === 'ar' ? 'الفئة' : 'Trim Grade'}</th>
                      <th className="p-3 text-start">{language === 'ar' ? 'المحرك وناقل الحركة' : 'Engine & Gearbox'}</th>
                      <th className="p-3 text-start">{language === 'ar' ? 'أبرز التجهيزات' : 'Key Equipment'}</th>
                      <th className="p-3 text-start">{language === 'ar' ? 'السعر النقدي' : 'Cash Price'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vehicle.grades.map((g, idx) => (
                      <tr key={idx} className={selectedGradeIndex === idx ? 'bg-red-50/60 font-semibold' : 'hover:bg-gray-50'}>
                        <td className="p-3 font-bold text-gray-900">{language === 'ar' ? g.name : g.nameEn}</td>
                        <td className="p-3 text-gray-600">{language === 'ar' ? `${g.engine} - ${g.transmission}` : `${g.engineEn} - ${g.transmissionEn}`}</td>
                        <td className="p-3 text-gray-600">{(language === 'ar' ? g.features : g.featuresEn).join(' • ')}</td>
                        <td className="p-3 font-mono font-bold text-[#0056B3]">{formatPrice(g.price)} ﷼</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FINANCE CALCULATOR */}
          {activeTab === 'finance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>{language === 'ar' ? 'الدفعة الأولى (%):' : 'Down Payment (%):'}</span>
                    <span className="text-[#0056B3] font-mono">{downPaymentPercent}% ({formatPrice(downPaymentAmount)} ﷼)</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#0056B3]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>{language === 'ar' ? 'مدة التمويل (أشهر):' : 'Financing Tenure (Months):'}</span>
                    <span className="text-[#0056B3] font-mono">{financeTenureMonths} {language === 'ar' ? 'شهر' : 'Months'}</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={60}
                    step={12}
                    value={financeTenureMonths}
                    onChange={(e) => setFinanceTenureMonths(Number(e.target.value))}
                    className="w-full accent-[#0056B3]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>{language === 'ar' ? 'النسبة التقديرية للربح السنوي:' : 'Annual Profit Rate:'}</span>
                    <span className="text-[#0056B3] font-mono">{profitRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.99}
                    max={5}
                    step={0.1}
                    value={profitRate}
                    onChange={(e) => setProfitRate(Number(e.target.value))}
                    className="w-full accent-[#0056B3]"
                  />
                </div>
              </div>

              {/* Finance Summary Box */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <span className="text-xs font-bold text-gray-400 block uppercase">{language === 'ar' ? 'ملخص التمويل التقديري' : 'Estimated Finance Summary'}</span>
                
                <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                  <span className="text-gray-600">{language === 'ar' ? 'سعر السيارة:' : 'Vehicle Price:'}</span>
                  <span className="font-bold font-mono">{formatPrice(carPrice)} ﷼</span>
                </div>

                <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                  <span className="text-gray-600">{language === 'ar' ? 'مبلغ التمويل الصافي:' : 'Financed Principal:'}</span>
                  <span className="font-bold font-mono">{formatPrice(principalAmount)} ﷼</span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-gray-500 block">{language === 'ar' ? 'القسط الشهري التقديري:' : 'Estimated Monthly Payment:'}</span>
                  <span className="text-2xl font-black text-[#0056B3] font-mono">{formatPrice(monthlyInstallment)} <span className="text-xs font-sans text-gray-800">{language === 'ar' ? '﷼/شهرياً' : 'SAR/month'}</span></span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 md:px-8 border-t border-gray-100 bg-white flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={handleDownloadBrochure}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-[#0056B3]" />
            <span>{language === 'ar' ? 'تحميل الكتالوج الرقمي' : 'Download Brochure'}</span>
          </button>

          <div className="flex items-center gap-2">
            {onOpenQuotation && (
              <button
                onClick={() => onOpenQuotation(vehicle, currentGrade)}
                className="px-5 py-2.5 bg-red-50 text-[#0056B3] hover:bg-red-100 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'عرض سعر رسمي PDF' : 'Official Quote PDF'}</span>
              </button>
            )}

            <button
              onClick={() => onOpenTestDrive(vehicle.nameAr)}
              className="px-6 py-2.5 bg-[#0056B3] hover:bg-[#004085] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Car className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حجز تجربة قيادة' : 'Book Test Drive'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
