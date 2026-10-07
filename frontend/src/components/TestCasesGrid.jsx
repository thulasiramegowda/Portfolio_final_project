import React, { useState } from 'react';
import { predictFrame } from '../services/api';
import TestCaseCard from './TestCaseCard';

const TEST_CASES = [
  {
    id: 'test-1',
    name: 'Helmet Present',
    description: 'Clear image of a person wearing a safety helmet.',
    expected: 'helmet',
    image: '/test-cases/helmet-present.jpg',
  },
  {
    id: 'test-2',
    name: 'No Helmet',
    description: 'Clear image of a person without head protection.',
    expected: 'no_helmet',
    image: '/test-cases/no-helmet.jpg',
  },
  {
    id: 'test-3',
    name: 'Challenging Condition',
    description: 'Person captured under difficult lighting, angle, or partially visible conditions.',
    expected: 'helmet', // Actually the challenging image generated shows a welder with a hard hat
    image: '/test-cases/challenging.jpg',
  }
];

export default function TestCasesGrid() {
  const [results, setResults] = useState({});
  const [running, setRunning] = useState({});

  const handleRunTest = async (testId, imageUrl, expected) => {
    setRunning(prev => ({ ...prev, [testId]: true }));
    setResults(prev => ({ ...prev, [testId]: null })); // reset
    
    try {
      // 1. Fetch the static image as a blob
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();

      // 2. Send it to the existing prediction API
      const predictionResponse = await predictFrame(imageBlob);
      
      if (predictionResponse.error || predictionResponse.status === 'error') {
         setResults(prev => ({ 
           ...prev, 
           [testId]: { status: 'ERROR', message: predictionResponse.error || 'Model unavailable. Connect the ML backend to run this test.' } 
         }));
         return;
      }

      // 3. Compare with Expected result
      const predLabel = predictionResponse.prediction || predictionResponse.class; 
      const isPass = predLabel === expected;

      setResults(prev => ({ 
        ...prev, 
        [testId]: { 
          prediction: predLabel,
          confidence: predictionResponse.confidence,
          status: isPass ? 'PASS' : 'FAIL',
          raw: predictionResponse
        } 
      }));

    } catch (err) {
      console.error(err);
      setResults(prev => ({ 
        ...prev, 
        [testId]: { status: 'ERROR', message: 'Model unavailable. Connect the ML backend to run this test.' } 
      }));
    } finally {
      setRunning(prev => ({ ...prev, [testId]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TEST_CASES.map((tc, index) => (
        <TestCaseCard
          key={tc.id}
          tc={tc}
          index={index}
          isRunning={running[tc.id]}
          result={results[tc.id]}
          onRun={() => handleRunTest(tc.id, tc.image, tc.expected)}
        />
      ))}
    </div>
  );
}
