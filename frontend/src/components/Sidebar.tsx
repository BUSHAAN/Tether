import { useEffect, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { UserPlus, Users } from "lucide-react";
import DefaultAvatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";
import { getDisplayName } from "../lib/utils";
import AddContactModal from "./AddContactModal";

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
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn btn-ghost btn-sm btn-circle"
              title="Add new contact"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {users.length === 0 ? (
            <div className="px-4 py-8 text-center text-base-content/60 text-sm hidden lg:block">
              <p>No contacts yet</p>
              <p className="mt-1">Tap + to add someone</p>
            </div>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                type="button"
                className={`w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors relative
            ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }
            `}
                onClick={() => setSelectedUser(user)}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePic || DefaultAvatar}
                    alt={getDisplayName(user)}
                    className="w-10 h-10 rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div
                      className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 
                right-0 ring-2 ring-zinc-900"
                    ></div>
                  )}
                </div>
                <div className="hidden lg:block text-left min-w-0 flex-1">
                  <div className="font-medium truncate">{getDisplayName(user)}</div>
                  <div className="text-sm text-zinc-400 truncate flex items-center gap-2">
                    {!user.isContact && (
                      <span className="badge badge-warning badge-xs">
                        Not a contact
                      </span>
                    )}
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
                {!user.isContact && (
                  <div
                    className="absolute top-2 right-2 w-2 h-2 bg-warning rounded-full lg:hidden"
                    title="Not a contact"
                  />
                )}
                {user.unreadMessageCount > 0 && (
                  <>
                    <div className="w-5 h-5 bg-green-600 rounded-full text-white text-xs font-semibold flex items-center justify-center hidden lg:flex">
                      {user.unreadMessageCount}
                    </div>

                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-600 ring-2 ring-zinc-900 rounded-full text-white text-xs font-semibold flex items-center justify-center lg:hidden">
                      {user.unreadMessageCount}
                    </div>
                  </>
                )}
              </button>
            ))
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
