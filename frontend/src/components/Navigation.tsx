import Logo from './Logo';
import Themetoggler from './ui/Themetoggler';

// Navigation Component
const Navigation: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {

  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-border backdrop-blur-sm">
      <Logo />

      <div className="flex items-center space-x-4">
        <Themetoggler />
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