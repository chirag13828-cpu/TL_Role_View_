import React from 'react';

const MainHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Unassigned Tickets</h1>
      <p className="text-sm text-gray-400 italic mt-1">
        Check all the unassigned tickets currently in the system
      </p>
    </div>
  );
};

export default MainHeader;
