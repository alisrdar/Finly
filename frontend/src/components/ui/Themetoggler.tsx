import useTheme from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const Themetoggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
          onClick={toggleTheme}
          className="p-2 bg-card cursor-pointer shadow-sm rounded-lg transition-colors duration-200 hover:bg-accent text-muted-foreground hover:text-accent-foreground"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
  )
}

export default Themetoggler
