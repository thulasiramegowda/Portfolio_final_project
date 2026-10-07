import React, { useState } from 'react';
import { runTestCase } from '../services/api';
import TestCaseCard from './TestCaseCard';

const TEST_CASES = [
  {
    id: 'test-1',
    name: 'Helmet Present',
    description: 'Clear image of a person wearing a safety helmet.',
    expected: 'Helmet',
  },
  {
    id: 'test-2',
    name: 'No Helmet',
    description: 'Clear image of a person without any head protection.',
    expected: 'No Helmet',
  },
  {
    id: 'test-3',
    name: 'Challenging Condition',
    description: 'Person in low light or unusual camera angle.',
    expected: 'Helmet',
  }
];

export default function TestCasesGrid() {
  const [results, setResults] = useState({});
  const [running, setRunning] = useState({});

  const handleRunTest = async (testId) => {
    setRunning(prev => ({ ...prev, [testId]: true }));
    try {
      const res = await runTestCase(testId);
      setResults(prev => ({ ...prev, [testId]: res }));
    } catch (err) {
      console.error(err);
      setResults(prev => ({ ...prev, [testId]: { status: 'error' } }));
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
          onRun={handleRunTest}
        />
      ))}
    </div>
  );
}
