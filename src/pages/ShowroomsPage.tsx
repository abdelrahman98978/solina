import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Search, 
  CheckCircle2, 
  Car, 
  Wrench,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NavigationControls } from '../components/NavigationControls';

interface ShowroomsPageProps {
  onBackToHome: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenServiceBooking: () => void;
  onSelectVehicle: (vehicleId: string) => void;
}

export const ShowroomsPage: React.FC<ShowroomsPageProps> = ({
  onBackToHome,
  onOpenTestDrive,
  onOpenServiceBooking,
  onSelectVehicle
}) => {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const branches = [
    {
      id: 'riyadh-khurais',
      region: 'central',
      cityAr: 'الرياض',
      nameAr: 'صالة عرض ومركز صيانة خريص الرئيسي',
      nameEn: 'Khurais Flagship Showroom & Service Center',
      addressAr: 'طريق خريص، تقاطع شارع الأحساء، الرياض',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
      servicesAr: ['صالة عرض سيارات جديدة', 'مركز صيانة معتمد', 'قطع غيار أصلية', 'مبيعات الشركات'],
      mapUrl: 'https://maps.google.com/?q=Solina+Khurais+Riyadh'
    },
    {
      id: 'riyadh-olaya',
      region: 'central',
      cityAr: 'الرياض',
      nameAr: 'صالة عرض العليا الفاخرة',
      nameEn: 'Olaya Premium Showroom',
      addressAr: 'طريق الملك فهد، حي العليا، الرياض',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 9:00 ص - 9:00 م',
      servicesAr: ['صالة عرض سيارات جديدة', 'استشارات تمويل', 'تسليم فوري'],
      mapUrl: 'https://maps.google.com/?q=Solina+Olaya+Riyadh'
    },
    {
      id: 'jeddah-palestine',
      region: 'western',
      cityAr: 'جدة',
      nameAr: 'مجمع فلسطين الرئيسي المتكامل',
      nameEn: 'Palestine Integrated Auto Complex',
      addressAr: 'شارع فلسطين، حي الرويس، جدة',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:00 ص - 8:30 م',
      servicesAr: ['صالة عرض سيارات جديدة', 'صيانة سريعة 45 دقيقة', 'سمكرة ودهان', 'قطع غيار أصلية'],
      mapUrl: 'https://maps.google.com/?q=Solina+Palestine+Jeddah'
    },
    {
      id: 'jeddah-madinah-road',
      region: 'western',
      cityAr: 'جدة',
      nameAr: 'صالة طريق المدينة المنورة الكبرى',
      nameEn: 'Madinah Road Mega Showroom',
      addressAr: 'طريق المدينة المنورة، كيلو 11، جدة',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:30 ص - 9:00 م',
      servicesAr: ['صالة عرض سيارات جديدة', 'أوتوهب المستعمل المعتمد', 'تسليم سيارات'],
      mapUrl: 'https://maps.google.com/?q=Solina+Madinah+Road+Jeddah'
    },
    {
      id: 'dammam-khobar-hwy',
      region: 'eastern',
      cityAr: 'الدمام والخبر',
      nameAr: 'مركز طريق الخبر السريع المتكامل',
      nameEn: 'Khobar Highway Integrated Center',
      addressAr: 'طريق الملك فهد السريع بين الدمام والخبر',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
      servicesAr: ['صالة عرض كبرى', 'مركز صيانة دورية', 'مبيعات جملة وأساطيل'],
      mapUrl: 'https://maps.google.com/?q=Solina+Dammam+Khobar'
    },
    {
      id: 'makkah-kakiyyah',
      region: 'western',
      cityAr: 'مكة المكرمة',
      nameAr: 'مركز الكعكية المعتمد',
      nameEn: 'Kakiyyah Authorized Center',
      addressAr: 'حي الكعكية، الطريق الدائري الرابع، مكة المكرمة',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
      servicesAr: ['صالة عرض', 'صيانة سريعة', 'قطع غيار أصلية'],
      mapUrl: 'https://maps.google.com/?q=Solina+Makkah'
    },
    {
      id: 'abha-khamis',
      region: 'southern',
      cityAr: 'أبها وخميس مشيط',
      nameAr: 'مجمع طريق الملك فهد بالجنوب',
      nameEn: 'King Fahd Road Southern Complex',
      addressAr: 'طريق الملك فهد، بين أبها وخميس مشيط',
      phone: '8004400055',
      hoursAr: 'السبت - الخميس: 8:00 ص - 7:30 م',
      servicesAr: ['صالة عرض سيارات الدفع الرباعي', 'صيانة معتمدة', 'خدمات تمويل'],
      mapUrl: 'https://maps.google.com/?q=Solina+Khamis+Mushait'
    }
  ];

  const filteredBranches = branches.filter(b => {
    const matchesRegion = selectedRegion === 'all' || b.region === selectedRegion;
    const matchesQuery = !searchQuery || 
      b.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.cityAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.addressAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-arabic flex flex-col">
      <Header
        onOpenTestDrive={onOpenTestDrive}
        onOpenServiceBooking={onOpenServiceBooking}
        onOpenCompare={() => {}}
        comparisonCount={0}
        onSelectCategory={() => onBackToHome()}
        onSelectVehicle={onSelectVehicle}
      />

      <main className="flex-1">
        {/* Hero Section with Solina Headquarters Flagship Complex */}
        <div className="relative w-full h-[380px] md:h-[460px] bg-black overflow-hidden flex items-center justify-center text-center">
          <img
            src="/solina-headquarters.png"
            alt="مقر وصالات عرض شركة سولينا للسيارات"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Breadcrumb & Navigation Controls */}
          <div className="absolute top-6 right-6 md:right-12 z-30">
            <NavigationControls 
              onBack={onBackToHome} 
              onHome={onBackToHome} 
              currentPageTitle={language === 'ar' ? 'صالات العرض' : 'Showrooms'}
            />
          </div>

          <div className="relative z-20 max-w-3xl px-4 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-[#0056B3] text-white text-xs font-bold tracking-wider">
              {language === 'ar' ? 'المقر الرئيسي وصالات العرض' : 'Headquarters & Showroom Network'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-arabic">
              {language === 'ar' ? 'صالات العرض ومراكز الخدمة' : 'Showrooms & Service Centers'}
            </h1>
            <p className="text-gray-200 text-sm md:text-lg font-light max-w-xl mx-auto">
              {language === 'ar'
                ? 'مراكز وصالات عرض شركة سولينا للسيارات المعتمدة بالمملكة لخدمتكم بأعلى معايير الضيافة والفخامة'
                : 'Solina Motors authorized showrooms and service facilities delivering the pinnacle of hospitality'}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="border-b border-gray-200 bg-gray-50 py-6 sticky top-0 z-30 shadow-sm">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Region Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
              {[
                { id: 'all', label: 'كافة المناطق' },
                { id: 'central', label: 'المنطقة الوسطى' },
                { id: 'western', label: 'المنطقة الغربية' },
                { id: 'eastern', label: 'المنطقة الشرقية' },
                { id: 'southern', label: 'المنطقة الجنوبية' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedRegion === r.id
                      ? 'bg-black text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالمدينة أو الحي أو اسم الفرع..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:border-[#0056B3] focus:outline-none text-xs bg-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        <section className="py-16 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBranches.map(branch => (
              <div
                key={branch.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#0056B3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#0056B3] bg-red-50 px-3 py-1 rounded-full">
                      {branch.cityAr}
                    </span>
                    <span className="text-[11px] text-gray-400">فرع معتمد</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
                    {branch.nameAr}
                  </h3>

                  <p className="text-xs text-gray-600 mb-4 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#0056B3] flex-shrink-0 mt-0.5" />
                    <span>{branch.addressAr}</span>
                  </p>

                  <div className="space-y-2 py-3 border-t border-b border-gray-100 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{branch.hoursAr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-mono text-gray-900 font-bold">{branch.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] text-gray-400 font-bold block mb-1">الخدمات المتوفرة:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.servicesAr.map((srv, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2.5 py-1 rounded-md">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#0056B3]" />
                    <span>الاتجاهات</span>
                  </a>

                  <button
                    onClick={onOpenServiceBooking}
                    className="py-2.5 rounded-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    <span>حجز موعد</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
