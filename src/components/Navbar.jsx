import React from 'react';
import { Shield } from 'lucide-react';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xl font-bold text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Shield className="text-primaryCyan w-7 h-7" />
        <span>HelmetAI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <button onClick={() => scrollToSection('home')} className="hover:text-primaryCyan transition-colors">Home</button>
        <button onClick={() => scrollToSection('detection')} className="hover:text-primaryCyan transition-colors">Detection</button>
        <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primaryCyan transition-colors">How It Works</button>
        <button onClick={() => scrollToSection('about')} className="hover:text-primaryCyan transition-colors">About</button>
      </div>

      <button 
        onClick={() => scrollToSection('detection')}
        className="bg-gradient-to-r from-primaryCyan to-accentBlue hover:opacity-90 text-white px-5 py-2 rounded-full font-semibold transition-all text-sm shadow-lg shadow-primaryCyan/20"
      >
        Start Detection
      </button>
    </nav>
  );
};

export default Navbar;
