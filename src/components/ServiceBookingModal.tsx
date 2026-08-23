import React, { useState } from 'react';
import { X, Wrench, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Car, Sparkles, Shield, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLES, SHOWROOMS, MAINTENANCE_PACKAGES } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModelName?: string;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  defaultModelName
}) => {
  const { language, formatPrice } = useLanguage();
  const { addServiceAppointment } = useAdminData();
  const [step, setStep] = useState<'details' | 'booking' | 'success'>('details');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(VEHICLES[2].id); // Camry
  const [selectedMileage, setSelectedMileage] = useState<number>(10000);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(SHOWROOMS[0].id);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('09:00 ص - 09:45 ص (صيانة سريعة)');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const currentVehicle = VEHICLES.find(v => v.id === selectedVehicleId) || VEHICLES[0];
  const currentPackage = MAINTENANCE_PACKAGES.find(p => p.mileage === selectedMileage) || MAINTENANCE_PACKAGES[0];
  const currentBranch = SHOWROOMS.find(s => s.id === selectedBranchId) || SHOWROOMS[0];

  // Price estimate based on vehicle category
  const estimatedCost = currentVehicle.category === 'suv'
    ? currentPackage.estimatedPriceSUV
    : currentVehicle.category === 'commercial'
    ? currentPackage.estimatedPriceCommercial
    : currentPackage.estimatedPriceSedan;

  const timeSlots = [
    '08:30 ص - 09:15 ص (صيانة سريعة)',
    '09:30 ص - 10:15 ص (صيانة سريعة)',
    '10:30 ص - 11:15 ص (صيانة سريعة)',
    '11:30 ص - 12:15 م (صيانة سريعة)',
    '04:30 م - 05:15 م (صيانة سريعة)',
    '05:30 م - 06:15 م (صيانة سريعة)',
    '06:30 م - 07:15 م (صيانة سريعة)'
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert(language === 'ar' ? 'يرجى تعبئة الاسم ورقم الجوال للمتابعة' : 'Please provide your full name and phone number');
      return;
    }
    const ref = `SRV-ALJ-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    // Save to Admin Data store
    addServiceAppointment({
      fullName: customerName,
      phone: customerPhone,
      city: currentBranch.city,
      showroom: currentBranch.name,
      vehicleModel: currentVehicle.nameAr,
      plateNumber: plateNumber || 'أ ب ج 1234',
      currentMileage: selectedMileage,
      packageMileage: selectedMileage,
      serviceType: currentPackage.nameAr,
      preferredDate: bookingDate || new Date().toISOString().split('T')[0],
      preferredTime: timeSlot,
      estimatedCost
    });

    setStep('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 font-display">
                {language === 'ar' ? 'حجز موعد صيانة تويوتا السريعة (45 دقيقة)' : 'Toyota 45-Min Express Service Booking'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'مراكز صيانة جبراني للسيارات المعتمدة بالمملكة' : 'Authorized Gibrani Motors Service Centers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' && (
          <div className="space-y-6">
            {/* Step 1: Vehicle & Mileage Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'طراز السيارة:' : 'Vehicle Model:'}
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {VEHICLES.map(v => (
                    <option key={v.id} value={v.id}>
                      {language === 'ar' ? v.nameAr : v.nameEn} ({v.bodyTypeAr})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'المسافة المقطوعة (عداد الكيلومترات):' : 'Current Odometer (KM):'}
                </label>
                <select
                  value={selectedMileage}
                  onChange={(e) => setSelectedMileage(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {MAINTENANCE_PACKAGES.map(p => (
                    <option key={p.mileage} value={p.mileage}>
                      {language === 'ar' ? p.nameAr : p.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Maintenance Schedule & Price Card */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/40 p-5 rounded-2xl border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {language === 'ar' ? currentPackage.estimatedDuration : currentPackage.estimatedDuration}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-1">
                    {language === 'ar' ? currentPackage.nameAr : currentPackage.nameEn}
                  </h4>
                </div>

                <div className="text-right sm:text-left">
                  <span className="text-[10px] text-gray-500 block">{language === 'ar' ? 'التكلفة التقديرية (شامل الضريبة والزيوت):' : 'Estimated Cost (Incl. VAT & Oils):'}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-blue-600 font-mono">{formatPrice(estimatedCost)}</span>
                    <span className="text-xs font-bold text-gray-700">ر.س</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-bold text-gray-700 block mb-2">
                  {language === 'ar' ? 'الأعمال المشمولة في باقة الصيانة:' : 'Service Tasks Included:'}
                </span>
                <div className="space-y-1.5">
                  {(language === 'ar' ? currentPackage.tasksAr : currentPackage.tasksEn).map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              onClick={() => setStep('booking')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'ar' ? 'متابعة لاختيار المركز والموعد' : 'Proceed to Branch & Slot Selection'}</span>
            </button>
          </div>
        )}

        {step === 'booking' && (
          <form onSubmit={handleSubmitBooking} className="space-y-4">
            {/* Branch Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'ar' ? 'مركز الصيانة المفضل:' : 'Preferred Service Center:'}
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                {SHOWROOMS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.city} - {language === 'ar' ? s.name : s.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'تاريخ الموعد:' : 'Preferred Date:'}
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الفترة الزمنية المتاحة:' : 'Time Slot:'}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ar' ? 'مثال: فيصل العتيبي' : 'e.g. Faisal Al Otaibi'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'رقم الجوال:' : 'Mobile Number:'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'رقم لوحة السيارة (اختياري):' : 'Plate Number (Optional):'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'مثال: أ ب ج 1 2 3 4' : 'e.g. ABC 1234'}
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-3 px-5 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'السابق' : 'Back'}
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تأكيد وحجز الموعد الفوري' : 'Confirm Service Booking'}</span>
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-in zoom-in-50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'تم تأكيد حجز موعد الصيانة بنجاح!' : 'Service Appointment Successfully Confirmed!'}
            </h3>

            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              {language === 'ar'
                ? `شكراً لك ${customerName}، تم تسجيل موعدك لدى ${currentBranch.name}. تم إرسال رسالة نصية SMS ببيانات الموعد إلى رقمك.`
                : `Thank you ${customerName}, your appointment is confirmed at ${currentBranch.nameEn}. A confirmation SMS has been dispatched.`}
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 max-w-sm mx-auto font-mono text-xs text-gray-800 space-y-1">
              <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'رقم الحجز المرجعي:' : 'Booking Reference:'}</span>
              <span className="font-bold text-blue-600 text-base">{bookingRef}</span>
              <div className="text-[11px] text-gray-600 pt-1">
                <span>{currentVehicle.nameAr} | {currentPackage.nameAr}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
