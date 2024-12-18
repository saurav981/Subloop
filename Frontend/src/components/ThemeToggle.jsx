import { Moon, SunMoon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div
      onClick={() => setTheme()}
      className="cursor-pointer md:size-9 rounded-md hover:bg-base-200 flex items-center justify-center"
    >
      {theme === 'light' ? <Moon size={17} /> : <SunMoon size={20} />}
    </div>
  );
};
