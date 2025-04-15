import axios from "axios";

export const getDrinks = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/drinks`);
  return response.data;
};

export const getDesserts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/desserts`);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, order);
  return response.data;
};