import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RefreshButton = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 600); // matches the 0.6s animation duration
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="p-2 border border-blue-200 text-blue-600 bg-white rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm flex items-center justify-center"
    >
      <RefreshCw size={18} className={isSpinning ? 'animate-spin-once' : ''} />
    </button>
  );
};

export default RefreshButton;
