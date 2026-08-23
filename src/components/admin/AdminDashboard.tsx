import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Wrench, 
  FileText, 
  Tag, 
  MapPin, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  Layers,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useLanguage } from '../../context/LanguageContext';

// Tabs
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminFleetTab } from './AdminFleetTab';
import { AdminLeadsTab } from './AdminLeadsTab';
import { AdminOffersTab } from './AdminOffersTab';
import { AdminCPOTab } from './AdminCPOTab';
import { AdminPartsTab } from './AdminPartsTab';
import { AdminShowroomsTab } from './AdminShowroomsTab';

interface AdminDashboardProps {
  onClose: () => void;
}

export type AdminTabType = 'overview' | 'fleet' | 'leads' | 'offers' | 'cpo' | 'parts' | 'showrooms';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { stats, resetToDefaultData } = useAdminData();
  const { language, setLanguage, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  const navItems = [
    {
      id: 'overview' as const,
      labelAr: 'لوحة المؤشرات والتحليلات',
      labelEn: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: undefined
    },
    {
      id: 'fleet' as const,
      labelAr: 'إدارة الأسطول والمخزون 2026',
      labelEn: 'Fleet & Pricing Management',
      icon: Car,
      badge: `${stats.totalFleetCount} موديل`
    },
    {
      id: 'leads' as const,
      labelAr: 'الطلبات والحجوزات والمبيعات',
      labelEn: 'Leads & Appointments',
      icon: Users,
      badge: (stats.newTestDrivesCount + stats.pendingServicesCount) > 0 
        ? `${stats.newTestDrivesCount + stats.pendingServicesCount} جديد` 
        : undefined,
      badgeColor: 'bg-red-600'
    },
    {
      id: 'offers' as const,
      labelAr: 'العروض الترويجية والحملات',
      labelEn: 'Campaigns & Offers',
      icon: Tag,
      badge: `${stats.totalOffersCount}`
    },
    {
      id: 'cpo' as const,
      labelAr: 'المستعمل المعتمد AutoHub',
      labelEn: 'Certified Pre-Owned',
      icon: ShieldCheck,
      badge: `${stats.totalCPOCount}`
    },
    {
      id: 'parts' as const,
      labelAr: 'قطع الغيار الأصلية والإكسسوارات',
      labelEn: 'Genuine Parts & Accessories',
      icon: Wrench,
      badge: `${stats.totalPartsCount}`
    },
    {
      id: 'showrooms' as const,
      labelAr: 'الفروع وصالات العرض والصيانة',
      labelEn: 'Showrooms & Service Network',
      icon: MapPin,
      badge: `${stats.totalShowroomsCount}`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-arabic select-none">
      {/* 1. Admin Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0F172A] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Switcher */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-600/30">
                G
              </div>
              <div>
                <span className="font-bold text-sm md:text-base tracking-wide flex items-center gap-1.5 font-display text-white">
                  GIBRANI <span className="text-blue-400 font-normal text-xs">Motors Operations</span>
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1 font-sans">
                  {language === 'ar' ? 'لوحة تحكم عمليات جبراني للسيارات' : 'Gibrani Motors Operations Portal'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (confirm(language === 'ar' ? 'هل تريد استعادة البيانات الافتراضية الأولية؟' : 'Reset to default seed data?')) {
                  resetToDefaultData();
                  alert(language === 'ar' ? 'تمت استعادة البيانات بنجاح' : 'Data reset successfully');
                }
              }}
              title={language === 'ar' ? 'استعادة البيانات الافتراضية' : 'Reset Demo Data'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'استعادة الافتراضي' : 'Reset Data'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-gray-300" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Return to Customer Portal / Public Showroom */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer transform hover:scale-105 active:scale-100"
            >
              <span>{language === 'ar' ? 'العودة للموقع العام' : 'Public Showroom'}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Admin Layout (Sidebar + Content Stage) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation (3 Cols) */}
        <aside className={`lg:col-span-3 bg-white rounded-3xl p-4 border border-gray-200 shadow-sm space-y-1.5 sticky top-24 ${
          sidebarOpenMobile ? 'fixed inset-x-4 top-20 z-50 shadow-2xl block' : 'hidden lg:block'
        }`}>
          {sidebarOpenMobile && (
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 lg:hidden">
              <span className="font-bold text-xs text-gray-500">القائمة الإدارية</span>
              <button onClick={() => setSidebarOpenMobile(false)} className="p-1 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="text-[11px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">
            {language === 'ar' ? 'الأقسام والعمليات' : 'Operations Modules'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer text-start ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="truncate">{language === 'ar' ? item.labelAr : item.labelEn}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : (item.badgeColor ? `${item.badgeColor} text-white` : 'bg-gray-200 text-gray-700')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Stats Pill */}
          <div className="pt-4 border-t border-gray-100 px-3 mt-4 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>نظام متصل ومؤمن 100%</span>
            </div>
            <span className="text-[10px] text-gray-400 block font-mono">Build v2026.8.2-ALJ Enterprise</span>
          </div>
        </aside>

        {/* Content Tab Stage (9 Cols) */}
        <main className="lg:col-span-9 w-full">
          {activeTab === 'overview' && (
            <AdminOverviewTab onSwitchTab={(t) => {
              if (t === 'overview' || t === 'fleet') setActiveTab(t);
              else setActiveTab('leads');
            }} />
          )}

          {activeTab === 'fleet' && (
            <AdminFleetTab />
          )}

          {activeTab === 'leads' && (
            <AdminLeadsTab />
          )}

          {activeTab === 'offers' && (
            <AdminOffersTab />
          )}

          {activeTab === 'cpo' && (
            <AdminCPOTab />
          )}

          {activeTab === 'parts' && (
            <AdminPartsTab />
          )}

          {activeTab === 'showrooms' && (
            <AdminShowroomsTab />
          )}
        </main>

      </div>
    </div>
  );
};
