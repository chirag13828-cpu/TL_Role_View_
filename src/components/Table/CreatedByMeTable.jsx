import React, { useState } from 'react';
import CreatedByMeTableRow from './CreatedByMeTableRow';
import Pagination from './Pagination';

const createdTicketsData = [
  { id: 'TCK1234BCG', customer: 'Satya Narayan Panda', category: 'REFUND', assignedTo: 'Goutham GS', assignedLob: 'Clothing', assignedOn: '24/04/26 10:15', sla: '25/04/26 10:15', status: 'IN PROGRESS' },
  { id: 'TCK1234BCH', customer: 'Ankitha HM', category: 'REFUND', assignedTo: 'Madhu DL', assignedLob: 'Footwear', assignedOn: '24/04/26 10:15', sla: '25/04/26 10:15', status: 'COMPLETED' },
  { id: 'TCK1234BCI', customer: 'Vishnu RR', category: 'INFO', assignedTo: 'Goutham GS', assignedLob: 'Clothing', assignedOn: '24/04/26 10:15', sla: '25/04/26 10:15', status: 'IN PROGRESS' },
  { id: 'TCK1234BCJ', customer: 'Navya GS', category: 'STATUS', assignedTo: 'Goutham GS', assignedLob: 'Clothing', assignedOn: '24/04/26 10:20', sla: '25/04/26 10:20', status: 'IN PROGRESS' },
  { id: 'TCK1234BCK', customer: 'Prashanth Kumar', category: 'INFO', assignedTo: 'Goutham GS', assignedLob: 'Footwear', assignedOn: '24/04/26 10:20', sla: '25/04/26 10:20', status: 'COMPLETED' },
  { id: 'TCK1234BCL', customer: 'Akshay Sakkrehalli', category: 'REFUND', assignedTo: 'Anusha YP', assignedLob: 'Footwear', assignedOn: '24/04/26 10:23', sla: '25/04/26 10:23', status: 'UNASSIGNED' },
  { id: 'TCK1234BCM', customer: 'Chandana PK', category: 'INFO', assignedTo: 'Madhu DL', assignedLob: 'Footwear', assignedOn: '24/04/26 10:23', sla: '25/04/26 10:23', status: 'IN PROGRESS' },
  { id: 'TCK1234BCN', customer: 'Someshwar T', category: 'STATUS', assignedTo: 'Anusha YP', assignedLob: 'Clothing', assignedOn: '24/04/26 10:25', sla: '25/04/26 10:25', status: 'UNASSIGNED' },
  { id: 'TCK1234BCO', customer: 'Brinda V', category: 'REFUND', assignedTo: 'Madhu DL', assignedLob: 'Clothing', assignedOn: '24/04/26 10:25', sla: '25/04/26 10:25', status: 'IN PROGRESS' },
  { id: 'TCK1234BCP', customer: 'Mahesh Acharya', category: 'REFUND', assignedTo: 'Madhu DL', assignedLob: 'Clothing', assignedOn: '24/04/26 10:26', sla: '25/04/26 10:26', status: 'COMPLETED' },
];

const CreatedByMeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = createdTicketsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_2fr_1fr_1.5fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none">ID</div>
        <div className="uppercase text-left leading-none">Customer Name</div>
        <div className="uppercase text-left leading-none">Category</div>
        <div className="uppercase text-left leading-none">Assigned To</div>
        <div className="uppercase text-left leading-none">Assigned Lob</div>
        <div className="uppercase text-left leading-none">Assigned On</div>
        <div className="uppercase text-left leading-none">SLA</div>
        <div className="uppercase text-left leading-none">Status</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-visible">
        {currentTickets.map((ticket, index) => (
          <CreatedByMeTableRow key={ticket.id} ticket={ticket} index={index} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        totalItems={createdTicketsData.length} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default CreatedByMeTable;
