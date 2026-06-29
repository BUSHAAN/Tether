import { UserPlus, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import { useContactStore } from "../store/useContactStore";
import DefaultAvatar from "../assets/avatar.png";
import { getDisplayName } from "../lib/utils";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();
  const { addContact, isAdding } = useContactStore();

  if (!selectedUser) return null;

  const handleAddContact = async () => {
    await addContact(selectedUser._id);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || DefaultAvatar}
                alt={getDisplayName(selectedUser)}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium truncate">{getDisplayName(selectedUser)}</h3>
              {!selectedUser.isContact && (
                <span className="badge badge-warning badge-sm">Not a contact</span>
              )}
            </div>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!selectedUser.isContact && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={isAdding}
              onClick={handleAddContact}
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add contact</span>
            </button>
          )}
          <button type="button" onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
