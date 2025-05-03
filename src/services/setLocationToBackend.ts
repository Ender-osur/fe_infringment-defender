import axios from 'axios';
import { apiClient } from './api/apiClient';

export const sendLocationToBackend = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.post(`${apiClient}/`, {
      latitude,
      longitude,
    });
    console.log('Ubicación enviada con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar ubicación:', error);
    throw error;
  }
};
