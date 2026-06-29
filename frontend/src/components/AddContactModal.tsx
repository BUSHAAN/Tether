import { useEffect, useRef, useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import DefaultAvatar from "../assets/avatar.png";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContactModal = ({ isOpen, onClose }: AddContactModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const { searchResults, isSearching, isAdding, searchUsers, addContact } =
    useContactStore();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

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
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Add New Contact</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <Search className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </label>

        <div className="mt-4 max-h-64 overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : query.trim() === "" ? (
            <p className="text-center text-base-content/60 py-8 text-sm">
              Type a name or email to search
            </p>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-base-content/60 py-8 text-sm">
              No users found
            </p>
          ) : (
            <ul className="space-y-1">
              {searchResults.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200"
                >
                  <img
                    src={user.profilePic || DefaultAvatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-base-content/60 truncate">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={isAdding}
                    onClick={() => handleAdd(user._id)}
                  >
                    <UserPlus className="w-4 h-4" />
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default AddContactModal;
