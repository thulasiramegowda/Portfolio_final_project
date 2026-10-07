import os
import io
import json
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

import tensorflow as tf

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'helmet_detector.keras')
IMG_SIZE = (160, 160)

print(f"Loading model from {MODEL_PATH}...")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Failed to load model: {e}")
    model = None

def preprocess_image(image_bytes):
    # Load with PIL as RGB
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    
    # Resize to 160x160 using PIL (bilinear is fine)
    img = img.resize(IMG_SIZE)
    
    # Convert to NumPy array
    img_array = np.array(img, dtype=np.float32)
    
    # DO NOT scale by /255.0!
    # The loaded helmet_detector.keras (MobileNetV2 Transfer Learning)
    # has a built-in tf.keras.applications.mobilenet_v2.preprocess_input
    # layer inside the model that expects [0, 255] RGB values.
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if 'frame' not in request.files:
        return jsonify({"error": "No frame provided"}), 400

    file = request.files['frame']
    image_bytes = file.read()

    try:
        img_array = preprocess_image(image_bytes)
        
        # Predict
        predictions = model.predict(img_array, verbose=0)
        
        # Binary output: 1 = helmet, 0 = no_helmet
        score = float(predictions[0][0])
        
        # Log to backend stdout
        print(f"[ML] Input shape: {img_array.shape}")
        print(f"[ML] Raw output: {score:.4f}")
        
        if score >= 0.5:
            class_id = 1
            label = "Helmet"
            confidence = score
            class_name = "helmet"
        else:
            class_id = 0
            label = "No Helmet"
            confidence = 1.0 - score
            class_name = "no_helmet"
            
        print(f"[ML] Class mapping: {class_id} -> {label}")
        print(f"[ML] Prediction: {label}")
        print(f"[ML] Confidence: {confidence:.4f}")

        return jsonify({
            "success": True,
            "prediction": {
                "label": label,
                "confidence": confidence,
                "class": class_name,
                "classId": class_id
            }
        })
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
