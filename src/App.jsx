import React, { useState } from 'react';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import TicketsMenu from './components/TicketsMenu';
import MainHeader from './components/MainHeader';
import FilterBar from './components/FilterBar';
import TicketTable from './components/Table/TicketTable';
import PendingView from './components/PendingView';
import CompletedView from './components/CompletedView';
import JunkView from './components/JunkView';
import CreatedByMeView from './components/CreatedByMeView';
import CompletedByMeView from './components/CompletedByMeView';
import TeamView from './components/TeamView';
import MaintenanceView from './components/MaintenanceView';
import PerformanceDashboard from './components/PerformanceDashboard';

function App() {
  const [activeApp, setActiveApp] = useState('Tickets');
  const [activeTab, setActiveTab] = useState('Unassigned');

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-gray-800 bg-white">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeApp={activeApp} setActiveApp={setActiveApp} />
        
        {/* Render TicketsMenu only when Tickets app is active */}
        {activeApp === 'Tickets' && (
          <TicketsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        
        {/* View rendering with a simple CSS transition */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
          {activeApp === 'Dashboard' && (
            <PerformanceDashboard />
          )}

          {activeApp === 'Tickets' && (
            <div className="flex-1 flex flex-col relative overflow-hidden h-full">
              {activeTab === 'Unassigned' && (
                <div className="flex-1 flex flex-col overflow-hidden px-8 pt-3 pb-2 animate-in fade-in slide-in-from-right-4 duration-500 absolute inset-0">
                  <MainHeader />
                  <FilterBar />
                  <TicketTable />
                </div>
              )}

              {activeTab === 'Pending' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <PendingView />
                </div>
              )}

              {activeTab === 'Completed' && (
                 <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                   <CompletedView />
                 </div>
              )}

              {activeTab === 'Junk' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <JunkView />
                </div>
              )}

              {activeTab === 'Created By Me' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <CreatedByMeView />
                </div>
              )}

              {activeTab === 'Completed By Me' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <CompletedByMeView />
                </div>
              )}

              {activeTab === 'Assigned To Me' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                  <MaintenanceView />
                </div>
              )}
            </div>
          )}

          {activeApp === 'Team' && (
             <div className="flex-1 flex flex-col overflow-hidden absolute inset-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <TeamView />
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
