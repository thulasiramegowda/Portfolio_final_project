import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full w-full min-h-[200px] text-gray-500">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
