import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  Car, 
  Tag, 
  MapPin, 
  Headphones, 
  ArrowLeft, 
  CheckCircle2,
  Calendar,
  PhoneCall,
  ExternalLink,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VEHICLES } from '../data/toyotaData';

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
}

export const SolinaAIAssistant: React.FC<SolinaAIAssistantProps> = ({
  onSelectVehicle,
  onOpenTestDrive,
  onOpenServiceBooking,
  onNavigate
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: language === 'ar'
        ? 'مرحباً بك في سولينا للسيارات! 🚗 أنا مساعدك الذكي المعتمد، كيف يمكنني خدمتك اليوم بخصوص سيارات 2026، عروض التمويل، أو حجز الصيانة؟'
        : 'Welcome to Solina Motors! 🚗 I am your certified AI assistant. How may I assist you with 2026 vehicles, financing offers, or service booking today?',
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

      if (lower.includes('موديل') || lower.includes('سيار') || lower.includes('طراز') || lower.includes('model') || lower.includes('car')) {
        botResponse = language === 'ar'
          ? 'تضم تشكيلة سولينا 2026 أحدث سيارات السيدان مثل (كامري 2026، كراون 2026، كورولا 2026) وسيارات الدفع الرباعي الفاخرة مثل (لاند كروزر LC300، برادو 2026، راف فور 2026).'
          : 'Solina Motors 2026 lineup features luxury sedans (Camry, Crown, Corolla) and premium 4x4 SUVs (Land Cruiser LC300, Prado, RAV4).';
        actions = [
          {
            label: language === 'ar' ? 'عرض كامري 2026' : 'View Camry 2026',
            action: () => {
              if (onSelectVehicle) onSelectVehicle('camry-2026');
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'عرض لاند كروزر 2026' : 'View Land Cruiser 2026',
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
          ? 'يمكنك حجز موعد صيانة دورية سريعة خلال 45 دقيقة في أقرب مركز خدمة سولينا معتمد مع فحص شامل 20 نقطة مجاناً.'
          : 'Book a 45-minute express maintenance slot at any authorized Solina service center with a free 20-point safety inspection.';
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
          ? 'يسعدنا استقبالك لتجربة قيادة سيارات سولينا 2026 مباشرة في الفرع المفضل لديك.'
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
          ? 'شكراً لاستفسارك! سأقوم بتوجيهك لأحد مستشاري مبيعات سولينا لتقديم المساعدة التامة، أو يمكنك اختيار أحد الموضوعات السريعة أدناه.'
          : 'Thank you for reaching out! You can choose any of the quick services below or ask about any 2026 vehicle model.';
        actions = [
          {
            label: language === 'ar' ? 'طلب تجربة قيادة' : 'Book Test Drive',
            action: () => {
              if (onOpenTestDrive) onOpenTestDrive();
              setIsOpen(false);
            }
          },
          {
            label: language === 'ar' ? 'حجز صيانة' : 'Book Service',
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
    }, 500);
  };

  return (
    <>
      {/* 1. Floating AI Assistant Launcher Button (Optimized position for both Mobile & Desktop) */}
      <div className="fixed bottom-[74px] sm:bottom-6 right-3.5 sm:right-6 z-40 font-arabic select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2 sm:gap-3 bg-gray-950/95 hover:bg-black text-white p-1.5 sm:p-2 pl-3 sm:pl-4 pr-1.5 sm:pr-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-red-500/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-red-500/20"
          title={language === 'ar' ? 'تحدث مع مساعد سولينا الذكي 24/7' : 'Chat with Solina AI Assistant 24/7'}
        >
          {/* Subtle Ambient Pulse */}
          <span className="absolute -inset-1 rounded-full bg-red-600/25 animate-ping pointer-events-none" />

          {/* Luxury AI Robot Avatar */}
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-red-500 shadow-md bg-white shrink-0">
            <img
              src="/solina-ai-assistant.png"
              alt="مساعد سولينا الذكي"
              className="w-full h-full object-cover"
            />
            {/* Live Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
          </div>

          {/* Button Text Pill */}
          <div className="text-start pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-black text-white leading-none">
                {language === 'ar' ? 'مساعد سولينا' : 'Solina AI'}
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider">
                24/7
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-300 font-light block leading-tight mt-0.5 hidden xs:block">
              {language === 'ar' ? 'مساعدتك الفورية' : 'Instant Help'}
            </span>
          </div>
        </button>
      </div>

      {/* 2. Professional AI Assistant Bottom Sheet / Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full sm:max-w-md h-[90vh] sm:h-[640px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-8 duration-300 font-arabic"
          >
            {/* Mobile Sheet Grab Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2 sm:hidden" />

            {/* Header with Solina Red & Chrome Luxury Styling */}
            <div className="bg-gradient-to-r from-gray-950 via-slate-900 to-black text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 bg-white shrink-0">
                  <img
                    src="/solina-ai-assistant.png"
                    alt="Solina AI Assistant"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-black">
                      {language === 'ar' ? 'مساعد سولينا الذكي 2026' : 'Solina AI Smart Assistant'}
                    </h3>
                    <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-300 font-light">
                    {language === 'ar' ? 'خدمة ضيوف سولينا على مدار الساعة' : '24/7 Solina Guest Assistance'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Navigation Grid (4 Core Shortcuts) */}
            <div className="bg-gray-950 text-white px-3 py-2 grid grid-cols-4 gap-2 border-b border-gray-800 text-center">
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
                    className="flex flex-col items-center gap-1 p-1 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-200 leading-none">
                      {item.labelAr}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-gradient-to-b from-gray-50 via-white to-gray-50">
              
              {/* Messages list */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {/* Action buttons inside bot response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={act.action}
                            className="px-2.5 py-1 rounded-full bg-gray-900 hover:bg-red-600 text-white text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>{act.label}</span>
                            <ArrowLeft className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-gray-200 w-20">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { label: '🚗 تجربة قيادة', query: 'أريد حجز تجربة قيادة' },
                { label: '🏷️ سعر كامري 2026', query: 'كم سعر كامري 2026؟' },
                { label: '📍 أقرب فرع', query: 'أين موقع المعرض الرئيسي؟' },
                { label: '🛠️ حجز موعد صيانة', query: 'كيف أحجز موعد صيانة؟' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer border border-gray-200"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Footer with Send Button */}
            <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={language === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your question here...'}
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-arabic text-start"
              />
              <button
                onClick={() => handleSendMessage()}
                className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                title="إرسال"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
