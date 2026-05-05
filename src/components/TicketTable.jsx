import React, { useState } from 'react';
import TableRow from './TableRow';

const mockTickets = [
  {
    id: 'TKT-001',
    assignee: 'Alice Johnson',
    email: 'alice@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    title: 'Login page throwing 500 error',
    description: 'When trying to login with SSO, it redirects to a 500 internal server error page.',
    date: 'Oct 24, 2023',
    status: 'In Progress'
  },
  {
    id: 'TKT-002',
    assignee: 'Bob Smith',
    email: 'bob@example.com',
    title: 'Update billing address',
    description: 'Need to update the billing address for the next invoice cycle.',
    date: 'Oct 23, 2023',
    status: 'Open'
  },
  {
    id: 'TKT-003',
    assignee: 'Charlie Davis',
    email: 'charlie@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    title: 'Feature Request: Dark Mode',
    description: 'It would be great to have a dark mode option for the dashboard.',
    date: 'Oct 21, 2023',
    status: 'Resolved'
  },
  {
    id: 'TKT-004',
    assignee: 'Diana Prince',
    email: 'diana@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    title: 'Cannot upload profile picture',
    description: 'The image upload component fails silently when selecting PNG files over 5MB.',
    date: 'Oct 20, 2023',
    status: 'Open'
  },
  {
    id: 'TKT-005',
    assignee: 'Evan Wright',
    email: 'evan@example.com',
    title: 'Typo on homepage',
    description: 'There is a typo in the main hero section of the landing page.',
    date: 'Oct 19, 2023',
    status: 'Resolved'
  }
];

const TicketTable = () => {
  const [tickets] = useState(mockTickets);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-3">User</div>
        <div className="col-span-4">Issue Details</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 flex justify-end">Actions</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {tickets.map(ticket => (
          <TableRow key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketTable;
