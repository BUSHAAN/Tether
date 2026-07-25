import { useEffect, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import DefaultAvatar from "../assets/avatar.png";
import { Avatar, Button, Input, Modal } from "./ui";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContactModal = ({ isOpen, onClose }: AddContactModalProps) => {
  const [query, setQuery] = useState("");
  const { searchResults, isSearching, isAdding, searchUsers, addContact } =
    useContactStore();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const timeout = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, isOpen, searchUsers]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const handleAdd = async (contactId: string) => {
    const success = await addContact(contactId);
    if (success) {
      handleClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title="Add New Contact">
      <Input
        placeholder="Search by name or email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        leftIcon={<Search className="size-4" />}
        autoFocus
      />

      <div className="mt-4 max-h-64 overflow-y-auto">
        {isSearching ? (
          <div className="flex justify-center py-8">
            <span className="size-6 animate-spin rounded-full border-2 border-[var(--t-accent)] border-t-transparent" />
          </div>
        ) : query.trim() === "" ? (
          <p className="py-8 text-center text-sm text-[var(--t-muted)]">
            Type a name or email to search
          </p>
        ) : searchResults.length === 0 ? (
          <p className="py-8 text-center text-sm text-[var(--t-muted)]">
            No users found
          </p>
        ) : (
          <ul className="space-y-1">
            {searchResults.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-3 rounded-[var(--t-radius)] p-2 transition-colors hover:bg-white/[0.04]"
              >
                <Avatar
                  src={user.profilePic || DefaultAvatar}
                  name={user.fullName}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{user.fullName}</div>
                  <div className="truncate text-sm text-[var(--t-muted)]">
                    {user.email}
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  loading={isAdding}
                  onClick={() => handleAdd(user._id)}
                  leftIcon={<UserPlus className="size-4" />}
                >
                  Add
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default AddContactModal;
