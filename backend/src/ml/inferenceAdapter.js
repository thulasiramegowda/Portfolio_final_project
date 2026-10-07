/**
 * ML Inference Adapter
 * 
 * This module isolates the backend from the specific ML implementation.
 * It provides a clean interface for predicting frames, running test cases,
 * and retrieving model information.
 * 
 * In development mode (VITE_USE_MOCK_ML=true), it returns mock data.
 * Later, this will be replaced with real calls to the ML teammate's model.
 */

const isMock = process.env.VITE_USE_MOCK_ML === 'true';

const predictFrame = async (frameBuffer) => {
  if (isMock) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const isHelmet = Math.random() > 0.5;
    return {
      prediction: isHelmet ? 'helmet' : 'no_helmet',
      confidence: isHelmet ? 0.85 + (Math.random() * 0.14) : 0.80 + (Math.random() * 0.15),
      classId: isHelmet ? 1 : 0
    };
  }

  // TODO: Integrate with real ML model
  return { status: 'not_connected' };
};

const runTestCase = async (testCaseId) => {
  if (isMock) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let prediction = 'helmet';
    let expected = 'helmet';
    
    if (testCaseId === 'test-2') {
      prediction = 'no_helmet';
      expected = 'no_helmet';
    } else if (testCaseId === 'test-3') {
      prediction = 'no_helmet';
      expected = 'helmet'; // Intentionally failing case for demonstration
    }

    return {
      testCaseId,
      prediction,
      confidence: 0.90 + (Math.random() * 0.09),
      status: prediction === expected ? 'pass' : 'fail'
    };
  }

  return { status: 'not_connected' };
};

const getModelInfo = async () => {
  if (isMock) {
    return {
      model: 'SafetyVision-Mock (YOLOv8 Placeholder)',
      framework: 'PyTorch (Mock)',
      task: 'Object Detection',
      classes: ['Helmet', 'No Helmet'],
      inputSize: '640x640',
      modelVersion: 'v0.1.0-mock',
      trainingStatus: 'Training',
      modelFile: 'best.pt (Mock)',
      inferenceStatus: 'Connected (Development Mode)'
    };
  }

  return {
    inferenceStatus: 'Not Connected',
    trainingStatus: 'Training'
  };
};

const getEvaluationResults = async () => {
  if (isMock) {
    return {
      accuracy: 0.92,
      precision: 0.91,
      recall: 0.94,
      f1Score: 0.92,
      epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      trainingAccuracy: [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.88, 0.9, 0.91, 0.93],
      validationAccuracy: [0.45, 0.58, 0.68, 0.72, 0.78, 0.82, 0.85, 0.87, 0.89, 0.92],
      trainingLoss: [1.2, 0.9, 0.7, 0.6, 0.5, 0.4, 0.35, 0.3, 0.28, 0.25],
      validationLoss: [1.3, 1.0, 0.8, 0.65, 0.55, 0.45, 0.4, 0.35, 0.32, 0.3]
    };
  }

  return null;
};

const getClassDistribution = async () => {
  if (isMock) {
    return {
      helmet: 1250,
      noHelmet: 840
    };
  }

  return null;
};

module.exports = {
  predictFrame,
  runTestCase,
  getModelInfo,
  getEvaluationResults,
  getClassDistribution
};
