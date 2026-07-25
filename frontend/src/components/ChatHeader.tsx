import { UserPlus, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import { useContactStore } from "../store/useContactStore";
import DefaultAvatar from "../assets/avatar.png";
import { getDisplayName } from "../lib/utils";
import { Avatar, Badge, Button } from "./ui";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();
  const { addContact, isAdding } = useContactStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  const handleAddContact = async () => {
    await addContact(selectedUser._id);
  };

  return (
    <div className="border-b border-[var(--t-border)] px-3 py-3 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            src={selectedUser.profilePic || DefaultAvatar}
            name={getDisplayName(selectedUser)}
            online={isOnline}
            ringClassName="border-[var(--t-surface)]"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-display font-semibold tracking-tight">
                {getDisplayName(selectedUser)}
              </h3>
              {!selectedUser.isContact && (
                <Badge variant="warning">Not a contact</Badge>
              )}
            </div>
            <p
              className={`text-sm ${
                isOnline ? "text-[var(--t-accent)]" : "text-[var(--t-muted)]"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {!selectedUser.isContact && (
            <Button
              type="button"
              size="sm"
              loading={isAdding}
              onClick={handleAddContact}
              leftIcon={<UserPlus className="size-4" />}
            >
              <span className="hidden sm:inline">Add contact</span>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setSelectedUser(null)}
            aria-label="Close chat"
            className="size-9"
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
