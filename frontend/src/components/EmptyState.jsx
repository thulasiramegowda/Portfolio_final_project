import React from 'react';

export default function EmptyState({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full w-full min-h-[200px] text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
      {Icon && <Icon className="w-12 h-12 mb-3 text-gray-300" />}
      <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-4">{description}</p>
      {children}
    </div>
  );
}
