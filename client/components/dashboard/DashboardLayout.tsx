'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Home, FileText, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { auth } from '../../lib/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    auth.logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen hero-section flex items-center justify-center">
        <div className="card text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-section flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar fixed lg:static inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-light">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-primary-light rounded-lg">
              <Shield className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text">Proctorap</h1>
              <p className="text-xs text-text-muted">Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-light"
          >
            <X className="h-5 w-5 text-text-muted" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <a
              href="/dashboard"
              className="sidebar-item flex items-center space-x-3"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="/dashboard/tests"
              className="sidebar-item flex items-center space-x-3"
            >
              <FileText className="h-5 w-5" />
              <span>My Tests</span>
            </a>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-surface-light">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface-light mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
              <span className="text-background font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{user.name}</p>
              <p className="text-xs text-text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-item w-full flex items-center space-x-3 text-danger hover:bg-danger hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-surface border-b border-surface-light">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-light"
              >
                <Menu className="h-6 w-6 text-text-muted" />
              </button>
              <h1 className="text-2xl font-bold text-text">{title}</h1>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
