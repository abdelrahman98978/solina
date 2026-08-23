import React, { useState } from 'react';
import { Play, Film, Sparkles, Eye, CheckCircle2, Clock, Volume2, ShieldCheck, ArrowLeft, ArrowRight, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  duration: string;
  thumbnail: string;
  videoSrc: string;
  youtubeUrl: string;
  description: string;
  descriptionEn: string;
  tags: string[];
}

const CINEMA_VIDEOS: VideoItem[] = [
  {
    id: 'lc300-hev-max-video',
    title: 'تويوتا لاند كروزر 300 HEV Max - نفس الروح بتقنيات متجددة',
    titleEn: 'Toyota Land Cruiser 300 HEV Max - The Same Spirit, Renewed Tech',
    category: 'هايبرد ودفع رباعي ماكس',
    categoryEn: 'HEV Max 4WD',
    duration: '02:30',
    thumbnail: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-1870x850-arab.webp',
    videoSrc: '/لاندكروزر 300 HEV Max _نفس الروح بتقنيات متجددة.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=F3_d106-t0U',
    description: 'استكشف لاند كروزر 300 HEV Max الجديدة كلياً: منظومة هايبرد قوية متطورة تحافظ على روح قاهر الصحراء مع كفاءة استهلاك وقود فائقة.',
    descriptionEn: 'Discover the All-New Land Cruiser 300 HEV Max: Unmatched power meets next-generation hybrid technology.',
    tags: ['LC300 HEV Max', 'Hybrid Synergy', 'Crawl Control', 'Off-Road']
  },
  {
    id: 'prado-2026-video',
    title: 'تويوتا لاند كروزر برادو 2026 - عودة الأسطورة بتصميم جريء',
    titleEn: 'All-New Toyota Prado 2026 - The Legend Reborn',
    category: 'مغامرات ودفع رباعي',
    categoryEn: 'Adventure & 4WD',
    duration: '04:12',
    thumbnail: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/desktop-view/4---desktop.webp?w=1920&q=75&f=webp',
    videoSrc: '/7717637.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=Jm3U4P6jY-k',
    description: 'اكتشف قدرات برادو 2026 في تخطي أصعب التضاريس والرمال مع شاسيه TNGA-F وتقنية فصل عمود التوازن SDM.',
    descriptionEn: 'Explore the unbeatable off-road agility of the 2026 Prado built on TNGA-F architecture.',
    tags: ['Prado 2026', 'TNGA-F', 'SDM Stabilizer', 'Adventure']
  },
  {
    id: 'lexus-lx600-video',
    title: 'لكزس LX600 VIP 2026 - تجربة الفخامة الملكية المطلقة',
    titleEn: 'Lexus LX600 VIP 2026 - The Flagship Luxury Experience',
    category: 'لكزس الفاخرة',
    categoryEn: 'Lexus Luxury',
    duration: '05:20',
    thumbnail: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=XzGv0H6xJ8o',
    description: 'استمتع بمشاهدة مقصورة كبار الشخصيات المنفصلة مع مقاعد المساج ونظام الصوت المحيطي Mark Levinson بـ 25 مكبر صوت.',
    descriptionEn: 'Step inside the executive VIP cabin featuring Ottoman massaging seats and Mark Levinson Reference Audio.',
    tags: ['Lexus LX600', 'VIP Lounge', 'Mark Levinson', 'Presidential']
  },
  {
    id: 'rav4-hybrid-video',
    title: 'تويوتا راف فور هايبرد RAV4 - كفاءة استثنائية وانسيابية ذكية',
    titleEn: 'Toyota RAV4 Hybrid - Efficiency Meets Dynamic Power',
    category: 'هايبرد صديق للبيئة',
    categoryEn: 'Hybrid HEV',
    duration: '03:10',
    thumbnail: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_1870x850-ar.webp',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=sM3G3M3tB-E',
    description: 'نظام الهايبرد الرائد مع استهلاك وقود 22.2 كم/لتر ونظام الدفع الكلي الكهربائي E-Four الذكي.',
    descriptionEn: 'Benchmark hybrid efficiency achieving 22.2 km/L with intelligent E-Four all-wheel drive.',
    tags: ['RAV4 Hybrid', 'E-Four AWD', '22.2 km/L', 'Smart HEV']
  },
  {
    id: 'gr86-motorsport-video',
    title: 'تويوتا GR86 و GR سوبرا - أدرينالين حلبات السباق الرياضية',
    titleEn: 'Toyota GR86 & GR Supra - Motorsport Adrenaline',
    category: 'سيارات الأداء الرياضي GR',
    categoryEn: 'GR Performance',
    duration: '04:50',
    thumbnail: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y-P2n4XyL_Q',
    description: 'شاهد أداء سيارات تويوتا جازو للسباقات Gazoo Racing على المنعطفات السريعة ومضامير الدريفت الاحترافية.',
    descriptionEn: 'Witness Toyota Gazoo Racing engineering conquering fast apexes and high-speed drift tracks.',
    tags: ['GR86', 'Gazoo Racing', 'Track Mode', 'Boxer Engine']
  }
];

export const ToyotaCinemaSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(CINEMA_VIDEOS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const categories = [
    { id: 'all', labelAr: 'كافة الأفلام الرسمية', labelEn: 'All Official Films' },
    { id: '4x4', labelAr: 'سيارات الدفع الرباعي', labelEn: 'SUV & 4x4' },
    { id: 'lexus', labelAr: 'لكزس الفاخرة', labelEn: 'Lexus Luxury' },
    { id: 'gr', labelAr: 'تويوتا جازو للسباقات GR', labelEn: 'Gazoo Racing' }
  ];

  const filteredVideos = CINEMA_VIDEOS.filter((vid) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === '4x4') return vid.categoryEn.includes('4x4') || vid.categoryEn.includes('4WD') || vid.categoryEn.includes('Hybrid');
    if (activeCategory === 'lexus') return vid.categoryEn.includes('Lexus');
    if (activeCategory === 'gr') return vid.categoryEn.includes('GR');
    return true;
  });

  return (
    <section id="cinema" className="py-20 bg-[#070B14] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Lighting & Glow Accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold mb-3 border border-blue-500/30">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'ar' ? 'سينما جبراني للسيارات - أفلام تدشين 2026 الرسمية' : 'Gibrani Cinema - Official 2026 Launch Films'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-display">
              {language === 'ar' ? 'فيديوهات وعروض سيارات تويوتا ولكزس بدقة 4K' : 'Toyota & Lexus Official 4K Cinematic Films'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl">
              {language === 'ar'
                ? 'شاهد أحدث عروض الإطلاق والتجارب الميدانية لسيارات تويوتا لاند كروزر، برادو 2026، راف فور، وأسطول لكزس الفاخر.'
                : 'Watch official launch films, desert expeditions, and track tests for Land Cruiser, Prado 2026, RAV4, and Lexus.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Video Cinema Stage (Large Player) */}
        {selectedVideo && (
          <div className="bg-gradient-to-b from-[#111625] to-[#0A0E17] rounded-3xl border border-white/15 overflow-hidden shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left/Main Player Screen (8 Cols) */}
              <div className="lg:col-span-8 relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  key={selectedVideo.id}
                  src={selectedVideo.videoSrc}
                  poster={selectedVideo.thumbnail}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Details Panel (4 Cols) */}
              <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-white/[0.02] border-t lg:border-t-0 lg:border-s border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/30 text-[11px] font-bold">
                      {language === 'ar' ? selectedVideo.category : selectedVideo.categoryEn}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{selectedVideo.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-white font-display leading-snug">
                    {language === 'ar' ? selectedVideo.title : selectedVideo.titleEn}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    {language === 'ar' ? selectedVideo.description : selectedVideo.descriptionEn}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedVideo.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 font-mono">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'ar' ? 'فيديو رسمي معتمد بدقة 4K HDR' : 'Official Authorized 4K HDR Video'}</span>
                  </div>
                  
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                  >
                    <span>{language === 'ar' ? 'مشاهدة الفيلم الكامل على YouTube' : 'Watch Full Film on YouTube'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Video Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isCurrent = selectedVideo?.id === video.id;
            return (
              <div
                key={video.id}
                onClick={() => {
                  setSelectedVideo(video);
                }}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isCurrent 
                    ? 'border-blue-500 bg-blue-950/40 shadow-xl shadow-blue-500/20 scale-[1.02]' 
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {/* Thumbnail Stage */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Play Icon Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-500 transition-all">
                      <Play className="w-5 h-5 fill-white ms-0.5" />
                    </div>
                  </div>

                  {/* Duration Pill */}
                  <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-yellow-400" />
                    <span>{video.duration}</span>
                  </span>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-blue-300 border border-white/10">
                    {language === 'ar' ? video.category : video.categoryEn}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 font-display">
                    {language === 'ar' ? video.title : video.titleEn}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {language === 'ar' ? video.description : video.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
