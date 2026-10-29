import React, { useState } from 'react';
import { Zap, Shield, Compass, Cpu, BatteryCharging, Eye, Radio, Activity, CheckCircle2, Leaf, Gauge } from 'lucide-react';
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
    <section id="tech-simulator" className="py-20 bg-white border-t border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3f3f3] text-[#141414] text-xs font-bold mb-3 border border-[#e0e0e0]">
            <Cpu className="w-3.5 h-3.5 text-red-600" strokeWidth={1.75} />
            <span>{language === 'ar' ? 'ابتكارات وهندسة سولينا المستقبلية' : 'Solina Engineering & Safety Innovations'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#141414] mb-3 font-display">
            {language === 'ar' ? 'محاكي تقنيات سولينا التفاعلي' : 'Interactive Solina Technology Studio'}
          </h2>
          <p className="text-[#707070] text-sm md:text-base leading-relaxed">
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
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#141414] text-white border-[#141414]'
                    : 'bg-[#f3f3f3] text-[#707070] border-[#e0e0e0] hover:text-[#141414]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-[#707070]'}`} strokeWidth={1.75} />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Hybrid Synergy Drive Interactive Simulator */}
        {activeTab === 'hybrid' && (
          <div className="bg-[#141414] text-white rounded-[28px] p-6 md:p-12 border border-[#141414] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            {/* Left: Dynamic Mode Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-1">
                  HYBRID SYNERGY DRIVE
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display text-white mb-2">
                  {language === 'ar' ? 'كفاءة طاقة استثنائية 27.7 كم/لتر' : 'Benchmark 27.7 km/L Efficiency'}
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  {language === 'ar'
                    ? 'لا تحتاج إلى قابس كهربائي أو شحن خارجي. تقوم السيارة ذاتياً بإعادة شحن بطارية الهايبرد أثناء التباطؤ والفرملة.'
                    : 'Self-charging hybrid technology with zero plug-in required. Kinetic braking energy automatically replenishes the battery.'}
                </p>
              </div>

              {/* State Controls */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white/80 block mb-2">
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
                    className={`w-full text-right sm:text-inherit p-3.5 rounded-[18px] text-xs font-bold transition-all flex flex-col items-start border cursor-pointer ${
                      hybridDrivingMode === sc.id
                        ? 'bg-red-600/20 border-red-600 text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{language === 'ar' ? sc.titleAr : sc.titleEn}</span>
                    <span className="text-[11px] text-white/60 font-normal mt-0.5">{sc.descAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Visual Power Flow Stage */}
            <div className="lg:col-span-7 bg-white/5 rounded-[24px] p-6 md:p-8 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden min-h-[360px]">
              {/* Diagram Node Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-center">
                {/* Engine Node */}
                <div className={`p-4 rounded-[20px] border transition-all ${
                  hybridDrivingMode === 'cruise' || hybridDrivingMode === 'accel'
                    ? 'bg-red-600/20 border-red-500 text-white'
                    : 'bg-white/5 border-white/10 text-white/50'
                }`}>
                  <Activity className="w-6 h-6 mx-auto mb-2" strokeWidth={1.75} />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'محرك Dynamic Force' : 'Dynamic Force Engine'}</span>
                  <span className="text-[10px] opacity-80">{hybridDrivingMode === 'start' ? (language === 'ar' ? 'متوقف (0 وقود)' : 'Off') : (language === 'ar' ? 'نشط ويعمل' : 'Active')}</span>
                </div>

                {/* Electric Motor Node */}
                <div className={`p-4 rounded-[20px] border transition-all ${
                  hybridDrivingMode !== 'cruise'
                    ? 'bg-white/15 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/70'
                }`}>
                  <Zap className="w-6 h-6 mx-auto mb-2 text-red-500" strokeWidth={1.75} />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'الموتور الكهربائي' : 'Electric Motor Generator'}</span>
                  <span className="text-[10px] opacity-80">{hybridDrivingMode === 'regen' ? (language === 'ar' ? 'توليد وشحن' : 'Generating') : (language === 'ar' ? 'دفع كهربائي' : 'Driving')}</span>
                </div>

                {/* Hybrid Battery Node */}
                <div className="p-4 rounded-[20px] border bg-white/10 border-white/25 text-white col-span-2 sm:col-span-1">
                  <BatteryCharging className="w-6 h-6 mx-auto mb-2 text-red-500" strokeWidth={1.75} />
                  <span className="text-xs font-bold block">{language === 'ar' ? 'بطارية الهايبرد الذاتية' : 'Hybrid Self-Charging Battery'}</span>
                  <span className="text-[10px] opacity-80">{language === 'ar' ? 'شحن وتفريغ ذكي' : 'Smart Charge Cycle'}</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-8 bg-black/50 px-6 py-3 rounded-full border border-white/15 text-center inline-flex items-center gap-2">
                {hybridDrivingMode === 'start' && (
                  <>
                    <Leaf className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
                    <span className="text-xs text-white/90 font-medium">
                      {language === 'ar' ? 'وضع EV النشط: انبعاثات كربونية صفرية واستهلاك 0 لتر وقود' : 'EV Mode Active: Zero Emissions & Zero Fuel'}
                    </span>
                  </>
                )}
                {hybridDrivingMode === 'cruise' && (
                  <>
                    <Zap className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
                    <span className="text-xs text-white/90 font-medium">
                      {language === 'ar' ? 'شحن ذكي: المحرك يدير العجلات ويغذي البطارية في آن واحد' : 'Smart Charge: Engine drives wheels & recharges battery simultaneously'}
                    </span>
                  </>
                )}
                {hybridDrivingMode === 'accel' && (
                  <>
                    <Gauge className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
                    <span className="text-xs text-white/90 font-medium">
                      {language === 'ar' ? 'عزم مضاعف: 225 حصان تدفق طاقة كامل واستجابة فورية' : 'Max Boost: 225 HP Dual Combined Power Flow'}
                    </span>
                  </>
                )}
                {hybridDrivingMode === 'regen' && (
                  <>
                    <BatteryCharging className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
                    <span className="text-xs text-white/90 font-medium">
                      {language === 'ar' ? 'استعادة الطاقة: فرملة كهرومغناطيسية تعيد شحن البطارية بنسبة 100%' : 'Energy Recovery: Regenerative braking restores battery capacity'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Solina Safety Sense 3.0 */}
        {activeTab === 'tss' && (
          <div className="bg-[#f3f3f3] rounded-[28px] p-6 md:p-10 border border-[#e0e0e0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                  SOLINA SAFETY SENSE 3.0
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display text-[#141414] mb-2">
                  {language === 'ar' ? 'حماية شاملة 360 درجة لجميع الركاب' : 'Comprehensive 360° Passenger Protection'}
                </h3>
                <p className="text-xs md:text-sm text-[#707070] leading-relaxed">
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
                      className={`w-full text-right sm:text-inherit p-3.5 rounded-[18px] text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#141414] text-white border-[#141414]'
                          : 'bg-white text-[#141414] border-[#e0e0e0] hover:bg-[#f0f0f0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-red-500' : 'text-[#141414]'}`} strokeWidth={1.75} />
                        <span>{language === 'ar' ? feat.titleAr : feat.titleEn}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={1.75} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-[24px] p-6 md:p-10 border border-[#e0e0e0] flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="w-12 h-12 rounded-[30%] bg-[#141414] text-white flex items-center justify-center mb-4">
                  {React.createElement(tssFeatures[activeTSSFeature].icon, { className: "w-5 h-5", strokeWidth: 1.75 })}
                </div>
                <h4 className="text-xl font-black text-[#141414] mb-2 font-display">
                  {language === 'ar' ? tssFeatures[activeTSSFeature].titleAr : tssFeatures[activeTSSFeature].titleEn}
                </h4>
                <p className="text-sm text-[#707070] leading-relaxed mb-6">
                  {language === 'ar' ? tssFeatures[activeTSSFeature].descAr : tssFeatures[activeTSSFeature].descEn}
                </p>
              </div>

              <div className="bg-[#f3f3f3] p-4 rounded-[18px] border border-[#e0e0e0] flex items-center justify-between text-xs">
                <span className="text-[#707070] font-semibold">{language === 'ar' ? 'ميزة قياسية في طرازات 2026' : 'Standard on 2026 Fleet'}</span>
                <span className="font-bold text-[#141414] flex items-center gap-1">
                  <span>{language === 'ar' ? 'معتمدة باختبارات 5 نجوم NCAP' : '5-Star NCAP Safety'}</span>
                  <CheckCircle2 className="w-4 h-4 text-red-600" strokeWidth={1.75} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Multi-Terrain & Crawl Control */}
        {activeTab === 'mts' && (
          <div className="bg-[#141414] text-white rounded-[28px] p-6 md:p-10 border border-[#141414] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                OFF-ROAD MASTERY
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white font-display">
                {language === 'ar' ? 'أنظمة الزحف والتضاريس المتعددة (MTS)' : 'Multi-Terrain Select & Crawl Control'}
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
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
                  <div key={i} className="bg-white/5 p-3 rounded-[16px] border border-white/10 text-xs">
                    <span className="font-bold text-white block mb-1">{item.name}</span>
                    <span className="text-[11px] text-white/60">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-white/5 rounded-[24px] border border-white/10">
              <img
                src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300/lc300-306x122.webp"
                alt="Land Cruiser 4x4"
                className="max-h-56 w-auto object-contain transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
