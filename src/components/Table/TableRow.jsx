import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, UserPlus, User, ChevronDown } from 'lucide-react';
import AgentDropdown from './AgentDropdown';

const Badge = ({ type }) => {
  const styles = {
    REFUND: 'bg-[#f4e8ff] border border-[#d8b4fe] text-[#9333ea]',
    INFO: 'bg-[#ecfdf5] border border-[#6ee7b7] text-[#10b981]',
    STATUS: 'bg-[#fefce8] border border-[#fde047] text-[#eab308]',
  };
  
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>
      {type}
    </span>
  );
};

const ChannelIcon = ({ type }) => {
  switch(type) {
    case 'mail': return <Mail size={18} className="text-blue-500" />;
    case 'phone': return <Phone size={18} className="text-blue-500" />;
    case 'chat': return <MessageSquare size={18} className="text-blue-500" />;
    default: return null;
  }
};

const AssignedTo = ({ assignee, openUpwards }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(assignee.unassigned ? null : assignee.name);

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className={`flex items-center gap-1.5 transition-colors ${
          !currentAgent ? 'text-gray-400 hover:text-gray-600' : 
          currentAgent === 'Goutham GS' ? 'text-blue-500 font-medium' : 'text-gray-800 font-medium'
        }`}
      >
        <UserPlus size={16} className={currentAgent === 'Goutham GS' ? 'text-blue-500' : currentAgent ? 'text-gray-800' : 'text-gray-400'} />
        <span className="text-[13px]">{currentAgent || 'Assign to...'}</span>
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
  );
};

const TableRow = ({ ticket, index }) => {
  const openUpwards = index >= 5; // Open upwards for the last few rows to stay inside the card

  return (
    <div className="grid grid-cols-[1.2fr_2fr_0.8fr_4fr_1fr_0.8fr_1.5fr] gap-4 px-6 border-b border-gray-100 items-center text-[13px] bg-white hover:bg-[#ebf5ff] transition-colors duration-200 cursor-pointer h-[36px] overflow-visible">
      <div className="text-gray-600 font-medium whitespace-nowrap text-left leading-none">{ticket.id}</div>
      <div className="text-gray-800 truncate pr-2 text-left leading-none">{ticket.customer}</div>
      <div className="flex justify-start items-center"><ChannelIcon type={ticket.channel} /></div>
      <div className="text-gray-700 truncate pr-4">{ticket.subject}</div>
      <div><Badge type={ticket.category} /></div>
      <div className="text-gray-800">{ticket.wait}</div>
      <div className="overflow-visible"><AssignedTo assignee={ticket.assignee} openUpwards={openUpwards} /></div>
    </div>
  );
};

export default TableRow;
