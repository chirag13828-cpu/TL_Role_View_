import React, { useState } from 'react';
import CompletedTableRow from './CompletedTableRow';
import Pagination from './Pagination';
import { Info } from 'lucide-react';

const completedTicketsData = [
  { id: 'TCK1234BCG', customer: 'Satya Narayan Panda', channel: 'mail', category: 'REFUND', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:15', resolvedOn: '24/04/26 12:15', trt: '02:00:00' },
  { id: 'TCK1234BCH', customer: 'Ankitha HM', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:15', resolvedOn: '24/04/26 12:15', trt: '02:00:00' },
  { id: 'TCK1234BCI', customer: 'Vishnu RR', channel: 'phone', category: 'INFO', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:15', resolvedOn: '24/04/26 12:15', trt: '02:00:00' },
  { id: 'TCK1234BCJ', customer: 'Navya GS', channel: 'chat', category: 'STATUS', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:20', resolvedOn: '24/04/26 12:20', trt: '02:00:00' },
  { id: 'TCK1234BCK', customer: 'Prashanth Kumar', channel: 'phone', category: 'INFO', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:20', resolvedOn: '24/04/26 12:20', trt: '02:00:00' },
  { id: 'TCK1234BCL', customer: 'Akshay Sakkrehalli', channel: 'mail', category: 'REFUND', assignedTo: 'Anusha YP', assignedOn: '24/04/26 10:23', resolvedOn: '24/04/26 12:23', trt: '02:00:00' },
  { id: 'TCK1234BCM', customer: 'Chandana PK', channel: 'phone', category: 'INFO', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:23', resolvedOn: '24/04/26 12:23', trt: '02:00:00' },
  { id: 'TCK1234BCN', customer: 'Someshwar T', channel: 'chat', category: 'STATUS', assignedTo: 'Anusha YP', assignedOn: '24/04/26 10:25', resolvedOn: '24/04/26 12:25', trt: '02:00:00' },
  { id: 'TCK1234BCO', customer: 'Brinda V', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:25', resolvedOn: '24/04/26 12:25', trt: '02:00:00' },
  { id: 'TCK1234BCP', customer: 'Mahesh Acharya', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:26', resolvedOn: '24/04/26 12:26', trt: '02:00:00' },
];

const CompletedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = completedTicketsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_2fr_0.8fr_1fr_1.5fr_1.2fr_1.2fr_1fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none flex items-center">ID</div>
        <div className="uppercase text-left leading-none flex items-center">Customer Name</div>
        <div className="uppercase text-left leading-none flex items-center">Channel</div>
        <div className="uppercase text-left leading-none flex items-center">Category</div>
        <div className="uppercase text-left leading-none flex items-center">Assigned To</div>
        <div className="uppercase text-left leading-none flex items-center">Assigned On</div>
        <div className="uppercase text-left leading-none flex items-center">Resolved On</div>
        <div className="uppercase flex items-center gap-1 text-left leading-none flex items-center">
          TRT <Info size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-visible">
        {currentTickets.map((ticket, index) => (
          <CompletedTableRow key={ticket.id} ticket={ticket} index={index} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={completedTicketsData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default CompletedTable;
