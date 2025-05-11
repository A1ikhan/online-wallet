export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data; // Should return { user, token }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // Should return { user, token }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};