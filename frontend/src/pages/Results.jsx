import React, { useEffect, useState } from 'react';
import { getResults, getPerformance, getDistribution } from '../services/api';
import { Activity, Target, Zap, BarChart2 } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { LineChartCard, BarChartCard } from '../components/PerformanceCharts';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function Results() {
  const [metrics, setMetrics] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [distribution, setDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const [m, p, d] = await Promise.all([
          getResults(),
          getPerformance(),
          getDistribution()
        ]);
        setMetrics(m);
        setPerformance(p);
        setDistribution(d);
      } catch (err) {
        console.error("Failed to load results data", err);
        setError("Failed to fetch evaluation metrics from the server.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingState message="Loading evaluation metrics..." />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const accuracyData = performance?.epochs?.map((epoch, i) => ({
    epoch: `Epoch ${epoch}`,
    train: performance.trainingAccuracy[i],
    val: performance.validationAccuracy[i],
  })) || [];

  const lossData = performance?.epochs?.map((epoch, i) => ({
    epoch: `Epoch ${epoch}`,
    train: performance.trainingLoss[i],
    val: performance.validationLoss[i],
  })) || [];

  const distData = distribution && distribution.helmet !== null ? [
    { name: 'Helmet', count: distribution.helmet, fill: '#3b82f6' },
    { name: 'No Helmet', count: distribution.noHelmet, fill: '#ef4444' }
  ] : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Model Results</h1>
        <p className="text-gray-500 mt-2 text-lg max-w-2xl">Overall evaluation metrics and training performance.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Accuracy" value={metrics?.accuracy} icon={Target} />
        <MetricCard label="Precision" value={metrics?.precision} icon={Activity} />
        <MetricCard label="Recall" value={metrics?.recall} icon={Zap} />
        <MetricCard label="F1 Score" value={metrics?.f1Score} icon={BarChart2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LineChartCard 
          title="Training vs Validation Accuracy"
          data={accuracyData}
          lines={[
            { dataKey: 'train', name: 'Training Accuracy', color: '#3b82f6' },
            { dataKey: 'val', name: 'Validation Accuracy', color: '#8b5cf6' }
          ]}
        />
        <LineChartCard 
          title="Training vs Validation Loss"
          data={lossData}
          lines={[
            { dataKey: 'train', name: 'Training Loss', color: '#ef4444' },
            { dataKey: 'val', name: 'Validation Loss', color: '#f59e0b' }
          ]}
        />
        <BarChartCard 
          title="Class Distribution"
          description="Distribution of images across detection classes."
          data={distData}
        />
      </div>
    </div>
  );
}
