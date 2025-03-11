import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; 
export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
  }
  return {}; // Return an empty object if no token is available
};

// usage example  
// axios.get("http://localhost:8080/api/protected", getAuthHeader());