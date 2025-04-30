export const API_BASE_URL = "https://moviemix-mock-api.onrender.com";

// Helper functions for API calls
export const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Failed: ${error.message}`);
    throw error;
  }
};

export const postToAPI = async (endpoint, data) => {
  return fetchFromAPI(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateAPI = async (endpoint, data) => {
  return fetchFromAPI(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteFromAPI = async (endpoint) => {
  return fetchFromAPI(endpoint, {
    method: "DELETE",
  });
};
