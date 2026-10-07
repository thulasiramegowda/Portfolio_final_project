import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Camera, Cpu } from 'lucide-react';

const Hero = () => {
  const scrollToDetection = () => {
    document.getElementById('detection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-24 pb-16 px-6 md:px-12 flex flex-col items-center text-center relative overflow-hidden min-h-[80vh] justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primaryCyan/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
      >
        AI-Powered <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryCyan to-accentBlue">
          Helmet Detection
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
      >
        Real-time computer vision for smarter and safer helmet compliance.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <button 
          onClick={scrollToDetection}
          className="bg-primaryCyan hover:bg-primaryCyan/90 text-darkBg px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105"
        >
          Start Detection
        </button>
        <button 
          onClick={scrollToHowItWorks}
          className="glass-card hover:bg-white/5 px-8 py-4 rounded-full font-semibold transition-all"
        >
          Learn More
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-accentBlue/20 flex items-center justify-center mb-4">
            <Activity className="text-accentBlue w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">Real-Time Detection</h3>
          <p className="text-sm text-gray-400">Fast and accurate inference</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primaryCyan/20 flex items-center justify-center mb-4">
            <Cpu className="text-primaryCyan w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">AI Powered</h3>
          <p className="text-sm text-gray-400">State-of-the-art ML models</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <Camera className="text-purple-400 w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">Image & Camera</h3>
          <p className="text-sm text-gray-400">Flexible input methods</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
