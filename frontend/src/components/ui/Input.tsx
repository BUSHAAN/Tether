import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from "react";
import { cn } from "../../lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      leftIcon,
      rightSlot,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--t-text)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3 text-[var(--t-faint)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-[var(--t-radius)] border bg-[var(--t-surface)] text-[var(--t-text)]",
              "border-[var(--t-border-strong)] placeholder:text-[var(--t-faint)]",
              "px-3.5 py-2.5 text-sm outline-none transition-colors",
              "focus:border-[var(--t-accent)]/50 focus:ring-2 focus:ring-[var(--t-accent)]/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightSlot && "pr-10",
              error && "border-[var(--t-danger)]/60 focus:ring-[var(--t-danger)]/20",
              className
            )}
            {...props}
          />
          {rightSlot && (
            <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2">
              {rightSlot}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-[var(--t-danger)]">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[var(--t-muted)]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
