import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Maximize2, Film, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSliderProps {
  onOpenTestDrive?: (modelName?: string) => void;
  onExploreModel?: (modelId: string) => void;
}

interface HeroVideoTrack {
  id: string;
  videoUrl: string;
  tag: string;
  titleAr: string;
  titleEn: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = () => {
  const { language } = useLanguage();

  const HERO_VIDEOS: HeroVideoTrack[] = [
    {
      id: 'lc300-hev-max',
      videoUrl: '/لاندكروزر 300 HEV Max _نفس الروح بتقنيات متجددة.mp4',
      tag: 'لاند كروزر 300 HEV Max',
      titleAr: 'لاند كروزر 300 HEV Max',
      titleEn: 'Land Cruiser 300 HEV Max'
    },
    {
      id: 'toyota-showcase-film',
      videoUrl: '/7717637.mp4',
      tag: 'استعراض تويوتا 2026',
      titleAr: 'استعراض أداء سيارات تويوتا الرسمي',
      titleEn: 'Toyota Saudi Arabia Dynamic Showcase'
    },
    {
      id: 'toyota-launch-film',
      videoUrl: '/document_5769533339421646917.mp4',
      tag: 'فيلم الأسطول 4K',
      titleAr: 'فيلم تدشين أسطول تويوتا ولكزس 2026',
      titleEn: 'Toyota & Lexus Fleet Launch Film'
    }
  ];

  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = HERO_VIDEOS[activeVideoIdx];

  // Auto-play the next video when current one ends
  const handleVideoEnded = () => {
    setActiveVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  const handleVideoSelect = (idx: number) => {
    setActiveVideoIdx(idx);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black text-white min-h-[500px] md:min-h-[640px] lg:min-h-[780px] flex items-center justify-center select-none">
      
      {/* 1. Pure Fullscreen Crystal-Clear Video Layer (Sequential Auto-Playlist / Zero Text Overlays) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          key={currentVideo.id}
          src={currentVideo.videoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center opacity-100"
        />

        {/* Minimal soft top & bottom edge gradients */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Minimal Floating Controls in Corner */}
      <div className="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-2.5">
        {/* Discrete Video Switcher */}
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg">
          {HERO_VIDEOS.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => handleVideoSelect(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeVideoIdx === idx
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {track.tag}
            </button>
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-all cursor-pointer shadow-lg"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
          )}
        </button>

        {/* Fullscreen Modal View Button */}
        <button
          onClick={() => setIsCinemaModalOpen(true)}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all cursor-pointer shadow-lg"
          title={language === 'ar' ? 'عرض بشاشة كاملة' : 'Fullscreen'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Fullscreen Cinema Video Modal */}
      {isCinemaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/90 to-transparent absolute top-0 inset-x-0 z-20">
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm md:text-base font-bold text-white font-display">
                  {language === 'ar' ? currentVideo.titleAr : currentVideo.titleEn}
                </h3>
              </div>

              <button
                onClick={() => setIsCinemaModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex items-center justify-center pt-14 md:pt-16">
              <video
                src={currentVideo.videoUrl}
                autoPlay
                controls
                playsInline
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
