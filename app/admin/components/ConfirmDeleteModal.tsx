interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-lg border border-outline-variant/40 bg-paper-white p-6 shadow-lg">
        <h3 className="font-serif text-lg font-semibold text-on-surface">
          {title}
        </h3>
        <p className="mt-2 text-sm text-on-surface-variant">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded border border-outline-variant bg-paper-white px-4 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-on-surface transition-colors duration-200 hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-orange"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center rounded bg-error px-4 font-hanken text-xs font-bold uppercase tracking-[0.05em] text-paper-white transition-colors duration-200 hover:bg-error/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
