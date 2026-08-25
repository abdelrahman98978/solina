import React, { useState } from 'react';
import { Zap, Shield, Compass, Cpu, BatteryCharging, Eye, Radio, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TechSimulator: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'hybrid' | 'tss' | 'mts'>('hybrid');
  const [hybridDrivingMode, setHybridDrivingMode] = useState<'start' | 'cruise' | 'accel' | 'regen'>('cruise');
  const [activeTSSFeature, setActiveTSSFeature] = useState<number>(0);

  const tssFeatures = [
    {
      titleAr: 'نظام ما قبل الاصطدام مع كشف المشاة (PCS)',
      titleEn: 'Pre-Collision System with Pedestrian Detection (PCS)',
      descAr: 'كاميرات ورادارات مليمترية ترصد السيارات والمشاة وراكبي الدراجات، وتقوم بالفرملة التلقائية الطارئة لتجنب الاصطدام.',
      descEn: 'Monocular camera and millimeter-wave radar detect obstacles and apply automatic emergency braking to prevent collisions.',
      icon: Shield
    },
    {
      titleAr: 'نظام تثبيت السرعة الراداري الديناميكي (DRCC)',
      titleEn: 'Dynamic Radar Cruise Control (DRCC)',
      descAr: 'يحافظ على مسافة أمان محددة مسبقاً مع المركبة الأمامية ويتحكم بالسرعة تلقائياً حتى التوقف الكامل ثم الانطلاق ثانية.',
      descEn: 'Maintains preset following distance from preceding vehicles and controls speed down to a complete stop and resumption.',
      icon: Radio
    },
    {
      titleAr: 'نظام تتبع المسار والتوجيه النشط (LTA)',
      titleEn: 'Lane Tracing Assist (LTA)',
      descAr: 'يقرأ خطوط الطريق وعلامات المسار ويساعد السائق بالتدخل التوجيهي الخفيف لإبقاء السيارة في منتصف المسار بدقة.',
      descEn: 'Detects lane markings to provide steering assist that keeps the vehicle centered securely in its lane.',
      icon: Eye
    },
    {
      titleAr: 'الضوء العالي التلقائي المتكيف (AHB)',
      titleEn: 'Automatic High Beam (AHB)',
      descAr: 'يبدل تلقائياً بين الضوء العالي والمنخفض عند استشعار مصابيح السيارات القادمة لمنع إبهار السائقين الآخرين.',
      descEn: 'Automatically toggles between high and low beams when oncoming headlights are detected.',
      icon: Zap
    }
  ];

  return (
    <section id="tech-simulator" className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ar' ? 'ابتكارات وهندسة سولينا المستقبلية' : 'Solina Engineering & Safety Innovations'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 font-display">
            {language === 'ar' ? 'محاكي تقنيات سولينا التفاعلي' : 'Interactive Solina Technology Studio'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {language === 'ar'
              ? 'جرّب كيف تعمل منظومة الهايبرد المتطورة، وأنظمة السلامة الذكية Solina Safety Sense 3.0 لحمايتك على الطريق.'
              : 'Discover how Solina Hybrid Synergy Drive and Solina Safety Sense 3.0 work seamlessly to empower your journeys.'}
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto no-scrollbar">
          {[
            { id: 'hybrid', labelAr: 'منظومة الهايبرد HEV وتدفق الطاقة', labelEn: 'Hybrid Synergy Drive (HEV)', icon: BatteryCharging },
            { id: 'tss', labelAr: 'أنظمة الأمان Solina Safety Sense 3.0', labelEn: 'Solina Safety Sense (TSS 3.0)', icon: Shield },
            { id: 'mts', labelAr: 'أنظمة التضاريس والزحف Multi-Terrain', labelEn: 'Multi-Terrain & Crawl Control', icon: Compass }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Hybrid Synergy Drive Interactive Simulator */}
        {activeTab === 'hybrid' && (
          <div className="bg-[#0B0E14] text-white rounded-3xl p-6 md:p-12 border border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            {/* Left: Dynamic Mode Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  HYBRID SYNERGY DRIVE
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display text-white mb-2">
                  {language === 'ar' ? 'كفاءة طاقة استثنائية 27.7 كم/لتر' : 'Benchmark 27.7 km/L Efficiency'}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {language === 'ar'
                    ? 'لا تحتاج إلى قابس كهربائي أو شحن خارجي. تقوم السيارة ذاتياً بإعادة شحن بطارية الهايبرد أثناء التباطؤ والفرملة.'
                    : 'Self-charging hybrid technology with zero plug-in required. Kinetic braking energy automatically replenishes the battery.'}
                </p>
              </div>

              {/* State Controls */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-300 block mb-2">
                  {language === 'ar' ? 'اختر حالة القيادة لمحاكاة تدفق الطاقة:' : 'Select driving scenario to simulate energy flow:'}
                </span>
                {[
                  { id: 'start', titleAr: '1. الانطلاق الهادئ (وضع EV الكهربائي 100%)', titleEn: '1. EV Silent Start (100% Electric)', descAr: 'تعمل المركبة بهدوء تام وسلاسة بالطاقة الكهربائية النقية المخزنة.' },
                  { id: 'cruise', titleAr: '2. القيادة المستقرة بالسرعات المتوسطة', titleEn: '2. Cruising Speed (Engine + Motor Sync)', descAr: 'يعمل محرك البنزين بأعلى كفاءة مع شحن مستمر للمدخرة الكهربائية.' },
                  { id: 'accel', titleAr: '3. التسارع القوي والتجاوز السريع', titleEn: '3. Full Acceleration (Dual Power Boost)', descAr: 'يعمل محرك البنزين والموتور الكهربائي معاً لتوليد أقصى عزم وقوة تسارع.' },
                  { id: 'regen', titleAr: '4. التباطؤ واستعادة طاقة الفرامل التوليدية', titleEn: '4. Regenerative Braking (Energy Recovery)', descAr: 'يتحول الموتور إلى مولد يعيد شحن البطارية من طاقة الحركة المهدرة.' }
                ].map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setHybridDrivingMode(sc.id as any)}
                    className={`w-full text-right sm:text-inherit p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-start border ${
                      hybridDrivingMode === sc.id
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{language === 'ar' ? sc.titleAr : sc.titleEn}</span>
                    <span className="text-[11px] text-gray-400 font-normal mt-0.5">{sc.descAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Visual Power Flow Stage */}
            <div className="lg:col-span-7 bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden min-h-[360px]">
              {/* Diagram Node Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-center">
                {/* Engine Node */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  hybridDrivingMode === 'cruise' || hybridDrivingMode === 'accel'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10'
                    : 'bg-white/5 border-white/10 text-gray-500'
                }`}>
                  <Activity className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'محرك Dynamic Force' : 'Dynamic Force Engine'}</span>
                  <span className="text-[10px] opacity-80">{hybridDrivingMode === 'start' ? (language === 'ar' ? 'متوقف (0 وقود)' : 'Off') : (language === 'ar' ? 'نشط ويعمل' : 'Active')}</span>
                </div>

                {/* Electric Motor Node */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  hybridDrivingMode !== 'cruise'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/5 border-white/10 text-emerald-400/80'
                }`}>
                  <Zap className="w-6 h-6 mx-auto mb-2 animate-pulse" />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'الموتور الكهربائي' : 'Electric Motor Generator'}</span>
                  <span className="text-[10px] opacity-80">{hybridDrivingMode === 'regen' ? (language === 'ar' ? 'توليد وشحن' : 'Generating') : (language === 'ar' ? 'دفع كهربائي' : 'Driving')}</span>
                </div>

                {/* Hybrid Battery Node */}
                <div className="p-4 rounded-2xl border bg-blue-500/20 border-blue-400 text-blue-300 shadow-lg shadow-blue-500/10 col-span-2 sm:col-span-1">
                  <BatteryCharging className="w-6 h-6 mx-auto mb-2 animate-bounce" />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'بطارية الهايبرد الذاتية' : 'Hybrid Self-Charging Battery'}</span>
                  <span className="text-[10px] opacity-80">{language === 'ar' ? 'شحن وتفريغ ذكي' : 'Smart Charge Cycle'}</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-8 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/15 text-center">
                <span className="text-xs text-gray-300 font-medium">
                  {hybridDrivingMode === 'start' && (language === 'ar' ? '🌿 وضع EV النشط: انبعاثات كربونية صفرية واستهلاك 0 لتر وقود' : '🌿 EV Mode Active: Zero Emissions & Zero Fuel')}
                  {hybridDrivingMode === 'cruise' && (language === 'ar' ? '⚡ شحن ذكي: المحرك يدير العجلات ويغذي البطارية في آن واحد' : '⚡ Smart Charge: Engine drives wheels & recharges battery simultaneously')}
                  {hybridDrivingMode === 'accel' && (language === 'ar' ? '🚀 عزم مضاعف: 225 حصان تدفق طاقة كامل واستجابة فورية' : '🚀 Max Boost: 225 HP Dual Combined Power Flow')}
                  {hybridDrivingMode === 'regen' && (language === 'ar' ? '🔋 استعادة الطاقة: فرملة كهرومغناطيسية تعيد شحن البطارية بنسبة 100%' : '🔋 Energy Recovery: Regenerative braking restores battery capacity')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Solina Safety Sense 3.0 */}
        {activeTab === 'tss' && (
          <div className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  SOLINA SAFETY SENSE 3.0
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display text-gray-900 mb-2">
                  {language === 'ar' ? 'حماية شاملة 360 درجة لجميع الركاب' : 'Comprehensive 360° Passenger Protection'}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {language === 'ar'
                    ? 'أحدث حزمة سلامة ومساعدة قيادة شبه ذاتية من سولينا لتجنب الحوادث والتعامل مع مفاجآت الطريق.'
                    : 'Solina\'s latest suite of active safety technologies engineered to protect you and your loved ones.'}
                </p>
              </div>

              <div className="space-y-2">
                {tssFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  const isSelected = activeTSSFeature === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTSSFeature(idx)}
                      className={`w-full text-right sm:text-inherit p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md border-blue-600'
                          : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                        <span>{language === 'ar' ? feat.titleAr : feat.titleEn}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {React.createElement(tssFeatures[activeTSSFeature].icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2 font-display">
                  {language === 'ar' ? tssFeatures[activeTSSFeature].titleAr : tssFeatures[activeTSSFeature].titleEn}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {language === 'ar' ? tssFeatures[activeTSSFeature].descAr : tssFeatures[activeTSSFeature].descEn}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-semibold">{language === 'ar' ? 'ميزة قياسية في طرازات 2026' : 'Standard on 2026 Fleet'}</span>
                <span className="font-bold text-blue-600 flex items-center gap-1">
                  <span>{language === 'ar' ? 'معتمدة باختبارات 5 نجوم NCAP' : '5-Star NCAP Safety'}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Multi-Terrain & Crawl Control */}
        {activeTab === 'mts' && (
          <div className="bg-[#12161F] text-white rounded-3xl p-6 md:p-10 border border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">
                OFF-ROAD MASTERY
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white font-display">
                {language === 'ar' ? 'أنظمة الزحف والتضاريس المتعددة (MTS)' : 'Multi-Terrain Select & Crawl Control'}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {language === 'ar'
                  ? 'تمتع بالسيطرة الكاملة على الرمال الناعمة، الصخور الشاهقة، والمنحدرات الزلقة مع أنظمة الدفع الرباعي الأسطورية في لاند كروزر وبرادو وهايلكس.'
                  : 'Dominate deep desert dunes, rocky trails, and muddy wadis with legendary Solina 4x4 engineering.'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { name: 'وضع الرمال والكثبان (SAND)', desc: 'استجابة سريعة للعزم لمنع تغريز الإطارات' },
                  { name: 'وضع الصخور والتسلق (ROCK)', desc: 'توزيع القوة على الإطار الملامس للأرض' },
                  { name: 'نظام الزحف الذكي (CRAWL)', desc: 'تحكم آلي بالدواسات للتركيز على التوجيه فقط' },
                  { name: 'دوران الدبابة (Turn Assist)', desc: 'تقليص نصف قطر الدوران في المنعطفات الحادة' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="font-bold text-yellow-400 block mb-1">{item.name}</span>
                    <span className="text-[11px] text-gray-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-gradient-to-br from-amber-500/10 to-transparent rounded-3xl border border-white/10">
              <img
                src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300/lc300-306x122.webp"
                alt="Land Cruiser 4x4"
                className="max-h-56 w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
