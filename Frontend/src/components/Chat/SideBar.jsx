import { useEffect, useState } from 'react';
import { useChatStore } from '../../store/chatStore';
import { SideBarSkeleton } from './Skeletons/SideBarSkeleton';
import { Users } from 'lucide-react';
import avatar from '../../assets/avatar.webp';
import avatarDark from '../../assets/avatarDark.webp';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

export const SideBar = () => {
  const { theme } = useThemeStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { users, getUsers, selectedUser, setSelectedUser, isLoading } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-72 border-r border-color-50 flex flex-col transition-all duration-200">
      <div className="flex items-center gap-2 border-b border-color-30 w-full p-5">
        <Users className="size-6 lg:mx-0" />

        <span className="font-medium">Messages</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 mt-3">
        <input
          type="checkbox"
          checked={showOnlineOnly}
          onChange={(e) => setShowOnlineOnly(e.target.checked)}
          className="checkbox checkbox-sm border-2"
        />
        <span className="text-sm">Show online only</span>
        <span className="text-xs text-zinc-500">
          ({onlineUsers.length - 1} online)
        </span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id
                ? 'bg-base-200 border-r-2 border-primary/90'
                : ''
            }`}
          >
            <div className="flex items-center gap-2 lg:mx-0">
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    user.profilePic ||
                    `${theme === 'dark' ? avatarDark : avatar}`
                  }
                  alt="profile pic"
                  className="size-10 lg:size-12 object-cover rounded-full"
                />

                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-2.5 lg:size-3 bg-green-500 
                  rounded-full"
                  />
                )}
              </div>

              <div className="lg:block min-w-0 truncate">
                {user?.fullName || user?.username}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
