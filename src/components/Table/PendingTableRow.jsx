import React, { useState } from 'react';
import { Mail, Phone, MessagesSquare, UserPlus, ChevronDown } from 'lucide-react';
import AgentDropdown from './AgentDropdown';

const Badge = ({ type }) => {
  const styles = {
    REFUND: 'bg-[#f4e8ff] border border-[#d8b4fe] text-[#9333ea]',
    INFO: 'bg-[#ecfdf5] border border-[#6ee7b7] text-[#10b981]',
    STATUS: 'bg-[#fefce8] border border-[#fde047] text-[#eab308]',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>{type}</span>;
};

const DispositionBadge = ({ type }) => {
  const styles = {
    QUEUED: 'bg-white border border-[#4ade80] text-[#22c55e]',
    ESCALATED: 'bg-white border border-[#f87171] text-[#ef4444]',
    INITIATED: 'bg-white border border-[#60a5fa] text-[#3b82f6]',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>{type}</span>;
};

const ChannelIcon = ({ type }) => {
  switch(type) {
    case 'mail': return <Mail size={18} className="text-blue-500" />;
    case 'phone': return <Phone size={18} className="text-blue-500" />;
    case 'chat': return <MessagesSquare size={18} className="text-blue-500" />;
    default: return null;
  }
};

const PendingTableRow = ({ ticket, index }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(ticket.assignedTo);
  const openUpwards = index >= 5;

  return (
    <div className="grid grid-cols-[1.2fr_1.8fr_0.8fr_1fr_1.5fr_1.2fr_1.2fr_0.8fr_1.2fr] gap-4 px-6 border-b border-gray-100 items-center text-[13px] bg-white hover:bg-[#ebf5ff] transition-colors duration-200 cursor-pointer h-[36px] overflow-visible">
      <div className="text-gray-600 font-medium whitespace-nowrap text-left leading-none">{ticket.id}</div>
      <div className="text-gray-800 truncate pr-2 text-left leading-none">{ticket.customer}</div>
      <div className="flex justify-start items-center"><ChannelIcon type={ticket.channel} /></div>
      <div><Badge type={ticket.category} /></div>
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
      <div className="text-gray-600 text-xs text-left leading-none">{ticket.assignedOn}</div>
      <div><DispositionBadge type={ticket.disposition} /></div>
      <div className="text-gray-800 text-left leading-none">{ticket.wait}</div>
      <div className="text-gray-600 text-xs text-left leading-none">{ticket.sla}</div>
    </div>
  );
};

export default PendingTableRow;
