import api from '../api/apiClient';

export interface AssistantRequest {
  conversationId: number;
  reqLanguage: string;
  reqText: string;
}

export interface AssistantResponse {
  result: string;
}

export const AssistantService = {
  async sendMessage(data: AssistantRequest): Promise<AssistantResponse> {
    console.log('Enviando petición al asistente con datos:', data);
    try {
      const response = await api.post('/assistant', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Respuesta recibida del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en AssistantService.sendMessage:', error);
      // Relanzar el error para que se maneje en el componente
      throw error;
    }
  },
};
