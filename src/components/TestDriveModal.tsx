import React, { useState } from 'react';
import { X, Car, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Sparkles, Shield, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLES, SHOWROOMS } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModelName?: string;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  defaultModelName
}) => {
  const { language } = useLanguage();
  const { addTestDrive } = useAdminData();
  const [selectedVehicle, setSelectedVehicle] = useState<string>(defaultModelName || VEHICLES[0].nameAr);
  const [selectedShowroom, setSelectedShowroom] = useState<string>(SHOWROOMS[0].id);
  const [driveDate, setDriveDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('morning');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [hasLicense, setHasLicense] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen) return null;

  const activeBranch = SHOWROOMS.find(s => s.id === selectedShowroom) || SHOWROOMS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasLicense) {
      alert(language === 'ar' ? 'يشترط وجود رخصة قيادة سارية لتجربة القيادة' : 'A valid driving license is required');
      return;
    }
    const ref = `TD-ALJ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    // Save to Admin Data store
    addTestDrive({
      fullName: fullName || 'عميل تجربة قيادة',
      phone: phoneNumber || '0500000000',
      city: activeBranch.city,
      preferredShowroom: activeBranch.name,
      modelId: selectedVehicle,
      modelName: selectedVehicle,
      preferredDate: driveDate || new Date().toISOString().split('T')[0],
      preferredTimeSlot: timeSlot === 'morning' ? '10:00 ص - 12:00 م' : timeSlot === 'afternoon' ? '04:00 م - 06:00 م' : '07:00 م - 09:00 م',
      notes: 'طلب مسجل عبر الموقع الإلكتروني'
    });

    setIsSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#EB0A1E] flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 font-display">
                {language === 'ar' ? 'طلب حجز تجربة قيادة مجانية' : 'Book a Complimentary Test Drive'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'عبر شبكة صالات جبراني للسيارات بالمملكة' : 'At your nearest Gibrani Motors Showroom'}
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

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-in zoom-in-50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 font-display">
              {language === 'ar' ? 'تم استلام طلب تجربة القيادة بنجاح!' : 'Test Drive Request Successfully Booked!'}
            </h3>

            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              {language === 'ar'
                ? `شكراً لك ${fullName}، سيقوم مستشار مبيعات تويوتا في (${activeBranch.name}) بالتواصل معك عبر الجوال خلال دقائق لتأكيد الموعد وتجهيز السيارة.`
                : `Thank you ${fullName}. A sales consultant at (${activeBranch.nameEn}) will contact you shortly to confirm your booking.`}
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 max-w-sm mx-auto font-mono text-xs text-gray-800 space-y-1">
              <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'الرقم المرجعي للطلب:' : 'Booking Reference ID:'}</span>
              <span className="font-bold text-[#EB0A1E] text-base">{bookingRef}</span>
              <div className="text-[11px] text-gray-600 pt-1">
                <span>{selectedVehicle} • {activeBranch.city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 bg-[#111] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Close & Continue'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'ar' ? 'الموديل المطلوب تجربته:' : 'Vehicle to Test Drive:'}
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.nameAr}>
                    {language === 'ar' ? v.nameAr : v.nameEn} ({v.bodyTypeAr}) - 2026
                  </option>
                ))}
              </select>
            </div>

            {/* Showroom Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'ar' ? 'صالة العرض أو الفرع الأقرب لك:' : 'Preferred Showroom Branch:'}
              </label>
              <select
                value={selectedShowroom}
                onChange={(e) => setSelectedShowroom(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                {SHOWROOMS.map((s) => (
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
                  {language === 'ar' ? 'التاريخ المفضل:' : 'Preferred Date:'}
                </label>
                <input
                  type="date"
                  required
                  value={driveDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDriveDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الفترة الزمنية:' : 'Time Slot:'}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  <option value="morning">{language === 'ar' ? 'صباحية (09:00 ص - 12:00 م)' : 'Morning (9:00 AM - 12:00 PM)'}</option>
                  <option value="evening">{language === 'ar' ? 'مسائية (04:30 م - 08:30 م)' : 'Evening (4:30 PM - 8:30 PM)'}</option>
                </select>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ar' ? 'مثال: محمد بن عبد الله' : 'e.g. Mohammed Alghamdi'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Driving License Agreement Checkbox */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLicense}
                onChange={(e) => setHasLicense(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded accent-blue-600"
              />
              <span>
                {language === 'ar'
                  ? 'أقر بأن لدي رخصة قيادة سارية المفعول وهوية وطنية / إقامة سارية.'
                  : 'I confirm that I hold a valid Saudi/GCC driving license and national ID/Iqama.'}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'تأكيد إرسال طلب تجربة القيادة' : 'Confirm Test Drive Booking'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
