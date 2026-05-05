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
          {activeApp === 'Tickets' && (
            <>
              {activeTab === 'Unassigned' && (
                <div className="flex-1 flex flex-col overflow-hidden px-8 pt-3 pb-2 animate-in fade-in duration-500 absolute inset-0">
                  <MainHeader />
                  <FilterBar />
                  <TicketTable />
                </div>
              )}

              {activeTab === 'Pending' && (
                <div className="flex-1 flex flex-col overflow-hidden absolute inset-0">
                  <PendingView />
                </div>
              )}

              {activeTab === 'Completed' && <CompletedView />}

              {activeTab === 'Junk' && <JunkView />}

              {activeTab === 'Created By Me' && <CreatedByMeView />}

              {activeTab === 'Completed By Me' && <CompletedByMeView />}

              {activeTab === 'Assigned To Me' && <MaintenanceView />}
            </>
          )}

          {activeApp === 'Team' && <TeamView />}
        </div>
      </div>
    </div>
  );
}

export default App;
