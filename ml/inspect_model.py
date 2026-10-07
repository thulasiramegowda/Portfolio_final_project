import tensorflow as tf

MODEL_PATH = 'helmet_detector.keras'
model = tf.keras.models.load_model(MODEL_PATH)

for i, layer in enumerate(model.layers):
    print(f"Layer {i}: {layer.name} ({layer.__class__.__name__})")
    if i > 5:
        break
print("...")
for i, layer in enumerate(model.layers[-5:]):
    print(f"Layer {len(model.layers)-5+i}: {layer.name} ({layer.__class__.__name__})")
