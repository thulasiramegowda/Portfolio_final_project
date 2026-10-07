# SafetyVision

**Real-Time Helmet Detection using Computer Vision**

SafetyVision is an AI-powered computer vision application designed to detect whether a person is wearing a safety helmet in real-time. It provides a professional dashboard for live camera inference, test case validation, and model performance tracking.

## Overview

This project is built as a portfolio-quality demonstration of integrating machine learning models with a modern full-stack web application. The architecture is explicitly designed to decouple the frontend/backend application logic from the underlying machine learning training pipeline.

## Features

- **Real-Time Detection:** Connects to webcam/video feeds and performs frame-by-frame inference.
- **Model Evaluation Dashboard:** Visualizes training accuracy, validation loss, and class distributions.
- **Standardized Test Cases:** Allows execution of predetermined test scenarios to validate model reliability.
- **Dynamic Model Information:** Displays architecture, framework, and connection status.
- **Modular Adapter Pattern:** The backend uses an adapter layer (`inferenceAdapter.js`) so that the ML inference model can be hot-swapped without affecting the web app.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend:** Node.js, Express.js, Multer
- **Machine Learning:** (In Progress) PyTorch/YOLO/TensorFlow depending on the ML team's final architecture.

## Project Structure

```
SafetyVision/
├── frontend/             # React application (UI/UX, Video capture)
├── backend/              # Express API (Routing, ML Adapter)
│   └── src/
│       └── ml/           # Integration point for ML inference
└── ml/                   # ML teammate's workspace (datasets, training scripts, weights)
```

## Local Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
VITE_USE_MOCK_ML=true
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## Development Mode

The backend includes a `VITE_USE_MOCK_ML=true` flag in its environment variables. When enabled, the `inferenceAdapter.js` will return simulated responses for predictions, test cases, and model performance. This allows the application team to build the entire system independently while the ML team finalizes model training.

## Team Contributions

This is a collaborative project:
- **Application Engineering (Frontend/Backend):** Responsible for the UI, API, video capture, architecture, and the ML adapter interface.
- **Machine Learning Engineering:** Responsible for dataset curation, model training, evaluation, and providing the final inference logic to be plugged into the adapter.

## ML Integration (For the ML Teammate)

When your model is ready:
1. Place your model files (e.g., `best.pt`, `model.onnx`, or Python inference scripts) in the `ml/` directory.
2. We will update `backend/src/ml/inferenceAdapter.js` to call your inference code (via Python child process, ONNX runtime, or HTTP microservice).
3. Set `VITE_USE_MOCK_ML=false` in the backend `.env`.
