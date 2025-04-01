import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import DefaultAvatar from "../assets/avatar.png";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useMessageStore();

  const {onlineUsers} = useAuthStore();

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
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/*online filter toggle*/}
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            className={`w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors
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
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <div
                  className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 
                right-0 ring-2 ring-zinc-900"
                ></div>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400 truncate">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
