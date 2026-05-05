import React from 'react';
import PendingFilterBar from './PendingFilterBar';
import PendingTable from './Table/PendingTable';

const PendingView = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-8 pt-3 pb-2 animate-in fade-in duration-500 absolute inset-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pending Tickets</h1>
        <p className="text-sm text-gray-400 italic mt-1">
          Check all the pending tickets currently in the system
        </p>
      </div>
      <PendingFilterBar />
      <PendingTable />
    </div>
  );
};

export default PendingView;
