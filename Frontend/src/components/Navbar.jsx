import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from './ThemeToggle';
import { User, LayoutDashboard, LogIn, UserPlus, Menu, X } from 'lucide-react';

const appName = import.meta.env.VITE_APP_NAME || 'Subloop';

export const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const displayName = user?.fullName?.split(' ')[0] || user?.username;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 sm:px-4 ${
        scrolled
          ? 'backdrop-blur bg-base-100/80 shadow-sm py-2.5'
          : 'backdrop-blur bg-base-100/40 py-3'
      }`}
    >
      <nav className="flex items-center justify-between px-4 max-w-7xl mx-auto transition-all duration-300">
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:text-primary-focus transition-colors"
        >
          {appName}
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-base-content hover:bg-base-200/60 transition hover:scale-105"
              >
                <LogIn
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-focus transition hover:scale-105 shadow-md hover:shadow-lg"
              >
                <UserPlus
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Sign Up</span>
              </Link>
            </>
          ) : (
            user?.isVerified && (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-base-200 border border-base-300 shadow-sm">
                  <User size={16} className="text-base-content/70" />
                  <span className="text-sm font-medium text-base-content">
                    {displayName}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-base-content hover:bg-base-200/60 transition hover:scale-105"
                >
                  <LayoutDashboard
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Dashboard</span>
                </Link>
              </>
            )
          )}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-base-200/60 transition"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-base-100 border-t border-base-300 shadow-md">
          <div className="px-4 py-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-base-content hover:bg-base-200/60 transition"
                >
                  <LogIn
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-focus transition shadow-md"
                >
                  <UserPlus
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              user?.isVerified && (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-base-200 border border-base-300 shadow-sm">
                    <User size={18} className="text-base-content/70" />
                    <span className="text-sm font-medium text-base-content">
                      {displayName}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-base-content hover:bg-base-200/60 transition"
                  >
                    <LayoutDashboard
                      size={18}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    <span>Dashboard</span>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};
