import { apiClient } from "./axios";

export const getProducts = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addProduct = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const editProduct = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteProduct = async (endpoint, id) => {
  try {
    await apiClient.delete(`${endpoint}/${id}`);
    return true;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
