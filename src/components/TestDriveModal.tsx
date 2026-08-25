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
  const toyotaVehicles = VEHICLES.filter(v => v.brand !== 'lexus');
  const [selectedVehicle, setSelectedVehicle] = useState<string>(defaultModelName || toyotaVehicles[0].nameAr);
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
      notes: 'طلب مسجل عبر الموقع الرسمي'
    });

    setIsSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-arabic">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#0056B3] flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-arabic">
                {language === 'ar' ? 'طلب حجز تجربة قيادة مجانية' : 'Book a Complimentary Test Drive'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'عبر شبكة صالات سولينا للسيارات بالمملكة' : 'At your nearest Solina Motors Showroom'}
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

            <h3 className="text-2xl font-bold text-gray-900 font-arabic">
              {language === 'ar' ? 'تم استلام طلب تجربة القيادة بنجاح!' : 'Test Drive Request Successfully Booked!'}
            </h3>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 max-w-md mx-auto text-xs space-y-2 text-start">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">{language === 'ar' ? 'رقم المرجع:' : 'Reference ID:'}</span>
                <span className="font-bold text-[#0056B3] font-mono">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">{language === 'ar' ? 'السيارة المختارة:' : 'Vehicle:'}</span>
                <span className="font-bold text-gray-900">{selectedVehicle}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">{language === 'ar' ? 'الفرع المحدد:' : 'Branch:'}</span>
                <span className="font-bold text-gray-900">{activeBranch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'التاريخ المفضل:' : 'Date:'}</span>
                <span className="font-bold text-gray-900">{driveDate || 'أقرب موعد متاح'}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              {language === 'ar'
                ? 'سيتواصل معك مستشار مبيعات سولينا المعتمد لتأكيد موعد التجربة وتجهيز السيارة.'
                : 'A certified Solina sales advisor will contact you to confirm the time slot and prepare your test vehicle.'}
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
            >
              {language === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Close & Continue'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'ar' ? 'اختر سيارة سولينا لتجربتها:' : 'Select Solina Vehicle:'}
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-3.5 text-xs text-gray-900 font-bold focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
              >
                {toyotaVehicles.map((v) => (
                  <option key={v.id} value={v.nameAr}>
                    {language === 'ar' ? v.nameAr : v.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {language === 'ar' ? 'اختر الفرع أو صالة العرض الأقرب لك:' : 'Select Nearest Showroom Branch:'}
              </label>
              <select
                value={selectedShowroom}
                onChange={(e) => setSelectedShowroom(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-3.5 text-xs text-gray-900 font-bold focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
              >
                {SHOWROOMS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'ar' ? `${s.city} - ${s.name}` : `${s.cityEn} - ${s.nameEn}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'التاريخ المفضل:' : 'Preferred Date:'}
                </label>
                <input
                  type="date"
                  required
                  value={driveDate}
                  onChange={(e) => setDriveDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الفترة المناسبة:' : 'Time Slot:'}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
                >
                  <option value="morning">{language === 'ar' ? 'صباحاً (10 ص - 12 م)' : 'Morning (10 AM - 12 PM)'}</option>
                  <option value="afternoon">{language === 'ar' ? 'عصراً (4 م - 6 م)' : 'Afternoon (4 PM - 6 PM)'}</option>
                  <option value="evening">{language === 'ar' ? 'مساءً (7 م - 9 م)' : 'Evening (7 PM - 9 PM)'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  {language === 'ar' ? 'الاسم الكريم:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ar' ? 'محمد عبدالله' : 'Mohammed Abdullah'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none"
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:ring-2 focus:ring-[#0056B3] focus:bg-white outline-none font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center gap-2">
              <input
                type="checkbox"
                id="license"
                checked={hasLicense}
                onChange={(e) => setHasLicense(e.target.checked)}
                className="w-4 h-4 text-[#0056B3] accent-[#0056B3] rounded"
              />
              <label htmlFor="license" className="text-xs text-gray-700 cursor-pointer">
                {language === 'ar' ? 'أؤكد امتلاكي رخصة قيادة سعودية أو دولية سارية المفعول' : 'I confirm holding a valid driving license'}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{language === 'ar' ? 'تأكيد وحجز تجربة القيادة' : 'Confirm & Book Test Drive'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
