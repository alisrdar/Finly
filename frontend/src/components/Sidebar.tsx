// import React from 'react'
import { SIDEBAR_LINKS } from '../utils/data'
import { useState } from 'react'
import { useNavigate, type To } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { IoIosArrowBack } from 'react-icons/io'

const Sidebar = ({ activeMenu }: { activeMenu: string }) => {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleDesktop = () => {
    setCollapsed((prev) => !prev);
  }
  
  const handleClick = (route: To) => {
    if (route === '/logout') {
      handleLogout();
      return
    } else {
      navigate(route);
    }
  }
  
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  }
  
  return (
    <>
      {/* Toggle Button - Only visible on large screens */}
      <button
        onClick={toggleDesktop}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={`
          hidden md:flex
          fixed top-24 z-50
          items-center justify-center
          w-8 h-8
          bg-background
          border border-gray-200 dark:border-gray-700
          rounded-full
          shadow-md
          transition-all duration-1 ease-in-out
          hover:shadow-lg
          ${collapsed
            ? 'left-12 rotate-0'         /* collapsed: arrow points right, positioned near collapsed sidebar */
            : 'left-60 rotate-180'       /* expanded: arrow points left, positioned near expanded sidebar */
          }
        `}
      >
        <IoIosArrowBack className="w-5 h-5 text-foreground font-medium" />
      </button>

      {/* Sidebar */}
      <nav className={`
        left-0 top-0
        flex flex-col gap-2 p-4 
        bg-card 
        shadow-md shadow-muted 
        h-screen
        overflow-y-auto
        transition-all duration-300 ease-in-
        relative
        ${collapsed 
          ? 'w-16 lg:w-16'  /* collapsed width on large screens */
          : 'w-64'          /* expanded width */
        }
      `}>
        {/* User Profile Section */}
        <div className='flex flex-col items-center gap-2 mb-4'>
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ''}
              alt="Profile Image"
              className={`rounded-full transition-all duration-300 object-cover ${
                collapsed ? 'w-8 h-8' : 'w-16 h-16'
    
              }`}
            />
          ) : (
            <img
              src={'avatar_m-face.jpg'}
              alt="Profile Image"
              className={`rounded-full transition-all duration-300 ${
                collapsed ? 'w-8 h-8' : 'w-16 h-16'
              }`}
            />
          )}
          
          {/* User name - hidden when collapsed */}
          <h5 className={`text-center transition-all duration-300 ${
            collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
          }`}>
            {user?.fullName || 'Guest'}
          </h5>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col gap-1'>
          {SIDEBAR_LINKS.map((item) => (
            <button
              key={item.id}
              className={`
                flex items-center p-2 rounded-md 
                text-left transition-all duration-200
                ${collapsed ? 'justify-center' : 'gap-3'}
                ${activeMenu === item.label 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/80' 
                  : 'text-foreground hover:bg-primary hover:text-white'
                }
              `}
              onClick={() => handleClick(item.path)}
              title={collapsed ? item.label.charAt(0).toUpperCase() + item.label.slice(1) : ''}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${
                activeMenu === item.label ? 'text-primary-foreground' : 'text-foreground/80'
              }`} />
              
              {/* Label - hidden when collapsed */}
              <span className={`transition-all duration-300 whitespace-nowrap ${
                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}>
                {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Sidebar