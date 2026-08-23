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
        bankName: 'مصرف الراجحي / البنك الأهلي',
        status: 'sent'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quoteNumber = `ALJ-SA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-10 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>{language === 'ar' ? 'عرض سعر رسمي معتمد - جبراني للسيارات' : 'Official Authorized Quotation - Gibrani Motors'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition-colors cursor-pointer"
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
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 border-2 border-gray-200">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 8C26.8 8 8 26.8 8 50C8 73.2 26.8 92 50 92C73.2 92 92 73.2 92 50C92 26.8 73.2 8 50 8ZM50 86.5C29.8 86.5 13.5 70.2 13.5 50C13.5 29.8 29.8 13.5 50 13.5C70.2 13.5 86.5 29.8 86.5 50C86.5 70.2 70.2 86.5 50 86.5Z"
                    fill="#1A56DB"
                  />
                  <ellipse cx="50" cy="50" rx="38" ry="18" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                  <ellipse cx="50" cy="38" rx="16" ry="24" stroke="#1A56DB" strokeWidth="5.5" fill="none" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight font-display">
                  {language === 'ar' ? 'شركة جبراني للسيارات' : 'Gibrani Motors'}
                </h1>
                <p className="text-[11px] text-gray-500 font-medium">
                  {language === 'ar' ? 'الموزع المعتمد لسيارات تويوتا ولكزس في المملكة العربية السعودية' : 'Authorized Distributor for Toyota & Lexus Vehicles in Saudi Arabia'}
                </p>
                <p className="text-[10px] text-gray-400 font-mono">
                  {language === 'ar' ? 'الرقم الضريبي (VAT ID): 300000000000003' : 'VAT Registration: 300000000000003'}
                </p>
              </div>
            </div>

            <div className="text-left font-mono">
              <div className="bg-gray-100 p-2.5 rounded-xl border border-gray-200">
                <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'رقم عرض السعر:' : 'Quotation Ref:'}</span>
                <span className="text-xs font-bold text-blue-600">{quoteNumber}</span>
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
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                {vehicle.bodyTypeAr} | موديل {vehicle.year}
              </span>
              <h2 className="text-xl font-black text-gray-900 font-display">
                {language === 'ar' ? vehicle.nameAr : vehicle.nameEn}
              </h2>
              <p className="text-xs font-bold text-gray-700">
                {language === 'ar' ? `الفئة المختارة: ${activeGrade.name}` : `Selected Trim: ${activeGrade.nameEn}`}
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] text-gray-600 pt-1">
                <span>• {language === 'ar' ? `المحرك: ${activeGrade.engine}` : `Engine: ${activeGrade.engineEn}`}</span>
                <span>• {language === 'ar' ? `القير: ${activeGrade.transmission}` : `Trans: ${activeGrade.transmissionEn}`}</span>
                <span>• {language === 'ar' ? `الاستهلاك: ${vehicle.fuelEconomy}` : `Economy: ${vehicle.fuelEconomyEn}`}</span>
              </div>
            </div>

            <div className="w-44 h-24 flex items-center justify-center bg-white p-2 rounded-xl border border-gray-200">
              <img src={vehicle.cardImage} alt={vehicle.nameAr} className="max-h-full max-w-full object-contain" />
            </div>
          </div>

          {/* Standard Features Included in Trim */}
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">
              {language === 'ar' ? 'المواصفات والتجهيزات القياسية للفئة:' : 'Key Included Specifications:'}
            </h3>
            <div className="grid grid-cols-2 gap-2 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200/80">
              {(language === 'ar' ? activeGrade.features : activeGrade.featuresEn).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Financial Breakdown Table */}
          <div>
            <h3 className="font-bold text-gray-900 text-xs mb-2">
              {language === 'ar' ? 'جدول تسعير المركبة والضرائب المعتمدة:' : 'Price Breakdown & Official Tax Schedule:'}
            </h3>
            <table className="w-full text-right border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 font-bold text-[11px]">
                <tr>
                  <th className="p-2.5 border-b border-gray-200">{language === 'ar' ? 'البند والتفاصيل' : 'Item Description'}</th>
                  <th className="p-2.5 border-b border-gray-200 text-center">{language === 'ar' ? 'النسبة' : 'Rate'}</th>
                  <th className="p-2.5 border-b border-gray-200 text-left">{language === 'ar' ? 'المبلغ (ريال سعودي)' : 'Amount (SAR)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                <tr>
                  <td className="p-2.5 font-medium">{language === 'ar' ? 'سعر السيارة الأساسي (قبل ضريبة القيمة المضافة)' : 'Vehicle Base Price (Excl. VAT)'}</td>
                  <td className="p-2.5 text-center text-gray-500">-</td>
                  <td className="p-2.5 text-left font-mono font-semibold">{formatPrice(priceExcludingVat)} ر.س</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">{language === 'ar' ? 'ضريبة القيمة المضافة (VAT)' : 'Value Added Tax (VAT)'}</td>
                  <td className="p-2.5 text-center text-blue-600 font-bold">15%</td>
                  <td className="p-2.5 text-left font-mono font-semibold">{formatPrice(vatAmount)} ر.س</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">{language === 'ar' ? 'رسوم اللوحات والاستمارة وإصدار رخصة السير' : 'Registration, Plates & Admin Fees'}</td>
                  <td className="p-2.5 text-center text-gray-500">-</td>
                  <td className="p-2.5 text-left font-mono font-semibold">{formatPrice(registrationFees)} ر.س</td>
                </tr>
                <tr className="bg-blue-50/50 font-bold text-gray-900 text-sm">
                  <td className="p-3 text-blue-600">{language === 'ar' ? 'إجمالي السعر النقدي الشامل على الطريق:' : 'Total Cash Price (On-Road):'}</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-left font-mono text-blue-600 text-base">{formatPrice(totalPriceOnRoad)} ر.س</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financing Plan Breakdown if available */}
          {financingDetails && (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-900 text-xs mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'ar' ? 'خطة التأجير التمويلي التقديرية (جبراني للتمويل):' : 'Estimated Lease Financing Plan (Gibrani Finance):'}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'الدفعة الأولى' : 'Down Payment'}</span>
                  <span className="font-bold text-gray-900 font-mono">{formatPrice(financingDetails.downPaymentAmount)} ر.س ({financingDetails.downPaymentPercent}%)</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'مدة التمويل' : 'Tenure'}</span>
                  <span className="font-bold text-gray-900">{financingDetails.termMonths} {language === 'ar' ? 'شهراً' : 'Months'}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'الدفعة الأخيرة' : 'Balloon Payment'}</span>
                  <span className="font-bold text-gray-900 font-mono">{formatPrice(financingDetails.balloonPaymentAmount)} ر.س</span>
                </div>
                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                  <span className="text-[10px] text-blue-700 font-bold block">{language === 'ar' ? 'القسط الشهري التقديري' : 'Monthly Payment'}</span>
                  <span className="font-black text-blue-700 font-mono text-sm">{formatPrice(financingDetails.monthlyInstallment)} ر.س</span>
                </div>
              </div>
            </div>
          )}

          {/* Warranty & Terms Barcode Footer */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-[10px] text-gray-500">
              <p className="flex items-center gap-1 font-semibold text-gray-800">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'ar' ? 'يشمل ضمان المصنع 5 سنوات أو 150,000 كم + خدمة المساعدة على الطريق مجاناً' : 'Includes 5-Year / 150,000 KM Factory Warranty + 24/7 Roadside Assistance'}</span>
              </p>
              <p>• {language === 'ar' ? 'عرض السعر إلكتروني ومعتمد ويخضع لتوفر المخزون عند إتمام الشراء.' : 'This quotation is electronically generated and subject to stock availability.'}</p>
              <p>• {language === 'ar' ? 'للاستفسار والتواصل: 8004400055 | مركز خدمة العملاء الموحد' : 'Inquiries & Contact: 8004400055 | ALJ Unified Customer Care'}</p>
            </div>

            {/* Official Seal / Barcode Graphic */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-10 bg-gray-900 flex items-center justify-center p-1 rounded">
                <div className="w-full h-full bg-white flex items-center justify-around px-1 font-mono text-[9px] tracking-tighter">
                  ||| | |||| || ||| || |||| | ||
                </div>
              </div>
              <span className="text-[9px] text-gray-400 font-mono mt-0.5">{quoteNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
