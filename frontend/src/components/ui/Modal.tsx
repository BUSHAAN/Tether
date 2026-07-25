import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-md rounded-[var(--t-radius-lg)] border border-[var(--t-border)]",
        "bg-[var(--t-surface)] p-0 text-[var(--t-text)] shadow-2xl shadow-black/50",
        "backdrop:bg-black/60 backdrop:backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--t-border)] px-5 py-4">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close"
          className="size-9"
        >
          <X className="size-4" />
        </Button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </dialog>
  );
}
