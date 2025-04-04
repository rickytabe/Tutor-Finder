import { GigStatus } from "../../types/gigsTypes";



const statusStyles: Record<GigStatus, string> = {
  pending:'bg-yellow-100 text-yellow-800',
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels: Record<GigStatus, string> = {
  pending: 'Pending',
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const GigStatusBadge = ({ status }: { status: GigStatus }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
    {statusLabels[status]}
  </span>
);