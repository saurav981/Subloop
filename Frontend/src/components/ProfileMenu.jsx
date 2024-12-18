import { useState, useRef, useEffect } from 'react';
import { getInitials } from '../utils/helper';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import avatar from '../assets/avatar.webp';

const options = [
  { label: 'Edit profile', url: 'profile' },
  { label: 'Settings', url: 'settings/general' },
  { label: 'Dashboard', url: 'dashboard' },
];

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { user, logout } = useAuthStore();
  const isImageSet = !false;

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md focus:outline-none hover:bg-base-300 px-1.5 py-1"
      >
        <div className="size-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border border-slate-400">
          {isImageSet ? (
            <img
              src={user?.profilePic || avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <p>{getInitials(user?.fullName)}</p>
          )}
        </div>
        <svg
          className={`size-3.5 text-gray-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bg-base-100 right-0 mt-2 w-56 rounded-lg shadow-lg border border-color-50 py-2 z-20">
          {/* Profile Section */}
          <div className="px-4 py-3 border-b border-color-50">
            <div className="flex items-center space-x-3">
              <div className="size-10 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center">
                {isImageSet ? (
                  <img
                    src={user?.profilePic || avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p>{getInitials(user?.fullName)}</p>
                )}
              </div>
              <h3 className="text-sm font-medium">
                {user?.fullName || user?.username}
              </h3>
            </div>
          </div>

          {/* Personal Section */}
          <div className="flex flex-col gap-1 px-4 py-2">
            {options.map((item, i) => (
              <Link
                key={i}
                to={`/${item.url}`}
                className="text-sm w-full text-left px-2 py-1 hover:bg-base-200 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="mx-4 mb-3 mt-2 btn-fit text-sm font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
