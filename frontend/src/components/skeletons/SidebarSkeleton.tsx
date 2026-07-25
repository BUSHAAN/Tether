import { Users } from "lucide-react";
import { Skeleton } from "../ui";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="flex h-full w-20 flex-col border-r border-[var(--t-border)] bg-[var(--t-bg)] transition-all duration-200 lg:w-72">
      <div className="w-full border-b border-[var(--t-border)] p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[var(--t-accent)]" />
          <span className="hidden font-display font-semibold tracking-tight lg:block">
            Contacts
          </span>
        </div>
      </div>

      <div className="w-full overflow-y-auto py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex w-full items-center gap-3 p-3">
            <div className="mx-auto lg:mx-0">
              <Skeleton className="size-10 rounded-full" />
            </div>
            <div className="hidden min-w-0 flex-1 text-left lg:block">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
