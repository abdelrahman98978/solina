import React, { useState, useRef } from 'react';
import {
  Sliders,
  Building2,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Check,
  Landmark,
  Percent,
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import { useAdminData, BankPartnerConfig } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminSettingsTab: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportFullBackupJSON,
    importFullBackupJSON,
    resetToDefaultData,
    vehicles
  } = useAdminData();
  const { language, formatPrice } = useLanguage();

  const [activeSubSection, setActiveSubSection] = useState<'financing' | 'identity' | 'backup'>('financing');
  const [savedBanner, setSavedBanner] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local Form State synced with settings
  const [companyNameAr, setCompanyNameAr] = useState(settings.companyNameAr);
  const [companyNameEn, setCompanyNameEn] = useState(settings.companyNameEn);
  const [vatNumber, setVatNumber] = useState(settings.vatNumber);
  const [crNumber, setCrNumber] = useState(settings.crNumber);
  const [unifiedPhone, setUnifiedPhone] = useState(settings.unifiedPhone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [headquartersAr, setHeadquartersAr] = useState(settings.headquartersAr);
  const [zatcaEnvironment, setZatcaEnvironment] = useState<'production' | 'simulation'>(settings.zatcaEnvironment);
  const [zatcaCsidSerial, setZatcaCsidSerial] = useState(settings.zatcaCsidSerial);
  const [announcementAr, setAnnouncementAr] = useState(settings.announcementAr);

  // Financing Engine State
  const [defaultAprPercent, setDefaultAprPercent] = useState(settings.defaultAprPercent);
  const [minDownPaymentPercent, setMinDownPaymentPercent] = useState(settings.minDownPaymentPercent);
  const [defaultBalloonPercent, setDefaultBalloonPercent] = useState(settings.defaultBalloonPercent);
  const [adminFeePercent, setAdminFeePercent] = useState(settings.adminFeePercent);
  const [expressServiceMinutes, setExpressServiceMinutes] = useState(settings.expressServiceMinutes);
  const [bankPartners, setBankPartners] = useState<BankPartnerConfig[]>(settings.bankPartners);

  // New Bank Form
  const [newBankNameAr, setNewBankNameAr] = useState('');
  const [newBankApr, setNewBankApr] = useState(3.45);

  const triggerSaveFeedback = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleSaveFinancing = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      defaultAprPercent: Number(defaultAprPercent),
      minDownPaymentPercent: Number(minDownPaymentPercent),
      defaultBalloonPercent: Number(defaultBalloonPercent),
      adminFeePercent: Number(adminFeePercent),
      expressServiceMinutes: Number(expressServiceMinutes),
      bankPartners
    });
    triggerSaveFeedback();
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyNameAr,
      companyNameEn,
      vatNumber,
      crNumber,
      unifiedPhone,
      whatsappNumber,
      headquartersAr,
      zatcaEnvironment,
      zatcaCsidSerial,
      announcementAr
    });
    triggerSaveFeedback();
  };

  const handleAddBank = () => {
    if (!newBankNameAr.trim()) return;
    const added: BankPartnerConfig = {
      id: `bank-${Date.now()}`,
      nameAr: newBankNameAr.trim(),
      nameEn: newBankNameAr.trim(),
      aprPercent: Number(newBankApr),
      minDownPaymentPercent: Number(minDownPaymentPercent),
      adminFeePercent: Number(adminFeePercent),
      isActive: true
    };
    setBankPartners(prev => [...prev, added]);
    setNewBankNameAr('');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const ok = importFullBackupJSON(content);
      setImportStatus(ok ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 4000);
    };
    reader.readAsText(file);
  };

  // Sample Vehicle for Live Financing Simulation
  const sampleVehicle = vehicles[0];
  const samplePrice = sampleVehicle?.priceStartingFrom || 135000;
  const downPaymentSAR = Math.round(samplePrice * (Number(minDownPaymentPercent) / 100));
  const balloonSAR = Math.round(samplePrice * (Number(defaultBalloonPercent) / 100));
  const principal = Math.max(0, samplePrice - downPaymentSAR - balloonSAR);
  const totalProfit = Math.round(principal * (Number(defaultAprPercent) / 100) * 5);
  const estimatedMonthly = Math.round((principal + totalProfit) / 60);

  return (
    <div className="space-y-6 text-start animate-in fade-in duration-300">
      {/* 1. Mobbin Editorial Header Card */}
      <div className="bg-[#ffffff] p-6 md:p-8 rounded-[24px] border border-[#f0f0f0] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h2 className="mobbin-heading text-xl md:text-2xl text-[#141414]">
                {language === 'ar'
                  ? 'إعدادات وكالة سولينا ومحرك التمويل والربط الضريبي.'
                  : 'Solina Dealership, Financing & ZATCA Settings.'}
              </h2>
              <p className="mobbin-subtitle-light text-xs md:text-sm">
                إدارة نسب المرابحة والبنوك المعتمدة، بيانات الرقم الضريبي الموحد ZATCA، والنسخ الاحتياطي الكامل لقاعدة البيانات.
              </p>
            </div>
          </div>
        </div>

        {/* Mobbin Segmented Control */}
        <div className="flex items-center bg-[#f3f3f3] p-1 rounded-full self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'financing' as const, label: 'محرك التمويل والبنوك' },
            { id: 'identity' as const, label: 'الهوية والربط الضريبي' },
            { id: 'backup' as const, label: 'النسخ الاحتياطي' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubSection(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeSubSection === tab.id ? 'mobbin-segmented-active' : 'text-[#707070] hover:text-[#141414]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {savedBanner && (
        <div className="p-4 rounded-[16px] bg-[#141414] text-[#ffffff] mobbin-ink-pill flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>تم حفظ الإعدادات وتحديث الحاسبة والواجهة العامة لسولينا للسيارات فوراً وبدقة.</span>
          </span>
          <span className="mobbin-badge-popular px-2.5 py-0.5">متزامن</span>
        </div>
      )}

      {/* SECTION 1: FINANCING ENGINE & BANK PARTNERS */}
      {activeSubSection === 'financing' && (
        <form onSubmit={handleSaveFinancing} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                  <Percent className="w-4 h-4" />
                </span>
                <h3 className="mobbin-heading text-base text-[#141414]">معايير حاسبة التمويل التأجيري والبنوك.</h3>
              </div>
              <span className="mobbin-badge-popular px-2.5 py-0.5">مرتبط بالحاسبة العامة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-[#141414] block mb-1.5">نسبة المرابحة السنوية الافتراضية (APR %)</label>
                <input
                  type="number"
                  step="0.01"
                  value={defaultAprPercent}
                  onChange={(e) => setDefaultAprPercent(Number(e.target.value))}
                  className="w-full font-mono font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-[#141414] block mb-1.5">الحد الأدنى للدفعة الأولى (%)</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={minDownPaymentPercent}
                  onChange={(e) => setMinDownPaymentPercent(Number(e.target.value))}
                  className="w-full font-mono font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-[#141414] block mb-1.5">نسبة الدفعة الأخيرة / التملك (%)</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={defaultBalloonPercent}
                  onChange={(e) => setDefaultBalloonPercent(Number(e.target.value))}
                  className="w-full font-mono font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-[#141414] block mb-1.5">الرسوم الإدارية (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={adminFeePercent}
                  onChange={(e) => setAdminFeePercent(Number(e.target.value))}
                  className="w-full font-mono font-semibold"
                />
              </div>
            </div>

            {/* Bank Partners List */}
            <div className="pt-4 border-t border-[#f0f0f0] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="mobbin-heading text-sm text-[#141414] flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  <span>جهات التمويل والبنوك المعتمدة لدى سولينا ({bankPartners.length})</span>
                </h4>
              </div>

              <div className="space-y-2">
                {bankPartners.map((bank, idx) => (
                  <div key={bank.id} className="p-3.5 rounded-[16px] bg-[#f3f3f3] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={bank.isActive}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setBankPartners(prev => prev.map((b, i) => i === idx ? { ...b, isActive: checked } : b));
                        }}
                        className="w-4 h-4 accent-[#141414] cursor-pointer"
                      />
                      <span className="font-semibold text-[#141414]">{bank.nameAr}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[#707070]">هامش الربح:</span>
                      <input
                        type="number"
                        step="0.01"
                        value={bank.aprPercent}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBankPartners(prev => prev.map((b, i) => i === idx ? { ...b, aprPercent: val } : b));
                        }}
                        className="w-20 !py-1 !px-2 !bg-[#ffffff] text-center font-mono font-semibold"
                      />
                      <span className="text-[#707070]">%</span>
                      {bankPartners.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setBankPartners(prev => prev.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#707070] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Bank Partner Row */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newBankNameAr}
                  onChange={(e) => setNewBankNameAr(e.target.value)}
                  placeholder="إضافة جهة تمويل جديدة (مثال: بنك البلاد)..."
                  className="flex-1 text-xs"
                />
                <input
                  type="number"
                  step="0.01"
                  value={newBankApr}
                  onChange={(e) => setNewBankApr(Number(e.target.value))}
                  className="w-24 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddBank}
                  className="px-4 py-2.5 rounded-full bg-[#f3f3f3] hover:bg-[#e0e0e0] text-[#141414] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة بنك</span>
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="mobbin-ink-pill w-full py-3 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs md:text-sm font-semibold cursor-pointer"
              >
                حفظ واعتماد معايير التمويل والبنوك
              </button>
            </div>
          </div>

          {/* Right Live Preview Card (pricing-card-featured in #f3f3f3) */}
          <div className="lg:col-span-5 bg-[#f3f3f3] rounded-[24px] p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#707070]">معاينة حية لمحرك التمويل</span>
                <span className="mobbin-badge-popular px-2.5 py-0.5">محاكاة فورية</span>
              </div>

              <div className="bg-[#ffffff] rounded-[24px] p-5 border border-[#e0e0e0] space-y-4">
                <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                  <div>
                    <span className="text-[11px] text-[#707070] block">طراز المحاكاة القياسي</span>
                    <h4 className="mobbin-heading text-sm text-[#141414]">{sampleVehicle?.nameAr || 'سولينا كامري 2026'}</h4>
                  </div>
                  <span className="font-mono font-semibold text-sm text-[#141414]">{formatPrice(samplePrice)} ر.س</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
                    <span className="text-[#707070] block text-[11px]">الدفعة الأولى ({minDownPaymentPercent}%)</span>
                    <strong className="font-mono text-[#141414] text-sm">{formatPrice(downPaymentSAR)} ر.س</strong>
                  </div>
                  <div className="p-3 rounded-[16px] bg-[#f3f3f3]">
                    <span className="text-[#707070] block text-[11px]">الدفعة الأخيرة ({defaultBalloonPercent}%)</span>
                    <strong className="font-mono text-[#141414] text-sm">{formatPrice(balloonSAR)} ر.س</strong>
                  </div>
                </div>

                <div className="p-4 rounded-[16px] bg-[#141414] text-[#ffffff] mobbin-ink-pill flex items-center justify-between">
                  <div>
                    <span className="text-[11px] opacity-80 block">القسط الشهري التقديري (60 شهراً)</span>
                    <strong className="text-xl font-mono font-semibold">{formatPrice(estimatedMonthly)} ر.س / شهرياً</strong>
                  </div>
                  <span className="mobbin-badge-popular px-2.5 py-1">APR {defaultAprPercent}%</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#707070] leading-relaxed">
              تُستخدم هذه المعاملات لحساب الأقساط الشهرية وعروض الأسعار التمويلية في الواجهة العامة للموقع ولوحة المبيعات تلقائياً.
            </p>
          </div>
        </form>
      )}

      {/* SECTION 2: DEALERSHIP & ZATCA IDENTITY */}
      {activeSubSection === 'identity' && (
        <form onSubmit={handleSaveIdentity} className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#f0f0f0] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </span>
              <h3 className="mobbin-heading text-base text-[#141414]">بيانات الهوية الرسمية والربط الضريبي (ZATCA Phase 2).</h3>
            </div>
            <span className="mobbin-badge-popular px-3 py-1">ZATCA CSID Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">الاسم الرسمي للشركة (عربي)</label>
              <input type="text" value={companyNameAr} onChange={(e) => setCompanyNameAr(e.target.value)} className="w-full" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">Official Company Name (EN)</label>
              <input type="text" value={companyNameEn} onChange={(e) => setCompanyNameEn(e.target.value)} className="w-full" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">الرقم الضريبي الموحد (VATIN — 15 رقماً)</label>
              <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} className="w-full font-mono" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">رقم السجل التجاري الموحد (CR)</label>
              <input type="text" value={crNumber} onChange={(e) => setCrNumber(e.target.value)} className="w-full font-mono" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">الرقم الموحد لخدمة العملاء</label>
              <input type="text" value={unifiedPhone} onChange={(e) => setUnifiedPhone(e.target.value)} className="w-full font-mono" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">رقم الواتساب الموحد للمبيعات والصيانة</label>
              <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="w-full font-mono" />
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">بيئة الربط مع منصة فاتورة (ZATCA Environment)</label>
              <select value={zatcaEnvironment} onChange={(e) => setZatcaEnvironment(e.target.value as any)} className="w-full">
                <option value="production">البيئة التشغيلية الفعلية (ZATCA Production Phase 2)</option>
                <option value="simulation">بيئة المحاكاة والتجارب (ZATCA Sandbox / Simulation)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-[#141414] block mb-1.5">معرف شهادة التشفير الرقمي (CSID Serial)</label>
              <input type="text" value={zatcaCsidSerial} onChange={(e) => setZatcaCsidSerial(e.target.value)} className="w-full font-mono" />
            </div>
          </div>

          <div className="text-xs">
            <label className="font-semibold text-[#141414] block mb-1.5">شريط الإعلانات التنفيذي للموقع العام (Storefront Announcement)</label>
            <input type="text" value={announcementAr} onChange={(e) => setAnnouncementAr(e.target.value)} className="w-full" />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="mobbin-ink-pill px-6 py-3 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs md:text-sm font-semibold cursor-pointer"
            >
              حفظ بيانات الهوية والربط الضريبي
            </button>
          </div>
        </form>
      )}

      {/* SECTION 3: FULL DATABASE BACKUP & RESTORE */}
      {activeSubSection === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Export Full Backup */}
          <div className="bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-11 h-11 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="mobbin-heading text-base text-[#141414]">تصدير نسخة احتياطية كاملة (JSON).</h3>
              <p className="mobbin-subtitle-light text-xs">
                تحميل ملف JSON شامل يحتوي على كافة طرازات الأسطول، الشاسيهات، الطلبات، أوامر العمل، الفواتير الضريبية، والإعدادات.
              </p>
            </div>
            <button
              onClick={exportFullBackupJSON}
              className="mobbin-ink-pill w-full py-2.5 rounded-full bg-[#141414] hover:bg-[#262626] text-[#ffffff] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل النسخة الاحتياطية (.JSON)</span>
            </button>
          </div>

          {/* Card 2: Import / Restore Backup */}
          <div className="bg-[#f3f3f3] rounded-[24px] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 mobbin-squircle bg-[#ffffff] text-[#141414] border border-[#e0e0e0] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="mobbin-badge-popular px-2.5 py-0.5">استعادة فورية</span>
              </div>
              <h3 className="mobbin-heading text-base text-[#141414]">استيراد واستعادة نسخة احتياطية.</h3>
              <p className="mobbin-subtitle-light text-xs">
                ارفع ملف نسخة احتياطية بصيغة JSON لاسترجاع كافة البيانات والإعدادات بنقرة واحدة مع إمكانية التراجع.
              </p>
              {importStatus === 'success' && (
                <div className="p-2.5 rounded-[16px] bg-[#ffffff] text-[#141414] text-xs font-semibold">
                  ✓ تم استيراد واستعادة قاعدة البيانات بنجاح.
                </div>
              )}
              {importStatus === 'error' && (
                <div className="p-2.5 rounded-[16px] bg-[#ffffff] text-[#141414] text-xs font-semibold">
                  ✕ تعذر قراءة ملف النسخة الاحتياطية، تأكد من صيغة JSON.
                </div>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#141414] border border-[#e0e0e0] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>اختيار ملف نسخة احتياطية (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Factory Seed Reset */}
          <div className="bg-[#ffffff] rounded-[24px] p-6 border border-[#f0f0f0] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-11 h-11 mobbin-squircle bg-[#f3f3f3] text-[#141414] flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="mobbin-heading text-base text-[#141414]">إعادة ضبط بيانات المصنع الافتراضية.</h3>
              <p className="mobbin-subtitle-light text-xs">
                مسح التعديلات المحلية في المتصفح واستعادة البيانات الأولية القياسية لوكالة سولينا للسيارات 2026.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('هل أنت متأكد من إعادة ضبط كافة البيانات إلى الحالة الافتراضية الأولية؟')) {
                  resetToDefaultData();
                  triggerSaveFeedback();
                }
              }}
              className="w-full py-2.5 rounded-full bg-[#ffffff] hover:bg-[#f3f3f3] text-[#141414] border border-[#e0e0e0] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>استعادة البيانات الافتراضية</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
