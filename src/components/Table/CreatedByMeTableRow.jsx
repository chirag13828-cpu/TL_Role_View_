import React, { useState } from 'react';
import { UserPlus, ChevronDown } from 'lucide-react';
import AgentDropdown from './AgentDropdown';

const CategoryBadge = ({ type }) => {
  const styles = {
    REFUND: 'bg-[#f4e8ff] border border-[#d8b4fe] text-[#9333ea]',
    INFO: 'bg-[#ecfdf5] border border-[#6ee7b7] text-[#10b981]',
    STATUS: 'bg-[#fefce8] border border-[#fde047] text-[#eab308]',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>{type}</span>;
};

const StatusBadge = ({ type }) => {
  const styles = {
    'IN PROGRESS': 'bg-[#fefce8] border border-[#fde047] text-[#eab308]',
    'COMPLETED': 'bg-[#eff6ff] border border-[#93c5fd] text-[#3b82f6]',
    'UNASSIGNED': 'bg-[#fdf2f8] border border-[#f9a8d4] text-[#ec4899]',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>{type}</span>;
};

const CreatedByMeTableRow = ({ ticket, index }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(ticket.assignedTo);
  const openUpwards = index >= 5;

  return (
    <div className="grid grid-cols-[1.2fr_2fr_1fr_1.5fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-4 px-6 border-b border-gray-100 items-center text-[13px] bg-white hover:bg-[#ebf5ff] transition-colors duration-200 cursor-pointer h-[36px] overflow-visible">
      <div className="text-gray-600 font-medium whitespace-nowrap text-left leading-none">{ticket.id}</div>
      <div className="text-gray-800 truncate pr-2 text-left leading-none">{ticket.customer}</div>
      <div className="flex justify-start items-center leading-none"><CategoryBadge type={ticket.category} /></div>
      <div className="relative overflow-visible">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className="flex items-center gap-1.5 text-gray-800 font-medium hover:text-blue-600 transition-colors"
        >
          <UserPlus size={16} className="text-gray-800" />
          <span className="text-[13px]">{currentAgent}</span>
          <ChevronDown size={14} className={`ml-0.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showDropdown && (
          <AgentDropdown 
            currentAgent={currentAgent}
            onSelect={(agent) => setCurrentAgent(agent)}
            onClose={() => setShowDropdown(false)}
            openUpwards={openUpwards}
          />
        )}
      </div>
      <div className="text-gray-600 text-left leading-none">{ticket.assignedLob}</div>
      <div className="text-gray-600 text-xs text-left leading-none">{ticket.assignedOn}</div>
      <div className="text-gray-600 text-xs text-left leading-none">{ticket.sla}</div>
      <div className="flex justify-start items-center leading-none"><StatusBadge type={ticket.status} /></div>
    </div>
  );
};

export default CreatedByMeTableRow;
