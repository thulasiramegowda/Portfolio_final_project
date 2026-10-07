import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Upload, Camera, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { predictHelmet } from '../services/detectionApi';
import ResultCard from './ResultCard';

const DetectionPanel = () => {
  const [activeTab, setActiveTab] = useState('image'); // 'image' | 'camera'
  
  // Image Upload State
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);
  
  // Global Detection State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  // Convert base64 to File object
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const runDetection = async () => {
    setError(null);
    let imageToDetect = selectedImage;

    // If using camera, capture frame first
    if (activeTab === 'camera') {
      if (!webcamRef.current) {
        setError('Camera is not active.');
        return;
      }
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setError('Failed to capture frame from camera.');
        return;
      }
      imageToDetect = dataURLtoFile(imageSrc, 'webcam-frame.jpg');
      setPreviewUrl(imageSrc); // Show the captured frame
    }

    if (!imageToDetect) {
      setError('Please provide an image first.');
      return;
    }

    setLoading(true);
    try {
      const response = await predictHelmet(imageToDetect);
      setResult(response);
    } catch (err) {
      setError(err.message || 'Unable to connect to the detection server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="detection" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Helmet Detection</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Upload an image or use your live camera feed to analyze helmet usage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8 flex flex-col">
          
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            <button 
              onClick={() => { setActiveTab('image'); setIsCameraActive(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${activeTab === 'image' ? 'bg-white/10 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <ImageIcon className="w-5 h-5" />
              Upload Image
            </button>
            <button 
              onClick={() => setActiveTab('camera')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${activeTab === 'camera' ? 'bg-white/10 shadow-sm text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Camera className="w-5 h-5" />
              Live Camera
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-center min-h-[400px]">
            
            {activeTab === 'image' && (
              <div className="h-full flex flex-col">
                {!previewUrl ? (
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl hover:border-primaryCyan/50 transition-colors cursor-pointer bg-white/5 group">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-primaryCyan" />
                    </div>
                    <span className="text-lg font-semibold mb-2">Drag and drop or click to browse</span>
                    <span className="text-sm text-gray-400">Supports JPG, PNG</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative flex-1 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
                    <img src={previewUrl} alt="Preview" className="max-h-[400px] object-contain" />
                    <button 
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'camera' && (
              <div className="h-full flex flex-col">
                <div className="flex-1 relative rounded-xl overflow-hidden bg-black/50 border border-white/10 flex flex-col items-center justify-center">
                  {cameraError ? (
                    <div className="text-center p-6">
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <p className="text-red-400 font-medium">{cameraError}</p>
                      <button onClick={() => setCameraError(null)} className="mt-4 text-primaryCyan underline text-sm">Try Again</button>
                    </div>
                  ) : !isCameraActive ? (
                    <div className="text-center p-6">
                      <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <button 
                        onClick={() => setIsCameraActive(true)}
                        className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-colors"
                      >
                        Start Camera
                      </button>
                    </div>
                  ) : (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: "user" }}
                        onUserMediaError={(e) => setCameraError("Camera permission denied or not found.")}
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => setIsCameraActive(false)}
                        className="absolute bottom-4 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors"
                      >
                        Stop Camera
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button 
              onClick={runDetection}
              disabled={loading || (activeTab === 'image' && !selectedImage) || (activeTab === 'camera' && !isCameraActive)}
              className="w-full bg-gradient-to-r from-primaryCyan to-accentBlue disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primaryCyan/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : 'Detect'}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <ResultCard result={result} loading={loading} error={error} />
        </div>
      </div>

      {/* Annotated Image Section */}
      {result && result.result_image && (
        <div className="mt-12 glass-card rounded-2xl p-6 md:p-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-6 pb-4 border-b border-white/10">Detection Visualization</h3>
          <div className="rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center min-h-[300px]">
            {/* If the backend returns base64, ensure it has data uri prefix, else assume it's a URL */}
            <img 
              src={result.result_image.startsWith('data:') ? result.result_image : `data:image/jpeg;base64,${result.result_image}`} 
              alt="Processed Detection" 
              className="max-h-[600px] object-contain w-full"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.onerror = null;
                // If it's just a path, maybe prepend API URL
                if(!result.result_image.startsWith('data:') && !result.result_image.startsWith('http')) {
                  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                  e.target.src = `${API_URL}/${result.result_image.replace(/^\//, '')}`;
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DetectionPanel;
