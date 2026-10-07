import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlaySquare, BarChart2, Info, InfoIcon, Shield, X, MonitorPlay } from 'lucide-react';
import { cn } from '../utils/cn';

const mainNavItems = [
  { name: 'Live Detection', path: '/', icon: MonitorPlay },
  { name: 'Test Cases', path: '/test-cases', icon: PlaySquare },
  { name: 'Results', path: '/results', icon: BarChart2 },
  { name: 'Model Info', path: '/model-info', icon: Info },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const sidebarClasses = cn(
    "bg-white border-r border-gray-200 flex flex-col h-full transition-transform duration-300 ease-in-out z-40",
    "w-64 fixed lg:static inset-y-0 left-0",
    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  );

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-30 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              <Shield className="w-6 h-6 text-primary-600" />
              Safety<span className="text-primary-600">Vision</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Real-Time Detection</p>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                window.location.pathname === item.path ? "text-primary-600" : "text-gray-400"
              )} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <NavLink
            to="/about"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
              isActive 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <InfoIcon className="w-5 h-5" />
            About
          </NavLink>
          <div className="text-xs text-gray-400 font-medium text-center py-2">
            v1.0.0-dev
          </div>
        </div>
      </div>
    </>
  );
}
