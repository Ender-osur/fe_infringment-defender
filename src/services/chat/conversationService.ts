import api from '../api/apiClient';
import type { Conversation } from '@/types/conversation';

const BASE_URL = '/conversations';

export const ConversationService = {
  async create(userId: number, title: string): Promise<Conversation> {
    const response = await api.post(BASE_URL, { userId, title });
    return response.data;
  },

  async getAll(): Promise<Conversation[]> {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  async getByUserId(userId: number): Promise<Conversation[]> {
    const response = await api.get(`${BASE_URL}/history/${userId}`);
    return response.data;
  },

  async getOne(id: number): Promise<Conversation> {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async update(id: number, data: Partial<Conversation>): Promise<Conversation> {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
