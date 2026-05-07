import React from 'react';

const StatusDot = ({ status }) => {
  let bgColor = '';
  if (status === 'active') bgColor = 'bg-[#22c55e]';
  else if (status === 'break') bgColor = 'bg-[#ef4444]';
  else if (status === 'offline') bgColor = 'bg-[#9ca3af]';

  return (
    <div className="flex justify-center w-full">
      <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
    </div>
  );
};

const TeamTableRow = ({ member, isEven }) => {
  return (
    <div 
      className={`grid gap-4 px-6 border-b border-gray-100 items-center text-[13px] transition-colors duration-200 cursor-pointer h-[36px] ${isEven ? 'bg-[#f9fafb]' : 'bg-white'} hover:bg-[#ebf5ff]`}
      style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr' }}
    >
      <div className="text-gray-800 font-medium truncate pr-2 text-left leading-none">{member.name}</div>
      <div className="text-gray-600 text-left leading-none">{member.availableSince}</div>
      <div className="text-gray-600 text-left leading-none">{member.breakSince}</div>
      <div className="text-gray-600 text-left leading-none">{member.loginTime}</div>
      <div className="flex justify-center items-center leading-none">
        <StatusDot status={member.status} />
      </div>
      <div className="text-gray-600 text-left leading-none">{member.currentTickets}</div>
      <div className="text-gray-600 text-left leading-none">{member.productivity}</div>
    </div>
  );
};

export default TeamTableRow;
