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
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize(IMG_SIZE)
    img_array = np.array(img)
    # The original notebook scales pixels to [0, 1]
    img_array = img_array / 255.0
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
        # MobileNetV2 with binary crossentropy usually outputs a single probability
        # 1 = helmet, 0 = no_helmet
        score = float(predictions[0][0])
        
        # The class index logic:
        # If score > 0.5, it's 1 (helmet)
        # Otherwise 0 (no_helmet)
        if score > 0.5:
            class_id = 1
            label = "Helmet"
            confidence = score
            class_name = "helmet"
        else:
            class_id = 0
            label = "No Helmet"
            confidence = 1.0 - score
            class_name = "no_helmet"

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
