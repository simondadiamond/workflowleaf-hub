import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, MessageSquare, FileText, BarChart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white">
        <div className="p-4 h-full flex flex-col">
          <div className="mb-6">
            <h1 className="text-xl font-bold">WorkflowLeaf</h1>
            <p className="text-sm opacity-70">Property Manager Dashboard</p>
          </div>
          
          <nav className="space-y-1 flex-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm rounded-md bg-primary-dark"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/requests"
              className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-primary-dark transition-colors"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Maintenance
            </Link>
            <div className="px-4 py-3 mt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-opacity-70 text-white">
                Coming Soon
              </h3>
            </div>
            <button
              disabled
              className="flex items-center px-4 py-2 text-sm rounded-md opacity-50 cursor-not-allowed w-full text-left"
            >
              <FileText className="mr-3 h-5 w-5" />
              Lease Management
            </button>
            <button
              disabled
              className="flex items-center px-4 py-2 text-sm rounded-md opacity-50 cursor-not-allowed w-full text-left"
            >
              <BarChart className="mr-3 h-5 w-5" />
              Analytics
            </button>
          </nav>
          
          <div className="mt-auto">
            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              className="w-full justify-start text-white hover:bg-primary-dark"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <h2 className="text-xl font-medium">MaintenanceFlow AI</h2>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
