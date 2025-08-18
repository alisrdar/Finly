import { Moon, Sun } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import Logo from './Logo';


// Navigation Component
const Navigation: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-border backdrop-blur-sm">
      <Logo />

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors duration-200 hover:bg-accent text-muted-foreground hover:text-accent-foreground"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onLoginClick}
          className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navigation