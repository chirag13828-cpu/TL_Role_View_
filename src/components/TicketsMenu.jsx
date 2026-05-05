import React from 'react';

const menuItems = [
  'Unassigned',
  'Pending',
  'Completed',
  'Junk',
  'Assigned To Me',
  'Created By Me',
  'Completed By Me',
];

const TicketsMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-56 border-r border-gray-200 bg-white flex flex-col shrink-0">
      <div className="p-4 pt-5 pb-2">
        <h2 className="text-blue-500 font-extrabold text-base tracking-wide">Tickets</h2>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 px-2 mt-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`text-left px-3 py-1.5 text-sm rounded transition-colors duration-200 ${
                isActive 
                  ? 'bg-[#ebf5ff] text-blue-600 font-medium' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-blue-500'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsMenu;
