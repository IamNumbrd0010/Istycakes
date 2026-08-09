import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { BAKERY_INFO } from '../data/cakes';
import { getWhatsAppUrl } from '../utils/formatters';

export const WhatsAppFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    '👋 Hi! I want to order a custom cake for an upcoming birthday in Lagos.',
    '📸 Can you replicate a cake photo I found on Pinterest / Instagram?',
    '⚡ Do you have same-day or 24-hour emergency cakes available?',
    '💍 I would like to book a Wedding Cake consultation.',
  ];

  const handleSendPrompt = (msg) => {
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = getWhatsAppUrl(customMsg);
    window.open(url, '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="floating-whatsapp-wrap">
      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="popup-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  color: '#075E54',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageCircle size={18} />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>
                  IstyCakes &amp; Surprises
                </span>
                <span style={{ fontSize: '10px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }}></span>
                  Typically replies in minutes
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#ffffff', padding: '4px' }}
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="popup-body">
            <div
              style={{
                backgroundColor: '#DCF8C6',
                padding: '10px 12px',
                borderRadius: '12px',
                borderTopLeftRadius: '0',
                fontSize: '12px',
                color: '#111b21',
                lineHeight: '1.5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              Hello! 🎂 How can we make your next celebration in Lagos magical today? Tap a quick option below or type your message:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(prompt)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #ffd9dd',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '11px',
                    textAlign: 'left',
                    color: '#2b1613',
                    lineHeight: '1.4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px',
                  }}
                >
                  <span>{prompt}</span>
                  <Send size={12} style={{ color: '#25D366', flexShrink: 0 }} />
                </button>
              ))}
            </div>

            <form onSubmit={handleSendCustom} style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <input
                type="text"
                placeholder="Type a custom inquiry..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '12px',
                  borderRadius: '9999px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-whatsapp-btn"
        aria-label="Open WhatsApp Chat"
      >
        <span className="whatsapp-ping-ring"></span>
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};
