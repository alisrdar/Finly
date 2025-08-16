import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { DollarSign, Bell, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';

function Navbar({activeMenu}:{activeMenu:string}) {
  const [sidebarView, setSidebarView] = useState(false);
  const { user } = useAuth();
  
  return (
    <nav className='sticky top-0 bg-card shadow-sm z-40'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:px-6'>
        {/* Left side - Logo and menu toggle */}
        <div className="flex items-center gap-4">
          <button
            type='button'
            onClick={() => setSidebarView((prev) => !prev)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {sidebarView ? (
              <HiOutlineX className='text-2xl text-foreground'/> 
            ):(
              <HiOutlineMenu className='text-2xl text-foreground'/>
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primaryForeground font-bold" />
            </div>
            <span className="text-xl font-bold text-foreground">Finly</span>
          </div>
        </div>
        
        {/* Middle - Search (visible on larger screens) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-mutedForeground" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-accent placeholder-mutedForeground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Right side - User profile and notifications */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          
          <Link to="/profile" className="flex items-center space-x-3 hover:bg-accent p-2 rounded-lg transition-colors">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.fullName || "User"}
                className="w-8 h-8 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primaryForeground" />
              </div>
            )}
            <span className="hidden md:inline text-sm font-medium text-foreground">
              {user?.fullName || "Guest"}
            </span>
          </Link>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      {sidebarView && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden'>
          <div className='fixed left-0 top-0 h-full bg-card shadow-xl'>
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-foreground">Finly</span>
              </div>
              <button 
                onClick={() => setSidebarView(false)}
                className="p-1 hover:bg-accent rounded-full"
              >
                <HiOutlineX className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <Sidebar activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
