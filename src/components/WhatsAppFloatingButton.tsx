import React, { useState } from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleSend = (customText?: string) => {
    const text = customText || quickMsg || 'Hello IstyCakes! 🎂 I would like to inquire about ordering a cake.';
    window.open(`https://wa.me/${BAKERY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setPopupOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {popupOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#ffd9dd] p-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#ffd9dd]">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#944552] text-white flex items-center justify-center font-bold text-xs">
                  IC
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2b1613]">{BAKERY_INFO.name}</h4>
                <p className="text-[10px] text-green-600 font-medium">Baking Studio Online</p>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 p-3 bg-[#fdf2f4] rounded-xl text-xs text-[#534344] leading-relaxed">
            👋 Hi there! Need a cake quote, bespoke design consultation, or urgent delivery for today in Lagos?
          </div>

          {/* Quick preset questions */}
          <div className="space-y-1.5 mb-3">
            <button
              onClick={() => handleSend("Hi! Can I order a cake for delivery this weekend in Lagos?")}
              className="w-full text-left text-[11px] p-2 bg-white hover:bg-[#FFF8F7] border border-[#ffd9dd] rounded-lg text-[#944552] transition-colors"
            >
              🎂 Check weekend baking availability
            </button>
            <button
              onClick={() => handleSend("Hello, I'd like to share a Pinterest photo for a custom quote.")}
              className="w-full text-left text-[11px] p-2 bg-white hover:bg-[#FFF8F7] border border-[#ffd9dd] rounded-lg text-[#944552] transition-colors"
            >
              📸 Send custom inspiration photo
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-[#ffd9dd] rounded-lg focus:ring-1 focus:ring-[#944552] focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1EBE5D] transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setPopupOpen(!popupOpen)}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 sm:px-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        title="Chat with Baker on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="text-xs font-bold hidden sm:inline">Chat with Baker</span>
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
      </button>
    </div>
  );
};
