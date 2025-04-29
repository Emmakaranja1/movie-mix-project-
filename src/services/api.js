// Central API configuration
export const API_BASE_URL = "https://moviemix-mock-api.onrender.com";

// Helper function for API requests with error handling
export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API Request Failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};
