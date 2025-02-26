import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; 
export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getAuthHeader = () => {
    return { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
  };

// usage example  
// axios.get("http://localhost:8080/api/protected", getAuthHeader());