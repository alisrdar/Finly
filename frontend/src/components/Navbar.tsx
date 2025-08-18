import React, { useState } from 'react'
import Logo from './Logo'
import Sidebar from './Sidebar';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const Navbar = ({ activeMenu }: { activeMenu: string }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  
  const toggleMobileMenu = () => {
    setOpenSideMenu((prev) => !prev);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className='relative flex items-center gap-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 py-4 px-4 md:px-8 sticky top-0 z-50 shadow-sm'>
        
        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <button 
            onClick={toggleMobileMenu} 
            className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95'
            aria-label={openSideMenu ? 'Close menu' : 'Open menu'}
          >
            <div className='relative w-6 h-6 cursor-pointer'>
              { openSideMenu ? (
                <HiOutlineX className={`absolute inset-0 w-6 h-6 text-gray-700 dark:text-gray-300 transition-all `} />
              ) : (
                <HiOutlineMenu className={`absolute inset-0 w-6 h-6 text-gray-700 dark:text-gray-300 transition-all  `} />
              )}
            </div>
          </button>
        </div>

        {/* Logo */}
        <div className='flex-1 md:flex-initial'>
          <Logo />
        </div>

        {/* Desktop Navigation Items (if you have any) */}
        <div className='hidden md:flex items-center gap-4 ml-auto'>
          {/* Add any additional nav items here */}
          <div className='flex items-center gap-3'>
            {/* Example: Search, notifications, user menu, etc. */}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {openSideMenu && (
        <>
          {/* Backdrop */}
          <div 
            className='md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300'
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile Sidebar */}
          <div className={`
            md:hidden fixed left-0 top-[72px] bottom-0 z-50 
            w-64 bg-white dark:bg-gray-900 
            shadow-2xl border-r border-gray-200 dark:border-gray-700
            transform transition-transform duration-300 ease-out
            ${openSideMenu ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className='h-full overflow-hidden'>
              <Sidebar activeMenu={activeMenu} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar