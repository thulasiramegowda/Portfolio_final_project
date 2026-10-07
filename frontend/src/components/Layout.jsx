import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-gray-900 selection:bg-primary-100 selection:text-primary-900">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
           <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
              Safety<span className="text-primary-600">Vision</span>
           </h1>
           <button 
             onClick={() => setMobileOpen(true)}
             className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
           >
             <Menu className="w-6 h-6" />
           </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
