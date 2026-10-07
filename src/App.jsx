import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DetectionPanel from './components/DetectionPanel';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-white selection:bg-primaryCyan/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <DetectionPanel />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
