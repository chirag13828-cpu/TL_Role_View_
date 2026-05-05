import React from 'react';
import { LayoutDashboard, Ticket, Users, MessagesSquare, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeApp, setActiveApp }) => {
  const iconBase = "p-3 rounded-xl transition-all duration-200 flex items-center justify-center";
  const iconHover = "text-gray-500 hover:bg-gray-50 hover:text-blue-500";
  const iconActive = "text-blue-500 bg-blue-50 shadow-sm";

  return (
    <div className="w-16 border-r border-gray-200 flex flex-col items-center py-4 bg-white shrink-0 z-10">
      <div className="flex flex-col gap-2 w-full items-center flex-1">
        <button 
          onClick={() => setActiveApp('Dashboard')}
          className={`${iconBase} ${activeApp === 'Dashboard' ? iconActive : iconHover}`}
        >
          <LayoutDashboard size={22} strokeWidth={2} />
        </button>
        
        <button 
          onClick={() => setActiveApp('Tickets')}
          className={`${iconBase} ${activeApp === 'Tickets' ? iconActive : iconHover}`}
        >
          <Ticket size={22} strokeWidth={2} />
        </button>
        
        <button 
          onClick={() => setActiveApp('Team')}
          className={`${iconBase} ${activeApp === 'Team' ? iconActive : iconHover}`}
        >
          <Users size={22} strokeWidth={2} />
        </button>
        
        <button 
          onClick={() => setActiveApp('Messages')}
          className={`${iconBase} ${activeApp === 'Messages' ? iconActive : iconHover}`}
        >
          <MessagesSquare size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full items-center mt-auto">
        <button className={`${iconBase} ${iconHover}`}>
          <Settings size={22} strokeWidth={2} />
        </button>
        <button className={`${iconBase} text-gray-500 hover:text-red-500 hover:bg-red-50`}>
          <LogOut size={22} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
