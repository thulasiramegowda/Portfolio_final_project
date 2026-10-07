import React from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function DetectionResult({ prediction, isActive, isProcessing }) {
  const formatConf = (conf) => conf ? `${(conf * 100).toFixed(1)}%` : '—';
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-500" />
          Detection Result
        </h3>
        <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          <span className={cn(
            "w-2 h-2 rounded-full",
            isActive ? "bg-green-500" : "bg-gray-300"
          )} />
          <span className="font-semibold text-xs text-gray-600 uppercase tracking-wider">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center py-4 border-y border-gray-100 mb-4">
        <div className="text-center">
           <p className={cn(
             "text-3xl font-black tracking-tight",
             !prediction?.prediction ? "text-gray-300" : 
             prediction.prediction === 'helmet' ? "text-green-600" : "text-red-600"
           )}>
            {prediction?.prediction 
              ? (prediction.prediction === 'helmet' ? 'HELMET DETECTED' : 'NO HELMET') 
              : 'WAITING'}
          </p>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Confidence Score: <span className="font-bold text-gray-900 text-lg">{formatConf(prediction?.confidence)}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Class</p>
          <p className="text-xs font-semibold text-gray-800">
             {prediction?.prediction ? (prediction.prediction === 'helmet' ? '1 (Helmet)' : '0 (None)') : '—'}
          </p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Resolution</p>
          <p className="text-xs font-semibold text-gray-800">
             {isActive ? '640×480' : '—'}
          </p>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">FPS</p>
          <p className="text-xs font-semibold text-gray-800">
             {isActive ? '1.0' : '—'}
          </p>
        </div>
      </div>
      
      {!prediction && isActive && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-primary-600 uppercase tracking-wide bg-primary-50 py-2 rounded-lg border border-primary-100">
          <Loader2 className="w-4 h-4 animate-spin" />
          Analyzing Feed...
        </div>
      )}
    </div>
  );
}
