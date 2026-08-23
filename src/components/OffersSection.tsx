import React from 'react';
import { Tag, Sparkles, Calendar, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OffersSectionProps {
  onOpenTestDrive: (offerTitle?: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onOpenTestDrive }) => {
  const { language, isRTL } = useLanguage();

  const officialOffers = [
    {
      id: 'veloz-5-years',
      title: '5 سنوات راحة بال مع تويوتا فيلوز 2026',
      titleEn: '5 Years of Peace of Mind with Toyota Veloz 2026',
      badge: 'عرض حصري 2026',
      badgeEn: 'Exclusive 2026 Offer',
      validUntil: '31 ديسمبر 2026',
      validUntilEn: '31 Dec 2026',
      description: 'امتلك سيارة العائلة العصرية فيلوز 7 ركاب مع باقة صيانة دورية مجانية لمدة 5 سنوات وضمان ممتد معتمد.',
      descriptionEn: 'Own the stylish 7-seater family Veloz with 5 years complimentary scheduled maintenance and certified extended warranty.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/veloz/offer-card/647x485/veloz-offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      features: [
        'صيانة مجانية لمدة 5 سنوات أو 100,000 كم',
        'ضمان المصنع الممتد حتى 5 سنوات',
        'تأمين شامل متوافق مع أحكام الشريعة',
        'بدون دفعة أولى وبدون رسوم إدارية'
      ],
      featuresEn: [
        '5 Years or 100,000 km Free Periodic Maintenance',
        'Extended Factory Warranty up to 5 Years',
        'Sharia-Compliant Comprehensive Insurance',
        '0% Down Payment & 0% Admin Fees'
      ]
    },
    {
      id: 'hev-hybrid-offer',
      title: 'عروض تويوتا الهايبرد HEV المتميزة',
      titleEn: 'Toyota HEV Hybrid Leadership Campaign',
      badge: 'عروض الهايبرد الذكية',
      badgeEn: 'Smart Hybrid Deals',
      validUntil: '31 ديسمبر 2026',
      validUntilEn: '31 Dec 2026',
      description: 'وفّر في الوقود وانعم بهدوء القيادة مع منظومة تويوتا الهايبرد على كامري، كورولا كروس، هايلاندر، وراف فور.',
      descriptionEn: 'Save fuel and experience whisper-quiet driving with Toyota Hybrid Synergy Drive on Camry, Corolla Cross, Highlander, and RAV4.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/hewvew/offer-card-arab-eng/offer-card-647x485-arab-eng/offer-card-647x485-arab.webp?w=1920&q=75&f=webp',
      features: [
        'استرداد نقدي فوري يصل حتى 15,000 ر.س',
        'ضمان بطارية الهايبرد لمدة 8 سنوات أو 160,000 كم',
        'معدل استهلاك وقود يصل إلى 27.7 كم/لتر',
        'خيارات تمويل بهامش ربح تنافسي يبدأ من 0.99%'
      ],
      featuresEn: [
        'Instant Cashback up to 15,000 SAR',
        '8 Years or 160,000 km Hybrid Battery Warranty',
        'Ultra Fuel Efficiency up to 27.7 km/L',
        'Competitive Profit Rate starting from 0.99%'
      ]
    },
    {
      id: 'prado-launch-offer',
      title: 'عروض لاندكروزر برادو 2026 الجديدة كلياً',
      titleEn: 'All-New Land Cruiser Prado 2026 Launch Offer',
      badge: 'الجيل الجديد',
      badgeEn: 'All-New Generation',
      validUntil: '31 ديسمبر 2026',
      validUntilEn: '31 Dec 2026',
      description: 'الأسطورة تعود بتصميم كلاسيكي متطور وقدرات دفع رباعي خارقة لجميع التضاريس مع أولوية التسليم الفوري.',
      descriptionEn: 'The legend returns with rugged heritage design and supreme 4WD capabilities across all terrains with priority delivery.',
      image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/common/hero-banner/sau_8692.webp?w=1920&q=75&f=webp',
      features: [
        'أولوية التسليم الفوري من صالات العرض',
        'باقة حماية النانو سيراميك والتظليل مجاناً',
        'خدمة المساعدة على الطريق 24/7 لمدة 3 سنوات',
        'برنامج تمويل 50/50 بدون هامش ربح'
      ],
      featuresEn: [
        'Priority Instant Showroom Delivery',
        'Complimentary Nano-Ceramic Protection & Tinting',
        '3 Years 24/7 Roadside Assistance',
        '50/50 Finance Scheme with 0% Profit Rate'
      ]
    }
  ];

  return (
    <section id="offers" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Section Heading matching Toyota SA */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ar' ? 'أحدث عروض الجبراني للسيارات 2026' : 'Latest Al-Jabrani Motors 2026 Offers'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 font-display">
            {language === 'ar' ? 'أحدث العروض: قُد أكثر وادفع أقل' : 'Latest Offers: Drive More, Pay Less'}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            {language === 'ar'
              ? 'استمتع بأقوى العروض الترويجية الحصرية على تشكيلة تويوتا 2026 مع حلول تمويلية مرنة وصيانة شاملة.'
              : 'Enjoy our most compelling exclusive promotional campaigns on the 2026 Toyota lineup with flexible financing.'}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {officialOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-gray-50 rounded-3xl border border-gray-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Banner Graphic Stage */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {language === 'ar' ? offer.badge : offer.badgeEn}
                  </span>

                  <div className="absolute bottom-3 right-4 left-4 text-white">
                    <span className="text-[11px] text-gray-300 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{language === 'ar' ? `ساري حتى: ${offer.validUntil}` : `Valid until: ${offer.validUntilEn}`}</span>
                    </span>
                  </div>
                </div>

                {/* Offer Content */}
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 font-display group-hover:text-blue-600 transition-colors leading-snug">
                    {language === 'ar' ? offer.title : offer.titleEn}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    {language === 'ar' ? offer.description : offer.descriptionEn}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-4 bg-white p-4 rounded-2xl border border-gray-200/80">
                    {(language === 'ar' ? offer.features : offer.featuresEn).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenTestDrive(language === 'ar' ? offer.title : offer.titleEn)}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'الاستفادة من هذا العرض فوراً' : 'Claim This Offer Now'}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
