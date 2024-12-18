import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <nav className="flex items-center justify-between gap-2 flex-wrap">
      <Link to={'/'} className="text-2xl font-bold text-primary">
        {import.meta.env.VITE_APP_NAME}
      </Link>

      {/* Public */}
      <div className="flex items-center justify-between gap-2.5">
        {!isAuthenticated ? (
          <ul className="flex items-center justify-between gap-2.5">
            <Link to={'/login'} className="nav-btn hover:bg-base-200">
              Login
            </Link>

            <Link to={'/signup'} className="nav-btn bg-primary text-white">
              Sign Up
            </Link>
          </ul>
        ) : (
          <div className="flex items-center justify-between gap-2.5">
            {user && (
              <div className="flex justify-center items-center text-sm px-2 py-1.5 rounded bg-base-200 border border-color-30">
                {user.fullName?.split(' ')[0] || user?.username}
              </div>
            )}
            <Link to={'/dashboard'} className="nav-btn hover:bg-base-200">
              Dashboard
            </Link>
          </div>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};
