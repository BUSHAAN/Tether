import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "accent" | "warning" | "muted";

const variants: Record<BadgeVariant, string> = {
  accent: "bg-[var(--t-accent)] text-[var(--t-accent-ink)]",
  warning: "bg-[var(--t-warning-soft)] text-[var(--t-warning)]",
  muted: "bg-white/[0.06] text-[var(--t-muted)]",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

type CountBadgeProps = {
  count: number;
  className?: string;
};

export function CountBadge({ count, className }: CountBadgeProps) {
  if (count <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--t-accent)] text-[10px] font-bold text-[var(--t-accent-ink)]",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
