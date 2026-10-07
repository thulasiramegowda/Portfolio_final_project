const mlAdapter = require('../ml/inferenceAdapter');

const checkHealth = (req, res) => {
  res.json({ status: 'ok' });
};

const getModelInfo = async (req, res) => {
  try {
    const info = await mlAdapter.getModelInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve model info' });
  }
};

const predict = async (req, res) => {
  try {
    // In a real scenario, we would pass req.file.buffer to the adapter
    const prediction = await mlAdapter.predictFrame(req.file?.buffer);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Inference failed' });
  }
};

const runTestCase = async (req, res) => {
  try {
    const { testCaseId } = req.body;
    if (!testCaseId) {
      return res.status(400).json({ error: 'testCaseId is required' });
    }
    const result = await mlAdapter.runTestCase(testCaseId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Test case execution failed' });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await mlAdapter.getEvaluationResults();
    if (!results) {
      return res.json({
        accuracy: null, precision: null, recall: null, f1Score: null
      });
    }
    res.json({
      accuracy: results.accuracy,
      precision: results.precision,
      recall: results.recall,
      f1Score: results.f1Score
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch evaluation results' });
  }
};

const getPerformance = async (req, res) => {
  try {
    const results = await mlAdapter.getEvaluationResults();
    if (!results) {
      return res.json({
        epochs: [], trainingAccuracy: [], validationAccuracy: [], trainingLoss: [], validationLoss: []
      });
    }
    res.json({
      epochs: results.epochs,
      trainingAccuracy: results.trainingAccuracy,
      validationAccuracy: results.validationAccuracy,
      trainingLoss: results.trainingLoss,
      validationLoss: results.validationLoss
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
};

const getDistribution = async (req, res) => {
  try {
    const distribution = await mlAdapter.getClassDistribution();
    if (!distribution) {
      return res.json({ helmet: null, noHelmet: null });
    }
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class distribution' });
  }
};

module.exports = {
  checkHealth,
  getModelInfo,
  predict,
  runTestCase,
  getResults,
  getPerformance,
  getDistribution
};
