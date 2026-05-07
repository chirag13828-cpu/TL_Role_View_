import React, { useState } from 'react';
import TeamTableRow from './TeamTableRow';
import Pagination from './Pagination';
import { Info } from 'lucide-react';

const teamData = [
  { id: 1, name: 'Satya Narayan Panda', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '20' },
  { id: 2, name: 'Ankitha HM', availableSince: '12:47 AM', breakSince: '12:47 AM', loginTime: '10:04 AM', status: 'break', currentTickets: '30', productivity: '10' },
  { id: 3, name: 'Vishnu RR', availableSince: '10:17 AM', breakSince: '10:17 AM', loginTime: '09:15 AM', status: 'offline', currentTickets: '00', productivity: '--' },
  { id: 4, name: 'Navya GS', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '10' },
  { id: 5, name: 'Prashanth Kumar', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '07' },
  { id: 6, name: 'Akshay Sakkrehalli', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '15' },
  { id: 7, name: 'Chandana PK', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '12' },
  { id: 8, name: 'Someshwar T', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '13' },
  { id: 9, name: 'Brinda V', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '10' },
  { id: 10, name: 'Mahesh Acharya', availableSince: '08:47 AM', breakSince: '08:47 AM', loginTime: '08:47 AM', status: 'active', currentTickets: '06', productivity: '13' },
];

const TeamTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = teamData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div 
        className="grid gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr' }}
      >
        <div className="uppercase text-left leading-none">Team Member</div>
        <div className="uppercase text-left leading-none">Available Since</div>
        <div className="uppercase text-left leading-none">Break Since</div>
        <div className="uppercase text-left leading-none">Login Time</div>
        <div className="uppercase text-center leading-none">Status</div>
        <div className="uppercase text-left leading-none">Current Tickets</div>
        <div className="uppercase flex items-center justify-start gap-1 text-left leading-none">
          Productivity <Info size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-hidden">
        {currentMembers.map((member, index) => (
          <TeamTableRow key={member.id} member={member} isEven={index % 2 !== 0} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={teamData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default TeamTable;
