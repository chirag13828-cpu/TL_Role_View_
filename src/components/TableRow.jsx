import React from 'react';
import StatusBadge from './StatusBadge';

const TableRow = ({ ticket }) => {
  return (
    <div className="ticket-row group">
      {/* Avatar & User */}
      <div className="col-span-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border border-white group-hover:shadow-sm">
          {ticket.avatarUrl ? (
            <img src={ticket.avatarUrl} alt={ticket.assignee} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold">
              {ticket.assignee.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{ticket.assignee}</p>
          <p className="text-xs text-slate-500">{ticket.email}</p>
        </div>
      </div>

      {/* Title & Issue Details */}
      <div className="col-span-4">
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{ticket.title}</h3>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{ticket.description}</p>
      </div>

      {/* Date */}
      <div className="col-span-2 text-sm text-slate-600 font-medium">
        {ticket.date}
      </div>

      {/* Status */}
      <div className="col-span-2">
        <StatusBadge status={ticket.status} />
      </div>

      {/* Actions */}
      <div className="col-span-1 flex justify-end">
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TableRow;
