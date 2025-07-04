import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <button
      onClick={() => setTheme()}
      className="group relative p-2 rounded-lg hover:bg-base-200/60 transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'light'
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon Icon */}
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </button>
  );
};
