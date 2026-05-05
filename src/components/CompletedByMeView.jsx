import React from 'react';
import CompletedByMeFilterBar from './CompletedByMeFilterBar';
import CompletedByMeTable from './Table/CompletedByMeTable';

const CompletedByMeView = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-8 pt-3 pb-2 animate-in fade-in duration-500 absolute inset-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tickets I Completed</h1>
        <p className="text-sm text-gray-400 italic mt-1">
          Check the details of all the tickets I've completed
        </p>
      </div>
      <CompletedByMeFilterBar />
      <CompletedByMeTable />
    </div>
  );
};

export default CompletedByMeView;
