import axios from "axios";

// Set up a base URL for your API
const API_BASE_URL = "http://localhost:5000";

// Create an axios instance with default settings
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});
