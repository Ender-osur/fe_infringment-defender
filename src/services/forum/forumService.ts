import api from "../api/apiClient";

export interface ForumPayload {
  title: string;
  comment: string;
}

export interface Forum {
  id: string;
  title: string;
  comment: string;
}

const ForumService = {
  async create(payload: ForumPayload): Promise<Forum> {
    const response = await api.post('/forum', payload);
    return response.data;
  },

  async pagination(page = 1, limit = 50): Promise<Forum[]> {
    const response = await api.get(`/forum/pagination?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export default ForumService;
