import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, CheckCircle2, Info, RefreshCw, AlertTriangle, Calendar } from 'lucide-react';

const MetricCard = ({ title, value, hasInfo, isBlue }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-1 flex-1 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
      {title}
      {hasInfo && <Info size={12} className="text-gray-300" />}
    </div>
    <div className={`text-[32px] font-bold leading-none mt-1 tracking-tight ${isBlue ? 'text-[#0061ff]' : 'text-gray-900'}`}>{value}</div>
  </div>
);

const TimePill = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-lg text-[13px] font-semibold transition-all duration-200 border whitespace-nowrap ${
      active 
        ? 'bg-[#0061ff] text-white border-[#0061ff] shadow-sm shadow-blue-100' 
        : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-500'
    }`}
  >
    {label}
  </button>
);

const CustomDatePicker = ({ onClose }) => (
  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 p-4 w-[400px] animate-in fade-in slide-in-from-top-2 duration-200">
    <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-2">
      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
        <Calendar size={16} className="text-[#0061ff]" />
        Select Custom Range
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider">Close</button>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">From Date</label>
        <input type="date" className="w-full px-3 py-2 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To Date</label>
        <input type="date" className="w-full px-3 py-2 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400" />
      </div>
    </div>
    <button className="w-full mt-4 py-2 bg-[#0061ff] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-600 transition-colors">Apply Range</button>
  </div>
);

const agentData = [
  { name: 'Satya Narayan Panda', productivity: 20, breakTime: '14:20', loginHours: '09:00 AM - 05:00 PM', aht: '13:07', qc: '87%', csat: '90%' },
  { name: 'Ankitha HM', productivity: 13, breakTime: '13:00', loginHours: '09:00 AM - 05:00 PM', aht: '13:21', qc: '85%', csat: '87%' },
  { name: 'Vishnu RR', productivity: 15, breakTime: '09:34', loginHours: '09:00 AM - 05:00 PM', aht: '13:45', qc: '87%', csat: '89%', goodPerf: true },
  { name: 'Navya GS', productivity: 14, breakTime: '05:20', loginHours: '09:00 AM - 05:00 PM', aht: '11:59', qc: '86%', csat: '80%', highlightAht: true },
  { name: 'Prashanth Kumar', productivity: 11, breakTime: '07:29', loginHours: '09:00 AM - 05:00 PM', aht: '12:36', qc: '85%', csat: '88%', highlightBreak: true },
  { name: 'Akshay Sakkrehalli', productivity: 14, breakTime: '10:01', loginHours: '09:00 AM - 05:00 PM', aht: '13:00', qc: '87%', csat: '90%' },
  { name: 'Chandana PK', productivity: 10, breakTime: '09:12', loginHours: '09:00 AM - 05:00 PM', aht: '13:10', qc: '87%', csat: '86%', highlightBreak: true },
  { name: 'Someshwar T', productivity: 12, breakTime: '06:16', loginHours: '09:00 AM - 05:00 PM', aht: '13:45', qc: '86%', csat: '87%', highlightBreak: true },
  { name: 'Brinda V', productivity: '05', breakTime: '19:35', loginHours: '09:00 AM - 05:00 PM', aht: '25:10', qc: '50%', csat: '23%', critical: true },
  { name: 'Mahesh Acharya', productivity: 12, breakTime: '14:57', loginHours: '09:00 AM - 05:00 PM', aht: '14:02', qc: '85%', csat: '85%' },
];

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('Team');
  const [activeTimeRange, setActiveTimeRange] = useState('Today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleTimeRangeClick = (range) => {
    setActiveTimeRange(range);
    if (range === 'Custom') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const timePills = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Last month', 'Custom'];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto px-10 py-6 animate-in fade-in duration-500">
      {/* Title Area - Reduced margin-bottom */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Performance Dashboard</h1>
      </div>

      {/* Toggles & Filters Row - Reduced spacing and aligned with title */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center justify-end pr-1 mb-[2px]">
          <div className="flex items-center gap-1 text-[#22c55e] font-bold text-[10px] tracking-wide uppercase">
            <CheckCircle2 size={12} strokeWidth={3} />
            <span>Last updated now</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex bg-[#f1f3f4] p-1 rounded-xl relative overflow-hidden">
            {/* Sliding Background */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0061ff] rounded-lg shadow-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                activeTab === 'Team' ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            
            <button 
              onClick={() => setActiveTab('Team')}
              className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${
                activeTab === 'Team' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Team Performance
            </button>
            <button 
              onClick={() => setActiveTab('TL')}
              className={`px-6 py-1.5 rounded-lg text-[13px] font-bold transition-colors duration-300 relative z-10 ${
                activeTab === 'TL' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              TL-wise Performance
            </button>
          </div>
          
          <div className="flex items-center gap-1.5 relative">
            {timePills.map(label => (
              <TimePill 
                key={label} 
                label={label} 
                active={activeTimeRange === label} 
                onClick={() => handleTimeRangeClick(label)}
              />
            ))}
            {showDatePicker && activeTimeRange === 'Custom' && (
              <CustomDatePicker onClose={() => setShowDatePicker(false)} />
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div key={activeTab} className="flex gap-4 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <MetricCard title="TOTAL TICKETS" value="100" isBlue />
        <MetricCard title="AVG HANDLING TIME" value="15m 23s" hasInfo />
        <MetricCard title="ESCALATIONS" value="20" />
        <MetricCard title="CUSTOMER SATISFACTION" value="87%" hasInfo />
        <MetricCard title="SLA BREACH RATE" value="10%" hasInfo />
      </div>

      {/* Search Bar Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-[340px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a specific team member"
            className="w-full pl-11 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-400 shadow-sm"
          />
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2.5 text-blue-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm ml-auto active:scale-95 transition-transform"
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Table Container */}
      <div key={`table-${activeTab}`} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col mb-10 animate-in fade-in duration-700">
        {/* Table Header */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] bg-[#f8f9fa] border-b border-gray-100 px-6 py-2.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
          <div>AGENT NAME</div>
          <div className="text-center">PRODUCTIVITY</div>
          <div className="text-center">BREAK TIME</div>
          <div className="text-center">LOGIN HOURS</div>
          <div className="text-center">AHT</div>
          <div className="text-center">QC</div>
          <div className="text-center">CSAT</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {agentData.map((agent, i) => (
            <div 
              key={i}
              className={`grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] px-6 h-[36px] items-center border-b border-gray-50 text-[13px] transition-colors duration-150 cursor-pointer ${
                agent.critical ? 'bg-red-50/40 hover:bg-red-50/60' : 'bg-white hover:bg-[#ebf5ff]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-gray-800 text-left truncate leading-none">
                {agent.name}
                {agent.critical && <AlertTriangle size={14} className="text-red-500 shrink-0 fill-red-500/10" />}
              </div>
              
              <div className={`text-center font-bold leading-none ${
                agent.critical ? 'text-[#ef4444]' : 
                agent.productivity >= 15 ? 'text-[#22c55e]' : 'text-gray-600'
              }`}>
                {agent.productivity}
              </div>
              
              <div className={`text-center font-medium leading-none ${
                agent.critical ? 'text-[#ef4444]' :
                agent.highlightBreak ? 'text-[#22c55e]' : 'text-gray-400'
              }`}>
                {agent.breakTime}
              </div>
              
              <div className="text-center text-gray-400 text-[11px] font-semibold uppercase leading-none">{agent.loginHours}</div>
              
              <div className={`text-center font-medium leading-none ${
                agent.critical ? 'text-[#ef4444]' :
                agent.highlightAht ? 'text-[#22c55e]' : 'text-gray-400'
              }`}>
                {agent.aht}
              </div>
              
              <div className={`text-center font-bold leading-none ${
                agent.critical ? 'text-[#ef4444]' : 
                parseInt(agent.qc) >= 85 ? 'text-[#22c55e]' : 'text-gray-600'
              }`}>
                {agent.qc}
              </div>
              
              <div className={`text-center font-bold leading-none ${
                agent.critical ? 'text-[#ef4444]' : 
                parseInt(agent.csat) >= 85 ? 'text-[#22c55e]' : 'text-gray-600'
              }`}>
                {agent.csat}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-gray-50 flex items-center justify-end">
          <div className="flex items-center gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-tight">
            <span className="text-gray-400">Total 5 items</span>
            <div className="flex items-center gap-2">
              <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100"><ChevronDown size={14} className="rotate-90" /></button>
              <button className="w-6 h-6 bg-[#0061ff] text-white rounded-md flex items-center justify-center font-extrabold text-xs shadow-sm">1</button>
              <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100"><ChevronDown size={14} className="-rotate-90" /></button>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 ml-2">
              <span className="text-gray-600">10 / page</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
