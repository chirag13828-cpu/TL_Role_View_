import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-right-10 duration-300">
      <div className="bg-white border border-emerald-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4 min-w-[320px]">
        <div className="bg-emerald-50 p-2 rounded-xl">
          <CheckCircle2 className="text-emerald-500" size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">Success</p>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500 transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
