import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  House,
  CircleUserRound,
  Sparkle,
  Settings,
  Mail,
  // Settings2Icon,
  // CircleDollarSign,
  KeyRound,
  Trash2,
} from 'lucide-react';

export const LeftSideBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  activeItem;

  const menuItems = [
    { id: 1, label: 'Dashboard', url: '/dashboard', icon: House },
    { id: 3, label: 'Messages', url: '/messages', icon: Mail },
    { id: 2, label: 'Plans', url: '/plans', icon: Sparkle },
    { id: 4, label: 'Profile', url: '/profile', icon: CircleUserRound },
    {
      id: 5,
      label: 'Settings',
      url: '/settings',
      icon: Settings,
      hasSubmenu: true,
      submenus: [
        // {
        //   id: '5a',
        //   label: 'General',
        //   url: '/settings/general',
        //   icon: Settings2Icon,
        // },
        // {
        //   id: '5b',
        //   label: 'Payments',
        //   url: '/settings/payments',
        //   icon: CircleDollarSign,
        // },
        {
          id: '5c',
          label: 'Password',
          url: '/settings/password',
          icon: KeyRound,
        },
        {
          id: '5d',
          label: 'Advanced',
          url: '/settings/advanced',
          icon: Trash2,
        },
      ],
    },
  ];

  // Function to determine if a menu item or its submenu is active
  const isItemActive = (item) => {
    if (!item) return false;

    const currentPath = location.pathname;

    // For regular menu items
    if (!item.hasSubmenu) {
      return currentPath.startsWith(item.url);
    }

    // For menu items with submenus
    if (item.hasSubmenu) {
      // Check if any submenu is active
      return item.submenus.some((subItem) =>
        currentPath.startsWith(subItem.url)
      );
    }

    return false;
  };

  // Function to determine if a specific submenu item is active
  const isSubmenuActive = (subItem) => {
    return location.pathname.startsWith(subItem.url);
  };

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setIsSettingsOpen(!isSettingsOpen);
      setActiveItem(item.id);
    } else {
      setActiveItem(item.id);
    }
  };

  const handleSubmenuClick = (subItem) => {
    setActiveItem(subItem.id);
  };

  // Update active state when path changes
  useEffect(() => {
    const currentPath = location.pathname;

    for (const item of menuItems) {
      // Check main menu items
      if (!item.hasSubmenu && currentPath.startsWith(item.url)) {
        setActiveItem(item.id);
        return;
      }

      // Check submenu items
      if (item.hasSubmenu && item.submenus) {
        const matchingSubmenu = item.submenus.find((subItem) =>
          currentPath.startsWith(subItem.url)
        );

        if (matchingSubmenu) {
          setActiveItem(matchingSubmenu.id);
          setIsSettingsOpen(true);
          return;
        }
      }
    }
  }, [location.pathname]);

  return (
    <aside className="flex md:border-none border-t border-color-50">
      <div className="flex md:flex-col md:py-4 flex-1">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1 mx-3">
            <Link
              to={item.hasSubmenu ? '#' : item.url}
              onClick={() => handleMenuClick(item)}
              className={`
                flex items-center gap-3 px-4 h-12 rounded-md
                transition-colors
                ${
                  isItemActive(item)
                    ? 'bg-base-200 text-primary'
                    : 'hover:bg-base-200'
                }
              `}
            >
              <item.icon className="size-5 mx-auto" />
              <span className="flex-1 hidden md:block">{item.label}</span>
              {item.hasSubmenu && (
                <span className="text-gray-400">
                  {isSettingsOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </span>
              )}
            </Link>

            {/* Submenu */}
            {item.hasSubmenu && isSettingsOpen && (
              <div className="mt-1 ml-3 space-y-1">
                {item.submenus.map((subItem) => (
                  <Link
                    key={subItem.id}
                    to={subItem.url}
                    onClick={() => handleSubmenuClick(subItem)}
                    className={`flex gap-2 items-center
                      px-4 py-2 rounded-md text-sm
                      transition-colors duration-200
                      ${
                        isSubmenuActive(subItem)
                          ? 'bg-base-200 text-primary'
                          : 'hover:bg-base-200'
                      }
                    `}
                  >
                    <subItem.icon className="size-4" />
                    <span className="flex-1 hidden lg:block">
                      {subItem.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSideBar;
