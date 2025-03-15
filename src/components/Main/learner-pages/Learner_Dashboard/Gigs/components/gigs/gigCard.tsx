// components/gigs/GigCard.tsx
import { Gig } from '../../types/gigsTypes';
import { GigStatusBadge } from './gigStatusBadge';

interface GigCardProps {
  gig: Gig;
  onEdit: () => void;
  onDelete: () => void;
}

export const GigCard = ({ gig, onEdit, onDelete }: GigCardProps) => (
  <div className="bg-gray-100 border-2  rounded-lg shadow-sm border-gray-400 p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">{gig.title}</h3>
        {gig.status && <GigStatusBadge status={gig.status} />}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onEdit}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Edit gig"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
          aria-label="Delete gig"
        >
          🗑️
        </button>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
      <div>
        <span className="text-gray-600">Budget:</span>
        <p className="font-medium">CFA {gig.budget.toLocaleString()}</p>
      </div>
      <div>
        <span className="text-gray-600">Location:</span>
        <p className="font-medium capitalize">{gig.location}</p>
      </div>
      <div>
        <span className="text-gray-600">Category:</span>
        <p className="font-medium">{gig.category?.name}</p>
      </div>
      <div>
        <span className="text-gray-600">student email:</span>
        <p className="font-medium">{gig.learner?.email}</p>
      </div>
      <div>
        <span className="text-gray-600">Created:</span>
        <p className="font-medium">
          {new Date(gig.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>

    <p className="text-gray-700 line-clamp-3">{gig.description}</p>
  </div>
);