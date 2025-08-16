import { SIDE_MENU_DATA } from '../utils/data';
import { useNavigate, type To } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeMenu: string;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

const Sidebar = ({ activeMenu, isCollapsed, toggleCollapse }: SidebarProps) => {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  
  // Use either the prop controlled collapse state (for desktop) or the local state (for mobile)
  const collapsed = isCollapsed !== undefined ? isCollapsed : isMobileCollapsed;
  const handleToggle = toggleCollapse || (() => setIsMobileCollapsed(prev => !prev));

  const handleClick = (route: To) => {
    if (route === 'logout') {
      handleLogout();
      return;
    } else {
      navigate(route);
    }
  };
  
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };
  
  return (
    <div className={`flex flex-col h-full bg-card transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* Collapse toggle button */}
      <button 
        onClick={handleToggle}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-primary rounded-full p-1 text-primaryForeground hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* User Profile Section */}
      <div className={`flex flex-col items-center py-6 px-4 ${collapsed ? 'space-y-2' : 'space-y-4'}`}>
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className={`rounded-full object-cover border-2 border-primary ${collapsed ? 'w-10 h-10' : 'w-16 h-16'}`}
          />
        ) : (
          <div className={`rounded-full bg-primary/10 flex items-center justify-center ${collapsed ? 'w-10 h-10' : 'w-16 h-16'}`}>
            <User className={`text-primary ${collapsed ? 'w-5 h-5' : 'w-8 h-8'}`} />
          </div>
        )}
        
        {!collapsed && (
          <>
            <h3 className="font-medium text-foreground text-center">
              {user?.fullName || 'Guest'}
            </h3>
            <p className="text-xs text-mutedForeground text-center">
              {user?.email || 'Not logged in'}
            </p>
          </>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-2 overflow-y-auto">
        <div className="space-y-1">
          {SIDE_MENU_DATA.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full rounded-lg text-left transition-colors ${
                activeMenu === item.label 
                  ? 'bg-primary text-primaryForeground' 
                  : 'text-foreground hover:bg-accent hover:text-accentForeground'
              } ${
                collapsed ? 'justify-center py-3 px-0' : 'px-4 py-3 gap-3'
              }`}
              onClick={() => handleClick(item.path)}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`${
                collapsed ? 'w-6 h-6' : 'w-5 h-5'
              } ${
                activeMenu === item.label ? 'text-primaryForeground' : 'text-muted-foreground'
              }`} />
              
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
      
      {/* App Info */}
      {!collapsed && (
        <div className="mt-auto pt-4 px-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-mutedForeground">
            <span>Finly v1.0</span>
            <span>© 2025</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
