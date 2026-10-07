# Helmet Detection System - Frontend

This is the frontend dashboard for the Helmet Detection System created for the REVA University Portfolio Building Hackathon 2026.

## Technologies Used
*   React
*   Vite
*   Tailwind CSS
*   Framer Motion (for animations)
*   Lucide React (for icons)
*   React Webcam

## Project Setup

1.  Make sure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## Backend API Configuration

The frontend connects to a backend ML API. The URL of this API is configured in the `.env` file at the root of the project:

```env
VITE_API_URL=http://localhost:5000
```

When deploying or testing with the actual backend, update this URL to match the backend's address.

### Backend API Requirements (For Thulasi and Sudeeksha)

The frontend expects the backend to expose the following endpoint:

*   **URL:** `/predict` (relative to the `VITE_API_URL`)
*   **Method:** `POST`
*   **Content-Type:** `multipart/form-data`
*   **Body:** A file input named `image` containing the uploaded image or camera frame.

**Expected JSON Response Format:**

```json
{
    "status": "Helmet Detected", // or "No Helmet Detected"
    "confidence": 0.94, // float between 0.0 and 1.0
    "people_detected": 3,
    "helmet_count": 2,
    "no_helmet_count": 1,
    "result_image": "base64_encoded_string_here_or_url"
}
```

*Note: If `result_image` is a base64 string, the frontend will automatically handle it. If it's a URL, it will display the image from that URL.*

## Project Structure

*   `src/components/`: Contains all the UI components (Navbar, Hero, DetectionPanel, etc.).
*   `src/services/detectionApi.js`: Handles the API communication with the backend.
*   `.env`: Stores environment variables like the API URL.
*   `tailwind.config.js`: Tailwind CSS configuration.
