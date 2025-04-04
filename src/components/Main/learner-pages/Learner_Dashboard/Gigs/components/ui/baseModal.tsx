
interface BaseModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg';
  }
  
  export const BaseModal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    maxWidth = 'lg' 
  }: BaseModalProps) => {
    if (!isOpen) return null;
  
    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-xl',
      lg: 'max-w-4xl'
    };
  
    return (
      <div className="fixed inset-0 m-4 z-50 bg-black/50 backdrop-blur-sm">
        <div 
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${sizeClasses[maxWidth]} bg-white rounded-xl shadow-xl`}
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 id="modal-title" className="text-2xl font-bold">{title}</h2>
            <button 
              onClick={onClose}
              className="text-3xl hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          
          <div className="max-h-[80vh] overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };