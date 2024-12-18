import { ProfileMenu } from './ProfileMenu';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../store/authStore';

export const NavDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-between gap-3">
      <Link to={'/'} className="text-2xl font-bold text-primary ml-2">
        {import.meta.env.VITE_APP_NAME}
      </Link>

      <div className="flex items-center justify-between max-lg:gap-2 gap-2">
        {user && (
          <div className="flex justify-center items-center text-sm px-2 py-1.5 rounded bg-base-200 border border-color-30">
            {user.fullName?.split(' ')[0] || user?.username}
          </div>
        )}

        <ProfileMenu />

        <ThemeToggle />
      </div>
    </div>
  );
};
