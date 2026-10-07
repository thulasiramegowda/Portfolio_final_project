import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Users, Shield, ShieldOff } from 'lucide-react';

const ResultCard = ({ result, loading, error }) => {
  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px]">
        <div className="w-12 h-12 border-4 border-primaryCyan border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-semibold mb-2">Analyzing image...</h3>
        <p className="text-gray-400 text-sm">AI model is processing the input.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] border-red-500/30">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Processing</h3>
        <p className="text-red-200/70 text-sm text-center max-w-xs">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-400">Waiting for detection</h3>
        <p className="text-gray-500 text-sm mt-2">Submit an image or camera frame</p>
      </div>
    );
  }

  const isHelmetDetected = result.status === 'Helmet Detected';
  const confidencePercent = result.confidence ? Math.round(result.confidence * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 h-full flex flex-col"
    >
      <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-white/10">Detection Results</h3>
      
      <div className={`p-4 rounded-xl flex items-center gap-4 mb-6 ${isHelmetDetected ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
        {isHelmetDetected ? (
          <CheckCircle className="w-8 h-8 text-green-400" />
        ) : (
          <AlertTriangle className="w-8 h-8 text-red-400" />
        )}
        <div>
          <p className="text-sm text-gray-400 mb-1">Status</p>
          <p className={`text-xl font-bold ${isHelmetDetected ? 'text-green-400' : 'text-red-400'}`}>
            {result.status}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Confidence</p>
          <p className="text-2xl font-semibold text-primaryCyan">{confidencePercent}%</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-3 h-3 text-gray-400" />
            <p className="text-xs text-gray-400">People Detected</p>
          </div>
          <p className="text-2xl font-semibold">{result.people_detected || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Helmet</p>
            <p className="text-xl font-semibold text-green-400">{result.helmet_count || 0}</p>
          </div>
          <Shield className="w-6 h-6 text-green-400/50" />
        </div>
        <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">No Helmet</p>
            <p className="text-xl font-semibold text-red-400">{result.no_helmet_count || 0}</p>
          </div>
          <ShieldOff className="w-6 h-6 text-red-400/50" />
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
