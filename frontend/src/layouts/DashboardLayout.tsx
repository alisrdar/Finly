import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const DashboardLayout = ({ children, activeMenu }: { children: React.ReactNode, activeMenu: string }) => {
    const { user, isLoading } = useAuth();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    
    const toggleSidebar = () => {
        setIsSidebarCollapsed(prev => !prev);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    {/* Desktop Sidebar - always visible on medium and larger screens, can be collapsed */}
                    <div className={`hidden md:block transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-card shadow-sm h-[calc(100vh-64px)] sticky top-16`}>
                        <Sidebar 
                            activeMenu={activeMenu}
                            isCollapsed={isSidebarCollapsed}
                            toggleCollapse={toggleSidebar}
                        />
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1">
                        <main className="container mx-auto px-4 py-6 md:px-6">
                            {children}
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardLayout;
