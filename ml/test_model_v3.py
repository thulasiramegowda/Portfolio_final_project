import os
import numpy as np
import tensorflow as tf
from PIL import Image

MODEL_PATH = 'helmet_detector.keras'
model = tf.keras.models.load_model(MODEL_PATH)

print(f"Model input shape: {model.input_shape}")
print(f"Model output shape: {model.output_shape}")

# Test images
test_images = [
    '../frontend/public/test-cases/helmet-present.jpg',
    '../frontend/public/test-cases/no-helmet.jpg',
    '../frontend/public/test-cases/challenging.jpg'
]

def preprocess_v3(img_path):
    # This matches the notebook's predict_helmet function exactly
    img = tf.io.read_file(img_path)
    img = tf.io.decode_image(img, channels=3, expand_animations=False)
    img = tf.image.resize(img, (160, 160))
    img = tf.expand_dims(img, axis=0)
    return img

for img_path in test_images:
    print(f"\n--- Testing {os.path.basename(img_path)} ---")
    img_v3 = preprocess_v3(img_path)
    pred_v3 = model.predict(img_v3, verbose=0)[0][0]
    print(f"V3 ([0, 255] RGB) raw output: {pred_v3:.4f}")
    
    if pred_v3 >= 0.5:
        print(f"Prediction: Helmet (Confidence: {pred_v3:.4f})")
    else:
        print(f"Prediction: No Helmet (Confidence: {1.0 - pred_v3:.4f})")
