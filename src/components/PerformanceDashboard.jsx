import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, ChevronDown, CheckCircle2, Info, RefreshCw, AlertTriangle, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const MetricCard = ({ title, value, hasInfo, isBlue }) => (
  <div className={`border border-gray-100 rounded-xl p-4 flex flex-col gap-1 flex-1 shadow-sm transition-all duration-300 relative cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-95 ${isBlue ? 'bg-[#ebf5ff] border-[#d0e7ff]' : 'bg-white hover:border-gray-200'}`}>
    <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${isBlue ? 'text-[#0061ff]' : 'text-gray-400'}`}>
      {title}
      {hasInfo && <Info size={12} className={isBlue ? 'text-[#0061ff]/60' : 'text-gray-300'} />}
    </div>
    <div className={`text-[32px] font-bold leading-none mt-1 tracking-tight ${isBlue ? 'text-[#0061ff]' : 'text-gray-900'}`}>{value}</div>
  </div>
);

const ModernCalendar = ({ onSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDay = (month, year) => new Date(year, month, 1).getDay();
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  const days = [];
  for (let i = 0; i < startDay(month, year); i++) days.push(null);
  for (let i = 1; i <= daysInMonth(month, year); i++) days.push(i);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-b border-gray-100">
        <button onClick={(e) => { e.stopPropagation(); setCurrentDate(new Date(year, month - 1)); }} className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-[#0061ff]">
          <ChevronLeft size={14} />
        </button>
        <span className="text-[11px] font-bold text-gray-700 tracking-wide">{months[month]} {year}</span>
        <button onClick={(e) => { e.stopPropagation(); setCurrentDate(new Date(year, month + 1)); }} className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-[#0061ff]">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-7 mb-1.5">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d} className="text-center text-[9px] font-bold text-gray-300 py-1 uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const dateStr = d ? `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null;
            const isSelected = dateStr && selectedDate === dateStr;
            return (
              <button
                key={i}
                disabled={!d}
                onClick={(e) => { e.stopPropagation(); onSelect(dateStr); }}
                className={`text-[11px] h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                  !d ? 'opacity-0 pointer-events-none' : 
                  isSelected ? 'bg-[#0061ff] text-white font-bold shadow-md scale-105' : 
                  'text-gray-600 hover:bg-blue-50 hover:text-[#0061ff]'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CustomDatePickerPopover = ({ triggerRef, onApply, onCancel }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selecting, setSelecting] = useState('from');
  const [coords, setCoords] = useState(null);
  const popoverRef = useRef(null);

  useLayoutEffect(() => {
    if (triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportPadding = 16;
      
      let top = triggerRect.top;
      let left = triggerRect.left - popoverRect.width - 12;

      const spaceBelow = window.innerHeight - triggerRect.top - viewportPadding;
      const spaceAbove = triggerRect.bottom - viewportPadding;

      if (spaceBelow < popoverRect.height && spaceAbove > popoverRect.height) {
        top = triggerRect.bottom - popoverRect.height;
      }

      if (top + popoverRect.height > window.innerHeight - viewportPadding) {
        top = window.innerHeight - popoverRect.height - viewportPadding;
      }
      if (top < viewportPadding) {
        top = viewportPadding;
      }

      if (left < viewportPadding) {
        left = triggerRect.right + 12;
      }
      if (left + popoverRect.width > window.innerWidth - viewportPadding) {
        left = window.innerWidth - popoverRect.width - viewportPadding;
      }

      setCoords({ top, left });
    }
  }, [triggerRef]);

  const content = (
    <div 
      ref={popoverRef}
      id="custom-picker-portal"
      style={{ 
        position: 'fixed', 
        top: coords ? coords.top : 0, 
        left: coords ? coords.left : 0,
        zIndex: 9999,
        visibility: coords ? 'visible' : 'hidden',
        opacity: coords ? 1 : 0
      }}
      className={`w-[280px] bg-white border border-gray-100 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] p-3 cursor-default transition-opacity duration-500 ${coords ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-50 px-1">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#0061ff]" />
          <span className="text-[12px] font-bold text-gray-800">Custom Range</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onCancel(); }} className="p-1 hover:bg-gray-50 rounded-lg text-gray-400"><X size={14} /></button>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <div 
            onClick={(e) => { e.stopPropagation(); setSelecting('from'); }}
            className={`flex-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
              selecting === 'from' ? 'border-[#0061ff] bg-blue-50/40 shadow-sm' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <div className="text-[8px] font-extrabold text-gray-400 uppercase mb-0.5">From</div>
            <div className={`text-[10px] font-bold ${fromDate ? 'text-gray-800' : 'text-gray-400 italic'}`}>
              {fromDate || 'Select date'}
            </div>
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); setSelecting('to'); }}
            className={`flex-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
              selecting === 'to' ? 'border-[#0061ff] bg-blue-50/40 shadow-sm' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <div className="text-[8px] font-extrabold text-gray-400 uppercase mb-0.5">To</div>
            <div className={`text-[10px] font-bold ${toDate ? 'text-gray-800' : 'text-gray-400 italic'}`}>
              {toDate || 'Select date'}
            </div>
          </div>
        </div>

        <div className="border border-gray-50 rounded-xl bg-gray-50/10 shadow-inner">
          <ModernCalendar 
            selectedDate={selecting === 'from' ? fromDate : toDate}
            onSelect={(date) => {
              if (selecting === 'from') {
                setFromDate(date);
                setSelecting('to');
              } else {
                setToDate(date);
              }
            }}
          />
        </div>

        <div className="px-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onApply(fromDate, toDate); }}
            disabled={!fromDate || !toDate}
            className={`w-full py-2.5 rounded-xl text-[12px] font-bold shadow-md transition-all ${
              !fromDate || !toDate ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0061ff] text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

const agentData = [
  { name: 'Satya Narayan Panda', productivity: 20, breakTime: '14:20', loginHours: '09:00 AM - 05:00 PM', aht: '13:07', qc: '87%', csat: '90%', goodQC: true, goodCSAT: true, goodProd: true },
  { name: 'Ankitha HM', productivity: 13, breakTime: '13:00', loginHours: '09:00 AM - 05:00 PM', aht: '13:21', qc: '85%', csat: '87%', goodQC: true, goodCSAT: true },
  { name: 'Vishnu RR', productivity: 15, breakTime: '09:34', loginHours: '09:00 AM - 05:00 PM', aht: '13:45', qc: '87%', csat: '89%', goodQC: true, goodCSAT: true, goodProd: true, goodBreak: true },
  { name: 'Navya GS', productivity: 14, breakTime: '05:20', loginHours: '09:00 AM - 05:00 PM', aht: '11:59', qc: '86%', csat: '80%', goodQC: true, goodCSAT: true, goodAHT: true, goodBreak: true },
  { name: 'Prashanth Kumar', productivity: 11, breakTime: '07:29', loginHours: '09:00 AM - 05:00 PM', aht: '12:36', qc: '85%', csat: '88%', goodQC: true, goodCSAT: true, goodBreak: true },
  { name: 'Akshay Sakkrehalli', productivity: 14, breakTime: '10:01', loginHours: '09:00 AM - 05:00 PM', aht: '13:00', qc: '87%', csat: '90%', goodQC: true, goodCSAT: true },
  { name: 'Chandana PK', productivity: 10, breakTime: '09:12', loginHours: '09:00 AM - 05:00 PM', aht: '13:10', qc: '87%', csat: '86%', goodQC: true, goodCSAT: true, goodBreak: true },
  { name: 'Someshwar T', productivity: 12, breakTime: '06:16', loginHours: '09:00 AM - 05:00 PM', aht: '13:45', qc: '86%', csat: '87%', goodQC: true, goodCSAT: true, goodBreak: true },
];

const tlData = [
  { name: 'Rajesh Kumar', productivity: 18, breakTime: '12:20', loginHours: '09:00 AM - 05:00 PM', aht: '12:07', qc: '89%', csat: '92%', goodQC: true, goodCSAT: true, goodProd: true },
  { name: 'Sneha Patil', productivity: 15, breakTime: '11:00', loginHours: '09:00 AM - 05:00 PM', aht: '13:01', qc: '88%', csat: '85%', goodQC: true, goodCSAT: true },
  { name: 'Amit Singh', productivity: 16, breakTime: '10:34', loginHours: '09:00 AM - 05:00 PM', aht: '12:45', qc: '90%', csat: '88%', goodQC: true, goodCSAT: true, goodProd: true },
  { name: 'Megha S', productivity: 14, breakTime: '08:20', loginHours: '09:00 AM - 05:00 PM', aht: '11:29', qc: '87%', csat: '82%', goodQC: true, goodCSAT: true, goodAHT: true },
];

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('Team');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Today');
  const dropdownRef = useRef(null);
  const customTriggerRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
      const isInsidePortal = event.target.closest('#custom-picker-portal');
      
      if (!isInsideDropdown && !isInsidePortal) {
        setShowFilterDropdown(false);
        setShowCustomDate(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last month", "Custom"];

  const handleApplyCustomRange = (from, to) => {
    setSelectedRange(`${from} to ${to}`);
    setShowFilterDropdown(false);
    setShowCustomDate(false);
  };

  const rawData = activeTab === 'Team' ? agentData : tlData;
  const currentData = rawData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-white px-10 py-6 animate-in fade-in duration-500 absolute inset-0 overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none">Performance Dashboard</h1>
      </div>
      <div className="h-[1px] bg-gray-100 w-full mb-4" />

      <div className="flex items-center justify-between mb-4 relative z-[100]">
        <div className="flex bg-[#f1f3f4] p-1 rounded-xl relative">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0061ff] rounded-lg shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeTab === 'Team' ? 'translate-x-0' : 'translate-x-full'}`} />
          <button onClick={() => { setActiveTab('Team'); setSearchQuery(''); }} className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${activeTab === 'Team' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>Team Performance</button>
          <button onClick={() => { setActiveTab('TL'); setSearchQuery(''); }} className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${activeTab === 'TL' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>TL-wise Performance</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[#22c55e] font-bold text-[10px] tracking-wide uppercase leading-none">
            <CheckCircle2 size={12} strokeWidth={3} />
            <span>Last updated now</span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-[#0061ff] hover:bg-gray-50 transition-colors shadow-sm h-8 min-w-[120px] justify-between">
              <span className="truncate max-w-[150px]">{selectedRange}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-[150] py-1.5 animate-in fade-in">
                {filterOptions.map((opt) => (
                  <div 
                    key={opt}
                    ref={opt === 'Custom' ? customTriggerRef : null}
                    onMouseEnter={() => {
                      if (opt === 'Custom') setShowCustomDate(true);
                      else setShowCustomDate(false);
                    }}
                    onClick={(e) => {
                      if (opt !== 'Custom') {
                        setSelectedRange(opt);
                        setShowFilterDropdown(false);
                        setShowCustomDate(false);
                      }
                    }}
                    className={`px-4 py-2.5 text-[13px] font-medium cursor-pointer flex items-center justify-between transition-colors relative ${selectedRange === opt ? 'bg-blue-50 text-[#0061ff]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opt}
                    {opt === 'Custom' && <ChevronLeft size={14} className="text-gray-400" />}
                  </div>
                ))}
              </div>
            )}
            
            {showCustomDate && showFilterDropdown && (
              <CustomDatePickerPopover 
                triggerRef={customTriggerRef}
                onApply={handleApplyCustomRange}
                onCancel={() => {
                  setShowCustomDate(false);
                  setShowFilterDropdown(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div key={activeTab} className="flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 relative z-10">
        <MetricCard title="TOTAL TICKETS" value={activeTab === 'Team' ? "100" : "450"} isBlue hasInfo />
        <MetricCard title="AVG HANDLING TIME" value={activeTab === 'Team' ? "15m 23s" : "12m 45s"} hasInfo />
        <MetricCard title="ESCALATIONS" value={activeTab === 'Team' ? "20" : "12"} />
        <MetricCard title="CUSTOMER SATISFACTION" value={activeTab === 'Team' ? "87%" : "90%"} hasInfo />
        <MetricCard title="SLA BREACH RATE" value={activeTab === 'Team' ? "10%" : "5%"} hasInfo />
      </div>

      <div className="flex items-center gap-3 mb-2 relative z-10">
        <div className="relative w-[300px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search for a specific ${activeTab === 'Team' ? 'team member' : 'TL'}`} 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-400 shadow-sm" 
          />
        </div>
        <button onClick={handleRefresh} className="p-2 text-blue-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm ml-auto active:scale-95 transition-transform"><RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} /></button>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-0 relative z-0">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr] bg-[#f8f9fa] border-b border-gray-100 px-6 h-[32px] items-center text-[10px] font-extrabold text-gray-500 uppercase tracking-wider shrink-0">
          <div>{activeTab === 'Team' ? 'AGENT NAME' : 'TL NAME'}</div>
          <div className="text-center">PRODUCTIVITY</div>
          <div className="text-center">BREAK TIME</div>
          <div className="text-center">LOGIN HOURS</div>
          <div className="text-center">AHT</div>
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          {currentData.length > 0 ? (
            currentData.map((agent, i) => (
              <div key={i} className={`grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr] px-6 h-[36px] items-center border-b border-gray-50 text-[13px] transition-colors duration-150 cursor-pointer ${i % 2 !== 0 ? 'bg-gray-50/40' : 'bg-white'} hover:bg-[#ebf5ff] shrink-0`}>
                <div className="flex items-center gap-2 font-bold text-gray-800 text-left truncate leading-none">{agent.name}{agent.critical && <AlertTriangle size={14} className="text-red-500 shrink-0" />}</div>
                <div className={`text-center font-bold leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodProd ? 'text-[#22c55e]' : 'text-gray-600'}`}>{agent.productivity}</div>
                <div className={`text-center font-medium leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodBreak ? 'text-[#22c55e]' : 'text-gray-400'}`}>{agent.breakTime}</div>
                <div className="text-center text-gray-400 text-[11px] font-semibold leading-none">{agent.loginHours}</div>
                <div className={`text-center font-medium leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodAHT ? 'text-[#22c55e]' : 'text-gray-400'}`}>{agent.aht}</div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
              <p className="text-sm font-medium">No results found for "{searchQuery}"</p>
              <p className="text-xs italic">Try a different search term</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-tight pr-4 h-[40px] bg-white border-t border-gray-50 shrink-0">
          <span className="text-gray-400">Total {currentData.length} items</span>
          <div className="flex items-center gap-2">
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-blue-500"><ChevronDown size={14} className="rotate-90" /></button>
            <button className="w-6 h-6 bg-[#0061ff] text-white rounded flex items-center justify-center font-extrabold text-xs shadow-sm">1</button>
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-blue-500"><ChevronDown size={14} className="-rotate-90" /></button>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-2 py-1 rounded-lg ml-2">
            <span className="text-gray-600">10 / page</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
