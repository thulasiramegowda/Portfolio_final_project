import React from 'react';
import TestCasesGrid from '../components/TestCasesGrid';

export default function TestCases() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Test Cases</h1>
        <p className="text-gray-500 mt-2 text-lg max-w-2xl">Run standard validation test cases against the model to ensure inference reliability.</p>
      </header>

      <TestCasesGrid />
    </div>
  );
}
