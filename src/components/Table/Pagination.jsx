import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Pagination = ({ totalItems = 0, currentPage = 1, onPageChange = () => {} }) => {
  const totalPages = Math.ceil(totalItems / 8) || 1;
  
  return (
    <div className="flex justify-end items-center gap-4 py-1 px-6 border-t border-gray-100 bg-white shrink-0 h-[32px]">
      <span className="text-[11px] text-gray-400 font-medium">Total {totalItems} items</span>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="text-gray-400 hover:text-blue-500 p-1 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
        </button>
        
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`w-5 h-5 flex items-center justify-center rounded-md text-[11px] font-bold transition-all shadow-sm ${
                currentPage === i + 1 
                  ? 'bg-blue-50 border border-blue-200 text-blue-600' 
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="text-gray-400 hover:text-blue-500 p-1 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="relative group">
        <div className="flex items-center gap-2 px-2 py-0.5 border border-gray-200 rounded-md hover:border-blue-300 transition-all cursor-pointer bg-white">
          <span className="text-[11px] font-medium text-gray-500">8 / page</span>
          <ChevronDown size={10} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
