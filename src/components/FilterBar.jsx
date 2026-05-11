import React from 'react';
import { Search } from 'lucide-react';
import RefreshButton from './RefreshButton';
import CustomDropdown from './CustomDropdown';

const FilterBar = ({ onFilterChange }) => {
  const selectStyles = "appearance-none bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-slate-100 rounded-lg text-sm text-slate-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search size={16} className="text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
          placeholder="Search specific ticket by customer name or ID"
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      <CustomDropdown 
        options={['All Categories', 'Refund', 'Info', 'Status']} 
        defaultValue="All Categories" 
        onChange={(val) => onFilterChange('category', val)}
      />

      <div className="flex-1" />

      <RefreshButton />
    </div>
  );
};

export default FilterBar;
