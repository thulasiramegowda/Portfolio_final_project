import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TestCases from './pages/TestCases';
import Results from './pages/Results';
import ModelInfo from './pages/ModelInfo';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-cases" element={<TestCases />} />
          <Route path="/results" element={<Results />} />
          <Route path="/model-info" element={<ModelInfo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
