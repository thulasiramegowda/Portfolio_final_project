export const predictHelmet = async (imageFile) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during prediction:', error);
    throw error;
  }
};
