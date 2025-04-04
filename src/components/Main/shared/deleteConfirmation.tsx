// components/ui/DeleteConfirmation.tsx
import { BaseModal } from "../learner-pages/Learner_Dashboard/Gigs/components/ui/baseModal";
import { Button } from "../learner-pages/Learner_Dashboard/Gigs/components/ui/button";

interface DeleteConfirmationProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  info: string;
  buttonInfo: string;
  title: string;
  buttonInfo2: string;
}

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  info,
  buttonInfo,
  title,
  buttonInfo2
}: DeleteConfirmationProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    maxWidth="sm"
  >
    <div className="space-y-6">
      <p className="text-gray-600">{info}</p>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          isLoading={isDeleting}
        >
          {isDeleting ? `${buttonInfo2}` : `${buttonInfo}`}
        </Button>
      </div>
    </div>
  </BaseModal>
);
