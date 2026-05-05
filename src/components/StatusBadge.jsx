import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'badge-open';
      case 'in progress':
        return 'badge-progress';
      case 'resolved':
      case 'closed':
        return 'badge-resolved';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`badge ${getBadgeClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
