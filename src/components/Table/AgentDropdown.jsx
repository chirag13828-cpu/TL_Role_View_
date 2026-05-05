import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Check } from 'lucide-react';

const agents = [
  'Goutham GS',
  'Madhu DL',
  'Anusha YP',
  'Satya Narayan Panda',
  'Ankitha HM',
  'Vishnu RR',
  'Navya GS',
  'Prashanth Kumar',
  'Akshay Sakkrehalli',
  'Chandana PK',
];

const AgentDropdown = ({ currentAgent, onSelect, onClose, openUpwards }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredAgents = agents.filter(agent => 
    agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      ref={dropdownRef}
      className={`absolute ${openUpwards ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-150 ring-1 ring-black/5`}
    >
      <div className="p-2 border-b border-gray-50 bg-gray-50/50">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search agents..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="max-h-60 overflow-y-auto py-1">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <button
              key={agent}
              className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center justify-between group transition-colors"
              onClick={() => {
                onSelect(agent);
                onClose();
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                  {agent.split(' ').map(n => n[0]).join('')}
                </div>
                <span className={agent === currentAgent ? 'font-bold text-blue-600' : 'text-gray-700'}>
                  {agent}
                </span>
              </div>
              {agent === currentAgent && <Check size={14} className="text-blue-600" />}
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-400 text-center italic">
            No agents found
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDropdown;
