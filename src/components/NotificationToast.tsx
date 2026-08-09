import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#944552] text-white px-5 py-3 rounded-full shadow-2xl border border-[#ffd9dd]/40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-4 h-4 text-[#ffe088] shrink-0" />
      <span className="text-xs sm:text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-[#ffd9dd] hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
