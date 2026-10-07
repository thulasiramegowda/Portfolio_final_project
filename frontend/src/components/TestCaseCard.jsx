import React from 'react';
import { Play, CheckCircle, XCircle, Clock, Loader2, AlertTriangle } from 'lucide-react';

export default function TestCaseCard({ tc, isRunning, result, onRun }) {
  const formatConf = (conf) => conf ? `${(conf * 100).toFixed(1)}%` : '—';
  
  const formatLabel = (val) => {
    if (!val) return '—';
    return val === 'helmet' ? 'Helmet' : 'No Helmet';
  };

  const displayExpected = formatLabel(tc.expected);
  const displayPrediction = formatLabel(result?.prediction);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all hover:shadow-md h-full">
      
      {/* REAL IMAGE INPUT */}
      <div className="bg-slate-100 aspect-video relative border-b border-gray-200 w-full">
        {tc.image ? (
          <img 
            src={tc.image} 
            alt={tc.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Image missing
          </div>
        )}
        {isRunning && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{tc.name}</h3>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-6 space-y-3 flex-1 border border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-500">Expected</span>
            <span className="font-semibold text-gray-900">{displayExpected}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-500">Prediction</span>
            <span className="font-semibold text-gray-900">{displayPrediction}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-500">Confidence</span>
            <span className="font-semibold text-gray-900">{formatConf(result?.confidence)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm pt-3 mt-1 border-t border-slate-200">
            <span className="font-medium text-gray-500">Status</span>
            {result ? (
              result.status === 'PASS' ? (
                <span className="font-bold text-green-600 flex items-center gap-1.5 uppercase"><CheckCircle className="w-4 h-4"/> PASS</span>
              ) : result.status === 'FAIL' ? (
                <span className="font-bold text-red-600 flex items-center gap-1.5 uppercase"><XCircle className="w-4 h-4"/> FAIL</span>
              ) : (
                <span className="font-bold text-orange-600 flex items-center gap-1.5 uppercase"><AlertTriangle className="w-4 h-4"/> ERROR</span>
              )
            ) : isRunning ? (
              <span className="font-bold text-primary-600 flex items-center gap-1.5 uppercase"><Loader2 className="w-4 h-4 animate-spin"/> Testing...</span>
            ) : (
              <span className="font-medium text-gray-400 flex items-center gap-1.5 uppercase"><Clock className="w-4 h-4"/> Pending</span>
            )}
          </div>
        </div>
        
        {result?.status === 'ERROR' && (
          <div className="mb-4 text-xs font-medium text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
            {result.message}
          </div>
        )}

        <button
          onClick={() => onRun()}
          disabled={isRunning}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600 disabled:opacity-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:ring-2 focus:ring-primary-500/20 outline-none"
        >
          {isRunning ? (
            <span className="flex items-center gap-2">Testing...</span>
          ) : (
            <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Run Test Case</span>
          )}
        </button>
      </div>
    </div>
  );
}
