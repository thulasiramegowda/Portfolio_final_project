import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="bg-darkBg border-t border-white/5 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
              <Shield className="text-primaryCyan w-8 h-8" />
              <span>HelmetAI</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed text-sm">
              The Helmet Detection System is a computer vision prototype designed to identify helmet compliance from image or video input. The system combines a trained machine learning model, backend inference API and an interactive frontend dashboard.
            </p>
          </div>

          <div className="md:text-right flex flex-col md:items-end justify-center">
            <h4 className="text-lg font-semibold text-white mb-2">REVA University</h4>
            <p className="text-primaryCyan mb-6 text-sm font-medium tracking-wide">Portfolio Building Hackathon 2026</p>
            
            <div className="glass-card px-6 py-4 rounded-xl inline-block">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 text-left">Project Team</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-300 font-medium">
                <span className="hover:text-white transition-colors">Tarhat</span>
                <span className="text-gray-600">•</span>
                <span className="hover:text-white transition-colors">Thulasi</span>
                <span className="text-gray-600">•</span>
                <span className="hover:text-white transition-colors">Sudeeksha</span>
                <span className="text-gray-600">•</span>
                <span className="hover:text-white transition-colors">Safa</span>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; 2026 Helmet Detection System Team. All rights reserved.</p>
          <p>Built for the Portfolio Building Hackathon.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
