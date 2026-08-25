import React, { useState } from 'react';
import { Calculator, CheckCircle2, ChevronDown, DollarSign, FileText, Info, Percent, Send, Sparkles, Printer } from 'lucide-react';
import { VEHICLES } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';

interface FinanceCalculatorProps {
  onOpenTestDrive: (modelName?: string) => void;
  onOpenQuotation?: (vehicle: any, grade: any, financeDetails: any) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ 
  onOpenTestDrive,
  onOpenQuotation
}) => {
  const { language, formatPrice } = useLanguage();
  const toyotaVehicles = VEHICLES.filter(v => v.brand !== 'lexus');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('camry-2026');
  const selectedVehicle = toyotaVehicles.find(v => v.id === selectedVehicleId) || toyotaVehicles[0];

  const [price, setPrice] = useState<number>(selectedVehicle.priceStartingFrom);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [balloonPaymentPercent, setBalloonPaymentPercent] = useState<number>(25);
  const [annualProfitRate, setAnnualProfitRate] = useState<number>(4.25);

  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const v = toyotaVehicles.find(item => item.id === id);
    if (v) setPrice(v.priceStartingFrom);
  };

  // Financial Calculations
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const balloonPaymentAmount = Math.round((price * balloonPaymentPercent) / 100);
  const financedPrincipal = price - downPaymentAmount;

  const termYears = termMonths / 12;
  const totalProfit = Math.round(financedPrincipal * (annualProfitRate / 100) * termYears);
  const totalPayable = financedPrincipal + totalProfit;
  const totalMonthlyRepayable = totalPayable - balloonPaymentAmount;
  const monthlyInstallment = Math.max(100, Math.round(totalMonthlyRepayable / termMonths));

  const financeDetailsObj = {
    downPaymentAmount,
    downPaymentPercent,
    termMonths,
    monthlyInstallment,
    balloonPaymentAmount,
    annualProfitRate
  };

  return (
    <section id="finance" className="py-20 bg-gray-50 border-t border-gray-200 font-arabic">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#0056B3] text-xs font-bold mb-4 border border-red-100">
            <Calculator className="w-4 h-4 text-[#0056B3]" />
            <span>{language === 'ar' ? 'سولينا للسيارات للتمويل' : 'Solina Motors Finance'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 font-arabic tracking-tight">
            {language === 'ar' ? 'حاسبة التمويل والأقساط الشهرية' : 'Monthly Installment & Finance Calculator'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'خطط لميزانيتك واعرف قسطك الشهري التقديري بسهولة وشفافية متوافقة مع أحكام الشريعة الإسلامية.'
              : 'Calculate your estimated monthly installment with full transparency and Sharia-compliant lease terms.'}
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 p-6 md:p-10 space-y-6">
            {/* Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                {language === 'ar' ? 'اختر موديل سولينا المطلوب:' : 'Select Solina Model:'}
              </label>
              <div className="relative">
                <select
                  value={selectedVehicleId}
                  onChange={(e) => handleVehicleChange(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 font-bold text-sm rounded-xl py-3.5 px-4 pr-10 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none cursor-pointer"
                >
                  {toyotaVehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {language === 'ar' ? v.nameAr : v.nameEn} ({formatPrice(v.priceStartingFrom)} ﷼)
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Vehicle Base Price Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700">
                  {language === 'ar' ? 'سعر السيارة النقدي (شامل الضريبة):' : 'Vehicle Cash Price (Incl. VAT):'}
                </label>
                <span className="text-xs font-bold text-[#0056B3] font-mono">
                  {formatPrice(price)} ﷼
                </span>
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.max(10000, Number(e.target.value)))}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-bold text-sm rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none font-mono"
              />
            </div>

            {/* Down Payment % Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700">
                  {language === 'ar' ? 'الدفعة الأولى المقدمة (%):' : 'Down Payment (%):'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold font-mono">
                    ({formatPrice(downPaymentAmount)} ﷼)
                  </span>
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md font-mono">
                    {downPaymentPercent}%
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0056B3]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                <span>0% (بدون دفعة أولى)</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Finance Period Tabs */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                {language === 'ar' ? 'مدة التمويل (بالأشهر):' : 'Finance Tenure (Months):'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((months) => (
                  <button
                    key={months}
                    onClick={() => setTermMonths(months)}
                    className={`py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      termMonths === months
                        ? 'bg-[#0056B3] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {months} {language === 'ar' ? 'شهراً' : 'Mos'}
                  </button>
                ))}
              </div>
            </div>

            {/* Balloon Payment % */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-700">
                  {language === 'ar' ? 'الدفعة الأخيرة (التملك النهائي):' : 'Balloon Payment (Final):'}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold font-mono">
                    ({formatPrice(balloonPaymentAmount)} ﷼)
                  </span>
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-md font-mono">
                    {balloonPaymentPercent}%
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={balloonPaymentPercent}
                onChange={(e) => setBalloonPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0056B3]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                <span>0%</span>
                <span>20%</span>
                <span>35%</span>
              </div>
            </div>
          </div>

          {/* Result Output Column (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#111111] via-[#1C1C1C] to-[#0A0A0A] text-white p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#0056B3]" />
                <span className="text-xs font-bold text-gray-300">
                  {language === 'ar' ? 'عرض التمويل التأجيري المعتمد' : 'ALJ Lease Summary'}
                </span>
              </div>

              {/* Monthly Amount Giant Display */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 mb-6 text-center shadow-inner">
                <span className="text-xs text-gray-300 block mb-1">
                  {language === 'ar' ? 'القسط الشهري التقديري:' : 'Estimated Monthly Payment:'}
                </span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">
                    {formatPrice(monthlyInstallment)}
                  </span>
                  <span className="text-lg font-bold text-[#0056B3] font-arabic">
                    {language === 'ar' ? '﷼ / شهر' : 'SAR/mo'}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400 mt-2 block">
                  {language === 'ar' ? `على مدار ${termMonths} شهراً • متوافق مع أحكام الشريعة الإسلامية` : `Over ${termMonths} Months • Sharia Compliant`}
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span>{language === 'ar' ? 'الدفعة الأولى النقدية:' : 'Down Payment:'}</span>
                  <span className="font-bold text-white font-mono">{formatPrice(downPaymentAmount)} ﷼</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span>{language === 'ar' ? 'الدفعة الأخيرة (التملك):' : 'Final Balloon Payment:'}</span>
                  <span className="font-bold text-white font-mono">{formatPrice(balloonPaymentAmount)} ﷼</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span>{language === 'ar' ? 'معدل النسبة السنوي (APR):' : 'Annual Profit Rate (APR):'}</span>
                  <span className="font-bold text-emerald-400 font-mono">{annualProfitRate}%</span>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="space-y-2.5 pt-6 border-t border-white/10">
              {onOpenQuotation && (
                <button
                  onClick={() => onOpenQuotation(selectedVehicle, selectedVehicle.grades[0], financeDetailsObj)}
                  className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#0056B3]" />
                  <span>{language === 'ar' ? 'طباعة / تحميل عرض سعر رسمي' : 'Print / Save Official Quotation'}</span>
                </button>
              )}

              <button
                onClick={() => onOpenTestDrive(`طلب تمويل: ${selectedVehicle.nameAr} بقسط ${monthlyInstallment} ﷼`)}
                className="w-full py-3.5 bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{language === 'ar' ? 'تقديم طلب تمويل إلكتروني فوري' : 'Submit Finance Application'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
