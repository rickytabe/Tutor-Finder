// components/ui/DeleteConfirmation.tsx
import { BaseModal } from "./baseModal";
import { Button } from "./button";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}: DeleteConfirmationProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    title="Confirm Delete"
    maxWidth="sm"
  >
    <div className="space-y-6">
      <p className="text-gray-600">
        Are you sure you want to delete this gig? This action cannot be undone.
      </p>
      
      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          isLoading={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  </BaseModal>
);