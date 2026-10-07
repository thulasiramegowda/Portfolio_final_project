import React from 'react';
import { Play, CheckCircle, XCircle, Clock, Loader2, Image as ImageIcon } from 'lucide-react';

export default function TestCaseCard({ tc, index, isRunning, result, onRun }) {
  const formatConf = (conf) => conf ? `${(conf * 100).toFixed(1)}%` : '—';
  const displayPrediction = result?.prediction 
    ? (result.prediction === 'helmet' ? 'Helmet' : 'No Helmet') 
    : '—';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all hover:shadow-md">
      {/* Thumbnail area */}
      <div className="bg-slate-100 aspect-video flex flex-col items-center justify-center text-slate-400 font-medium relative border-b border-gray-100">
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-sm">Test Case {index + 1}</span>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{tc.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{tc.description}</p>
        </div>
        
        <div className="bg-slate-50/50 rounded-xl p-4 mb-6 space-y-3 flex-1 border border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-500">Expected</span>
            <span className="font-semibold text-gray-900">{tc.expected}</span>
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
              result.status === 'pass' ? (
                <span className="font-bold text-green-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4"/> PASS</span>
              ) : result.status === 'fail' ? (
                <span className="font-bold text-red-600 flex items-center gap-1.5"><XCircle className="w-4 h-4"/> FAIL</span>
              ) : (
                <span className="font-bold text-orange-500">Error</span>
              )
            ) : (
              <span className="font-medium text-gray-400 flex items-center gap-1.5"><Clock className="w-4 h-4"/> Pending</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onRun(tc.id)}
          disabled={isRunning}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-primary-600 disabled:opacity-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:ring-2 focus:ring-primary-500/20 outline-none"
        >
          {isRunning ? (
            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-primary-500"/> Running Inference...</span>
          ) : (
            <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Run Test Case</span>
          )}
        </button>
      </div>
    </div>
  );
}
