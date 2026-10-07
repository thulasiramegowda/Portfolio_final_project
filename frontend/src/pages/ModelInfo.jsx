import React, { useEffect, useState } from 'react';
import { getModelInfo } from '../services/api';
import { Cpu, Database, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function ModelInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInfo() {
      try {
        setError(null);
        const data = await getModelInfo();
        setInfo(data);
      } catch (err) {
        console.error("Failed to load model info", err);
        setError("Failed to fetch model information from the server.");
      } finally {
        setLoading(false);
      }
    }
    loadInfo();
  }, []);

  if (loading) return <LoadingState message="Loading model information..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const isConnected = info?.inferenceStatus?.toLowerCase().includes('connected');

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-gray-100 py-3 last:border-0">
      <dt className="text-gray-500 font-medium">{label}</dt>
      <dd className="font-semibold text-gray-900 text-right">{value || 'Not available yet'}</dd>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Model Information</h1>
        <p className="text-gray-500 mt-2 text-lg max-w-2xl">Details about the active detection model architecture and connection status.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-4xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-50 rounded-xl text-primary-600 border border-primary-100">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">{info?.model || 'Model Not Loaded'}</h2>
              <p className="text-sm text-gray-500 mt-0.5">Version: <span className="font-medium text-gray-700">{info?.modelVersion || '—'}</span></p>
            </div>
          </div>
          <div className={cn(
            "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 border",
            isConnected 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-amber-50 text-amber-700 border-amber-200"
          )}>
            {isConnected ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {info?.inferenceStatus || 'Not Connected'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-slate-50/30">
          <div className="p-8 space-y-6">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase flex items-center gap-2 mb-4">
              <Settings className="w-4 h-4" /> Architecture Details
            </h3>
            <dl>
              <InfoRow label="Framework" value={info?.framework} />
              <InfoRow label="Task" value={info?.task} />
              <InfoRow label="Input Size" value={info?.inputSize} />
            </dl>
          </div>

          <div className="p-8 space-y-6">
            <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase flex items-center gap-2 mb-4">
              <Database className="w-4 h-4" /> Training & Output
            </h3>
            <dl>
              <InfoRow label="Training Status" value={info?.trainingStatus} />
              <InfoRow label="Model File" value={info?.modelFile} />
              <div className="flex flex-col py-3">
                <dt className="text-gray-500 font-medium mb-2">Detected Classes</dt>
                <dd className="flex gap-2 flex-wrap">
                  {info?.classes?.length ? (
                    info.classes.map(cls => (
                      <span key={cls} className="px-3 py-1 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700">
                        {cls}
                      </span>
                    ))
                  ) : <span className="text-gray-900 font-semibold">Not available yet</span>}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
