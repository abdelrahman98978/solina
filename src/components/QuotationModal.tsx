import React, { useRef, useEffect } from 'react';
import { X, Printer, Download, CheckCircle2, Shield, Calendar, Phone, MapPin, FileText, Sparkles, Building2 } from 'lucide-react';
import type { Vehicle, VehicleGrade } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  selectedGrade?: VehicleGrade;
  financingDetails?: {
    downPaymentAmount: number;
    downPaymentPercent: number;
    termMonths: number;
    monthlyInstallment: number;
    balloonPaymentAmount: number;
    annualProfitRate: number;
  };
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  selectedGrade,
  financingDetails
}) => {
  const { language, formatPrice } = useLanguage();
  const { addQuotation } = useAdminData();
  const printRef = useRef<HTMLDivElement>(null);
  const recordedRef = useRef(false);

  const activeGrade = selectedGrade || vehicle.grades[0];
  const basePrice = activeGrade.price;
  const priceExcludingVat = Math.round(basePrice / 1.15);
  const vatAmount = basePrice - priceExcludingVat;
  const registrationFees = 850; // Plate & registration fees in SAR
  const totalPriceOnRoad = basePrice + registrationFees;

  useEffect(() => {
    if (isOpen && !recordedRef.current) {
      recordedRef.current = true;
      addQuotation({
        fullName: 'عميل طلب عرض سعر',
        phone: '0500000000',
        city: 'الرياض',
        vehicleId: vehicle.id,
        vehicleName: vehicle.nameAr,
        gradeName: activeGrade.name,
        vehiclePrice: basePrice,
        vatAmount,
        totalWithVat: totalPriceOnRoad,
        financeType: financingDetails ? 'lease' : 'cash',
        downPaymentPercent: financingDetails?.downPaymentPercent,
        downPaymentAmount: financingDetails?.downPaymentAmount,
        durationMonths: financingDetails?.termMonths,
        monthlyInstallment: financingDetails?.monthlyInstallment,
        bankName: 'سولينا للسيارات للتمويل / مصرف الراجحي / الأهلي',
        status: 'sent'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quoteNumber = `ALJ-SOLINA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const validUntilDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
    language === 'ar' ? 'ar-SA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-arabic">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-10 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <FileText className="w-5 h-5 text-[#0056B3]" />
            <span>{language === 'ar' ? 'عرض سعر رسمي معتمد — سولينا للسيارات' : 'Official Quotation — Solina Motors'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056B3] hover:bg-[#004085] text-white text-xs font-bold shadow transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ar' ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center font-bold cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Document Area */}
        <div ref={printRef} className="text-gray-800 space-y-6 text-xs">
          {/* Header & Logo Banner */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-gray-900">
            <div className="flex items-center gap-4">
              <img
                src="/solina-logo.png"
                alt="Solina Motors"
                className="h-10 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight font-arabic">
                  {language === 'ar' ? 'شركة سولينا للسيارات المحدودة' : 'Solina Motors Retail Co. Ltd.'}
                </h1>
                <p className="text-[11px] text-gray-600 font-medium">
                  {language === 'ar' ? 'الموزع المعتمد لسيارات سولينا في المملكة العربية السعودية' : 'Authorized Distributor of Solina in Saudi Arabia'}
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  {language === 'ar' ? 'سجل تجاري: 4030794548 | الرقم الضريبي: 300159478400003' : 'CR: 4030794548 | VAT: 300159478400003'}
                </p>
              </div>
            </div>

            <div className="text-left font-mono">
              <div className="bg-gray-100 p-2.5 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'رقم عرض السعر:' : 'Quotation Ref:'}</span>
                <span className="text-xs font-bold text-[#0056B3]">{quoteNumber}</span>
                <div className="mt-1 text-[10px] text-gray-500">
                  <span>{language === 'ar' ? 'تاريخ الإصدار: ' : 'Date: '}</span>
                  <span className="font-semibold text-gray-800">{issueDate}</span>
                </div>
                <div className="text-[10px] text-gray-500">
                  <span>{language === 'ar' ? 'ساري حتى: ' : 'Valid Until: '}</span>
                  <span className="font-semibold text-gray-800">{validUntilDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information Box */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#0056B3] border border-red-200">
                {vehicle.bodyTypeAr} | موديل {vehicle.year}
              </span>
              <h2 className="text-xl font-bold text-gray-900 font-arabic">
                {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
              </h2>
              <p className="text-xs font-bold text-[#0056B3]">
                {language === 'ar' ? `الفئة المختارة: ${activeGrade.name}` : `Selected Trim: ${activeGrade.nameEn}`}
              </p>
              <div className="text-[11px] text-gray-500 flex flex-wrap gap-4 pt-1">
                <span>• المحرك: {activeGrade.engine}</span>
                <span>• القير: {activeGrade.transmission}</span>
                <span>• الاستهلاك: {vehicle.fuelEconomy}</span>
              </div>
            </div>

            <div className="w-44 h-24 flex items-center justify-center bg-white rounded-xl border border-gray-200 p-2">
              <img
                src={activeGrade.image || vehicle.cardImage}
                alt={vehicle.nameAr}
                className="max-h-full max-w-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          {/* Features Highlights */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 block">{language === 'ar' ? 'المواصفات والتجهيزات القياسية للفئة:' : 'Standard Equipment for Trim:'}</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border border-gray-200">
              {activeGrade.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & VAT Breakdown Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 block">{language === 'ar' ? 'جدول تسعير المركبة والضرائب المعتمدة:' : 'Pricing & Tax Schedule:'}</span>
            <table className="w-full text-[11px] border-collapse bg-white rounded-xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                  <th className="p-2.5 text-start">{language === 'ar' ? 'البند والتفاصيل' : 'Item Description'}</th>
                  <th className="p-2.5 text-center">{language === 'ar' ? 'النسبة' : 'Rate'}</th>
                  <th className="p-2.5 text-end">{language === 'ar' ? 'المبلغ (ريال سعودي)' : 'Amount (SAR)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-2.5 text-gray-700">{language === 'ar' ? 'سعر السيارة الأساسي (قبل ضريبة القيمة المضافة)' : 'Vehicle Base Price (Excl. VAT)'}</td>
                  <td className="p-2.5 text-center font-mono">-</td>
                  <td className="p-2.5 text-end font-mono font-semibold">{formatPrice(priceExcludingVat)} {language === 'ar' ? '﷼' : 'SAR'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-gray-700">{language === 'ar' ? 'ضريبة القيمة المضافة (VAT)' : 'Value Added Tax (VAT)'}</td>
                  <td className="p-2.5 text-center font-mono text-[#0056B3] font-bold">15%</td>
                  <td className="p-2.5 text-end font-mono font-semibold">{formatPrice(vatAmount)} {language === 'ar' ? '﷼' : 'SAR'}</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-gray-700">{language === 'ar' ? 'رسوم اللوحات والاستمارة وإصدار رخصة السير' : 'Registration & License Plate Fees'}</td>
                  <td className="p-2.5 text-center font-mono">-</td>
                  <td className="p-2.5 text-end font-mono font-semibold">{formatPrice(registrationFees)} {language === 'ar' ? '﷼' : 'SAR'}</td>
                </tr>
                <tr className="bg-red-50/50 font-bold text-gray-900">
                  <td className="p-3 text-xs">{language === 'ar' ? 'إجمالي السعر النقدي الشامل على الطريق:' : 'Total On-Road Cash Price:'}</td>
                  <td className="p-3 text-center font-mono">-</td>
                  <td className="p-3 text-end font-mono text-sm text-[#0056B3]">{formatPrice(totalPriceOnRoad)} {language === 'ar' ? '﷼' : 'SAR'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financing Plan if available */}
          {financingDetails && (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold text-gray-900 block">{language === 'ar' ? 'خطة التمويل التأجيري التقديرية:' : 'Estimated Lease Financing Plan:'}</span>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div>
                  <span className="text-gray-500 block">{language === 'ar' ? 'الدفعة الأولى:' : 'Down Payment:'}</span>
                  <span className="font-bold text-gray-900 font-mono">{formatPrice(financingDetails.downPaymentAmount)} ﷼ ({financingDetails.downPaymentPercent}%)</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{language === 'ar' ? 'مدة التمويل:' : 'Tenure:'}</span>
                  <span className="font-bold text-gray-900 font-mono">{financingDetails.termMonths} شهر</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{language === 'ar' ? 'القسط الشهري التقديري:' : 'Est. Monthly Payment:'}</span>
                  <span className="font-bold text-[#0056B3] font-mono text-sm">{formatPrice(financingDetails.monthlyInstallment)} ﷼/ش</span>
                </div>
              </div>
            </div>
          )}

          {/* Official Footnote & Barcode */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? 'يشمل ضمان المصنع 5 سنوات أو 150,000 كم + برنامج جميل كير لسيارات الهايبرد' : 'Includes 5-year/150,000 km warranty & Jameel Care Hybrid Coverage'}</span>
            </div>

            <div className="text-end font-mono">
              <span className="block font-bold">SOLINA MOTORS RETAIL CO.</span>
              <span>800 244 4400 • solina.sa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
