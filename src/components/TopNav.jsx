import React from 'react';
import { AlignLeft, Home, User } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="h-14 border-b border-blue-100 flex items-center justify-between px-4 bg-white shrink-0">
      <div className="flex items-center gap-4">
        {/* Logo - Blue X */}
        <div className="text-blue-600 font-bold text-2xl italic">X</div>
        {/* AlignLeft Menu */}
        <button className="text-slate-600 hover:text-slate-800 p-1 transition-colors duration-200">
          <AlignLeft size={24} strokeWidth={2} />
        </button>
      </div>
      
      <div className="flex items-center gap-4 text-slate-500">
        <button className="hover:text-blue-500 transition-colors duration-200">
          <Home size={22} strokeWidth={2.5} />
        </button>
        <button className="hover:text-blue-500 transition-colors duration-200">
          <User size={22} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
