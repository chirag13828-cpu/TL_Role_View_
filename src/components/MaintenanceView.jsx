import React from 'react';
import { Hammer, HardHat, Wrench } from 'lucide-react';

const MaintenanceView = () => {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden px-8 pt-3 pb-4 animate-in fade-in duration-500 absolute inset-0 items-center justify-center">
      <div className="flex flex-col items-center text-center max-w-md p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4 text-blue-500">
          <Wrench size={32} className="animate-bounce" />
          <HardHat size={40} />
          <Hammer size={32} className="animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Under Maintenance!</h2>
        <p className="text-gray-500">
          Whoops! Our hamsters are currently upgrading the assigned tickets wheel. 
          Please check back a bit later when the paint dries.
        </p>
      </div>
    </div>
  );
};

export default MaintenanceView;
