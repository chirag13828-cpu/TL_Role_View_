import React, { useState } from 'react';
import PendingTableRow from './PendingTableRow';
import Pagination from './Pagination';

const pendingTicketsData = [
  { id: 'TCK1234BCG', customer: 'Satya Narayan Panda', channel: 'mail', category: 'REFUND', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:15', disposition: 'QUEUED', wait: '06:13', sla: '25/04/26 10:15' },
  { id: 'TCK1234BCH', customer: 'Ankitha HM', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:15', disposition: 'QUEUED', wait: '06:13', sla: '25/04/26 10:15' },
  { id: 'TCK1234BCI', customer: 'Vishnu RR', channel: 'phone', category: 'INFO', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:15', disposition: 'QUEUED', wait: '06:13', sla: '25/04/26 10:15' },
  { id: 'TCK1234BCJ', customer: 'Navya GS', channel: 'chat', category: 'STATUS', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:20', disposition: 'QUEUED', wait: '06:13', sla: '25/04/26 10:20' },
  { id: 'TCK1234BCK', customer: 'Prashanth Kumar', channel: 'phone', category: 'INFO', assignedTo: 'Goutham GS', assignedOn: '24/04/26 10:20', disposition: 'ESCALATED', wait: '06:13', sla: '25/04/26 10:20' },
  { id: 'TCK1234BCL', customer: 'Akshay Sakkrehalli', channel: 'mail', category: 'REFUND', assignedTo: 'Anusha YP', assignedOn: '24/04/26 10:23', disposition: 'ESCALATED', wait: '06:13', sla: '25/04/26 10:23' },
  { id: 'TCK1234BCM', customer: 'Chandana PK', channel: 'phone', category: 'INFO', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:23', disposition: 'INITIATED', wait: '06:13', sla: '25/04/26 10:23' },
  { id: 'TCK1234BCN', customer: 'Someshwar T', channel: 'chat', category: 'STATUS', assignedTo: 'Anusha YP', assignedOn: '24/04/26 10:25', disposition: 'INITIATED', wait: '06:13', sla: '25/04/26 10:25' },
  { id: 'TCK1234BCO', customer: 'Brinda V', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:25', disposition: 'INITIATED', wait: '06:13', sla: '25/04/26 10:25' },
  { id: 'TCK1234BCP', customer: 'Mahesh Acharya', channel: 'mail', category: 'REFUND', assignedTo: 'Madhu DL', assignedOn: '24/04/26 10:26', disposition: 'INITIATED', wait: '06:13', sla: '25/04/26 10:26' },
];

const PendingTable = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Apply Filtering
  const filteredData = pendingTicketsData.filter(ticket => {
    const matchesSearch = !filters?.search || 
      ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters?.category || filters.category === 'All Categories' || 
      ticket.category.toUpperCase() === filters.category.toUpperCase();
    
    const matchesDisposition = !filters?.disposition || filters.disposition === 'All Dispositions' || 
      ticket.disposition.toUpperCase() === filters.disposition.toUpperCase();

    return matchesSearch && matchesCategory && matchesDisposition;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_1.8fr_0.8fr_1fr_1.5fr_1.2fr_1.2fr_0.8fr_1.2fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none flex items-center">ID</div>
        <div className="uppercase text-left leading-none flex items-center">Customer Name</div>
        <div className="uppercase text-left leading-none flex items-center">Channel</div>
        <div className="uppercase text-left leading-none flex items-center">Category</div>
        <div className="uppercase text-left leading-none flex items-center">Assigned To</div>
        <div className="uppercase text-left leading-none flex items-center">Assigned On</div>
        <div className="uppercase text-left leading-none flex items-center">Disposition</div>
        <div className="uppercase text-left leading-none flex items-center">Wait</div>
        <div className="uppercase text-left leading-none flex items-center">SLA</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-visible">
        {currentTickets.length > 0 ? (
          currentTickets.map((ticket, index) => (
            <PendingTableRow key={ticket.id} ticket={ticket} index={index} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <p className="text-sm font-medium">No tickets found matching your filters</p>
            <p className="text-xs italic">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={filteredData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default PendingTable;
