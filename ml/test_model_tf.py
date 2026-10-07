import os
import numpy as np
import tensorflow as tf
from PIL import Image

MODEL_PATH = 'helmet_detector.keras'
model = tf.keras.models.load_model(MODEL_PATH)

img_path = '../frontend/public/test-cases/helmet-present.jpg'

def preprocess_tf(path):
    img = tf.io.read_file(path)
    img = tf.io.decode_image(img, channels=3, expand_animations=False)
    img = tf.image.resize(img, (160, 160))
    img = img / 255.0
    return tf.expand_dims(img, axis=0)

img_tf = preprocess_tf(img_path)
pred_tf = model.predict(img_tf, verbose=0)[0][0]
print(f"TF Preprocessing raw output: {pred_tf:.4f}")

