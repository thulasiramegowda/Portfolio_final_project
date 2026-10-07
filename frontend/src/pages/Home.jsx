import React, { useState, useEffect, useRef } from 'react';
import { useCamera } from '../hooks/useCamera';
import { predictFrame, getPerformance, getDistribution } from '../services/api';
import CameraFeed from '../components/CameraFeed';
import DetectionResult from '../components/DetectionResult';
import TestCasesGrid from '../components/TestCasesGrid';
import { LineChartCard, BarChartCard } from '../components/PerformanceCharts';

export default function Home() {
  const { videoRef, isActive, error, startCamera, stopCamera, captureFrame } = useCamera();
  const [prediction, setPrediction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);

  // Analytics states
  const [performance, setPerformance] = useState(null);
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [p, d] = await Promise.all([getPerformance(), getDistribution()]);
        setPerformance(p);
        setDistribution(d);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    }
    loadAnalytics();
  }, []);

  // Auto-predict interval when camera is active
  useEffect(() => {
    let intervalId;
    
    if (isActive) {
      intervalId = setInterval(async () => {
        if (processingRef.current) return;
        
        processingRef.current = true;
        setIsProcessing(true);
        try {
          const frameBlob = await captureFrame();
          if (frameBlob) {
            const result = await predictFrame(frameBlob);
            setPrediction(result);
          }
        } catch (err) {
          console.error("Prediction error:", err);
        } finally {
          processingRef.current = false;
          setIsProcessing(false);
        }
      }, 1000);
    } else {
      setPrediction(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, captureFrame]);

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
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. MAIN DETECTION WORKSPACE */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Video Feed */}
        <div className="xl:col-span-2 min-h-[480px] flex flex-col">
          <CameraFeed 
            videoRef={videoRef}
            isActive={isActive}
            error={error}
            prediction={prediction}
            onStart={startCamera}
            onStop={stopCamera}
          />
        </div>

        {/* Right: Detection Result & Compact Analytics */}
        <div className="flex flex-col gap-6">
          <div className="flex-none">
            <DetectionResult 
              prediction={prediction}
              isActive={isActive}
              isProcessing={isProcessing}
            />
          </div>
          
          <div className="flex-1 min-h-[300px]">
             <LineChartCard 
              title="Accuracy (Train vs Val)"
              data={accuracyData}
              lines={[
                { dataKey: 'train', name: 'Train', color: '#3b82f6' },
                { dataKey: 'val', name: 'Val', color: '#8b5cf6' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 2. SECONDARY ANALYTICS ROW (Optional compact charts below video if needed, but Test Cases go here) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard 
          title="Loss (Train vs Val)"
          data={lossData}
          lines={[
            { dataKey: 'train', name: 'Train', color: '#ef4444' },
            { dataKey: 'val', name: 'Val', color: '#f59e0b' }
          ]}
        />
        <BarChartCard 
          title="Dataset Class Distribution"
          data={distData}
        />
      </section>

      {/* 3. TEST CASES */}
      <section className="pt-6 border-t border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Standard Test Cases</h2>
          <p className="text-gray-500 mt-1 text-sm">Validate inference reliability against pre-defined conditions.</p>
        </div>
        <TestCasesGrid />
      </section>

    </div>
  );
}
