import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Car,
  Tag,
  MapPin,
  Headphones,
  ArrowLeft,
  Wrench
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: () => void;
  }[];
}

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
  const { language } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (isOpenExternal !== undefined && onCloseExternal && !val) {
      onCloseExternal();
    }
    setInternalOpen(val);
  };

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: language === 'ar'
        ? 'مرحباً بك في سولينا للسيارات. أنا مساعدك الذكي المعتمد، كيف يمكنني خدمتك اليوم بخصوص أسطول 2026، عروض التمويل، أو حجز الصيانة؟'
        : 'Welcome to Solina Motors. I am your certified AI assistant. How may I assist you with 2026 vehicles, financing offers, or service bookings today?',
      timestamp: 'الآن'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
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

    // Generate intelligent AI Response
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = '';
      let actions: { label: string; action: () => void }[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('مرسيدس') || lower.includes('mercedes') || lower.includes('لكزس') || lower.includes('lexus') || lower.includes('بورش') || lower.includes('porsche') || lower.includes('بي ام') || lower.includes('bmw') || lower.includes('جينيسيس') || lower.includes('genesis') || lower.includes('رينج') || lower.includes('range') || lower.includes('فاخر')) {
        botResponse = language === 'ar'
          ? 'نقدم تشكيلة فائقة الفخامة من كبرى العلامات العالمية المعتمدة: مرسيدس S500 و G63 AMG، لكزس LX600 VIP و ES300h، بورشه كايين توربو E-Hybrid بقوة 729 حصان، بي إم دبليو 735i بشاشة السينما 8K، جينيسيس G90 رويال، ورينج روفر SV أوتوبيوغرافي.'
          : 'We offer an ultra-luxury multi-brand portfolio: Mercedes-Benz S500 & G63 AMG, Lexus LX600 VIP & ES300h, Porsche Cayenne Turbo E-Hybrid (729 HP), BMW 735i (8K Theatre Screen), Genesis G90 Royal, and Range Rover SV Autobiography.';
        actions = [
          {
            label: language === 'ar' ? 'استعراض مرسيدس S500' : 'View Mercedes S500',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('mercedes-s500-2026');
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'استعراض لكزس LX600' : 'View Lexus LX600',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('lexus-lx600-2026');
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'استعراض بورشه كايين توربو' : 'View Porsche Cayenne Turbo',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('porsche-cayenne-turbo-2026');
              setIsOpen(false);
            }
          }
        ];
      } else if (lower.includes('موديل') || lower.includes('سيار') || lower.includes('طراز') || lower.includes('model') || lower.includes('car')) {
        botResponse = language === 'ar'
          ? 'تضم تشكيلة سولينا 2026 أسطولاً شاملاً يجمع بين الاعتمادية العالية وسيارات السيدان الفاخرة (كامري، كراون، مرسيدس S500، بي إم دبليو 735i) وسيارات الدفع الرباعي الخارقة (لاند كروزر LC300، لكزس LX600، مرسيدس G63 AMG، رينج روفر SV).'
          : 'Our 2026 multi-brand fleet features executive sedans (Camry, Crown, Mercedes S500, BMW 735i) and high-performance luxury 4x4s (Land Cruiser LC300, Lexus LX600, Mercedes G63 AMG, Range Rover SV).';
        actions = [
          {
            label: language === 'ar' ? 'استعراض مرسيدس S500' : 'View Mercedes S500',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('mercedes-s500-2026');
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'استعراض لاند كروزر 2026' : 'View Land Cruiser 2026',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('lc300-2026');
              setIsOpen(false);
            }
          }
        ];
      } else if (lower.includes('سعر') || lower.includes('قسط') || lower.includes('تمويل') || lower.includes('price') || lower.includes('finance')) {
        botResponse = language === 'ar'
          ? 'نقدم حالياً عروض تمويلية استثنائية لعام 2026: 0% دفعة أولى وبدون رسوم إدارية مع أقساط تبدأ من 1,035 ريال/شهرياً.'
          : 'We offer exclusive 2026 finance deals: 0% down payment, 0% admin fees, with monthly installments starting from 1,035 SAR.';
        actions = [
          {
            label: language === 'ar' ? 'صفحة العروض التمويلية' : 'View Financing Offers',
            action: () => {
              if (onNavigate) onNavigate('offers');
              setIsOpen(false);
            }
          }
        ];
      } else if (lower.includes('صيان') || lower.includes('خدم') || lower.includes('service') || lower.includes('oil')) {
        botResponse = language === 'ar'
          ? 'يمكنك حجز موعد صيانة دورية سريعة خلال 45 دقيقة في أقرب مركز خدمة سولينا معتمد مع فحص شامل مجاناً.'
          : 'Book a 45-minute express maintenance slot at any authorized Solina service center with a free multi-point inspection.';
        actions = [
          {
            label: language === 'ar' ? 'حجز موعد صيانة الآن' : 'Book Maintenance Now',
            action: () => {
              if (onOpenServiceBooking) onOpenServiceBooking();
              setIsOpen(false);
            }
          }
        ];
      } else if (lower.includes('تجرب') || lower.includes('قياد') || lower.includes('test drive')) {
        botResponse = language === 'ar'
          ? 'يسعدنا استقبالك لتجربة قيادة سيارات سولينا 2026 مباشرة في صالة العرض الأقرب إليك.'
          : 'Experience the thrill of driving Solina 2026 models directly at your preferred showroom.';
        actions = [
          {
            label: language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive',
            action: () => {
              if (onOpenTestDrive) onOpenTestDrive();
              setIsOpen(false);
            }
          }
        ];
      } else if (lower.includes('فرع') || lower.includes('موقع') || lower.includes('معرض') || lower.includes('location') || lower.includes('branch')) {
        botResponse = language === 'ar'
          ? 'تمتلك سولينا للسيارات أكثر من 50 صالة عرض ومركز خدمة متطور عبر مدن المملكة (الرياض، جدة، الدمام، مكة، المدينة، الخبر).'
          : 'Solina Motors operates 50+ flagship showrooms and advanced service centers across Saudi Arabia.';
        actions = [
          {
            label: language === 'ar' ? 'عرض خريطة الفروع' : 'View Showroom Locations',
            action: () => {
              if (onNavigate) onNavigate('showrooms');
              setIsOpen(false);
            }
          }
        ];
      } else {
        botResponse = language === 'ar'
          ? 'شكراً لتواصلك مع سولينا للسيارات! يسعدني خدمتك في أي وقت، يمكنك اختيار أحد الإجراءات السريعة أدناه.'
          : 'Thank you for contacting Solina Motors! You can choose any of the quick actions below.';
        actions = [
          {
            label: language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive',
            action: () => {
              if (onOpenTestDrive) onOpenTestDrive();
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'حجز موعد صيانة' : 'Book Service',
            action: () => {
              if (onOpenServiceBooking) onOpenServiceBooking();
              setIsOpen(false);
            }
          }
        ];
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions
      };

      setMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  return (
    <>
      {/* 1. Floating AI Assistant Launcher Button */}
      {showFloatingTrigger && (
        <div className="fixed bottom-[74px] sm:bottom-6 left-3.5 sm:left-auto sm:right-6 z-40 font-arabic select-none">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-2 sm:gap-2.5 bg-[#141414] hover:bg-black text-white p-1.5 sm:p-2 pl-3 sm:pl-3.5 pr-1.5 sm:pr-2 rounded-full border border-red-600/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title={language === 'ar' ? 'تحدث مع مساعد سولينا الذكي 24/7' : 'Chat with Solina AI Assistant 24/7'}
          >
            {/* AI Robot Avatar */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-red-600 bg-white shrink-0">
              <img
                src="/solina-ai-assistant.png"
                alt="مساعد سولينا الذكي"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-red-600 border border-white" />
            </div>

            {/* Button Label */}
            <div className="text-start pr-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] sm:text-xs font-black text-white leading-none">
                  {language === 'ar' ? 'مساعد سولينا' : 'Solina AI'}
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-[8px] font-black text-white uppercase tracking-wider">
                  24/7
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] text-white/70 font-light block leading-tight mt-0.5">
                {language === 'ar' ? 'مساعدة فورية' : 'Instant Help'}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 2. Professional AI Assistant Bottom Sheet / Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-md h-[88vh] sm:h-[630px] bg-white rounded-t-[32px] sm:rounded-[28px] flex flex-col overflow-hidden border border-[#e0e0e0] animate-in slide-in-from-bottom-8 duration-300 font-arabic"
          >
            {/* Mobile Sheet Grab Handle */}
            <div className="w-12 h-1.5 bg-[#e0e0e0] rounded-full mx-auto my-2 sm:hidden" />

            {/* Header with Solina Architectural Dark & Red Theme */}
            <div className="bg-[#141414] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 bg-white shrink-0">
                  <img
                    src="/solina-ai-assistant.png"
                    alt="Solina AI Assistant"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-red-600 border border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-black text-white">
                      {language === 'ar' ? 'مساعد سولينا الذكي 2026' : 'Solina AI Smart Assistant'}
                    </h3>
                    <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70 font-light">
                    {language === 'ar' ? 'خدمة ضيوف سولينا على مدار الساعة' : '24/7 Solina Guest Support'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Quick Action Navigation Grid (4 Core Shortcuts) */}
            <div className="bg-[#141414] text-white px-3 py-2 grid grid-cols-4 gap-2 border-b border-white/10 text-center">
              {[
                { id: 'models', labelAr: 'الموديلات', icon: Car, query: 'أريد استعراض سيارات 2026' },
                { id: 'prices', labelAr: 'الأسعار', icon: Tag, query: 'ما هي أسعار وعروض التمويل؟' },
                { id: 'branches', labelAr: 'الفروع', icon: MapPin, query: 'أين مواقع صالات العرض؟' },
                { id: 'service', labelAr: 'الصيانة', icon: Headphones, query: 'كيف أحجز موعد صيانة؟' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSendMessage(item.query)}
                    className="flex flex-col items-center gap-1 p-1 rounded-[14px] hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-[30%] bg-white/10 text-white border border-white/15 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[9px] font-bold text-white/80 leading-none">
                      {item.labelAr}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#f3f3f3]">
              {/* Messages list */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[20px] p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#141414] text-white rounded-br-none'
                        : 'bg-white text-[#141414] border border-[#e0e0e0] rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action buttons inside bot response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-[#e0e0e0] flex flex-wrap gap-1.5">
                        {msg.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={act.action}
                            className="px-2.5 py-1 rounded-full bg-[#141414] hover:bg-red-600 text-white text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>{act.label}</span>
                            <ArrowLeft className="w-2.5 h-2.5" strokeWidth={1.75} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#707070] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-[20px] bg-white border border-[#e0e0e0] w-20">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-white border-t border-[#e0e0e0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { label: 'تجربة قيادة', icon: Car, query: 'أريد حجز تجربة قيادة' },
                { label: 'سعر كامري 2026', icon: Tag, query: 'كم سعر كامري 2026؟' },
                { label: 'أقرب فرع', icon: MapPin, query: 'أين موقع المعرض الرئيسي؟' },
                { label: 'حجز موعد صيانة', icon: Wrench, query: 'كيف أحجز موعد صيانة؟' }
              ].map((chip, idx) => {
                const ChipIcon = chip.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.query)}
                    className="px-2.5 py-1 rounded-full bg-[#f3f3f3] hover:bg-[#141414] hover:text-white text-[#141414] text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer border border-[#e0e0e0] inline-flex items-center gap-1"
                  >
                    <ChipIcon className="w-3 h-3" strokeWidth={1.75} />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Footer with Send Button */}
            <div className="p-2.5 bg-white border-t border-[#e0e0e0] flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={language === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your question here...'}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#f0f0f0] border border-[#e0e0e0] text-xs text-[#141414] focus:outline-none focus:border-[#141414] focus:bg-white transition-all font-arabic text-start"
              />
              <button
                onClick={() => handleSendMessage()}
                className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                title="إرسال"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
