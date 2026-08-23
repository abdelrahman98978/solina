import React from 'react';
import { 
  Users, 
  Car, 
  Wrench, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Calendar,
  Sparkles,
  Phone,
  Building2,
  BadgePercent
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';

interface AdminOverviewTabProps {
  onSwitchTab: (tab: 'overview' | 'fleet' | 'test_drives' | 'services' | 'quotations') => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ onSwitchTab }) => {
  const { stats, testDrives, serviceAppointments, quotations, vehicles } = useAdminData();
  const { language, formatPrice, isRTL } = useLanguage();

  const recentTestDrives = testDrives.slice(0, 4);
  const recentServices = serviceAppointments.slice(0, 4);

  const kpis = [
    {
      id: 'test-drives',
      titleAr: 'طلبات تجارب القيادة',
      titleEn: 'Test Drive Requests',
      value: stats.totalTestDrives,
      subtextAr: `${stats.newTestDrivesCount} طلب جديد يحتاج للمتابعة`,
      subtextEn: `${stats.newTestDrivesCount} new requests pending`,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-600 border-blue-200',
      tab: 'test_drives' as const
    },
    {
      id: 'services',
      titleAr: 'حجوزات الصيانة السريعة',
      titleEn: 'Express Maintenance',
      value: stats.totalServices,
      subtextAr: `${stats.pendingServicesCount} موعد صيانة بانتظار الاعتماد`,
      subtextEn: `${stats.pendingServicesCount} appointments pending`,
      icon: Wrench,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      tab: 'services' as const
    },
    {
      id: 'quotations',
      titleAr: 'عروض الأسعار والتمويل',
      titleEn: 'Quotations & Finance',
      value: stats.totalQuotations,
      subtextAr: 'إجمالي العروض الصادرة للعملاء',
      subtextEn: 'Total generated quotes',
      icon: FileText,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50 text-purple-600 border-purple-200',
      tab: 'quotations' as const
    },
    {
      id: 'pipeline-value',
      titleAr: 'قيمة العروض التقديرية',
      titleEn: 'Estimated Pipeline Value',
      value: `${formatPrice(stats.totalPipelineValueSAR)} ر.س`,
      subtextAr: 'شاملة الضريبة 15% وحسابات التأجير',
      subtextEn: 'Incl. 15% VAT & lease estimates',
      icon: TrendingUp,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 text-blue-600 border-blue-200',
      tab: 'quotations' as const
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Executive Banner */}
      <div className="bg-gradient-to-r from-[#111625] via-[#1a2236] to-[#111625] text-white p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'بوابة جبراني للسيارات - لوحة الإدارة الذكية' : 'Gibrani Motors Operations & Executive Hub'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
            {language === 'ar' ? 'نظرة عامة على أداء المنصة والطلبات' : 'Real-Time Platform Performance & Leads'}
          </h2>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            {language === 'ar' 
              ? 'متابعة لحظية لكافة العمليات، طلبات تجارب القيادة، حجوزات الصيانة الدورية 45 دقيقة، ومبيعات الأسطول في كافة صالات المملكة.' 
              : 'Live tracking for customer test drives, 45-min express service queues, and fleet inquiries across all KSA showrooms.'}
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="relative z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15">
          <Building2 className="w-8 h-8 text-red-400" />
          <div className="text-start">
            <span className="text-[11px] text-gray-300 block">{language === 'ar' ? 'صالات العرض النشطة' : 'Active Showrooms'}</span>
            <span className="text-lg font-black text-white font-mono">100+ فرع بالمملكة</span>
          </div>
        </div>

        {/* Ambient Decorative Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={kpi.id}
              onClick={() => onSwitchTab(kpi.tab)}
              className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-gray-300 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${kpi.lightColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 block mb-1">
                  {language === 'ar' ? kpi.titleAr : kpi.titleEn}
                </span>
                <div className="text-2xl font-black text-gray-900 font-mono mb-1.5">
                  {kpi.value}
                </div>
                <span className="text-[11px] text-gray-500 font-medium">
                  {language === 'ar' ? kpi.subtextAr : kpi.subtextEn}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Live Operations Grid (Recent Test Drives & Service Queues) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Test Drive Leads (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-base">
                {language === 'ar' ? 'أحدث طلبات تجارب القيادة' : 'Recent Test Drive Leads'}
              </h3>
            </div>
            <button 
              onClick={() => onSwitchTab('test_drives')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {recentTestDrives.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                {language === 'ar' ? 'لا توجد طلبات تجارب قيادة مسجلة حالياً' : 'No test drive bookings yet'}
              </div>
            ) : (
              recentTestDrives.map((td) => (
                <div key={td.id} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:bg-blue-50/30 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{td.fullName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        td.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        td.status === 'contacted' ? 'bg-amber-100 text-amber-800' :
                        td.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {td.status === 'new' ? 'جديد' : td.status === 'contacted' ? 'تم التواصل' : td.status === 'confirmed' ? 'مؤكد' : td.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {td.modelName} • <span className="text-gray-500">{td.preferredShowroom}</span>
                    </p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {td.preferredDate} ({td.preferredTimeSlot})
                    </span>
                  </div>

                  <a 
                    href={`tel:${td.phone}`}
                    className="p-2.5 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer shadow-sm"
                    title={td.phone}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Service & Maintenance Queue (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900 text-base">
                {language === 'ar' ? 'طابور الصيانة السريعة 45 دقيقة' : '45-Min Express Service Queue'}
              </h3>
            </div>
            <button 
              onClick={() => onSwitchTab('services')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {recentServices.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                {language === 'ar' ? 'لا توجد مواعيد صيانة مسجلة حالياً' : 'No service appointments yet'}
              </div>
            ) : (
              recentServices.map((srv) => (
                <div key={srv.id} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:bg-emerald-50/30 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{srv.fullName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        srv.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        srv.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        srv.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {srv.status === 'pending' ? 'بانتظار التأكيد' : srv.status === 'in_progress' ? 'جاري الفحص' : srv.status === 'completed' ? 'مكتمل' : srv.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {srv.vehicleModel} • لوحة: <span className="font-mono font-bold text-gray-800">{srv.plateNumber}</span>
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      {srv.serviceType} ({formatPrice(srv.estimatedCost)} ر.س)
                    </p>
                  </div>

                  <a 
                    href={`tel:${srv.phone}`}
                    className="p-2.5 rounded-full bg-white border border-gray-200 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer shadow-sm"
                    title={srv.phone}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 4. Fleet Stock Overview Grid */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-base md:text-lg">
              {language === 'ar' ? 'ملخص أسطول سيارات 2026 في المعارض' : '2026 Fleet Stock Status'}
            </h3>
          </div>
          <button 
            onClick={() => onSwitchTab('fleet')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            {language === 'ar' ? 'إدارة الأسعار والأسطول كاملة ⬅️' : 'Manage Full Fleet ➡️'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {vehicles.slice(0, 6).map((v) => (
            <div key={v.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-200/60 text-center space-y-2 hover:bg-blue-50/30 transition-colors">
              <img 
                src={v.cardImage} 
                alt={v.nameAr} 
                className="h-14 w-auto mx-auto object-contain filter drop-shadow-sm" 
              />
              <span className="text-xs font-bold text-gray-900 block truncate">{language === 'ar' ? v.nameAr : v.nameEn}</span>
              <span className="text-[11px] font-bold text-blue-600 font-mono block">{formatPrice(v.priceStartingFrom)} ر.س</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
