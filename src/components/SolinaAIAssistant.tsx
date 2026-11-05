import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  X,
  Send,
  Car,
  Tag,
  MapPin,
  Wrench,
  ArrowLeft,
  Calculator,
  Search,
  CalendarCheck,
  MessageSquare,
  RotateCcw,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  CheckCircle2,
  ShieldCheck,
  Package,
  Scale,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Vehicle } from '../data/toyotaData';
import {
  calculateMurabahaFinance,
  isValidSaudiPhone,
  normalizeDigits,
  normalizeSaudiPhone,
  sanitizeText,
  splitVatInclusive
} from '../utils/erpCore';
import { SaudiRiyalPrice } from './SaudiRiyalSymbol';

interface VehicleCardItem {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  price: number;
  monthly: number;
  powertrain: string;
  horsepower: string;
  fuelEconomy: string;
  seats: number;
  inStockCount: number;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  vehicleCards?: VehicleCardItem[];
  comparisonPair?: [VehicleCardItem, VehicleCardItem];
  actions?: {
    label: string;
    actionId?: string;
    vehicleId?: string;
    route?: string;
    tabSwitch?: AssistantMode;
    bookingSubTypeSwitch?: BookingSubType;
  }[];
}

type AssistantMode = 'chat' | 'finance' | 'tracker' | 'booking';
type BookingSubType = 'test_drive' | 'service' | 'quotation';

const CHAT_STORAGE_KEY = 'solina_ai_chat_v2';

interface SolinaAIAssistantProps {
  onSelectVehicle?: (vehicleId: string) => void;
  onOpenTestDrive?: (modelName?: string) => void;
  onOpenServiceBooking?: () => void;
  onNavigate?: (route: string) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  showFloatingTrigger?: boolean;
}

export const SolinaAIAssistant: React.FC<SolinaAIAssistantProps> = ({
  onSelectVehicle,
  onOpenTestDrive,
  onOpenServiceBooking,
  onNavigate,
  isOpenExternal,
  onCloseExternal,
  showFloatingTrigger = true
}) => {
  const { language, formatPrice } = useLanguage();
  const {
    vehicles,
    vinStock,
    cpoVehicles,
    spareParts,
    showrooms,
    jobCards,
    quotations,
    zatcaInvoices,
    settings,
    addTestDrive,
    addServiceAppointment,
    addQuotation,
    updateVinStatus
  } = useAdminData();

  const [internalOpen, setInternalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<AssistantMode>('chat');
  const [bookingSubType, setBookingSubType] = useState<BookingSubType>('test_drive');

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (isOpenExternal !== undefined && onCloseExternal && !val) {
      onCloseExternal();
    }
    setInternalOpen(val);
  };

  // Welcome message factory
  const createWelcomeMessage = (): Message => ({
    id: 'welcome',
    sender: 'bot',
    text:
      language === 'ar'
        ? `مرحباً بك في مساعد سولينا الذكي المتصل مباشرة بنظام الوكالة (${vehicles.length} طرازاً لعام 2026). يمكنك البحث، مقارنة سيارتين، حساب القسط بنظام المرابحة، تتبع الصيانة والفواتير وعروض الأسعار، أو الحجز الفوري.`
        : `Welcome to Solina Smart Concierge, live-connected to our ${vehicles.length}-model 2026 fleet, SAMA Murabaha finance calculator, side-by-side comparison, workshop tracker, and instant booking.`,
    timestamp: language === 'ar' ? 'الآن' : 'Now',
    actions: [
      { label: language === 'ar' ? 'أفضل سيارات 2026' : 'Top 2026 Models', actionId: 'top_models' },
      { label: language === 'ar' ? 'مقارنة سيارتين' : 'Compare 2 Cars', actionId: 'compare_demo' },
      { label: language === 'ar' ? 'حاسبة التمويل' : 'Finance Calc', tabSwitch: 'finance' },
      { label: language === 'ar' ? 'حجز / عرض سعر' : 'Book / Quote', tabSwitch: 'booking' }
    ]
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [createWelcomeMessage()];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist chat history in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-25)));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  // Instant Finance Calculator State
  const [selectedFinanceVehicleId, setSelectedFinanceVehicleId] = useState<string>(
    () => vehicles[0]?.id || 'camry-2026'
  );
  const [downPaymentPct, setDownPaymentPct] = useState<number>(settings.minDownPaymentPercent || 10);
  const [tenureMonths, setTenureMonths] = useState<number>(60);

  // Live Status Tracker State
  const [trackerQuery, setTrackerQuery] = useState('');

  // Quick In-Chat Multi-Booking State (Test Drive / Service / Official Quotation + VIN Reservation)
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingVehicleId, setBookingVehicleId] = useState<string>(() => vehicles[0]?.id || 'camry-2026');
  const [bookingBranch, setBookingBranch] = useState<string>(() => showrooms[0]?.name || 'مركز خريص الرئيسي — الرياض');
  const [bookingPlate, setBookingPlate] = useState('س ل ن 2026');
  const [bookingMileage, setBookingMileage] = useState<number>(10000);
  const [bookingFinanceType, setBookingFinanceType] = useState<'cash' | 'lease'>('lease');
  const [reserveVinChecked, setReserveVinChecked] = useState(true);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && mode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, mode]);

  // Helper to convert Vehicle into compact card with live VIN count & SAMA installment
  const toVehicleCard = (v: Vehicle): VehicleCardItem => {
    const inStockCount = vinStock.filter(
      item =>
        item.status === 'in_stock' &&
        (item.model.includes(v.nameAr) || v.nameAr.includes(item.model) || item.model.toLowerCase().includes(v.nameEn.toLowerCase()))
    ).length;

    const murabaha = calculateMurabahaFinance({
      vehiclePriceInclVat: v.priceStartingFrom,
      downPaymentPercent: settings.minDownPaymentPercent || 10,
      balloonPercent: settings.defaultBalloonPercent || 25,
      annualProfitRatePercent: settings.defaultAprPercent || 3.99,
      tenureMonths: 60,
      adminFeePercent: settings.adminFeePercent || 1
    });

    return {
      id: v.id,
      nameAr: v.nameAr,
      nameEn: v.nameEn,
      image: v.cardImage,
      price: v.priceStartingFrom,
      monthly: Math.round(murabaha.monthlyInstallment),
      powertrain: v.powertrain,
      horsepower: language === 'ar' ? v.horsepower : v.horsepowerEn,
      fuelEconomy: language === 'ar' ? v.fuelEconomy : v.fuelEconomyEn,
      seats: v.seats,
      inStockCount
    };
  };

  // Intelligent Natural Language Query Matcher against Live ERP Data
  const buildSmartResponse = (rawQuery: string): Omit<Message, 'id' | 'sender' | 'timestamp'> => {
    const normalized = normalizeDigits(rawQuery).trim();
    const lower = normalized.toLowerCase();

    // 0. Side-by-Side Vehicle Comparison Query (e.g. "قارن بين كامري وأزيرا" or "الفرق بين لاند كروزر ولكزس")
    if (
      lower.includes('قارن') ||
      lower.includes('مقارن') ||
      lower.includes('الفرق بين') ||
      lower.includes('أيهما') ||
      lower.includes('compare') ||
      lower.includes(' vs ')
    ) {
      const matched = vehicles.filter(v => {
        const nameArTokens = v.nameAr.toLowerCase().split(/\s+/);
        const nameEnTokens = v.nameEn.toLowerCase().split(/\s+/);
        return (
          lower.includes(v.nameAr.toLowerCase()) ||
          lower.includes(v.nameEn.toLowerCase()) ||
          nameArTokens.some(tok => tok.length >= 3 && tok !== 'سولينا' && lower.includes(tok)) ||
          nameEnTokens.some(tok => tok.length >= 3 && tok !== 'solina' && lower.includes(tok))
        );
      });

      const carA = matched[0] || vehicles.find(v => v.id === 'camry-2026') || vehicles[0];
      const carB =
        matched[1] ||
        vehicles.find(v => v.id !== carA.id && v.category === carA.category) ||
        vehicles[1] ||
        vehicles[0];

      return {
        text:
          language === 'ar'
            ? `مقارنة فورية بين ${carA.nameAr} و ${carB.nameAr} (شامل الضريبة 15%):`
            : `Side-by-side comparison between ${carA.nameEn} and ${carB.nameEn}:`,
        comparisonPair: [toVehicleCard(carA), toVehicleCard(carB)],
        actions: [
          {
            label: language === 'ar' ? 'إصدار عرض سعر رسمي' : 'Official Quote',
            tabSwitch: 'booking',
            bookingSubTypeSwitch: 'quotation'
          },
          { label: language === 'ar' ? 'حاسبة التمويل' : 'Finance Calc', tabSwitch: 'finance' }
        ]
      };
    }

    // 1. Check if user is asking for budget filter (e.g. "تحت 150000" or "بحدود 120 الف" or "أرخص")
    const numMatch = lower.match(/(\d{2,6})/);
    if (
      lower.includes('ارخص') ||
      lower.includes('أرخص') ||
      lower.includes('اقتصادي') ||
      lower.includes('تحت') ||
      lower.includes('ميزاني') ||
      lower.includes('حدود') ||
      lower.includes('budget') ||
      lower.includes('cheap')
    ) {
      let maxBudget = 135000;
      if (numMatch) {
        const parsed = parseInt(numMatch[1], 10);
        maxBudget = parsed < 1000 ? parsed * 1000 : parsed;
      }
      const affordable = [...vehicles]
        .filter(v => v.priceStartingFrom <= maxBudget)
        .sort((a, b) => a.priceStartingFrom - b.priceStartingFrom)
        .slice(0, 3);

      const list = affordable.length > 0 ? affordable : [...vehicles].sort((a, b) => a.priceStartingFrom - b.priceStartingFrom).slice(0, 3);
      return {
        text:
          language === 'ar'
            ? `إليك أفضل الخيارات المتاحة في صالات سولينا ضمن ميزانية ${formatPrice(maxBudget)} ريال (شامل الضريبة 15%):`
            : `Here are the top Solina models within ${formatPrice(maxBudget)} SAR (incl. 15% VAT):`,
        vehicleCards: list.map(toVehicleCard),
        actions: [
          { label: language === 'ar' ? 'حساب التمويل بالتفصيل' : 'Calculate Finance', tabSwitch: 'finance' },
          { label: language === 'ar' ? 'إصدار عرض سعر' : 'Get Quotation', tabSwitch: 'booking', bookingSubTypeSwitch: 'quotation' }
        ]
      };
    }

    // 2. Direct match on any specific vehicle in the live 57-model fleet
    const matchedVehicles = vehicles.filter(v => {
      const nameArTokens = v.nameAr.toLowerCase().split(/\s+/);
      const nameEnTokens = v.nameEn.toLowerCase().split(/\s+/);
      return (
        lower.includes(v.nameAr.toLowerCase()) ||
        lower.includes(v.nameEn.toLowerCase()) ||
        (v.brand && lower.includes(v.brand.toLowerCase())) ||
        nameArTokens.some(tok => tok.length >= 3 && tok !== 'سولينا' && lower.includes(tok)) ||
        nameEnTokens.some(tok => tok.length >= 3 && tok !== 'solina' && lower.includes(tok))
      );
    });

    if (matchedVehicles.length > 0) {
      const topMatches = matchedVehicles.slice(0, 3);
      const first = topMatches[0];
      return {
        text:
          topMatches.length === 1
            ? language === 'ar'
              ? `${first.nameAr} (${first.year}) — ${first.engineSpec} بقوة ${first.horsepower} وكفاءة وقود ${first.fuelEconomy}. السعر يبدأ من ${formatPrice(first.priceStartingFrom)} ريال شامل الضريبة:`
              : `${first.nameEn} (${first.year}) — ${first.engineSpecEn}, ${first.horsepowerEn}, starting at ${formatPrice(first.priceStartingFrom)} SAR incl. VAT:`
            : language === 'ar'
              ? `تم العثور على ${matchedVehicles.length} طرازات مطابقة في أسطول سولينا 2026:`
              : `Found ${matchedVehicles.length} matching models in Solina 2026 fleet:`,
        vehicleCards: topMatches.map(toVehicleCard),
        actions: [
          {
            label: language === 'ar' ? 'محاكاة القسط الشهري' : 'Finance Breakdown',
            tabSwitch: 'finance'
          },
          {
            label: language === 'ar' ? 'عرض سعر / حجز شاسيه' : 'Quote & Reserve VIN',
            tabSwitch: 'booking',
            bookingSubTypeSwitch: 'quotation'
          }
        ]
      };
    }

    // 3. Electric / Hybrid / SUV / Luxury filter queries
    if (
      lower.includes('كهرب') ||
      lower.includes('هايبرد') ||
      lower.includes('هجين') ||
      lower.includes('hybrid') ||
      lower.includes('ev') ||
      lower.includes('عائلي') ||
      lower.includes('دفع رباعي') ||
      lower.includes('suv') ||
      lower.includes('فاخر') ||
      lower.includes('جيتور') ||
      lower.includes('بي واي دي')
    ) {
      const filtered = vehicles
        .filter(v => {
          if (lower.includes('كهرب') || lower.includes('ev')) return v.powertrain === 'كهربائي';
          if (lower.includes('هايبرد') || lower.includes('هجين') || lower.includes('hybrid')) return v.isHybrid || v.powertrain === 'هايبرد';
          if (lower.includes('عائلي') || lower.includes('دفع رباعي') || lower.includes('suv')) return v.category === 'suv';
          return v.isFeatured;
        })
        .slice(0, 3);

      return {
        text:
          language === 'ar'
            ? 'إليك أبرز الطرازات المرشحة لك من أسطول سولينا 2026 مع توفر المخزون والأقساط الشهرية:'
            : 'Here are the top recommended 2026 models with live stock & monthly installments:',
        vehicleCards: (filtered.length > 0 ? filtered : vehicles.slice(0, 3)).map(toVehicleCard),
        actions: [
          { label: language === 'ar' ? 'حاسبة التمويل' : 'Finance Calculator', tabSwitch: 'finance' },
          { label: language === 'ar' ? 'حجز تجربة قيادة' : 'Book Test Drive', tabSwitch: 'booking', bookingSubTypeSwitch: 'test_drive' }
        ]
      };
    }

    // 4. Certified Pre-Owned (CPO / مستعمل)
    if (lower.includes('مستعمل') || lower.includes('معتمد') || lower.includes('cpo') || lower.includes('used')) {
      const topCpo = cpoVehicles.slice(0, 2);
      const summary = topCpo
        .map(c => `• ${c.titleAr} (${c.year}) — الممشى ${formatPrice(c.mileage)} كم — ${formatPrice(c.price)} ريال`)
        .join('\n');
      return {
        text:
          language === 'ar'
            ? `لدينا ${cpoVehicles.length} سيارات مستعملة معتمدة بفحص 170 نقطة وضمان سولينا:\n${summary}`
            : `We have ${cpoVehicles.length} Certified Pre-Owned vehicles with 170-point inspection:\n${summary}`,
        actions: [
          { label: language === 'ar' ? 'طلب عرض سعر' : 'Request Quote', tabSwitch: 'booking', bookingSubTypeSwitch: 'quotation' }
        ]
      };
    }

    // 5. Genuine Spare Parts (قطع غيار / فلاتر / فرامل)
    if (lower.includes('قطع') || lower.includes('غيار') || lower.includes('فلتر') || lower.includes('فرامل') || lower.includes('بطاري') || lower.includes('part')) {
      const topParts = spareParts.slice(0, 3);
      const summary = topParts
        .map(p => `• ${p.nameAr} (${p.partNumber}): ${formatPrice(p.price)} ريال`)
        .join('\n');
      return {
        text:
          language === 'ar'
            ? `قطع غيار سولينا الأصلية المتوفرة بالمستودع المركزي (شامل الضريبة):\n${summary}`
            : `Genuine OEM Parts available in central warehouse:\n${summary}`,
        actions: [
          { label: language === 'ar' ? 'حجز صيانة وتركيب' : 'Book Service', tabSwitch: 'booking', bookingSubTypeSwitch: 'service' }
        ]
      };
    }

    // 6. Financing / Installments (تمويل / قسط / مرابحة)
    if (lower.includes('سعر') || lower.includes('قسط') || lower.includes('تمويل') || lower.includes('مرابح') || lower.includes('بنك') || lower.includes('price') || lower.includes('finance')) {
      const partnersList = settings.bankPartners.map(b => `${b.nameAr} (${b.aprPercent}%)`).join('، ');
      return {
        text:
          language === 'ar'
            ? `تمويل سولينا الإسلامي المتوافق مع ضوابط البنك المركزي (SAMA): هامش ربح يبدأ من ${settings.defaultAprPercent}%، دفعة أولى من ${settings.minDownPaymentPercent}%، عبر شركائنا: ${partnersList}.`
            : `SAMA-compliant Murabaha financing starting from ${settings.defaultAprPercent}% annual margin and ${settings.minDownPaymentPercent}% down payment.`,
        actions: [
          { label: language === 'ar' ? 'فتح حاسبة التمويل الذكية' : 'Open Finance Calculator', tabSwitch: 'finance' },
          { label: language === 'ar' ? 'إصدار عرض سعر تمويلي' : 'Issue Lease Quote', tabSwitch: 'booking', bookingSubTypeSwitch: 'quotation' }
        ]
      };
    }

    // 7. Workshop / Maintenance / Tracking
    if (lower.includes('صيان') || lower.includes('ورشة') || lower.includes('تتبع') || lower.includes('كرت') || lower.includes('فاتور') || lower.includes('service')) {
      return {
        text:
          language === 'ar'
            ? `مراكز صيانة سولينا السريعة (${settings.expressServiceMinutes} دقيقة) تعمل حالياً وبها ${jobCards.length} أوامر عمل نشطة. يمكنك تتبع حالة سيارتك أو فاتورتك أو حجز صيانة فورية.`
            : `Solina ${settings.expressServiceMinutes}-min express service bays have ${jobCards.length} active job cards. Track your vehicle or book an appointment below.`,
        actions: [
          { label: language === 'ar' ? 'تتبع حالة صيانة / فاتورة' : 'Track Job / Invoice', tabSwitch: 'tracker' },
          { label: language === 'ar' ? 'حجز موعد صيانة فوري' : 'Instant Service Booking', tabSwitch: 'booking', bookingSubTypeSwitch: 'service' }
        ]
      };
    }

    // 8. Showrooms / Branches
    if (lower.includes('فرع') || lower.includes('فروع') || lower.includes('موقع') || lower.includes('معرض') || lower.includes('الرياض') || lower.includes('جدة') || lower.includes('branch')) {
      const branchSummary = showrooms
        .slice(0, 3)
        .map(s => `• ${s.name} (${s.city}) — ${s.workingHours}`)
        .join('\n');
      return {
        text:
          language === 'ar'
            ? `تضم شبكة سولينا ${showrooms.length} مراكز رئيسية متكاملة (مبيعات، صيانة سريعة، قطع غيار) والرقم الموحد ${settings.unifiedPhone}:\n${branchSummary}`
            : `Solina operates ${showrooms.length} flagship centers across KSA (Unified Tel: ${settings.unifiedPhone}):\n${branchSummary}`,
        actions: [
          { label: language === 'ar' ? 'خريطة الفروع الكاملة' : 'All Showrooms', route: 'showrooms' }
        ]
      };
    }

    // Default showcase of top 3 flagship models
    const featured = vehicles.filter(v => v.isFeatured).slice(0, 3);
    return {
      text:
        language === 'ar'
          ? 'إليك أبرز طرازات سولينا لعام 2026 المتوفرة للتسليم الفوري مع خيارات التمويل:'
          : 'Here are our flagship 2026 Solina models ready for immediate delivery:',
      vehicleCards: (featured.length > 0 ? featured : vehicles.slice(0, 3)).map(toVehicleCard),
      actions: [
        { label: language === 'ar' ? 'مقارنة سيارتين' : 'Compare 2 Cars', actionId: 'compare_demo' },
        { label: language === 'ar' ? 'حاسبة التمويل' : 'Finance Calc', tabSwitch: 'finance' },
        { label: language === 'ar' ? 'حجز / عرض سعر' : 'Quick Booking', tabSwitch: 'booking' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputMessage).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = buildSmartResponse(query);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...reply
      };
      setMessages(prev => [...prev, botMsg]);
    }, 250);
  };

  // Voice Input via Web Speech API
  const handleToggleVoice = () => {
    const SpeechRecognitionCtor =
      (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      handleSendMessage(language === 'ar' ? 'قارن بين كامري وأزيرا' : 'Compare Camry and Azera');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionCtor() as {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        onresult: (event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void;
        onerror: () => void;
        onend: () => void;
        start: () => void;
      };
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        setIsListening(false);
        if (transcript.trim()) {
          handleSendMessage(transcript.trim());
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Live Finance Calculation Memo
  const selectedFinanceVehicle = useMemo(
    () => vehicles.find(v => v.id === selectedFinanceVehicleId) || vehicles[0],
    [vehicles, selectedFinanceVehicleId]
  );

  const financeResult = useMemo(() => {
    const price = selectedFinanceVehicle?.priceStartingFrom || 115000;
    const murabaha = calculateMurabahaFinance({
      vehiclePriceInclVat: price,
      downPaymentPercent: downPaymentPct,
      balloonPercent: settings.defaultBalloonPercent || 25,
      annualProfitRatePercent: settings.defaultAprPercent || 3.99,
      tenureMonths,
      adminFeePercent: settings.adminFeePercent || 1
    });
    return {
      price,
      downAmount: Math.round(murabaha.downPaymentAmount),
      balloonAmount: Math.round(murabaha.balloonPaymentAmount),
      ...murabaha
    };
  }, [selectedFinanceVehicle, downPaymentPct, tenureMonths, settings]);

  // Live Self-Service Tracker Filtering (Job Cards, Quotations, ZATCA Invoices)
  const trackerResults = useMemo(() => {
    const q = normalizeDigits(trackerQuery).trim().toLowerCase();
    const matchedJobs = q
      ? jobCards.filter(
          j =>
            j.cardNumber.toLowerCase().includes(q) ||
            j.plateNumber.toLowerCase().includes(q) ||
            j.customerPhone.includes(q) ||
            j.customerName.toLowerCase().includes(q) ||
            j.vehicleModel.toLowerCase().includes(q)
        )
      : jobCards.slice(0, 2);

    const matchedQuotes = q
      ? quotations.filter(
          qt =>
            qt.quotationNumber.toLowerCase().includes(q) ||
            qt.phone.includes(q) ||
            qt.fullName.toLowerCase().includes(q) ||
            qt.vehicleName.toLowerCase().includes(q)
        )
      : quotations.slice(0, 2);

    const matchedInvoices = q
      ? zatcaInvoices.filter(
          inv =>
            inv.invoiceNumber.toLowerCase().includes(q) ||
            inv.customerPhone.includes(q) ||
            inv.customerName.toLowerCase().includes(q) ||
            inv.vinNumber.toLowerCase().includes(q)
        )
      : zatcaInvoices.slice(0, 2);

    return { matchedJobs, matchedQuotes, matchedInvoices };
  }, [trackerQuery, jobCards, quotations, zatcaInvoices]);

  // Handle Multi-Type Instant Booking / Quotation + VIN Reservation Submit
  const handleQuickBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccessMsg(null);
    const cleanName = sanitizeText(bookingName, 80);
    const normalizedPhone = normalizeSaudiPhone(bookingPhone);

    if (cleanName.length < 3) {
      setBookingError(language === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.');
      return;
    }
    if (!isValidSaudiPhone(normalizedPhone)) {
      setBookingError(
        language === 'ar'
          ? 'يرجى إدخال رقم جوال سعودي صحيح (05xxxxxxxx).'
          : 'Please enter a valid Saudi mobile number (05xxxxxxxx).'
      );
      return;
    }

    const chosenVehicle = vehicles.find(v => v.id === bookingVehicleId) || vehicles[0];
    const tomorrowIso = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    if (bookingSubType === 'test_drive') {
      addTestDrive({
        fullName: cleanName,
        phone: normalizedPhone,
        city: 'الرياض',
        preferredShowroom: bookingBranch,
        modelId: chosenVehicle?.id || 'camry-2026',
        modelName: chosenVehicle?.nameAr || 'سولينا كامري 2026',
        preferredDate: tomorrowIso,
        preferredTimeSlot: '04:00 م - 06:00 م',
        notes: 'تم الحجز الفوري عبر مساعد سولينا الذكي',
        pdplConsentAt: new Date().toISOString()
      });
      setBookingSuccessMsg(
        language === 'ar'
          ? `تم تسجيل حجز تجربة قيادة (${chosenVehicle?.nameAr}) بنجاح في نظام CRM!`
          : `Test drive for ${chosenVehicle?.nameEn} booked in CRM!`
      );
    } else if (bookingSubType === 'service') {
      addServiceAppointment({
        fullName: cleanName,
        phone: normalizedPhone,
        city: 'الرياض',
        showroom: bookingBranch,
        vehicleModel: chosenVehicle?.nameAr || 'سولينا كامري 2026',
        plateNumber: sanitizeText(bookingPlate || 'س ل ن 2026', 20),
        currentMileage: bookingMileage,
        packageMileage: bookingMileage,
        serviceType: `صيانة دورية ${formatPrice(bookingMileage)} كم (المسار السريع ${settings.expressServiceMinutes} دقيقة)`,
        preferredDate: tomorrowIso,
        preferredTime: '10:00 صباحاً',
        estimatedCost: 485,
        pdplConsentAt: new Date().toISOString()
      });
      setBookingSuccessMsg(
        language === 'ar'
          ? `تم تأكيد موعد الصيانة السريعة للوحة (${bookingPlate}) في ${bookingBranch}!`
          : `Express service appointment confirmed for plate (${bookingPlate})!`
      );
    } else {
      // Official Quotation + Optional VIN Stock Reservation
      const totalInclVat = chosenVehicle?.priceStartingFrom || 115000;
      const vatSplit = splitVatInclusive(totalInclVat, settings.vatRatePercent || 15);
      const murabaha = calculateMurabahaFinance({
        vehiclePriceInclVat: totalInclVat,
        downPaymentPercent: settings.minDownPaymentPercent || 10,
        balloonPercent: settings.defaultBalloonPercent || 25,
        annualProfitRatePercent: settings.defaultAprPercent || 3.99,
        tenureMonths: 60,
        adminFeePercent: settings.adminFeePercent || 1
      });

      // Find an available in_stock VIN if reservation is checked
      const availableVinItem = reserveVinChecked
        ? vinStock.find(
            item =>
              item.status === 'in_stock' &&
              (item.model.includes(chosenVehicle?.nameAr || '') ||
                (chosenVehicle?.nameAr || '').includes(item.model))
          ) || vinStock.find(item => item.status === 'in_stock')
        : undefined;

      if (availableVinItem) {
        updateVinStatus(availableVinItem.id, 'reserved');
      }

      const quoteNum = addQuotation({
        fullName: cleanName,
        phone: normalizedPhone,
        city: 'الرياض',
        vehicleId: chosenVehicle?.id || 'camry-2026',
        vehicleName: chosenVehicle?.nameAr || 'سولينا كامري 2026',
        gradeName: chosenVehicle?.grades?.[0]?.name || 'الفئة القياسية',
        vehiclePrice: vatSplit.base,
        vatAmount: vatSplit.vat,
        totalWithVat: vatSplit.total,
        financeType: bookingFinanceType,
        downPaymentPercent: settings.minDownPaymentPercent || 10,
        downPaymentAmount: Math.round(murabaha.downPaymentAmount),
        durationMonths: 60,
        monthlyInstallment: Math.round(murabaha.monthlyInstallment),
        bankName: settings.bankPartners[0]?.nameAr || 'مصرف الراجحي',
        reservedVin: availableVinItem?.vin,
        status: 'sent'
      });

      setBookingSuccessMsg(
        language === 'ar'
          ? `تم إصدار عرض السعر الرسمي رقم (${quoteNum})${
              availableVinItem ? ` وحجز الشاسيه (${availableVinItem.vin})` : ''
            } بنجاح!`
          : `Official Quotation (${quoteNum}) issued${
              availableVinItem ? ` & VIN (${availableVinItem.vin}) reserved` : ''
            }!`
      );
    }

    setTimeout(() => {
      setBookingName('');
      setBookingPhone('');
    }, 4000);
  };

  return (
    <>
      {/* 1. Compact Floating AI Assistant Launcher Pill (Theme-Consistent) */}
      {showFloatingTrigger && !isOpen && (
        <div className="fixed bottom-[68px] sm:bottom-5 left-3.5 sm:left-auto sm:right-5 z-40 font-arabic select-none">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 bg-[#141414]/95 hover:bg-[#262626] text-white py-1.5 px-2.5 rounded-full border border-white/15 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title={language === 'ar' ? 'مساعد سولينا الذكي' : 'Solina Smart Assistant'}
            aria-label={language === 'ar' ? 'مساعد سولينا الذكي' : 'Solina Smart Assistant'}
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-white/25 bg-[#f3f3f3] shrink-0">
              <img
                src="/solina-ai-assistant.png"
                alt="مساعد سولينا الذكي"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#141414]" />
            </div>
            <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap pe-1">
              {language === 'ar' ? 'مساعد سولينا' : 'Solina AI'}
            </span>
          </button>
        </div>
      )}

      {/* 2. Compact Multi-Mode Smart Concierge Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-auto sm:right-5 z-50 ${
              isExpanded
                ? 'sm:w-[390px] h-[530px] sm:h-[565px]'
                : 'sm:w-[345px] h-[450px] sm:h-[475px]'
            } max-h-[82vh] bg-white rounded-[22px] flex flex-col overflow-hidden border border-[#e0e0e0] shadow-[0_16px_48px_-8px_rgba(20,20,20,0.22)] transition-all duration-200 font-arabic`}
          >
            {/* Header */}
            <div className="bg-[#141414] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 bg-[#f3f3f3] shrink-0">
                  <img
                    src="/solina-ai-assistant.png"
                    alt="Solina AI Assistant"
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#141414]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[11px] font-bold text-white leading-tight">
                      {language === 'ar' ? 'مساعد سولينا الذكي' : 'Solina AI Concierge'}
                    </h3>
                    <span className="text-[8px] bg-white/10 text-white/90 border border-white/15 font-semibold px-1.5 py-0.5 rounded-full">
                      ERP LIVE
                    </span>
                  </div>
                  <p className="text-[9px] text-white/65 font-normal leading-tight mt-0.5">
                    {language === 'ar'
                      ? `${vehicles.length} طراز • مقارنة • تمويل SAMA • حجز`
                      : `${vehicles.length} Models • Compare • SAMA Finance • Book`}
                  </p>
                </div>
              </div>

              {/* Header Utility Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    const fresh = [createWelcomeMessage()];
                    setMessages(fresh);
                    try {
                      sessionStorage.removeItem(CHAT_STORAGE_KEY);
                    } catch {
                      // ignore
                    }
                    setMode('chat');
                  }}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/75 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={language === 'ar' ? 'بدء محادثة جديدة' : 'Reset Chat'}
                  aria-label={language === 'ar' ? 'بدء محادثة جديدة' : 'Reset Chat'}
                >
                  <RotateCcw className="w-3 h-3" strokeWidth={1.75} />
                </button>
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  className="hidden sm:flex w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/75 hover:text-white items-center justify-center transition-colors cursor-pointer"
                  title={language === 'ar' ? (isExpanded ? 'تصغير النافذة' : 'تكبير النافذة') : 'Toggle Size'}
                  aria-label={language === 'ar' ? 'تغيير حجم النافذة' : 'Toggle Size'}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3 h-3" strokeWidth={1.75} />
                  ) : (
                    <Maximize2 className="w-3 h-3" strokeWidth={1.75} />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={language === 'ar' ? 'إغلاق' : 'Close'}
                  aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* 4-Mode Segmented Navigation Bar */}
            <div className="bg-[#f8f9fa] px-2 py-1.5 grid grid-cols-4 gap-1 border-b border-[#e5e7eb]">
              {[
                { id: 'chat' as const, labelAr: 'المحادثة', labelEn: 'Chat', icon: MessageSquare },
                { id: 'finance' as const, labelAr: 'التمويل', labelEn: 'Finance', icon: Calculator },
                { id: 'tracker' as const, labelAr: 'تتبع طلب', labelEn: 'Tracker', icon: Search },
                { id: 'booking' as const, labelAr: 'حجز وعرض', labelEn: 'Book/Quote', icon: CalendarCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMode(tab.id)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[9px] font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#141414] text-white shadow-xs'
                        : 'bg-white hover:bg-[#f0f0f0] text-[#555555] border border-[#e5e7eb]'
                    }`}
                  >
                    <Icon className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* MODE 1: SMART AI CHAT */}
            {mode === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#f3f3f3]/70">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[92%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#141414] text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-[#141414] border border-[#e5e7eb] rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Side-by-Side Comparison Card inside Bot Message */}
                        {msg.comparisonPair && (
                          <div className="mt-2 p-2 rounded-xl bg-[#f8f9fa] border border-[#e5e7eb] space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-center">
                              {msg.comparisonPair.map((car) => (
                                <div key={car.id} className="bg-white p-2 rounded-lg border border-[#e5e7eb] space-y-1">
                                  <img
                                    src={car.image}
                                    alt={car.nameAr}
                                    width={64}
                                    height={40}
                                    className="w-16 h-10 object-contain mx-auto"
                                    loading="lazy"
                                  />
                                  <div className="text-[10px] font-bold text-[#141414] truncate">
                                    {language === 'ar' ? car.nameAr : car.nameEn}
                                  </div>
                                  <div className="text-[9px] font-mono font-bold text-[#141414]">
                                    <SaudiRiyalPrice amount={formatPrice(car.price)} />
                                  </div>
                                  <div className="text-[8px] text-[#555555] font-mono">
                                    {language === 'ar' ? 'القسط:' : 'Mo:'} <SaudiRiyalPrice amount={formatPrice(car.monthly)} />
                                  </div>
                                  <div className="text-[8px] text-[#707070]">
                                    {car.horsepower} • {car.powertrain}
                                  </div>
                                  <div className="text-[8px] text-[#707070] truncate">{car.fuelEconomy}</div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (onSelectVehicle) {
                                        onSelectVehicle(car.id);
                                        setIsOpen(false);
                                      }
                                    }}
                                    className="w-full mt-1 py-1 rounded-md bg-[#141414] hover:bg-[#262626] text-white text-[8px] font-bold cursor-pointer"
                                  >
                                    {language === 'ar' ? 'المواصفات' : 'Specs'}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Live Vehicle Mini-Cards inside Bot Message */}
                        {msg.vehicleCards && msg.vehicleCards.length > 0 && (
                          <div className="mt-2 space-y-1.5">
                            {msg.vehicleCards.map((card) => (
                              <div
                                key={card.id}
                                className="p-2 rounded-xl bg-[#f8f9fa] border border-[#e5e7eb] flex items-center justify-between gap-2"
                              >
                                <img
                                  src={card.image}
                                  alt={card.nameAr}
                                  width={56}
                                  height={36}
                                  className="w-14 h-9 object-contain shrink-0"
                                  loading="lazy"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1">
                                    <h4 className="text-[10px] font-bold text-[#141414] truncate">
                                      {language === 'ar' ? card.nameAr : card.nameEn}
                                    </h4>
                                    <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-[#e5e7eb] text-[#141414] font-semibold shrink-0">
                                      {card.powertrain}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[9px] text-[#555555] font-mono mt-0.5">
                                    <span className="font-bold text-[#141414]">
                                      <SaudiRiyalPrice amount={formatPrice(card.price)} />
                                    </span>
                                    <span>•</span>
                                    <span>
                                      <SaudiRiyalPrice amount={formatPrice(card.monthly)} />/{language === 'ar' ? 'ش' : 'mo'}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    if (onSelectVehicle) {
                                      onSelectVehicle(card.id);
                                      setIsOpen(false);
                                    } else {
                                      setSelectedFinanceVehicleId(card.id);
                                      setMode('finance');
                                    }
                                  }}
                                  className="px-2 py-1 rounded-lg bg-[#141414] hover:bg-[#262626] text-white text-[9px] font-bold shrink-0 cursor-pointer"
                                >
                                  {language === 'ar' ? 'عرض' : 'View'}
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action Pills inside Bot Message */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-2 pt-1.5 border-t border-[#f0f0f0] flex flex-wrap gap-1">
                            {msg.actions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (act.bookingSubTypeSwitch) {
                                    setBookingSubType(act.bookingSubTypeSwitch);
                                  }
                                  if (act.tabSwitch) {
                                    setMode(act.tabSwitch);
                                  } else if (act.vehicleId && onSelectVehicle) {
                                    onSelectVehicle(act.vehicleId);
                                    setIsOpen(false);
                                  } else if (act.route && onNavigate) {
                                    onNavigate(act.route);
                                    setIsOpen(false);
                                  } else if (act.actionId === 'open_service' && onOpenServiceBooking) {
                                    onOpenServiceBooking();
                                    setIsOpen(false);
                                  } else if (act.actionId === 'top_models') {
                                    handleSendMessage('أفضل سيارات 2026');
                                  } else if (act.actionId === 'compare_demo') {
                                    handleSendMessage('قارن بين كامري وأزيرا');
                                  }
                                }}
                                className="px-2.5 py-1 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-[9px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>{act.label}</span>
                                <ArrowLeft className="w-2.5 h-2.5" strokeWidth={1.75} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-[8px] text-[#707070] mt-0.5 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white border border-[#e5e7eb] w-14">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#555555] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#707070] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Smart Prompt Chips */}
                <div className="px-2.5 py-1.5 bg-white border-t border-[#f0f0f0] flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {[
                    { label: 'مقارنة كامري وأزيرا', icon: Scale, query: 'قارن بين كامري وأزيرا' },
                    { label: 'سيارات تحت 140 ألف', icon: Tag, query: 'سيارة تحت 140000' },
                    { label: 'طرازات الهايبرد', icon: Car, query: 'سيارات هايبرد 2026' },
                    { label: 'المستعمل المعتمد', icon: ShieldCheck, query: 'السيارات المستعملة المعتمدة' },
                    { label: 'قطع الغيار', icon: Package, query: 'أسعار قطع الغيار الأصلية' },
                    { label: 'مواقع الفروع', icon: MapPin, query: 'أين مواقع الفروع؟' }
                  ].map((chip, idx) => {
                    const ChipIcon = chip.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip.query)}
                        className="px-2 py-1 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#555555] text-[9px] font-semibold whitespace-nowrap transition-colors cursor-pointer border border-[#e5e7eb] inline-flex items-center gap-1"
                      >
                        <ChipIcon className="w-2.5 h-2.5" strokeWidth={1.75} />
                        <span>{chip.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Input Bar with Voice & Send */}
                <div className="p-2 bg-white border-t border-[#e5e7eb] flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isListening
                        ? 'bg-[#141414] text-white animate-pulse'
                        : 'bg-[#f3f3f3] hover:bg-[#e5e7eb] text-[#555555]'
                    }`}
                    title={language === 'ar' ? 'بحث صوتي' : 'Voice Search'}
                    aria-label={language === 'ar' ? 'بحث صوتي' : 'Voice Search'}
                  >
                    {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder={
                      language === 'ar'
                        ? 'اسأل عن موديل، قارن سيارتين، ميزانية...'
                        : 'Ask about any model, compare 2 cars...'
                    }
                    className="flex-1 px-3 py-1.5 rounded-full bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] text-[#141414] focus:outline-none focus:border-[#141414] focus:bg-white transition-all font-arabic text-start"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    className="w-7 h-7 rounded-full bg-[#141414] hover:bg-[#262626] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                    title={language === 'ar' ? 'إرسال' : 'Send'}
                    aria-label={language === 'ar' ? 'إرسال' : 'Send'}
                  >
                    <Send className="w-3 h-3" strokeWidth={1.75} />
                  </button>
                </div>
              </>
            )}

            {/* MODE 2: INSTANT SAMA MURABAHA FINANCE CALCULATOR */}
            {mode === 'finance' && (
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#f8f9fa] text-xs">
                <div className="bg-white p-3 rounded-2xl border border-[#e5e7eb] space-y-2.5">
                  <label className="block text-[10px] font-bold text-[#555555]">
                    {language === 'ar' ? 'اختر الطراز من أسطول 2026:' : 'Select 2026 Vehicle Model:'}
                  </label>
                  <select
                    value={selectedFinanceVehicleId}
                    onChange={(e) => setSelectedFinanceVehicleId(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] font-bold text-[#141414] focus:outline-none focus:border-[#141414]"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {language === 'ar' ? v.nameAr : v.nameEn} — {formatPrice(v.priceStartingFrom)} ر.س
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#555555] mb-1">
                        <span>{language === 'ar' ? 'الدفعة الأولى' : 'Down Payment'}</span>
                        <span className="font-mono font-bold text-[#141414]">{downPaymentPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        step={5}
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full accent-[#141414] cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#555555] mb-1">
                        <span>{language === 'ar' ? 'مدة التمويل' : 'Tenure'}</span>
                        <span className="font-mono font-bold text-[#141414]">{tenureMonths} {language === 'ar' ? 'شهر' : 'mo'}</span>
                      </div>
                      <select
                        value={tenureMonths}
                        onChange={(e) => setTenureMonths(Number(e.target.value))}
                        className="w-full px-2 py-1 rounded-lg bg-[#f3f3f3] border border-[#e5e7eb] text-[10px] font-mono font-bold text-[#141414]"
                      >
                        {[12, 24, 36, 48, 60].map((m) => (
                          <option key={m} value={m}>
                            {m} {language === 'ar' ? 'شهراً' : 'Months'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Result Card */}
                <div className="bg-[#141414] text-white p-3.5 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[9px] text-white/65 block">
                        {language === 'ar' ? 'القسط الشهري التقديري (مرابحة)' : 'Estimated Monthly Installment'}
                      </span>
                      <div className="text-lg font-black font-mono text-white">
                        <SaudiRiyalPrice amount={formatPrice(Math.round(financeResult.monthlyInstallment))} />
                        <span className="text-[10px] font-normal text-white/75 ms-1">
                          / {language === 'ar' ? 'شهرياً' : 'mo'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">
                      APR {financeResult.approximateAprPercent}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[9px] text-white/80 font-mono">
                    <div className="bg-white/5 p-1.5 rounded-lg">
                      <span className="block text-white/50">{language === 'ar' ? 'الدفعة الأولى' : 'Down'}</span>
                      <strong>{formatPrice(financeResult.downAmount)}</strong>
                    </div>
                    <div className="bg-white/5 p-1.5 rounded-lg">
                      <span className="block text-white/50">{language === 'ar' ? 'الرسوم الإدارية' : 'Admin Fee'}</span>
                      <strong>{formatPrice(Math.round(financeResult.adminFeeAmount))}</strong>
                    </div>
                    <div className="bg-white/5 p-1.5 rounded-lg">
                      <span className="block text-white/50">{language === 'ar' ? 'الدفعة الأخيرة' : 'Balloon'}</span>
                      <strong>{formatPrice(financeResult.balloonAmount)}</strong>
                    </div>
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setBookingVehicleId(selectedFinanceVehicleId);
                        setBookingSubType('quotation');
                        setMode('booking');
                      }}
                      className="flex-1 py-1.5 rounded-full bg-white text-[#141414] hover:bg-[#f0f0f0] text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'إصدار عرض سعر رسمي' : 'Issue Official Quote'}
                    </button>
                    {onSelectVehicle && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectVehicle(selectedFinanceVehicleId);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? 'المواصفات' : 'Specs'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MODE 3: LIVE CUSTOMER SELF-SERVICE TRACKER (WORKSHOP, QUOTATIONS, ZATCA INVOICES) */}
            {mode === 'tracker' && (
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#f8f9fa] text-xs">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#707070] absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
                  <input
                    type="text"
                    value={trackerQuery}
                    onChange={(e) => setTrackerQuery(e.target.value)}
                    placeholder={
                      language === 'ar'
                        ? 'ابحث باللوحة، الجوال، كرت عمل (JC)، عرض سعر (QT)، فاتورة...'
                        : 'Search plate, phone, JC-, QT-, or INV-...'
                    }
                    className="w-full pr-8 pl-3 py-2 rounded-xl bg-white border border-[#e5e7eb] text-[11px] text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                {/* Active Workshop Job Cards */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#555555] flex items-center gap-1">
                    <Wrench className="w-3 h-3" />
                    {language === 'ar' ? 'أوامر العمل بالورشة السريعة:' : 'Active Workshop Job Cards:'}
                  </span>
                  {trackerResults.matchedJobs.length === 0 ? (
                    <div className="p-2 rounded-xl bg-white border border-[#e5e7eb] text-[10px] text-[#707070] text-center">
                      {language === 'ar' ? 'لا توجد كروت عمل مطابقة.' : 'No matching job cards.'}
                    </div>
                  ) : (
                    trackerResults.matchedJobs.map((job) => (
                      <div key={job.id} className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[10px] text-[#141414]">{job.cardNumber}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#141414] text-white text-[8px] font-bold">
                            {job.status === 'ready'
                              ? 'جاهزة للتسليم'
                              : job.status === 'in_progress'
                                ? `قيد العمل (${job.timeRemainingMinutes} د)`
                                : job.status === 'quality_check'
                                  ? 'فحص الجودة'
                                  : 'تم الاستلام'}
                          </span>
                        </div>
                        <div className="text-[10px] font-bold text-[#141414]">
                          {job.vehicleModel} — <span className="font-mono">{job.plateNumber}</span>
                        </div>
                        <div className="text-[9px] text-[#707070] flex justify-between">
                          <span>{job.serviceType}</span>
                          <span>{job.bayNumber}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Official Quotations */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[#555555] flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {language === 'ar' ? 'عروض الأسعار وحجوزات الشاسيه:' : 'Official Quotations:'}
                  </span>
                  {trackerResults.matchedQuotes.map((qt) => (
                    <div key={qt.id} className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-[10px] text-[#141414]">{qt.quotationNumber}</div>
                        <div className="text-[9px] text-[#707070]">
                          {qt.fullName} • {qt.vehicleName}
                        </div>
                        {qt.reservedVin && (
                          <div className="text-[8px] font-mono text-[#141414] mt-0.5">
                            VIN: {qt.reservedVin}
                          </div>
                        )}
                      </div>
                      <div className="text-end font-mono text-[10px] font-bold text-[#141414]">
                        <SaudiRiyalPrice amount={formatPrice(qt.totalWithVat)} />
                        <span className="block text-[8px] text-[#555555]">
                          {qt.financeType === 'lease' ? 'تأجير مرابحة' : 'نقدي'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cleared ZATCA Invoices */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[#555555] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {language === 'ar' ? 'الفواتير الضريبية المعتمدة (ZATCA):' : 'Cleared ZATCA Invoices:'}
                  </span>
                  {trackerResults.matchedInvoices.map((inv) => (
                    <div key={inv.id} className="p-2.5 rounded-xl bg-white border border-[#e5e7eb] flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-[10px] text-[#141414]">{inv.invoiceNumber}</div>
                        <div className="text-[9px] text-[#707070]">{inv.customerName} • {inv.vehicleModel}</div>
                      </div>
                      <div className="text-end font-mono text-[10px] font-bold text-[#141414]">
                        <SaudiRiyalPrice amount={formatPrice(inv.totalAmount)} />
                        <span className="block text-[8px] text-emerald-700">ZATCA Cleared</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODE 4: 3-IN-1 INSTANT BOOKING & OFFICIAL QUOTATION (DIRECT ERP SYNC) */}
            {mode === 'booking' && (
              <form onSubmit={handleQuickBookingSubmit} className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#f8f9fa] text-xs">
                <div className="bg-white p-3 rounded-2xl border border-[#e5e7eb] space-y-2.5">
                  {/* 3 Sub-Type Pills: Test Drive | Express Service | Official Quotation */}
                  <div className="grid grid-cols-3 gap-1 bg-[#f3f3f3] p-1 rounded-xl">
                    {[
                      { id: 'test_drive' as const, labelAr: 'تجربة قيادة', labelEn: 'Test Drive' },
                      { id: 'service' as const, labelAr: 'حجز صيانة', labelEn: 'Service' },
                      { id: 'quotation' as const, labelAr: 'عرض سعر', labelEn: 'Quotation' }
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setBookingSubType(sub.id);
                          setBookingError(null);
                          setBookingSuccessMsg(null);
                        }}
                        className={`py-1 px-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                          bookingSubType === sub.id
                            ? 'bg-[#141414] text-white shadow-2xs'
                            : 'text-[#555555] hover:text-[#141414]'
                        }`}
                      >
                        {language === 'ar' ? sub.labelAr : sub.labelEn}
                      </button>
                    ))}
                  </div>

                  {bookingSuccessMsg && (
                    <div className="p-2.5 rounded-xl bg-[#141414] text-white text-[10px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{bookingSuccessMsg}</span>
                    </div>
                  )}

                  {bookingError && (
                    <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[10px] font-semibold">
                      {bookingError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: فهد العتيبي' : 'Full Name'}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] text-[#141414] focus:outline-none focus:border-[#141414] focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                      {language === 'ar' ? 'رقم الجوال السعودي' : 'Saudi Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] font-mono text-[#141414] focus:outline-none focus:border-[#141414] focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                      {language === 'ar' ? 'طراز المركبة' : 'Vehicle Model'}
                    </label>
                    <select
                      value={bookingVehicleId}
                      onChange={(e) => setBookingVehicleId(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] font-semibold text-[#141414]"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {language === 'ar' ? v.nameAr : v.nameEn} — {formatPrice(v.priceStartingFrom)} ر.س
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Extra fields for Express Service Booking */}
                  {bookingSubType === 'service' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                          {language === 'ar' ? 'رقم اللوحة' : 'Plate Number'}
                        </label>
                        <input
                          type="text"
                          value={bookingPlate}
                          onChange={(e) => setBookingPlate(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[10px] font-mono text-[#141414]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                          {language === 'ar' ? 'الممشى (كم)' : 'Mileage (km)'}
                        </label>
                        <select
                          value={bookingMileage}
                          onChange={(e) => setBookingMileage(Number(e.target.value))}
                          className="w-full px-2 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[10px] font-mono text-[#141414]"
                        >
                          {[10000, 20000, 30000, 40000, 50000, 60000, 80000, 100000].map((km) => (
                            <option key={km} value={km}>
                              {formatPrice(km)} كم
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Extra fields for Official Quotation + VIN Stock Reservation */}
                  {bookingSubType === 'quotation' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setBookingFinanceType('lease')}
                          className={`py-1.5 rounded-xl text-[10px] font-bold border cursor-pointer ${
                            bookingFinanceType === 'lease'
                              ? 'bg-[#141414] text-white border-[#141414]'
                              : 'bg-[#f3f3f3] text-[#555555] border-[#e5e7eb]'
                          }`}
                        >
                          {language === 'ar' ? 'تمويل مرابحة' : 'Murabaha Lease'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingFinanceType('cash')}
                          className={`py-1.5 rounded-xl text-[10px] font-bold border cursor-pointer ${
                            bookingFinanceType === 'cash'
                              ? 'bg-[#141414] text-white border-[#141414]'
                              : 'bg-[#f3f3f3] text-[#555555] border-[#e5e7eb]'
                          }`}
                        >
                          {language === 'ar' ? 'شراء نقدي (كاش)' : 'Cash Purchase'}
                        </button>
                      </div>

                      <label className="flex items-center gap-2 text-[10px] text-[#141414] font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reserveVinChecked}
                          onChange={(e) => setReserveVinChecked(e.target.checked)}
                          className="accent-[#141414]"
                        />
                        <span>
                          {language === 'ar'
                            ? 'حجز رقم شاسيه (VIN) متاح تلقائياً باسم العميل'
                            : 'Auto-reserve available VIN in warehouse stock'}
                        </span>
                      </label>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-[#555555] mb-1">
                      {language === 'ar' ? 'الفرع / مركز الخدمة' : 'Preferred Showroom / Center'}
                    </label>
                    <select
                      value={bookingBranch}
                      onChange={(e) => setBookingBranch(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#f3f3f3] border border-[#e5e7eb] text-[11px] font-semibold text-[#141414]"
                    >
                      {showrooms.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-full bg-[#141414] hover:bg-[#262626] text-white text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    {bookingSubType === 'test_drive'
                      ? language === 'ar'
                        ? 'تأكيد حجز تجربة القيادة'
                        : 'Confirm Test Drive'
                      : bookingSubType === 'service'
                        ? language === 'ar'
                          ? 'تأكيد حجز موعد الصيانة السريعة'
                          : 'Confirm Express Service'
                        : language === 'ar'
                          ? 'إصدار عرض السعر الرسمي وحجز المركبة'
                          : 'Issue Official Quotation & Reserve VIN'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
};
