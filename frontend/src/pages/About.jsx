import React from 'react';
import { Shield, ArrowDown } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary-600" />
          About SafetyVision
        </h1>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Project Overview</h2>
          <p className="text-gray-600 text-base leading-relaxed">
            SafetyVision is a computer-vision based helmet detection application designed to demonstrate real-time AI-assisted safety monitoring. The application runs inference on a live video feed and presents the results in this professional workspace.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Frontend</h3>
              <p className="text-gray-600 text-sm">React + Vite + Tailwind</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Backend</h3>
              <p className="text-gray-600 text-sm">Node.js + Express</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Visualization</h3>
              <p className="text-gray-600 text-sm">Recharts</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">ML</h3>
              <p className="text-gray-600 text-sm">Transfer Learning</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Project Architecture</h2>
          <div className="flex flex-col items-center justify-center space-y-2 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-gray-700">Camera Feed</div>
            <ArrowDown className="w-5 h-5 text-gray-400" />
            <div className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-primary-600">Frontend App</div>
            <ArrowDown className="w-5 h-5 text-gray-400" />
            <div className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-gray-700">Backend API</div>
            <ArrowDown className="w-5 h-5 text-gray-400" />
            <div className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-gray-700">ML Inference Adapter</div>
            <ArrowDown className="w-5 h-5 text-gray-400" />
            <div className="px-6 py-2 bg-gray-900 border border-gray-900 rounded-lg shadow-sm font-semibold text-white">Prediction</div>
            <ArrowDown className="w-5 h-5 text-gray-400" />
            <div className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-primary-600">Detection Result (UI)</div>
          </div>
        </section>
      </div>
    </div>
  );
}
