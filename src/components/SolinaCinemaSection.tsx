import React, { useState } from 'react';
import { Play, Film, Sparkles, Eye, CheckCircle2, Clock, Volume2, ShieldCheck, ArrowLeft, ArrowRight, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoItem {
  id: string;
  title: string;
  titleEn: string;
  brand: string;
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
    id: 'lucid-air-sapphire-video',
    title: 'لوسيد إير سافاير 2026 - فخر الصناعة بالسعودية وقوة 1,234 حصان',
    titleEn: 'Lucid Air Sapphire 2026 - Made in KSA 1,234 HP Electric Power',
    brand: 'lucid',
    category: 'كهربائية خارقة KSA',
    categoryEn: 'Electric Super-Sedan',
    duration: '03:45',
    thumbnail: 'https://images.unsplash.com/photo-1563720223523-491ff04651de?w=1200&auto=format&fit=crop&q=85',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=sM3G3M3tB-E',
    description: 'استكشف تسارع لوسيد إير سافاير المذهل (0-100 في 1.89 ثانية) والمجمعة بفخر في مصنع رابغ بمدينة الملك عبد الله الاقتصادية.',
    descriptionEn: 'Experience the exhilarating 0-100 km/h in 1.89s with Lucid Air Sapphire assembled at KAEC Rabigh, Saudi Arabia.',
    tags: ['Lucid Air Sapphire', 'Made in KSA', '1,234 HP', 'Tri-Motor', 'DreamDrive Pro']
  },
  {
    id: 'porsche-cayenne-turbo-video',
    title: 'بورشه كايين توربو E-Hybrid بقوة 729 حصان - وحش الحلبات',
    titleEn: 'Porsche Cayenne Turbo E-Hybrid GT Package - 729 HP Beast',
    brand: 'porsche',
    category: 'بورشه الرياضية',
    categoryEn: 'Porsche Performance',
    duration: '04:15',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=F3_d106-t0U',
    description: 'شاهد الأداء الألماني الخارق مع مكابح السيراميك PCCB وسقف ألياف الكربون ونظام العادم الرياضي التيتانيوم.',
    descriptionEn: 'Witness German track dominance with PCCB Ceramic Brakes, Carbon Roof, and Titanium Sports Exhaust.',
    tags: ['Porsche Cayenne', 'Turbo E-Hybrid', 'GT Package', '729 HP', 'PCCB']
  },
  {
    id: 'lexus-lx600-video',
    title: 'لكزس LX600 VIP 2026 - تجربة الفخامة الملكية المطلقة',
    titleEn: 'Lexus LX600 VIP 2026 - The Flagship Luxury Experience',
    brand: 'lexus',
    category: 'لكزس الفاخرة',
    categoryEn: 'Lexus Luxury',
    duration: '05:20',
    thumbnail: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format&fit=crop&q=85',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=XzGv0H6xJ8o',
    description: 'استمتع بمشاهدة مقصورة كبار الشخصيات المنفصلة مع مقاعد المساج ونظام الصوت المحيطي Mark Levinson بـ 25 مكبر صوت.',
    descriptionEn: 'Step inside the executive VIP cabin featuring Ottoman massaging seats and Mark Levinson Reference Audio.',
    tags: ['Lexus LX600', 'VIP Lounge', 'Mark Levinson', 'Presidential 4WD']
  },
  {
    id: 'nissan-gtr-nismo-video',
    title: 'نيسان GT-R نيسمو جودزيلا - تسارع 2.8 ثوانٍ على الحلبات',
    titleEn: 'Nissan GT-R NISMO Godzilla - 2.8s Track Launch',
    brand: 'nissan',
    category: 'نيسان نيسمو',
    categoryEn: 'Nissan NISMO',
    duration: '03:30',
    thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=85',
    videoSrc: '/document_5769533339421646917.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y-P2n4XyL_Q',
    description: 'استكشف أداء محرك VR38DETT المصنوع يدوياً بقوة 600 حصان وشواحن التيربو المأخوذة من سيارات سباق GT3.',
    descriptionEn: 'Explore the handcrafted 600 HP Takumi VR38DETT twin-turbo engine with GT3 race turbochargers.',
    tags: ['GT-R NISMO', 'Godzilla', 'Takumi Engine', 'Launch Control']
  },
  {
    id: 'ford-raptor-r-video',
    title: 'فورد F-150 رابتر R سوبرتشارج 720 حصان - قاهر الكثبان الرملية',
    titleEn: 'Ford F-150 Raptor R Supercharged 720 HP - Desert Baja King',
    brand: 'ford',
    category: 'فورد بيرفورمانس',
    categoryEn: 'Ford Performance',
    duration: '04:10',
    thumbnail: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=1200&auto=format&fit=crop&q=85',
    videoSrc: '/7717637.mp4',
    youtubeUrl: 'https://www.youtube.com/watch?v=Jm3U4P6jY-k',
    description: 'شاهد قفزات رابتر R على الكثبان الرملية بصوت محرك V8 سوبرتشارج الصاخب ومساعدات FOX Live Valve الذكية.',
    descriptionEn: 'Watch high-speed desert dune jumps powered by the roaring 5.2L Supercharged V8 and FOX Live Valve shocks.',
    tags: ['Ford Raptor R', 'Supercharged V8', 'FOX Live Valve', 'Desert Trophy']
  }
];

export const SolinaCinemaSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(CINEMA_VIDEOS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const categories = [
    { id: 'all', labelAr: 'كافة الأفلام الرسمية', labelEn: 'All Official Films' },
    { id: 'lucid', labelAr: 'لوسيد KSA', labelEn: 'Lucid Motors KSA' },
    { id: 'porsche', labelAr: 'بورشه', labelEn: 'Porsche' },
    { id: 'lexus', labelAr: 'لكزس VIP', labelEn: 'Lexus VIP' },
    { id: 'nissan', labelAr: 'نيسان نيسمو', labelEn: 'Nissan NISMO' },
    { id: 'ford', labelAr: 'فورد رابتر', labelEn: 'Ford Performance' }
  ];

  const filteredVideos = activeCategory === 'all'
    ? CINEMA_VIDEOS
    : CINEMA_VIDEOS.filter(v => v.brand === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white font-arabic overflow-hidden relative border-t border-b border-gray-800">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#0056B3]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0056B3]/20 text-blue-400 text-xs font-bold mb-3 border border-[#0056B3]/40">
              <Film className="w-3.5 h-3.5 text-[#0056B3]" />
              <span>{language === 'ar' ? 'استوديو سينما سولينا للسيارات 4K' : 'Solina 4K Cinema Studio'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-arabic">
              {language === 'ar' ? 'عالم سولينا السينمائي وتجارب القيادة' : 'Solina Cinematic Experience & Track Drives'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl font-light">
              {language === 'ar' 
                ? 'استمتع بمشاهدة الأفلام الرسمية وتجارب الأداء الحية لأقوى طرازات السيارات العالمية بتقنية 4K والصوت المحيطي.' 
                : 'Watch official performance films and exhilarating test drives of global automotive giants in 4K.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const firstOfCat = CINEMA_VIDEOS.find(v => cat.id === 'all' || v.brand === cat.id);
                  if (firstOfCat) setSelectedVideo(firstOfCat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#0056B3] text-white shadow-md shadow-[#0056B3]/40'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {language === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Main Cinema Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Stage (8 Cols) */}
          <div className="lg:col-span-8 bg-gray-900/90 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
              <video
                key={selectedVideo.id}
                controls
                autoPlay={isPlaying}
                playsInline
                poster={selectedVideo.thumbnail}
                className="w-full h-full object-cover"
              >
                <source src={selectedVideo.videoSrc} type="video/mp4" />
                {language === 'ar' ? 'متصفحك لا يدعم مشغل الفيديو' : 'Your browser does not support video playback'}
              </video>
            </div>

            {/* Video Meta Info */}
            <div className="p-6 md:p-8 space-y-4 bg-gradient-to-t from-black via-gray-900/80 to-transparent">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#0056B3]/30 text-blue-300 text-xs font-bold border border-[#0056B3]/50">
                  {language === 'ar' ? selectedVideo.category : selectedVideo.categoryEn}
                </span>

                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0056B3]" />
                    {selectedVideo.duration}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">4K Ultra HD</span>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white font-arabic">
                {language === 'ar' ? selectedVideo.title : selectedVideo.titleEn}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {language === 'ar' ? selectedVideo.description : selectedVideo.descriptionEn}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {selectedVideo.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video Playlist Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-gray-400 px-2 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'ar' ? 'قائمة التشغيل السينمائية' : 'Cinematic Playlist'}</span>
              <span className="text-xs text-[#0056B3] font-mono">{filteredVideos.length} {language === 'ar' ? 'أفلام' : 'Films'}</span>
            </h4>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 no-scrollbar">
              {filteredVideos.map((video) => {
                const isSelected = selectedVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group ${
                      isSelected
                        ? 'bg-[#0056B3]/20 border-[#0056B3] shadow-lg shadow-[#0056B3]/20'
                        : 'bg-white/5 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    {/* Video Thumbnail */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 border border-white/10">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-[#0056B3] text-white' : 'bg-white/70 text-black group-hover:bg-white'
                        }`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1.5 py-0.5 rounded text-white font-mono">
                        {video.duration}
                      </span>
                    </div>

                    {/* Video Title & Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className={`text-xs font-bold line-clamp-2 leading-snug mb-1 font-arabic transition-colors ${
                        isSelected ? 'text-blue-300' : 'text-white group-hover:text-blue-200'
                      }`}>
                        {language === 'ar' ? video.title : video.titleEn}
                      </h5>
                      <span className="text-[10px] text-gray-400 block font-light">
                        {language === 'ar' ? video.category : video.categoryEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
