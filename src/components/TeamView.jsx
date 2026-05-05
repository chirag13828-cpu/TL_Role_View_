import React from 'react';
import TeamFilterBar from './TeamFilterBar';
import TeamTable from './Table/TeamTable';

const TeamView = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-8 pt-3 pb-2 animate-in fade-in duration-500 absolute inset-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Team</h1>
        <p className="text-sm text-gray-400 italic mt-1">
          Monitor today's team performance
        </p>
      </div>
      <TeamFilterBar />
      <TeamTable />
    </div>
  );
};

export default TeamView;
