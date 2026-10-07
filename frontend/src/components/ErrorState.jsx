import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ title = "An error occurred", message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full w-full min-h-[200px] text-red-500 bg-red-50/50 rounded-xl border border-red-100">
      <AlertTriangle className="w-10 h-10 mb-3 text-red-400" />
      <h3 className="text-lg font-semibold text-red-700 mb-1">{title}</h3>
      <p className="text-sm text-red-600 text-center max-w-md">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
