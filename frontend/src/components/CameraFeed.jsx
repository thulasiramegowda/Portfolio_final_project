import React from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import CameraControls from './CameraControls';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

export default function CameraFeed({ 
  videoRef, 
  isActive, 
  error, 
  prediction, 
  onStart, 
  onStop,
  onCapture
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <Camera className="w-5 h-5 text-gray-400" />
          Live Camera Feed
        </h2>
        <CameraControls 
          isActive={isActive} 
          onStart={onStart} 
          onStop={onStop} 
          onCapture={onCapture} 
        />
      </div>
      
      <div className="relative aspect-video bg-slate-900 flex-1 flex items-center justify-center overflow-hidden">
        {error && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/90 p-4">
             <ErrorState title="Camera Unavailable" message={error} />
          </div>
        )}
        
        {!isActive && !error && (
          <div className="absolute inset-0 z-10 bg-slate-50 flex items-center justify-center">
             <EmptyState 
               icon={Camera} 
               title="Camera is not active" 
               description="Start the camera to begin real-time helmet detection."
             />
          </div>
        )}
        
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            !isActive ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* Prediction Overlay */}
        {isActive && prediction && prediction.prediction && (
          <div className="absolute top-6 right-6 z-30 animate-in fade-in zoom-in duration-200">
            <div className={cn(
              "px-5 py-2.5 rounded-xl font-bold shadow-xl flex items-center gap-2 border backdrop-blur-md",
              prediction.prediction === 'helmet' 
                ? "bg-green-500/95 text-white border-green-400/50" 
                : "bg-red-500/95 text-white border-red-400/50"
            )}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {prediction.prediction === 'helmet' ? 'Helmet Detected' : 'No Helmet'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
