import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export const NotificationToast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-box">
        <Sparkles size={18} style={{ color: '#ffd9dd', flexShrink: 0 }} />
        <span style={{ lineHeight: '1.4' }}>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            padding: '2px',
            cursor: 'pointer',
            marginLeft: '6px',
            opacity: 0.8,
          }}
          aria-label="Dismiss toast"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
