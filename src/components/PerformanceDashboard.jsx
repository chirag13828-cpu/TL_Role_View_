import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, CheckCircle2, Info, RefreshCw, AlertTriangle, Calendar, ChevronLeft } from 'lucide-react';

const MetricCard = ({ title, value, hasInfo, isBlue }) => {
  return (
    <div 
      className={`border border-gray-100 rounded-xl p-4 flex flex-col gap-1 flex-1 shadow-sm transition-all duration-300 relative cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-95 ${
        isBlue ? 'bg-[#ebf5ff] border-[#d0e7ff]' : 'bg-white hover:border-gray-200'
      }`}
    >
      <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${isBlue ? 'text-[#0061ff]' : 'text-gray-400'}`}>
        {title}
        {hasInfo && (
          <div className="relative cursor-help">
            <Info size={12} className={isBlue ? 'text-[#0061ff]/60' : 'text-gray-300'} />
          </div>
        )}
      </div>
      <div className={`text-[32px] font-bold leading-none mt-1 tracking-tight ${isBlue ? 'text-[#0061ff]' : 'text-gray-900'}`}>{value}</div>
    </div>
  );
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

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('Team');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Today');
  const dropdownRef = useRef(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
        setShowCustomDate(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions = ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Last month", "Custom"];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-10 py-6 animate-in fade-in duration-500 absolute inset-0">
      {/* Title Area */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none">Performance Dashboard</h1>
      </div>

      <div className="h-[1px] bg-gray-100 w-full mb-4" />

      {/* Tabs & Filters Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-[#f1f3f4] p-1 rounded-xl relative">
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0061ff] rounded-lg shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeTab === 'Team' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          <button onClick={() => setActiveTab('Team')} className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${activeTab === 'Team' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>Team Performance</button>
          <button onClick={() => setActiveTab('TL')} className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${activeTab === 'TL' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>TL-wise Performance</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[#22c55e] font-bold text-[10px] tracking-wide uppercase leading-none">
            <CheckCircle2 size={12} strokeWidth={3} />
            <span>Last updated now</span>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-[#0061ff] hover:bg-gray-50 transition-colors shadow-sm h-8 min-w-[100px] justify-between"
            >
              {selectedRange}
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2">
                {filterOptions.map((opt) => (
                  <div 
                    key={opt}
                    onMouseEnter={() => opt === 'Custom' && setShowCustomDate(true)}
                    onMouseLeave={() => opt === 'Custom' && setShowCustomDate(false)}
                    onClick={() => {
                      if (opt !== 'Custom') {
                        setSelectedRange(opt);
                        setShowFilterDropdown(false);
                      }
                    }}
                    className={`px-4 py-2 text-[13px] font-medium cursor-pointer flex items-center justify-between transition-colors relative ${
                      selectedRange === opt ? 'bg-blue-50 text-[#0061ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {opt}
                    {opt === 'Custom' && <ChevronLeft size={14} className="text-gray-400" />}
                    
                    {opt === 'Custom' && showCustomDate && (
                      <div className="absolute right-full top-0 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-3 animate-in fade-in slide-in-from-right-2 cursor-default z-50">
                        <div className="absolute left-full top-0 bottom-0 w-2" />
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">From Date</label>
                            <div className="relative">
                              <Calendar size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input type="date" className="w-full pl-7 pr-2 py-1 border border-gray-100 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">To Date</label>
                            <div className="relative">
                              <Calendar size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input type="date" className="w-full pl-7 pr-2 py-1 border border-gray-100 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400" />
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRange('Custom');
                              setShowFilterDropdown(false);
                            }}
                            className="w-full py-1.5 bg-[#0061ff] text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                          >
                            Apply Range
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div key={activeTab} className="flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <MetricCard title="TOTAL TICKETS" value="100" isBlue hasInfo />
        <MetricCard title="AVG HANDLING TIME" value="15m 23s" hasInfo />
        <MetricCard title="ESCALATIONS" value="20" />
        <MetricCard title="CUSTOMER SATISFACTION" value="87%" hasInfo />
        <MetricCard title="SLA BREACH RATE" value="10%" hasInfo />
      </div>

      {/* Search Bar Row */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative w-[300px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a specific team member"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-400 shadow-sm"
          />
        </div>
        <button onClick={handleRefresh} className="p-2 text-blue-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm ml-auto active:scale-95 transition-transform"><RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} /></button>
      </div>

      {/* Table Container */}
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-0">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] bg-[#f8f9fa] border-b border-gray-100 px-6 h-[32px] items-center text-[10px] font-extrabold text-gray-500 uppercase tracking-wider shrink-0">
          <div>AGENT NAME</div>
          <div className="text-center">PRODUCTIVITY</div>
          <div className="text-center">BREAK TIME</div>
          <div className="text-center">LOGIN HOURS</div>
          <div className="text-center">AHT</div>
          <div className="text-center">QC</div>
          <div className="text-center">CSAT</div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          {agentData.map((agent, i) => (
            <div key={i} className={`grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] px-6 h-[36px] items-center border-b border-gray-50 text-[13px] transition-colors duration-150 cursor-pointer ${i % 2 !== 0 ? 'bg-gray-50/40' : 'bg-white'} hover:bg-[#ebf5ff] shrink-0`}>
              <div className="flex items-center gap-2 font-bold text-gray-800 text-left truncate leading-none">{agent.name}{agent.critical && <AlertTriangle size={14} className="text-red-500 shrink-0" />}</div>
              <div className={`text-center font-bold leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodProd ? 'text-[#22c55e]' : 'text-gray-600'}`}>{agent.productivity}</div>
              <div className={`text-center font-medium leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodBreak ? 'text-[#22c55e]' : 'text-gray-400'}`}>{agent.breakTime}</div>
              <div className="text-center text-gray-400 text-[11px] font-semibold leading-none">{agent.loginHours}</div>
              <div className={`text-center font-medium leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodAHT ? 'text-[#22c55e]' : 'text-gray-400'}`}>{agent.aht}</div>
              <div className={`text-center font-bold leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodQC ? 'text-[#22c55e]' : 'text-gray-600'}`}>{agent.qc}</div>
              <div className={`text-center font-bold leading-none ${agent.critical ? 'text-[#ef4444]' : agent.goodCSAT ? 'text-[#22c55e]' : 'text-gray-600'}`}>{agent.csat}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-tight pr-4 h-[40px] bg-white border-t border-gray-50 shrink-0">
          <span className="text-gray-400">Total 5 items</span>
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
