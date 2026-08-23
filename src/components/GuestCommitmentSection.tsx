import React from 'react';
import { ShieldCheck, HeartHandshake, MapPin, Award, CheckCircle2, PhoneCall, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GuestCommitmentSection: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const stats = [
    {
      value: '+70',
      labelAr: 'مركز بيع وصيانة بالمملكة',
      labelEn: 'Showrooms & Centers Across KSA'
    },
    {
      value: '+1,500',
      labelAr: 'كادر فني واستشاري معتمد',
      labelEn: 'Certified Engineers & Advisors'
    },
    {
      value: '100%',
      labelAr: 'قطع غيار أصلية بضمان تويوتا',
      labelEn: '100% Genuine Toyota Parts'
    },
    {
      value: '24/7',
      labelAr: 'مساندة ومساعدة على الطريق',
      labelEn: '24/7 Roadside Assistance'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A0E17] via-[#0F3EAB] to-[#1A56DB] text-white shadow-2xl border border-gray-800">
          {/* Backdrop Graphic Image */}
          <div className="absolute inset-0 z-0 opacity-25 md:opacity-35 mix-blend-luminosity">
            <img
              src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/rav4/hero-banner/rav4-2026.webp?w=1920&q=75&f=webp"
              alt="Toyota Commitment"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0E17] via-[#0A0E17]/80 to-transparent z-0" />

          {/* Content Layout */}
          <div className="relative z-10 p-8 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-xs font-bold mb-4">
                <HeartHandshake className="w-4 h-4 text-yellow-400" />
                <span>{language === 'ar' ? 'فلسفة الضيف أولاً' : 'Guest First Philosophy'}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white font-display mb-5 leading-tight">
                {language === 'ar' ? 'التزامنا نحو ضيوفنا' : 'Our Commitment to Our Guests'}
              </h2>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 font-light">
                {language === 'ar'
                  ? 'تحرص شركة الجبراني للسيارات على تطبيق مبدأ "الضيف أولاً"، حيث نعمل على توفير مرافق وخدمات متطورة تجعل شراء وتملك سيارات تويوتا ولكزس تجربة استثنائية بكل المقاييس. وتدعم الشركة الانتشار الواسع لسيارات تويوتا في السوق السعودي عبر شبكة ممتدة من مراكز البيع والصيانة الموزعة استراتيجياً في أنحاء المملكة لتوفر راحة البال لعملائها أينما كانوا، مستندة إلى التزام لا يتهاون بالتميز والجودة.'
                  : 'At Al-Jabrani Motors, we ardently adhere to the "Guest First" principle, establishing world-class facilities and seamless services that elevate owning a Toyota or Lexus vehicle into an unparalleled luxury experience across the Kingdom of Saudi Arabia.'}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('showrooms');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'تفضل بزيارة مراكزنا وفروعنا' : 'Visit Our Showrooms & Centers'}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <a
                  href="tel:8002444400"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs md:text-sm rounded-xl transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-yellow-400" />
                  <span>{language === 'ar' ? 'اتصل بخدمة الضيوف: 800-244-4400' : 'Guest Care: 800-244-4400'}</span>
                </a>
              </div>
            </div>

            {/* Stats Cards Column */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between"
                >
                  <span className="text-3xl md:text-4xl font-black text-yellow-400 font-display mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-200 font-semibold leading-snug">
                    {language === 'ar' ? stat.labelAr : stat.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
