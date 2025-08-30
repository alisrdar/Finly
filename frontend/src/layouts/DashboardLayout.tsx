import React from 'react'
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const DashboardLayout = ({ children, activeMenu }: { children: React.ReactNode, activeMenu: string }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="sticky top-0 z-40"> {/* Navbar */}
                <Navbar onClick={() => navigate('/dashboard')} activeMenu={activeMenu}/>
            </header>

            {user && (
                <div className='flex flex-1'>
                    {/* Sidebar container with full height */}
                    <div className='hidden bg-card shadow-md md:block sticky top-16 h-[calc(100vh-4rem)] overflow-hidden '> 
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    {/* Main content area */}
                    <div className='flex-1 mx-5 overflow-y-auto'>
                        {children}
                        <Footer />
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout
