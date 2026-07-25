import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--t-accent)] text-[var(--t-accent-ink)] border-transparent hover:bg-[var(--t-accent-hover)] disabled:opacity-50",
  secondary:
    "bg-transparent text-[var(--t-text)] border-[var(--t-border-strong)] hover:bg-white/[0.04] hover:border-white/30 disabled:opacity-50",
  ghost:
    "bg-transparent text-[var(--t-muted)] border-transparent hover:text-[var(--t-text)] hover:bg-white/[0.05] disabled:opacity-50",
  danger:
    "bg-[var(--t-danger)]/15 text-[var(--t-danger)] border-[var(--t-danger)]/30 hover:bg-[var(--t-danger)]/25 disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm gap-1.5",
  md: "min-h-11 px-4 text-sm gap-2",
  lg: "min-h-12 px-5 text-[0.95rem] gap-2",
  icon: "size-10 p-0 justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--t-radius)] border font-semibold transition-colors duration-150 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-[var(--t-accent)] focus-visible:outline-offset-2",
          "active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
