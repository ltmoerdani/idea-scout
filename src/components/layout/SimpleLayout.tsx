import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, FileText, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { clsx } from 'clsx';

interface SimpleLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  const { logout } = useAuthStore();
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Search className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-lg font-bold text-slate-900">Ideas Validator</h1>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-600 hover:text-slate-900"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-slate-200">
          <div className="p-6">
            <div className="flex items-center">
              <Search className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-slate-900">Ideas Validator</h1>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-colors',
                  location.pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex flex-col items-center py-2 px-1 text-xs font-medium rounded-lg transition-colors',
                location.pathname === item.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};