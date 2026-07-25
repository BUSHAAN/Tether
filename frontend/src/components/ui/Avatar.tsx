import { cn } from "../../lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-32 text-3xl",
};

type AvatarProps = {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
  ringClassName?: string;
};

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  online,
  className,
  ringClassName = "border-[var(--t-bg)]",
}: AvatarProps) {
  const initial = (name?.trim()?.charAt(0) || "?").toUpperCase();

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name || ""}
          className={cn(
            "rounded-full object-cover bg-[var(--t-surface-3)]",
            sizeMap[size]
          )}
        />
      ) : (
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-[var(--t-surface-3)] font-semibold text-[var(--t-text)]",
            sizeMap[size]
          )}
          aria-hidden={alt ? undefined : true}
        >
          {initial}
        </span>
      )}
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 size-2.5 rounded-full border-2",
            online ? "bg-[var(--t-accent)]" : "bg-[var(--t-faint)]",
            ringClassName
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
