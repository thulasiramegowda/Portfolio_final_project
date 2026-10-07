import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import EmptyState from './EmptyState';
import { BarChart as BarChartIcon } from 'lucide-react';

export function LineChartCard({ title, data, lines }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-4">{title}</h3>
      {data && data.length > 0 ? (
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="epoch" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              {lines.map((line, i) => (
                <Line 
                  key={i}
                  type="monotone" 
                  dataKey={line.dataKey} 
                  name={line.name} 
                  stroke={line.color} 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 4 }} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1">
          <EmptyState 
            icon={BarChartIcon}
            title="No data" 
            description="Available after training."
          />
        </div>
      )}
    </div>
  );
}

export function BarChartCard({ title, description, data }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase">{title}</h3>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      {data && data.length > 0 ? (
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
         <div className="flex-1">
           <EmptyState 
            icon={BarChartIcon}
            title="No distribution data" 
            description="Available after dataset preparation."
          />
         </div>
      )}
    </div>
  );
}
