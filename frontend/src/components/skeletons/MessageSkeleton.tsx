import { Skeleton } from "../ui";
import { cn } from "../../lib/utils";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {skeletonMessages.map((_, idx) => {
        const isMine = idx % 2 !== 0;
        return (
          <div
            key={idx}
            className={cn(
              "flex gap-2.5",
              isMine ? "flex-row-reverse" : "flex-row"
            )}
          >
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <div
              className={cn(
                "flex flex-col gap-1",
                isMine ? "items-end" : "items-start"
              )}
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-14 w-[200px] rounded-2xl" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
