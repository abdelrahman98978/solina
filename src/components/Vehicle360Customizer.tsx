import React, { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Gauge, 
  Fuel, 
  Check, 
  Car, 
  Compass, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  FileText, 
  Eye, 
  RotateCw, 
  Crown, 
  Layers, 
  Printer, 
  Flame,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { VEHICLES, type Vehicle } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface Vehicle360CustomizerProps {
  onOpenTestDrive: (modelName?: string) => void;
  onOpenDetails: (vehicleId: string) => void;
  onOpenQuotation?: (vehicle: any, grade?: any) => void;
}

export const Vehicle360Customizer: React.FC<Vehicle360CustomizerProps> = ({
  onOpenTestDrive,
  onOpenDetails,
  onOpenQuotation
}) => {
  const { language, formatPrice, isRTL } = useLanguage();
  
  // Showcase Fleet (Flagship Solina, Lexus, Mercedes, Porsche, BMW, Genesis, Range Rover)
  const showcaseModels = VEHICLES.filter(v => 
    [
      'mercedes-s500-2026', 
      'lexus-lx600-2026', 
      'mercedes-g63-2026', 
      'porsche-cayenne-turbo-2026', 
      'range-rover-sv-2026', 
      'bmw-735i-2026', 
      'genesis-g90-2026', 
      'lexus-es300h-2026',
      'lc300-2026', 
      'prado-2026', 
      'camry-2026', 
      'crown-2026', 
      'gr86-2026'
    ].includes(v.id)
  );

  const [activeBrandTab, setActiveBrandTab] = useState<string>('all');
  const [activeModelId, setActiveModelId] = useState<string>('mercedes-s500-2026');
  const [viewMode, setViewMode] = useState<'exterior' | 'interior' | 'grades'>('exterior');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(0);
  const [interiorTheme, setInteriorTheme] = useState<'tan' | 'black' | 'red' | 'saddle'>('tan');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [angleOffset, setAngleOffset] = useState<number>(0);

  const activeVehicle = VEHICLES.find(v => v.id === activeModelId) || showcaseModels[0];
  const isLexus = activeVehicle.brand === 'lexus';
  const activeColor = activeVehicle.colors[selectedColorIndex] || activeVehicle.colors[0];
  const activeGrade = activeVehicle.grades?.[selectedGradeIndex] || activeVehicle.grades?.[0];

  const filteredShowcase = showcaseModels.filter(m => {
    if (activeBrandTab === 'all') return true;
    if (activeBrandTab === 'toyota' || activeBrandTab === 'solina') return !m.brand || m.brand === 'toyota' || m.brand === 'solina';
    return m.brand === activeBrandTab;
  });

  const handlePlayEngineSound = () => {
    setIsPlayingAudio(true);
    let soundType = 'v6';
    if (activeVehicle.id.includes('lc500') || activeVehicle.isGR) soundType = 'gr';
    else if (activeVehicle.isHybrid || activeVehicle.powertrain === 'هايبرد') soundType = 'hybrid';
    else if (activeVehicle.powertrain === 'ديزل') soundType = 'diesel';

    soundEngine.playEngineSound(soundType as any);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  const handleRotateStage = () => {
    setAngleOffset((prev) => (prev + 90) % 360);
  };

  return (
    <section className="py-20 md:py-28 bg-[#070B14] text-white relative overflow-hidden select-none border-y border-white/5">
      {/* Luxury Ambient Studio Lighting */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'استوديو العرض التفاعلي الفاخر 360°' : 'Flagship 360° Interactive Showroom'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-display">
              {language === 'ar' ? 'استوديو تخصيص ومعاينة السيارات' : 'Exclusive Vehicle Customizer Studio'}
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              {language === 'ar'
                ? 'استعرض المظهر الخارجي بدقة متناهية، خصص ألوان الطلاء والألوان الداخلية، واستمع لهدير المحرك وتفاصيل الفئات الرسمية.'
                : 'Experience flagship models in high fidelity with interactive paint customizers, bespoke interior themes, engine acoustics, and trim packages.'}
            </p>
          </div>

          {/* Brand Filter Switcher */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md self-start lg:self-end overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveBrandTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'All'}
            </button>
            <button
              onClick={() => setActiveBrandTab('toyota')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'toyota' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              SOLINA
            </button>
            <button
              onClick={() => setActiveBrandTab('lexus')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                activeBrandTab === 'lexus' ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Crown className="w-3 h-3 text-[#D4AF37]" />
              <span>LEXUS</span>
            </button>
            <button
              onClick={() => setActiveBrandTab('mercedes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'mercedes' ? 'bg-slate-700 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              MERCEDES
            </button>
            <button
              onClick={() => setActiveBrandTab('porsche')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'porsche' ? 'bg-red-700 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              PORSCHE
            </button>
            <button
              onClick={() => setActiveBrandTab('bmw')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'bmw' ? 'bg-blue-800 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              BMW
            </button>
            <button
              onClick={() => setActiveBrandTab('genesis')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'genesis' ? 'bg-zinc-700 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              GENESIS
            </button>
            <button
              onClick={() => setActiveBrandTab('landrover')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBrandTab === 'landrover' ? 'bg-emerald-800 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              RANGE ROVER
            </button>
          </div>
        </div>

        {/* Model Carousel Selector Bar */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {filteredShowcase.map((m) => {
            const isSelected = activeModelId === m.id;
            const isMdlLexus = m.brand === 'lexus';
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModelId(m.id);
                  setSelectedColorIndex(0);
                  setSelectedGradeIndex(0);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? isMdlLexus
                      ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-[#D4AF37] text-[#D4AF37] shadow-lg shadow-amber-950/40 scale-105'
                      : 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isMdlLexus && <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />}
                <span>{language === 'ar' ? m.nameAr : m.nameEn}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  {formatPrice(m.priceStartingFrom)} ر.س
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 360 Studio Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-3xl p-6 md:p-10 border border-white/15 backdrop-blur-2xl shadow-2xl">
          
          {/* Left / Center Column: Showcase Stage (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            
            {/* View Mode Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 mb-6 z-20 shadow-inner">
              <button
                onClick={() => setViewMode('exterior')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'exterior' 
                    ? isLexus ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'المظهر الخارجي 360°' : 'Exterior 360°'}</span>
              </button>

              <button
                onClick={() => setViewMode('interior')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'interior' 
                    ? isLexus ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'المقصورة الداخلية الفاخرة' : 'Luxury Interior'}</span>
              </button>

              <button
                onClick={() => setViewMode('grades')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grades' 
                    ? isLexus ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مقارنة الفئات والأسعار' : 'Trims & Pricing'}</span>
              </button>
            </div>

            {/* Visual Stage Container */}
            <div className="w-full flex items-center justify-center py-6 md:py-12 relative min-h-[340px] md:min-h-[420px]">
              
              {viewMode === 'exterior' && (
                <>
                  {/* Studio Floor Reflection & Lighting */}
                  <div 
                    className="absolute inset-x-12 bottom-6 h-14 rounded-full blur-2xl pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: `${activeColor?.hex || '#1A56DB'}45` }}
                  />

                  {/* 360 Rotation Control Badge */}
                  <button
                    onClick={handleRotateStage}
                    className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-[11px] text-gray-300 transition-all cursor-pointer"
                    title="تدوير زاوية العرض"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
                    <span>360° {language === 'ar' ? 'زاوية تفاعلية' : 'Interactive'}</span>
                  </button>

                  {/* Car Image with 3D Cutout */}
                  <img
                    key={activeColor?.image || activeVehicle.cardImage}
                    src={activeColor?.image || activeVehicle.cardImage}
                    alt={activeVehicle.nameAr}
                    className="relative z-10 max-h-[260px] md:max-h-[350px] w-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transform hover:scale-105 transition-all duration-700 animate-in zoom-in-95"
                    style={{
                      transform: `perspective(1000px) rotateY(${angleOffset > 0 ? (angleOffset > 180 ? -6 : 6) : 0}deg)`
                    }}
                  />
                </>
              )}

              {viewMode === 'interior' && (
                <div className="w-full max-w-xl bg-black/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/15 text-center space-y-5 animate-in fade-in">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs text-gray-300 font-bold">
                      {language === 'ar' ? 'اختر خامة ولون مقاعد الجلد:' : 'Select Bespoke Leather Trim:'}
                    </span>
                    {[
                      { id: 'tan', label: 'جملي فاخر Saddle Tan', hex: '#8B5A2B' },
                      { id: 'black', label: 'أسود ميكا Obsidian Black', hex: '#1A1A1A' },
                      { id: 'red', label: 'أحمر رياضي Flare Red', hex: '#8B0000' },
                      { id: 'saddle', label: 'شامبين عاجي Ivory Cream', hex: '#D2B48C' }
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={() => setInteriorTheme(c.id as any)}
                        title={c.label}
                        style={{ backgroundColor: c.hex }}
                        className={`w-7 h-7 rounded-full border border-white/40 transition-transform cursor-pointer ${
                          interiorTheme === c.id 
                            ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-black scale-125 shadow-lg' 
                            : 'hover:scale-110 opacity-80'
                        }`}
                      />
                    ))}
                  </div>

                  <div 
                    className="h-52 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden shadow-inner"
                    style={{
                      backgroundColor: interiorTheme === 'tan' ? '#2B1A0E' : interiorTheme === 'red' ? '#2E0B10' : interiorTheme === 'saddle' ? '#2A241C' : '#141414'
                    }}
                  >
                    <Crown className="w-6 h-6 text-[#D4AF37] mb-2 animate-pulse" />
                    <span className="text-base font-black text-white mb-1 font-display">
                      {language === 'ar' ? `مقصورة ${activeVehicle.nameAr} الحصرية` : `${activeVehicle.nameEn} Executive Cabin`}
                    </span>
                    <span className="text-xs text-gray-300 max-w-md">
                      {language === 'ar' 
                        ? 'جلد نابا طبيعي مخرم مع خاصية التبريد والتدليك، شاشات رقمية مزدوجة، ونظام صوتي محيطي متقدم.' 
                        : 'Handcrafted Semi-Aniline Leather with Climate Control & Massage, Dual HD Panoramic Displays & Surround Sound.'}
                    </span>
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-gray-200 border border-white/10">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>{language === 'ar' ? 'إضاءة محيطية تفاعلية بـ 64 لوناً' : '64-Color Dynamic Ambient Light'}</span>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'grades' && (
                <div className="w-full max-w-2xl bg-black/80 backdrop-blur-xl rounded-3xl p-6 border border-white/15 space-y-4 animate-in fade-in">
                  <span className="text-xs font-bold text-gray-300 block">
                    {language === 'ar' ? 'الفئات والأسعار المعتمدة من سولينا للسيارات:' : 'Official ALJ Grades & Pricing:'}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {activeVehicle.grades.map((grd, idx) => {
                      const isGrdSelected = selectedGradeIndex === idx;
                      return (
                        <div
                          key={grd.name}
                          onClick={() => setSelectedGradeIndex(idx)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer text-start ${
                            isGrdSelected
                              ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-white">
                              {language === 'ar' ? grd.name : grd.nameEn}
                            </span>
                            {isGrdSelected && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                          </div>
                          <span className="text-sm font-black text-[#D4AF37] font-mono block mb-2">
                            {formatPrice(grd.price)} ر.س
                          </span>
                          <ul className="text-[10px] text-gray-300 space-y-1 font-sans">
                            {(language === 'ar' ? grd.features : grd.featuresEn).slice(0, 3).map((f, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Color Swatches Bar (when in exterior mode) */}
            {viewMode === 'exterior' && (
              <div className="w-full max-w-xl bg-black/50 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{language === 'ar' ? 'اللون الخارجي:' : 'Exterior Paint:'}</span>
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: activeColor?.hex || '#ffffff' }}
                    />
                    {language === 'ar' ? activeColor?.name : activeColor?.nameEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeVehicle.colors.map((color, idx) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={color.name}
                      className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black scale-110 shadow-md'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-white filter drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Spec Breakdown, Engine Rev & Quick Actions (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-s lg:border-white/10 lg:ps-8">
            <div className="space-y-4">
              
              {/* Brand & Body Type Tag */}
              <div className="flex items-center gap-2">
                {isLexus ? (
                  <span className="bg-amber-500/20 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/40 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>LEXUS LUXURY</span>
                  </span>
                ) : (
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">
                    SOLINA OFFICIAL
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {language === 'ar' ? activeVehicle.bodyTypeAr : activeVehicle.bodyTypeEn}
                </span>
              </div>

              {/* Title & Engine Spec */}
              <h3 className="text-2xl md:text-3xl font-black text-white font-display">
                {language === 'ar' ? activeVehicle.nameAr : activeVehicle.nameEn}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {activeVehicle.engineSpec} • {activeVehicle.transmissionAr} • {activeVehicle.drivetrain}.
              </p>

              {/* Specs Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-gray-400">{language === 'ar' ? 'القوة الحصانية' : 'Horsepower'}</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">{activeVehicle.horsepower}</span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Fuel className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] text-gray-400">{language === 'ar' ? 'استهلاك الوقود' : 'Fuel Economy'}</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">{activeVehicle.fuelEconomy}</span>
                </div>
              </div>

              {/* Play Engine Audio Rev Button */}
              <button
                onClick={handlePlayEngineSound}
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white scale-105 shadow-lg shadow-blue-500/30'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-[#D4AF37]' : 'text-blue-400'}`} />
                <span>
                  {isPlayingAudio 
                    ? (language === 'ar' ? 'المحرك يعمل الآن (صوت واقعي)...' : 'Engine Running (HD Audio)...') 
                    : (language === 'ar' ? 'تشغيل صوت محرك السيارة 🔊' : 'Listen to Engine Sound 🔊')}
                </span>
              </button>

              {/* Pricing Display Box */}
              <div className="bg-black/40 p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] text-gray-400 block mb-0.5">
                  {language === 'ar' ? 'السعر النقدي (الفئة المحددة):' : 'Cash Price (Selected Trim):'}
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white font-mono">
                    {formatPrice(activeGrade?.price || activeVehicle.priceStartingFrom)} <span className="text-xs text-blue-400">ر.س</span>
                  </span>
                  <span className="text-xs text-gray-400 font-sans">
                    {language === 'ar' ? 'شامل الضريبة 15%' : '15% VAT Incl.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => onOpenDetails(activeVehicle.id)}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'ar' ? 'استعراض كافة تفاصيل ومواصفات الفئات' : 'View Full Model Trims & Specs'}</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenTestDrive(activeVehicle.nameAr)}
                  className="py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 transition-colors cursor-pointer text-center"
                >
                  {language === 'ar' ? 'طلب تجربة قيادة' : 'Test Drive'}
                </button>

                {onOpenQuotation && (
                  <button
                    onClick={() => onOpenQuotation(activeVehicle, activeGrade)}
                    className="py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-600" />
                    <span>{language === 'ar' ? 'عرض سعر' : 'Quotation'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
