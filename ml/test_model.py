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

def preprocess_v1(img_path):
    img = Image.open(img_path).convert('RGB')
    img = img.resize((160, 160))
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def preprocess_v2(img_path):
    img = Image.open(img_path).convert('RGB')
    img = img.resize((160, 160))
    img_array = np.array(img)
    # MobileNetV2 preprocessing typically expects [-1, 1]
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    return np.expand_dims(img_array, axis=0)

for img_path in test_images:
    print(f"\n--- Testing {os.path.basename(img_path)} ---")
    
    # Try preprocessing v1 (used in our inference.py)
    img_v1 = preprocess_v1(img_path)
    pred_v1 = model.predict(img_v1, verbose=0)[0][0]
    print(f"V1 (img / 255.0) raw output: {pred_v1:.4f}")

    # Try preprocessing v2 (MobileNetV2 standard)
    img_v2 = preprocess_v2(img_path)
    pred_v2 = model.predict(img_v2, verbose=0)[0][0]
    print(f"V2 (mobilenet preprocess) raw output: {pred_v2:.4f}")
