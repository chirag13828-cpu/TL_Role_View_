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

const CompletedByMeTable = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Apply Filtering
  const filteredData = completedByMeTicketsData.filter(ticket => {
    const matchesSearch = !filters?.search || 
      ticket.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters?.category || filters.category === 'All Categories' || 
      ticket.category.toUpperCase() === filters.category.toUpperCase();

    return matchesSearch && matchesCategory;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTickets = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-2">
      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_2.5fr_1.2fr_1.5fr_1.5fr_1.5fr] gap-4 px-6 border-b border-gray-100 text-[10px] font-bold text-gray-500 tracking-wider bg-gray-50/50 h-[26px] items-center">
        <div className="uppercase whitespace-nowrap text-left leading-none">ID</div>
        <div className="uppercase text-left leading-none">Customer Name</div>
        <div className="uppercase text-left leading-none">Category</div>
        <div className="uppercase text-left leading-none">Assigned On</div>
        <div className="uppercase text-left leading-none">Completed On</div>
        <div className="uppercase text-left leading-none">SLA</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-hidden">
        {currentTickets.length > 0 ? (
          currentTickets.map((ticket) => (
            <CompletedByMeTableRow key={ticket.id} ticket={ticket} />
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

export default CompletedByMeTable;
