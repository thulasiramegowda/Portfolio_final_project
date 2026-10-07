import React from 'react';
import { Play, Square, Camera as CameraIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export default function CameraControls({ isActive, onStart, onStop, onCapture, disabled }) {
  return (
    <div className="flex gap-2">
      {!isActive ? (
        <button 
          onClick={onStart}
          disabled={disabled}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" /> Start
        </button>
      ) : (
        <>
          {onCapture && (
            <button 
              onClick={onCapture}
              disabled={disabled}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <CameraIcon className="w-4 h-4" /> Capture Frame
            </button>
          )}
          <button 
            onClick={onStop}
            disabled={disabled}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Square className="w-4 h-4" /> Stop
          </button>
        </>
      )}
    </div>
  );
}
