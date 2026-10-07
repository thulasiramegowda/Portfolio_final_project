# SafetyVision - Real-Time Helmet Detection System

SafetyVision is a complete web application built around an open-source machine learning model to detect whether a person is wearing a safety helmet in real-time. It uses a React frontend to capture webcam video, an Express Node.js backend to handle API requests, and a Python Flask service to run inference using a pre-trained MobileNetV2 model.

## 🚀 Features
- **Real-Time Detection:** Live webcam streaming with frame-by-frame inference.
- **Microservice Architecture:** Clean separation of concerns (Frontend, Backend, ML Inference).
- **Interactive UI:** Professional, polished computer-vision console.
- **Model Telemetry:** View test case validations and performance metrics.
- **Mock Mode:** A fully simulated development mode when Python dependencies are unavailable.

## 🏗️ Architecture
```
Camera Feed 
   ↓ 
React Frontend (Vite, Tailwind)
   ↓ 
Node.js Express Backend API
   ↓ 
Python Flask Inference Service
   ↓ 
MobileNetV2 (helmet_detector.keras)
   ↓ 
Detection Result (Helmet / No Helmet, Confidence)
```

## 🛠️ Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend:** Node.js, Express, Axios, Form-Data
- **Machine Learning:** Python, TensorFlow / Keras, Flask, Pillow, Numpy

## 📂 Project Structure
```
SafetyVision/
├── frontend/             # React application (UI)
├── backend/              # Express API (Orchestrator)
├── ml/                   # Python Flask Inference service + Keras model
├── data/                 # Sample images for testing
└── README.md
```

## ⚙️ Installation & How to Run

You will need to run three separate terminal instances (one for each layer).

### 1. Python ML Inference Service
This service loads the `.keras` model into memory and exposes a fast `/predict` endpoint.
```bash
cd ml
pip install -r requirements.txt
python inference.py
```
*Runs on `http://localhost:5001`*

### 2. Node.js Backend API
This orchestrates the connections and serves data to the frontend.
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

### 3. React Frontend
This is the main user interface.
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

## 🧪 Testing the Application
- Open the application at `http://localhost:5173`.
- Click **Start Camera** on the Home page.
- Ensure the backend and Python service logs show incoming predictions.
- View standard evaluations on the **Test Cases** page.

## 🔌 API Endpoints
The backend exposes the following REST endpoints:
- `GET /api/health` - Backend health check.
- `GET /api/model/info` - Model configuration.
- `GET /api/model/performance` - Training metrics.
- `GET /api/model/distribution` - Class distribution.
- `POST /api/predict` - Accepts `multipart/form-data` with a `frame` image file.
- `POST /api/test-cases/:id/run` - Runs inference on a specific sample image.

## 💡 Mock Mode
If you want to run the UI without installing heavy TensorFlow dependencies, set `VITE_USE_MOCK_ML=true` in `backend/.env`. This will bypass the Python server and return simulated predictions with realistic latencies.

## 📜 Open-Source Attribution
This project uses the machine learning model and dataset preparation concepts from the open-source repository:
[mo-geabel/helmet-detection](https://github.com/mo-geabel/helmet-detection)

The original notebook (`helmet_detection.ipynb`) and trained `helmet_detector.keras` (MobileNetV2 Transfer Learning) serve as the foundation. The React/Node.js application, adapter architecture, real-time webcam integration, and API services were developed on top of it.
