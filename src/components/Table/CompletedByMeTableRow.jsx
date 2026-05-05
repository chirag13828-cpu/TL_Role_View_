import React from 'react';

const CategoryBadge = ({ type }) => {
  const styles = {
    REFUND: 'bg-[#f4e8ff] border border-[#d8b4fe] text-[#9333ea]',
    INFO: 'bg-[#ecfdf5] border border-[#6ee7b7] text-[#10b981]',
    STATUS: 'bg-[#fefce8] border border-[#fde047] text-[#eab308]',
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${styles[type] || ''}`}>{type}</span>;
};

const Metric = ({ value }) => {
  const num = parseInt(value, 10);
  let colorClass = 'text-gray-400';
  
  if (num >= 80) {
    colorClass = 'text-green-500';
  } else if (num < 70) {
    colorClass = 'text-red-500';
  }

  return <span className={`font-bold ${colorClass}`}>{value}</span>;
};

const CompletedByMeTableRow = ({ ticket }) => {
  return (
    <div className="grid grid-cols-[1.2fr_2.5fr_1.2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] gap-4 px-6 border-b border-gray-100 items-center text-[13px] bg-white hover:bg-[#ebf5ff] transition-colors duration-200 cursor-pointer h-[36px]">
      <div className="text-gray-600 font-medium whitespace-nowrap text-left leading-none">{ticket.id}</div>
      <div className="text-gray-800 truncate pr-2 text-left leading-none">{ticket.customer}</div>
      <div className="flex justify-start items-center leading-none"><CategoryBadge type={ticket.category} /></div>
      <div className="text-gray-600 text-xs">{ticket.assignedOn}</div>
      <div className="text-gray-600 text-xs">{ticket.completedOn}</div>
      <div className="text-gray-600 text-xs">{ticket.sla}</div>
      <div><Metric value={ticket.qc} /></div>
      <div><Metric value={ticket.csat} /></div>
    </div>
  );
};

export default CompletedByMeTableRow;
