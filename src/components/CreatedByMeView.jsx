import React from 'react';
import CreatedByMeFilterBar from './CreatedByMeFilterBar';
import CreatedByMeTable from './Table/CreatedByMeTable';

const CreatedByMeView = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-8 pt-3 pb-2 animate-in fade-in duration-500 absolute inset-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tickets I Created</h1>
        <p className="text-sm text-gray-400 italic mt-1">
          Check all the tickets that were created by me
        </p>
      </div>
      <CreatedByMeFilterBar />
      <CreatedByMeTable />
    </div>
  );
};

export default CreatedByMeView;
