import React, { useState } from 'react';
import TableRow from './TableRow';
import Pagination from './Pagination';

const ticketsData = [
  { id: 'TCK1234BCG', customer: 'Satya Narayan Panda', channel: 'mail', subject: 'Requesting a refund on my recent order due to...', category: 'REFUND', wait: '06:13', assignee: { name: 'Goutham GS' } },
  { id: 'TCK1234BCH', customer: 'Ankitha HM', channel: 'mail', subject: 'Requesting a refund on my recent order due to...', category: 'REFUND', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCI', customer: 'Vishnu RR', channel: 'phone', subject: 'Information request call', category: 'INFO', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCJ', customer: 'Navya GS', channel: 'chat', subject: 'Order status chat', category: 'STATUS', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCK', customer: 'Prashanth Kumar', channel: 'phone', subject: 'Information request call', category: 'INFO', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCL', customer: 'Akshay Sakkrehalli', channel: 'mail', subject: 'Requesting a refund on my recent order due to...', category: 'REFUND', wait: '06:13', assignee: { name: 'Anusha YP' } },
  { id: 'TCK1234BCM', customer: 'Chandana PK', channel: 'phone', subject: 'Information request call', category: 'INFO', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCN', customer: 'Someshwar T', channel: 'chat', subject: 'Order status chat', category: 'STATUS', wait: '06:13', assignee: { name: 'Anusha YP' } },
  { id: 'TCK1234BCO', customer: 'Brinda V', channel: 'mail', subject: 'Requesting a refund on my recent order due to...', category: 'REFUND', wait: '06:13', assignee: { unassigned: true } },
  { id: 'TCK1234BCP', customer: 'Mahesh Acharya', channel: 'mail', subject: 'Requesting a refund on my recent order due to...', category: 'REFUND', wait: '06:13', assignee: { unassigned: true } },
];

const TicketTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = ticketsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_2fr_0.8fr_4fr_1fr_0.8fr_1.5fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none">ID</div>
        <div className="uppercase text-left leading-none">Customer Name</div>
        <div className="uppercase text-left leading-none">Channel</div>
        <div className="uppercase">Subject Line</div>
        <div className="uppercase">Category</div>
        <div className="uppercase">Wait</div>
        <div className="uppercase">Assigned To</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-visible">
        {currentTickets.map((ticket, index) => (
          <TableRow key={ticket.id} ticket={ticket} index={index} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={ticketsData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default TicketTable;
