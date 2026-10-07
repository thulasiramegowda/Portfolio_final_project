import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const getModelInfo = async () => {
  const response = await api.get('/model/info');
  return response.data;
};

export const predictFrame = async (frameBlob) => {
  const formData = new FormData();
  formData.append('frame', frameBlob, 'frame.jpg');
  const response = await api.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const runTestCase = async (testCaseId) => {
  const response = await api.post('/test-case', { testCaseId });
  return response.data;
};

export const getResults = async () => {
  const response = await api.get('/results');
  return response.data;
};

export const getPerformance = async () => {
  const response = await api.get('/model/performance');
  return response.data;
};

export const getDistribution = async () => {
  const response = await api.get('/model/distribution');
  return response.data;
};

export default api;
