import React, { useState } from 'react';
import CompletedByMeTableRow from './CompletedByMeTableRow';
import Pagination from './Pagination';
import { Info } from 'lucide-react';

const completedByMeTicketsData = [
  { id: 'TCK1234BCG', customer: 'Satya Narayan Panda', category: 'REFUND', assignedOn: '24/04/26 10:15', completedOn: '24/04/26 12:15', sla: '25/04/26 10:15', qc: '85%', csat: '87%' },
  { id: 'TCK1234BCH', customer: 'Ankitha HM', category: 'REFUND', assignedOn: '24/04/26 10:15', completedOn: '24/04/26 12:15', sla: '25/04/26 10:15', qc: '80%', csat: '80%' },
  { id: 'TCK1234BCI', customer: 'Vishnu RR', category: 'INFO', assignedOn: '24/04/26 10:15', completedOn: '24/04/26 12:15', sla: '25/04/26 10:15', qc: '81%', csat: '83%' },
  { id: 'TCK1234BCJ', customer: 'Navya GS', category: 'STATUS', assignedOn: '24/04/26 10:20', completedOn: '24/04/26 12:20', sla: '25/04/26 10:20', qc: '87%', csat: '82%' },
  { id: 'TCK1234BCK', customer: 'Prashanth Kumar', category: 'INFO', assignedOn: '24/04/26 10:20', completedOn: '24/04/26 12:20', sla: '25/04/26 10:20', qc: '88%', csat: '87%' },
  { id: 'TCK1234BCL', customer: 'Akshay Sakkrehalli', category: 'REFUND', assignedOn: '24/04/26 10:23', completedOn: '24/04/26 12:23', sla: '25/04/26 10:23', qc: '65%', csat: '84%' },
  { id: 'TCK1234BCM', customer: 'Chandana PK', category: 'INFO', assignedOn: '24/04/26 10:23', completedOn: '24/04/26 12:23', sla: '25/04/26 10:23', qc: '87%', csat: '85%' },
  { id: 'TCK1234BCN', customer: 'Someshwar T', category: 'STATUS', assignedOn: '24/04/26 10:25', completedOn: '24/04/26 12:25', sla: '25/04/26 10:25', qc: '78%', csat: '79%' },
  { id: 'TCK1234BCO', customer: 'Brinda V', category: 'REFUND', assignedOn: '24/04/26 10:25', completedOn: '24/04/26 12:25', sla: '25/04/26 10:25', qc: '80%', csat: '85%' },
  { id: 'TCK1234BCP', customer: 'Mahesh Acharya', category: 'REFUND', assignedOn: '24/04/26 10:26', completedOn: '24/04/26 12:26', sla: '25/04/26 10:26', qc: '77%', csat: '69%' },
];

const CompletedByMeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = completedByMeTicketsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_2.5fr_1.2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none">ID</div>
        <div className="uppercase text-left leading-none">Customer Name</div>
        <div className="uppercase text-left leading-none">Category</div>
        <div className="uppercase text-left leading-none">Assigned On</div>
        <div className="uppercase text-left leading-none">Completed On</div>
        <div className="uppercase text-left leading-none">SLA</div>
        <div className="uppercase flex items-center gap-1 text-left leading-none">
          QC <Info size={12} className="text-gray-400" />
        </div>
        <div className="uppercase flex items-center gap-1 text-left leading-none">
          CSAT <Info size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-hidden">
        {currentTickets.map((ticket) => (
          <CompletedByMeTableRow key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={completedByMeTicketsData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default CompletedByMeTable;
