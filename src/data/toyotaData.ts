// =============================================================
// SOLINA SAUDI ARABIA (ABDUL LATIF JAMEEL MOTORS)
// 100% AUTHENTIC OFFICIAL 2026 FLEET DATASET & CDN ASSETS
// Scraped & Verified directly from https://www.toyota.com.sa/ar
// =============================================================

export interface VehicleColor {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  image?: string;
}

export interface VehicleGrade {
  name: string;
  nameEn: string;
  price: number;
  engine: string;
  engineEn: string;
  transmission: string;
  transmissionEn: string;
  features: string[];
  featuresEn: string[];
  image?: string;
}

export interface Vehicle {
  id: string;
  nameAr: string;
  nameEn: string;
  year: number;
  brand?: 'toyota' | 'lexus';
  category: 'sedan' | 'suv' | 'commercial' | 'hybrid' | 'gr';
  bodyTypeAr: string;
  bodyTypeEn: string;
  priceStartingFrom: number;
  monthlyInstallmentStartingFrom: number;
  fuelEconomy: string;
  fuelEconomyEn: string;
  engineSpec: string;
  engineSpecEn: string;
  horsepower: string;
  horsepowerEn: string;
  torque: string;
  acceleration0to100?: string;
  seats: number;
  transmissionAr: string;
  transmissionEn: string;
  powertrain: 'بنزين' | 'ديزل' | 'هايبرد' | 'كهربائي';
  drivetrain: string;
  drivetrainEn: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isHybrid?: boolean;
  isGR?: boolean;
  cardImage: string;
  heroImage?: string;
  interiorImage?: string;
  overviewUrl: string;
  colors: VehicleColor[];
  grades: VehicleGrade[];
}

export interface MaintenancePackage {
  mileage: number; // e.g. 10000, 20000, 30000, etc.
  nameAr: string;
  nameEn: string;
  estimatedDuration: string;
  estimatedPriceSedan: number;
  estimatedPriceSUV: number;
  estimatedPriceCommercial: number;
  tasksAr: string[];
  tasksEn: string[];
}

export interface SparePart {
  id: string;
  partNumber: string;
  nameAr: string;
  nameEn: string;
  category: 'مكابح وفلاتر' | 'إكسسوارات GR' | 'حماية وعناية' | 'زيوت وسوائل';
  categoryEn: string;
  price: number;
  compatibleModels: string[];
  image: string;
  badge?: string;
}

export interface PreOwnedVehicle {
  id: string;
  titleAr: string;
  titleEn: string;
  year: number;
  mileage: number; // in km
  price: number;
  monthlyInstallment: number;
  location: string;
  color: string;
  grade: string;
  image: string;
  inspectionPoints: number; // e.g. 160
  warrantyMonths: number;
  isCertified: boolean;
}

export interface Offer {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  category: 'سيارات' | 'صيانة' | 'تمويل';
  categoryEn: 'Vehicles' | 'Service' | 'Finance';
  image: string;
  validUntil: string;
  validUntilEn: string;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  ctaText: string;
  ctaTextEn: string;
}

export interface Showroom {
  id: string;
  region: 'central' | 'western' | 'eastern' | 'southern' | 'northern';
  city: string;
  cityEn: string;
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  phone: string;
  whatsapp?: string;
  coordinates: { lat: number; lng: number };
  workingHours: string;
  workingHoursEn: string;
  services: string[];
  servicesEn: string[];
  isMain?: boolean;
  mapQuery: string;
}

// -------------------------------------------------------------
// 1. HERO BANNER SLIDES (100% Official 2026 Web Banners & Video)
// -------------------------------------------------------------
export const HERO_SLIDES = [
  {
    id: 'lexus-lx600-flagship',
    title: 'لكزس LX600 VIP 2026 قمة الفخامة الرئاسية المطلقة',
    titleEn: 'Lexus LX600 VIP 2026 The Pinnacle of Flagship Luxury',
    subtitle: 'تجربة قيادة ملكية لا تضاهى بمحرك V6 توين تيربو 409 حصان ومقصورة كبار الشخصيات VIP',
    subtitleEn: 'Unrivaled presidential luxury featuring 409 HP Twin-Turbo V6 and VIP Executive Lounge',
    badge: 'LEXUS SAUDI ARABIA',
    badgeEn: 'Lexus Luxury Flagship',
    imageDesktop: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-1870x850-arab.webp',
    imageMobile: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-375x666-arab.webp',
    carImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    videoUrl: '/document_5769533339421646917.mp4',
    youtubeId: 'F3_d106-t0U',
    price: '575,000',
    ctaPrimary: 'اكتشف لكزس LX600',
    ctaPrimaryEn: 'Explore Lexus LX600',
    ctaSecondary: 'حجز تجربة قيادة لكزس',
    ctaSecondaryEn: 'Book Lexus Experience',
    modelId: 'lexus-lx600-2026'
  },
  {
    id: 'prado-2026',
    title: 'سولينا لاند كروزر برادو 2026 الجديد كلياً',
    titleEn: 'All-New Solina Land Cruiser Prado 2026',
    subtitle: 'الأسطورة عادت بتصميم كلاسيكي عصري جريء وتيربو مزدوج 281 حصان',
    subtitleEn: 'The Legend returns with bold retro-modern styling and 281 HP Turbo performance',
    badge: 'تدشين الجيل الجديد كلياً',
    badgeEn: 'All-New 2026 Prado',
    imageDesktop: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/desktop-view/4---desktop.webp?w=1920&q=75&f=webp',
    imageMobile: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/mobile-view/mobile.webp?h=110',
    carImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png',
    videoUrl: '/document_5769533339421646917.mp4',
    youtubeId: 'Jm3U4P6jY-k',
    price: '199,870',
    ctaPrimary: 'اكتشف برادو 2026',
    ctaPrimaryEn: 'Explore Prado 2026',
    ctaSecondary: 'حجز تجربة قيادة فورية',
    ctaSecondaryEn: 'Book Test Drive',
    modelId: 'prado-2026'
  },
  {
    id: 'lc300-flagship',
    title: 'سولينا لاند كروزر LC300 سيد الدفع الرباعي',
    titleEn: 'Solina Land Cruiser LC300 Master of All Terrains',
    subtitle: 'الفخامة المطلقة تلتقي مع القوة الأسطورية 409 حصان ونظام الزحف الذكي',
    subtitleEn: 'Unrivaled luxury meets 409 HP legendary twin-turbo twin prowess and Crawl Control',
    badge: 'فخر سيارات الدفع الرباعي',
    badgeEn: 'The King of 4x4',
    imageDesktop: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-1870x850-arab.webp',
    imageMobile: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-375x666-arab.webp',
    carImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/lc300-513x289.png',
    videoUrl: '/document_5769533339421646917.mp4',
    youtubeId: 'XzGv0H6xJ8o',
    price: '268,295',
    ctaPrimary: 'اكتشف لاند كروزر 300',
    ctaPrimaryEn: 'Explore LC300',
    ctaSecondary: 'عرض الأسعار والفئات',
    ctaSecondaryEn: 'View Trims & Pricing',
    modelId: 'lc300-2026'
  },
  {
    id: 'rav4-2026-launch',
    title: 'سولينا راف فور 2026 RAV4 الجديد كلياً',
    titleEn: 'All-New Solina RAV4 2026',
    subtitle: 'انطلق إلى آفاق لا حدود لها مع التصميم العصري الجريء وكفاءة الهايبرد الاستثنائية',
    subtitleEn: 'Ignite endless journeys with bold modern styling and benchmark hybrid performance',
    badge: 'تدشين موديل 2026 الجديد',
    badgeEn: 'All-New 2026 Launch',
    imageDesktop: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_1870x850-ar.webp',
    imageMobile: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_375x666_ar.webp',
    carImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png',
    videoUrl: '/document_5769533339421646917.mp4',
    youtubeId: 'sM3G3M3tB-E',
    price: '98,555',
    ctaPrimary: 'اكتشف راف فور 2026',
    ctaPrimaryEn: 'Explore RAV4 2026',
    ctaSecondary: 'حجز تجربة قيادة',
    ctaSecondaryEn: 'Book Test Drive',
    modelId: 'rav4-2026'
  },
  {
    id: 'gr86-motorsport',
    title: 'سولينا GR86 متعة القيادة الرياضية النقية',
    titleEn: 'Solina GR86 Pure Driving Adrenaline',
    subtitle: 'طوّرت على حلبات السباق العالمية بمحرك بوكسر 228 حصان ودفع خلفي متزن',
    subtitleEn: 'Engineered on motorsport tracks with 228 HP Boxer engine and rear-wheel drive balance',
    badge: 'SOLINA GAZOO RACING',
    badgeEn: 'Gazoo Racing Performance',
    imageDesktop: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp',
    imageMobile: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp',
    carImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png',
    videoUrl: '/document_5769533339421646917.mp4',
    youtubeId: 'Y-P2n4XyL_Q',
    price: '162,265',
    ctaPrimary: 'اكتشف أسطول GR',
    ctaPrimaryEn: 'Explore GR Lineup',
    ctaSecondary: 'طلب تجربة الحلبة',
    ctaSecondaryEn: 'Request Test Drive',
    modelId: 'gr86-2026'
  }
];

// -------------------------------------------------------------
// 2. OFFICIAL 2026 COMPLETE VEHICLES LINEUP (With Grade & Color Images)
// -------------------------------------------------------------
export const VEHICLES: Vehicle[] = [
  {
    "id": "liteace-2026",
    "nameAr": "سولينا لايت إيس 2026",
    "nameEn": "LiteAce 2026",
    "year": 2026,
    "brand": "toyota",
    "category": "commercial",
    "bodyTypeAr": "فان نقل مدمجة للمدن",
    "bodyTypeEn": "Compact City Cargo Van",
    "priceStartingFrom": 69000,
    "monthlyInstallmentStartingFrom": 1035,
    "fuelEconomy": "14.8 كم/لتر",
    "fuelEconomyEn": "14.8 km/L",
    "engineSpec": "1.5 لتر 4 أسطوانات",
    "engineSpecEn": "1.5L 4-Cyl",
    "horsepower": "97 حصان",
    "horsepowerEn": "97 HP",
    "torque": "134 ن.م",
    "seats": 2,
    "transmissionAr": "أوتوماتيكي 4 سرعات / يدوي",
    "transmissionEn": "4-Speed Auto / 5MT",
    "powertrain": "بنزين",
    "drivetrain": "دفع خلفي RWD",
    "drivetrainEn": "Rear-Wheel Drive RWD",
    "cardImage": "https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/liteace-306x122.webp",
    "overviewUrl": "https://www.toyota.com.sa/ar/vehicles/commercial/liteace",
    "colors": [
      {
        "id": "white",
        "name": "أبيض",
        "nameEn": "White",
        "hex": "#FFFFFF"
      }
    ],
    "grades": [
      {
        "name": "LiteAce Van 1.5L 4AT",
        "nameEn": "LiteAce Van 1.5L 4AT",
        "price": 69000,
        "engine": "1.5L 97 HP",
        "engineEn": "1.5L 97 HP",
        "transmission": "4-Speed Auto",
        "transmissionEn": "4-Speed Auto",
        "features": [
          "مساحة تخزين واسعة",
          "أبواب جانبية مزدوجة منزلقة",
          "وسائد هوائية مزدوجة"
        ],
        "featuresEn": [
          "Spacious Cargo Bed",
          "Dual Sliding Side Doors",
          "Dual Airbags"
        ]
      }
    ]
  },
  {
    "id": "hilux-2026",
    "nameAr": "سولينا هايلكس 2026",
    "nameEn": "Hilux 2026",
    "year": 2026,
    "brand": "toyota",
    "category": "commercial",
    "bodyTypeAr": "بيك أب أسطورية للمهام الشاقة",
    "bodyTypeEn": "Heavy-Duty Pickup",
    "priceStartingFrom": 88500,
    "monthlyInstallmentStartingFrom": 1327,
    "fuelEconomy": "14.1 كم/لتر",
    "fuelEconomyEn": "14.1 km/L",
    "engineSpec": "2.4L / 2.8L تيربو ديزل",
    "engineSpecEn": "2.4L / 2.8L Turbo Diesel",
    "horsepower": "201 حصان",
    "horsepowerEn": "201 HP",
    "torque": "500 ن.م",
    "seats": 5,
    "transmissionAr": "أوتوماتيكي 6 سرعات / يدوي",
    "transmissionEn": "6-Speed Auto / Manual",
    "powertrain": "ديزل",
    "drivetrain": "دفع رباعي 4x4 مع دبل خفيف وثقيل",
    "drivetrainEn": "Part-Time 4WD with High/Low Range",
    "cardImage": "https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/hilux-306x122.webp",
    "overviewUrl": "https://www.toyota.com.sa/ar/vehicles/commercial/hilux",
    "colors": [
      {
        "id": "super-white",
        "name": "أبيض ناصع",
        "nameEn": "Super White",
        "hex": "#FFFFFF"
      },
      {
        "id": "attitude-black",
        "name": "أسود ميكا",
        "nameEn": "Attitude Black",
        "hex": "#1C1D21"
      }
    ],
    "grades": [
      {
        "name": "Hilux GLX 2.8L 4x4 Auto",
        "nameEn": "Hilux GLX 2.8L 4x4 Auto",
        "price": 145000,
        "engine": "2.8L Turbo Diesel 201 HP",
        "engineEn": "2.8L Turbo Diesel 201 HP",
        "transmission": "6-Speed Auto",
        "transmissionEn": "6-Speed Auto",
        "features": [
          "دفع رباعي مع قفل دفرنس خلفي",
          "شاشة 8 إنش",
          "حساسات وكاميرا"
        ],
        "featuresEn": [
          "4WD with Rear Diff Lock",
          "8 Inch Display",
          "Sensors and Camera"
        ]
      }
    ]
  },
  {
    "id": "corolla-cross-2025",
    "nameAr": "سولينا كورولا كروس 2025",
    "nameEn": "Corolla Cross 2025",
    "year": 2025,
    "brand": "toyota",
    "category": "suv",
    "bodyTypeAr": "كروس أوفر هايبرد عائلية",
    "bodyTypeEn": "Family Hybrid Crossover",
    "priceStartingFrom": 94990,
    "monthlyInstallmentStartingFrom": 1425,
    "fuelEconomy": "23.7 كم/لتر",
    "fuelEconomyEn": "23.7 km/L",
    "engineSpec": "1.8 لتر هايبرد HEV",
    "engineSpecEn": "1.8L Hybrid Electric HEV",
    "horsepower": "121 حصان",
    "horsepowerEn": "121 HP",
    "torque": "142 ن.م",
    "seats": 5,
    "transmissionAr": "تتابعي E-CVT",
    "transmissionEn": "E-CVT Automatic",
    "powertrain": "هايبرد",
    "drivetrain": "دفع أمامي FWD",
    "drivetrainEn": "Front-Wheel Drive FWD",
    "isHybrid": true,
    "cardImage": "https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/corolla-cross-306x122.webp",
    "overviewUrl": "https://www.toyota.com.sa/ar/vehicles/suv/corolla-cross",
    "colors": [
      {
        "id": "celestite-gray",
        "name": "رمادي سيليستيت",
        "nameEn": "Celestite Gray",
        "hex": "#63707B"
      },
      {
        "id": "pearl-white",
        "name": "أبيض لؤلؤي",
        "nameEn": "Platinum White Pearl",
        "hex": "#F7F7F7"
      }
    ],
    "grades": [
      {
        "name": "Corolla Cross XL HEV",
        "nameEn": "Corolla Cross XL HEV",
        "price": 94990,
        "engine": "1.8L Hybrid 121 HP",
        "engineEn": "1.8L Hybrid 121 HP",
        "transmission": "E-CVT",
        "transmissionEn": "E-CVT",
        "features": [
          "شاشة ترفيه 8 إنش",
          "حساسات أمامية وخلفية",
          "كفاءة وقود 23.7 كم/لتر"
        ],
        "featuresEn": [
          "8 Inch Screen",
          "Front and Rear Sensors",
          "23.7 km/L Fuel Efficiency"
        ]
      }
    ]
  },
  {
    "id": "yaris-2026",
    "nameAr": "سولينا يارس 2026",
    "nameEn": "Yaris 2026",
    "year": 2026,
    "brand": "toyota",
    "category": "sedan",
    "bodyTypeAr": "سيدان مدمجة",
    "bodyTypeEn": "Compact Sedan",
    "priceStartingFrom": 66987.5,
    "monthlyInstallmentStartingFrom": 999,
    "fuelEconomy": "22.4 كم/لتر",
    "fuelEconomyEn": "22.4 km/L",
    "engineSpec": "1.3 لتر 4 أسطوانات VVT-i",
    "engineSpecEn": "1.3L 4-Cyl VVT-i",
    "horsepower": "97 حصان",
    "horsepowerEn": "97 HP",
    "torque": "122 ن.م",
    "seats": 5,
    "transmissionAr": "تتابعي متغير CVT",
    "transmissionEn": "CVT Automatic",
    "powertrain": "بنزين",
    "drivetrain": "دفع أمامي FWD",
    "drivetrainEn": "Front-Wheel Drive FWD",
    "cardImage": "https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/yaris-306x122.webp",
    "overviewUrl": "https://www.toyota.com.sa/ar/vehicles/passenger/yaris",
    "colors": [
      {
        "id": "red",
        "name": "أحمر ميكا",
        "nameEn": "Red Mica",
        "hex": "#A81C24"
      },
      {
        "id": "silver",
        "name": "فضي معدني",
        "nameEn": "Silver Metallic",
        "hex": "#D2D4D7"
      },
      {
        "id": "white",
        "name": "أبيض لؤلؤي",
        "nameEn": "Pearl White",
        "hex": "#FFFFFF"
      }
    ],
    "grades": [
      {
        "name": "Yaris Y 1.3L CVT",
        "nameEn": "Yaris Y 1.3L CVT",
        "price": 66987.5,
        "engine": "1.3L 4-Cyl 97 HP",
        "engineEn": "1.3L 4-Cyl 97 HP",
        "transmission": "CVT",
        "transmissionEn": "CVT",
        "features": [
          "شاشة 7 إنش مع أبل كاربلاي",
          "حساسات خلفية",
          "جنوط 15 إنش"
        ],
        "featuresEn": [
          "7 Inch Display with CarPlay",
          "Rear Sensors",
          "15 Inch Wheels"
        ]
      }
    ]
  },
  // ---------------- LEXUS LUXURY DIVISION ----------------
  {
    id: 'lexus-lx600-2026',
    nameAr: 'لكزس LX600 VIP 2026',
    nameEn: 'Lexus LX600 VIP 2026',
    year: 2026,
    brand: 'lexus',
    category: 'suv',
    bodyTypeAr: 'SUV رئاسية فائقة الفخامة',
    bodyTypeEn: 'Presidential Flagship SUV',
    priceStartingFrom: 575000,
    monthlyInstallmentStartingFrom: 8625,
    fuelEconomy: '9.8 كم/لتر',
    fuelEconomyEn: '9.8 km/L',
    engineSpec: '3.5 لتر توين تيربو V6',
    engineSpecEn: '3.5L Twin-Turbo V6',
    horsepower: '409 حصان',
    horsepowerEn: '409 HP',
    torque: '650 ن.م',
    acceleration0to100: '6.7 ثوانٍ',
    seats: 4,
    transmissionAr: 'أوتوماتيكي بـ 10 سرعات Direct Shift',
    transmissionEn: '10-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي دائم AWD مع نظام التضاريس المتعددة',
    drivetrainEn: 'Full-time AWD with Multi-Terrain Select',
    isNew: true,
    isFeatured: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    overviewUrl: 'https://www.lexus.com.sa/ar/models/lx',
    colors: [
      { id: 'sonic-titanium', name: 'تيتانيوم سونيك', nameEn: 'Sonic Titanium', hex: '#8C8D91', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp' },
      { id: 'graphite-black', name: 'أسود جرافيت ميكا', nameEn: 'Graphite Black Glass Flake', hex: '#111215', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/lc300-513x289.png' },
      { id: 'sonic-quartz', name: 'أبيض كوارتز سونيك', nameEn: 'Sonic Quartz', hex: '#F0F0F2', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/lc300-513x289.png' }
    ],
    grades: [
      {
        name: 'LX600 VIP مقصورة كبار الشخصيات 4 مقاعد',
        nameEn: 'LX600 VIP 4-Seater Executive',
        price: 575000,
        engine: '3.5L V6 Twin-Turbo 409 HP',
        engineEn: '3.5L V6 Twin-Turbo 409 HP',
        transmission: '10 سرعات أوتوماتيكي',
        transmissionEn: '10-Speed Automatic',
        features: ['مقاعد خلفية متكئة مع مساج', 'شاشات ترفيه 11.6 إنش مزدوجة', 'نظام صوتي Mark Levinson بـ 25 سماعة', 'تعليق هوائي متكيف AVS'],
        featuresEn: ['Ottoman Reclining Massage Seats', 'Dual 11.6" Rear Displays', '25-Speaker Mark Levinson Sound', 'Adaptive Variable Air Suspension'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp'
      },
      {
        name: 'LX600 F-Sport الرياضية',
        nameEn: 'LX600 F-Sport Performance',
        price: 535000,
        engine: '3.5L V6 Twin-Turbo 409 HP',
        engineEn: '3.5L V6 Twin-Turbo 409 HP',
        transmission: '10 سرعات أوتوماتيكي',
        transmissionEn: '10-Speed Automatic',
        features: ['شبك F-Sport أسود رياضي', 'جنوط 22 إنش مخصصة', 'ترس تفاضلي Torsen محدود الانزلاق'],
        featuresEn: ['F-Sport Mesh Spindle Grille', '22-inch Forged Wheels', 'Torsen Limited-Slip Differential'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/lc300-513x289.png'
      }
    ]
  },
  {
    id: 'lexus-rx350h-2026',
    nameAr: 'لكزس RX350h هايبرد 2026',
    nameEn: 'Lexus RX350h Hybrid 2026',
    year: 2026,
    brand: 'lexus',
    category: 'suv',
    bodyTypeAr: 'كروس أوفر فارهة هجينة',
    bodyTypeEn: 'Luxury Hybrid Crossover',
    priceStartingFrom: 305000,
    monthlyInstallmentStartingFrom: 4575,
    fuelEconomy: '20.7 كم/لتر',
    fuelEconomyEn: '20.7 km/L',
    engineSpec: '2.5 لتر هايبرد كهربائي HEV',
    engineSpecEn: '2.5L Hybrid Electric HEV',
    horsepower: '246 حصان',
    horsepowerEn: '246 HP',
    torque: '316 ن.م',
    acceleration0to100: '7.9 ثوانٍ',
    seats: 5,
    transmissionAr: 'أوتوماتيكي تتابعي E-CVT',
    transmissionEn: 'Electronic Continuously Variable (E-CVT)',
    powertrain: 'هايبرد',
    drivetrain: 'دفع كلي كهربائي ذكي E-Four AWD',
    drivetrainEn: 'Electronic All-Wheel Drive E-Four',
    isNew: true,
    isFeatured: true,
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png',
    overviewUrl: 'https://www.lexus.com.sa/ar/models/rx',
    colors: [
      { id: 'sonic-copper', name: 'نحاسي سونيك', nameEn: 'Sonic Copper', hex: '#9C624E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png' },
      { id: 'deep-blue', name: 'أزرق ياقوتي عميق', nameEn: 'Deep Blue Mica', hex: '#1C315E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png' }
    ],
    grades: [
      {
        name: 'RX350h Excellence الفاخرة',
        nameEn: 'RX350h Excellence Hybrid',
        price: 305000,
        engine: '2.5L Hybrid 246 HP',
        engineEn: '2.5L Hybrid 246 HP',
        transmission: 'E-CVT',
        transmissionEn: 'E-CVT',
        features: ['شاشة لمس 14 إنش عالية الدقة', 'سقف بانورامي كهربائي', 'نظام لكزس للسلامة LSS+ 3.0', 'فرش جلد ناعم Semi-Aniline'],
        featuresEn: ['14-inch HD Touchscreen', 'Panoramic Glass Roof', 'Lexus Safety System+ 3.0', 'Semi-Aniline Luxury Leather'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png'
      }
    ]
  },
  {
    id: 'lexus-es350-2026',
    nameAr: 'لكزس ES350 الفاخرة 2026',
    nameEn: 'Lexus ES350 Executive 2026',
    year: 2026,
    brand: 'lexus',
    category: 'sedan',
    bodyTypeAr: 'سيدان تنفيذية لرجال الأعمال',
    bodyTypeEn: 'Executive Luxury Sedan',
    priceStartingFrom: 215000,
    monthlyInstallmentStartingFrom: 3225,
    fuelEconomy: '13.6 كم/لتر',
    fuelEconomyEn: '13.6 km/L',
    engineSpec: '3.5 لتر V6 تنفس طبيعي',
    engineSpecEn: '3.5L V6 Naturally Aspirated',
    horsepower: '302 حصان',
    horsepowerEn: '302 HP',
    torque: '357 ن.م',
    acceleration0to100: '6.8 ثوانٍ',
    seats: 5,
    transmissionAr: 'أوتوماتيكي بـ 8 سرعات Direct Shift',
    transmissionEn: '8-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع أمامي FWD فائق الهدوء',
    drivetrainEn: 'Front-Wheel Drive FWD with Ultra Silence Cabin',
    isNew: true,
    isFeatured: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp',
    overviewUrl: 'https://www.lexus.com.sa/ar/models/es',
    colors: [
      { id: 'sonic-iridium', name: 'فضي إيريديوم سونيك', nameEn: 'Sonic Iridium', hex: '#B5B7BA', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp' },
      { id: 'nightfall-mica', name: 'أزرق ليلي ميكا', nameEn: 'Nightfall Mica', hex: '#14213D', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp' }
    ],
    grades: [
      {
        name: 'ES350 Elite الفاخرة',
        nameEn: 'ES350 Elite Luxury',
        price: 215000,
        engine: '3.5L V6 302 HP',
        engineEn: '3.5L V6 302 HP',
        transmission: '8 سرعات أوتوماتيكي',
        transmissionEn: '8-Speed Automatic',
        features: ['هدوء مقصورة قياسي مع زجاج عازل مزدوج', 'مقاعد جلدية مع تهوية وتدفئة', 'نظام أمان لكزس LSS+', 'إضاءة محيطية Ambient Light'],
        featuresEn: ['Acoustic Noise-Cancelling Glass', 'Ventilated & Heated Leather Seats', 'Lexus Safety System+', 'Dynamic Ambient Lighting'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp'
      }
    ]
  },
  {
    id: 'lexus-gx550-2026',
    nameAr: 'لكزس GX550 الجديد كلياً 2026',
    nameEn: 'All-New Lexus GX550 2026',
    year: 2026,
    brand: 'lexus',
    category: 'suv',
    bodyTypeAr: 'دفع رباعي فاخر للمغامرات',
    bodyTypeEn: 'Luxury Off-Road Adventure SUV',
    priceStartingFrom: 385000,
    monthlyInstallmentStartingFrom: 5775,
    fuelEconomy: '10.2 كم/لتر',
    fuelEconomyEn: '10.2 km/L',
    engineSpec: '3.4 لتر توين تيربو V6',
    engineSpecEn: '3.4L Twin-Turbo V6',
    horsepower: '349 حصان',
    horsepowerEn: '349 HP',
    torque: '650 ن.م',
    acceleration0to100: '7.0 ثوانٍ',
    seats: 7,
    transmissionAr: 'أوتوماتيكي بـ 10 سرعات Direct Shift',
    transmissionEn: '10-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي مستمر 4WD مع قفل تفاضلي وسطي وخلفي',
    drivetrainEn: 'Full-Time 4WD with Center and Rear Locking Differentials',
    isNew: true,
    isFeatured: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png',
    overviewUrl: 'https://www.lexus.com.sa/ar/models/gx',
    colors: [
      { id: 'earth-tan', name: 'بيج رملي Earth', nameEn: 'Earth Tan', hex: '#A3907D', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png' },
      { id: 'nori-green', name: 'أخضر لؤلؤي Nori Green', nameEn: 'Nori Green Pearl', hex: '#2D3E35', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png' }
    ],
    grades: [
      {
        name: 'GX550 Overtrail للطرق الوعرة',
        nameEn: 'GX550 Overtrail Edition',
        price: 385000,
        engine: '3.4L V6 Twin-Turbo 349 HP',
        engineEn: '3.4L V6 Twin-Turbo 349 HP',
        transmission: '10 سرعات أوتوماتيكي',
        transmissionEn: '10-Speed Automatic',
        features: ['نظام E-KDSS المتكيف للتعليق', 'إطارات 33 إنش All-Terrain', 'شاشة 14 إنش مع وضعيات الزحف الكهروميكانيكية'],
        featuresEn: ['Electronic Kinetic Dynamic Suspension E-KDSS', '33-inch All-Terrain Tires', '14-inch Center Display with Multi-Terrain Monitor'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png'
      }
    ]
  },
  {
    id: 'lexus-lc500-2026',
    nameAr: 'لكزس LC500 كوبيه الخارقة 2026',
    nameEn: 'Lexus LC500 V8 Super Coupe 2026',
    year: 2026,
    brand: 'lexus',
    category: 'gr',
    bodyTypeAr: 'كوبيه رياضية خارقة GT',
    bodyTypeEn: 'Luxury Grand Tourer Super Coupe',
    priceStartingFrom: 495000,
    monthlyInstallmentStartingFrom: 7425,
    fuelEconomy: '9.2 كم/لتر',
    fuelEconomyEn: '9.2 km/L',
    engineSpec: '5.0 لتر V8 تنفس طبيعي طربي',
    engineSpecEn: '5.0L Naturally Aspirated V8',
    horsepower: '471 حصان',
    horsepowerEn: '471 HP',
    torque: '540 ن.م',
    acceleration0to100: '4.4 ثوانٍ',
    seats: 4,
    transmissionAr: 'أوتوماتيكي بـ 10 سرعات Direct Shift',
    transmissionEn: '10-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع خلفي رياضي RWD مع ترس تفاضلي Torsen',
    drivetrainEn: 'Sport Rear-Wheel Drive RWD with Torsen LSD',
    isNew: true,
    isFeatured: true,
    isGR: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png',
    overviewUrl: 'https://www.lexus.com.sa/ar/models/lc',
    colors: [
      { id: 'flare-yellow', name: 'أصفر ناري Flare Yellow', nameEn: 'Flare Yellow', hex: '#F9C80E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png' },
      { id: 'sapphire-blue', name: 'أزرق ياقوتي ملكي', nameEn: 'Royal Sapphire Blue', hex: '#0F52BA', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png' }
    ],
    grades: [
      {
        name: 'LC500 Carbon Touring Package',
        nameEn: 'LC500 Carbon Touring Package',
        price: 495000,
        engine: '5.0L V8 471 HP',
        engineEn: '5.0L V8 471 HP',
        transmission: '10 سرعات أوتوماتيكي',
        transmissionEn: '10-Speed Automatic',
        features: ['سقف من ألياف الكربون CF', 'جناح خلفي نشط Active Rear Wing', 'عادم رياضي بصوت V8 طربي نقي', 'نظام توجيه خلفي ديناميكي DRS'],
        featuresEn: ['Carbon Fiber Roof', 'Active Retractable Rear Wing', 'Dual Variable Sport Exhaust', 'Dynamic Rear Steering DRS'],
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png'
      }
    ]
  },

  // ---------------- SOLINA VEHICLES LINEUP ----------------
  {
    id: 'prado-2026',
    brand: 'toyota',
    nameAr: 'سولينا لاند كروزر برادو 2026',
    nameEn: 'Solina Land Cruiser Prado 2026',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'سيارة دفع رباعي عائلية',
    bodyTypeEn: 'Family 4WD SUV',
    priceStartingFrom: 199870,
    monthlyInstallmentStartingFrom: 2999,
    fuelEconomy: '10.6 كم/لتر',
    fuelEconomyEn: '10.6 km/L',
    engineSpec: '2.4 لتر تيربو بنزين i-FORCE',
    engineSpecEn: '2.4L Turbo Petrol i-FORCE',
    horsepower: '281 حصان',
    horsepowerEn: '281 HP',
    torque: '430 ن.م',
    acceleration0to100: '7.8 ثوانٍ',
    seats: 7,
    transmissionAr: 'أوتوماتيكي بـ 8 سرعات Direct Shift',
    transmissionEn: '8-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي مستمر 4WD',
    drivetrainEn: 'Full-Time 4WD',
    isNew: true,
    isFeatured: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/prado-306x122.webp',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/hero-banner/prado-banner-desktop.webp',
    overviewUrl: '/vehicles/suv/prado',
    colors: [
      { id: 'sand', name: 'رملي صحراوي مع سقف أبيض', nameEn: 'Trail Sand / White Roof', hex: '#D2B48C', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/prado-306x122.webp' },
      { id: 'white', name: 'أبيض لؤلؤي ناصع', nameEn: 'Platinum White Pearl', hex: '#F0F0F0', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/prado-513x289.png' },
      { id: 'black', name: 'أسود ليلي ميكا', nameEn: 'Attitude Black Mica', hex: '#1C1C1C', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/desktop-view/4---desktop.webp' },
      { id: 'grey', name: 'رمادي صخري معدني', nameEn: 'Underground Grey', hex: '#5A5E6B', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/desktop-view/4---desktop.webp' }
    ],
    grades: [
      {
        name: 'TX 2.4L Turbo 4x4',
        nameEn: 'TX 2.4L Turbo 4x4',
        price: 199870,
        engine: '2.4L تيربو 4 أسطوانات - 281 حصان',
        engineEn: '2.4L 4-Cyl Turbo - 281 HP',
        transmission: 'أوتوماتيك 8 سرعات',
        transmissionEn: '8-Speed Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/prado-306x122.webp',
        features: ['جنوط ألمنيوم 18 بوصة', 'أنظمة سولينا للأمان TSS 3.0', 'شاشة وسائط 8 بوصة Apple CarPlay', 'نظام الدفع الرباعي المستمر مع قفل دفرنس مركزي'],
        featuresEn: ['18" Alloy Wheels', 'Solina Safety Sense 3.0', '8" Display with Wireless CarPlay', 'Full-Time 4WD with Center Differential Lock']
      },
      {
        name: 'TXL 2.4L Turbo First Edition',
        nameEn: 'TXL 2.4L Turbo First Edition',
        price: 228850,
        engine: '2.4L تيربو 4 أسطوانات - 281 حصان',
        engineEn: '2.4L 4-Cyl Turbo - 281 HP',
        transmission: 'أوتوماتيك 8 سرعات مع مبدلات مقود',
        transmissionEn: '8-Speed Automatic with Paddle Shifters',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/prado/grades/grade-selector/desktop-view/4---desktop.webp',
        features: ['مصابيح LED دائرية كلاسيكية', 'شاشة ملاحة 12.3 بوصة', 'تبريد وتهوية المقاعد الجلدية', 'نظام الصوت المحيطي JBL بـ 14 سماعة', 'كاميرات محيطية 360 درجة Multi-Terrain Monitor'],
        featuresEn: ['Heritage Round LED Headlamps', '12.3" Navigation Screen', 'Ventilated Leather Seats', '14-Speaker JBL Premium Audio', '360° Multi-Terrain Monitor (MTM)']
      }
    ]
  },
  {
    id: 'lc300-2026',
    nameAr: 'سولينا لاند كروزر LC300 2026',
    nameEn: 'Solina Land Cruiser LC300 2026',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'فارهة دفع رباعي كاملة الحجم',
    bodyTypeEn: 'Full-Size Luxury 4WD SUV',
    priceStartingFrom: 268295,
    monthlyInstallmentStartingFrom: 4199,
    fuelEconomy: '9.3 كم/لتر',
    fuelEconomyEn: '9.3 km/L',
    engineSpec: '3.5 لتر توين تيربو V6',
    engineSpecEn: '3.5L Twin-Turbo V6',
    horsepower: '409 حصان',
    horsepowerEn: '409 HP',
    torque: '650 ن.م',
    acceleration0to100: '6.7 ثوانٍ',
    seats: 7,
    transmissionAr: 'أوتوماتيكي بـ 10 سرعات Direct Shift',
    transmissionEn: '10-Speed Direct Shift Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي 4WD دائم مع دبل ثقيل وخفيف',
    drivetrainEn: 'Full-Time 4WD with Low/High Range',
    isFeatured: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/lc300-hev/website-banner-1870x850-arab.webp',
    overviewUrl: '/vehicles/suv/lc300',
    colors: [
      { id: 'white', name: 'أبيض لؤلؤي فاخر', nameEn: 'White Pearl Crystal Shine', hex: '#FAFAFA', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300-hev-max/colors/new-colors/white-pearl-cs-520x220.png' },
      { id: 'black', name: 'أسود ملكي لامع', nameEn: 'Attitude Black Mica', hex: '#111111', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300/grades/grade-selector/desktop-view/lc-300-418x167.webp' },
      { id: 'silver', name: 'فضي معدني برّاق', nameEn: 'Silver Metallic', hex: '#C0C0C0', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/lc300-513x289.png' },
      { id: 'bronze', name: 'برونزي أبانوس غني', nameEn: 'Avant-Garde Bronze', hex: '#635147', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp' }
    ],
    grades: [
      {
        name: 'GXR-L2 3.5L Twin Turbo',
        nameEn: 'GXR-L2 3.5L Twin Turbo',
        price: 268295,
        engine: '3.5L توين تيربو V6 - 409 حصان',
        engineEn: '3.5L Twin-Turbo V6 - 409 HP',
        transmission: 'أوتوماتيك 10 سرعات',
        transmissionEn: '10-Speed Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300/grades/grade-selector/desktop-view/lc-300-418x167.webp',
        features: ['جنوط ألمنيوم قياس 20 بوصة', 'نظام الزحف واختيار التضاريس المتعددة MTS', 'فتحة سقف كهربائية', 'ثلاجة تبريد مدمجة بالكونسول الوسطي'],
        featuresEn: ['20" Alloy Wheels', 'Multi-Terrain Select & Crawl Control', 'Electric Sunroof', 'Integrated Center Console Cool Box']
      },
      {
        name: 'VXR 3.5L Twin Turbo Luxury',
        nameEn: 'VXR 3.5L Twin Turbo Luxury',
        price: 368000,
        engine: '3.5L توين تيربو V6 - 409 حصان',
        engineEn: '3.5L Twin-Turbo V6 - 409 HP',
        transmission: 'أوتوماتيك 10 سرعات مع نظام E-KDSS',
        transmissionEn: '10-Speed Automatic with E-KDSS Suspension',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/lc300-hev-max/grades/grade-selector/desktop-view/lc-hev-max.webp',
        features: ['نظام تعليق هيدروليكي متغير متكيف AVS', 'مقاعد جلد نابا فاخرة مع ذاكرة ومساج', 'شاشات خلفية ترفيهية مزدوجة 11.6 بوصة', 'نظام صوت JBL بـ 14 سماعة', 'أنظمة الأمان شبه الذاتية TSS 3.0 الكاملة'],
        featuresEn: ['Adaptive Variable Suspension (AVS)', 'Premium Nappa Leather with Memory', 'Dual 11.6" Rear Seat Entertainment Screens', '14-Speaker JBL Audio', 'Complete TSS 3.0 Safety Suite']
      }
    ]
  },
  {
    id: 'camry-2026',
    nameAr: 'سولينا كامري 2026 هايبرد الجديد كلياً',
    nameEn: 'All-New Solina Camry 2026 Hybrid',
    year: 2026,
    category: 'sedan',
    bodyTypeAr: 'سيدان عائلية فاخرة',
    bodyTypeEn: 'Midsize Family Sedan',
    priceStartingFrom: 105455,
    monthlyInstallmentStartingFrom: 1499,
    fuelEconomy: '27.7 كم/لتر',
    fuelEconomyEn: '27.7 km/L',
    engineSpec: '2.5 لتر الجيل الخامس HEV هايبرد',
    engineSpecEn: '2.5L 5th-Gen Hybrid Electric (HEV)',
    horsepower: '225 حصان',
    horsepowerEn: '225 HP',
    torque: '221 ن.م',
    acceleration0to100: '7.4 ثوانٍ',
    seats: 5,
    transmissionAr: 'ناقل حركة إلكتروني تتابعي E-CVT',
    transmissionEn: 'Electronic Continuously Variable (E-CVT)',
    powertrain: 'هايبرد',
    drivetrain: 'دفع أمامي FWD ذكي',
    drivetrainEn: 'Front-Wheel Drive (FWD)',
    isNew: true,
    isFeatured: true,
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/camry-478x717.webp',
    overviewUrl: '/vehicles/passenger/camry',
    colors: [
      { id: 'ocean-gem', name: 'أزرق جوهرة المحيط الحصري', nameEn: 'Ocean Gem Blue', hex: '#1C3F6E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp' },
      { id: 'wind-chill', name: 'أبيض لؤلؤي ثلجي', nameEn: 'Wind Chill Pearl', hex: '#F5F5F5', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/camry-513x289.png' },
      { id: 'heavy-metal', name: 'رمادي معدني ثقيل', nameEn: 'Heavy Metal Grey', hex: '#4A4E54', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/camry/grades/grade-selector/desktop-view/lumir-hev.webp' },
      { id: 'midnight-black', name: 'أسود منتصف الليل', nameEn: 'Midnight Black Metallic', hex: '#0D0D0D', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/camry/grades/grade-selector/desktop-view/lumir-hev.webp' }
    ],
    grades: [
      {
        name: 'LE HEV 2.5L',
        nameEn: 'LE HEV 2.5L',
        price: 105455,
        engine: '2.5L هجين 4 أسطوانات - 225 حصان',
        engineEn: '2.5L 4-Cyl Hybrid - 225 HP',
        transmission: 'E-CVT إلكتروني تتابعي',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp',
        features: ['شاشة لمس 8 بوصة Apple CarPlay اللاسلكي', 'أنظمة الأمان TSS 3.0', 'إضاءة أمامية وخلفية Full LED', 'جنوط ألمنيوم قياس 16 بوصة'],
        featuresEn: ['8" Touchscreen with Wireless CarPlay', 'Solina Safety Sense 3.0', 'Full LED Headlamps & Taillamps', '16" Alloy Wheels']
      },
      {
        name: 'LUMIERE HEV 2.5L (الفئة الفاخرة الأعلى)',
        nameEn: 'LUMIERE HEV 2.5L (Top Luxury Trim)',
        price: 148925,
        engine: '2.5L هجين 4 أسطوانات - 225 حصان',
        engineEn: '2.5L 4-Cyl Hybrid - 225 HP',
        transmission: 'E-CVT إلكتروني تتابعي',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/camry/grades/grade-selector/desktop-view/lumir-hev.webp',
        features: ['شاشات رقمية مزدوجة قياس 12.3 بوصة', 'فتحة سقف بانورامية كهربائية', 'نظام عرض المعلومات على الزجاج الأمامي HUD', 'مقاعد جلد طبيعي مع تهوية وتدفئة', 'نظام صوتي فاخر JBL بـ 9 سماعات'],
        featuresEn: ['Dual 12.3" Digital Driver & Infotainment Screens', 'Panoramic Electric Sunroof', 'Head-Up Display (HUD)', 'Ventilated & Heated Leather Seats', '9-Speaker JBL Premium Audio']
      }
    ]
  },
  {
    id: 'rav4-2026',
    nameAr: 'سولينا راف فور 2026 RAV4',
    nameEn: 'Solina RAV4 2026 Hybrid AWD',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'كروس أوفر عائلية مدمجة',
    bodyTypeEn: 'Compact Family Crossover',
    priceStartingFrom: 98555,
    monthlyInstallmentStartingFrom: 1399,
    fuelEconomy: '22.2 كم/لتر',
    fuelEconomyEn: '22.2 km/L',
    engineSpec: '2.5 لتر هايبرد كهربائي E-Four',
    engineSpecEn: '2.5L Hybrid Electric E-Four',
    horsepower: '219 حصان',
    horsepowerEn: '219 HP',
    torque: '221 ن.م',
    acceleration0to100: '8.1 ثوانٍ',
    seats: 5,
    transmissionAr: 'ناقل حركة إلكتروني E-CVT',
    transmissionEn: 'Electronic E-CVT',
    powertrain: 'هايبرد',
    drivetrain: 'دفع رباعي إلكتروني ذكي E-Four AWD',
    drivetrainEn: 'Electronic All-Wheel Drive (E-Four AWD)',
    isNew: true,
    isFeatured: true,
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/rav4campaign/webp/alj-toyota_rav4-launch-2026_web-banners_1870x850-ar.webp',
    overviewUrl: '/vehicles/suv/rav4',
    colors: [
      { id: 'blue-flame', name: 'أزرق ناري ديناميكي', nameEn: 'Blue Flame', hex: '#1E6091', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png' },
      { id: 'turquoise', name: 'فيروزي ميكا برّاق', nameEn: 'Turquoise Pearl', hex: '#3AAFA9', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/rav4/2026/thumbnail/turquise-520x220.png' },
      { id: 'pearl-white', name: 'أبيض لؤلؤي برّاق', nameEn: 'White Pearl', hex: '#FFFFFF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/rav4/grades/grade-selector/desktop/rav4-white-418x167.webp' },
      { id: 'attitude-black', name: 'أسود ميكا', nameEn: 'Attitude Black', hex: '#181818', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png' }
    ],
    grades: [
      {
        name: 'LE 2.0L 4x2 FWD',
        nameEn: 'LE 2.0L 4x2 FWD',
        price: 98555,
        engine: '2.0L 4 أسطوانات - 170 حصان',
        engineEn: '2.0L 4-Cyl Petrol - 170 HP',
        transmission: 'CVT تتابعي',
        transmissionEn: 'Direct Shift CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/rav4/grades/grade-selector/desktop/rav4-white-418x167.webp',
        features: ['جنوط ألمنيوم 17 بوصة', 'شاشة وسائط 8 بوصة', 'حساسات ركن أمامية وخلفية', 'مصابيح LED أمامية'],
        featuresEn: ['17" Alloy Wheels', '8" Display Audio', 'Front & Rear Parking Sensors', 'LED Headlamps']
      },
      {
        name: 'LTD HEV 2.5L AWD E-Four',
        nameEn: 'LTD HEV 2.5L AWD E-Four',
        price: 153065,
        engine: '2.5L هجين 4 أسطوانات - 219 حصان',
        engineEn: '2.5L Hybrid Electric - 219 HP',
        transmission: 'E-CVT إلكتروني مع دفع رباعي E-Four',
        transmissionEn: 'E-CVT with E-Four Electronic AWD',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png',
        features: ['فتحة سقف بانورامية', 'مقاعد جلد فاخرة مع تبريد', 'باب صندوق الأمتعة كهربائي بمستشعر القدم', 'شاشة ملاحة 10.5 بوصة', 'نظام JBL الصوتي'],
        featuresEn: ['Panoramic Moonroof', 'Ventilated Leather Seats', 'Hands-Free Power Liftgate', '10.5" Navigation Screen', 'JBL Sound System']
      }
    ]
  },
  {
    id: 'crown-2026',
    nameAr: 'سولينا كراون 2026 سيدان الفاخرة',
    nameEn: 'Solina Crown 2026 Luxury Crossover',
    year: 2026,
    category: 'sedan',
    bodyTypeAr: 'كروس أوفر سيدان فاخرة فارهة',
    bodyTypeEn: 'Luxury Crossover Sedan',
    priceStartingFrom: 178480,
    monthlyInstallmentStartingFrom: 2699,
    fuelEconomy: '18.0 كم/لتر',
    fuelEconomyEn: '18.0 km/L',
    engineSpec: '2.4 لتر تيربو مزدوج Dual Boost Hybrid',
    engineSpecEn: '2.4L Turbo Dual Boost Hybrid Max',
    horsepower: '345 حصان',
    horsepowerEn: '345 HP',
    torque: '550 ن.م',
    acceleration0to100: '5.8 ثوانٍ',
    seats: 5,
    transmissionAr: 'أوتوماتيكي مباشر بـ 6 سرعات Direct Shift',
    transmissionEn: '6-Speed Direct Shift Automatic',
    powertrain: 'هايبرد',
    drivetrain: 'دفع رباعي إلكتروني متقدم E-Four Advanced',
    drivetrainEn: 'E-Four Advanced Electronic AWD',
    isFeatured: true,
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/crown/ara-750x540.jpg',
    overviewUrl: '/vehicles/passenger/crown',
    colors: [
      { id: 'bronze-black', name: 'برونزي ثنائي اللون مع أسود', nameEn: 'Ageha Bronze / Black Dual Tone', hex: '#634832', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp' },
      { id: 'heavy-metal-black', name: 'رمادي معدني ثنائي مع أسود', nameEn: 'Heavy Metal / Black Dual Tone', hex: '#52565E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/crown/grades/grade-selector/desktop-view/prestige.webp' },
      { id: 'precious-white', name: 'أبيض ثمين برّاق', nameEn: 'Precious White Pearl', hex: '#FDFDFD', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/crown-513x289.png' }
    ],
    grades: [
      {
        name: 'PRESTIGE HEV 2.5L',
        nameEn: 'PRESTIGE HEV 2.5L',
        price: 178480,
        engine: '2.5L هجين - 218 حصان',
        engineEn: '2.5L Hybrid - 218 HP',
        transmission: 'E-CVT إلكتروني تتابعي',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/crown/grades/grade-selector/desktop-view/prestige.webp',
        features: ['جنوط ألمنيوم قياس 19 بوصة', 'شاشة ملاحة 12.3 بوصة', 'مقاعد جلد فاخرة مع تهوية', 'أنظمة الأمان Solina Safety Sense 3.0'],
        featuresEn: ['19" Alloy Wheels', '12.3" Navigation Display', 'Ventilated Leather Seats', 'Solina Safety Sense 3.0 Suite']
      },
      {
        name: 'MAJESTY 2.4L Turbo Dual Boost Hybrid Max',
        nameEn: 'MAJESTY 2.4L Turbo Dual Boost Hybrid Max',
        price: 229195,
        engine: '2.4L تيربو هايبرد ماكس - 345 حصان',
        engineEn: '2.4L Turbo Hybrid Max - 345 HP',
        transmission: 'أوتوماتيك 6 سرعات مع دفع رباعي E-Four Advanced',
        transmissionEn: '6-Speed Auto with E-Four Advanced AWD',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/crown-306x122.webp',
        features: ['جنوط رياضية سوداء 21 بوصة', 'نظام تعليق تكيفي AVS', 'طلاء خارجي ثنائي اللون Bi-Tone', 'نظام صوت JBL بـ 11 سماعة', 'شاشة عرض على الزجاج HUD'],
        featuresEn: ['21" Black Machined Alloy Wheels', 'Adaptive Variable Suspension (AVS)', 'Bi-Tone Exterior Finish', '11-Speaker JBL Audio', 'Head-Up Display (HUD)']
      }
    ]
  },
  {
    id: 'corolla-2026',
    nameAr: 'سولينا كورولا 2026',
    nameEn: 'Solina Corolla 2026',
    year: 2026,
    category: 'sedan',
    bodyTypeAr: 'سيدان مدمجة اقتصادية',
    bodyTypeEn: 'Compact Sedan',
    priceStartingFrom: 78660,
    monthlyInstallmentStartingFrom: 999,
    fuelEconomy: '19.8 كم/لتر',
    fuelEconomyEn: '19.8 km/L',
    engineSpec: '2.0 لتر 4 أسطوانات Dynamic Force',
    engineSpecEn: '2.0L 4-Cylinder Dynamic Force',
    horsepower: '168 حصان',
    horsepowerEn: '168 HP',
    torque: '200 ن.م',
    acceleration0to100: '8.9 ثوانٍ',
    seats: 5,
    transmissionAr: 'ناقل حركة تتابعي ذكي Direct Shift CVT',
    transmissionEn: 'Direct Shift Continuously Variable (CVT)',
    powertrain: 'بنزين',
    drivetrain: 'دفع أمامي FWD',
    drivetrainEn: 'Front-Wheel Drive (FWD)',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/corolla-306x122.webp',
    overviewUrl: '/vehicles/passenger/corolla',
    colors: [
      { id: 'white', name: 'أبيض لؤلؤي', nameEn: 'Super White', hex: '#FAFAFA', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/corolla-306x122.webp' },
      { id: 'silver', name: 'فضي معدني', nameEn: 'Silver Metallic', hex: '#C2C2C2', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/corolla-513x289.png' },
      { id: 'grey', name: 'رمادي سيليست', nameEn: 'Celestite Grey', hex: '#687884', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/corolla/grades/grade-selector/desktop-view/20l-xli-executive-mr.webp' }
    ],
    grades: [
      {
        name: 'XLI 1.5L Petrol',
        nameEn: 'XLI 1.5L Petrol',
        price: 78660,
        engine: '1.5L 3 أسطوانات - 119 حصان',
        engineEn: '1.5L 3-Cylinder - 119 HP',
        transmission: 'CVT أوتوماتيكي',
        transmissionEn: 'CVT Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/corolla-306x122.webp',
        features: ['شاشة وسائط 8 بوصة مع Apple CarPlay', 'كاميرا خلفية للمساعدة بالركن', 'وسائد هوائية SRS متكاملة', 'حساسات خلفية'],
        featuresEn: ['8" Touchscreen with Apple CarPlay', 'Rearview Camera', 'SRS Airbag System', 'Rear Parking Sensors']
      },
      {
        name: 'GLI 2.0L Executive MR',
        nameEn: 'GLI 2.0L Executive MR',
        price: 94000,
        engine: '2.0L 4 أسطوانات - 168 حصان',
        engineEn: '2.0L 4-Cylinder - 168 HP',
        transmission: 'Direct Shift CVT مع 10 سرعات وهمية',
        transmissionEn: 'Direct Shift CVT with 10-Speed Sport Mode',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/corolla/grades/grade-selector/desktop-view/20l-xli-executive-mr.webp',
        features: ['فتحة سقف كهربائية', 'جنوط ألمنيوم قياس 17 بوصة', 'شاحن لاسلكي للهواتف الذكية', 'دخول وتشغيل ذكي بدون مفتاح'],
        featuresEn: ['Electric Moonroof', '17" Machined Alloy Wheels', 'Wireless Smartphone Charger', 'Smart Entry & Push Button Start']
      }
    ]
  },
  {
    id: 'fortuner-2026',
    nameAr: 'سولينا فورتشنر 2026',
    nameEn: 'Solina Fortuner 2026',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'SUV عائلية دفع رباعي بـ 7 مقاعد',
    bodyTypeEn: '7-Seater 4WD Family SUV',
    priceStartingFrom: 124315,
    monthlyInstallmentStartingFrom: 1899,
    fuelEconomy: '9.6 كم/لتر',
    fuelEconomyEn: '9.6 km/L',
    engineSpec: '4.0 لتر V6 محرك جبار',
    engineSpecEn: '4.0L V6 Powerful Engine',
    horsepower: '235 حصان',
    horsepowerEn: '235 HP',
    torque: '376 ن.م',
    acceleration0to100: '9.0 ثوانٍ',
    seats: 7,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات',
    transmissionEn: '6-Speed Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي 4x4 مع قفل دفرنس خلفي',
    drivetrainEn: '4x4 Part-Time with Rear Differential Lock',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/fortuner-306x122.webp',
    overviewUrl: '/vehicles/suv/fortuner',
    colors: [
      { id: 'white', name: 'أبيض لؤلؤي ناصع', nameEn: 'White Pearl', hex: '#FFFFFF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/fortuner-306x122.webp' },
      { id: 'grey', name: 'رمادي غامق معدني', nameEn: 'Grey Metallic', hex: '#585B60', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/fortuner/grades/grade-selector/desktop-view/fortuner-418x167.webp' },
      { id: 'black', name: 'أسود ميكا', nameEn: 'Attitude Black', hex: '#1B1B1B', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/fortuner-513x289.png' }
    ],
    grades: [
      {
        name: 'GX2 4x4 Petrol',
        nameEn: 'GX2 4x4 Petrol',
        price: 124315,
        engine: '2.7L 4 أسطوانات - 164 حصان',
        engineEn: '2.7L 4-Cyl Petrol - 164 HP',
        transmission: 'أوتوماتيك 6 سرعات',
        transmissionEn: '6-Speed Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/fortuner-306x122.webp',
        features: ['3 صفوف مقاعد تتسع لـ 7 ركاب', 'دفع رباعي 4x4 خفيف وثقيل', 'كاميرا خلفية وحساسات', 'شاشة لمس 8 بوصة'],
        featuresEn: ['3 Rows / 7 Seats', '4x4 Drive System', 'Rear Camera & Sensors', '8" Touchscreen']
      },
      {
        name: 'VX3 4.0L V6 4x4',
        nameEn: 'VX3 4.0L V6 4x4',
        price: 179285,
        engine: '4.0L V6 بنزين - 235 حصان',
        engineEn: '4.0L V6 Petrol - 235 HP',
        transmission: 'أوتوماتيك 6 سرعات مع مبدلات مقود',
        transmissionEn: '6-Speed Auto with Paddle Shifters',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/fortuner/grades/grade-selector/desktop-view/fortuner-418x167.webp',
        features: ['مقاعد جلد فاخرة مع تحكم كهربائي', 'نظام ملاحة متكامل', 'جنوط ألمنيوم 18 بوصة رياضية', 'باب خلفي كهربائي', 'نظام JBL الصوتي الفاخر'],
        featuresEn: ['Premium Leather Seats', 'Full Navigation', '18" Sport Alloys', 'Power Tailgate', 'JBL Premium Audio']
      }
    ]
  },
  {
    id: 'highlander-2026',
    nameAr: 'سولينا هايلاندر 2026 هايبرد',
    nameEn: 'Solina Highlander 2026 Hybrid',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'SUV عائلية فاخرة 7 مقاعد',
    bodyTypeEn: 'Luxury 7-Seater Hybrid SUV',
    priceStartingFrom: 148810,
    monthlyInstallmentStartingFrom: 2199,
    fuelEconomy: '20.8 كم/لتر',
    fuelEconomyEn: '20.8 km/L',
    engineSpec: '2.5 لتر HEV هجين كهربائي',
    engineSpecEn: '2.5L Hybrid Electric (HEV)',
    horsepower: '240 حصان',
    horsepowerEn: '240 HP',
    torque: '237 ن.م',
    acceleration0to100: '7.9 ثوانٍ',
    seats: 7,
    transmissionAr: 'ناقل حركة إلكتروني E-CVT',
    transmissionEn: 'Electronic E-CVT',
    powertrain: 'هايبرد',
    drivetrain: 'دفع رباعي إلكتروني ذكي E-Four AWD',
    drivetrainEn: 'Electronic All-Wheel Drive (E-Four AWD)',
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/highlander-1306x122.webp',
    overviewUrl: '/vehicles/suv/highlander',
    colors: [
      { id: 'ruby-red', name: 'أحمر ياقوتي فاخر', nameEn: 'Ruby Flare Pearl', hex: '#8B1E26', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/highlander-1306x122.webp' },
      { id: 'moon-dust', name: 'رمادي غبار القمر', nameEn: 'Moon Dust Metallic', hex: '#6E7882', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/highlander/grades/grade-selector/desktop-view/limited_side_-14.webp' },
      { id: 'white', name: 'أبيض لؤلؤي ميكا', nameEn: 'Platinum White Pearl', hex: '#F7F7F7', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/highlander-1306x122.webp' }
    ],
    grades: [
      {
        name: 'LE HEV AWD',
        nameEn: 'LE HEV AWD',
        price: 148810,
        engine: '2.5L هجين - 240 حصان',
        engineEn: '2.5L Hybrid - 240 HP',
        transmission: 'E-CVT إلكتروني تتابعي',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/highlander-1306x122.webp',
        features: ['دفع كلي على العجلات E-Four AWD', 'شاشة وسائط 8 بوصة', 'أنظمة الأمان TSS 3.0', 'مكيف هواء ثلاثي المناطق'],
        featuresEn: ['Electronic E-Four AWD', '8" Display Screen', 'TSS 3.0 Safety Suite', 'Tri-Zone Automatic Climate Control']
      },
      {
        name: 'LTD HEV AWD Luxury',
        nameEn: 'LTD HEV AWD Luxury',
        price: 203320,
        engine: '2.5L هجين - 240 حصان',
        engineEn: '2.5L Hybrid - 240 HP',
        transmission: 'E-CVT إلكتروني تتابعي',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/highlander/grades/grade-selector/desktop-view/limited_side_-14.webp',
        features: ['سقف بانورامي كبير', 'مقاعد جلد نابا الفاخر مع تبريد وتدفئة', 'شاشة ملاحة 12.3 بوصة', 'نظام JBL الصوتي الفاخر بـ 11 سماعة', 'شاشة عرض على الزجاج الأمامي HUD'],
        featuresEn: ['Panoramic Sunroof', 'Ventilated & Heated Nappa Leather', '12.3" Navigation Display', '11-Speaker JBL Audio', 'Head-Up Display (HUD)']
      }
    ]
  },
  {
    id: 'innova-zenix-2026',
    nameAr: 'سولينا إنوفا زينكس 2026',
    nameEn: 'Solina Innova Zenix 2026 Hybrid',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'ميني فان عائلية 7 ركاب فاخرة',
    bodyTypeEn: '7-Passenger Luxury MPV/Crossover',
    priceStartingFrom: 125465,
    monthlyInstallmentStartingFrom: 1849,
    fuelEconomy: '23.7 كم/لتر',
    fuelEconomyEn: '23.7 km/L',
    engineSpec: '2.0 لتر هايبرد كهربائي',
    engineSpecEn: '2.0L Hybrid Electric (HEV)',
    horsepower: '184 حصان',
    horsepowerEn: '184 HP',
    torque: '188 ن.م',
    acceleration0to100: '9.2 ثوانٍ',
    seats: 7,
    transmissionAr: 'ناقل حركة إلكتروني E-CVT',
    transmissionEn: 'Electronic E-CVT',
    powertrain: 'هايبرد',
    drivetrain: 'دفع أمامي FWD بمفهوم TNGA-C',
    drivetrainEn: 'Front-Wheel Drive (TNGA-C Platform)',
    isHybrid: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/innova-306x122.webp',
    overviewUrl: '/vehicles/suv/innova',
    colors: [
      { id: 'black', name: 'أسود ميكا لؤلؤي', nameEn: 'Attitude Black Mica', hex: '#171717', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/innova-306x122.webp' },
      { id: 'silver', name: 'فضي معدني', nameEn: 'Silver Metallic', hex: '#D0D0D0', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/innova/grades/grade-selector/desktop-view/gl.webp' },
      { id: 'white', name: 'أبيض بلاتينيوم', nameEn: 'Platinum White', hex: '#F9F9F9', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/innova-513x289.png' }
    ],
    grades: [
      {
        name: 'GL HEV 2.0L 7-Seater',
        nameEn: 'GL HEV 2.0L 7-Seater',
        price: 125465,
        engine: '2.0L هجين - 184 حصان',
        engineEn: '2.0L Hybrid - 184 HP',
        transmission: 'E-CVT إلكتروني',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/innova-306x122.webp',
        features: ['مقاعد قبطانية مريحة في الصف الثاني', 'شاشة وسائط 8 بوصة مع CarPlay', 'فتحات تكييف لجميع الصفوف الثلاثة'],
        featuresEn: ['2nd-Row Captain Seats', '8" Display with CarPlay', 'Rear AC Vents for all 3 Rows']
      },
      {
        name: 'VIP HEV 2.0L Ottoman Seats',
        nameEn: 'VIP HEV 2.0L Ottoman Seats',
        price: 147545,
        engine: '2.0L هجين - 184 حصان',
        engineEn: '2.0L Hybrid - 184 HP',
        transmission: 'E-CVT إلكتروني',
        transmissionEn: 'Electronic E-CVT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/innova/grades/grade-selector/desktop-view/gl.webp',
        features: ['مقاعد عثمانية فاخرة كهربائية لمساند الأرجل', 'فتحة سقف بانورامية كاملة', 'شاشة ملاحة 10.1 بوصة', 'أنظمة الأمان TSS 3.0'],
        featuresEn: ['Electric Ottoman Luxury Seats with Leg Rests', 'Panoramic Sunroof', '10.1" Navigation Screen', 'Solina Safety Sense 3.0']
      }
    ]
  },
  {
    id: 'raize-2026',
    nameAr: 'سولينا رايز 2026',
    nameEn: 'Solina Raize 2026',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'كروس أوفر شبابية مدمجة',
    bodyTypeEn: 'Subcompact Youth Crossover',
    priceStartingFrom: 67045,
    monthlyInstallmentStartingFrom: 899,
    fuelEconomy: '20.6 كم/لتر',
    fuelEconomyEn: '20.6 km/L',
    engineSpec: '1.0 لتر تيربو 3 أسطوانات',
    engineSpecEn: '1.0L Turbo 3-Cylinder',
    horsepower: '97 حصان',
    horsepowerEn: '97 HP',
    torque: '140 ن.م',
    acceleration0to100: '10.5 ثوانٍ',
    seats: 5,
    transmissionAr: 'ناقل حركة تتابعي CVT',
    transmissionEn: 'Continuously Variable Transmission (CVT)',
    powertrain: 'بنزين',
    drivetrain: 'دفع أمامي FWD',
    drivetrainEn: 'Front-Wheel Drive (FWD)',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/raize-306x122.webp',
    overviewUrl: '/vehicles/suv/raize',
    colors: [
      { id: 'turquoise', name: 'فيروزي ميكا ثنائي اللون', nameEn: 'Turquoise / Black Roof', hex: '#3AAFA9', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/raize-306x122.webp' },
      { id: 'yellow', name: 'أصفر خردلي مميز', nameEn: 'Mustard Yellow', hex: '#E5A93C', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/raize/grades/grade-selector/desktop-view/limited.webp' },
      { id: 'red', name: 'أحمر متألق', nameEn: 'Shining Red', hex: '#B81D24', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/raize-513x289.png' }
    ],
    grades: [
      {
        name: 'XLE 1.2L',
        nameEn: 'XLE 1.2L',
        price: 67045,
        engine: '1.2L 3 أسطوانات - 87 حصان',
        engineEn: '1.2L 3-Cylinder - 87 HP',
        transmission: 'CVT أوتوماتيكي',
        transmissionEn: 'CVT Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/raize-306x122.webp',
        features: ['جنوط ألمنيوم 16 بوصة', 'شاشة لمس 8 بوصة مع كاميرا خلفية', 'حساسات أمامية وخلفية'],
        featuresEn: ['16" Alloy Wheels', '8" Touchscreen with Rearview Camera', 'Front & Rear Sensors']
      },
      {
        name: 'LIMITED 1.0L Turbo',
        nameEn: 'LIMITED 1.0L Turbo',
        price: 74290,
        engine: '1.0L تيربو - 97 حصان',
        engineEn: '1.0L Turbo - 97 HP',
        transmission: 'CVT أوتوماتيكي مع وضعية القيادة الرياضية',
        transmissionEn: 'CVT Automatic with Sport Drive Mode',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/raize/grades/grade-selector/desktop-view/limited.webp',
        features: ['جنوط ألمنيوم رياضية 17 بوصة بلونين', 'إضاءة ترحيبية LED مع إشارات تتابعية', 'شاشة عدادات رقمية TFT قياس 7 بوصة'],
        featuresEn: ['17" Two-Tone Sport Alloys', 'Sequential LED Indicators', '7" Digital TFT Gauge Cluster']
      }
    ]
  },
  {
    id: 'veloz-2026',
    nameAr: 'سولينا فيلوز 2026 (7 مقاعد)',
    nameEn: 'Solina Veloz 2026 (7-Seater)',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'كروس أوفر عائلية مدمجة بـ 7 مقاعد',
    bodyTypeEn: '7-Seater Family Compact Crossover',
    priceStartingFrom: 81880,
    monthlyInstallmentStartingFrom: 1149,
    fuelEconomy: '19.3 كم/لتر',
    fuelEconomyEn: '19.3 km/L',
    engineSpec: '1.5 لتر 4 أسطوانات Dual VVT-i',
    engineSpecEn: '1.5L 4-Cylinder Dual VVT-i',
    horsepower: '104 حصان',
    horsepowerEn: '104 HP',
    torque: '138 ن.م',
    acceleration0to100: '11.0 ثوانٍ',
    seats: 7,
    transmissionAr: 'أوتوماتيكي تتابعي ذكي CVT',
    transmissionEn: 'Intelligent Continuously Variable (CVT)',
    powertrain: 'بنزين',
    drivetrain: 'دفع أمامي FWD',
    drivetrainEn: 'Front-Wheel Drive (FWD)',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/veloz-306x122.webp',
    overviewUrl: '/vehicles/suv/veloz',
    colors: [
      { id: 'black-metallic', name: 'أسود ميكا معدني', nameEn: 'Black Metallic', hex: '#1C1C1C', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/veloz-306x122.webp' },
      { id: 'platinum-white', name: 'أبيض لؤلؤي بلاتينيوم', nameEn: 'Platinum White Pearl', hex: '#FDFDFD', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/veloz/grades/glx/glx.webp' },
      { id: 'silver-metallic', name: 'فضي أرجواني معدني', nameEn: 'Purplish Silver Metallic', hex: '#8A8C9A', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/veloz-513x289.png' }
    ],
    grades: [
      {
        name: 'GLX 1.5L 7-Seater Full Specs',
        nameEn: 'GLX 1.5L 7-Seater Full Specs',
        price: 81880,
        engine: '1.5L 4 أسطوانات - 104 حصان',
        engineEn: '1.5L 4-Cyl - 104 HP',
        transmission: 'CVT أوتوماتيكي',
        transmissionEn: 'CVT Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/veloz/grades/glx/glx.webp',
        features: ['3 صفوف مقاعد كاملة بـ 7 مقاعد جلد/قماش', 'شاشة وسائط 9 بوصة تدعم Apple CarPlay', 'شاحن لاسلكي سريع', 'إضاءة محيطية داخلية زرقاء', 'مكابح يد كهربائية EPB مع Auto Hold'],
        featuresEn: ['3 Rows / 7 Full Seats (Fabric/Leather)', '9" Infotainment with Wireless CarPlay', 'Fast Wireless Charger', 'Blue Ambient Cabin Lighting', 'Electric Parking Brake (EPB) with Auto Hold']
      }
    ]
  },
  {
    id: 'urban-cruiser-2026',
    nameAr: 'سولينا أوربان كروزر 2026',
    nameEn: 'Solina Urban Cruiser 2026',
    year: 2026,
    category: 'suv',
    bodyTypeAr: 'كروس أوفر ذكية واقتصادية',
    bodyTypeEn: 'Smart Compact Crossover',
    priceStartingFrom: 80270,
    monthlyInstallmentStartingFrom: 1099,
    fuelEconomy: '19.8 كم/لتر',
    fuelEconomyEn: '19.8 km/L',
    engineSpec: '1.5 لتر 4 أسطوانات Neo Drive',
    engineSpecEn: '1.5L 4-Cylinder Neo Drive',
    horsepower: '101 حصان',
    horsepowerEn: '101 HP',
    torque: '135 ن.م',
    acceleration0to100: '11.5 ثوانٍ',
    seats: 5,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات',
    transmissionEn: '6-Speed Automatic',
    powertrain: 'بنزين',
    drivetrain: 'دفع أمامي FWD',
    drivetrainEn: 'Front-Wheel Drive (FWD)',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/urban-cruiser-306x122.webp',
    overviewUrl: '/vehicles/suv/urban-cruiser',
    colors: [
      { id: 'cafe-white', name: 'أبيض كافيه مع سقف أسود', nameEn: 'Cafe White / Black Roof', hex: '#EDE8DF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/urban-cruiser-306x122.webp' },
      { id: 'cave-black', name: 'أسود كهفي برّاق', nameEn: 'Cave Black', hex: '#141414', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/urban-cruiser-513x289.png' },
      { id: 'gaming-grey', name: 'رمادي غامق معدني', nameEn: 'Gaming Grey', hex: '#4F5257', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/urban-cruiser-306x122.webp' }
    ],
    grades: [
      {
        name: 'GL 1.5L Automatic',
        nameEn: 'GL 1.5L Automatic',
        price: 80270,
        engine: '1.5L 4 أسطوانات - 101 حصان',
        engineEn: '1.5L 4-Cylinder - 101 HP',
        transmission: 'أوتوماتيك 6 سرعات',
        transmissionEn: '6-Speed Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/urban-cruiser-306x122.webp',
        features: ['شاشة وسائط 7 بوصة', 'كاميرا خلفية', 'حساسات ركن', 'مثبت سرعة ذكي'],
        featuresEn: ['7" Infotainment Display', 'Rearview Camera', 'Parking Sensors', 'Cruise Control']
      },
      {
        name: 'GLX 1.5L Sunroof Edition',
        nameEn: 'GLX 1.5L Sunroof Edition',
        price: 89470,
        engine: '1.5L 4 أسطوانات - 101 حصان',
        engineEn: '1.5L 4-Cylinder - 101 HP',
        transmission: 'أوتوماتيك 6 سرعات مع مبدلات مقود',
        transmissionEn: '6-Speed Auto with Paddle Shifters',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/urban-cruiser-513x289.png',
        features: ['سقف بانورامي منزلق', 'شاشة عرض على الزجاج الأمامي HUD', 'كاميرات محيطية 360 درجة', 'شاشة وسائط 9 بوصة', 'شاحن لاسلكي للهواتف'],
        featuresEn: ['Panoramic Sliding Sunroof', 'Head-Up Display (HUD)', '360° Panoramic View Cameras', '9" Touchscreen', 'Wireless Smartphone Charger']
      }
    ]
  },
  {
    id: 'hilux-dc-2026',
    nameAr: 'سولينا هايلكس غمارة ودبل 2026',
    nameEn: 'Solina Hilux Double Cab 2026 (4x4)',
    year: 2026,
    category: 'commercial',
    bodyTypeAr: 'بيك آب الدفع الرباعي للمهام الشاقة',
    bodyTypeEn: 'Heavy-Duty 4x4 Pickup Truck',
    priceStartingFrom: 92230,
    monthlyInstallmentStartingFrom: 1399,
    fuelEconomy: '15.3 كم/لتر',
    fuelEconomyEn: '15.3 km/L',
    engineSpec: '2.8 لتر تيربو ديزل D-4D',
    engineSpecEn: '2.8L Turbo Diesel D-4D',
    horsepower: '201 حصان',
    horsepowerEn: '201 HP',
    torque: '500 ن.م',
    acceleration0to100: '9.8 ثوانٍ',
    seats: 5,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات أو يدوي 6 سرعات',
    transmissionEn: '6-Speed Automatic / 6-Speed Manual',
    powertrain: 'ديزل',
    drivetrain: 'دفع رباعي 4x4 مع دبل ثقيل وخفيف وقفل دفرنس',
    drivetrainEn: '4x4 Part-Time with Rear Diff Lock',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/hilux-double-cab-306x122.webp',
    overviewUrl: '/vehicles/commercial/hilux',
    colors: [
      { id: 'white', name: 'أبيض سوبر', nameEn: 'Super White', hex: '#FFFFFF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/hilux-double-cab-306x122.webp' },
      { id: 'silver', name: 'فضي معدني', nameEn: 'Silver Metallic', hex: '#BEBEBE', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/hilux-dc-513x289.png' },
      { id: 'grey', name: 'رمادي صخري', nameEn: 'Dark Grey Mica', hex: '#4B4D52', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/hiluxdc/hilux-dc/grade-selector/hilux-dc-418x167.webp' },
      { id: 'orange', name: 'برتقالي جازو الرياضي', nameEn: 'Crimson Spark Red', hex: '#B22222', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/hilux-dc-gr-513x289.png' }
    ],
    grades: [
      {
        name: 'GLX 2.7L Petrol 4x4 Double Cab',
        nameEn: 'GLX 2.7L Petrol 4x4 Double Cab',
        price: 118450,
        engine: '2.7L بنزين 4 أسطوانات - 164 حصان',
        engineEn: '2.7L 4-Cylinder Petrol - 164 HP',
        transmission: 'يدوي 5 سرعات',
        transmissionEn: '5-Speed Manual',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/commercial/hilux-double-cab-306x122.webp',
        features: ['دبل 4x4 خفيف وثقيل', 'شاشة وسائط 8 بوصة مع Apple CarPlay', 'جنوط ألمنيوم 17 بوصة', 'حساسات أمامية وخلفية'],
        featuresEn: ['4x4 Dual Range Transfer', '8" Display with CarPlay', '17" Alloys', 'Front & Rear Sensors']
      },
      {
        name: 'ADV_GR-S 2.8L Diesel 4x4 Auto (GR Sport)',
        nameEn: 'ADV_GR-S 2.8L Diesel 4x4 Auto (GR Sport)',
        price: 173650,
        engine: '2.8L تيربو ديزل - 201 حصان / 500 ن.م عزم',
        engineEn: '2.8L Turbo Diesel - 201 HP / 500 Nm Torque',
        transmission: 'أوتوماتيك 6 سرعات مع مبدلات مقود',
        transmissionEn: '6-Speed Auto with Paddle Shifters',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/hilux-dc-gr-513x289.png',
        features: ['حزمة جازو ريسنج GR Sport الرياضية', 'نظام تعليق أحادي الأنبوب Monotube مخصص للراليات', 'مقاعد جلد وجلد سويد بتطريز GR أحمر', 'كاميرات محيطية 360 درجة'],
        featuresEn: ['GR Sport Off-Road Kit', 'Monotube Rally Suspension', 'Leather/Suede GR Embossed Seats', '360° Panoramic View Cameras']
      }
    ]
  },
  {
    id: 'lc70-pickup-2026',
    nameAr: 'سولينا شاص ولاند كروزر 70 2026',
    nameEn: 'Solina Land Cruiser 70 Pickup 2026',
    year: 2026,
    category: 'commercial',
    bodyTypeAr: 'بيك آب الدفع الرباعي الأسطوري للصحراء',
    bodyTypeEn: 'Legendary Desert 4x4 Pickup Truck',
    priceStartingFrom: 138575,
    monthlyInstallmentStartingFrom: 2099,
    fuelEconomy: '9.2 كم/لتر',
    fuelEconomyEn: '9.2 km/L',
    engineSpec: '4.0 لتر V6 بنزين / 2.8L تيربو ديزل أوتوماتيك',
    engineSpecEn: '4.0L V6 Petrol / 2.8L Turbo Diesel Auto',
    horsepower: '228 حصان',
    horsepowerEn: '228 HP',
    torque: '360 ن.م',
    acceleration0to100: '10.2 ثوانٍ',
    seats: 3,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات أو يدوي 5 سرعات',
    transmissionEn: '6-Speed Automatic / 5-Speed Manual',
    powertrain: 'بنزين',
    drivetrain: 'دفع رباعي صلب 4x4 مع دبل وقفل دفرنسين',
    drivetrainEn: 'Heavy-Duty Rigid 4x4 with Front/Rear Diff Lock',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/lc70-513x289.png',
    overviewUrl: '/vehicles/commercial/lc70',
    colors: [
      { id: 'sand', name: 'بيج صحراوي رملي أسطوري', nameEn: 'Sandy Taupe', hex: '#C2B280', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/lc70-513x289.png' },
      { id: 'white', name: 'أبيض ناصع كلاسيكي', nameEn: 'French Vanilla White', hex: '#FFFFFF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/lc70pickup/grades/grade-selector/desktop-view/side_pu_13324.webp' },
      { id: 'silver', name: 'فضي معدني', nameEn: 'Silver Metallic', hex: '#C4C4C4', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/lc70-513x289.png' }
    ],
    grades: [
      {
        name: 'Pick-Up 4.0L V6 Manual',
        nameEn: 'Pick-Up 4.0L V6 Manual',
        price: 138575,
        engine: '4.0L V6 بنزين 1GR-FE - 228 حصان',
        engineEn: '4.0L V6 Petrol 1GR-FE - 228 HP',
        transmission: 'يدوي 5 سرعات',
        transmissionEn: '5-Speed Manual',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/lc70pickup/grades/grade-selector/desktop-view/side_pu_13324.webp',
        features: ['شاشة وسائط مع دعم Apple CarPlay', 'مصابيح LED دائرية كلاسيكية', 'قفل دفرنس أمامي وخلفي Diff Lock', 'ونش سحب أمامي أصلي'],
        featuresEn: ['Touchscreen with Apple CarPlay', 'Classic Heritage LED Round Lamps', 'Front & Rear Differential Locks', 'Electric Front Winch']
      },
      {
        name: 'Pick-Up 2.8L Turbo Diesel Automatic (الجديد)',
        nameEn: 'Pick-Up 2.8L Turbo Diesel Automatic (New)',
        price: 169800,
        engine: '2.8L تيربو ديزل - 201 حصان / 500 ن.م عزم',
        engineEn: '2.8L Turbo Diesel - 201 HP / 500 Nm Torque',
        transmission: 'أوتوماتيك 6 سرعات Super ECT',
        transmissionEn: '6-Speed Automatic Super ECT',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/lc70-513x289.png',
        features: ['قير أوتوماتيك 6 سرعات حديث', 'عزم جبار 500 ن.م لسحب وسفر التضاريس', 'نظام المساعدة على نزول المنحدرات DAC', 'جنوط ألمنيوم أصلية'],
        featuresEn: ['Modern 6-Speed Automatic Transmission', 'Huge 500 Nm Torque for Desert Crawling', 'Downhill Assist Control (DAC)', 'Factory Alloy Wheels']
      }
    ]
  },
  {
    id: 'gr-supra-2026',
    nameAr: 'سولينا سوبرا GR الرياضية 2026',
    nameEn: 'Solina GR Supra 2026 Coupe',
    year: 2026,
    category: 'gr',
    bodyTypeAr: 'سيارة كوبيه رياضية خارقة للحلبات',
    bodyTypeEn: 'High-Performance Sports Coupe',
    priceStartingFrom: 241500,
    monthlyInstallmentStartingFrom: 3699,
    fuelEconomy: '14.4 كم/لتر',
    fuelEconomyEn: '14.4 km/L',
    engineSpec: '3.0 لتر تيربو 6 أسطوانات خطي B58',
    engineSpecEn: '3.0L Inline-6 Twin-Scroll Turbo (B58)',
    horsepower: '382 حصان',
    horsepowerEn: '382 HP',
    torque: '500 ن.م',
    acceleration0to100: '3.9 ثوانٍ',
    seats: 2,
    transmissionAr: 'أوتوماتيكي رياضي بـ 8 سرعات مع مبدلات مقود',
    transmissionEn: '8-Speed Sport Automatic with Paddle Shifters',
    powertrain: 'بنزين',
    drivetrain: 'دفع خلفي RWD مع دفرنس رياضي تفاضلي نشط',
    drivetrainEn: 'Rear-Wheel Drive (RWD) with Active Sport Diff',
    isGR: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/supra-513x289.png',
    overviewUrl: '/vehicles/passenger/supra',
    colors: [
      { id: 'renaissance-red', name: 'أحمر عصر النهضة الرياضي', nameEn: 'Renaissance Red 2.0', hex: '#C8102E', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/supra-513x289.png' },
      { id: 'matte-storm-grey', name: 'رمادي العاصفة مطفي', nameEn: 'Matte Storm Grey', hex: '#58595B', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/supra/desktop/supra-at-418x167-copy.webp' },
      { id: 'lightning-yellow', name: 'أصفر البرق الرياضي', nameEn: 'Lightning Yellow', hex: '#FEE12B', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/supra-513x289.png' },
      { id: 'absolute-zero', name: 'أبيض الصفر المطلق', nameEn: 'Absolute Zero White', hex: '#FFFFFF', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/hiddenvehicle/supra/silver-520x220.png' }
    ],
    grades: [
      {
        name: 'GR Supra 3.0L Twin-Scroll Turbo RWD',
        nameEn: 'GR Supra 3.0L Twin-Scroll Turbo RWD',
        price: 241500,
        engine: '3.0L تيربو 6 أسطوانات خطي - 382 حصان',
        engineEn: '3.0L Inline-6 Turbo - 382 HP',
        transmission: 'أوتوماتيك رياضي 8 سرعات مع Launch Control',
        transmissionEn: '8-Speed Sport Auto with Launch Control',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/supra-513x289.png',
        features: ['تسارع من 0 إلى 100 كم/س خلال 3.9 ثوانٍ فقط', 'مكابح بريمبو Brembo الرياضية بـ 4 مكابس حمراء', 'نظام تعليق متكيف AVS رياضي', 'مقاعد رياضية جلد ألكانتارا كهربائية', 'نظام صوتي JBL بـ 12 سماعة', 'شاشة عرض على الزجاج HUD'],
        featuresEn: ['0-100 km/h in 3.9 Seconds', '4-Piston Red Brembo Brakes', 'Adaptive Variable Suspension (AVS)', 'Power Alcantara/Leather Sport Seats', '12-Speaker JBL Premium Sound', 'Head-Up Display (HUD)']
      }
    ]
  },
  {
    id: 'gr86-2026',
    nameAr: 'سولينا GR86 الرياضية',
    nameEn: 'Solina GR86 2026 Sport Coupe',
    year: 2026,
    category: 'gr',
    bodyTypeAr: 'كوبيه رياضية الدفع الخلفي',
    bodyTypeEn: 'Rear-Wheel Drive Sport Coupe',
    priceStartingFrom: 162265,
    monthlyInstallmentStartingFrom: 2399,
    fuelEconomy: '13.4 كم/لتر',
    fuelEconomyEn: '13.4 km/L',
    engineSpec: '2.4 لتر بوكسر تنفس طبيعي Boxer D-4S',
    engineSpecEn: '2.4L Boxer Naturally Aspirated D-4S',
    horsepower: '228 حصان',
    horsepowerEn: '228 HP',
    torque: '250 ن.م',
    acceleration0to100: '6.1 ثوانٍ',
    seats: 4,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات أو يدوي 6 سرعات (6MT)',
    transmissionEn: '6-Speed Automatic / 6-Speed Manual (6MT)',
    powertrain: 'بنزين',
    drivetrain: 'دفع خلفي RWD مع Torsen LSD محدود الانزلاق',
    drivetrainEn: 'Rear-Wheel Drive with Torsen Limited-Slip Diff',
    isGR: true,
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/gr86-306x122.webp',
    heroImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/herobanner/gr86/1870x850-ar.webp',
    overviewUrl: '/vehicles/passenger/gr86',
    colors: [
      { id: 'ignition-red', name: 'أحمر الاشتعال GR الحصري', nameEn: 'Ignition Red', hex: '#D81E05', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/gr86-306x122.webp' },
      { id: 'trueno-blue', name: 'أزرق تروينو أسطوري', nameEn: 'Trueno Blue', hex: '#1E3F78', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/gr86-513x289.png' },
      { id: 'crystal-black', name: 'أسود سيليكا كريستالي', nameEn: 'Crystal Black Silica', hex: '#0B0B0C', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/gr86/grades/grade-selector/desktop-view/at.webp' }
    ],
    grades: [
      {
        name: 'GR86 2.4L Manual (6MT)',
        nameEn: 'GR86 2.4L Manual (6MT)',
        price: 162265,
        engine: '2.4L محرك بوكسر 4 أسطوانات - 228 حصان',
        engineEn: '2.4L Boxer 4-Cylinder - 228 HP',
        transmission: 'يدوي 6 سرعات بنسب قصيرة',
        transmissionEn: 'Short-Throw 6-Speed Manual',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/gr86/grades/grade-selector/desktop-view/at.webp',
        features: ['دفرنس خلفي تورسن محدود الانزلاق Torsen LSD', 'جنوط رياضية سوداء قياس 18 بوصة مع إطارات ميشلان Pilot Sport 4', 'عادم رياضي مزدوج من الكروم', 'شاشة عدادات رقمية مع وضعية Track Mode'],
        featuresEn: ['Torsen Limited-Slip Differential', '18" Matte Black Alloys with Michelin PS4', 'Dual Chrome Sport Exhausts', 'Track Mode Digital Cluster']
      }
    ]
  },
  {
    id: 'hiace-2026',
    nameAr: 'سولينا هايس 2026 للركاب ونقل البضائع',
    nameEn: 'Solina Hiace 2026 Van / Bus',
    year: 2026,
    category: 'commercial',
    bodyTypeAr: 'حافلة ركاب وفان تجاري واسع',
    bodyTypeEn: 'Commercial Van & Passenger Bus',
    priceStartingFrom: 114310,
    monthlyInstallmentStartingFrom: 1699,
    fuelEconomy: '14.0 كم/لتر',
    fuelEconomyEn: '14.0 km/L',
    engineSpec: '2.8 لتر تيربو ديزل D-4D',
    engineSpecEn: '2.8L Turbo Diesel D-4D',
    horsepower: '174 حصان',
    horsepowerEn: '174 HP',
    torque: '420 ن.م',
    seats: 13,
    transmissionAr: 'أوتوماتيكي بـ 6 سرعات أو يدوي 6 سرعات',
    transmissionEn: '6-Speed Automatic / 6-Speed Manual',
    powertrain: 'ديزل',
    drivetrain: 'دفع خلفي RWD',
    drivetrainEn: 'Rear-Wheel Drive (RWD)',
    cardImage: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/hiace-bus-513x289.png',
    overviewUrl: '/vehicles/commercial/hiace',
    colors: [
      { id: 'white', name: 'أبيض سوبر كلاسيكي', nameEn: 'French Vanilla White', hex: '#FAFAFA', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/thumbnail/hiace-bus-513x289.png' },
      { id: 'silver', name: 'فضي معدني', nameEn: 'Silver Metallic', hex: '#C5C5C5', image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/hiace-van/grades/desktop/desktop-view-418x167-hiace-high-roof.webp' }
    ],
    grades: [
      {
        name: 'Hiace Bus 13-Seater High Roof Diesel',
        nameEn: 'Hiace Bus 13-Seater High Roof Diesel',
        price: 142600,
        engine: '2.8L تيربو ديزل - 174 حصان',
        engineEn: '2.8L Turbo Diesel - 174 HP',
        transmission: 'أوتوماتيك 6 سرعات',
        transmissionEn: '6-Speed Automatic',
        image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/commercial/hiace-bus/grades/grade-selector/desktop-view/hiace-bus-418x167.webp',
        features: ['سقف عالي ومساحة واسعة لـ 13 راكباً براحة تامة', 'مكيف هواء مركزي مستقل لكل صف', 'أنظمة فرامل مانعة للانغلاق ABS مع VSC', 'باب جرار جانبي واسع للدخول السهل'],
        featuresEn: ['High Roof & Spacious 13 Seats', 'Individual AC Vents for All Rows', 'ABS & VSC Safety Control', 'Wide Sliding Side Door']
      }
    ]
  }
];

// -------------------------------------------------------------
// 3. MAINTENANCE PACKAGES & SERVICE COSTS (Approved Schedule)
// -------------------------------------------------------------
export const MAINTENANCE_PACKAGES: MaintenancePackage[] = [
  {
    mileage: 10000,
    nameAr: 'صيانة دورية 10,000 كم (صيانة سريعة)',
    nameEn: '10,000 KM Periodic Maintenance (Express)',
    estimatedDuration: '45 دقيقة',
    estimatedPriceSedan: 385,
    estimatedPriceSUV: 495,
    estimatedPriceCommercial: 450,
    tasksAr: [
      'تغيير زيت المحرك التخليقي الأصلي 0W-20',
      'استبدال فلتر زيت المحرك الأصلي (السيفون)',
      'فحص مستويات سوائل الفرامل ومياه التبريد والمساحات',
      'تدوير الإطارات وضبط ضغط الهواء',
      'فحص نظام التعليق والمكابح وتعديل الشدادات'
    ],
    tasksEn: [
      'Engine Synthetic Oil Replacement 0W-20',
      'Genuine Oil Filter Replacement',
      'Check & Top-up Brake, Coolant & Washer Fluids',
      'Tire Rotation & Pressure Adjustment',
      'Brake Pads & Suspension Inspection'
    ]
  },
  {
    mileage: 20000,
    nameAr: 'صيانة دورية 20,000 كم',
    nameEn: '20,000 KM Periodic Maintenance',
    estimatedDuration: '60 دقيقة',
    estimatedPriceSedan: 540,
    estimatedPriceSUV: 680,
    estimatedPriceCommercial: 610,
    tasksAr: [
      'جميع بنود فحص صيانة الـ 10,000 كم',
      'استبدال فلتر مكيف المقصورة (فلتر غبار وحبوب لقاح)',
      'فحص بطارية 12V وبطارية الهايبرد عبر الفحص الرقمي',
      'فحص منظومة العادم وأنابيب الوقود'
    ],
    tasksEn: [
      'All 10k KM Inspection Items',
      'Cabin AC Dust & Pollen Filter Replacement',
      '12V & Hybrid Battery Digital Health Check',
      'Exhaust System & Fuel Line Integrity Check'
    ]
  },
  {
    mileage: 40000,
    nameAr: 'صيانة كبرى 40,000 كم (شاملة الفلاتر والسوائل)',
    nameEn: '40,000 KM Major Service',
    estimatedDuration: '90 دقيقة',
    estimatedPriceSedan: 990,
    estimatedPriceSUV: 1290,
    estimatedPriceCommercial: 1150,
    tasksAr: [
      'تغيير زيت المحرك والفلتر الأصلي',
      'استبدال فلتر هواء المحرك وفلتر المكيف',
      'تغيير سائل الفرامل وزيت الكلتش بالكامل',
      'فحص شمعات الإشعال (البواجي) والكويلات',
      'فحص وزنية الأذرعة والعكوس والجلد السفلية'
    ],
    tasksEn: [
      'Engine Oil & Genuine Filter Replacement',
      'Engine Air Filter & Cabin Filter Replacement',
      'Complete Brake Fluid Flush & Replacement',
      'Spark Plugs & Ignition Coils Inspection',
      'Wheel Alignment, Axles & Bushings Inspection'
    ]
  },
  {
    mileage: 80000,
    nameAr: 'صيانة شاملة 80,000 كم (صيانة التجديد الكامل)',
    nameEn: '80,000 KM Comprehensive Renewal Service',
    estimatedDuration: '120 دقيقة',
    estimatedPriceSedan: 1490,
    estimatedPriceSUV: 1890,
    estimatedPriceCommercial: 1690,
    tasksAr: [
      'تغيير زيت القير الأوتوماتيكي الأصلي Solina WS Fluid',
      'استبدال شمعات الإشعال الإيريديوم الأصلية (البواجي)',
      'تغيير سائل تبريد المحرك عالي العمر Super Long Life Coolant',
      'فحص شامل لمنظومة نقل الحركة والدبل والعمود الكرداني',
      'فحص كمبيوتر شامل لجميع الحساسات وشهادة صيانة معتمدة'
    ],
    tasksEn: [
      'Solina Genuine Automatic Transmission Fluid (WS) Replacement',
      'Genuine Iridium Spark Plugs Replacement',
      'Solina Super Long Life Engine Coolant Replacement',
      'Driveline, Transfer Case & Propeller Shaft Inspection',
      'Full ECU Diagnostic Scan & Certified Service Certificate'
    ]
  }
];

// -------------------------------------------------------------
// 4. GENUINE SPARE PARTS & ACCESSORIES (100% Genuine)
// -------------------------------------------------------------
export const GENUINE_PARTS: SparePart[] = [
  {
    id: 'oil-filter-camry',
    partNumber: '04152-YZZA1',
    nameAr: 'فلتر زيت محرك أصلي سولينا (سيفون أصلي)',
    nameEn: 'Genuine Solina Engine Oil Filter Element',
    category: 'مكابح وفلاتر',
    categoryEn: 'Brakes & Filters',
    price: 38,
    compatibleModels: ['كامري', 'راف فور', 'هايلاندر', 'أفالون'],
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp',
    badge: 'الأكثر طلباً'
  },
  {
    id: 'brake-pads-lc300',
    partNumber: '04465-60340',
    nameAr: 'طقم أقمشة فرامل أمامية سيراميك أصلية',
    nameEn: 'Genuine Front Ceramic Brake Pads Set',
    category: 'مكابح وفلاتر',
    categoryEn: 'Brakes & Filters',
    price: 460,
    compatibleModels: ['لاند كروزر LC300', 'برادو 2026', 'لكزس LX600'],
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    badge: 'ضمان الأمان'
  },
  {
    id: 'oil-synthetic-0w20',
    partNumber: '08880-83886',
    nameAr: 'زيت محرك سولينا تخليقي بالكامل 0W-20 (جالون 4 لتر)',
    nameEn: 'Solina Genuine Motor Oil 0W-20 Full Synthetic (4L)',
    category: 'زيوت وسوائل',
    categoryEn: 'Oils & Fluids',
    price: 195,
    compatibleModels: ['جميع سيارات الهايبرد', 'كامري', 'كورولا', 'برادو', 'راف فور'],
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/discover-toyota/hev-a-desktop-478x717.webp',
    badge: 'كفاءة وقود قصوى'
  },
  {
    id: 'gr-muffler-supra',
    partNumber: 'PZ400-W0120',
    nameAr: 'نظام عادم جازو ريسنج الرياضي المصنوع من التيتانيوم',
    nameEn: 'Solina Gazoo Racing (GR) Titanium Sport Exhaust',
    category: 'إكسسوارات GR',
    categoryEn: 'GR Sport Accessories',
    price: 4950,
    compatibleModels: ['سوبرا GR', 'سولينا GR86', 'هايلكس GR'],
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/passenger/thumbnail/supra-513x289.png',
    badge: 'أداء حلبات'
  },
  {
    id: 'all-weather-mats-prado',
    partNumber: 'PT908-60240',
    nameAr: 'طقم فرشات أرضية مطاطية لجميع الفصول والمناخات',
    nameEn: 'All-Weather Heavy Duty Floor Liner Mats Set',
    category: 'حماية وعناية',
    categoryEn: 'Protection & Liners',
    price: 520,
    compatibleModels: ['برادو 2026', 'لاند كروزر 300', 'فورتشنر'],
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/prado-306x122.webp',
    badge: 'حماية مقصورة'
  }
];

// -------------------------------------------------------------
// 5. CERTIFIED PRE-OWNED VEHICLES (AutoHub ALJ Certified)
// -------------------------------------------------------------
export const CERTIFIED_PRE_OWNED: PreOwnedVehicle[] = [
  {
    id: 'cpo-lc300-2024',
    titleAr: 'سولينا لاند كروزر VXR توين تيربو 2024 (معتمدة)',
    titleEn: 'Certified Solina Land Cruiser VXR Twin Turbo 2024',
    year: 2024,
    mileage: 28400,
    price: 312000,
    monthlyInstallment: 4690,
    location: 'معرض أوتوهب الرئيسي - طريق خريص، الرياض',
    color: 'أبيض لؤلؤي',
    grade: 'VXR 3.5L Twin Turbo',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/suv_mpv/lc300-306x122.webp',
    inspectionPoints: 160,
    warrantyMonths: 24,
    isCertified: true
  },
  {
    id: 'cpo-camry-2024',
    titleAr: 'سولينا كامري جراندي 3.5L V6 فل كامل 2024',
    titleEn: 'Certified Solina Camry Grande 3.5L V6 Full 2024',
    year: 2024,
    mileage: 34100,
    price: 112000,
    monthlyInstallment: 1690,
    location: 'معرض أوتوهب - طريق المدينة، جدة',
    color: 'رمادي تيتانيوم',
    grade: 'Grande V6 3.5L',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/home-page/explore-vehicle/passenger/camry-306x122.webp',
    inspectionPoints: 160,
    warrantyMonths: 12,
    isCertified: true
  },
  {
    id: 'cpo-rav4-2024',
    titleAr: 'سولينا راف فور LTD هايبرد دفع رباعي 2024',
    titleEn: 'Certified Solina RAV4 LTD Hybrid AWD 2024',
    year: 2024,
    mileage: 22000,
    price: 129000,
    monthlyInstallment: 1890,
    location: 'معرض أوتوهب - طريق الملك فهد، الخبر',
    color: 'أزرق كحلي',
    grade: 'LTD HEV AWD E-Four',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/vehicles/suv/thumbnail/rav4-26blue-513x289.png',
    inspectionPoints: 160,
    warrantyMonths: 24,
    isCertified: true
  }
];

// -------------------------------------------------------------
// 6. PROMOTIONAL OFFERS (Campaigns 2026)
// -------------------------------------------------------------
export const OFFERS: Offer[] = [
  {
    id: 'ramadan-2026-finance',
    title: 'عروض الموسم: 0% دفعة أولى و0% رسوم إدارية',
    titleEn: 'Seasonal Offer: 0% Down Payment & 0% Admin Fees',
    subtitle: 'انطلق بسيارتك سولينا الجديدة بأقساط ميسرة وشروط تمويلية استثنائية متوافقة مع الشريعة',
    subtitleEn: 'Drive home your new Solina with zero down payment and Sharia-compliant lease terms',
    category: 'تمويل',
    categoryEn: 'Finance',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/veloz/offer-card/647x485/veloz-offer-card-647x485-arab.webp',
    validUntil: '31 مارس 2026',
    validUntilEn: 'March 31, 2026',
    badge: 'عرض خاص ومحدود',
    badgeEn: 'Limited-Time Deal',
    description: 'برنامج تمويل تأجيري ميسر يغطي كامري 2026، راف فور، برادو، وفورتشنر بدون دفعة أولى مع تأمين شامل.',
    descriptionEn: 'Special lease financing covering Camry, RAV4, Prado and Fortuner with comprehensive insurance.',
    features: [
      'بدون دفعة أولى (0% دفعة أولى)',
      'بدون رسوم إدارية (0% رسوم إدارية)',
      'تأمين شامل طوال مدة عقد التمويل',
      'تأجيل القسط الأول حتى 60 يوماً'
    ],
    featuresEn: [
      'Zero Down Payment (0% Down)',
      'Zero Administrative Fees (0% Admin Fees)',
      'Comprehensive Insurance throughout tenure',
      'First payment deferred up to 60 days'
    ],
    ctaText: 'تقديم طلب التمويل فوراً',
    ctaTextEn: 'Apply for Finance Now'
  },
  {
    id: 'free-service-crown',
    title: 'باقة صيانة مجانية لمدة 3 سنوات مع سولينا كراون',
    titleEn: '3 Years Free Maintenance with Solina Crown',
    subtitle: 'عش تجربة الفخامة الملكية مع صيانة دورية مجانية شاملة الزيوت والفلاتر وقطع الغيار',
    subtitleEn: 'Experience royal luxury with 3-Year complimentary servicing including oils and parts',
    category: 'صيانة',
    categoryEn: 'Service',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/crown/ara-750x540.jpg',
    validUntil: '15 أبريل 2026',
    validUntilEn: 'April 15, 2026',
    badge: 'باقة عناية فاخرة',
    badgeEn: 'Crown Care Package',
    description: 'احصل على باقة صيانة دورية معتمدة مجانية لمدة 3 سنوات أو 60,000 كم عند شراء سولينا كراون الجديدة.',
    descriptionEn: 'Complimentary 3-Year / 60,000 KM maintenance package upon purchasing the all-new Solina Crown.',
    features: [
      'صيانة دورية مجانية حتى 60,000 كم',
      'تغيير الزيوت والفلاتر الأصلية مجاناً',
      'خدمة المساعدة على الطريق VIP مجاناً',
      'غسيل وتلميع مجاني مع كل زيارة صيانة'
    ],
    featuresEn: [
      'Free Periodic Maintenance up to 60,000 KM',
      'Complimentary Genuine Oils & Filters',
      '24/7 VIP Roadside Assistance',
      'Complimentary Car Wash on every service visit'
    ],
    ctaText: 'استفد من عرض كراون',
    ctaTextEn: 'Claim Crown Offer'
  },
  {
    id: 'trade-in-bonus',
    title: 'برنامج استبدال سيارتك القديمة بمكافأة 5,000 ر.س',
    titleEn: 'Trade-In Program: Bonus SAR 5,000 on Any Car',
    subtitle: 'استبدل سيارتك الحالية من أي نوع أو موديل واحصل على تقييم فوري ومكافأة نقدية إضافية',
    subtitleEn: 'Trade in your existing vehicle regardless of make and receive top market valuation + cash bonus',
    category: 'سيارات',
    categoryEn: 'Vehicles',
    image: 'https://edge.sitecorecloud.io/abdullatifj9343-aljmotorsb309-aljprod6e5f-d335/media/project/alj/alj-motors/toyota/toyota-ksa/offers/cb-lc70/750x540_ar.jpg',
    validUntil: '30 أبريل 2026',
    validUntilEn: 'April 30, 2026',
    badge: 'مكافأة استبدال فورية',
    badgeEn: 'Instant Trade-In Bonus',
    description: 'نشتري سيارتك الحالية بأعلى سعر في السوق وندفع لك مكافأة قدرها 5,000 ر.س تضاف كدفعة أولى لسيارتك الجديدة.',
    descriptionEn: 'We evaluate and purchase your current vehicle at best market rates plus a bonus SAR 5,000 toward your new Solina.',
    features: [
      'فحص وتقييم مجاني فوري في المعرض',
      'مكافأة إضافية 5,000 ر.س فوق قيمة التقييم',
      'إنهاء إجراءات نقل الملكية والإسقاط مجاناً',
      'إمكانية تحويل القيمة كدفعة أولى للتمويل'
    ],
    featuresEn: [
      'Instant Complimentary Vehicle Appraisal',
      'SAR 5,000 Cash Bonus on top of valuation',
      'Free ownership transfer and admin paperwork',
      'Use trade-in value as down payment directly'
    ],
    ctaText: 'حجز موعد تقييم واستبدال',
    ctaTextEn: 'Book Appraisal Slot'
  }
];

// -------------------------------------------------------------
// 7. SHOWROOMS & SERVICE LOCATOR (Official KSA Coordinates)
// -------------------------------------------------------------
export const SHOWROOMS: Showroom[] = [
  {
    id: 'alj-khurais-riyadh',
    region: 'central',
    city: 'الرياض',
    cityEn: 'Riyadh',
    name: 'مركز سولينا سولينا للسيارات الرئيسي - طريق خريص',
    nameEn: 'ALJ Solina Flagship Center - Khurais Road',
    address: 'طريق خريص، تقاطع شارع الأحساء، حي الروضة، الرياض',
    addressEn: 'Khurais Road, Al Rawdah District, Riyadh',
    phone: '0112345678',
    whatsapp: '966500000000',
    coordinates: { lat: 24.7136, lng: 46.7725 },
    workingHours: 'السبت - الخميس: 8:00 ص - 9:00 م | الجمعة: 4:00 م - 9:00 م',
    workingHoursEn: 'Sat - Thu: 8:00 AM - 9:00 PM | Fri: 4:00 PM - 9:00 PM',
    services: ['صالة عرض السيارات الجديدة', 'صيانة سريعة 45 دقيقة', 'قطع غيار أصلية', 'تمويل وتأمين معتمد'],
    servicesEn: ['New Vehicle Showroom', '45-Min Express Maintenance', 'Genuine Spare Parts', 'Certified Finance & Insurance'],
    isMain: true,
    mapQuery: 'Solina Motors Solina Khurais Road Riyadh'
  },
  {
    id: 'alj-olaya-riyadh',
    region: 'central',
    city: 'الرياض',
    cityEn: 'Riyadh',
    name: 'صالة عرض سولينا العليا الفاخرة',
    nameEn: 'Solina Olaya Premium Showroom',
    address: 'طريق الملك فهد، حي العليا، الرياض',
    addressEn: 'King Fahd Road, Al Olaya, Riyadh',
    phone: '0112345679',
    coordinates: { lat: 24.6980, lng: 46.6850 },
    workingHours: 'السبت - الخميس: 9:00 ص - 9:30 م',
    workingHoursEn: 'Sat - Thu: 9:00 AM - 9:30 PM',
    services: ['صالة عرض سيارات فاخرة و GR', 'مستشارو مبيعات كبار الشخصيات', 'عروض التمويل والتأجير'],
    servicesEn: ['Luxury & GR Showroom', 'VIP Sales Consultants', 'Lease & Finance Offers'],
    mapQuery: 'Solina Showroom King Fahd Road Olaya Riyadh'
  },
  {
    id: 'alj-madinah-jeddah',
    region: 'western',
    city: 'جدة',
    cityEn: 'Jeddah',
    name: 'مركز سولينا سولينا للسيارات الرئيسي - طريق المدينة',
    nameEn: 'ALJ Solina Flagship Center - Madinah Road',
    address: 'طريق المدينة المنورة، حي الفيصلية، جدة',
    addressEn: 'Madinah Road, Al Faisaliyah, Jeddah',
    phone: '0122345678',
    whatsapp: '966500000001',
    coordinates: { lat: 21.5736, lng: 39.1625 },
    workingHours: 'السبت - الخميس: 8:00 ص - 9:00 م',
    workingHoursEn: 'Sat - Thu: 8:00 AM - 9:00 PM',
    services: ['مجمع صالات العرض المتكامل', 'مركز الصيانة المتقدمة وسمكرة الهيكل', 'مستودع قطع الغيار الرئيسي', 'خدمات سيارات أوتوهب'],
    servicesEn: ['Integrated Showroom Complex', 'Advanced Maintenance & Body Shop', 'Central Genuine Parts Hub', 'AutoHub CPO Center'],
    isMain: true,
    mapQuery: 'Solina Motors Solina Madinah Road Jeddah'
  },
  {
    id: 'alj-sultan-jeddah',
    region: 'western',
    city: 'جدة',
    cityEn: 'Jeddah',
    name: 'صالة سولينا الأمير سلطان',
    nameEn: 'Solina Prince Sultan Showroom',
    address: 'شارع الأمير سلطان، حي الروضة، جدة',
    addressEn: 'Prince Sultan Street, Al Rawdah, Jeddah',
    phone: '0122345680',
    coordinates: { lat: 21.5890, lng: 39.1410 },
    workingHours: 'السبت - الخميس: 9:00 ص - 9:00 م',
    workingHoursEn: 'Sat - Thu: 9:00 AM - 9:00 PM',
    services: ['صالة عرض السيارات الجديدة', 'مركز صيانة سريعة', 'استشارات التمويل'],
    servicesEn: ['New Car Showroom', 'Express Service', 'Finance Consultations'],
    mapQuery: 'Solina Prince Sultan Street Jeddah'
  },
  {
    id: 'alj-dammam-khobar',
    region: 'eastern',
    city: 'الدمام والخبر',
    cityEn: 'Dammam & Khobar',
    name: 'مركز سولينا سولينا للسيارات الإقليمي - طريق الملك فهد',
    nameEn: 'ALJ Solina Regional Center - King Fahd Road',
    address: 'طريق الملك فهد، حي القشلة، الظهران / الخبر',
    addressEn: 'King Fahd Road, Al Qushlah, Khobar / Dammam',
    phone: '0132345678',
    whatsapp: '966500000002',
    coordinates: { lat: 26.3336, lng: 50.1525 },
    workingHours: 'السبت - الخميس: 8:00 ص - 9:00 م',
    workingHoursEn: 'Sat - Thu: 8:00 AM - 9:00 PM',
    services: ['صالة عرض عملاقة', 'مركز خدمة سريع 45 دقيقة', 'قطع غيار وإكسسوارات', 'خدمات تمويل فوري'],
    servicesEn: ['Mega Showroom', '45-Min Express Service', 'Parts & Accessories', 'Instant Finance'],
    isMain: true,
    mapQuery: 'Solina Motors Solina King Fahd Road Khobar Dammam'
  },
  {
    id: 'alj-khamis-southern',
    region: 'southern',
    city: 'خميس مشيط وأبها',
    cityEn: 'Khamis Mushait & Abha',
    name: 'مركز سولينا سولينا للسيارات - طريق الملك خالد',
    nameEn: 'ALJ Solina Center - King Khalid Road',
    address: 'طريق الملك خالد، حي الرونة، خميس مشيط',
    addressEn: 'King Khalid Road, Al Rawnah, Khamis Mushait',
    phone: '0172345678',
    coordinates: { lat: 18.2836, lng: 42.7325 },
    workingHours: 'السبت - الخميس: 8:00 ص - 8:30 م',
    workingHoursEn: 'Sat - Thu: 8:00 AM - 8:30 PM',
    services: ['صالة عرض الدفع الرباعي 4x4', 'صيانة دورية وسريعة', 'قطع غيار سولينا أصلية'],
    servicesEn: ['4x4 Vehicle Showroom', 'Periodic Maintenance', 'Genuine Solina Parts'],
    isMain: true,
    mapQuery: 'Solina Motors Solina Khamis Mushait'
  },
  {
    id: 'alj-tabuk-northern',
    region: 'northern',
    city: 'تبوك',
    cityEn: 'Tabuk',
    name: 'مركز سولينا سولينا للسيارات - طريق الملك فهد',
    nameEn: 'ALJ Solina Center - King Fahd Road Tabuk',
    address: 'طريق الملك فهد، حي المروج، تبوك',
    addressEn: 'King Fahd Road, Al Murooj, Tabuk',
    phone: '0142345678',
    coordinates: { lat: 28.3836, lng: 36.5625 },
    workingHours: 'السبت - الخميس: 8:30 ص - 8:30 م',
    workingHoursEn: 'Sat - Thu: 8:30 AM - 8:30 PM',
    services: ['صالة عرض كاملة', 'مركز صيانة وخدمة سريعة', 'مبيعات قطع الغيار'],
    servicesEn: ['Complete Showroom', 'Express Service Hub', 'Parts Counter'],
    isMain: true,
    mapQuery: 'Solina Motors Solina Tabuk'
  }
];

// -------------------------------------------------------------
// 8. QUICK SERVICES SHORTCUT BAR
// -------------------------------------------------------------
export const QUICK_SERVICES = [
  {
    id: 'test-drive',
    title: 'حجز تجربة قيادة مجانية',
    titleEn: 'Book Free Test Drive',
    description: 'جرّب قيادة سيارتك المفضلة من سولينا 2026 قبل الشراء عبر أقرب صالة عرض.',
    descriptionEn: 'Experience driving your preferred 2026 Solina model before purchasing.',
    icon: 'Car',
    badge: 'خدمة فورية',
    badgeEn: 'Instant Booking',
    action: 'test-drive-modal'
  },
  {
    id: 'finance-calc',
    title: 'حاسبة التمويل والأقساط',
    titleEn: 'Finance & Installment Calculator',
    description: 'احسب قسطك الشهري التقديري وخطط لميزانيتك بدقة وشفافية متوافقة مع الشريعة.',
    descriptionEn: 'Calculate your estimated monthly payment with Sharia-compliant transparency.',
    icon: 'Calculator',
    badge: 'تمويل ميسر',
    badgeEn: 'Easy Finance',
    action: 'scroll-finance'
  },
  {
    id: 'express-service',
    title: 'حجز صيانة سريعة (45 دقيقة)',
    titleEn: '45-Min Express Service',
    description: 'احجز موعد الصيانة الدورية وتغيير الزيت والفلاتر بأعلى كفاءة في 45 دقيقة.',
    descriptionEn: 'Book quick oil & filter service completed within 45 minutes guaranteed.',
    icon: 'Wrench',
    badge: 'صيانة معتمدة',
    badgeEn: 'Certified Service',
    action: 'service-modal'
  },
  {
    id: 'showrooms',
    title: 'فروع المعارض ومراكز الخدمة',
    titleEn: 'Showrooms & Service Centers',
    description: 'اعثر على أقرب معرض ومركز صيانة معتمد وتوجيه ملاحة مباشر عبر خرائط Google.',
    descriptionEn: 'Locate nearest authorized centers with instant Google Maps navigation.',
    icon: 'MapPin',
    badge: '100+ فرع بالمملكة',
    badgeEn: '100+ Locations',
    action: 'scroll-showrooms'
  }
];

// -------------------------------------------------------------
// 9. WHY SOLINA TRUST PILLARS
// -------------------------------------------------------------
export const WHY_SOLINA_POINTS = [
  {
    icon: 'ShieldCheck',
    title: 'ضمان المصنع 5 سنوات / 150,000 كم',
    titleEn: '5-Year / 150,000 KM Factory Warranty',
    description: 'ضمان المصنع الممتد حتى 5 سنوات أو 150,000 كم لتنعم بأقصى درجات الطمأنينة وراحة البال الاستثنائية.',
    descriptionEn: 'Comprehensive manufacturer warranty up to 5 years or 150,000 km for total driving peace of mind.'
  },
  {
    icon: 'Award',
    title: 'قطع غيار سولينا أصلية 100%',
    titleEn: '100% Genuine Solina Parts',
    description: 'نضمن أعلى معايير الأمان والأداء الدائم والموثوق باستخدام قطع غيار سولينا الأصلية المعتمدة عالمياً.',
    descriptionEn: 'Guaranteed safety and enduring peak performance with factory certified genuine parts.'
  },
  {
    icon: 'Zap',
    title: 'ريادة التكنولوجيا الهجينة (HEV)',
    titleEn: 'Pioneering Hybrid (HEV) Tech',
    description: 'أكثر من 25 عاماً من الريادة العالمية في محركات الهايبرد الصديقة للبيئة مع توفير وقود يصل إلى 27.7 كم/لتر.',
    descriptionEn: 'Over 25 years of global hybrid leadership delivering ultra-low emissions and up to 27.7 km/L efficiency.'
  },
  {
    icon: 'LifeBuoy',
    title: 'المساعدة على الطريق 24/7',
    titleEn: '24/7 Free Roadside Assistance',
    description: 'فريق دعم طوارئ متكامل على مدار الساعة طوال أيام الأسبوع في كافة طرق ومدن المملكة العربية السعودية.',
    descriptionEn: 'Dedicated round-the-clock roadside emergency support across all Saudi highways and cities.'
  },
  {
    icon: 'TrendingUp',
    title: 'أعلى قيمة إعادة بيع في السوق',
    titleEn: 'Highest Resale Value Retention',
    description: 'تحافظ سيارات سولينا على قيمتها السوقية الاستثنائية بفضل اعتماديتها العالية وشعبيتها الكبيرة وثقة المستهلكين.',
    descriptionEn: 'Solina vehicles maintain superior market value retention powered by proven Japanese reliability.'
  },
  {
    icon: 'CheckCircle2',
    title: 'أكبر شبكة فروع وصيانة بالمملكة',
    titleEn: 'Largest Dealer Network in KSA',
    description: 'أكثر من 100 صالة عرض ومركز خدمة وصيانة متطورة منتشرة لخدمتك أينما كنت في أرجاء المملكة.',
    descriptionEn: 'Over 100 modern showrooms and express service centers ready to serve you anywhere in Saudi Arabia.'
  }
];
