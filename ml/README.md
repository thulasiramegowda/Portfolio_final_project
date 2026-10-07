# Helmet Detection

A binary image classifier that predicts whether a motorcycle rider is wearing a helmet, built as an end-to-end learning project covering data preprocessing, CNN fundamentals, transfer learning, and model evaluation.

Dataset: [Helmet Detection Dataset (Helmet vs No Helmet)](https://www.kaggle.com/datasets/vishalkirthikk/helmet-detection-dataset-helmet-vs-no-helmet) on Kaggle (1,269 images).

## Results

Two models were trained and compared on an untouched test set (177 images):

| Metric | CNN from scratch | MobileNetV2 (transfer learning) |
|---|---|---|
| Test accuracy | 64.4% | **91.5%** |
| `no_helmet` recall | 92.5% | 90.6% |
| `helmet` recall | 22.5% | **93.0%** |
| `helmet` precision | 66.7% | 86.8% |

The from-scratch CNN overfit quickly on the ~823 available training images and defaulted to predicting the majority class. Switching to a MobileNetV2 backbone pretrained on ImageNet, with only a small classifier head trained on top, closed most of that gap.

## Approach

1. **Data pipeline** — stratified 70/15/15 train/val/test split, built with `tf.data` (decode → resize to 160x160 → normalize → batch → prefetch).
2. **Baseline CNN** — a 4-block convolutional network trained from scratch, with data augmentation and dropout to fight overfitting on a small dataset. Diagnosed via train/val loss curves and a full confusion matrix (not just accuracy, due to class imbalance).
3. **Transfer learning** — a frozen MobileNetV2 backbone (ImageNet weights) with a small trainable classification head, using the correct `[-1, 1]` input preprocessing the backbone expects.
4. **Evaluation** — per-class precision/recall/F1 via `classification_report`, plus a confidence-calibration check: predictions in the 0.35-0.65 probability band were confirmed to have much lower accuracy (45%) than confident predictions (94.6%), so inference reports `uncertain - needs review` in that band instead of forcing a hard label.

## Files

- [`helmet_detection.ipynb`](helmet_detection.ipynb) — the full notebook, meant to be run in Google Colab with a GPU runtime. Downloads the dataset via `kagglehub`, trains both models, and evaluates them.
- [`helmet_detector.keras`](helmet_detector.keras) — the trained MobileNetV2 model, ready to load with `tf.keras.models.load_model(...)` for inference.

## Running it

Open `helmet_detection.ipynb` in [Google Colab](https://colab.research.google.com/), set `Runtime > Change runtime type > GPU`, and run the cells in order. It installs its own dependencies (`kagglehub`) and downloads the dataset automatically.

## Possible next steps

- Fine-tune the top layers of the MobileNetV2 backbone (currently fully frozen) for a further accuracy improvement.
- Move from whole-image classification to real object detection (localizing the head/helmet with a bounding box), which would require a bounding-box-annotated dataset such as [andrewmvd/helmet-detection](https://www.kaggle.com/datasets/andrewmvd/helmet-detection).
