import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { UserPlus, Users } from "lucide-react";
import DefaultAvatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";
import { getDisplayName } from "../lib/utils";
import AddContactModal from "./AddContactModal";
import { Avatar, Badge, Button, CountBadge } from "./ui";
import { cn } from "../lib/utils";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useMessageStore();

  const { onlineUsers } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };
    fetchUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      <aside className="flex h-full w-20 flex-col border-r border-[var(--t-border)] bg-[var(--t-bg)] transition-all duration-200 lg:w-72">
        <div className="w-full border-b border-[var(--t-border)] p-4 lg:p-5">
          <div className="flex items-center justify-center gap-2 lg:justify-between">
            <div className="hidden items-center gap-2 lg:flex">
              <Users className="size-5 text-[var(--t-accent)]" />
              <span className="font-display font-semibold tracking-tight">
                Contacts
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(true)}
              title="Add new contact"
              aria-label="Add new contact"
              className="size-9"
            >
              <UserPlus className="size-5" />
            </Button>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto py-2">
          {users.length === 0 ? (
            <div className="hidden px-4 py-8 text-center text-sm text-[var(--t-muted)] lg:block">
              <p>No contacts yet</p>
              <p className="mt-1">Tap + to add someone</p>
            </div>
          ) : (
            users.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  type="button"
                  className={cn(
                    "relative flex w-full items-center gap-3 p-3 text-left transition-colors",
                    "hover:bg-white/[0.04]",
                    isSelected && "bg-white/[0.07]"
                  )}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="relative mx-auto lg:mx-0">
                    <Avatar
                      src={user.profilePic || DefaultAvatar}
                      name={getDisplayName(user)}
                      online={isOnline}
                      ringClassName="border-[var(--t-bg)]"
                    />
                  </div>

                  <div className="hidden min-w-0 flex-1 lg:block">
                    <div className="truncate font-medium text-[var(--t-text)]">
                      {getDisplayName(user)}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 truncate text-sm text-[var(--t-muted)]">
                      {!user.isContact && (
                        <Badge variant="warning">Not a contact</Badge>
                      )}
                      <span className={isOnline ? "text-[var(--t-accent)]" : undefined}>
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>

                  {!user.isContact && (
                    <span
                      className="absolute top-2 right-2 size-2 rounded-full bg-[var(--t-warning)] lg:hidden"
                      title="Not a contact"
                    />
                  )}

                  {user.unreadMessageCount > 0 && (
                    <>
                      <CountBadge
                        count={user.unreadMessageCount}
                        className="hidden lg:inline-flex"
                      />
                      <CountBadge
                        count={user.unreadMessageCount}
                        className="absolute top-2 right-2 ring-2 ring-[var(--t-bg)] lg:hidden"
                      />
                    </>
                  )}
                </button>
              );
            })
          )}
        </div>
      </aside>

      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
