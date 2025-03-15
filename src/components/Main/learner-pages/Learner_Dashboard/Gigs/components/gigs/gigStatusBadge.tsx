
type Status = 'open' | 'in_progress' | 'completed' | 'cancelled';

const statusStyles: Record<Status, string> = {
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const GigStatusBadge = ({ status }: { status: Status }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
    {statusLabels[status]}
  </span>
);