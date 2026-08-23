import React, { useState } from 'react';
import { Flame, Gauge, Zap, Volume2, Shield, ArrowLeft, ArrowRight, Play, CheckCircle2, Trophy } from 'lucide-react';
import { VEHICLES } from '../data/toyotaData';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface GRPerformanceSectionProps {
  onSelectVehicle: (vehicleId: string) => void;
  onOpenTestDrive: (modelName?: string) => void;
}

export const GRPerformanceSection: React.FC<GRPerformanceSectionProps> = ({
  onSelectVehicle,
  onOpenTestDrive
}) => {
  const { language, formatPrice } = useLanguage();
  const grVehicles = VEHICLES.filter(v => v.category === 'gr' || v.isGR || v.id === 'hilux-dc-2026' || v.id === 'lc300-2026');
  const [activeModelId, setActiveModelId] = useState<string>('gr-supra-2026');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const selectedVehicle = VEHICLES.find(v => v.id === activeModelId) || grVehicles[0];

  const handlePlayRev = () => {
    setIsPlayingAudio(true);
    soundEngine.playEngineSound('gr');
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  return (
    <section id="gr-performance" className="py-20 bg-[#090A0D] text-white relative overflow-hidden border-t-2 border-[#EB0A1E]">
      {/* Carbon fiber grid pattern & Red racing glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EB0A1E]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-xs font-bold text-red-400 mb-3">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>TOYOTA GAZOO RACING (GR)</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-display">
              {language === 'ar' ? 'أداء حلبات السباق الخالص' : 'Pure Motorsport DNA & Adrenaline'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
              {language === 'ar'
                ? 'طوّرت على أصعب حلبات العالم في نوربورغرينغ ورالي داكار لتقديم تجربة قيادة رياضية لا تُضاهى.'
                : 'Forged on the grueling tracks of Nürburgring and Dakar Rally to deliver uncompromising sports performance.'}
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
            {grVehicles.map(v => (
              <button
                key={v.id}
                onClick={() => setActiveModelId(v.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeModelId === v.id
                    ? 'bg-[#EB0A1E] text-white shadow-lg shadow-red-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {v.nameAr.replace('تويوتا ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Grid */}
        <div className="bg-gradient-to-br from-white/[0.07] to-transparent rounded-3xl p-6 md:p-12 border border-white/10 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Car Stage & Audio Action (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="w-full flex items-center justify-center py-8 relative min-h-[300px]">
              {/* Ground Glow */}
              <div className="absolute inset-x-12 bottom-4 h-14 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />

              <img
                src={selectedVehicle.cardImage}
                alt={selectedVehicle.nameAr}
                className="max-h-[260px] md:max-h-[320px] w-auto object-contain filter drop-shadow-[0_25px_35px_rgba(235,10,30,0.35)] transform hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Engine Rev Sound Button */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handlePlayRev}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? 'bg-red-600 text-white scale-105 ring-4 ring-red-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-red-400'}`} />
                <span>{isPlayingAudio ? (language === 'ar' ? 'صوت المحرك ينطلق...' : 'Engine Roaring...') : (language === 'ar' ? 'استمع لصوت عادم GR الرياضي' : 'Listen to GR Exhaust Note')}</span>
              </button>
            </div>
          </div>

          {/* Specs & Performance Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-white/10 lg:pr-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                  GAZOO RACING TUNED
                </span>
              </div>
              <h3 className="text-3xl font-black text-white font-display mb-2">
                {language === 'ar' ? selectedVehicle.nameAr : selectedVehicle.nameEn}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {selectedVehicle.engineSpec} | {selectedVehicle.transmissionAr}
              </p>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'القوة الحصانية' : 'Max Horsepower'}</span>
                <span className="text-xl font-black text-white font-mono">{selectedVehicle.horsepower}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'عزم الدوران الأقصى' : 'Peak Torque'}</span>
                <span className="text-xl font-black text-red-400 font-mono">{selectedVehicle.torque || '500 ن.م'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'التسارع (0-100 كم/س)' : '0-100 km/h'}</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{selectedVehicle.acceleration0to100 || '3.9s'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 block">{language === 'ar' ? 'السعر النقدي يبدأ من' : 'Price Starts From'}</span>
                <span className="text-base font-black text-white font-mono">{formatPrice(selectedVehicle.priceStartingFrom)} ر.س</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectVehicle(selectedVehicle.id)}
                className="flex-1 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors"
              >
                {language === 'ar' ? 'المواصفات والفئات الكاملة' : 'View Full Specifications'}
              </button>

              <button
                onClick={() => onOpenTestDrive(selectedVehicle.nameAr)}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#EB0A1E] hover:bg-[#BA0817] text-white font-bold text-xs text-center transition-colors shadow-lg shadow-red-600/30"
              >
                {language === 'ar' ? 'حجز تجربة قيادة GR' : 'Book GR Test Drive'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
