import React from 'react'
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children, activeMenu }: { children: React.ReactNode, activeMenu: string }) => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="sticky top-0 z-40"> {/* Navbar */}
                <Navbar activeMenu={activeMenu}/>
            </header>

            {user && (
                <div className='flex flex-1'>
                    {/* Sidebar container with full height */}
                    <div className='hidden bg-card shadow-md md:block sticky top-16 h-[calc(100vh-4rem)] overflow-hidden '> {/* Adjust 64px based on your navbar height */}
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    {/* Main content area */}
                    <div className='flex-1 mx-5 overflow-y-auto'>
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout
