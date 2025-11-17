import axios from 'axios';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitViatico = async (data: any) => {
  try {
    const response = await api.post('/viaticos', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting viatico:', error);
    throw error;
  }
};

export default api;