import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const GuestCommitmentSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="guest-commitment" className="relative w-full min-h-[540px] flex items-center overflow-hidden bg-black font-arabic">
      {/* Background Car Image (Solina RAV4 2026 Red) */}
      <img
        src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/rav4/hero-banner/rav4-2026.webp?w=1920&q=75&f=webp"
        alt="التزامنا نحو ضيوفنا"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
      
      {/* Soft gradient overlay for text readability on the right side in RTL */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent pointer-events-none" />

      {/* Content Container matching Solina SA 1:1 */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-16 w-full flex flex-col items-start text-start">
        <div className="max-w-2xl text-white space-y-5">
          <h2 className="text-3xl md:text-5xl font-normal font-arabic tracking-tight text-white">
            {language === 'ar' ? 'التزامنا نحو ضيوفنا' : 'Our Commitment to Our Guests'}
          </h2>

          <p className="text-sm md:text-base text-gray-100 leading-relaxed font-normal">
            {language === 'ar'
              ? 'تحرص شركة سولينا للسيارات على تطبيق مبدأ "الضيف أولاً" حيث نعمل على توفير مرافق وخدمات تجعل شراء وتملك سيارات سولينا تجربة مرضية لعملائها بكل المقاييس. وتدعم الشركة الانتشار الواسع لسيارات سولينا في السوق السعودي عبر شبكة ممتدة من مراكز البيع والصيانة الموزعة استراتيجياً في أنحاء المملكة لتوفير راحة البال لعملائها أينما كانوا، مستندة لسياسة "الضيف أولاً"، والتزامها بالتميز في كل ما تقدمه.'
              : 'Solina Motors is dedicated to upholding the "Guest First" principle, providing facilities and services that make purchasing and owning a Solina vehicle an entirely satisfying experience.'}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('showrooms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-3 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-base shadow-lg transition-all duration-200 cursor-pointer"
            >
              {language === 'ar' ? 'معلومات عنا' : 'About Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
