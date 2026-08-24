import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const GuestCommitmentSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full min-h-[500px] flex items-center overflow-hidden bg-gray-900">
      {/* Background Car Image */}
      <img
        src="https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/our-commitment-to-our-guest/rav4.webp?w=1920&q=75&f=webp"
        alt="Guest Commitment"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content Container matching Toyota SA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full flex flex-col items-start text-start">
        <div className="max-w-xl text-white space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight">
            {language === 'ar' ? 'التزامنا نحو ضيوفنا' : 'Our Commitment to Our Guests'}
          </h2>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-light">
            {language === 'ar'
              ? 'تحرص شركة الجبراني للسيارات على تطبيق مبدأ "الضيف أولاً"، حيث نعمل على توفير مرافق وخدمات تجعل شراء وتملك سياراتك تجربة مرضية لعملائها بكل المقاييس. وتدعم الشركة الانتشار الواسع لسياراتنا في السوق السعودي عبر شبكة ممتدة من مراكز البيع والصيانة الموزعة استراتيجيًا في أنحاء المملكة لتوفير راحة البال لعملائها أينما كانوا، مستندة لسياسة "الضيف أولاً"، والتزامها بالتميز في كل ما تقدمه.'
              : 'Al Jabrani Motors ardently adheres to the "Guest First" principle, ensuring purchasing and owning a vehicle is a satisfying experience at every touchpoint across our extensive showroom and service network throughout Saudi Arabia.'}
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('showrooms');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition-all duration-300 cursor-pointer"
            >
              {language === 'ar' ? 'معلومات عنا' : 'About Us'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
