import React from 'react';

export default function MetricCard({ label, value, icon: Icon, className }) {
  return (
    <div className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col ${className}`}>
      <div className="flex items-center gap-3 mb-3 text-gray-500">
        {Icon && <Icon className="w-5 h-5 text-primary-500" />}
        <span className="font-medium text-sm tracking-wide">{label}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">
        {value !== null && value !== undefined && value !== '' ? value : '—'}
      </p>
    </div>
  );
}
