import React from 'react';
import { Building2, Sparkles, MapPin, Phone, Shield, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolinaHeadquartersShowcaseProps {
  onNavigateToShowrooms?: () => void;
  onOpenQuotation?: () => void;
}

export const SolinaHeadquartersShowcase: React.FC<SolinaHeadquartersShowcaseProps> = ({
  onNavigateToShowrooms,
  onOpenQuotation
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full py-16 md:py-24 bg-gray-950 text-white font-arabic overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-800 pb-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/30">
              <Building2 className="w-3.5 h-3.5" />
              {language === 'ar' ? 'المقر الرئيسي وصالات العرض' : 'Headquarters & Flagship Showrooms'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-arabic">
              {language === 'ar' ? 'صرح معماري يليق بضيوف سولينا' : 'An Architectural Landmark for Solina Guests'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl font-light">
              {language === 'ar'
                ? 'تجربة ضيافة استثنائية تمتد من واجهات المقر الرئيسي الفاخرة بالرياض إلى صالات كبار الشخصيات ومراكز التسليم الفوري المجهزة بأحدث التقنيات العالمية.'
                : 'An unparalleled luxury hospitality journey from our flagship Riyadh headquarters to VIP executive lounges and ultra-modern instant delivery centers.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToShowrooms}
              className="px-6 py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white text-xs md:text-sm font-bold shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
            >
              <span>{language === 'ar' ? 'استكشف شبكة الفروع' : 'Explore All Branches'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Dual-View Showcase Visual */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group bg-gray-900">
          <img
            src="/solina-headquarters.png"
            alt="المقر الرئيسي وصالات عرض شركة سولينا للسيارات"
            className="w-full h-auto object-contain block select-none"
            loading="lazy"
          />

          {/* Floating Badges on image */}
          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold text-white shadow-xl">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>{language === 'ar' ? 'المقر الرئيسي - الرياض' : 'Flagship HQ - Riyadh'}</span>
          </div>

          <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold text-white shadow-xl">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>{language === 'ar' ? 'صالات استقبال كبار الشخصيات VIP' : 'VIP Executive Lounges'}</span>
          </div>
        </div>

        {/* 3 Luxury Pillar Feature Cards with Professional Glowing 3D Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {/* Card 1: Headquarters & Corporate */}
          <div className="relative p-7 rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 border border-gray-800 hover:border-red-500/50 hover:shadow-[0_10px_35px_-10px_rgba(239,68,68,0.25)] transition-all duration-300 group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/20 transition-all" />
            
            <div className="relative flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/25 via-red-600/15 to-transparent border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:border-red-400 transition-all duration-300">
                <Building2 className="w-7 h-7 text-red-400 drop-shadow-[0_2px_8px_rgba(239,68,68,0.6)]" strokeWidth={2.2} />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-red-400/80 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-800/40">
                01 / HQ
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2.5 font-arabic group-hover:text-red-300 transition-colors">
              {language === 'ar' ? 'المقر الإداري والمبيعات المركزية' : 'Central HQ & Corporate Sales'}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {language === 'ar'
                ? 'مركز متكامل لإدارة عقود الشركات ومبيعات الأساطيل وخدمات التمويل المباشر لأكثر من 50 موقعاً بالمملكة.'
                : 'Integrated hub managing corporate fleet accounts, B2B solutions, and direct financing for over 50 locations.'}
            </p>
          </div>

          {/* Card 2: VIP Hospitality */}
          <div className="relative p-7 rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 border border-gray-800 hover:border-blue-500/50 hover:shadow-[0_10px_35px_-10px_rgba(59,130,246,0.25)] transition-all duration-300 group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />
            
            <div className="relative flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/25 via-blue-600/15 to-transparent border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
                <Sparkles className="w-7 h-7 text-blue-400 drop-shadow-[0_2px_8px_rgba(59,130,246,0.6)]" strokeWidth={2.2} />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400/80 px-2.5 py-1 rounded-full bg-blue-950/50 border border-blue-800/40">
                02 / VIP
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2.5 font-arabic group-hover:text-blue-300 transition-colors">
              {language === 'ar' ? 'صالات استقبال VIP واستشارات الشراء' : 'VIP Hospitality & Buyer Advisory'}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {language === 'ar'
                ? 'أجنحة مخصصة لاستقبال الضيوف مع مستشارين خبراء لمساعدتك في اختيار الطراز المثالي وتخصيص باقات الشراء.'
                : 'Dedicated private suites with expert automotive consultants to customize your vehicle specifications.'}
            </p>
          </div>

          {/* Card 3: Instant Delivery */}
          <div className="relative p-7 rounded-3xl bg-gradient-to-b from-gray-900/90 to-gray-950/90 border border-gray-800 hover:border-emerald-500/50 hover:shadow-[0_10px_35px_-10px_rgba(16,185,129,0.25)] transition-all duration-300 group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-600/20 transition-all" />
            
            <div className="relative flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-emerald-600/15 to-transparent border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
                <Shield className="w-7 h-7 text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)]" strokeWidth={2.2} />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/80 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40">
                03 / EXPRESS
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2.5 font-arabic group-hover:text-emerald-300 transition-colors">
              {language === 'ar' ? 'مراكز التسليم الفوري المعتمدة' : 'Express Delivery & Handover Centers'}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              {language === 'ar'
                ? 'صالات تسليم فاخرة تضمن تجهيز وتسجيل سيارتك الجديدة وتسليمها لك بكامل ملحقاتها خلال وقت قياسي.'
                : 'Luxury vehicle handover bays ensuring your new vehicle is registered, prepped, and delivered in record time.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
